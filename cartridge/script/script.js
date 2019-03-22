window.onload = init;

var path = "/cartridge/action.php";
var model = "";
var locate = null;
var actionCart = null;

function init() {
    clickCart();
    addPrinter();
    cartridges();
    findCart();
}

function addPrinter() {

    $("div#printer").click(function () {
        if ($("div").is("#addPrinter")) {
            $("div#addPrinter").detach();
        }

        var left = $(this).position().left;
        var top = $(this).position().top;

        var addmenu = $("<div id='addPrinter'></div>");
        addmenu.css({left: left, top: top});

        var headmenu = $("<div class='headmenu'></div>");
        var closemenu = $("<div class='closemenu'></div>").text("x");
        closemenu.css({width: "20%"});
        closemenu.click(function () {
            if ($("div").is("#addPrinter")) {
                $("div#addPrinter").detach();
            }
        });
        headmenu.append(closemenu);
        addmenu.append(headmenu);
        var contentmenu = $("<div class='contentmenu'></div>");
        addmenu.append(contentmenu);
        $("div.container").append(addmenu);

        var text = $("<input class='cell-2' type='text' value=''>");
        var button = $("<input class='cell-2' type='button' value='send'>");
        button.click(function () {

            if (text.val() === "") {
                return false;
            }

            if (text.length > 255) {
                return false;
            }

            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 6, data: text.val()},
                success: function (data) {
                    if (data === "") {
                        message("Error!");
                        return false;
                    }
                    message(data);
                }
            });

        });

        contentmenu.append(text).append(button);
    });
}

function cartridges() {

    $("div#cartridge").click(function () {
        if ($("div").is("#cartridges")) {
            $("div#cartridges").detach();
        }

        var left = $(this).position().left;
        var top = $(this).position().top;

        var addmenu = $("<div id='cartridges'></div>");
        addmenu.css({left: left, top: top});

        var headmenu = $("<div class='headmenu'></div>");
        var closemenu = $("<div class='closemenu'></div>").text("x");
        closemenu.css({width: "20%"});
        closemenu.click(function () {
            if ($("div").is("#cartridges")) {
                $("div#cartridges").detach();
            }
        });

        var contentmenu = $("<div class='contentmenu'></div>");
        contentmenu.append($("<select id='selprint' class='cell-2'></select>"));
        contentmenu.append($("<select id='selcart' class='cell-2'></select>"));
        var button = $("<input class='cell-2' type='button' value='send'>");
        button.click(function () {
            var cart = $("select#selcart option:selected").val();
            var print = $("select#selprint option:selected").val();

            if (cart === "" || print === "") {
                message("Выберите дынные");
                return false;
            }

            var ar = new Array(print, cart);
            var json = JSON.stringify(ar);

            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 5, data: json},
                success: function (data) {
                    if (data === "" || data === "null") {
                        message("Error!");
                        return false;
                    }
                    message("success!");
                    window.location.reload();
                }
            });
        });

        var checked = $("<input type='checkbox' id='checked'>");
        checked.data("check", "checked");
        checked.click(function () {
            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 7},
                success: function (data) {
                    if (data === "") {
                        return false;
                    }
                    var res = JSON.parse(data);

                    if ($("select").is("#selcart")) {
                        $("select#selcart").empty();
                    } else {
                        message("error");
                        return false;
                    }

                    var selcart = $("select#selcart");
                    selcart.append($("<option selected='selected'></option>"));

                    var check = $("input#checked").data("check");
                    message(check);
                    if (check === 'checked') {
                        for (var i = 0, max = res[1].length; i < max; i++) {
                            var flag = true;
                            for (var j = 0, max2 = res[0].length; j < max2; j++) {
                                if (res[1][i][1] === res[0][j][1]) {
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag) {
                                var opt = $("<option></option>");
                                opt.text(res[1][i][0]).val(res[1][i][1]);
                                selcart.append(opt);
                            }
                        }
                        $("input#checked").data("check", "");
                    } else {
                        for (var i = 0, max = res[1].length; i < max; i++) {
                            var opt = $("<option></option>");
                            opt.text(res[1][i][0]).val(res[1][i][1]);
                            selcart.append(opt);
                        }
                        $("input#checked").data("check", "checked");
                    }
                }
            });


        });

        contentmenu.append(button);
        headmenu.append(checked).append(closemenu);
        addmenu.append(headmenu).append(contentmenu);
        $("div.container").append(addmenu);

        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 4},
            success: function (data) {
                if (data === "") {
                    return false;
                }
                var res = JSON.parse(data);

                var cart = $("select#selcart");
                cart.append($("<option selected='selected'></option>"));
                var print = $("select#selprint");
                print.append($("<option selected='selected'></option>"));

                for (var i = 0, max = res[0].length; i < max; i++) {
                    var opt = $("<option></option>");
                    opt.text(res[0][i][0]).val(res[0][i][1]);
                    cart.append(opt);
                }

                for (var i = 0, max = res[1].length; i < max; i++) {
                    var opt = $("<option></option>");
                    opt.text(res[1][i][0]).val(res[1][i][1]);
                    print.append(opt);
                }

            }
        });

    });
}

