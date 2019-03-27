<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
?>
<html>
    <head>
        <title>index</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="resource/script/jquery-3.3.1.min.js" type="text/javascript"></script>
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
    </head>

    <body>
        <div id="show"></div>
        <script type="text/javascript">
//            var ar = [];
//            var s = "";
//            for (var i = 0; i < 10; i++) {
//                ar[i] = [];
//                for (var j = 0; j < 10; j++) {
//                    ar[i][j] = 0;
//                    s += ar[i][j] + " ";
//                }
//                s += "<br>";
//            }
//
//            var el = document.getElementById("show");
//            el.innerHTML = s;
//
//            //$("#show").html(s);

        </script>

        <div class="container">
            <div class="col-1">
                <div class="but"><a href="cartridge/index.php">cartridge</a></div>
                <div class="but"><a href="saldova/index.php">сальдова</a></div>
                <div class="but"><a href="test/index.php">Тест</a></div>
                <div class="but"><a href="tetris/index.html">Тетрис</a></div>
                <div class="but"><a href="cartridge/index.php">cartridge</a></div>
                <div class="but"><a href="eot/index.php">eot</a></div>
                <div class="but"><a href="resume/index.php">резюме</a></div>
                <div class="but"><a href="roli/index.php">роли</a></div>
                <div class="but"><a href="workers/index.php">ецп</a></div>
                <div class="but"><a href="form/index.php">форма</a></div>
            </div>
        </div>
        <div style="width: 100%;">
            <?php ?>
        </div>
    </body>
</html>
