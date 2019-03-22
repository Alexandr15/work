<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once "./action.php";

$flag = filter_input(INPUT_GET, "flag");

$saldova = new Saldova();

if ((bool) $flag) {
    $list = $saldova->get_saldova($flag);
} else {
    $list = $saldova->get_saldova($flag);
}
$predmets = $saldova->get_predmet();

$saldova->close();
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
        <p id="show"></p>
        <div class="container">

            <div class="cols col-12 edge">
                <div class="cols col-10 r-1"></div>
                <div class="cols col-2 r-1">
                    <form class="r-3" action="index.php" method="post">
                        <input class="but-1" type="submit" value="Main">
                    </form>
                </div>

                <div class="cols col-10 r-1"></div>
                <table width="100%" cellspacing="0" border="1" align="center" style="text-align: center;">
                    <tr height="30">
                        <td>Номер</td>
                        <td>Название</td>
                        <td>Сотрудник</td>
                        <td width='150px'>Предмет</td>
                        <td width='150px'>Адресс</td>
                        <td width='150px'>Статус</td>
                        <td width='150px'>Действие</td>
                    </tr>
                    <?php
                    for ($i = 0, $max = count($list); $i < $max; $i++) {
                        echo "<tr height='30' data-id='" . $list[$i][6] . "'>";
                        echo "<td>" . $list[$i][0] . "</td>"
                        . "<td>" . $list[$i][1] . "</td>"
                        . "<td>" . $list[$i][2] . "</td>"
                        . "<td width='150px'><select class='but type' data-id='" . $list[$i][6] . "'><option value=''></option>";

                        for ($j = 0, $max2 = count($predmets); $j < $max2; $j++) {
                            if ($predmets[$j] === $list[$i][3]) {
                                echo "<option selected>" . $predmets[$j] . "</option>";
                            } else {
                                echo "<option>" . $predmets[$j] . "</option>";
                            }
                        }

                        echo "</select></td>"
                        . "<td width='150px'><select class='but address' data-id='" . $list[$i][6] . "'><option value=''></option><option";

                        if ((int) $list[$i][4] === 1) {
                            echo " selected";
                        }
                        echo " value='1'>Прохоровська</option>"
                        . "<option";

                        if ((int) $list[$i][4] === 2) {
                            echo " selected";
                        }
                        echo " value='2'>Космонавтов</option>"
                        . "<option";

                        if ((int) $list[$i][4] === 3) {
                            echo " selected";
                        }
                        echo " value='3'>Біляївка</option>";
                        echo "</select></td><td width='150px'><select class='but state' data-id='" . $list[$i][6] . "'>"
                        . "<option value=''></option><option";

                        if ((int) $list[$i][5] === 1) {
                            echo " selected";
                        }
                        echo " value='1'>рабочий</option>"
                        . "<option";

                        if ((int) $list[$i][5] === 2) {
                            echo " selected";
                        }
                        echo " value='2'>списанный</option>"
                        . "<option";

                        if ((int) $list[$i][5] === 3) {
                            echo " selected";
                        }
                        echo " value='3'>дефективный</option>"
                        . "</select></td><td width='150px'>"
                        . "<input class='but-4 Up' type='button' value='Up' data-id='" . $list[$i][6] . "'>"
                        . "<input class='but-4 Del' type='button' value='Del' data-id='" . $list[$i][6] . "'></td>";
                        echo "</tr>";
                    }
                    ?>

                </table>
            </div>
            <option></option>
        </div>
    </body>
</html>