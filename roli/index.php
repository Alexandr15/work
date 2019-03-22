<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once '../roli/action.php';

$path = "/home/sasha/work/роли/DATA/15535/";
//$path = "/home/sb/samba/inbox/выгрузки/15535/";

if (!($forum_dostup >= 4)) {
    return false;
}

$roli = new Roli();

$str = "";
// отработает обновление ролей Но в по пути path должен находиться файл
if (filter_has_var(INPUT_POST, "submit")) {
    $str = $roli->load_html_files($path);
}

// отработает выборка или выведет список полностью
if (filter_has_var(INPUT_POST, "send")) {
    $res = $roli->get_choice();
} else {
    $res = $roli->get_roli();
}
$roli->close();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="../roli/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../roli/script/script.js"></script>
        <link type="text/css" href="../roli/css/css.css" rel="stylesheet">
    </head>
    <body>

        <div id="hide" hidden="hidden" data-val="<?php
        if ($str) {
            echo 1;
        }
        ?>"><?php echo $str; ?></div>

        <div class="container">
            <div class="cols col-12">
                <div class="cols col-6 row text">
                    <?php echo $path; ?>
                </div>
                <div class="cols col-5 row">
                </div>
                <div class="cols col-1">
                    <form method="POST" action="#">
                        <input class="but-1" type="submit" name="submit" value="Update">
                    </form>
                </div>
            </div>

            <div class="cols col-12 row-1">

                <div class="cols col-6">
                    <form id="form" action="#" method="POST">
                        <textarea id="text" class="sel-2" readonly="readonly" name="text"></textarea>
                        <input class="cols col-6 row" type="submit" name="" value="Reset">
                        <input class="cols col-6 row" type="submit" name="send" value="Send">
                    </form>
                </div>

                <div class="cols col-6">
                    <select id="chc" class="sel" multiple>
                        <option value="" class="opt-1" disabled>Підсистема обробки облікових карток застрахованих осіб (WEB-СОК)</option>
                         <option value="1">СОК: WEB-запит на ОК-5 (АСОПД)</option>
                         <option value="1">СОК: Ведення НДІ органу ПФУ</option>
                         <option value="1">СОК: Ведення списку померлих</option>
                         <option value="1">СОК: Перегляд списку померлих</option>
                         <option value="1">СОК: Головний технолог СОК</option>
                         <option value="1">КІОСК: Оператор</option>
                         <option value="1">СОК: операціоніст</option>
                         <option value="1">СОК: Формування та роздрук запитів</option>
                         <option value="1">СОК: Підтвердження спецзапитів</option>
                         <option value="1">СОК: формування виписок спеціалістом підрозділу КПР та ОППС</option>
                         <option value="1">СОК: підтвердження запитів спеціалістом підрозділу КПР та ОППС</option>
                         <option value="1">СОК: Упереджувальне інформування КуП (друк)</option>
                        <option value="" class="opt-1" disabled>Централізована підсистема СПОВ-річна звітність (WEB-СПОВ-Р)</option>
                         <option value="1">ВЕБ СПОВ: Оператор</option>
                         <option value="1">ВЕБ СПОВ: Міграція</option>
                        <option value="" class="opt-1" disabled>Підсистема Договорів (ДОГОВОРИ)</option>
                         <option value="1">IKIS-DGV: Перегляд карток приєднання до електронних договорів з ЕЦП</option>
                        <option value="" class="opt-1" disabled>Підсистема керування процесом обслуговування відвідувачів ПФУ (ЗВЕРНЕННЯ)</option>
                         <option value="1">ОПЕР. ЗАЛ: Добровольці та доплачувачі</option>
                         <option value="1">ОПЕР. ЗАЛ: ЕСВ</option>
                         <option value="1">ОПЕР. ЗАЛ: Застраховані особи</option>
                         <option value="1">ОПЕР. ЗАЛ: Корегування даних Форма 10</option>
                         <option value="1">ОПЕР. ЗАЛ: Пенсіонери</option>
                         <option value="1">ОПЕР. ЗАЛ: Страхувальники</option>
                         <option value="1">ВІДВІДУВАЧ: Аналітик прийому відвідувачів</option>
                         <option value="1">ВІДВІДУВАЧ: Диспетчер з прийому відвідувачів</option>
                         <option value="1">ВІДВІДУВАЧ: Спеціаліст з прийому громадян</option>
                         <option value="1">Звернення: УКЦ</option>
                        <option value="" class="opt-1" disabled>Призначення та виплата пенсій на базі електронної пенсійної справи (ПВП ДКГ)</option>
                         <option value="1">ПВП ДКГ: Інспектор</option>
                        <option value="" class="opt-1" disabled>Підсистема електронного обміну даними (ПЕОД)</option>
                         <option value="1">ПЕОД: Користувач</option>
                         <option value="1">ПЕОД: Аналітик</option>
                        <option value="" class="opt-1" disabled>Веб-портал електронних послуг ПФУ (ПОРТАЛ)</option>
                         <option value="1">ВЕБ ПОРТАЛ: Спеціаліст, відповідальний за ведення графік у прийому громадян</option>
                         <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст, відповідальний за аналіз списків прийому громадян</option>
                         <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст з прийому заяв на реєстрацію клієнтів Веб-порталу</option>
                         <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст з обробки звернень громадян</option>
                         <option value="1">ВЕБ ПОРТАЛ: Головний спеціаліст з обробки звернень громадян ФО</option>
                         <option value="1">ВЕБ ПОРТАЛ: Головний спеціаліст з обробки звернень громадян ЮО</option>
                         <option value="1">ВЕБ ПОРТАЛ: Гість Веб-порталу</option>
                        <option value="" class="opt-1" disabled>Призначення та виплата пенсій на базі електронної пенсійної справи (ППВП)</option>
                         <option value="1">ППВП: Ведення НДІ</option>
                         <option value="1">ППВП: Ведення особових рахунків</option>
                         <option value="1">ППВП: Виконання масових операцій по виплаті</option>
                         <option value="1">ППВП: Виконання массових перерахунків</option>
                         <option value="1">ППВП: Виплата допомоги на поховання</option>
                         <option value="1">ППВП: Візування Ведення особових рахунків</option>
                         <option value="1">ППВП: Візування призначення</option>
                         <option value="1">ППВП: Друк документів для виплати пенсій через відділення банків</option>
                         <option value="1">ППВП: Контроль призначення</option>
                         <option value="1">ППВП: Міграція з АСОПД</option>
                         <option value="1">ППВП: Призначення пенсії</option>
                         <option value="1">ППВП: Формування документів</option>
                         <option value="1">Тестування (тільки для розробника!)</option>
                         <option value="1">ППВП: Макетний ввод</option>
                         <option value="1">ППВП: Відомості про витрати на виплату та доставку пенсій</option>
                         <option value="1">ППВП: Розрахунок витрат на виплату та доставку пенсії</option>
                        <option value="" class="opt-1" disabled>Реєстр застрахованих осіб (РЗО)</option>
                         <option value="1">РЗО: АСОПД - Завантаження даних АСОПД у підсистему "РЗО"</option>
                         <option value="1">РЗО: АСОПД - Завантаження файлів</option>
                         <option value="1">РЗО: АСОПД - Перегляд протоколів</option>
                         <option value="1">РЗО: Користувач</option>
                         <option value="1">РЗО: Моніторинг</option>
                         <option value="1">РЗО: ОБРОБКА РЕКОМЕНДАЦІЙ МФУ</option>
                        <option value="" class="opt-1" disabled>Відомості з реєстру страхувальників (РС ДРСС)</option>
                         <option value="1">РС ДРСС: Пошук в ЄРС-Україна</option>
                         <option value="1">РС ДРСС. Реєстрація повідомлень ОПФУ щодо ліквідації страхувальників</option>
                        <option value="" class="opt-1" disabled>Система формування і видачі свідоцтв про державне соціальне страхування (СВС)</option>
                         <option value="1">СВПП ВЕБ: Пошук анкет</option>
                         <option value="1">СВС ВЕБ: Пошук в СВС</option>
                        <option value="" class="opt-1" disabled>Система персоніфікованого обліку, місячна звітність (СПОВ-МЗ)</option>
                         <option value="1">СПОВ-М3-09: Користувач СПОВ МЗ</option>
                         <option value="1">СПОВ-М3-09: Керівник</option>
                         <option value="1">СПОВ-МЗ-09: Реєстрація наказу ОПФУ про виконання припису</option>
                         <option value="1">СПОВ-МЗ-09: Реєстрація наказу ОПФУ про виконання рішення (ухвали) суду</option>
                         <option value="1">ЄСВ: Користувач</option>
                         <option value="1">ЄСВ: Керівник</option>
                         <option value="1">ЄСВ: формування звітів спеціалістом підрозділу КПР та ОППС</option>
                        <option value="" class="opt-1" disabled>Підсистема технічної підтримки систем ІКІС ПФУ (ТЕХПІДТРИМКА)</option>
                         <option value="1">ТП: районний рівень</option>
                        <option value="" class="opt-1" disabled>Підсистема управління пенсійними документами (УПД)</option>
                         <option value="1">УПД: Адміністратор Персокарта</option>
                         <option value="1">УПД: Оператор Персокарта</option>
                        <option value="" class="opt-1" disabled>Підсистема Фінансової звітності</option>
                         <option value="1">ФІНЗВІТ: Оператор</option>
                        <option value="" class="opt-1" disabled>Облікова картка працівника ПФУ</option>
                         <option value="1">АБ: Облік грошових коштів - перегляд</option>
                         <option value="1">АБ: Облік грошових коштів - ведення</option>
                         <option value="1">АБ: Кадровий облік - перегляд</option>
                         <option value="1">АБ: Кадровий облік - ведення</option>
                         <option value="1">АБ: Ведення адміністративного обліку в цілому - перегляд</option>
                         <option value="1">АБ: Ведення адміністративного обліку в цілому - ведення</option>
                    </select>
                    <select form="form" class="cols col-6 row" name="onfy">
                        <option>Район</option>
                        <option>15535</option>
                        <option>15414</option>
                        <option>15175</option>
                    </select>
                </div>
                <div class="clear"></div>
            </div>

            <div class="cols col-12">
                <table width="100%" cellspacing="0" border="1" align="center">

                    <tr>
                        <th>№</th>
                        <th>Логін</th>
                        <th>ОПФУ</th>
                        <th>ПІБ</th>
                        <th>Дата создания</th>
                        <th style="font-size: 10pt">Заблокована</th>
                        <th>Код</th>
                        <th>Ролі</th>
                        <td></td>
                    </tr>

                    <?php
                    if (count($res) > 0) {
                        $count = 1;
                        foreach ($res as $row) {
                            echo '<tr style="text-align: center;">';
                            echo '<td width="50px">' . $count . '</td>';
                            echo '<td width="120px">' . $row[0] . '</td>';
                            echo '<td width="80px">' . $row[1] . '</td>';
                            echo '<td width="200px">' . $row[2] . '</td>';
                            echo '<td width="150px">' . $row[3] . '</td>';
                            echo '<td width="120px">' . $row[4] . '</td>';
                            echo '<td width="150px">' . $row[5] . '</td>';
                            echo '<td style="padding: 5px 0 5px 0">';

                            $ar = explode(",", $row[6]);
                            for ($i = 0; $i < count($ar); $i++) {
                                echo $ar[$i] . "<br>";
                            }

                            echo'</td>';
                            echo '<td width="50px" class="but-2 del" data-id="' . $row[7] . '">Del</td>';
                            echo '</tr>';
                            $count++;
                        }
                    }
                    ?>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style="height: 50px; text-align: center; font-size: 20pt;"><?php echo count($res); ?></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>


    </body>
</html>
