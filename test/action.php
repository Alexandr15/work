<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Test {

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
        echo $s;
    }
    
    // записывает в таблицу web_dostup код и логины
    private function write_inn_login() {
        $ar1 = $this->get_identify();
        $ar2 = $this->get_web_dostub();

        for ($i = 0; $i < count($ar1); $i++) {
            $one = explode(" ", $ar1[$i][0]);

            for ($j = 0; $j < count($ar2); $j++) {
                $two = explode(" ", $ar2[$j][0]);

                if ($one[0] === $two[0]) {
                    $s = "";
                    $fio = "";
                    for ($k = 0; $k < count($ar1); $k++) {
                        $t = explode(" ", $ar1[$k][0]);
                        if ($t[0] === $two[0] && $t[1] === $two[1]) {
                            $fio = $t[0];
                            $s .= $ar1[$k][2] . ' ';
                        }
                    }
                    //echo $fio . " " . $s . "<br>";
                    $this->update_identify($ar1[$i][1], $s, $ar2[$j][1]);
                    break;
                }
            }
        }
    }

    private function get_identify() {
        $res = $this->mysqli->query("SELECT fio, identify, login FROM phpsl_roli");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1], $row[2]];
            $i++;
        }
        return $ar;
    }

    private function get_web_dostub() {
        $res = $this->mysqli->query("SELECT `name`, id FROM phpsl_web_dostup");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

    private function update_identify($inn, $login, $id) {
        $this->mysqli->query("UPDATE phpsl_web_dostup SET user_inn = '" . $inn . "', login2 = '" . $login . "' WHERE id = '" . $id . "'");
    }

}
