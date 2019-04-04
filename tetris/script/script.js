window.onload = init;

var cols = 10;
var rows = 20;

var color;
var number;

var px = parseInt(cols / 2) - 1;
var py = 0;
// timer 
var timerId;
// нажатие клавиши
var key = 83;
// хранит фигуру
var figure;
// номер фигуры
var choice;
// скорость падения фигур
var delay = 500;
// окончание игры
var theEnd = true;

var path = "/tetris/action.php";
// найден опонент стартует игра
var start = false;

// хранит массив который записывается в бд и передается для отображения противнику
var array = [];
// хранит уникальное число
var sum = "";

function init() {
    var id = setInterval(function () {
        if (start) {
            clearInterval(id);
            return false;
        }
        seachuser();
    }, 2000);

    choiceuser();
}
// проверка пользователей и составление нового списка
function seachuser() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 1},
        success: function (data, status) {
            if (status !== "success") {
                return;
            }
            var res = JSON.parse(data);
            $("#group").empty();
            for (var i = 0; i < res.length; i++) {
                $("#group").append($("<div class='user'></div>").text(res[i][1]));
            }
        }
    });
}
// выбор пользователя
function choiceuser() {
    $("div").on("click", ".user", function () {
        var enemy = $(this).text();
        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 4, enemy: enemy},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
                if (data) {
                    start = true;
                    initdesc();
                    keypress();
                    setcolor();
                    setfigure();
                    play();
                }
            }
        });
    });
}

function finishing() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 5, end: 1},
        success: function (data, status) {
            if (status !== "success") {
                return;
            }
        }
    });
}

// отправка массива
function sendArray() {
    var json = JSON.stringify(array);
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 2, id: sum, array: json},
        success: function (data, status) {
            if (status !== "success") {
                return;
            }
            var ar = JSON.parse(data);
            var res = ar[0];
            var end = ar[1];

            if (end) {
                theEnd = false;
            }

            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res[i].length; j++) {
                    $("div.rect2").each(function () {
                        if (parseInt($(this).data("x")) === j && parseInt($(this).data("y")) === i) {
                            if (res[i][j] !== 0) {
                                var col = getcolor(parseInt(res[i][j]));
                                $(this).css({backgroundColor: col});
                            } else {
                                $(this).css({backgroundColor: ""});
                            }
                            return false;
                        }
                    });
                }
            }

        }
    });
}

function clearbd() {
    $("#bd").click(function () {
        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 3},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
            }
        });
    });
}


// инициализация сетки по которой двигается фигура
function initdesc() {
    var el = $("#desc");
    var el2 = $("#desc2");

    var h = el.height() / rows;
    var w = el.width() / cols;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var rect = $("<div class='rect'></div>").css({width: w, height: h}).data("x", j).data("y", i).data("set", "");
            el.append(rect);
            el2.append($("<div class='rect2'></div>").css({width: w, height: h}).data("x", j).data("y", i));
        }
    }
}

