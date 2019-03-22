<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

//include_once './action.php';
?>
<html>
    <head>
        <title>index</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">

            .container{
                width: 80%;
                margin: 0 auto;
                padding: 10px 0 10px 0;
            }

            a{
                display: block;
                text-decoration: none;
                color: black;
            }

            .but{
                width: 100%;
                height: 40px;
                border: 1px solid #000;
                text-align: center;
                margin: 0 0 5px 0;
                padding: 5px 0 0 0;
                font-size: 18pt;
            }

            .col-1{
                width: 20%;
            }

            .but:hover{
                background-color: #dad55e;
            }
        </style>
        <script src="source/jquery-3.3.1.min.js" type="text/javascript"></script>
    </head>

    <body>
        <script type="text/javascript">
        </script>
        <div class="container">
            <div class="col-1">
                <div class="but"><a href="cartridge/index.php">cartridge</a></div>
                <div class="but"><a href="saldova/index.php">сальдова</a></div>
                <div class="but"><a href="test/index.php">Тест</a></div>
                <div class="but"><a href="tetris/index.php">square</a></div>
                <div class="but"><a href="cartridge/index.php">cartridge</a></div>
                <div class="but"><a href="eot/index.php">eot</a></div>
                <div class="but"><a href="resume/index.php">резюме</a></div>
                <div class="but"><a href="roli/index.php">роли</a></div>
                <div class="but"><a href="workers/index.php">ецп</a></div>
                <div class="but"><a href="form/index.php">форма</a></div>
            </div>
        </div>
        <div style="width: 100%;">
            <?php
           
            ?>
        </div>
    </body>
</html>
