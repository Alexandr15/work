/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = init;

var path = "/workers/action.php";


function init() {
    endECP();
    edit();
    addUser();
    //$("#p").append($("<span></span>").text().append("<br>"));
}

function endECP() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: 4},
        success: function (data) {
            var res = JSON.parse(data);            
            $(".edit").each(function () {
                var id = $(this).data("id");
                for (var i = 0, max = res.length; i < max; i++) {
                    if (parseInt(id) === parseInt(res[i][1])) {
                        $(this).css({backgroundColor: "red"});
                        break;
                    }
                }
            });
        }
    });
}

function addUser() {
    $("#addUser").click(function () {
        var top = $(this).offset().top;
        var left = $(this).offset().left;
        var body = createWin(top, left);

        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 3},
            success: function (data) {
                var res = JSON.parse(data);

                if (!(typeof res === 'object')) {
                    return false;
                }
                // фио
                body.append($("<div class='row'></div>").text("ФИО:"));
                body.append($("<input id='fio' class='row-1' type='text'>"));
                // должность
                body.append($("<div class='row'></div>").text("Должность:"));
                var pos = $("<select id='pos' class='row-1'></select>");
                for (var i = 0, max = res[0].length; i < max; i++) {
                    var opt = $("<option></option>").text(res[0][i][0]).val(res[0][i][1]);
                    pos.append(opt);
                }
                body.append(pos);
                // отдел
                body.append($("<div class='row'></div>").text("Отдел:"));
                var vid = $("<select id='vid' class='row-1'></select>");
                for (var i = 0, max = res[1].length; i < max; i++) {
                    var opt = $("<option></option>").text(res[1][i][0]).val(res[1][i][1]);
                    vid.append(opt);
                }
                body.append(vid);
                // статус
                body.append($("<div class='row'></div>").text("Статус:"));
                var st = $("<select id='st' class='row-1'></select>");
                st.append($("<option value='0'></option>").text("уволен(а)"));
                st.append($("<option value='1'></option>").text("работает"));
                st.append($("<option value='2'></option>").text("социальный отпуск"));
                st.append($("<option value='3'></option>").text("не в штате"));
                body.append(st);
                // ецп
                body.append($("<div class='row'></div>").text("ЕЦП:"));
                var ecp = $("<select id='ecp' class='row-1'></select>");
                ecp.append($("<option value='0'></option>").text("нету"));
                ecp.append($("<option value='1'></option>").text("есть"));
                ecp.append($("<option value='2'></option>").text("не требуется"));
                body.append(ecp);
                // дата
                body.append($("<div class='row'></div>").text("Дата окончания:"));
                var date = $("<input id='date' class='row-1' type='text' pattern='20[1-9]{1}[1-9]{1}-[0-9]{2}-[0-9]{2}'>");
                body.append(date);
                // выдача
                body.append($("<div class='row'></div>").text("Выдача"));
                var guild = $("<select id='guild' class='row-1'></select>");
                guild.append($("<option value='' selected></option>"));
                guild.append($("<option value='1'></option>").text("Юстиции"));
                guild.append($("<option value='2'></option>").text("ДФС"));
                body.append(guild);
                // отправить на сервер
                var but = $("<input id='send' class='row-1' type='button' value='отправить'>");
                but.click(function () {
                    send(false);
                });
                body.append(but);
            }
        });
    });
}

