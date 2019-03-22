window.onload = init;

var path = "/saldova/action.php";

function init() {
    up_click();
    del_click();
    show_click();
    reit();
}

// проверяет на повторяющиеся инвентарники
function reit() {
    $("#reit").click(function () {
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 4},
            success: function (data, status) {
                if (status !== "success") {
                    return;
                }
                $("#sreit").text(data);
            }
        });
    });
}

function show_click() {
    $(".show").click(function () {
        if ($("div").is(".win")) {
            $("div").remove(".win");
        }

        var left = $(this).position().left;
        var top = $(this).position().top + 130;
        var win = $("<div class='win'></div>").css({left: left + 'px', top: top + 'px'});
        var head = $("<div class='head'></div>");
        var title = $("<div class='title'></div>");
        var close = $("<div class='close'>x</div>");
        close.click(function () {
            if ($("div").is(".win")) {
                $("div").remove(".win");
            }
        });
        var body = $("<div class='body'></div>");
        head.append(title).append(close);
        win.append(head).append(body);
        $("div.container").append(win);

        var inv = $(this).data("inv");

        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 1, inv: inv},
            success: function (data) {
                if (data === "" || data === 'null') {
                    return false;
                }
                var res = JSON.parse(data);

                for (var i = 1, max = res.length; i < max; i++) {
                    var item = $("<div class='w-row'></div>");
                    if (i === 1) {
                        item.text("Серийный номер: " + res[i]);
                    } else if (i === 2) {
                        item.text("Кабинет: " + res[i]);
                    }

                    if (res[0] === 'сервер' || res[0] === 'ПК') {
                        if (i === 3) {
                            item.text("Материнская плата: " + res[i]);
                        } else if (i === 4) {
                            item.text("Процессор: " + res[i]);
                        } else if (i === 5) {
                            item.text("Оперативная память: " + res[i]);
                        } else if (i === 6) {
                            item.text("Жесткий диск: " + res[i]);
                        }
                    }

                    body.append(item);
                }

            }
        });

    });
}

function get_name_col(choice) {
    var str = "";
    switch (choice) {
        case 1:
            str = "Инвентарный номер";
            break;
        case 2:
            str = "Серийный номер";
            break;
        case 3:
            str = "Устройство";
            break;
        case 4:
            str = "Информация";
            break;
        case 5:
            str = "Кабинет";
            break;
    }
    return str;
}

function up_click() {
    $("input.Up").click(function () {

        var id = $(this).data("id");
        var arr = new Array();

        $("select.type").each(function () {
            if ($(this).data("id") === id) {
                arr[0] = $(this).children("option:selected").val();
                return;
            }
        });

        $("select.address").each(function () {
            if ($(this).data("id") === id) {
                arr[1] = $(this).children("option:selected").val();
                return;
            }
        });

        $("select.state").each(function () {
            if ($(this).data("id") === id) {
                arr[2] = $(this).children("option:selected").val();
                return;
            }
        });

        arr[3] = id;

        var json = JSON.stringify(arr);
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 2, content: json},
            success: function () {
                $("tr").each(function () {
                    if ($(this).data("id") === id) {
                        $(this).css({backgroundColor: '#f1a899'});
                    }
                });
            }
        });
    });
}

function del_click() {
    $("input.Del").click(function () {
        var id = $(this).data("id");
        $.ajax({
            url: path,
            type: 'POST',
            data: {choice: 3, id: id},
            success: function () {
                $("tr").each(function () {
                    if ($(this).data("id") === id) {
                        $(this).empty();
                    }
                });
            }
        });
    });
}