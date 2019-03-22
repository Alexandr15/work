<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Roli {

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

        $key = filter_input(INPUT_POST, "choice");
        switch ($key) {
            case 1:
                $param = filter_input(INPUT_POST, "content");
                $json = json_decode($param);
                $flag = false;
                for ($i = 0; $i < count($json); $i++) {
                    $id = $this->get_id($json[$i][0]);
                    if ($id) {
                        $this->update($json[$i], $id);
                        continue;
                    } else {
                        $flag = true;
                        $this->insert($json[$i]);
                    }
                }
                echo $flag ? 'данные добавлены в бд' : "добавлений не было";
                break;
            case 2:
                $id = filter_input(INPUT_POST, "id");
                $res = $this->mysqli->query("DELETE FROM phpsl_roli WHERE id = '" . $id . "'");
                if ($res) {
                    echo "Row delete";
                }
                break;
        }
    }

    private function insert($p) {
        $s = $this->array_in_str($p);
        $this->mysqli->query("INSERT INTO phpsl_roli (login, opfy, fio, create_date, access, identify, roli) "
                . "VALUES ('" . $p[0] . "', '" . $p[1] . "', '" . $p[2] . "', '" . $p[3] . "', '" . $p[4] . "', '" . $p[5] . "', '" . $s . "')");
    }

    private function update($p, $id) {
        $s = $this->array_in_str($p);
        $res = $this->mysqli->query("UPDATE phpsl_roli SET create_date = '" . $p[3] . "', access = '" . $p[4] . "', roli = '" . $s . "' WHERE id = '" . $id . "'");
        return $res;
    }

    private function array_in_str($ar) {
        $s = "";
        for ($i = 0; $i < count($ar[6]); $i++) {
            if ($i === count($ar[6]) - 1) {
                $s .= $ar[6][$i] . ' ';
            } else {
                $s .= $ar[6][$i] . ', ';
            }
        }
        return $s;
    }

    private function get_id($p) {
        $res = $this->mysqli->query("SELECT id FROM phpsl_roli WHERE login LIKE '" . $p . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function get_roli($query = false) {

        if (!$query) {
            $query = "SELECT * FROM phpsl_roli";
        }
        $res = $this->mysqli->query($query);
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7]];
            $i++;
        }
        return $ar;
    }

    private function read_html($path) {

        if (!file_exists($path)) {
            return false;
        }
        $s = "";
        // открываем поток на чтение
        $fp = fopen($path, "r");
        if ($fp) {
            // читает до конца строки и переходит на следующую
            while (!feof($fp)) {
                $s .= fgets($fp);
            }
        }
        fclose($fp);
        return $s;
    }

    private function get_files($path) {
        // получаем все папки и файлы в каталоге
        $dir = scandir($path);

        if (!$dir) {
            return false;
        }

        $files = [];
        $index = 0;
        // зачисываем все файлы в новый массив
        for ($i = 0; $i < count($dir); $i++) {
            for ($j = strlen($dir[$i]) - 1; $j >= 0; $j--) {
                if ($dir[$i][$j] === '.' && $j !== 0 && $j !== 1) {
                    $files[$index] = $dir[$i];
                    $index++;
                    break;
                }
            }
        }
        return $files;
    }

    function load_html_files($path) {
        //получаем список файлов
        $files = $this->get_files($path);
        $s = "";
        for ($i = 0; $i < count($files); $i++) {
            // собираем всю  информацию в результирующую переменную
            $s .= $this->read_html($path . $files[$i]);
        }
        return $s;
    }

    function get_choice() {
        $send = filter_input(INPUT_POST, "text");
        $onfy = filter_input(INPUT_POST, "onfy");

        $ar = explode(";", $send);

        $query = "SELECT * FROM phpsl_roli";

        if (is_numeric($onfy)) {
            $query .= " WHERE opfy = '" . $onfy . "'";
            if (count($ar) - 1 > 0) {
                $query .= " AND";
            }
        }

        if (count($ar) - 1 > 0) {

            if (!is_numeric($onfy)) {
                $query .= " WHERE";
            }

            for ($i = 0; $i < count($ar) - 1; $i++) {
                $query .= " roli LIKE '%" . $ar[$i] . "%'";
                if ($i < count($ar) - 2) {
                    $query .= " OR";
                }
            }
        }

        $res = $this->get_roli($query);
        return $res;
    }

}

$roli = new Roli();
$roli->run();
$roli->close();
