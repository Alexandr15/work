<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class ECP {

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
        $choice = filter_input(INPUT_POST, "choice");
        switch ($choice) {
            case 1:
                $id = filter_input(INPUT_POST, "id");
                $ar = [];
                $ar[0] = $this->get_pos();
                $ar[1] = $this->get_vid();
                $ar[2] = $this->get_ecp_id($id);
                $json = json_encode($ar);
                echo $json;
                break;
            case 2:
                $content = filter_input(INPUT_POST, "content");
                $ar = json_decode($content);
                if ($ar[7]) {
                    $res = $this->update_ecp($ar);
                    echo "Запись обновлена";
                } else {
                    $res = $this->insert_ecp($ar);
                    echo "Запись добавлена";
                }
                break;
            case 3:
                $ar = [];
                $ar[0] = $this->get_pos();
                $ar[1] = $this->get_vid();
                $json = json_encode($ar);
                echo $json;
                break;
            case 4:
                $ar = $this->compare_date();
                $json = json_encode($ar);
                echo $json;
                break;
        }
    }

    private function compare_date() {
        $res = $this->mysqli->query("SELECT date, id FROM phpsl_ecp");

        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }

        $today = mktime(0, 0, 0, date("m"), date("d"), date("Y"));
        $res = [];
        $index = 0;
        for ($i = 0, $max = count($ar); $i < $max; $i++) {
            $y = substr($ar[$i][0], 0, 4);
            $m = substr($ar[$i][0], 5, 2);
            $d = substr($ar[$i][0], 8, 2);

            $next = mktime(0, 0, 0, (int) date($m), (int) date($d), (int) date($y));
            $prev = mktime(0, 0, 0, (int) date($m), (int) date($d) - 14, (int) date($y));

            if ($prev < $today && $today < $next) {
                $res[$index] = [$ar[$i][0], $ar[$i][1]];
                $index++;
            }
        }

        $ar = [];
        $index = 0;
        for ($i = 0, $max = count($res); $i < $max; $i++) {
            $ar[$index] = $this->get_end($res[$i][1]);
            $index++;
        }
        return $ar;
    }

    private function get_end($id) {
        $res = $this->mysqli->query("SELECT fio, id FROM phpsl_ecp WHERE id = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function insert_ecp($ar) {
        $this->mysqli->query("INSERT INTO phpsl_ecp (fio, id_pos, id_vid, status, ecp, date, guild) "
                . "VALUES ('" . $ar[0] . "', '" . $ar[1] . "', '" . $ar[2] . "', '" . $ar[3] . "', '" . $ar[4] . "', '" . $ar[5] . "', '" . $ar[6] . "')");
    }

    private function update_ecp($ar) {
        $res = $this->mysqli->query("UPDATE phpsl_ecp SET fio = '" . $ar[0] . "', id_pos = '" . $ar[1] . "', "
                . "id_vid = '" . $ar[2] . "', `status` = '" . $ar[3] . "', ecp = '" . $ar[4] . "', date = '" . $ar[5] . "', guild = '" . $ar[6] . "' "
                . "WHERE id = '" . $ar[7] . "'");
        return $res;
    }

    function get_ecp($query = "") {
        $query = "SELECT fio, name_pos, name_vid, status, ecp, date, guild, ecp.id "
                . "FROM phpsl_ecp ecp, phpsl_shtat_pos pos, phpsl_shtat_vid vid "
                . "WHERE id_pos = pos.id AND id_vid = vid.id" . $query;

        $res = $this->mysqli->query($query);

        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7]];
            $i++;
        }
        return $ar;
    }

    private function get_ecp_id($id) {
        $res = $this->mysqli->query("SELECT * FROM phpsl_ecp WHERE id = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function get_pos() {
        $res = $this->mysqli->query("SELECT name_pos, id FROM phpsl_shtat_pos");

        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

    function get_vid() {
        $res = $this->mysqli->query("SELECT name_vid, id FROM phpsl_shtat_vid");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

}

$ecp = new ECP();
$ecp->run();
$ecp->close();
