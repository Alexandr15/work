<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Saldova {

    private $host = "172.135.3.111";
    private $database = "phpsl";
    private $user = "root";
    private $password = "260798";
    private $mysqli = null;
    private $charset = "utf8";

    function __construct() {
        $this->mysqli = new mysqli($this->host, $this->user, $this->password, $this->database);
        $this->mysqli->set_charset($this->charset);
        if ($this->mysqli->connect_errno) {
            printf("Не удалось подключиться: %s\n", $this->mysqli->connect_error);
            exit();
        }
    }

    function close() {
        $this->mysqli->close();
    }

    function run() {
        $choice = filter_input(INPUT_POST, 'choice');

        switch ($choice) {
            case 1:
                $inv = filter_input(INPUT_POST, 'inv');
                $sald = new Saldova();
                $respond = $sald->get_device($inv);
                $sald->close();
                $json = json_encode($respond);
                echo $json;
                break;
            case 2:
                $arr = filter_input(INPUT_POST, 'content');
                $json = json_decode($arr);
                $sald = new Saldova();
                $sald->update_row($json[0], $json[1], $json[2], $json[3]);
                $sald->close();
                break;
            case 3:
                $id = filter_input(INPUT_POST, 'id');
                $sald = new Saldova();
                $sald->delete_row($id);
                $sald->close();
                break;
            case 4:
                $s = $this->povtorenie();
                echo $s === "" ? "дублей нету" : $s;
                break;
        }
    }

    // проверяет повторяющие позиции
    private function povtorenie() {
        $res = $this->mysqli->query("SELECT number From phpsl_saldova");

        $ar = [];
        $i = 0;

        while ($row = $res->fetch_row()) {
            $ar[$i] = $row[0];
            $i++;
        }

        $this->close();

        $list = [];
        $ind = 0;

        for ($i = 0, $max = count($ar); $i < $max; $i++) {
            $count = 0;
            for ($j = 0; $j < $max; $j++) {
                if ($ar[$j] === $ar[$i]) {
                    $count++;
                }

                if ($count > 1) {
                    $list[$ind] = $ar[$i];
                    $ind++;
                    break;
                }
            }
        }
        $s = "";
        for ($i = 0, $max = count($list); $i < $max; $i++) {
            $s .= $list[$i] . "<br>";
        }
        return $s;
    }

    function get_saldova($flag = 0) {

        if ((bool) $flag) {
            $query = "SELECT * FROM phpsl_saldova WHERE type != '' AND address != '' AND state != '' ORDER BY surname ASC";
        } else {
            $query = "SELECT * FROM phpsl_saldova ORDER BY surname ASC";
        }

        $result = $this->mysqli->query($query);
        $array = [];
        $index = 0;
        while ($row = $result->fetch_row()) {
            $array[$index] = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
            $index++;
        }
        return $array;
    }

    function get_query($query) {
        $result = $this->mysqli->query($query);
        $array = [];
        $index = 0;
        while ($row = $result->fetch_row()) {
            $array[$index] = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
            $index++;
        }
        return $array;
    }

    function get_predmet() {
        $query = "SELECT predmet FROM phpsl_inv GROUP BY predmet ASC";
        $result = $this->mysqli->query($query);

        $array = [];
        $index = 0;
        while ($row = $result->fetch_row()) {
            $array[$index] = $row[0];
            $index++;
        }
        return $array;
    }

    function get_ins() {
        $query = "SELECT inv FROM phpsl_inv";
        $result = $this->mysqli->query($query);

        $array = [];
        $index = 0;
        while ($row = $result->fetch_row()) {
            $array[$index] = $row[0];
            $index++;
        }
        return $array;
    }

    function get_device($param) {
        $query = "SELECT predmet, sn, kb, mo, cp, op, hd FROM phpsl_inv WHERE inv = '" . $param . "'";
        $result = $this->mysqli->query($query);
        if ($result) {
            $row = $result->fetch_row();
            $result->close();
        }
        return $row;
    }

    function get_surnames() {
        $query = "SELECT surname FROM phpsl_saldova GROUP BY surname";
        $result = $this->mysqli->query($query);

        $array = [];
        $index = 0;
        while ($row = $result->fetch_row()) {
            $array[$index] = $row[0];
            $index++;
        }
        return $array;
    }

    function update_saldova($surname, $id) {
        $query = "UPDATE phpsl_saldova SET surname = '" . $surname . "' WHERE id = '" . $id . "'";
        $this->mysqli->query($query);
    }

    private function update_row($type, $address, $state, $id) {
        $query = "UPDATE phpsl_saldova SET type = '" . $type . "', address = '" . $address . "', state = '" . $state . "' WHERE id = '" . $id . "'";
        $this->mysqli->query($query);
    }

    function insert_saldova($number, $device, $surname) {
        $query = "INSERT INTO phpsl_saldova (number, device, surname, type, address, state) "
                . "VALUES ('" . $number . "', '" . $device . "', '" . $surname . "', '', '', '')";
        $this->mysqli->query($query);
    }

    private function delete_row($param) {
        $query = "DELETE FROM phpsl_saldova WHERE id = '" . $param . "'";
        $this->mysqli->query($query);
    }

}

$sal = new Saldova();
$sal->run();
