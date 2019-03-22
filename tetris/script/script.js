// cнастройка screen
const row = 30;
const col = 16;
const side = 20;
var path = '/tetris/action.php';
// координата отрисовки фигури (слева на право)
var coor;
// регулирующий массив
var desc;
// номер фигури
var number;
// массив фгурі
var figure;
// номер следующей фигурі
var newnumber;
// цвет
var color;
// цвет следующей фигури
var newcolor;
// код клавиатури
var key;
// скорость
var speed;
// рахунок
var score;
// id setInterval
var timeId;
var timeId2;
var timeId3;
// связь между 1 и 2 окном
var bool = false;


$(document).ready(function () {

    var w = col * side + side * 4 + 40 + 6;
    var h = row * side + 4;

    // друге вікно
    $(".frame").css({width: w, height: h});
    var item = $("#desc").width(col * side).height(row * side);
    createRectsToDesc(item, "rect");

    // перше вікно
    $(".frame2").css({width: col * side + 4, height: row * side + 4});
    var item2 = $("#desc5").css({width: col * side, height: row * side});
    createRectsToDesc(item2, "rect3");

    w = side * 4 + 40 + 2;
    h = side * 4 + 40 + 2;

    // показ следующей фигури
    $("#desc2").css({width: w, height: h});
    // инфа
    $("#desc3").css({width: w, height: (row * side - h) / 2});
    // панель управления
    $("#desc4").css({width: w, height: (row * side - h) / 2});
    $("#speed").text("boost: 0%");

    initGameObject();
    figureInit();

    $(document).bind("keydown", function (e) {
        if (e.which === 37 || e.which === 39 || e.which === 32) {
            key = e.which;
        } else {
            key = 40;
        }
        moveFigure(key);
    });

    $("#start").click(function () {

        timeId3 = setInterval(function () {
            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 4},
                success: function (data) {
                    if (data === "" || data === null) {
                        return;
                    }

                    var res = JSON.parse(data);

                    var bool = function () {
                        for (var j = 0; j < max; j++) {
                            if (res[j][0] === id_user && res[i][0] === '0') {
                                return true;
                            }
                        }
                        return false;
                    };

                    for (var i = 0, max = res.length; i < max; i++) {
                        if (res[i][0] !== id_user && res[i][0] === '0') {
                            
                        }
                    }
                }
            });
        }, 1000);




//        if (timeId !== null) {
//            clearInterval(timeId);
//            timeId = null;
//            initGameObject();
//            start();
//        } else {
//            start();
//        }
    });

    $("#arrowleft").click(function () {
        moveFigure(37);
    });

    $("#arrowright").click(function () {
        moveFigure(39);
    });

    $("#arrowdown").click(function () {
        moveFigure(40);
    });

    $("#space").click(function () {
        moveFigure(32);
    });

    timeId2 = setInterval(function () {

        if (bool) {
            writeMassivServer();
            readMassivServer();
            bool = false;
        }
    }, 300);

});




function Coor() {
    this.x = col / 2;
    this.y = 0;
}

function initGameObject() {
    coor = new Coor();
    desc = createDesc();
    number = getRndInteger(1, 19);
    figure = getFigure(number);
    newnumber = getRndInteger(1, 19);
    color = getColor(getRndInteger(1, 6));
    newcolor = getColor(getRndInteger(1, 6));
    key = "zero";
    speed = 500;
    score = 0;
    timeId = null;
    setFigure(1);
    drawRects(desc, ".rect");
    showScore();
    showFigure();
}

function restartParam() {
    coor = new Coor();
    color = newcolor;
    newcolor = getColor(getRndInteger(1, 6));
    number = newnumber;
    figure = getFigure(newnumber);
    newnumber = getRndInteger(1, 19);
    showFigure();
    setFigure(1);
    drawRects(desc, ".rect");
    setSpeed();
    reviseLine();
}

