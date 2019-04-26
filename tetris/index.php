<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once './action.php';

$tetris = new Tetris();

$ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');
$res = $tetris->get_ip($ip);

if ($res === null) {
    $tetris->insert($ip);
} else {
    $tetris->reset($ip);
}

$tetris->close();
?>
<html>
    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0 no-cache">
        <link type="text/css" rel="stylesheet" href="../tetris/css/css.css">
        <script src="../tetris/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../tetris/script/script.js"></script>
    </head>
    <body>
        <header>Tetris</header>
        <section>
            <div class="conteiner">
                <div id="desc"></div>
                <div id="user"></div>
                <div id="desc2"></div>
                <div id="enemy"></div>
                <div class="clear"></div>
                <input id="but" type="button" value="Two players">
                <input id="but_2" type="button" value="One player">
                <p id="m"></p>
            </div>
        </section>
        <footer></footer>
    </body>
</html>

