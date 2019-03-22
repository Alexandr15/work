/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = init;

var path = "/form/action.php";

var pidSys = [];
var html = null;
var count = 0;
var cs = "";

function init() {
    initWorkesViddil();
    showRoli();
    selectRoli();
    addRoli();
    setZayava();
    send();
}

// send data for write in .doc
function send() {
    $("#send").click(function () {
        var content = $("#content").html();
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 4, content: content},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
                alert(data);
            }
        });
    });
}

// cut last symbol in string select form
function setZayava() {

    var str = $("select#form option:selected").text();
    var s = [];
    for (var i = 0, j = str.length - 1; i < str.length; i++, j--) {
        s[i] = str.charAt(i);
    }

    for (var i = 0, j = s.length - 1; i < 10; i++, j--) {
        s[j] = "";
    }

    str = "";

    for (var i = 0; i < s.length; i++) {
        if (s[i] !== "") {
            str += s[i];
        }
    }

    $("#zayava").text(str);
}


function selectRoli() {
    $("#roli").change(function () {
        var ar = $(this).children("option:selected");
        var div = $("#current");
        div.empty();

        var opfy = $("#opfy option:selected");
        var fio = $("#workers option:selected");

        if (opfy.val() === "") {
            alert("Поле район має бути вибрано");
            return false;
        } else if (fio.val() === "") {
            alert("Не вібрано кому потрібні ролі");
            return false;
        }

        div.append(html);
        div.append($("<p class='text-2'></p>").text(opfy.text()));

        for (var i = 0; i < ar.length; i++) {
            var el = ar.eq(i);
            div.append($("<p class='text-3'></p>").text(el.text()));
        }
    });
}

// show roli which are employers
function showRoli() {
    $("#workers").change(function () {
        var item = $(this).children("option:selected").text();
        var name = item.split(' ');
        var s = name[0];
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 2, content: s},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
                var res = JSON.parse(data);
                var div = $("#current");
                div.empty();
                var t = "";
                var index = 0;
                for (var i = 0, max = res.length; i < max; i++) {
                    t = "";
                    div.append($("<p class='text-2'></p>").text(res[i][0]));
                    var temp = res[i][1].split(', ');
                    for (var j = 0; j < temp.length; j++) {

                        var s = getCategory(temp[j]);
                        if (t !== s) {
                            $("option.opt-1").each(function () {
                                var item = $(this).data("web");
                                var text = $(this).text();
                                var ar = strInArray(item);

                                for (var e = 0; e < ar.length; e++) {
                                    if (s === ar[e]) {
                                        t = ar[e];
                                        pidSys[index] = ar[e];
                                        index++;
                                        div.append($("<p class='text-1'></p>").text(text));
                                        break;
                                    }
                                }
                                if (t === s) {
                                    return;
                                }
                            });
                        }
                        div.append($("<p class='text-3'></p>").text(temp[j]));
                    }

                }
                html = div.html();
            }
        });
    });
}
// get category roles
function getCategory(str) {
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i] === '-' || str[i] === '.' || str[i] === ':') {
            break;
        } else {
            s += str[i];
        }
    }
    return s;
}

// share string in array
function strInArray(str) {
    var ar = [];
    var index = 0;
    var s = "";
    for (var i = 0, max = str.length; i < max; i++) {
        if (str[i] === '|') {
            ar[index] = s;
            index++;
            s = "";
            continue;
        } else {
            s += str[i];
        }
    }
    ar[index] = s;
    return ar;
}

// It is event add workers in list 
function initWorkesViddil() {
    $("#vid").change(function () {
        var id = $(this).children("option:selected").val();
        if (id === "") {
            return;
        }

        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 1, id: id},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
                var res = JSON.parse(data);
                $("#workers").empty();
                $("#workers").append($("<option value='' selected>Cпівробітники</option>"));
                for (var i = 0, max = res.length; i < max; i++) {
                    $("#workers").append($("<option value='" + res[i][1] + "'></option>").text(res[i][0]));
                }
            }
        });
    });
}

