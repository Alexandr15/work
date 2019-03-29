window.onload = init;

var cols = 15;
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

var theEnd = true;

var path = "/tetris/action.php";

var start = false;

function init() {

    var id = setInterval(function () {

        request();

        if (start) {
            clearInterval(id);
            return false;
        }

    }, 1000);


//    initdesc();
//    keypress();
//    setcolor();
//    setfigure();
//    play();
}

function request() {
    var sum = "";
    for (var i = 0, j = 1; i < 10; i++, j *= 10) {
        sum += getRandomInt(1, 10);
    }

    $.ajax({
        url: path,
        type: 'POST',
        data: {id: sum},
        success: function (data, status) {
            if (status !== "success") {
                return;
            }

            var res = JSON.parse(data);

            switch (res) {
                case '1':
                    $("p#message").text(data);
                    break;
                case '2':
                    start = true;
                    $("p#message").text(data);
                    break;
            }
        }
    });

}


// инициализация сетки по которой двигается фигура
function initdesc() {
    var el = $("#desc");

    if (cols === 0 || rows === 0) {
        return false;
    }

    var h = el.height() / rows;
    var w = el.width() / cols;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var rect = $("<div class='rect'></div>");
            rect.css({width: w, height: h}).data("x", j).data("y", i).data("set", "");
            el.append(rect);
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

    timerId = setTimeout(function () {
        if (theEnd) {
            play();
        } else {
            $("#message").text("Вы проирали!");
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
        for (var j = 0; j < cols; j++) {
            ar[i][j] = 0;
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


function show() {
    var s = "";
    for (var i = 0; i < figure.length; i++) {
        for (var j = 0; j < figure[i].length; j++) {
            s += figure[i][j] + " ";
        }
        s += "\n";
    }
    console.log(s);
}