function edit() {

    $(".edit").click(function () {
        var top = $(this).offset().top;
        var left = $("#table").offset().left;

        var body = createWin(top, left);
        var id = $(this).data("id");

        $(this).css({backgroundColor: "#e9e9e9"});

        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 1, id: id},
            success: function (data) {
                var res = JSON.parse(data);

                if (!(typeof res === 'object')) {
                    return false;
                }
                // фио
                body.append($("<div class='row'></div>").text("ФИО:"));
                body.append($("<input id='fio' class='row-1' type='text'>").val(res[2][0]));
                // должность
                body.append($("<div class='row'></div>").text("Должность:"));
                var pos = $("<select id='pos' class='row-1'></select>");
                for (var i = 0, max = res[0].length; i < max; i++) {
                    var opt = $("<option></option>").text(res[0][i][0]).val(res[0][i][1]);
                    if (res[2][1] === res[0][i][1]) {
                        opt.attr("selected", "selected");
                    }
                    pos.append(opt);
                }
                body.append(pos);
                // отдел
                body.append($("<div class='row'></div>").text("Отдел:"));
                var vid = $("<select id='vid' class='row-1'></select>");
                for (var i = 0, max = res[1].length; i < max; i++) {
                    var opt = $("<option></option>").text(res[1][i][0]).val(res[1][i][1]);
                    if (res[2][2] === res[1][i][1]) {
                        opt.attr("selected", "selected");
                    }
                    vid.append(opt);
                }
                body.append(vid);
                // статус
                body.append($("<div class='row'></div>").text("Статус:"));
                var st = $("<select id='st' class='row-1'></select>");
                st.append($("<option " + (res[2][3] === '0' ? "selected" : "") + " value='0'></option>").text("уволен(а)"));
                st.append($("<option " + (res[2][3] === '1' ? "selected" : "") + " value='1'></option>").text("работает"));
                st.append($("<option " + (res[2][3] === '2' ? "selected" : "") + " value='2'></option>").text("социальный отпуск"));
                st.append($("<option " + (res[2][3] === '3' ? "selected" : "") + " value='3'></option>").text("не в штате"));
                body.append(st);
                // ецп
                body.append($("<div class='row'></div>").text("ЕЦП:"));
                var ecp = $("<select id='ecp' class='row-1'></select>");
                ecp.append($("<option " + (res[2][4] === '0' ? "selected" : "") + " value='0'></option>").text("нету"));
                ecp.append($("<option " + (res[2][4] === '1' ? "selected" : "") + " value='1'></option>").text("есть"));
                ecp.append($("<option " + (res[2][4] === '2' ? "selected" : "") + " value='2'></option>").text("не требуется"));
                body.append(ecp);
                // дата
                body.append($("<div class='row'></div>").text("Дата окончания:"));
                var date = $("<input id='date' class='row-1' type='text' pattern='20[1-9]{1}[1-9]{1}-[0-9]{2}-[0-9]{2}'>").val(res[2][5]);
                body.append(date);
                // выдача
                body.append($("<div class='row'></div>").text("Выдача"));
                var guild = $("<select id='guild' class='row-1'></select>");
                guild.append($("<option value='' selected></option>"));
                guild.append($("<option " + (res[2][6] === '1' ? "selected" : "") + " value='1'></option>").text("Юстиции"));
                guild.append($("<option " + (res[2][6] === '2' ? "selected" : "") + " value='2'></option>").text("ДФС"));
                body.append(guild);
                // отправить на сервер
                var but = $("<input id='send' class='row-1' type='button' value='отправить'>");
                but.click(function () {
                    send(id);
                });
                body.append(but);
            }
        });

    });
}

function createWin(top, left) {

    if ($("div").is(".win")) {
        $("div.win").remove();
    }

    var win = $("<div class='win'></div>");
    win.css({top: top, left: left});

    var head = $("<div class='head'></div>");
    var title = $("<div class='title'></div>");
    var close = $("<div class='close'>x</div>");
    close.click(function () {
        if ($("div").is(".win")) {
            $("div.win").remove();
        }
    });

    head.append(title).append(close);
    var body = $("<div class='body'></div>");

    win.append(head).append(body);
    $(".container").append(win);

    return body;
}


function send(id) {

    var ar = [];
    ar[0] = $("#fio").val();
    if (ar[0] === "") {
        alert("Строка ФИО не должна быть пустой");
        return false;
    } else if (ar[0].length > 254) {
        alert("Строка не должна быть длинее 255 символов");
        return false;
    }

    ar[1] = $("select#pos option:selected").val();
    ar[2] = $("select#vid option:selected").val();
    ar[3] = $("select#st option:selected").val();
    ar[4] = $("select#ecp option:selected").val();
    ar[5] = $("#date").val();
    ar[6] = $("select#guild option:selected").val();
    ar[7] = id;

    var json = JSON.stringify(ar);
    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: 2, content: json},
        success: function (data) {
            alert(data);
        }
    });
}