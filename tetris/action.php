<?php
include_once "./bd_tetris.php";

$key = filter_input(INPUT_POST, 'key');

switch ($key) {
    case 1:
        $stream = filter_input(INPUT_POST, 'data');
        $name = filter_input(INPUT_POST, 'name');
        $path = "/home/sasha/public_html/tetris/map/" . $name . ".txt";
        $fp = fopen($path, 'w');
        fwrite($fp, $stream);
        fclose($fp);
        break;
    case 2:
        $str = "";
        $name = filter_input(INPUT_POST, 'name');
        $path = "/home/sasha/public_html/tetris/map/" . $name . ".txt";
        $fp = fopen($path, 'r');
        if ($fp) {
            while (!(feof($fp))) {
                $str .= fgetc($fp);
            }
        }
        echo $str;
        break;
    case 3:
        $tetris = new Tetris();
        $res[0] = $tetris->get_count();
        $tetris->close();
        echo $res;
        break;
    case 4:
        $tetris = new Tetris();
        $res = $tetris->get_tetris_lim10();
        $tetris->close();
        $json = json_encode($res);
        echo $json;
        break;
} 