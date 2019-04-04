<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once '../tetris/action.php';

$tetris = new Tetris();

$sum = "";
for ($i = 0; $i < 10; $i++) {
    $sum .= random_int(1, 9);
}

$ip = filter_input(INPUT_SERVER, 'REMOTE_ADDR');

$res = $tetris->getIp($ip);

if ($res === null) {
    $tetris->insertUser($sum, $ip);
} else {
    $tetris->updateip($sum, $ip);
}
?>
<html>
    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link type="text/css" rel="stylesheet" href="../tetris/css/css.css">
        <script src="../tetris/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../tetris/script/script.js"></script>
        <script type="text/javascript">
            var sum = "<?php echo $sum ?>";
        </script>
    </head>
    <body>
        <div class="conteiner">
            <div id="scene">
                <div id="desc2"></div>
                <div id="desc"></div>
                <div class="clear"></div>
                <div id="menu">
                    <input id="solo" type="button" value="Соло">
                    <input id="net" type="button" value="Сети">
                    <input id="bd" type="button" value="очистить бд" hidden="on">
                </div>
                <div id="group"></div>
                <p id="m"></p>
            </div>
        </div>
    </body>
</html>

