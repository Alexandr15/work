<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once 'eot.php';

$key = filter_input(INPUT_POST, 'key');
$id = filter_input(INPUT_POST, 'id');

switch ($key) {
    case 1:
        try {
            $eot = new EOT();
            $res = $eot->get_ip($id);
            $s = "";

            if ($res) {
                $fio = $eot->get_surname($res[0]);
                echo $fio ? ($res[0] . " " . $res[2] . " " . $fio[0]) : ($res[0] . " " . $res[2]);
            } else {
                $row = $eot->get_inv($id);
                echo $row[4];
            }
            $eot->close();
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 2:
        try {
            $eot = new EOT();
            $res = $eot->get_inv($id);
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 3:
        try {
            $type = filter_input(INPUT_POST, 'type');
            $eot = new EOT();
            $res = $eot->get_rs($id);
            $s = explode("|", $res[0]);

            $ar = [];
            $index = 0;
            $str = "";
            if ($res) {
                for ($i = 0; $i < count($s); $i++) {
                    for ($j = strlen($s[$i]) - 1; $j >= 0; $j--) {
                        if ($s[$i][$j] === '=') {
                            $t = strrev($str);
                            $ar[$index] = $t;
                            $index++;
                            $str = "";
                            break;
                        } else {
                            $str .= $s[$i][$j];
                        }
                    }
                }
            }

            $res = "";
            if (!empty($ar)) {
                foreach ($ar as $id_dev) {
                    $predmet = $eot->get_predmet($id_dev);
                    if ($type === $predmet[0] || ($predmet[0] === 'МФУ' && $type === 'Принтер')) {
                        $res = $id_dev;
                        break;
                    }
                }
            }
            $eot->close();
            echo $res;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 4:
        try {
            $predmet = filter_input(INPUT_POST, 'predmet');
            $st = filter_input(INPUT_POST, 'st');
            $eot = new EOT();
            $res = $eot->insert_st($predmet, $st);
            $eot->close();

            if ($res) {
                echo "запис додана";
            } else {
                echo "помилка";
            }
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 5:
        try {
            $eot = new EOT();
            $res = $eot->get_status();
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 6:
        try {
            $eot = new EOT();
            $res = $eot->get_os();
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 7:
        try {
            $eot = new EOT();
            $res = $eot->get_status_all();
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 8:
        try {
            $arr = filter_input(INPUT_POST, 'arr');
            $json = json_decode($arr);
            $eot = new EOT();
            $inv = $eot->get_inv($json[9]);

            if ($json[7] != $inv[14]) {
                $rs = $eot->get_rs($json[9]);
                $mas = array();
                $flag = false;
                for ($j = 0, $i = 0, $s = ""; $j < strlen($rs[0]); $j++) {
                    if ($rs[0][$j] === '=') {
                        $flag = true;
                    } else if ($rs[0][$j] === '|') {
                        $mas[$i] = (int) $s;
                        $i++;
                        $s = "";
                        $flag = false;
                    } else if ($flag) {
                        $s .= $rs[0][$j];
                    }
                }
                for ($i = 0; $i < count($mas); $i++) {
                    $eot->update_kb($json[7], $mas[$i]);
                }
            }

            $res = $eot->update_inv($json);
            $eot->close();
            echo "";
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 9:
        try {
            $type = filter_input(INPUT_POST, 'type');
            $eot = new EOT();
            $res = $eot->get_inv($id);
            $cab = $res[14];
            $predmets = $eot->get_device($cab, $type);
            $eot->close();
            $json = json_encode($predmets);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 10:
        try {
            $id_dev = filter_input(INPUT_POST, 'id_dev');
            $eot = new EOT();
            $rs = $eot->get_rs($id);
            $res = $eot->get_inv($id_dev);
            $t = $eot->get_rs($id_dev);
            if ($t === NULL) {
                $new = $rs[0] . $res[0] . "=" . $id_dev . "|";
                $s = $eot->update_rs($rs[1], $new);
            } else {
                $s = $res[2] . " уже прикреплен к ПК";
            }
            $eot->close();
            echo $s;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 11:
        try {
            $inv = filter_input(INPUT_POST, 'inv');
            $s = $inv . '=' . $id . '|';
            echo $s;
            $eot = new EOT();
            $rs = $eot->get_rs($id);
            if ($rs == NULL) {
                echo "";
                return;
            }
            $new = str_replace($s, "", $rs[0]);
            $json = $eot->update_rs($rs[1], $new);
            $eot->close();
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 12:
        try {
            $arr = filter_input(INPUT_POST, 'arr');
            $json = json_decode($arr);

            $eot = new EOT();
            $res = $eot->insert_inv($json);

            if ($json[2] === 'ПК' || $json[2] === 'сервер') {
                if ($res) {
                    $s = $json[0] . '=' . $res . '|';
                    $res = $eot->insert_rs($s);
                }
            }

            $eot->close();
        } catch (Exception $exc) {
            echo "error connect with database";
        }
        break;
    case 13:
        try {
            $subject = filter_input(INPUT_POST, 'select');
            $string = filter_input(INPUT_POST, 'search');
            $eot = new EOT();

            if ($subject === 'ip') {
                $res = $eot->get_mac_id('172.135.3.' . $string); 
                $inv = substr($res, -3);
                echo $inv;
            } else {
                $res = $eot->search_inv($subject, $string);
                $json = json_encode($res);
                echo $json;
            }

            $eot->close();
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 14:
        try {
            $eot = new EOT();
            $res = $eot->get_dhcp($id);
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 14:
        try {
            $eot = new EOT();
            $res = $eot->choise_inv();
            $eot->close();
            $json = json_encode($res);
            echo $json;
        } catch (Exception $exc) {
            echo "";
        }
        break;
    case 15:
        $contain = filter_input(INPUT_POST, 'contain');
        $json = json_decode($contain);
        $sql = "SELECT inv, sn, predmet, kb, id FROM phpsl_inv ";
        $s = " WHERE";
        $t = $s;
        for ($i = 0; $i < count($json); $i++) {
            if ($json[$i] === "") {
                continue;
            }
            switch ($i) {
                case 0:
                    $s .= " predmet = '" . $json[$i] . "' AND";
                    break;
                case 1:
                    $s .= " `status` = '" . $json[$i] . "' AND";
                    break;
                case 2:
                    $s .= " mo = '" . $json[$i] . "' AND";
                    break;
                case 3:
                    $s .= " cp = '" . $json[$i] . "' AND";
                    break;
                case 4:
                    $s .= " op = '" . $json[$i] . "' AND";
                    break;
                case 5:
                    $s .= " hd = '" . $json[$i] . "' AND";
                    break;
                case 6:
                    $s .= " kb = '" . $json[$i] . "' AND";
                    break;
                case 7:
                    $s .= " os = '" . $json[$i] . "' AND";
                    break;
                case 8:
                    $s .= " date BETWEEN '" . $json[$i] . "' AND '" . $json[$i + 1] . "' AND";
                    break;
            }
        }
        if ($t != $s) {
            for ($i = 0, $count = strlen($s) - 1; $i < 3; $i++) {
                $s[$count] = "";
                $count--;
            }
            $new = trim($s);
            $sql .= $new;
        }
        $sql .= " ORDER BY inv ASC";
        $eot = new EOT();
        $res = $eot->choise_inv($sql);
        $eot->close();
        $data = json_encode($res);
        echo $data;
        break;
}

