<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

//include_once '../public_html/form/action.php';
include_once '../form/action.php';
$var = '2';
if (filter_has_var(0, "dodatok")) {
    $var = filter_input(0, "dodatok");
}
$form = new Form();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="../form/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../form/script/script.js"></script>
        <link type="text/css" rel="stylesheet" href="../form/css/css.css">
    </head>
    <body>
        <script type="text/javascript">
            var hide = "<?php echo $var; ?>";
        </script>
        <div class="container">
            <div class="border">
                <div class="cols col-12">
                    <div class="headers">Форма заяви на веб-доступ</div>
                </div>
                <div class="cols col-12">
                    <form action="#" method="POST">
                        <select id="form" name="dodatok" class="elem-3" onchange='this.form.submit()'>
                            <option value="2" <?php echo $var === '2' ? "selected" : ""; ?>>Заявка на зміну реквізитів користувачів ВЕБ-доступу (Форма 2)</option>
                            <option value="1" <?php echo $var === '1' ? "selected" : ""; ?>>Заявка на створення користувачів ВЕБ-доступу (Форма 1)</option>
                            <option value="3" <?php echo $var === '3' ? "selected" : ""; ?>>Заявка на зміну статусу (блокування) користувачів ВЕБ-доступу (Форма 3)</option>
                        </select>
                    </form>
                    <div id="hide" class="elem-6" hidden="hidden">
                        <input class="elem-6" type="text" value="">
                    </div>
                    <script type="text/javascript">
                        switch (hide) {
                            case '1':
                                $("#hide").attr("hidden", false).children("input").attr("placeholder", "Введіть індефікаційний код");
                                break;
                            case '3':
                                $("#hide").attr("hidden", false).children("input").attr("placeholder", "Введіть примітку").val("Звільнення");
                                break;
                            case '2':
                                $("#hide").attr("hidden", false).children("input").attr("placeholder", "Введіть примітку").val("нова");
                                break;
                        }
                    </script>
                </div>
                <div class="cols col-12">
                    <select id="vid" class="elem-3">
                        <option selected="selected" value="">Відділ</option>
                        <?php
                        $viddil = $form->get_viddil();
                        for ($i = 0, $max = count($viddil); $i < $max; $i++) {
                            echo "<option value='" . $viddil[$i][1] . "'>" . $viddil[$i][0] . "</option>";
                        }
                        ?>
                    </select>

                    <select id="workers" class="elem-3"></select>

                    <select id="opfy" class="elem-3">
                        <option value="" selected>Район</option>
                        <option>15535</option>
                        <option>15414</option>
                        <option>15175</option>
                    </select>
                </div>
                <div class="col-12">
                    <div class="cols col-6">
                        <p class="text-4">Наявні ролі користувача</p>
                        <div id="current" class="elem-4"></div>
                    </div>
                    <div class="cols col-6">
                        <p class="text-4">Усі існуючі ролі користувача</p>
                        <select id="roli" class="elem-1" multiple="multiple">
                            <option value="" class="opt-1" data-web="СОК|КІОСК" disabled>Підсистема обробки облікових карток застрахованих осіб (WEB-СОК)</option>
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
                            <option value="" class="opt-1" data-web="ВЕБ СПОВ" disabled>Централізована підсистема СПОВ-річна звітність (WEB-СПОВ-Р)</option>
                             <option value="1">ВЕБ СПОВ: Оператор</option>
                             <option value="1">ВЕБ СПОВ: Міграція</option>
                            <option value="" class="opt-1" data-web="IKIS" disabled>Підсистема Договорів (ДОГОВОРИ)</option>
                             <option value="1">IKIS-DGV: Перегляд карток приєднання до електронних договорів з ЕЦП</option>
                            <option value="" class="opt-1" data-web="ОПЕР|ВІДВІДУВАЧ|Звернення" disabled>Підсистема керування процесом обслуговування відвідувачів ПФУ (ЗВЕРНЕННЯ)</option>
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
                            <option value="" class="opt-1" data-web="ПВП" disabled>Призначення та виплата пенсій на базі електронної пенсійної справи (ПВП ДКГ)</option>
                             <option value="1">ПВП ДКГ: Інспектор</option>
                            <option value="" class="opt-1" data-web="ПЕОД" disabled>Підсистема електронного обміну даними (ПЕОД)</option>
                             <option value="1">ПЕОД: Користувач</option>
                             <option value="1">ПЕОД: Аналітик</option>
                            <option value="" class="opt-1" data-web="ВЕБ ПОРТАЛ" disabled>Веб-портал електронних послуг ПФУ (ПОРТАЛ)</option>
                             <option value="1">ВЕБ ПОРТАЛ: Спеціаліст, відповідальний за ведення графік у прийому громадян</option>
                             <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст, відповідальний за аналіз списків прийому громадян</option>
                             <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст з прийому заяв на реєстрацію клієнтів Веб-порталу</option>
                             <option value="1">ВЕБ ПОРТАЛ: Cпеціаліст з обробки звернень громадян</option>
                             <option value="1">ВЕБ ПОРТАЛ: Головний спеціаліст з обробки звернень громадян ФО</option>
                             <option value="1">ВЕБ ПОРТАЛ: Головний спеціаліст з обробки звернень громадян ЮО</option>
                             <option value="1">ВЕБ ПОРТАЛ: Гість Веб-порталу</option>
                            <option value="" class="opt-1" data-web="ППВП" disabled>Призначення та виплата пенсій на базі електронної пенсійної справи (ППВП)</option>
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
                             <option value="1">ППВП: Макетний ввод</option>
                             <option value="1">ППВП: Відомості про витрати на виплату та доставку пенсій</option>
                             <option value="1">ППВП: Розрахунок витрат на виплату та доставку пенсії</option>
                            <option value="" class="opt-1" data-web="РЗО" disabled>Реєстр застрахованих осіб (РЗО)</option>
                             <option value="1">РЗО: АСОПД - Завантаження даних АСОПД у підсистему "РЗО"</option>
                             <option value="1">РЗО: АСОПД - Завантаження файлів</option>
                             <option value="1">РЗО: АСОПД - Перегляд протоколів</option>
                             <option value="1">РЗО: Користувач</option>
                             <option value="1">РЗО: Моніторинг</option>
                             <option value="1">РЗО: ОБРОБКА РЕКОМЕНДАЦІЙ МФУ</option>
                            <option value="" class="opt-1" data-web="РС" disabled>Відомості з реєстру страхувальників (РС ДРСС)</option>
                             <option value="1">РС ДРСС: Пошук в ЄРС-Україна</option>
                             <option value="1">РС ДРСС. Реєстрація повідомлень ОПФУ щодо ліквідації страхувальників</option>
                            <option value="" class="opt-1" data-web="СВПП|СВС" disabled>Система формування і видачі свідоцтв про державне соціальне страхування (СВС)</option>
                             <option value="1">СВПП ВЕБ: Пошук анкет</option>
                             <option value="1">СВС ВЕБ: Пошук в СВС</option>
                            <option value="" class="opt-1" data-web="СПОВ|ЄСВ" disabled>Система персоніфікованого обліку, місячна звітність (СПОВ-МЗ)</option>
                             <option value="1">СПОВ-М3-09: Користувач СПОВ МЗ</option>
                             <option value="1">СПОВ-М3-09: Керівник</option>
                             <option value="1">СПОВ-МЗ-09: Реєстрація наказу ОПФУ про виконання припису</option>
                             <option value="1">СПОВ-МЗ-09: Реєстрація наказу ОПФУ про виконання рішення (ухвали) суду</option>
                             <option value="1">ЄСВ: Користувач</option>
                             <option value="1">ЄСВ: Керівник</option>
                             <option value="1">ЄСВ: формування звітів спеціалістом підрозділу КПР та ОППС</option>
                            <option value="" class="opt-1" data-web="ТП" disabled>Підсистема технічної підтримки систем ІКІС ПФУ (ТЕХПІДТРИМКА)</option>
                             <option value="1">ТП: районний рівень</option>
                            <option value="" class="opt-1" data-web="УПД" disabled>Підсистема управління пенсійними документами (УПД)</option>
                             <option value="1">УПД: Адміністратор Персокарта</option>
                             <option value="1">УПД: Оператор Персокарта</option>
                            <option value="" class="opt-1" data-web="ФІНЗВІТ" disabled>Підсистема Фінансової звітності</option>
                             <option value="1">ФІНЗВІТ: Оператор</option>
                            <option value="" class="opt-1" data-web="АБ" disabled>Облікова картка працівника ПФУ</option>
                             <option value="1">АБ: Облік грошових коштів - перегляд</option>
                             <option value="1">АБ: Облік грошових коштів - ведення</option>
                             <option value="1">АБ: Кадровий облік - перегляд</option>
                             <option value="1">АБ: Кадровий облік - ведення</option>
                             <option value="1">АБ: Ведення адміністративного обліку в цілому - перегляд</option>
                             <option value="1">АБ: Ведення адміністративного обліку в цілому - ведення</option>
                            <option value="" class="opt-1" data-web="ВЕБ_ОССВ" disabled>ВЕБ_ОССВ</option>
                            <option value="1">ВЕБ_ОССВ: Дозвіл на перегляд усіх ПСВ</option>
                            <option value="1">ВЕБ_ОССВ: Дозвіл на формування звітів</option>
                            <option value="1">ВЕБ_ОССВ: Доступ тільки на перегляд</option>
                            <option value="1">ВЕБ_ОССВ: Загальна роль для роботи з Веб ОССВ</option>
                            <option value="1">ВЕБ_ОССВ: Зміна звітного періоду (перехід на наступний місяць)</option>
                            <option value="1">ВЕБ_ОССВ: Редагування локальних довідників</option>
                            <option value="1">ВЕБ_ОССВ: Редагування параметрів</option>
                            <option value="1">ВЕБ_ОССВ: Робота з низовими документами</option>
                            <option value="1">ВЕБ_ОССВ: Робота з платіжними дорученнями</option>
                            <option value="1">ВЕБ_ОССВ: Розведення низових документів</option>
                            <option value="1">ВЕБ_ОССВ: Роль для доступу до підсистеми протоколювання</option>
                            <option value="1">ВЕБ_ОССВ: Роль для об’єднання ПСВ</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з інформаційно-пошуковим модулем</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з актами перевірки</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з виписками банку</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з календарем</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з картками наукових пенсій</option>
                            <option value="1">ВЕБ_ОССВ: Роль для роботи з картками пільгових пенсій</option>
                            <option value="1">ВЕБ_ОССВ: Роль для синхронізації</option>
                            <option value="1">ВЕБ_ОССВ: Формування та отримання зовнішніх файлів</option>
                        </select>
                    </div>
                </div>
                <div class="cols col-5 h30"></div>
                <div class="cols col-2 h30"><input id="create" class="elem-5" type="button" value="Сформувати"></div>
                <div class="cols col-5 h30"></div>

                <div class="cols col-12 h10"></div>
                <div class="clear"></div>
                <!--From-->
                <div id="content" style="width: 21cm; margin: 0 auto; font-size: 12pt; font-family: Georgia, 'Times New Roman', Times, serif;">
                    <div style="width: 100%; height: 1.33cm; text-align: center;">
                        <img src="http://172.135.3.75/resource/gerb.png" alt="">
                    </div>
                    <div style="text-align: center; margin: 10px 0 0 0;">
                        ПЕНСІЙНИЙ  ФОНД  УКРАЇНИ<br>
                        <span style="font-weight: bold">МАЛИНОВСЬКЕ ОБ’ЄДНАНЕ УПРАВЛІННЯ</span><br> 
                        <span style="font-weight: bold">ПЕНСІЙНОГО ФОНДУ УКРАЇНИ В М.ОДЕСІ</span><br>
                        <span style="font-size: 8pt;">вул. Прохоровська, 3,  м. Одеса, 65007, тел. 705-42-38  факс 705-54-03,  E-mail: maln@od.pfu.gov.ua,  Код ЄДРПОУ 41249156</span>
                    </div>
                    <div style="text-align: left; margin: 10px 0 10px 0;">
                        <span style="font-weight: bold;">ЕЛЕКТРОННА ПОШТА</span>
                    </div>
                    <div style="width: 100%; margin: 0 0 60px;">
                        <table width="100%">
                            <tr >
                                <td width="50%" align="left">________________ № __________ /07</td>
                                <td width="50%" align="right">На № ___________ від ________________</td>
                            </tr>
                            <tr>
                                <td width="50%"></td>
                                <td width="50%">
                                    <span style="font-weight: bold">Головне управління Пенсійного фонду<br> України в Одеській області</span><br>
                                    <span id="mail" style="text-decoration: underline;"></span></td>
                            </tr>    
                        </table>
                    </div>

                    <div style="width: 100%; text-align: right; margin: 0 0 20px 0;"><span style="font-weight: bold">Додаток <?php echo '3.' . $var; ?></span></div>
                    <div style="width: 100%; text-align: center; margin: 0 0 10px 0;"><span id="zayava" style="font-weight: bold"></span></div>
                    <table width="100%" cellspacing="0" border="1" align="center">
                        <tbody  id="tbody">
                            <?php
                            echo '<tr>';
                            echo '<td class="td" ' . ($var === "2" ? 'rowspan = "2"' : "") . '>№з/п</td>';
                            echo '<td class="td" ' . ($var === "2" ? 'rowspan = "2"' : "") . '>Код УПФУ</td>';
                            echo '<td class="td" ' . ($var === "2" ? 'rowspan = "2"' : "") . '>Назва відділу /електронна адреса/ ІР-телефон</td>';

                            if ($var === '2') {
                                echo '<td class="td" rowspan = "2">Логін користувача</td>';
                                echo '<td class="td" colspan = "4">Нові реквізити користувача</td>';
                                echo '</tr>';
                                echo '<tr>';
                                echo '<td class="td">ПІБ користувача (повністю)</td>';
                                echo '<td class="td">статус ролі (нова чи заблокувати)</td>';
                                echo '<td class="td">підсистема</td>';
                                echo '<td class="td">Перелік ролей користувача*</td>';
                            } else if ($var === '1') {
                                echo '<td class="td">ПІБ користувача (повністю)</td>';
                                echo '<td class="td">Ідентифікаційний номер</td>';
                                echo '<td class="td">підсистема</td>';
                                echo '<td class="td">Перелік ролей користувача*</td>';
                            } else if ($var === '3') {
                                echo '<td class="td">ПІБ користувача (повністю)</td>';
                                echo '<td class="td">Логін користувача</td>';
                                echo '<td class="td">підсистема</td>';
                                echo '<td class="td">Примітка</td>';
                            }
                            echo '</tr>';
                            ?>
                        </tbody>
                    </table>
                    <div style="width: 100%; text-align: center; margin: 30px 0 20px 0;">
                        <span style="font-weight: bold">Голова ліквідаційної комісії з припинення   Л. ОЛЕЙНИК
                        </span>
                    </div>
                    <div style="width: 100%; text-align: left;">Олександр Федотов 705-54-02</div>
                </div>

                <div class="cols col-5 h30"></div>
                <div class="cols col-2 h30" style="margin: 20px 0 10px 0"><input id="send" class="elem-5" type="button" value="Відправити"></div>
                <div class="cols col-5 h30"></div>

            </div>
        </div>
        <p id="mes"></p>
    </body>
</html>
