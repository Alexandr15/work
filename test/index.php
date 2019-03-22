<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once '../test/action.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="../test/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../test/script/script.js"></script>
        <link type="text/css" rel="stylesheet" href="../test/css/css.css">
    </head>
    <body>
        <?php
        
        $test = new Test();
        $test->run();
        
        
        ?>

    </body>
</html>
