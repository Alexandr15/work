<?php

class EOT {

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

    function get_inv_predmet($param) {
        $query = "SELECT inv, predmet, id FROM phpsl_inv WHERE kb = '" . $param . "' "
                . "AND (predmet = 'ПК' OR predmet = 'Принтер' OR predmet = 'сервер' OR predmet = 'МФУ') "
                . "AND (`status` = 1 OR `status` = 10 OR `status` = 21 OR `status` = 18) AND del = 0";
        $res = $this->mysqli->query($query);
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $arr;
    }

    function get_ip($param) {
        $query = "SELECT ip, nb_name, mac FROM phpsl_mac WHERE id_inv = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function get_mac_id($param) {
        $query = "SELECT nb_name FROM phpsl_mac WHERE ip = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function get_surname($param) {
        $query = "SELECT `name` FROM phpsl_web_dostup WHERE last_ip = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function get_nb_name() {
        $res = $this->mysqli->query("SELECT nb_name FROM phpsl_mac");
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = $row[0];
            $i++;
        }
        return $arr;
    }

    function get_inv($param) {
        $query = "SELECT * FROM phpsl_inv WHERE id = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function get_status() {
        $res = $this->mysqli->query("SELECT st FROM phpsl_inv_st GROUP BY st ORDER BY st ASC");
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = $row[0];
            $i++;
        }
        return $arr;
    }

    function get_status_all() {
        $res = $this->mysqli->query("SELECT st, id, predmet FROM phpsl_inv_st");
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $arr;
    }

    function get_st_id($predmet, $st) {
        $query = "SELECT id FROM phpsl_inv_st WHERE predmet='" . $predmet . "' AND st='" . $st . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function get_os() {
        $query = "SELECT os FROM phpsl_inv WHERE os != '' GROUP BY os";
        $res = $this->mysqli->query($query);
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = $row[0];
            $i++;
        }
        return $arr;
    }

    function get_rs($param) {
        $query = "SELECT rs, id FROM phpsl_inv_rs WHERE rs LIKE '%=" . $param . "|%'";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function get_predmet($param) {
        $query = "SELECT predmet FROM phpsl_inv WHERE id = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function insert_st($param1, $param2) {
        $query = "INSERT INTO phpsl_inv_st (predmet, st) VALUES ('" . $param1 . "', '" . $param2 . "')";
        $res = $this->mysqli->query($query);
        return $res;
    }

    function update_inv($param) {
        $query = "UPDATE phpsl_inv "
                . "SET `status` = '" . $param[0] . "', info = '" . $param[1] . "', mo = '" . $param[2] . "', cp = '" . $param[3] . "', "
                . "op = '" . $param[4] . "', hd = '" . $param[5] . "', del = '" . $param[6] . "', kb = '" . $param[7] . "', os = '" . $param[8] . "' "
                . "WHERE id = '" . $param[9] . "'";
        $res = $this->mysqli->query($query);
        return $res;
    }

    function get_device($cab, $predmet) {
        $query = "SELECT inv, sn, id FROM phpsl_inv WHERE kb = '" . $cab . "' AND predmet = '" . $predmet . "'";
        $res = $this->mysqli->query($query);

        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $arr;
    }

    function update_rs($id_rs, $rs) {
        $query = "UPDATE phpsl_inv_rs SET rs = '" . $rs . "' WHERE id = '" . $id_rs . "'";
        $res = $this->mysqli->query($query);
        return $res;
    }

    function update_kb($cab, $id) {
        $query = "UPDATE phpsl_inv SET kb = '" . $cab . "' WHERE id = '" . $id . "'";
        $res = $this->mysqli->query($query);
        return $res;
    }

    function insert_inv($arr) {
        $date = date("Y-m-d H:i:s");
        $query = "INSERT INTO phpsl_inv "
                . "(inv, sn, predmet, `status`, info, date, mo, cp, op, hd, del, kb, os) "
                . "VALUES ('" . $arr[0] . "', '" . $arr[1] . "', '" . $arr[2] . "', '" . $arr[3] . "', '" . $arr[4] . "'"
                . ", '" . $date . "', '" . $arr[5] . "', '" . $arr[6] . "', '" . $arr[7] . "', '" . $arr[8] . "'"
                . ", '0', '" . $arr[9] . "', '" . $arr[10] . "')";
        $res = $this->mysqli->query($query);

        $query = "SELECT id FROM phpsl_inv ORDER BY id DESC LIMIT 1";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function insert_rs($param) {
        $query = "INSERT INTO phpsl_inv_rs (rs) VALUES ('" . $param . "')";
        $this->mysqli->query($query);
    }

    function search_inv($subject, $string) {
        $query = "SELECT inv, predmet, kb, id FROM phpsl_inv WHERE " . $subject . " LIKE '%" . $string . "%'";
        $res = $this->mysqli->query($query);
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = array($row[0], $row[1], $row[2], $row[3]);
            $i++;
        }
        return $arr;
    }

    function get_dhcp($param) {
        $query = "SELECT mac.mac, mac.ip, mac.nb_name, web.`name` "
                . "FROM phpsl_mac mac, phpsl_web_dostup web "
                . "WHERE web.last_ip = mac.ip AND mac.id_inv = '" . $param . "'";
        $res = $this->mysqli->query($query);
        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    function choise_inv($query) {
        $res = $this->mysqli->query($query);
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = array($row[0], $row[1], $row[2], $row[3], $row[4]);
            $i++;
        }
        return $arr;
    }

    function oreder_by($query) {
        $res = $this->mysqli->query($query);
        $arr = array();
        $i = 0;
        while ($row = $res->fetch_row()) {
            $arr[$i] = $row[0];
            $i++;
        }
        return $arr;
    }

}