function keypress() {
    $('html').keyup(function (e) {
        if (e.which === 37 || e.which === 39 || e.which === 40 || e.which === 65 || e.which === 68 || e.which === 32) {
            key = e.which;
        } else {
            key = 83;
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// init color
function setcolor() {
    var key = getRandomInt(1, 4);
    switch (key) {
        case 1:
            number = 1;
            color = "gray";
            break;
        case 2:
            number = 2;
            color = "green";
            break;
        case 3:
            number = 3;
            color = "peru";
            break;
    }
}

function getcolor(key) {
    var col = "";
    switch (key) {
        case 1:
            col = "gray";
            break;
        case 2:
            col = "green";
            break;
        case 3:
            col = "peru";
            break;
    }
    return col;
}

// init figure
function setfigure() {
    //var ch = 11;
    var ch = getRandomInt(1, 12);
    switch (ch) {
        // * * *
        //   *
        case 1:
            choice = 1;
            figure = [[1, 1, 1], [0, 1, 0]];
            break;
            //   * 
            // * * *
        case 2:
            choice = 2;
            figure = [[0, 1, 0], [1, 1, 1]];
            break;
            // *
            // * *
            // *
        case 3:
            choice = 3;
            figure = [[1, 0], [1, 1], [1, 0]];
            break;
            //   *
            // * *
            //   *
        case 4:
            choice = 4;
            figure = [[0, 1], [1, 1], [0, 1]];
            break;
            //   *
            // * *
            // *
        case 5:
            choice = 5;
            figure = [[1, 1, 0], [0, 1, 1]];
            break;
            //   * *
            // * *
        case 6:
            choice = 6;
            figure = [[0, 1], [1, 1], [1, 0]];
            break;
            // *
            // * *
            //   *
        case 7:
            choice = 7;
            figure = [[0, 1, 1], [1, 1, 0]];
            break;
            // *
            // * *
            //   *
        case 8:
            choice = 8;
            figure = [[1, 0], [1, 1], [0, 1]];
            break;
        case 9:
            // *
            // *
            // *
            // *
            choice = 9;
            figure = [[1], [1], [1], [1]];
            break;
        case 10:
            // * * * *
            choice = 10;
            figure = [[1, 1, 1, 1]];
            break;
        case 11:
            choice = 11;
            figure = [[1, 1], [1, 1]];
            break;
    }
}

function getchangefigure() {
    switch (choice) {
        case 1:
            if (px + 1 < cols && py + 2 < rows) {
                choice = 4;
                figure = [[0, 1], [1, 1], [0, 1]];
            }
            break;
        case 2:
            if (px + 1 < cols && py + 2 < rows) {
                choice = 3;
                figure = [[1, 0], [1, 1], [1, 0]];
            }
            break;
        case 3:
            if (px + 2 < cols && py + 1 < rows) {
                choice = 1;
                figure = [[1, 1, 1], [0, 1, 0]];
            }
            break;
        case 4:
            if (px + 2 < cols && py + 1 < rows) {
                choice = 2;
                figure = [[0, 1, 0], [1, 1, 1]];
            }
            break;
        case 5:
            if (px + 1 < cols && py + 2 < rows) {
                choice = 6;
                figure = [[0, 1], [1, 1], [1, 0]];
            }
            break;
        case 6:
            if (px + 2 < cols && py + 1 < rows) {
                choice = 5;
                figure = [[1, 1, 0], [0, 1, 1]];
            }
            break;
        case 7:
            if (px + 1 < cols && py + 2 < rows) {
                choice = 8;
                figure = [[1, 0], [1, 1], [0, 1]];
            }
            break;
        case 8:
            if (px + 2 < cols && py + 1 < rows) {
                choice = 7;
                figure = [[0, 1, 1], [1, 1, 0]];
            }
            break;
        case 9:
            if (px + 3 < cols && py < rows) {
                choice = 10;
                figure = [[1, 1, 1, 1]];
            }
            break;
        case 10:
            if (px < cols && py + 3 < rows) {
                choice = 9;
                figure = [[1], [1], [1], [1]];
                break;
            }
    }

}

function isDown() {
    var flag = true;
    switch (choice) {
        // * * *
        //   *
        case 1:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * 
            // * * *
        case 2:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            // *
            break;
        case 3:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            //   *
            break;
        case 4:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // * *
            //   * *
            break;
        case 5:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            // *
            break;
        case 6:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * *
            // * *
        case 7:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            //   *
            break;
        case 8:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 9:
            // *
            // *
            // *
            // *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 4 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 10:
            // * * * *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 3 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 11:
            // * *
            // * *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
    }
    return flag;
}

function isleft() {
    var flag = true;
    switch (choice) {
        // * * *
        //   *
        case 1:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * 
            // * * *
        case 2:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            // *
            break;
        case 3:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            //   *
            break;
        case 4:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // * *
            //   * *
            break;
        case 5:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            // *
            break;
        case 6:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * *
            // * *
        case 7:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            //   *
            break;
        case 8:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 9:
            // *
            // *
            // *
            // *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 10:
            // * * * *
            $("div.rect").each(function () {
                var x = parseInt($(this).data("x"));
                var y = parseInt($(this).data("y"));
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            // * *
            // * *
        case 11:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px - 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
    }
    return flag;
}

function isright() {
    var flag = true;
    switch (choice) {
        // * * *
        //   *
        case 1:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 3 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * 
            // * * *
        case 2:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 3 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            // *
            break;
        case 3:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            //   *
            break;
        case 4:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // * *
            //   * *
            break;
        case 5:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 3 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            //   *
            // * *
            // *
            break;
        case 6:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
            //   * *
            // * *
        case 7:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 3 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            // *
            // * *
            //   *
            break;
        case 8:
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 9:
            // *
            // *
            // *
            // *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 2 && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 1 && parseInt($(this).data("y")) === py + 3 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 10:
            // * * * *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 4 && parseInt($(this).data("y")) === py && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
        case 11:
            // * *
            // * *
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py && $(this).data("set") === "x") ||
                        (parseInt($(this).data("x")) === px + 2 && parseInt($(this).data("y")) === py + 1 && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
            break;
    }
    return flag;
}

// движение точки вниз
function play() {
    // clear picture
    drawOrClear(0);
    switch (key) {
        case 37://left
        case 65:
            if (px - 1 >= 0 && isleft()) {
                px--;
                isend();
            } else {
                isend();
            }
            key = 83;
            break;
        case 39://right
        case 68:
            if (px + figure[0].length < cols && isright()) {
                px++;
                isend();
            } else {
                isend();
            }
            key = 83;
            break;
        case 40://down
            delay = 30;
            isend();
            break;
        case 83:
            isend();
            break;
        case 32://space
            getchangefigure();
            isend();
            key = 83;
            break;
    }
    // draw picture
    drawOrClear(1);
    sendArray();
    timerId = setTimeout(function () {
        if (theEnd) {
            play();
        } else {
            $("#m").text("Вы проирали!");
            clearTimeout(timerId);
            return;
        }
    }, delay);
}

// если фигура достигает конца экрана удаляются сложенные ряды
function isend() {
    if (py + figure.length < rows && isDown()) {
        py++;
    } else {
        key = 83;
        delay = 500;
        drawOrClear(1);
        drain();
        py = 0;
        px = parseInt(cols / 2) - 1;
        $("div.rect").each(function () {
            if (parseInt($(this).data("x")) === px && parseInt($(this).data("y")) === py && $(this).data("set") === "x") {
                theEnd = false;
                return;
            }
        });
        setcolor();
        setfigure();
    }
}

// удаляет собранную линию
function drain() {
    // инициализируем массив
    var ar = new Array();
    for (var i = 0; i < rows; i++) {
        ar[i] = [];
        array[i] = [];
        for (var j = 0; j < cols; j++) {
            ar[i][j] = 0;
            array[i][j] = 0;
        }
    }

    var i = 0;
    var j = 0;
    // переносим массив HTML in ar
    $("div.rect").each(function () {
        if (parseInt($(this).data("x")) === j && parseInt($(this).data("y")) === i) {
            // возвращает данные которые хранятся в элементе
            if ($(this).data("set") === "x") {
                var num = parseInt($(this).data("number"));
                ar[i][j] = num;
            }
            j++;

            if (j === cols) {
                i++;
                j = 0;
            }
        }
    });

    // проверяем и удаляем сложенные строки
    for (var i = 0; i < rows; i++) {
        var flag = true;
        for (var j = 0; j < cols; j++) {
            if (ar[i][j] === 0) {
                flag = false;
                break;
            }
        }

        if (flag) {
            for (var r = i; r >= 0; r--) {
                for (var j = 0; j < cols; j++) {
                    if (r === 0) {
                        ar[r][j] = 0;
                    } else {
                        ar[r][j] = ar[r - 1][j];
                    }
                }
            }
        }
    }

    i = 0;
    j = 0;
    // переносим массив ar in html
    $("div.rect").each(function () {
        if (parseInt($(this).data("x")) === j && parseInt($(this).data("y")) === i) {

            if (ar[i][j] !== 0) {
                var col = getcolor(parseInt(ar[i][j]));
                $(this).css({backgroundColor: col}).data("set", "x").data("number", ar[i][j]);
                array[i][j] = ar[i][j];
            } else {
                $(this).css({backgroundColor: ""}).data("set", "");
            }

            j++;
            if (j === cols) {
                i++;
                j = 0;
            }
        }
    });

}

// рисует фигуру
function drawOrClear(ch) {
    for (var i = py, r = 0; i < py + figure.length; i++, r++) {
        for (var j = px, c = 0; j < px + figure[0].length; j++, c++) {
            $("div.rect").each(function () {
                if (parseInt($(this).data("x")) === j && parseInt($(this).data("y")) === i && figure[r][c] === 1) {
                    if (ch) {
                        $(this).css({backgroundColor: color}).data("set", "x").data("number", number);
                    } else {
                        $(this).css({backgroundColor: ""}).data("set", "");
                    }
                    return false;
                }
            });
        }
    }
}