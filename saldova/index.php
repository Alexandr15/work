<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
include_once "./action.php";

$saldova = new Saldova();
$predmets = $saldova->get_predmet();
$surnames = $saldova->get_surnames();
$saldova->close();

function show() {
    $surname = filter_input(INPUT_POST, "surname");
    $type = filter_input(INPUT_POST, "type");
    $address = filter_input(INPUT_POST, "address");
    $state = filter_input(INPUT_POST, "state");

    $query = "SELECT * FROM phpsl_saldova";

    $s = " WHERE";

    if ($surname !== "" && $surname !== null) {
        $s .= " surname = '" . $surname . "' AND";
    }

    if ($type !== "" && $surname !== null) {
        $s .= " type = '" . $type . "' AND";
    }

    if ($address !== "" && $surname !== null) {
        $s .= " address = '" . $address . "' AND";
    }

    if ($state !== "" && $surname !== null) {
        $s .= " state = '" . $state . "' AND";
    }

    $query .= $s;
    $query .= " type != '' AND address != '' AND state != '' ORDER BY surname ASC";

    return $query;
}

$saldova = new Saldova();
$query = show();
$res = $saldova->get_query($query);
$saldova->close();

$name = filter_input(INPUT_POST, "surname");
$pred = filter_input(INPUT_POST, "type");
$where = filter_input(INPUT_POST, "address");
$status = filter_input(INPUT_POST, "state");

?>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Сальдовая</title>
        <link rel="stylesheet" type="text/css" href="css/css.css">
        <link rel="SHORTCUT ICON" href="http://host/favicon.ico">
        <script src="script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="script/script.js"></script>
    </head>    
    <body>
        <div class="container">
            
            <p id="sreit"></p>
            
            <div class="cols col-10 r-1"></div>
            <div class="cols col-1 r-1">
                <form class="r-3" action="controller.php" method="post">
                    <input class="but" type="submit" value="update">
                </form>
            </div>
            <div class="cols col-1 r-1"></div>

            <div class="cols col-9 r-1"></div>

            <div class="cols col-1 r-1">
                <input id="reit" class="but" type="submit" value="reiteration">
            </div>

            <div class="cols col-1 r-1">
                <form class="r-3" action="edit.php?flag=1" method="post">
                    <input class="but" type="submit" value="sort list">
                </form>
            </div>

            <div class="cols col-1 r-1">
                <form class="r-3" action="edit.php?flag=0" method="post">
                    <input class="but" type="submit" value="full list">
                </form>
            </div>

            <div>
                <div class="cols col-3 r-2"></div>
                <form action="#" method="post">
                    <div class="cols col-1 r-2">
                        <select class="but" name="surname">
                            <option value="">Surname</option>
                            <?php
                            foreach ($surnames as $surname) {
                                echo "<option";

                                if ($name === $surname) {
                                    echo " selected";
                                }

                                echo " value='" . $surname . "'>" . $surname . "</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="cols col-1 r-2">
                        <select class="but" name="type">
                            <option value="">Type</option>
                            <?php
                            foreach ($predmets as $predmet) {
                                echo "<option";

                                if ($pred === $predmet) {
                                    echo " selected";
                                }

                                echo " value='" . $predmet . "'>" . $predmet . "</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="cols col-1 r-2">
                        <select class="but" name="address">
                            <option value="">Address</option>
                            <option <?php echo ($where === '1' ? 'selected' : ''); ?> value="1">Прохоровська</option>
                            <option <?php echo ($where === '2' ? 'selected' : ''); ?> value="2">Космонавтов</option>
                            <option <?php echo ($where === '3' ? 'selected' : ''); ?> value="3">Біляївка</option>
                        </select>
                    </div>
                    <div class="cols col-1 r-2">
                        <select class="but" name="state">
                            <option value="">State</option>
                            <option <?php echo ($status === '1' ? 'selected' : ''); ?> value="1">рабочий</option>
                            <option <?php echo ($status === '2' ? 'selected' : ''); ?> value="2">списанный</option>
                            <option <?php echo ($status === '3' ? 'selected' : ''); ?> value="3">дефективный</option>
                        </select>
                    </div>
                    <div class="cols col-1 r-2">
                        <input class="but" type="submit" value="Send">
                    </div>
                    <div class="cols col-4 r-2"></div>
                </form>
            </div>
            <div class="cols col-12 r-4">
                <table width="100%" cellspacing="0" border="1" align="center" style="text-align: center;">
                    <tr height="30">
                        <td>Номер</td>
                        <td>Название</td>
                        <td>Сотрудник</td>
                        <td width='150px'>Предмет</td>
                        <td width='150px'>Адресс</td>
                        <td width='150px'>Статус</td>
                    </tr>

                    <?php
                    for ($i = 0, $max = count($res); $i < $max; $i++) {
                        echo "<tr height='30'><td>" . $res[$i][0] . "</td><td class='show' data-inv='" . $res[$i][0] . "'>"
                        . $res[$i][1] . "</td><td>" . $res[$i][2] . "</td>"
                        . "<td width='150px'>" . $res[$i][3] . "</td><td width='150px'>";

                        if ((int) $res[$i][4] === 1) {
                            echo 'Прохоровська';
                        } else if ((int) $res[$i][4] === 2) {
                            echo 'Космонавтов';
                        } else if ((int) $res[$i][4] === 3) {
                            echo 'Біляївка';
                        }

                        echo "</td>"
                        . "<td width='150px'>";

                        if ((int) $res[$i][5] === 1) {
                            echo 'рабочий';
                        } else if ((int) $res[$i][5] === 2) {
                            echo 'списанный';
                        } else if ((int) $res[$i][5] === 3) {
                            echo 'дефективный';
                        }

                        echo "</td></tr>";
                    }
                    echo "<tr height='30'><td></td><td> Всього: " . count($res) . "</td><td></td><td></td><td></td><td></td></tr>";
                    ?>

                </table>
            </div>
            <p id="mes"></p>
            <p id="copy"></p>
            <script type="text/javascript">
                var date = new Date();
                $("#copy").text(date.getFullYear());
            </script>

    </body>
</html>
