<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once './bd_tetris.php';

session_start();
$id_user = session_id();
$tetris = new Tetris();
$res = $tetris->get_session();

$flag = true;
if ($res) {
    foreach ($res as $row) {
        if ($row === session_id()) {
            $flag = false;
            break;
        }
    }
}

if ($flag) {
    $arr = array(session_id(), 0);
    $tetris->insert_row($arr);
}
$tetris->close();
?>
<html>
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link type="text/css" rel="stylesheet" href="../tetris/css/css.css">
        <script src="../tetris/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../tetris/script/script.js"></script>
        <script type='text/javascript'>
            var id_user = "<?php echo session_id(); ?>";
        </script>
    </head>
    <body>
        <div class="container">
            <div class="frame2">
                <div id="desc5"></div>
            </div>
            <div class="frame">		
                <div id="desc"></div>
                <div id="desc2">
                    <div id="showFig"></div>
                </div>
                <div id="desc3">
                    <div id="speed"></div>
                    <div id="score"></div>
                </div>
                <div id="desc4">
                    <div id="arrowleft">L</div>
                    <div id="arrowright">R</div>
                    <div id="arrowdown">D</div>
                    <div id="space">Rt</div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="frame3">
            <input id="start" class="rect4" type="button" value="Start">
        </div>
    </body>
</html>