// It is add roles in table
function addRoli() {
    $("#create").click(function () {

        var form = $("#form option:selected").val();
        var vid = $("#vid option:selected");
        var opfy = $("#opfy option:selected");
        var fio = $("#workers option:selected");
        var roli = $("#roli option:selected");

        if (vid.val() === "" || opfy.val() === "" || fio.val() === "") {
            alert("Відсутні дані");
            return false;
        }


        var ar = [];

        for (var i = 0; i < roli.length; i++) {
            var t = roli.eq(i);
            ar[i] = t.text();
        }
        // category roles
        var sys = "";
        // sum in one string all roles
        var r = "";
        // temporary variable
        var t = "";

        var arr = [];
        var index = 0;

        for (var i = 0; i < ar.length; i++) {
            var s = getCategory(ar[i]);
            if (t !== s) {
                arr[index] = s;
                index++;
                sys += s + "\n";
                t = s;
            }
            r += ar[i] + "\n";
        }

        var el = $("#hide").children("input").val();
        switch (hide) {
            case '2':
                if (ar.length === 0) {
                    alert("Не має ролей");
                    return;
                }
                break;
            case '1':
                if (el === "") {
                    alert("Введіть індифікаційний код");
                    return;
                }
                break;
            case '3':
                if (el === "") {
                    alert("Введіть примітку");
                    return;
                }
                break;
        }

        if (cs !== form) {
            count = 0;
        }

        if (setMailForm(arr)) {
            alert("Потрібно формувати нову заявку! Закінчити роботу з поточної заявкою і оновити сторінку");
            return false;
        }

        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 3, fio: fio.text(), opfy: opfy.text()},
            success: function (data, status) {
                var tr = $("<tr></tr>");
                switch (form) {
                    case '2':
                        if (status !== "success" || data === "") {
                            alert("До відсутного логіну не можливо додати ролі (Вибраті форму 1)");
                            return;
                        }
                        cs = '2';
                        count++;
                        tr.append($("<td></td>").text(count));
                        tr.append($("<td></td>").text(opfy.text()));
                        tr.append($("<td></td>").text(vid.text()));
                        tr.append($("<td></td>").text(data));
                        tr.append($("<td></td>").text(fio.text()));
                        tr.append($("<td></td>").text(el));
                        tr.append($("<td></td>").text(sys));
                        tr.append($("<td></td>").text(r));
                        break;
                    case '1':
                        cs = '1';
                        count++;
                        tr.append($("<td></td>").text(count));
                        tr.append($("<td></td>").text(opfy.text()));
                        tr.append($("<td></td>").text(vid.text()));
                        tr.append($("<td></td>").text(fio.text()));
                        tr.append($("<td></td>").text(el));
                        tr.append($("<td></td>").text(sys));
                        tr.append($("<td></td>").text(r));
                        break;
                    case '3':
                        if (status !== "success" || data === "") {
                            alert("User is this login not found");
                            return;
                        }
                        cs = '3';
                        count++;
                        tr.append($("<td></td>").text(count));
                        tr.append($("<td></td>").text(opfy.text()));
                        tr.append($("<td></td>").text(vid.text()));
                        tr.append($("<td></td>").text(fio.text()));
                        tr.append($("<td></td>").text(data));
                        tr.append($("<td></td>").text(pidSys));
                        tr.append($("<td></td>").text(el));
                        break;
                }
                $("#tbody").append(tr);

            }
        });

    });
}

function setMailForm(arr) {
    var cont = 0;
    var flag = 0;
    for (var i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case "СОК":
            case "ВЕБ СПОВ":
            case "СПОВ":
            case "ЄСВ":
                flag = 1;
                $("#mail").text("spov@ods.pfu");
                break;
            case "ППВП":
            case "Звернення":
            case "ВІДВІДУВАЧ":
            case "РЗО":
            case "ОПЕР":
                flag = 2;
                $("#mail").text("asopd45@ods.pfu");
                break;
            case "ВЕБ ПОРТАЛ":
            case "IKIS":
            case "ТП":
            case "КІОСК":
                flag = 3;
                $("#mail").text("sasha@ods.pfu");
                break;
            case "РС":
                flag = 4;
                $("#mail").text("dohod@ods.pfu");
                break;
            case "СВПП":
            case "СВС":
                break;
            case "УПД":
                break;
            case "ФІНЗВІТ":
                break;
            case "АБ":
                break;
            case "ПЕОД":
                break;

        }

        if (cont === 0) {
            cont = flag;
        } else if (cont !== flag) {
            return true;
        }
    }
    return false;
}