function writeMassivServer() {

    var json = JSON.stringify(desc);
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 1, name: id_user, data: json}
    });
}

function readMassivServer() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 2, name: id_user},
        success: function (data) {
            if (data === "" || data === null) {
                return;
            }

            var res = JSON.parse(data);
            drawRects(res, ".rect3");
        }
    });
}

function start() {
    timeId = setInterval(function () {
        $(document).trigger("keydown");
        moveFigure(key);
    }, speed);
}

function showScore() {
    $("#score").text("score: " + score);
}

function figureInit() {

    $("#showFig").css({width: side * 4, height: side * 4});

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var div = $("<div class='rect2'></div>");
            div.data("r", i);
            div.data("c", j);
            div.css({width: side, height: side});
            $("#showFig").append(div);
        }
    }
}

function showFigure() {

    var newfigure = getFigure(newnumber);

    $(".rect2").each(function () {
        $(this).css({backgroundColor: '#eef4f7', backgroundImage: 'url("")'});
    });

    for (var i = 0, max = newfigure.length; i < max; i++) {
        for (var j = 0, max2 = newfigure[0].length; j < max2; j++) {
            if (newfigure[i][j] === 1) {
                $(".rect2").each(function () {
                    if (parseInt($(this).data("r")) === i && parseInt($(this).data("c")) === j) {
                        $(this).css({backgroundColor: newcolor, backgroundImage: 'url(../tetris/source/20x20.png)'});
                    }
                });
            }
        }
    }
}

function moveFigure(key) {

    if (gameOver()) {
        return;
    }

    bool = true;

    switch (key) {
        case 37:
            if (coor.x > 0 && isLeft()) {
                setFigure(0);
                coor.x--;
                setFigure(1);
                drawRects(desc, ".rect");
            }
            break;
        case 39:
            if (coor.x + figure[0].length < col && isRight()) {
                setFigure(0);
                coor.x++;
                setFigure(1);
                drawRects(desc, ".rect");
            }
            break;
        case 40:
            if (coor.y + figure.length < row) {
                setFigure(0);
                coor.y++;
                setFigure(1);
                drawRects(desc, ".rect");
            }
            break;
        case 32:
            setFigure(0);
            var tempF = figure;
            var tempN = number;
            figure = getOtherFormFigure();

            var r = figure.length - 1;
            var c = figure[0].length - 1;

            if (!(coor.y + r < row && coor.x + c < col)) {
                figure = tempF;
                number = tempN;
                return;
            }

            setFigure(1);
            drawRects(desc, ".rect");
            break;
    }
    revise_down();
}

function createRectsToDesc(item, name) {

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var div = $("<div class='" + name + "'></div>");
            div.data("row", i);
            div.data("col", j);
            div.data("color", "#eef4f7");
            div.css({width: side, height: side});
            item.append(div);
        }
    }
}

function drawRects(desc, name) {

    $(name).each(function () {

        var i = parseInt($(this).data("row"));
        var j = parseInt($(this).data("col"));

        if (desc[i][j] === 1) {
            if ($(this).data("color") === "#eef4f7") {
                $(this).data("color", color);
            }
            var s = $(this).data("color");
            $(this).css({backgroundColor: s, backgroundImage: 'url(../tetris/source/20x20.png)'});//, backgroundImage: 'url(../tetris/source/20x20.png)'
        } else {
            $(this).data("color", "#eef4f7");
            $(this).css({backgroundColor: "#eef4f7", backgroundImage: 'url("")'});//, backgroundImage: 'url("")'
        }
    });
}