function clickCart() {

    $("div.cart").click(function () {

        if ($("div").is("#menu")) {
            $("div#menu").detach("#menu");
        }

        if ($("div").is("#cartmenu")) {
            $("div#cartmenu").detach();
        }

        actionCart = $(this).text();
        message(actionCart);
        var type = $(this).text();

        var menu = $("<div id='menu'></div>");

        var head = $("<div class='headmenu-1'></div>");
        var headinfo = $("<div class='headinfo-1'></div>").text(type);
        var div = $("<div class='cell-7'></div>");
        var txt = $("<input id='namecart' type='text' value='15535-'></div>");
        var but = $("<input id='addcart' type='button' value='add'></div>");
        var close = $("<div class='closemenu-1'></div>").text("x");
        close.click(function () {
            $("div#menu").detach();

            if ($("div").is("#cartmenu")) {
                $("div#cartmenu").detach();
            }
        });
        var body = $("<div id='bodymenu'></div>");
        div.append(txt).append(but);
        head.append(div).append(headinfo).append(close);
        menu.append(head).append(body);
        $("div.container").append(menu);
        requestAddCtr($(this).text());

        menu.draggable(function (e) {
            $(this).css({position: "absolute", left: e.pageX, top: e.pageY});
        });

        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 1, type: type},
            success: function (data) {
                if (data === "") {
                    return false;
                }
                var res = JSON.parse(data);

                if (res[0].length === 0) {
                    return false;
                }

                if (res[0].length === 1) {
                    menu.css({width: (res[0].length * 320 +
                                res[0].length * 5 + 10) + "px"});
                } else {
                    menu.css({width: (res[0].length * 160 +
                                res[0].length * 5 + 10) + "px"});
                }



                for (var i = 0, max = res[0].length; i < max; i++) {
                    var colum = $("<div class='colum'></div>");
                    colum.append($("<h4></h4>").text(res[0][i]));

                    for (var j = 1, max2 = res.length; j < max2; j++) {
                        if (res[0][i] === res[j][1]) {
                            var cinv = $("<div class='cell-inv'></div>");
                            cinv.data("id", res[j][3]);
                            cinv.text(res[j][0]);

                            cinv.click(function () {
                                setBackgroundColor();
                                var id = $(this).data("id");
                                $(this).css({backgroundColor: "mediumspringgreen"});
                                model = $(this).text();
                                clickInvCart(id);
                            });

                            if (res[j][2] === "Заправлен") {
                                cinv.css({backgroundColor: "green"});
                                cinv.data("color", "green");
                            } else {
                                cinv.css({backgroundColor: "red"});
                                cinv.data("color", "red");
                            }
                            colum.append(cinv);
                        }
                    }

                    $("#bodymenu").append(colum);
                }
            }
        });

    });

}

function requestAddCtr(name) {
    $("#addcart").click(function () {
        var txt = $("input#namecart").val();
        if (txt === "15535-" || txt === "") {
            return false;
        }

//        if (!txt.includes("15535-") || !txt.includes("15414-")) {
//            message("Отсутствует часть \'15535-\'!");
//            return;
//        } else if(txt.length > 12){
//            message("Привышена длина строки!");
//            return;
//        }

        var ar = new Array(name, txt);
        var json = JSON.stringify(ar);
        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 12, data: json},
            success: function (data) {
                if (data === "" || data === "null") {
                    message("error!");
                    return false;
                } else if (parseInt(data) === 1) {
                    message("It is already exist!");
                    return false;
                }
                message(data);
                $("div.cart").each(function () {
                    if ($(this).text() === actionCart) {
                        $(this).trigger("click");
                        return false;
                    }
                });
            }
        });
    });
}

function createMenuCartridge() {

    if ($("div").is("#cartmenu")) {
        $("div#cartmenu").detach();
    }

    var crtmenu = $("<div id='cartmenu'></div>");
    var head = $("<div class='headmenu'></div>");
    var headinfo = $("<div class='headinfo'></div>");
    var close = $("<div class='closemenu b'></div>").text("x");
    close.click(function () {
        $("div#cartmenu").detach();
        setBackgroundColor();
    });
    var body = $("<div class='bodycart'></div>");
    var selmesto = $("<select id='selmesto' class='cell-3'></select>");
    var name = $("<input type='text' id='writemesto' class='cell-3' hidden='hidden'>");
    var plus = $("<input type='button' value='+' id='plus'>");
    var but = $("<input type='button' value='відправити' id='butsend'>");

    body.append($("<select id='selstat'></select>")).append(name).
            append(selmesto).append(plus);
    body.append($("<p>Примітка:</p>"));
    body.append($("<textarea class='ta' id='prim'></textarea>"));
    body.append($("<p>Істория:</p>"));
    body.append($("<textarea class='ta' id='history' readonly></textarea>"));
    body.append(but);
    head.append(headinfo).append(close);
    crtmenu.append(head).append(body);
    $("div.container").append(crtmenu);
}

