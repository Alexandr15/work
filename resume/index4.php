<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>

        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: white;
                font-size: 12pt;
                font-family: 'Times New Roman', Times, serif;
            }

            * {
                box-sizing: border-box;
                -moz-box-sizing: border-box;
            }

            .page {
                width: 21cm;
                min-height: 29.7cm;
                padding: 1cm;
                margin: 1cm auto;

            }

            table{

            }

            caption{
                font-size: 20pt;
                font-weight: bold;
                margin: 0 0 20px 0;
            }

            .col-1, .col-3,.col-5{
                width: 30%;
                text-align: left;
                padding: 0 0 0 10px;
                font-style: italic;
                font-size: 14pt;
            }

            .col-1{
                height: 40px;
            }

            .col-3{
                height: 50px;
            }

            .col-5{
                height: 80px;
            }

            .col-2, .col-4, .col-6{
                width: 70%;
                text-align: left;
                padding: 0 0 0 10px;
            }

            .col-2{
                height: 40px;
            }

            .col-4{
                height: 50px;
            }

            .col-6{
                height: 80px;
            }

            @page {
                size: A4;
                margin: 0;
            }
            @media print {
                .page {
                    margin: 0;
                    border: initial;
                    border-radius: initial;
                    width: initial;
                    min-height: initial;

                }
            }

        </style>
    </head>
    <body>

        <div class="page">
            <table width="100%" cellspacing="0" border="1">
                <caption>Федотов Александр Александрович</caption>
                <tbody>
                    <tr>
                        <td class="col-1">Персональні дані:</td>
                        <td class="col-2"> возраст: 33 года<br>
                            сімейний стан: не одружений</td>
                    </tr>
                    <tr>
                        <td class="col-3">Контактная информация:</td>
                        <td class="col-4">Телефон: +3(067)866-02-79<br>
                            E-mail: fonfonkun@gmail.com</td>
                    </tr>
                    <tr>
                        <td class="col-5">Образование:</td>
                        <td class="col-6">Південноукраїнський державний педагогічний університет ім. К.Д.Ушинського</td>
                    </tr>
                    <tr>
                        <td class="col-5">Досвід роботи та професійні навички:</td>
                        <td class="col-6">з жовтня 2017р головний спеціаліст відділу адміністрування, супроводження інформаційних систем,
                            електронних реєстрів та захисту інформації Малиновського обʼєднаного управління Пенсійного фонду України в м. Одесі</td>
                    </tr>
                    <tr>
                        <td class="col-5">Додаткові навички та інтереси:</td>
                        <td class="col-6">Англійська мова - початковий рівень (перекладаю технічні тексти і говорю зі словником)
                            Маю водійські права категорії В.<br>
                            Підтримка працездатності парку машин з 66 штук і 8 серверів;<br>
                            Пошук і вирішення проблем пов'язаних з роботою мережі і серверів;<br>
                            Ремонт комп'ютерів;<br>
                            Установка стандартного і спеціалізованого програмного забезпечення;<br>
                            Налаштування принтерів, сканерів, заправка картриджів;<br>
                            Підтримка і обслуговування Windows Server, Linux серверів;<br>
                            Пошук та закупівля обладнання;<br>
                            Технічна і програмна консультація адміністрації;<br>
                            Аудит технічної бази компанії і ПО;<br>
                            Обслуговування мережевого обладнання, підключення нових комп'ютерів до мережі;<br>
                            Обслуговування DNS, DHCP, Proxy, Web, FTP, IIS, Mail, Налаштування прав доступу до ресурсів;<br>
                            Служби розгортання Windows, термінальний сервер, Wi-Fi мережі, систем на базі Mac OS, відеоспостереження;<br>
                            Адміністрування та налаштування призначених для користувача ОС Windows XP, 7, 8.1, 10.</td>
                    </tr>
                </tbody>
            </table>


        </div>


        <?php
        ?>
    </body>
</html>
