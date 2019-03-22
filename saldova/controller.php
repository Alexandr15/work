<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(-1);
header('Content-Type: text/html; charset=utf-8');

include_once "./action.php";

$filename = '/home/sasha/Загрузки/saldova.txt';
//$filename = '/home/sb/samba/inbox/выгрузки/saldova.txt';

if (!file_exists($filename)) {
    echo "Нет докумета ../Загрузки/saldova.txt";
    return;
}

try {
    // открываем файл для чтения
    $fp = fopen($filename, 'r');
    // массив в который считываем все данные с .txt файла
    $list_C1 = array();
    $index = 0;
    if ($fp) {
        while (!feof($fp)) {
            $list_C1[$index] = fgets($fp);
            $index++;
        }
    }
    // закрываем поток
    fclose($fp);
} catch (Exception $exc) {
    echo $exc->getTraceAsString();
    return;
}

//убираем двоеточие и все знаки вначале и в конце строки
for ($i = 0, $max = count($list_C1); $i < $max; $i++) {
    for ($j = 0, $max2 = strlen($list_C1[$i]); $j < $max2; $j++) {
        if ($list_C1[$i][$j] === '"') {
            $list_C1[$i][$j] = "";
        }
    }
    $list_C1[$i] = trim($list_C1[$i]);
}

$edit_list_C1 = array();
$index = 0;
$int = "";
$s = "";
$flag = false;

for ($i = 0, $max = count($list_C1); $i < $max; $i++) {
    if ($list_C1[$i][0] === '1') {
        for ($j = 0, $max2 = strlen($list_C1[$i]); $j < $max2; $j++) {
            if (ctype_digit($list_C1[$i][$j])) {
                $int .= $list_C1[$i][$j];
            } else {
                $s = substr($list_C1[$i], $j);
                break;
            }
        }
        $flag = true;
    }

    if ($flag) {
        $t = explode(" ", $list_C1[$i]);
        if (count($t) === 3) {
            $edit_list_C1[$index] = array($int, $s, $t[0]);
            $index++;
            $int = "";
            $flag = false;
        }
    }
}

$bd_saldova = new Saldova();
$old_bd = $bd_saldova->get_saldova();

for ($i = 0, $max = count($edit_list_C1); $i < $max; $i++) {
    $flag = true;
    for ($j = 0, $max2 = count($old_bd); $j < $max2; $j++) {
        if ($edit_list_C1[$i][0] === $old_bd[$j][0]) {
            if ($edit_list_C1[$i][2] !== $old_bd[$j][2]) {
                $bd_saldova->update_saldova($edit_list_C1[$i][2], $old_bd[$j][6]);
            }
            $flag = false;
            break;
        }
    }

    if ($flag) {
        $bd_saldova->insert_saldova(addslashes($edit_list_C1[$i][0]), addslashes($edit_list_C1[$i][1]), addslashes($edit_list_C1[$i][2]));
    }
}
$bd_saldova->close();
header("Location: index.php");
