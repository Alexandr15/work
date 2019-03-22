<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once 'eot.php';

function create_rects($param) {
    $eot = new EOT();
    $res = $eot->get_inv_predmet($param);
    $eot->close();

    for ($i = 0; $i < count($res); $i++) {
        $t = substr($res[$i][0], -3);

        echo "<div class='rect-2' style='background-color: " . get_bgcolor($res[$i][1]) . "; color: " . get_color($res[$i][1]) . "' "
        . "data-id='" . $res[$i][2] . "'>" . $t . "</div>";
    }
}

function get_bgcolor($key) {
    $color = "";
    switch ($key) {
        case 'ПК':
            $color = "#088A4B";
            break;
        case 'Принтер':
        case 'МФУ':
            $color = "#00FFFF";
            break;
        case 'сервер':
            $color = "#660033";
            break;
    }
    return $color;
}

function get_color($key) {
    $color = "";
    switch ($key) {
        case 'ПК':
            $color = "#eef4f7";
            break;
        case 'Принтер':
        case 'МФУ':
            $color = "#000";
            break;
        case 'сервер':
            $color = "#eef4f7";
            break;
    }
    return $color;
}

$get = "";
if (filter_has_var(INPUT_GET, 'eot')) {
    $get = filter_input(INPUT_GET, 'eot');
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <link type="text/css" rel="stylesheet"  href="../eot/css/css.css">
        <link rel="SHORTCUT ICON" href="http://host/favicon.ico">
        <script type="text/javascript" src="../eot/script/script.js"></script>
        <script type="text/javascript" src="../eot/script/jquery-3.3.1.min.js"></script>
    </head>

    <body>

        <script type="text/javascript">
            var get = "<?php echo $get; ?>";
        </script>
        <div class="container">

            <div class="row-7">
                <div class="cols col-1" style="height: 32px">
                    <input id="add" class="but-4" type="button" value="+">
                </div>
                <div class="cols col-7" style="height: 32px"></div>
                <div class="cols col-1" style="height: 32px">
                    <select id="what" class="but-4">
                        <option selected>inv</option>
                        <option>sn</option>
                        <option>info</option>
                        <option>ip</option>
                    </select>
                </div>
                <div class="cols col-2" style="height: 32px">
                    <input id="search" class="but-4" type="text" maxlength="50" placeholder="Пошук" value=""></div>
                <div class="cols col-1" style="height: 32px">
                    <input id="find" class="but-4" type="button" value="Найти"></div>
            </div>

            <div class="frame">

                <!--                Первый ряд-->
                <div class="row-1">
                    <div class="cab">
                        <div class="rect">
                            <div class="number">18</div>
                            <?php
                            create_rects(18);
                            ?>
                        </div></div>
                    <div class="cab"><div class="rect-1" ></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">20</div>
                            <?php
                            create_rects(20);
                            ?>
                        </div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">21</div>
                            <?php
                            create_rects(21);
                            ?>
                        </div>                        
                    </div>
                </div>

                <!--                Второй ряд-->
                <div class="row-1">
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">22a</div>
                            <?php
                            create_rects("22a");
                            ?>
                        </div></div>
                </div>

                <!--                Третий ряд-->
                <div class="row-1">

                    <div class="cab">
                        <div class="rect">
                            <div class="number">17</div>
                            <?php
                            create_rects(17);
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">16</div>
                            <?php
                            create_rects(16);
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">15</div>
                            <?php
                            create_rects(15);
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">14</div>
                            <?php
                            create_rects(14);
                            ?>
                        </div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">23</div>
                            <?php
                            create_rects(23);
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">22</div>
                            <?php
                            create_rects(22);
                            ?>
                        </div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="frame">

                <!--                Первый ряд-->
                <div class="row-1">
                    <div class="cab">
                        <div class="rect">
                            <div class="number">7a</div>
                            <?php
                            create_rects('7a');
                            ?>
                        </div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect" >
                            <div class="number">7</div>
                            <?php
                            create_rects('7');
                            ?>
                        </div></div>

                    <div class="cab"><div class="rect-1"></div></div>

                    <div class="cab">
                        <div class="rect">
                            <div class="number">6</div>
                            <?php
                            create_rects('6');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">5</div>
                            <?php
                            create_rects('5');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">4</div>
                            <?php
                            create_rects('4');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">1</div>
                            <?php
                            create_rects('1');
                            ?>
                        </div>                        
                    </div>
                </div>

                <!--                Второй ряд-->
                <div class="row-1">
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab"><div class="rect-1"></div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">3</div>
                            <?php
                            create_rects("3");
                            ?>
                        </div></div>
                </div>

                <!--                Третий ряд-->
                <div class="row-1">

                    <div class="cab">
                        <div class="rect">
                            <div class="number">8</div>
                            <?php
                            create_rects('8');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">9</div>
                            <?php
                            create_rects('9');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">10</div>
                            <?php
                            create_rects('10');
                            ?>
                        </div></div>

                    <div class="cab"><div class="rect-1"></div></div>

                    <div class="cab">
                        <div class="rect">
                            <div class="number">11</div>
                            <?php
                            create_rects('11');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">12</div>
                            <?php
                            create_rects('12');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">13</div>
                            <?php
                            create_rects('13');
                            ?>
                        </div></div>
                    <div class="cab">
                        <div class="rect">
                            <div class="number">2</div>
                            <?php
                            create_rects('2');
                            ?>
                        </div></div>
                </div>

            </div>
            <?php
            $eot = new EOT();
            $predmets = $eot->oreder_by("SELECT predmet FROM phpsl_inv GROUP BY predmet ORDER BY predmet ASC");
            $status = $eot->get_status_all();
            $mo = $eot->oreder_by("SELECT mo FROM phpsl_inv GROUP BY mo ORDER BY mo ASC");
            $cp = $eot->oreder_by("SELECT cp FROM phpsl_inv GROUP BY cp ORDER BY cp ASC");
            $op = $eot->oreder_by("SELECT op FROM phpsl_inv GROUP BY op ORDER BY op ASC");
            $hd = $eot->oreder_by("SELECT hd FROM phpsl_inv GROUP BY hd ORDER BY hd ASC");
            $kb = $eot->oreder_by("SELECT kb FROM phpsl_inv GROUP BY kb ORDER BY kb ASC");
            $os = $eot->oreder_by("SELECT os FROM phpsl_inv GROUP BY os ORDER BY os ASC");
            $eot->close();

            function get_option($arr) {
                if (!is_array($arr)) {
                    reutrn;
                }
                $s = "";
                foreach ($arr as $value) {
                    if ($value === "" || $value === "-") {
                        continue;
                    }
                    $s .= '<option>' . $value . '</option>';
                }
                return $s;
            }
            ?>

            <div class="cols col-3 pad">
                <select class="but-3 sort">
                    <option>Предметы</option>
                    <?php
                    $res = get_option($predmets);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Статус</option>
                    <?php
                    $s = "";
                    for ($i = 0; $i < count($status); $i++) {
                        $s .= "<option value='" . $status[$i][1] . "'>" . $status[$i][2] . " - " . $status[$i][0] . "</option>";
                    }
                    echo $s;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Материнские платы</option>
                    <?php
                    $res = get_option($mo);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Процессоры</option>
                    <?php
                    $res = get_option($cp);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Оперативная память</option>
                    <?php
                    $res = get_option($op);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Жесткие диски</option>
                    <?php
                    $res = get_option($hd);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Кабинеты</option>
                    <?php
                    $res = get_option($kb);
                    echo $res;
                    ?>
                </select>
                <select class="but-3 sort">
                    <option>Операционная система</option>
                    <?php
                    $res = get_option($os);
                    echo $res;
                    ?>
                </select>
                <input id="date1" class="but-3" type="text" placeholder="Например: 1971-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="">
                <input id="date2" class="but-3" type="text" placeholder="Например: 1971-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="">
                <input id="choice" class="but-3" type="button" value="Найти">
            </div>

            <div id="showSort" class="cols col-9">
            </div>

            <div class="clear"></div>
            <div id="message"></div>
        </div>

        <?php
        ?>

    </body>
</html>
