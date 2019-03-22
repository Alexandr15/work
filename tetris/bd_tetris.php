<?php

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

    function insert_row($param) {
        $query = "INSERT INTO tetris (id_sess, stat) VALUES ('" . $param[0] . "', '" . $param[1] . "')";
        $this->mysqli->query($query);
    }

    function get_session() {
        $query = "SELECT id_sess FROM tetris";
        $res = $this->mysqli->query($query);
        $array = [];
        $index = 0;
        while ($row = $res->fetch_row()) {
            $array[$index] = $row[0];
            $index++;
        }
        return $array;
    }

    function get_count() {
        $query = "SELECT COUNT(id_sess) FROM tetris";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }
    
    function get_tetris_lim10() {
        $query = "SELECT id_sess, stat, id FROM tetris ORDER BY id DESC LIMIT 10";
        $res = $this->mysqli->query($query);
        $array = [];
        $index = 0;
        while ($row = $res->fetch_row()) {
            $array[$index] = array($row[0], $row[1]);
            $index++;
        }
        return $array;
    }
}
