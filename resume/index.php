<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>

        <link rel="stylesheet" type="text/css" href="../resume/css/css.css" />
        <link rel="stylesheet" type="text/css" media="(min-width:481px) and (max-width:768px)" href="../resume/css/css.css" />
        <link rel="stylesheet" type="text/css" media="(min-width:769px) and (max-width:980px)" href="../resume/css/css.css" />
        <link rel="stylesheet" type="text/css" media="(max-width:480px)" href="../resume/css/css.css" />

        <script type="text/javascript" src="../resume/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../resume/script/script.js"></script>
    </head>
    <body>
        <div class='header'><h1>Резюме<h1></div>

        <div class="conteiner">
            <div class="menu">
                <div id="bookmark1">About me</div>
                <div id="bookmark2">Purpose</div>
                <div id="bookmark3">Experience</div>
                <div id="bookmark4">Education</div>
                <div id="bookmark5">Skill</div>
                <div id="bookmark6">Сontact</div>
            </div>
            <div class="content"></div>
        </div>

        <div class="footer">
            <p id='date'></p>
            <script type="text/javascript">
                var date = new Date();
                $("p#date").text(date.getFullYear());
            </script>
        </div>
    </body>
</html>