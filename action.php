<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Zoiber {

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

    }
    

}

$zoiber = new Zoiber();
//$zoiber->run();
$zoiber->close();
