<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$path = filter_input(INPUT_SERVER, "DOCUMENT_ROOT");
include_once "cart_print.php";

$key = filter_input(INPUT_POST, 'key');

switch ($key) {
    case 1:
        $type = filter_input(INPUT_POST, 'type');
        try {
            $cart = new CartPrint();
            $mesto = $cart->get_mesto($type);
            $carts = $cart->get_carts($type);
            $cart->close();

            $ar = [];
            $ar[0] = $mesto;
            $index = 1;

            foreach ($carts as $value) {
                $ar[$index] = $value;
                $index++;
            }

            $json = json_encode($ar);
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo $json;
        break;
    case 2:
        $id = filter_input(INPUT_POST, 'id');
        try {
            $cart = new CartPrint();
            $mesto = $cart->get_mesto_all();
            $stat = $cart->get_stat();
            $info = $cart->get_info_cart($id);
            $history = $cart->get_history($id);
            $cart->close();

            $ar = [];
            $ar[0] = $mesto;
            $ar[1] = $stat;
            $ar[2] = $info;
            $ar[3] = $history;

            $json = json_encode($ar);
        } catch (Exception $exc) {
            print_r($exc);
            echo "";
            return;
        }
        echo $json;
        break;
    case 3:
        $id = filter_input(INPUT_POST, 'id');
        $data = filter_input(INPUT_POST, 'data');
        try {
            $json = json_decode($data);
            $cart = new CartPrint();
            $cart->cart_update($id, $json);
            $cart->close();
        } catch (Exception $ex) {
            print_r($exc);
            echo "";
            return;
        }
        echo "Запись по id " . $id . " обновлена!";
        break;
    case 4:
        $ar = [];
        try {
            $cart = new CartPrint();
            $cartridges = $cart->get_cartname();
            $printers = $cart->get_prints();
            $ar[0] = $cartridges;
            $ar[1] = $printers;
            $cart->close();
        } catch (Exception $ex) {
            print_r($exc);
            echo "";
            return;
        }
        $json = json_encode($ar);
        echo $json;
        break;
    case 5:
        $data = filter_input(INPUT_POST, 'data');
        $res = json_decode($data);
        try {
            $cart = new CartPrint();
            $cart->insert_cartprint($res);
            $cart->close();
        } catch (Exception $ex) {
            print_r($exc);
            echo "";
            return;
        }
        echo 'success';
        break;
    case 6:
        $data = filter_input(INPUT_POST, 'data');
        try {
            $cart = new CartPrint();
            $cart->insert_printer($data);
            $cart->close();
        } catch (Exception $ex) {
            print_r($exc);
            echo "";
            return;
        }
        echo "Принтер добавлен";
        break;
    case 7:
        try {
            $cart = new CartPrint();
            $cartprint = $cart->get_cartprint();
            $cartridges = $cart->get_cartname();
            $cart->close();
            $ar = array($cartprint, $cartridges);
            $json = json_encode($ar);
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo $json;
        break;
    case 8:
        $id = filter_input(INPUT_POST, 'id');
        $data = filter_input(INPUT_POST, 'data');
        try {
            $cart = new CartPrint();
            $cart->update_mesto($id, $data);
            $cart->close();
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo "Место добавлено!";
        break;
    case 9:
        $id = filter_input(INPUT_POST, 'id');
        try {
            $cart = new CartPrint();
            $res = $cart->get_info_cart($id);
            $cart->close();
            $json = json_encode($res);
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo $json;
        break;
    case 10:
        $data = filter_input(INPUT_POST, 'data');
        $param = json_decode($data);
        try {
            $cart = new CartPrint();
            $cart->insert_cart_history($param);
            $cart->close();
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo "запись истории добавлена";
        break;
    case 11:
        $id = filter_input(INPUT_POST, 'id');
        $str = "нет истории";
        try {
            $cart = new CartPrint();
            $date = $cart->get_date_history($id);
            $cart->close();

            $now = getdate(time());
            if ($date) {
                $temp = explode(" ", $date);
                $date1 = explode("-", $temp[0]);

                $day = (int) $now['mday'] - (int) $date1[2];

                if ($day) {
                    $str = "\"" . $day . " днів\"";
                } elseif ($day === 0) {
                    $str = "\"сьогодні\"";
                }
            }
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo $str;
        break;
    case 12:
        $data = filter_input(INPUT_POST, 'data');
        $param = json_decode($data);
        try {
            $cart = new CartPrint();

            $res = $cart->get_inv_cart($param[1]);
            if ($res === $param[1]) {
                echo '1';
                return false;
            }

            $res = $cart->insert_cartname($param);
            print_r($res);
            $cart->insert_cart_history($res);
            $cart->close();
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo "картридж добавлен";
        break;
    case 13:
        $param = filter_input(INPUT_POST, 'data');
        try {
            $cart = new CartPrint();
            $res = $cart->find_cartriges($param);
            $cart->close();
            $json = json_encode($res);
        } catch (Exception $ex) {
            print_r($ex);
            echo "";
            return;
        }
        echo $json;
        break;
}