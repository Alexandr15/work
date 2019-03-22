<?php

$path = filter_input(INPUT_SERVER, "DOCUMENT_ROOT");

class CartPrint {

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

    function get_prints() {
        $query = "SELECT * FROM phpsl_cart_print";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1]);
            $i++;
        }
        return $ar;
    }

    function get_cartname() {
        $query = "SELECT * FROM phpsl_cartname";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1]);
            $i++;
        }
        return $ar;
    }

    function get_cartprint() {
        $query = "SELECT id_cart_printer, id_cartridge FROM phpsl_cartprint";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1]);
            $i++;
        }
        return $ar;
    }

    function get_mesto($param) {
        $query = "SELECT mesto FROM phpsl_cartridge WHERE nazva_cart = '" . $param . "' GROUP BY mesto";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = $row[0];
            $i++;
        }
        return $ar;
    }

    function get_carts($param) {
        $query = "SELECT inv_cart, mesto, stat, id FROM phpsl_cartridge "
                . "WHERE nazva_cart = '" . $param . "' ORDER BY inv_cart ASC";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1], $row[2], $row[3]);
            $i++;
        }
        return $ar;
    }

    function get_mesto_all() {
        $query = "SELECT mesto FROM phpsl_cartridge GROUP BY mesto";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = $row[0];
            $i++;
        }
        return $ar;
    }

    function get_stat() {
        $query = "SELECT stat FROM phpsl_cartridge GROUP BY stat";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = $row[0];
            $i++;
        }
        return $ar;
    }

    function get_info_cart($param) {
        $query = "SELECT * FROM phpsl_cartridge WHERE id = '" . $param . "'";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row;
    }

    /*
     * $data[0] - stat
     * $data[1] - mesto
     * $data[2] - primechanie
     */

    function cart_update($id, $data) {
        $query = "UPDATE phpsl_cartridge SET stat = '" . $data[0] . "', "
                . "mesto = '" . $data[1] . "', "
                . "primechanie = '" . $data[2] . "' WHERE id = $id";
        $this->mysqli->query($query);
    }

    function attitude() {
        $query = "SELECT * FROM phpsl_cartprint";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $ar;
    }

    function insert_cartprint($ar) {

        $int1 = (int) $ar[0];
        $int2 = (int) $ar[1];
        $query = "INSERT INTO phpsl_cartprint (id_cart_printer, id_cartridge) VALUES ($int1, $int2)";
        $this->mysqli->query($query);
    }

    function update_mesto($id, $param) {
        $query = "UPDATE phpsl_cartridge "
                . "SET mesto = '" . $param . "' WHERE id = " . $id;
        $this->mysqli->query($query);
    }

    function get_info() {
        $query = "SELECT nazva_cart, stat, mesto FROM phpsl_cartridge";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $ar;
    }

    function insert_cart_history($param) {
        $date = date("Y-m-d H:i:s");
        $query = "INSERT INTO phpsl_cart_history (predmet_id, his, time) "
                . "VALUES ('" . $param[0] . "', '" . $param[1] . "', '"
                . $date . "')";
        $this->mysqli->query($query);
    }

    function get_history($id) {
        $query = "SELECT his, time FROM phpsl_cart_history "
                . "WHERE predmet_id = '" . $id . "'";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1]);
            $i++;
        }
        return $ar;
    }

    function get_date_history($predmet_id) {
        $query = "SELECT time FROM phpsl_cart_history "
                . "WHERE predmet_id = '" . $predmet_id . "' "
                . "ORDER BY time DESC LIMIT 1";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

    function insert_printer($param) {
        $query = "INSERT INTO phpsl_cart_print (nazva_print) "
                . "VALUES ('" . $param . "')";
        $this->mysqli->query($query);
    }

    function insert_cartname($param) {
        $date = date("Y-m-d H:i:s");
        $query = "INSERT INTO phpsl_cartridge "
                . "(nazva_cart, inv_cart, stat, mesto, primechanie, data) "
                . "VALUES ('" . $param[0] . "', '" . $param[1] . "', "
                . "'Заправлен', 'Склад', '', '" . $date . "')";
        $this->mysqli->query($query);

        $query = "SELECT id, mesto FROM phpsl_cartridge GROUP BY id DESC LIMIT 1";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $ar = [];
            $ar[0] = $row[0];
            $ar[1] = $row[1];
            $res->close();
        }
        return $ar;
    }

    function find_cartriges($param) {
        $query = "SELECT nazva_cart, inv_cart, id FROM phpsl_cartridge "
                . "WHERE nazva_cart "
                . "LIKE '%" . $param . "%' "
                . "OR inv_cart LIKE '%" . $param . "%'";
        $res = $this->mysqli->query($query);

        $i = 0;
        $ar = [];
        while ($row = $res->fetch_row()) {
            $ar[$i] = array($row[0], $row[1], $row[2]);
            $i++;
        }
        return $ar;
    }

    function get_inv_cart($param) {
        $query = "SELECT inv_cart FROM phpsl_cartridge "
                . "WHERE inv_cart = '" . $param . "' LIMIT 1";
        $res = $this->mysqli->query($query);

        if ($res) {
            $row = $res->fetch_row();
            $res->close();
        }
        return $row[0];
    }

}
