window.onload = init;

var path = "/tetris/action.php";
var cols = 10;
var rows = 20;

// цвет
var color;
// номер цвета
var number;

function Point() {
    this.x = 4;
    this.y = 0;
    this.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
}

var point = new Point(4, 0);

var array = [];
// нажатие клавиши
var key = 40;
// хранит фигуру
var figure;
// номер фигуры
var choice;
// скорость падения фигур
var delay = 500;
// окончание игры
var theEnd = true;
// таймеры
var timerId;
var timer;
var timer_start;

var left = 0;
var right = 0;
var down = 0;

var array2 = [];
var his = [];

function init() {
    array = initArray();
    //array2 = initArray();
    for (var i = 0; i < rows; i++) {
        array2[i] = [];
        for (var j = 0; j < cols; j++) {
            array2[i][j] = 0;
        }
    }

    array2[19][9] = 9;
    initDesc();
    keypress();
    setcolor();
    setfigure();


    //moveDown();
    //moveLeftRight();
    but();
    start();
}

function but() {
    $("#but").click(function () {
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 1},
            success: function (data, status) {
                if (status !== "success" || data === "") {
                    return;
                }
            }
        });
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
                console.log("start");
                moveDown();
                moveLeftRight();
                clearInterval(timer_start);
            }
        });
    }, 1000);
}

function send() {
    var ar = [point.x, point.y, choice, number];
    var json = JSON.stringify(ar);


    $.ajax({
        url: path,
        type: 'POST',
        data: {choice: 3, content: json},
        success: function (data, status) {
            if (status !== "success" || data === "") {
                return;
            }

            var res = JSON.parse(data); // res[0] - x, res[1] - y, res[2] - номер фигуры, res[3] - номер цвета

            if (his.length !== 0) {
                var f = getfigure(his[2]);
                for (var i = his[1], row = 0; i < his[1] + f.length; i++, row++) {
                    for (var j = his[0], col = 0; j < his[0] + f[0].length; j++, col++) {
                        if (f[row][col] === 1) {
                            array2[i][j] = 0;
                        }
                    }
                }
            }

            var fig = getfigure(res[2]);
            for (var i = res[1], row = 0; i < res[1] + fig.length; i++, row++) {
                for (var j = res[0], col = 0; j < res[0] + fig[0].length; j++, col++) {
                    if (fig[row][col] === 1) {
                        array2[i][j] = res[3];
                    }
                }
            }

            if (res[1] + fig.length < rows && isDown(array2, res[2], res[0], res[1])) {
                for (var i = 0; i < res.length; i++) {
                    his[i] = res[i];
                }
            } else {
//                if (array2[res[1]][res[0]] !== 0) {
//                    theEnd = false;
//                    $("#m").html("Противник проиграл");
//                }
                his = [];
                deleteLine(array2);
            }
            show("div.rect2", array2);
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
    $(elem).each(function () {
        var x = parseInt($(this).data("x"));
        var y = parseInt($(this).data("y"));
        if (ar[y][x] !== 0) {
            var color = getcolor(ar[y][x]);
            $(this).css({backgroundColor: color});
        } else {
            $(this).css({backgroundColor: ""});
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

    for (var i = 0; i < rows; i++) {
        var flag = true;
        for (var j = 0; j < cols; j++) {
            if (array[i][j] === 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
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
}

function moveDown() { // движение точки вниз
    switch (key) {
        case 40:
            down++;
            if (down === 5) {
                //delay = 100;
                step();
                down = 0;
            } else {
                step();
            }
            break;
    }
    show("div.rect", array);
    timerId = setTimeout(function () {
        moveDown();
        send();
        if (!theEnd) {
            clearTimeout(timerId);
        }
    }, delay);
}

function moveLeftRight() { // движение точки вправо и влево
    timer = setInterval(function () {
        setArrayFigure(false);
        switch (key) {
            case 37: // left
                if (point.x - 1 >= 0 && isleft(choice, point.x, point.y)) {
                    point.x--;
                }
                left++;
                if (left === 5) {
                    step();
                    left = 0;
                } else
                    down = 0;
                right = 0;
                delay = 500;
                key = 40;
                break;
            case 39: // right
                if (point.x + 1 < cols && isright(choice, point.x, point.y)) {
                    point.x++;
                }
                right++;
                if (right === 5) {
                    step();
                    right = 0;
                }
                down = 0;
                left = 0;
                delay = 500;
                key = 40;
                break;
            case 38: // up
                getchangefigure(point.x, point.y);
                key = 40;
                break;
        }
        setArrayFigure(true);
        show("div.rect", array);
        if (!theEnd) {
            clearInterval(timer);
        }
    }, 100);
}

function step() {
    setArrayFigure(false);
    if (point.y + figure.length < rows && isDown(array, choice, point.x, point.y)) {
        point.y++;
    } else {
        setArrayFigure(true);
        deleteLine(array);
        delay = 500;
        key = 40;
        point.setPoint(4, 0);
        if (array[point.y][point.x] !== 0) {
            theEnd = false;
            $("#m").html("конец");
        }
        setcolor();
        setfigure();
    }
}

function setfigure() { // init figure
    var ch = getRandomInt(1, 12);
    //var ch = 11
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
    }
    return figure;
}

function getchangefigure(px, py) {
    switch (choice) {
        case 1:
            if (px + 1 < cols && py + 2 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 4;
                figure = [[0, 1], [1, 1], [0, 1]];
            }
            break;
        case 2:
            if (px + 1 < cols && py + 2 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 3;
                figure = [[1, 0], [1, 1], [1, 0]];
            }
            break;
        case 3:
            if (px + 2 < cols && py + 1 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 1;
                figure = [[1, 1, 1], [0, 1, 0]];
            }
            break;
        case 4:
            if (px + 2 < cols && py + 1 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 2;
                figure = [[0, 1, 0], [1, 1, 1]];
            }
            break;
        case 5:
            if (px + 1 < cols && py + 2 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 6;
                figure = [[0, 1], [1, 1], [1, 0]];
            }
            break;
        case 6:
            if (px + 2 < cols && py + 1 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 5;
                figure = [[1, 1, 0], [0, 1, 1]];
            }
            break;
        case 7:
            if (px + 1 < cols && py + 2 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 8;
                figure = [[1, 0], [1, 1], [0, 1]];
            }
            break;
        case 8:
            if (px + 2 < cols && py + 1 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 7;
                figure = [[0, 1, 1], [1, 1, 0]];
            }
            break;
        case 9:
            if (px + 3 < cols && py < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 10;
                figure = [[1, 1, 1, 1]];
            }
            break;
        case 10:
            if (px < cols && py + 3 < rows && isleft(choice, px, py) && isright(choice, px, py)) {
                choice = 9;
                figure = [[1], [1], [1], [1]];
                break;
            }
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
            $("div.rect").each(function () {
                if ((parseInt($(this).data("x")) === px + 4 && parseInt($(this).data("y")) === py && $(this).data("set") === "x")) {
                    flag = false;
                    return;
                }
            });
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
    }
    return flag;
}

