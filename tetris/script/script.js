window.onload = init;

var path = "/tetris/action.php";
var cols = 10;
var rows = 20;

function Point() {
    this.x = 4;
    this.y = 0;

    this.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
}

// главная точка
var point = new Point(4, 0);
// массив игрока
var array = [];
// нажатие клавиши
var key = 83;
// окончание игры
var theEnd = true;

var figure; // хранит фигуру инициализируется функцией setfigure
var choice; // номер фигуры инициализируется функцией setfigure
var color; // цвет
var number; // номер цвета
// задержка движения в стороны
var left = 0;
var right = 0;
// время повторного вызова таймера
var delay = 500;
// interval
var timer_1 = null;
// timeout
var timer_2 = null;
// одновременного запуска
var timer_start = null;
// ожедание отправки
var wait = true;
// очки
var count = 0;

function init() {
    initDesc();
    keypress();
    but2();
    but();
    start();
}

function but() {
    $("#but").click(function () { // сетевая игра
        if (!theEnd) {
            location.reload();
        }

        $("#desc2").show();
        $("#enemy").show();
        func(1);
    });
}

function but2() {
    $("#but_2").click(function () { // одиночная игра
        if (timer_1 !== null || timer_2 !== null) {
            clearInterval(timer_1);
            clearTimeout(timer_2);
        }

        var el = $("#desc").css("float");
        if (el !== "none") {
            $("#desc2").hide();
            $("#enemy").hide();
        }

        clearInterval(timer_start);
        array = initArray();
        theEnd = false;
        point.setPoint(4, 0);
        key = 83;
        count = 0;
        setcolor();
        setfigure();
        play();
        action();
    });
}

function func(key) {
    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: key},
        success: function (data, status) {
            if (status !== "success" || data === "") {
                return;
            }
        }
    });
}

function start() {
    timer_start = setInterval(function () {
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 2},
            success: function (data, status) {
                if (status !== "success" || data === "") {
                    return;
                }
                array = initArray();
                theEnd = true;
                point.setPoint(4, 0);
                key = 83;
                setcolor();
                setfigure();
                play();
                action();
                clearInterval(timer_start);
            }
        });
    }, 1000);
}

function send() { // отправка массива на сервер
    var ar = [];
    ar[0] = array;
    ar[1] = count;
    var json = JSON.stringify(ar);
    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: 3, content: json},
        success: function (data, status) {
            if (status !== "success") {
                return;
            }
            var res;
            switch (data) {
                case '1':
                    theEnd = false;
                    clearTimeout(timer_2);
                    clearInterval(timer_1);
                    func(4);
                    return;
                    break;
                case '2':
                    return;
                    break;
                default :
                    try {
                        res = JSON.parse(data);
                        show(".rect2", res[0]);
                        $("#enemy").text(res[1]);
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                    break;
            }
        }
    });
}

function initArray() {
    var ar = [];
    for (var i = 0; i < rows; i++) {
        ar[i] = [];
        for (var j = 0; j < cols; j++) {
            ar[i][j] = 0;
        }
    }
    return ar;
}

function initDesc() {// инициализация сетки по которой двигается фигура
    var h = $("#desc").height() / rows;
    var w = $("#desc").width() / cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var rect = $("<div class='rect'></div>").css({width: w, height: h}).data("x", j).data("y", i);
            $("#desc").append(rect);
            var rect2 = $("<div class='rect2'></div>").css({width: w, height: h}).data("x", j).data("y", i);
            $("#desc2").append(rect2);
        }
    }
}

function keypress() {
    $('html').keydown(function (e) {
        if (e.which === 37 || e.which === 39 || e.which === 40 || e.which === 38) {
            key = e.which;
        }
    });
}

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function show(elem, ar) {
    if (!Array.isArray(ar)) {
        return;
    }

    $(elem).each(function () {
        var x = parseInt($(this).data("x"));
        var y = parseInt($(this).data("y"));

        if (ar[y][x] !== 0) {
            var color = getcolor(ar[y][x]);
            //$(this).css("background-color", color);
            $(this).css("background-image", "url(ter.png)");
        } else {
            //$(this).css("background-color", "");
            $(this).css("background-image", "none");
        }
    });
}

function setArrayFigure(flag) {
    for (var i = point.y, row = 0; i < point.y + figure.length; i++, row++) {
        for (var j = point.x, col = 0; j < point.x + figure[0].length; j++, col++) {
            if (figure[row][col] === 1) {
                if (flag) {
                    array[i][j] = number;
                } else {
                    array[i][j] = 0;
                }
            }
        }
    }
}

