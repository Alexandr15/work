/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = init;


var path = "/roli/action.php";


function init() {

    if (parseInt($("div#hide").data("val")) === 1) {
        var res = initArray();
        if (res) {
            request(res);
            //show(res);
        }
    }

    chcClick();
    del();
}

function del() {
    $("td.del").click(function () {
        var id = $(this).data("id");
        alert(id);
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 2, id: id},
            success: function (data) {
                alert(data);
            }
        });
    });
}

function chcClick() {
    $("select#chc").change(function () {
        var ar = $(this).children("option:selected");
        var s = "";

        ar.each(function () {
            if (parseInt($(this).val()) === 1) {
                s += $(this).html() + "; \n";
            }
        });

        $("#text").empty();
        $("#text").text(s);
    });
}

function initArray() {
    var res = [];
    var i = 0;
    var count = 0;
    var ar = [];
    $("td.t11data").each(function () {

        var key = $(this).attr("headers");
        switch (key) {
            case "Логін":
                ar[0] = $(this).text();
                count++;
                break;
            case "ОПФУ":
                ar[1] = $(this).text();
                count++;
                break;
            case "ПІБ":
                ar[2] = $(this).text();
                count++;
                break;
            case "Дата створення":
                ar[3] = $(this).text();
                count++;
                break;
            case "Заблоковано":
                ar[4] = $(this).text();
                count++;
                break;
            case "№ ОКЗО":
                ar[5] = $(this).text();
                count++;
                break;
            case "Ролі":
                var t = $(this).html();
                ar[6] = t.split("<br>");
                count++;
                break;
        }

        if (count === 7) {
            res[i] = [ar[0], ar[1], ar[2], ar[3], ar[4], ar[5], ar[6]];
            i++;
            count = 0;
        }

    });

    return res;
}

function request(arr) {

    var json = JSON.stringify(arr);
    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: 1, content: json},
        success: function (data) {
            alert(data);
        }
    });
}