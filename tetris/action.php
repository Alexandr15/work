<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Tetris {

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

        $key = (int) filter_input(INPUT_POST, "key");

        switch ($key) {
            case 1:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $ar = $this->getUsers($ip);
                $json = json_encode($ar);
                echo $json;
                break;
            case 2:
                $json = filter_input(INPUT_POST, "array");
                $id = filter_input(INPUT_POST, "id");
                // записываем массив
                $this->update_array($id, $json);
                // выгружаем массив опонента
                $ar[0] = $this->getArray($id);

                $end = $this->get_end($id);

                if ($end) {
                    $ar[1] = $end;
                }
                
                $ar[1] = "";

                $json = json_encode($ar);
                echo $ar;
                break;
            case 3:
                $this->clearbd();
                break;
            case 4:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $enemy = filter_input(INPUT_POST, 'enemy');
                // возвращаем id_user1 по ip
                $user1 = $this->getUser($ip);
                $user2 = $this->getUser($enemy);
                // обновляем записи добавление соперника
                $this->update($user1, $user2);
                $this->update($user2, $user1);
                echo "ok";
            case 5:
                $end = filter_input(INPUT_POST, 'end');
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                end($end, $ip);
                break;
        }
    }

    private function getUser($ip) {
        $res = $this->mysqli->query("SELECT id_user1 FROM phpsl_tetris WHERE ip = '" . $ip . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function getIp($ip) {
        $res = $this->mysqli->query("SELECT ip FROM phpsl_tetris WHERE ip = '" . $ip . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function insertUser($id, $ip) {
        $this->mysqli->query("INSERT INTO phpsl_tetris (id_user1, id_user2, ip, array, end, create_time) VALUES (" . $id . ", '', '" . $ip . "', '', '0', '')");
    }

    private function getUsers($ip) {
        $res = $this->mysqli->query("SELECT id_user1, ip FROM phpsl_tetris WHERE ip != '" . $ip . "' ORDER BY id_user1 DESC");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

    private function getArray($id) {
        $res = $this->mysqli->query("SELECT array FROM phpsl_tetris WHERE id_user2 = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function update($id_user1, $id_user2) {
        $this->mysqli->query("UPDATE phpsl_tetris SET id_user2 = '" . $id_user2 . "' WHERE id_user1 = '" . $id_user1 . "'");
    }

    function updateip($id, $ip) {
        $this->mysqli->query("UPDATE phpsl_tetris SET id_user1 = '" . $id . "' WHERE ip = '" . $ip . "'");
    }

    private function update_array($id, $ar) {
        $this->mysqli->query("UPDATE phpsl_tetris SET array = '" . $ar . "' WHERE id_user1 = '" . $id . "'");
    }

    private function end($end, $ip) {
        $this->mysqli->query("UPDATE phpsl_tetris SET end = '" . $end . "' WHERE ip = '" . $ip . "'");
    }

    private function get_end($id) {
        $res = $this->mysqli->query("SELECT end FROM phpsl_tetris WHERE id_user2 = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function clearbd() {
        $this->mysqli->query("TRUNCATE TABLE phpsl_tetris");
    }

}

$tetris = new Tetris();
$tetris->run();