function deleteLine(array) {
    var sum = 0;
    for (var i = 0; i < rows; i++) {
        var flag = true;
        for (var j = 0; j < cols; j++) {
            if (array[i][j] === 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            sum++;
            for (var j = i; j >= 0; j--) {
                for (var l = 0; l < cols; l++) {
                    if (j === 0) {
                        array[j][l] = 0;
                    } else {
                        array[j][l] = array[j - 1][l];
                    }
                }
            }
        }
    }
    count += getCount(sum);
}

function getCount(key) {
    var num = 0;
    switch (key) {
        case 1:
            num = 10;
            break;
        case 2:
            num = 20;
            break;
        case 3:
            num = 40;
            break;
        case 4:
            num = 80;
            break;
    }
    return num;
}

function play() { // движение точки вниз
    timer_2 = setInterval(function () {
        wait = true;
    }, delay);
}

function action() { // движение точки вправо и влево
    timer_1 = setInterval(function () {
        setArrayFigure(false);
        switch (key) {
            case 37: // left
                if (point.x - 1 >= 0 && isleft(choice, point.x, point.y)) {
                    point.x--;
                    left++;
                    if (left === 3) {
                        step();
                        left = 0;
                    }
                    right = 0;
                }
                key = 83;
                break;
            case 39: // right
                if (point.x + 1 < cols && isright(choice, point.x, point.y)) {
                    point.x++;
                    right++;
                    if (right === 3) {
                        step();
                        right = 0;
                    }
                    left = 0;
                }
                key = 83;
                break;
            case 38: // up
                getchangefigure(point.x, point.y);
                key = 83;
                break;
            case 40:
                for (var i = point.y; i < point.y + figure.length; i++) {
                    if (!step()) {
                        break;
                    }
                }
                left = 0;
                right = 0;
                key = 83;
                break;
            case 83:
                if (wait) {
                    step();
                    wait = false;
                }
                break;
        }
        setArrayFigure(true);
        show(".rect", array);
        $("#user").text(count);
    }, 100);
}

function step() {
    if (point.y + figure.length < rows && isDown(array, choice, point.x, point.y)) {
        point.y++;
        return true;
    } else {
        setArrayFigure(true);
        deleteLine(array);
        key = 83;
        point.setPoint(4, 0);
        if (theEnd) {
            send();
        }
        for (var i = 0; i < cols; i++) {
            if (array[0][i] !== 0) {
                theEnd = false;
                clearTimeout(timer_2);
                clearInterval(timer_1);
                func(4);
                $("#m").html("Game over");
            }
        }
        setcolor();
        setfigure();
        return false;
    }
}

function setfigure() { // init figure
    var ch = getRandomInt(1, 20);
    switch (ch) {
        case 1:
            choice = 1;
            figure = [[1, 1, 1], [0, 1, 0]];
            break;
        case 2:
            choice = 2;
            figure = [[0, 1, 0], [1, 1, 1]];
            break;
        case 3:
            choice = 3;
            figure = [[1, 0], [1, 1], [1, 0]];
            break;
        case 4:
            choice = 4;
            figure = [[0, 1], [1, 1], [0, 1]];
            break;
        case 5:
            choice = 5;
            figure = [[1, 1, 0], [0, 1, 1]];
            break;
        case 6:
            choice = 6;
            figure = [[0, 1], [1, 1], [1, 0]];
            break;
        case 7:
            choice = 7;
            figure = [[0, 1, 1], [1, 1, 0]];
            break;
        case 8:
            choice = 8;
            figure = [[1, 0], [1, 1], [0, 1]];
            break;
        case 9:
            choice = 9;
            figure = [[1], [1], [1], [1]];
            break;
        case 10:
            choice = 10;
            figure = [[1, 1, 1, 1]];
            break;
        case 11:
            choice = 11;
            figure = [[1, 1], [1, 1]];
            break;
        case 12:
            choice = 12;
            figure = [[1, 1], [1, 0], [1, 0]];
            break;
        case 13:
            choice = 13;
            figure = [[1, 1, 1], [0, 0, 1]];
            break;
        case 14:
            choice = 14;
            figure = [[0, 1], [0, 1], [1, 1]];
            break;
        case 15:
            choice = 15;
            figure = [[1, 0, 0], [1, 1, 1]];
            break;
        case 16:
            choice = 16;
            figure = [[1, 1], [0, 1], [0, 1]];
            break;
        case 17:
            choice = 17;
            figure = [[0, 0, 1], [1, 1, 1]];
            break;
        case 18:
            choice = 18;
            figure = [[1, 0], [1, 0], [1, 1]];
            break;
        case 19:
            choice = 19;
            figure = [[1, 1, 1], [1, 0, 0]];
            break;

    }
}

function getfigure(numFig) {
    var figure = [];
    switch (numFig) {
        case 1:
            figure = [[1, 1, 1], [0, 1, 0]];
            break;
        case 2:
            figure = [[0, 1, 0], [1, 1, 1]];
            break;
        case 3:
            figure = [[1, 0], [1, 1], [1, 0]];
            break;
        case 4:
            figure = [[0, 1], [1, 1], [0, 1]];
            break;
        case 5:
            figure = [[1, 1, 0], [0, 1, 1]];
            break;
        case 6:
            figure = [[0, 1], [1, 1], [1, 0]];
            break;
        case 7:
            figure = [[0, 1, 1], [1, 1, 0]];
            break;
        case 8:
            figure = [[1, 0], [1, 1], [0, 1]];
            break;
        case 9:
            figure = [[1], [1], [1], [1]];
            break;
        case 10:
            figure = [[1, 1, 1, 1]];
            break;
        case 11:
            figure = [[1, 1], [1, 1]];
            break;
        case 12:
            figure = [[1, 1], [1, 0], [1, 0]];
            break;
        case 13:
            figure = [[1, 1, 1], [0, 0, 1]];
            break;
        case 14:
            figure = [[0, 1], [0, 1], [1, 1]];
            break;
        case 15:
            figure = [[1, 0, 0], [1, 1, 1]];
            break;
        case 16:
            figure = [[1, 1], [0, 1], [0, 1]];
            break;
        case 17:
            figure = [[0, 0, 1], [1, 1, 1]];
            break;
        case 18:
            figure = [[1, 0], [1, 0], [1, 1]];
            break;
        case 19:
            figure = [[1, 1, 1], [1, 0, 0]];
            break;
    }
    return figure;
}

function getchangefigure(px, py) {
    switch (choice) {
        case 1:
            if (px + 1 < cols && py + 2 < rows && array[py][px + 1] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 2][px + 1] === 0) {
                choice = 4;
                figure = [[0, 1], [1, 1], [0, 1]];
            }
            break;
        case 2:
            if (px + 1 < cols && py + 2 < rows && array[py][px] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 2][px] === 0) {
                choice = 3;
                figure = [[1, 0], [1, 1], [1, 0]];
            }
            break;
        case 3:
            if (px + 2 < cols && py + 1 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py][px + 2] === 0 && array[py + 1][px + 1] === 0) {
                choice = 1;
                figure = [[1, 1, 1], [0, 1, 0]];
            }
            break;
        case 4:
            if (px + 2 < cols && py + 1 < rows && array[py][px + 1] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 1][px + 2] === 0) {
                choice = 2;
                figure = [[0, 1, 0], [1, 1, 1]];
            }
            break;
        case 5:
            if (px + 1 < cols && py + 2 < rows && array[py][px + 1] === 0 && array[py + 1][px + 1] === 0 && array[py + 1][px] === 0 && array[py + 2][px] === 0) {
                choice = 6;
                figure = [[0, 1], [1, 1], [1, 0]];
            }
            break;
        case 6:
            if (px + 2 < cols && py + 1 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py + 1][px + 1] === 0 && array[py + 1][px + 2] === 0) {
                choice = 5;
                figure = [[1, 1, 0], [0, 1, 1]];
            }
            break;
        case 7:
            if (px + 1 < cols && py + 2 < rows && array[py][px] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 2][px + 1] === 0) {
                choice = 8;
                figure = [[1, 0], [1, 1], [0, 1]];
            }
            break;
        case 8:
            if (px + 2 < cols && py + 1 < rows && array[py][px + 1] === 0 && array[py][px + 2] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0) {
                choice = 7;
                figure = [[0, 1, 1], [1, 1, 0]];
            }
            break;
        case 9:
            if (px + 3 < cols && py < rows && array[py][px + 1] === 0 && array[py][px + 2] === 0 && array[py][px + 3] === 0) {
                choice = 10;
                figure = [[1, 1, 1, 1]];
            }
            break;
        case 10:
            if (px < cols && py + 3 < rows && array[py + 1][px] === 0 && array[py + 2][px] === 0 && array[py + 3][px] === 0) {
                choice = 9;
                figure = [[1], [1], [1], [1]];
                break;
            }
        case 12:
            if (px + 2 < cols && py + 1 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py][px + 2] === 0 && array[py + 1][px + 2] === 0) {
                choice = 13;
                figure = [[1, 1, 1], [0, 0, 1]];
            }
            break;
        case 13:
            if (px + 1 < cols && py + 2 < rows && array[py][px + 1] === 0 && array[py + 1][px + 1] === 0 && array[py + 2][px + 1] === 0 && array[py + 2][px] === 0) {
                choice = 14;
                figure = [[0, 1], [0, 1], [1, 1]];
            }
            break;
        case 14:
            if (px + 2 < cols && py + 1 < rows && array[py][px] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 1][px + 2] === 0) {
                choice = 15;
                figure = [[1, 0, 0], [1, 1, 1]];
            }
            break;
        case 15:
            if (px + 1 < cols && py + 2 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py + 1][px] === 0 && array[py + 2][px] === 0) {
                choice = 12;
                figure = [[1, 1], [1, 0], [1, 0]];
            }
            break;
        case 16:
            if (px + 2 < cols && py + 1 < rows && array[py][px + 2] === 0 && array[py + 1][px] === 0 && array[py + 1][px + 1] === 0 && array[py + 1][px + 2] === 0) {
                choice = 17;
                figure = [[0, 0, 1], [1, 1, 1]];
            }
            break;
        case 17:
            if (px + 1 < cols && py + 2 < rows && array[py][px] === 0 && array[py + 1][px] === 0 && array[py + 2][px] === 0 && array[py + 2][px + 1] === 0) {
                choice = 18;
                figure = [[1, 0], [1, 0], [1, 1]];
            }
            break;
        case 18:
            if (px + 2 < cols && py + 1 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py][px + 2] === 0 && array[py + 1][px] === 0) {
                choice = 19;
                figure = [[1, 1, 1], [1, 0, 0]];
            }
            break;
        case 19:
            if (px + 1 < cols && py + 2 < rows && array[py][px] === 0 && array[py][px + 1] === 0 && array[py + 1][px + 1] === 0 && array[py + 2][px + 1] === 0) {
                choice = 16;
                figure = [[1, 1], [0, 1], [0, 1]];
            }
            break;
    }
}

