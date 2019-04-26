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
        $key = (int) filter_input(INPUT_POST, "choice");
        switch ($key) {
            case 1:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $enemy_id = $this->get_free($ip);
                $enemy = $this->is_start($ip);

                if ($enemy !== '') {
                    echo "start";
                }

                if ($enemy_id === null) {
                    echo '';
                    return;
                }

                $ids = $this->get_id($ip);
                $this->update_row($ids[1], $enemy_id);
                $this->update_row($enemy_id, $ids[1]);
                break;
            case 2:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $ids = $this->get_id($ip);
                $busy1 = $this->get_busy($ids[1]); // 0
                $busy2 = $this->get_busy($ids[0]); // 0

                if ((int) $busy1 === 1 && (int) $busy2 === 1) {
                    echo "start";
                } else {
                    echo "";
                }

                break;
            case 3:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $content = filter_input(INPUT_POST, 'content');
                $ids = $this->get_id($ip); // получаем айди игрока

                if ($ids[0] === "" || $ids[0] === null) {
                    echo "1";
                    return;
                }

                $this->update_content($ids[1], $content);
                $s = $this->get_content($ids[0]);

                if ($s === null || $s === "") {
                    echo "2";
                } else {
                    echo $s;
                }
                break;
            case 4:
                $ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
                $ids = $this->get_id($ip);
                $this->gameover($ids[1]);
                $this->gameover($ids[0]);
                echo '';
                break;
        }
    }

    function insert($ip) {
        $this->mysqli->query("INSERT INTO phpsl_atetris (enemy, busy, ip, content) VALUES ('', 0, '" . $ip . "', '') ");
    }

    function get_ip($ip) {
        $res = $this->mysqli->query("SELECT ip FROM phpsl_atetris WHERE ip = '" . $ip . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function update_row($id, $enemy) {
        $this->mysqli->query("UPDATE phpsl_atetris SET enemy = '" . $enemy . "', busy = 1 WHERE id = '" . $id . "'");
    }

    private function update_content($id, $content) {
        $this->mysqli->query("UPDATE phpsl_atetris SET content = '" . $content . "' WHERE id = '" . $id . "'");
    }

    private function gameover($id) {
        $this->mysqli->query("UPDATE phpsl_atetris SET enemy = '', content = '' WHERE id = '" . $id . "'");
    }

    function reset($ip) {
        $this->mysqli->query("UPDATE phpsl_atetris SET enemy = '', busy = 0, content = '' WHERE ip = '" . $ip . "'");
    }

    private function get_free($ip) {
        $res = $this->mysqli->query("SELECT id FROM phpsl_atetris WHERE busy = 0 AND ip != '" . $ip . "' ORDER BY id ASC LIMIT 1");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function get_id($ip) {
        $res = $this->mysqli->query("SELECT enemy, id FROM phpsl_atetris WHERE ip = '" . $ip . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    private function is_start($ip) {
        $res = $this->mysqli->query("SELECT enemy FROM phpsl_atetris WHERE ip = '" . $ip . "' AND busy = 1");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function get_busy($id) {
        $res = $this->mysqli->query("SELECT busy FROM phpsl_atetris WHERE id = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    private function get_content($id) {
        $res = $this->mysqli->query("SELECT content FROM phpsl_atetris WHERE id = '" . $id . "'");
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

}

$tetris = new Tetris();
$tetris->run();