function clickInvCart(id) {

    var action = function () {
        $("div.cart").each(function () {
            if ($(this).text() === actionCart) {
                $(this).trigger("click");
                return false;
            }
        });
    };

    createMenuCartridge();
    setValueCartMenu(id);
    var name = $("#writemesto");
    var selmesto = $("#selmesto");
    var headinfo = $("div.headinfo");

    $("#plus").click(function () {

        var write = function (id, data) {
            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 8, id: id, data: data},
                success: function (data) {
                    if (data === "") {
                        message("error!");
                        return false;
                    }
                    message(data);
                }
            });
        };

        if (selmesto.attr("hidden") === 'hidden') {
            selmesto.attr("hidden", false);
            name.attr("hidden", true);

            if (name.val() !== "") {
                writeHistory(id, name.val());
                write(id, name.val());
                action();
            }
            $(this).val("+");
        } else {
            selmesto.attr("hidden", 'hidden');
            name.attr("hidden", false);
            $(this).val("Відп");
        }
    });

    $("#butsend").click(function () {
        var stat = $("select#selstat option:selected").val();
        var mesto = $("select#selmesto option:selected").val();
        var area = $("textarea#prim").val();

        var ar = new Array(stat, mesto, area);
        var json = JSON.stringify(ar);

        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 3, id: id, data: json},
            success: function (data) {
                if (data === "") {
                    message("error!");
                    return false;
                }
                message(data);
                if (locate !== mesto) {
                    writeHistory(id, mesto);
                }
                action();
            }
        });
    });

    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 11, id: id},
        success: function (data) {
            if (data === "") {
                message("error!");
                return false;
            }

            headinfo.css({width: "90%"}).text(model + " " + data);
        }
    });
}

function writeHistory(id, value) {

    var json = JSON.stringify(new Array(id, value));

    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 10, data: json},
        success: function (data) {
            if (data === "") {
                message("error!");
                return false;
            }
            message(data);
        }
    });
}

function setValueCartMenu(id) {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 2, id: id},
        success: function (data) {
            if (data === "") {
                return false;
            }
            var res = JSON.parse(data);

            for (var i = 0, max = res[0].length; i < max; i++) {
                var opt = $("<option></option>").text(res[0][i]);
                if (res[2][3] === res[0][i]) {
                    opt.attr("selected", "selected");
                    locate = res[0][i];
                }
                $("#selmesto").append(opt);
            }

            for (var i = 0, max = res[1].length; i < max; i++) {
                var opt = $("<option></option>").text(res[1][i]);
                if (res[2][2] === res[1][i]) {
                    opt.attr("selected", "selected");
                }
                $("#selstat").append(opt);
            }

            $("#prim").val(res[2][4]);

            if (res[3] !== null) {
                var his = $("#history");
                var str = "";
                for (var i = 0, max = res[3].length; i < max; i++) {
                    str += (res[3][i][1] + " " + res[3][i][0] + "\n");
                }
                his.val(str);
            }
        }
    });
}

function setBackgroundColor() {
    $("div.cell-inv").each(function () {
        if ($(this).text() === model) {
            var color = $(this).data("color");
            $(this).css({backgroundColor: color});
        }
    });
}

function message(text) {
    var div = $("<div id='message'></div>");
    div.text(text);
    $("div.container").append(div);

    setTimeout(function () {
        $("#message").detach();
    }, 3000);
}

function findCart() {

    $("#findname").keypress(function (event) {
        if (event.keyCode === 13) {
            $("#findsend").trigger("click");
        }
    });

    $("input#findsend").click(function () {

        if ($("div").is("#cartmenu")) {
            $("div#cartmenu").remove();
        }

        if ($("div").is("#findcart")) {
            $("div#findcart").remove();
        }

        var str = $("input#findname").val();
        if (str === "") {
            return false;
        }

        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 13, data: str},
            success: function (data) {
                if (data === "") {
                    message("error!");
                    return false;
                }

                var res = JSON.parse(data);

                var findcart = $("<div id='findcart'></div>");
                findcart.css({height: (10 + 35 + res.length * 35) + "px"});
                var head = $("<div class='headmenu'></div>");
                var headinfo = $("<div class='headinfo'></div>");
                var close = $("<div class='closemenu'></div>").text("x");
                close.click(function () {
                    $("div#findcart").detach();
                });
                head.append(headinfo).append(close);

                var body = $("<div class='bodycart'></div>");

                for (var i = 0, max = res.length; i < max; i++) {
                    var rowres = $("<div class='rowres'></div>");
                    rowres.data("id", res[i][2]);
                    rowres.append($("<div class='res cell-8'></div>").text(res[i][0]));
                    rowres.append($("<div class='res invnum'></div>").text(res[i][1]));
                    body.append(rowres);
                }

                findcart.append(head).append(body);
                $("div.container").append(findcart);

                $("div.rowres").click(function () {
                    if ($("div").is("#findcart")) {
                        $("div#findcart").detach();
                    }
                    var id = $(this).data("id");
                    model = $(this).children("div.invnum").text();
                    clickInvCart(id);
                    $(".headinfo").css({width: "90%"}).text(model);
                });

            }
        });
    });

}