function createDesc() {

    var arr = new Array();
    for (var i = 0; i < row; i++) {
        arr[i] = new Array();
        for (var j = 0; j < col; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function setFigure(key) {

    var max1 = figure.length;
    var max2 = figure[0].length;

    for (var i = coor.y, y = 0; y < max1 && coor.y + max1 - 1 < row; i++, y++) {
        for (var j = coor.x, x = 0; x < max2 && coor.x + max2 - 1 < col; j++, x++) {
            if (key) {
                if (figure[y][x] === 1) {
                    desc[i][j] = 1;
                }
            } else {
                if (figure[y][x] === 1) {
                    desc[i][j] = 0;
                }
            }
        }
    }
}

function isLeft() {
    var max = coor.y + figure.length;
    var j = coor.x;
    var x = 0;
    var flag = true;

    for (var i = coor.y, y = 0; i < max && flag; i++, y++) {

        if (figure[y][x] === 0) {
            if (desc[i][j] === 1) {
                flag = false;
            }
        } else if (figure[y][x] === 1) {
            if (desc[i][j - 1] === 1) {
                flag = false;
            }
        }
    }

    return flag;
}

function isRight() {
    var max = coor.y + figure.length;
    var j = coor.x + figure[0].length - 1;
    var x = figure[0].length - 1;
    var flag = true;

    for (var i = coor.y, y = 0; i < max && flag; i++, y++) {

        if (figure[y][x] === 0) {
            if (desc[i][j] === 1) {
                flag = false;
            }
        } else if (figure[y][x] === 1) {
            if (desc[i][j + 1] === 1) {
                flag = false;
            }
        }
    }

    return flag;
}

function revise_down() {

    var flag = false;
    var i = coor.y;
    var j = coor.x;

    if (i + figure.length === row) {
        flag = true;
    } else if (number === 15) {
        if (desc[i + 1][j + 1] === 1 && desc[i + 2][j + 1] === 1) {
            flag = true;
        } else if (desc[i + 2][j] === 1 && desc[i + 3][j] === 1) {
            flag = true;
        } else {
            flag = false;
        }
    } else if (number === 11) {
        if (desc[i + 1][j] === 1 && desc[i + 2][j] === 1) {
            flag = true;
        } else if (desc[i + 2][j + 1] === 1 && desc[i + 3][j + 1] === 1) {
            flag = true;
        } else {
            flag = false;
        }
    } else {
        var max = coor.x + figure[0].length;
        var i = coor.y + figure.length - 1;
        var y = figure.length - 1;

        for (var j = coor.x, x = 0; j < max && !flag; j++, x++) {

            if (figure[y][x] === 0) {
                if (desc[i][j] === 1) {
                    flag = true;
                }
            } else if (figure[y][x] === 1) {
                if (desc[i + 1][j] === 1) {
                    flag = true;
                }
            }
        }
    }

    if (flag) {
        restartParam();
    }
}

function setSpeed() {

    var constPid = 500;
    var count = 0;
    var allMassiv = row * col;

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (desc[i][j] === 1) {
                count++;
            }
        }
    }

    var proc = count * 100 / allMassiv;
    var res = Math.round(speed * proc / 100);

    if (speed > 100) {
        speed = constPid - res;
    }

    clearInterval(timeId);
    start();

    $("#speed").text("boost: " + res + "%");
}

function gameOver() {

    var i = coor.y + figure.length;
    var j = coor.x;

    if (coor.y === 0 && coor.x === col / 2) {
        for (var max = coor.x + figure[0].length; j < max; j++) {

            if (desc[i - 1][j] === 1 && desc[i][j] === 1) {
                clearInterval(timeId);
                $(document).unbind("keydown");
                stringGameOver();
                clearInterval(timeId2);
                return true;
            }
        }
    }
    return false;
}

function stringGameOver() {
    var str = ['G', 'a', 'm', 'e', ' ', 'o', 'v', 'e', 'r'];
    var i = row / 2;
    var j = Math.floor((col - str.length) / 2);
    var s = 0;

    $(".rect").each(function () {
        if ($(this).data("row") === i && $(this).data("col") === j) {

            if (s < str.length && j < col) {
                $(this).text(str[s]);
            }
            s++;
            j++;
        }
    });
}

function getColor(key) {
    var s = "black";
    switch (key) {
        case 1:
            s = "#FF0000";
            break;
        case 2:
            s = "#FFA500";
            break;
        case 3:
            s = "#008000";
            break;
        case 4:
            s = "#FF33FF";
            break;
        case 5:
            s = "#007fff";
            break;
        case 6:
            s = "#FFFF00";
            break;
        case 7:
            s = "#A0522D";
            break;
    }
    return s;
}

function reviseLine() {
    var inc = 0;
    var count = 0;
    var flag = false;
    var i;
    while (count < row) {
        for (i = count; i < row; i++) {
            flag = true;
            for (var j = 0; j < col; j++) {

                if (desc[i][j] !== 1) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                break;
            }
        }

        count = i;
        if (flag) {
            inc++;
            showScore();
            removeLine(count);
        }
    }
    score += inc * inc;
}

function removeLine(r) {
    coor.y++;
    for (var i = r; i >= 0; i--) {
        if (i === 0) {
            desc[i] = new Array();
            for (var j = 0; j < col; j++) {
                desc[i][j] = 0;
            }
        } else {
            desc[i] = desc[i - 1];
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOtherFormFigure() {

    var sum = function (begin, end) {
        if (number < end) {
            number++;
        } else if (number === end) {
            number = begin;
        }
    };

    switch (number) {
        case 1:
        case 2:
        case 3:
        case 4:
            sum(1, 4);
            break;
        case 5:
        case 6:
            sum(5, 6);
            break;
        case 7:
        case 8:
            sum(7, 8);
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            sum(9, 12);
            break;
        case 13:
        case 14:
        case 15:
        case 16:
            sum(13, 16);
            break;
        case 17:
            break;
        case 18:
        case 19:
            sum(18, 19);
            break;
    }
    return getFigure(number);
}


function getFigure(key) {
    var arr = [];

    switch (key) {
        case 1:
            arr = [
                [0, 1, 0],
                [1, 1, 1]
            ];
            break;
        case 2:
            arr = [
                [1, 0],
                [1, 1],
                [1, 0]
            ];
            break;
        case 3:
            arr = [
                [1, 1, 1],
                [0, 1, 0]
            ];
            break;
        case 4:
            arr = [
                [0, 1],
                [1, 1],
                [0, 1]
            ];
            break;
        case 5:
            arr = [
                [1, 1, 0],
                [0, 1, 1]
            ];
            break;
        case 6:
            arr = [
                [0, 1],
                [1, 1],
                [1, 0]
            ];
            break;
        case 7:
            arr = [
                [0, 1, 1],
                [1, 1, 0]
            ];
            break;
        case 8:
            arr = [
                [1, 0],
                [1, 1],
                [0, 1]
            ];
            break;
        case 9:
            arr = [
                [1, 0],
                [1, 0],
                [1, 1]
            ];
            break;
        case 10:
            arr = [
                [0, 0, 1],
                [1, 1, 1]
            ];
            break;
        case 11:
            arr = [
                [1, 1],
                [0, 1],
                [0, 1]
            ];
            break;
        case 12:
            arr = [
                [1, 1, 1],
                [1, 0, 0]
            ];
            break;
        case 13:
            arr = [
                [0, 1],
                [0, 1],
                [1, 1]
            ];
            break;
        case 14:
            arr = [
                [1, 0, 0],
                [1, 1, 1]
            ];
            break;
        case 15:
            arr = [
                [1, 1],
                [1, 0],
                [1, 0]
            ];
            break;
        case 16:
            arr = [
                [1, 1, 1],
                [0, 0, 1]
            ];
            break;
        case 17:
            arr = [
                [1, 1],
                [1, 1]
            ];
            break;
        case 18:
            arr = [
                [1, 1, 1, 1]
            ];
            break;
        case 19:
            arr = [
                [1],
                [1],
                [1],
                [1]
            ];
            break;
    }
    return arr;
}
