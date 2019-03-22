<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Form {

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
                $ar = $this->get_workes_viddil($id);
                $json = json_encode($ar);
                echo $json;
                break;
            case 2:
                $name = filter_input(INPUT_POST, "content");
                $ar = $this->get_roli($name);
                $json = json_encode($ar);
                echo $json;
                break;
            case 3:
                $fio = filter_input(INPUT_POST, "fio");
                $name = explode(" ", $fio);
                $opfy = filter_input(INPUT_POST, "opfy");
                $res = $this->get_login($opfy, $name[0] . ' ' . $name[1]);
                $login = explode(" ", $res);
                echo $login[0];
                break;
            case 4:
                $content = filter_input(INPUT_POST, "content");

                if (!file_exists("/home/sasha/Загрузки/заявки")) {
                    mkdir("/home/sasha/Загрузки/заявки");
                }

                $date = date("Y-m-d H:i:s");
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $user = $this->get_sername($ip);
                $name = explode(" ", $user);
//$path = "/home/sb/samba/inbox/выгрузки/заявки/form.doc";                
                $path = "/home/sasha/Загрузки/" . $name[0] . " (" . $date . ").doc";
                
                for ($i = 0; $i < strlen($path); $i++) {
                    if($path[$i] === ':'){
                        $path[$i] = '-';
                    }
                }
                
                $fp = fopen($path, 'w+');
                fwrite($fp, $content);
                fclose($fp);
                echo $date;
                break;
        }
    }

    private function get_sername($param) {
        $res = $this->mysqli->query("SELECT `name` FROM phpsl_web_dostup WHERE last_ip = '" . $param . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function get_viddil() {
        $res = $this->mysqli->query("SELECT name_vid, id FROM phpsl_shtat_vid");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

    private function get_login($opfy, $fio) {
        $res = $this->mysqli->query("SELECT login FROM phpsl_roli WHERE opfy = '" . $opfy . "' AND fio LIKE '" . $fio . "%'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function get_workes_viddil($id) {
        $res = $this->mysqli->query("SELECT fio, id FROM phpsl_ecp WHERE id_vid = '" . $id . "' AND `status` = 1");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

    private function get_roli($param) {
        $res = $this->mysqli->query("SELECT opfy, roli FROM phpsl_roli WHERE fio LIKE '" . $param . "%'");
        $ar = [];
        $i = 0;
        while ($row = $res->fetch_row()) {
            $ar[$i] = [$row[0], $row[1]];
            $i++;
        }
        return $ar;
    }

}

$form = new Form();
$form->run();
$form->close();