function isDown(array, choice, px, py) {
    var flag = true;
    switch (choice) {
        case 1:
            if (array[py + 1][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 2:
            if (array[py + 2][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 3:
            if (array[py + 3][px] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 4:
            if (array[py + 2][px] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 5:
            if (array[py + 1][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 6:
            if (array[py + 3][px] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 7:
            if (array[py + 2][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 8:
            if (array[py + 2][px] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 9:
            if (array[py + 4][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 10:            // * * * *
            if (array[py + 1][px] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 11:
            if (array[py + 2][px] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 12:
            if (array[py + 3][px] !== 0 || array[py + 1][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 13:
            if (array[py + 1][px] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 14:
            if (array[py + 3][px] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 15:
            if (array[py + 2][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 16:
            if (array[py + 1][px] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 17:
            if (array[py + 2][px] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 18:
            if (array[py + 3][px] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 19:
            if (array[py + 2][px] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
    }
    return flag;
}

function isleft(choice, px, py) {
    var flag = true;
    switch (choice) {
        case 1:
            if (array[py][px - 1] !== 0 || array[py + 1][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 2:
            if (array[py][px] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 3:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 4:
            if (array[py][px] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 5:
            if (array[py][px - 1] !== 0 || array[py + 1][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 6:
            if (array[py][px] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 7:
            if (array[py][px] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 8:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 9:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px - 1] !== 0 || array[py + 3][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 10:
            if (array[py][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 11:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 12:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 13:
            if (array[py][px - 1] !== 0 || array[py + 1][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 14:
            if (array[py][px] !== 0 || array[py + 1][px] !== 0 || array[py + 2][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 15:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 16:
            if (array[py][px - 1] !== 0 || array[py + 1][px] !== 0 || array[py + 2][px] !== 0) {
                flag = false;
                return;
            }
            break;
        case 17:
            if (array[py][px + 1] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 18:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0 || array[py + 2][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 19:
            if (array[py][px - 1] !== 0 || array[py + 1][px - 1] !== 0) {
                flag = false;
                return;
            }
            break;
    }
    return flag;
}

function isright(choice, px, py) {
    var flag = true;
    switch (choice) {
        case 1:
            if (array[py][px + 3] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 2:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 3:
            if (array[py][px + 1] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 4:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 5:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 6:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 7:
            if (array[py][px + 3] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 8:
            if (array[py][px + 1] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 9:
            if (array[py][px + 1] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 2][px + 1] !== 0 || array[py + 3][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 10:
            if (array[py][px + 4] !== 0) {
                flag = false;
                return;
            }
            break;
        case 11:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 12:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 2][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;
        case 13:
            if (array[py][px + 3] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 14:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 15:
            if (array[py][px + 1] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 16:
            if (array[py][px + 2] !== 0 || array[py + 1][px + 2] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 17:
            if (array[py][px + 3] !== 0 || array[py + 1][px + 3] !== 0) {
                flag = false;
                return;
            }
            break;
        case 18:
            figure = [[1, 0], [1, 0], [1, 1]];
            if (array[py][px + 1] !== 0 || array[py + 1][px + 1] !== 0 || array[py + 2][px + 2] !== 0) {
                flag = false;
                return;
            }
            break;
        case 19:
            if (array[py][px + 3] !== 0 || array[py + 1][px + 1] !== 0) {
                flag = false;
                return;
            }
            break;

    }
    return flag;
}

