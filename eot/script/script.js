window.onload = init;

var path = "/eot/action.php";
var st = new Array();
var st_all = new Array();
var sys = new Array();

function init() {
    initSt();
    initOs();
    initStAll();
    rectScroll();
    rectmouseenter();
    rectmouseleave();
    rectclick();
    addDevice();
    searchInv();
    showFilter();
    whatChange();
    
    if (get !== "") {
        $("div.rect-2").each(function () {
            if($(this).text() === get.toString()){
                $(this).trigger('click');
            }
        });
    }
}
// возвращает сгруппированную таблицу статуса 
function initSt() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 5},
        success: function (data) {
            if (data === "" || data === "null") {
                return false;
            }
            st = JSON.parse(data);
        }
    });
}
// возвращает всю таблицу статуса
function initStAll() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 7},
        success: function (data) {
            if (data === "" || data === "null") {
                return false;
            }
            st_all = JSON.parse(data);
        }
    });
}
// возвращает таюлицу операционные системы
function initOs() {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 6},
        success: function (data) {
            if (data === "" || data === "null") {
                return false;
            }
            sys = JSON.parse(data);
        }
    });
}
// событие вывода всплывающего окна при входе курсара мыши на квадрат
function rectmouseenter() {
    $("div.rect-2").mouseenter(function () {
        var item = $("<div class='frame-1'></div>");
        var left = $(this).position().left + $(this).width() + 20;
        var top = $(this).position().top + $(this).height() + 20;

        if (left + 200 > document.documentElement.clientWidth) {
            item.css({top: top, left: left - 200});
        } else {
            item.css({top: top, left: left});
        }

        $("body").append(item);
        var id = $(this).data('id');
        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 1, id: id},
            success: function (data) {
                item.text(data);
            }
        });
    });
}
// событие закрытия всплывающего окна при выходи курсара из квадрата
function rectmouseleave() {
    $("div.rect-2").mouseleave(function () {
        if ($("div").is(".frame-1")) {
            $("div.frame-1").remove();
        }
    });
}
// события клика по квадрату вызывает функцию создания окна 
// и функция вывода информации об устройсвах (монитор принтер мфу)
function rectclick() {
    $("div.rect-2").click(function () {
        var top = $(this).position().top + 20;
        var left = $(this).position().left + 20;
        var body = shoWin(top, left);
        var id = $(this).data('id');
        initFrame(body, id);
        clickBookmark(body, id);
    });
}

function clickBookmark(body, id) {
    $("div.bookmark").click(function () {
        var name = $(this).text();
        if (name === 'DHCP') {
            dhcp(body, id);
            return;
        }

        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 3, id: id, type: name},
            success: function (data) {
                selectCaption(name);
                body.empty();
                if (data === "") {
                    device(body, id, name);
                } else {
                    initFrame(body, data);
                }
            }
        });
    });
}
// создание окна с выводом информации об устройствах
function shoWin(top, left) {
    if ($("div").is(".win")) {
        $("div.win").remove();
    }

    var win = $("<div class='win'></div>");
    if (left + 340 > document.documentElement.clientWidth) {
        win.css({top: top, left: left - 340});
    } else {
        win.css({top: top, left: left});
    }
    var cap = $("<div class='cap'></div>");
    cap.append($("<div class='cap-1 bookmark'>DHCP</div>"));
    cap.append($("<div class='cap-1 bookmark'>ПК</div>"));
    cap.append($("<div class='cap-1 bookmark'>монитор</div>"));
    cap.append($("<div class='cap-1 bookmark'>Принтер</div>"));
    var cls = $("<div class='cls'>x</div>");
    cls.click(function () {
        if ($("div").is(".win")) {
            $("div.win").remove();
        }
    });
    cap.append(cls);
    var body = $("<div class='body'></div>");
    win.append(cap).append(body);
    $("body").append(win);
    return body;
}
//событие выбора закладки в всплывающем окне DHCP
function dhcp(body, id) {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 14, id: id},
        success: function (data) {
            if (data === "null") {
                return;
            }
            var res = JSON.parse(data);
            body.empty();
            for (var i = 0, max = res.length; i < max; i++) {
                var row = $("<div class='row-2'></div>").text(res[i]);
                body.append(row);
            }
        }
    });
}

function device(body, id, name) {
    var item = $("<select class='row-3'></select>");
    body.append(item);
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 9, id: id, type: name},
        success: function (data) {
            if (data === "" || data === "null") {
                return false;
            }
            var res = JSON.parse(data);
            for (var i = 0, max = res.length; i < max; i++) {
                var option = $("<option></option>").text("inv: " + res[i][0] + " sn: " + res[i][1]);
                option.val(res[i][2]);
                option.click(function () {
                    var id_dev = $(this).val();
                    $.ajax({
                        url: path,
                        type: 'POST',
                        data: {key: 10, id_dev: id_dev, id: id},
                        success: function (data) {
                            if (data === '1') {
                                body.empty();
                                initFrame(body, id_dev);
                            } else {
                                fly_win(data);
                            }
                        }
                    });
                });
                item.append(option);
            }
        }
    });
}
// фукция инициализации полей в всплывающем окне об устройствах
function initFrame(parent, id) {
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 2, id: id},
        success: function (data) {
            if (data === "null") {
                return false;
            }
            var res = JSON.parse(data);
            selectCaption(res[2]);
            var stat = createSelectStat("row-5");
            var os = createSelectOs(res[15]);
            var flag = false;
            if (res[2] === 'ПК' || res[2] === 'сервер') {
                flag = true;
            }

            for (var i = 0, max = res.length; i < max; i++) {
                var row = $("<div class='row-2'></div>");
                if (i === 0 || i === 1 || i === 2) {
                    row.text(res[i]);
                    parent.append(row);
                } else if (i === 3) {
                    row.css({padding: 0});
                    row.append(stat).append($("<input id='add-st' class='row-6' type='button' value='Додати'>"));
                    parent.append(row);
                    addStatus(res[2]);
                } else if (i === 4) {
                    var text = $("<textarea id='info' class='row-4'></textarea>").css({resize: "vertical"});
                    parent.append(text.text(res[i]));
                } else if (i === 5) {
                    row.text(res[i]);
                    parent.append(row);
                } else if ((i === 6 || i === 7 || i === 8 || i === 9) && flag) {
                    if (i === 6) {
                        parent.append($("<input type='text' class='row-3 comp' placeholder='mo'>").val(res[i]));
                    } else if (i === 7) {
                        parent.append($("<input type='text' class='row-3 comp' placeholder='cp'>").val(res[i]));
                    } else if (i === 8) {
                        parent.append($("<input type='text' class='row-3 comp' placeholder='op'>").val(res[i]));
                    } else if (i === 9) {
                        parent.append($("<input type='text' class='row-3 comp' placeholder='hd'>").val(res[i]));
                    }
                } else if (i === 13) {
                    var sel = $("<select id='del' class='row-3'></select>");
                    sel.append($("<option " + (res[i] === '0' ? 'selected' : '') + " value='0'>Відкрита</option>"));
                    sel.append($("<option " + (res[i] === '1' ? 'selected' : '') + " value='1'>Зачинена</option>"));
                    parent.append(sel);
                } else if (i === 14) {
                    parent.append($("<input id='kb' type='text' class='row-3'>").val(res[i]));
                } else if (i === 15 && flag) {
                    parent.append(os);
                }
            }

            var but = $("<input class='but-1' type='button' value='Відправити'>");
            but.click(function () {
                updateRow(id, res[2]);
            });
            parent.append(but);
            selectedStatus(res[3]);
            if (res[2] !== 'ПК' && res[2] !== 'сервер') {
                var but2 = $("<input class='but-2' type='button' value='Відкріпити'>");
                but2.click(function () {
                    $.ajax({
                        url: path,
                        type: 'POST',
                        data: {key: 11, inv: res[0], id: res[16]},
                        success: function (data) {
                            if (data === "" || data === "null") {
                                return false;
                            }
                            parent.empty();
                            device(parent, id, res[2]);
                        }
                    });
                });
                parent.append(but2);
            }

        }
    });
}

function selectedStatus(num) {
    for (var i = 0, max = st_all.length; i < max; i++) {
        if (num === st_all[i][1]) {
            $("#stat option").each(function () {
                if ($(this).text() === st_all[i][0]) {
                    $(this).prop("selected", true);
                    return;
                }
            });
            break;
        }
    }
}
// 
function createSelectStat(name) {
    var stat = $("<select id='stat' class='" + name + "'></select>");
    for (var i = 0, max = st.length; i < max; i++) {
        stat.append($("<option></option>").text(st[i]));
    }
    return stat;
}

function createSelectOs(num = null) {
    var os = $("<select id='os' class='row-3'></select>");
    for (var i = 0, max = sys.length; i < max; i++) {
        if (num === sys[i]) {
            os.append($("<option selected></option>").text(sys[i]));
        } else {
            os.append($("<option></option>").text(sys[i]));
        }
    }
    return os;
}

function updateRow(id, predmet) {
    var arr = new Array();
    var stat = $("select#stat option:selected").text();
    arr[0] = "";
    for (var i = 0, max = st_all.length; i < max; i++) {
        if (st_all[i][2] === predmet && st_all[i][0] === stat) {
            arr[0] = st_all[i][1];
            break;
        }
    }
    arr[1] = $("textarea#info").val();
    if (predmet === 'ПК' || predmet === 'сервер') {
        var i = arr.length;
        $("input.comp").each(function () {
            arr[i] = $(this).val();
            i++;
        });
    } else {
        for (var i = arr.length; i <= 4; i++) {
            arr[i] = "";
        }
    }
    arr[6] = $("select#del option:selected").val();
    arr[7] = $("input#kb").val();
    arr[8] = $("select#os option:selected").text();
    arr[9] = id;
    var json = JSON.stringify(arr);
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 8, arr: json},
        success: function (data) {
            return data ? fly_win("запись обновлена!") : false;
        }
    });
}

function selectCaption(key) {
    $(".cap-1").each(function () {
        $(this).css({backgroundColor: '#E8E8E8'});
        switch (key) {
            case 'ПК':
            case 'сервер':
                if ($(this).text() === 'ПК') {
                    $(this).css({backgroundColor: '#aaa'});
                }
                break;
            case 'монитор':
                if ($(this).text() === 'монитор') {
                    $(this).css({backgroundColor: '#aaa'});
                }
                break;
            case 'Принтер':
            case 'МФУ':
                if ($(this).text() === 'Принтер') {
                    $(this).css({backgroundColor: '#aaa'});
                }
                break;
        }
    });
}
// событие кнопки добавить статус 
// отправляет запрос на сервер о добавлении нового статуса
function addStatus(predmet) {
    $("#add-st").click(function () {
        if ($("div").is(".w-1")) {
            $("div.w-1").remove();
        }

        var w = $("<div class='w-1'></div>");
        w.append($("<div class='cap-w-1'></div>"));
        var cls = $("<div class='cls-w-1'>x</div>");
        cls.click(function () {
            if ($("div").is(".w-1")) {
                $("div.w-1").remove();
            }
        });
        w.append(cls);
        var b = $("<div class='b-w-1'></div>");
        b.append($("<input id='txt-w-1' class='col-1-w-1' type='text' maxlength='50'>"));
        b.append($("<input id='but-w-1' class='col-2-w-1' type='button' value='Відправити'>"));
        w.append(b);
        var top = $(this).position().top + $(this).height();
        var left = $(this).position().left + $(this).width();
        w.css({top: top, left: left});
        $(".body").append(w);
        $("#but-w-1").click(function () {
            var text = $("#txt-w-1").val();
            if (!text) {
                return;
            }

            $.ajax({
                url: path,
                type: 'POST',
                data: {key: 4, predmet: predmet, st: text},
                success: function (data) {
                    return data ? fly_win(data) : false;
                }
            });
        });
    });
}
// окно сообщение закрывается через 5 сек
function fly_win(data) {
    if ($("div").is(".mes")) {
        $("div.mes").remove();
    }
    $("body").append($("<div class='mes'></div>").text(data));
    var timerId = setTimeout(function () {
        if ($("div").is(".mes")) {
            $("div.mes").remove();
        }
        clearTimeout(timerId);
    }, 5000);
}

function rectScroll() {
    $(".rect").each(function () {
        var items = $(this).children(".rect-2");
        var w = items.length * items.eq(0).width();
        if (w > $(this).width()) {
            $(this).css({overflowY: "auto"});
        }
    });
}
// добавление нового устройства в базу данных
function addDevice() {
    $("input#add").click(function () {
        closeWin();

        var win = $("<div class='win-2'></div>");
        var top = $(this).position().top + $(this).height();
        var left = $(this).position().left + $(this).width();
        win.css({top: top, left: left});
        var cap = $("<div class='cap-2'></div>");
        cap.append($("<div class='cap-2-1'></div>"));
        var cls = $("<div class='cls'>x</div>");
        cls.click(function () {
            if ($("div").is(".win-2")) {
                $("div.win-2").remove();
            }
        });
        cap.append(cls);
        var body = $("<div class='body-2'></div>");
        win.append(cap).append(body);

        $("body").append(win);
        for (var i = 1; i <= 13; i++) {
            switch (i) {
                case 1:
                    body.append($("<input id='addinv' type='text' class='row-3' placeholder='inv' maxlength='50' value=''>"));
                    break;
                case 2:
                    body.append($("<input id='addsn' type='text' class='row-3' placeholder='sn' maxlength='50' value=''>"));
                    break;
                case 3:
                    var select = $("<select id='addpred' class='row-3'></select>");
                    select.append($("<option class='predmet'></option>").text("UPS"));
                    select.append($("<option class='predmet'></option>").text("Ксерокс"));
                    select.append($("<option class='predmet'></option>").text("монитор"));
                    select.append($("<option class='predmet'></option>").text("МФУ"));
                    select.append($("<option class='predmet'></option>").text("ПК"));
                    select.append($("<option class='predmet'></option>").text("Принтер"));
                    select.append($("<option class='predmet'></option>").text("Свич"));
                    select.append($("<option class='predmet'></option>").text("сервер"));
                    select.append($("<option class='predmet'></option>").text("Сканер"));
                    select.append($("<option class='predmet'></option>").text("Терминал"));
                    body.append(select);
                    $("option.predmet").click(function () {
                        var text = $(this).text();
                        if (text !== 'ПК' && text !== "сервер") {
                            $("input#addmo").prop("disabled", true).val("");
                            $("input#addcp").prop("disabled", true).val("");
                            $("input#addop").prop("disabled", true).val("");
                            $("input#addhd").prop("disabled", true).val("");
                            $("select#os").prop("disabled", true);
                        } else {
                            $("input#addmo").prop("disabled", false);
                            $("input#addcp").prop("disabled", false);
                            $("input#addop").prop("disabled", false);
                            $("input#addhd").prop("disabled", false);
                            $("select#os").prop("disabled", false);
                        }
                    });
                    break;
                case 4:
                    var stat = createSelectStat("row-3");
                    body.append(stat);
                    break;
                case 5:
                    body.append($("<input id='addinfo' type='text' class='row-3' placeholder='info' maxlength='255' value=''>"));
                    break;
                case 7:
                    body.append($("<input id='addmo' type='text' class='row-3' placeholder='mo' maxlength='50' value=''>"));
                    break;
                case 8:
                    body.append($("<input id='addcp' type='text' class='row-3' placeholder='cp' maxlength='50' value=''>"));
                    break;
                case 9:
                    body.append($("<input id='addop' type='text' class='row-3' placeholder='op' maxlength='50' value=''>"));
                    break;
                case 10:
                    body.append($("<input id='addhd' type='text' class='row-3' placeholder='hd' maxlength='50' value=''>"));
                    break;
                case 12:
                    body.append($("<input id='addkb' type='text' class='row-3' placeholder='kb' maxlength='50' value=''>"));
                    break;
                case 13:
                    var os = createSelectOs();
                    body.append(os);
                    break;
            }
        }
        var but = $("<input id='addev' class='but-1' type='button' value='Відправити'>");
        but.click(function () {
            insertInv();
        });
        body.append(but);
    });
}
// зыкрывает окна, если они уже открыты
function closeWin() {
    if ($("div").is(".win-2")) {
        $("div.win-2").remove();
    }

    if ($("div").is(".win")) {
        $("div.win").remove();
    }
}
// отправляет запрос на сервер, чтобы добавить устройство в таблицу inv
function insertInv() {
    var arr = new Array();
    arr[0] = $("input#addinv").val();
    arr[1] = $("input#addsn").val();
    arr[2] = $("select#addpred option:selected").text();
    arr[3] = $("select#stat option:selected").text();

    for (var i = 0, max = st_all.length; i < max; i++) {
        if (st_all[i][2] === arr[2] && st_all[i][0] === arr[3]) {
            arr[3] = st_all[i][1];
            break;
        }
    }

    arr[4] = $("input#addinfo").val();
    arr[5] = $("input#addmo").val();
    arr[6] = $("input#addcp").val();
    arr[7] = $("input#addop").val();
    arr[8] = $("input#addhd").val();
    arr[9] = $("input#addkb").val();
    arr[10] = $("select#stat option:selected").text();

    if (arr[0] === "" || arr[1] === "" || arr[2] === "") {
        alert("Поля обязательны к заполнению!");
        return;
    }

    var json = JSON.stringify(arr);
    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 12, arr: json},
        success: function (data) {
            return data ? fly_win(data) : false;
        }
    });
}
// события поиска кнопка поиск клавиатура enter
function searchInv() {
    $("input#find").click(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        requestFind(top, left);
    });

    $("input#search").keypress(function (e) {
        if (e.keyCode !== 13) {
            return;
        }
        var top = $(this).position().top;
        var left = $(this).position().left;
        requestFind(top, left);
    });
}

function whatChange() {
    $("#what").change(function () {
        var item = $(this).children("option:selected").text();

        if (item === 'ip') {
            $("input#search").attr("pattern", "(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])");
        } else {
            $("input#search").removeAttr("pattern").val("");
        }
    });
}

var object = [];
// выводит результат поиска
function requestFind(top, left) {
    var select = $("select#what option:selected").text();
    var search = $("input#search").val();

    if (search === "") {
        alert("строка поиска пустая");
        return;
    } else if (select === 'ip') {

        var num = parseInt(search);
        if (Number.isNaN(num)) {
            alert("введите число");
            return;
        }
    }

    $.ajax({
        url: path,
        type: 'POST',
        data: {key: 13, select: select, search: search},
        success: function (data) {
            if (data === "[]") {
                return false;
            }

            if (select === 'ip') {
                $(".rect-2").each(function () {

                    if (data === $(this).text()) {
                        var i = object.length;
                        object[i] = $(this);
                        rectAnimation(object[i]);
                    }
                });
                return;
            }

            var res = JSON.parse(data);
            var body = shoWin(top, left);

            for (var i = 0, max = res.length; i < max; i++) {
                var div = $("<div class='row-9'><div>");

                div.click({id: res[i][3]}, function (e) {
                    body.empty();
                    body.css({padding: "5px 5px 0 5px"});
                    initFrame(body, e.data.id);
                    clickBookmark(body, e.data.id);
                });

                div.append($("<div class='row-8'><div>").text(res[i][0]));
                div.append($("<div class='row-8'><div>").text(res[i][1]));
                div.append($("<div class='row-8'><div>").text(res[i][2]));
                body.append(div);
            }
        }
    });
}

function rectAnimation(object) {
    var count = 0;
    var flag = false;
    var timerId = setInterval(function () {
        count++;

        if (flag) {
            object.css({backgroundColor: '#ffffff'});
            flag = false;
        } else {
            object.css({backgroundColor: '#DD0915'});
            flag = true;
        }

        if (count === 100) {
            clearTimeout(timerId);
            object.css({backgroundColor: '#088A4B'});
        }
    }, 100);
}

function showFilter() {
    $("input#choice").click(function () {
        var sort = new Array();
        var index = 0;
        $(".sort").each(function () {
            var option = $(this).children("option:selected");
            if (option.index() !== 0) {
                sort[index] = $(this).val();
            } else {
                sort[index] = "";
            }
            index++;
        });

        var date1 = $("input#date1").val();
        var date2 = $("input#date2").val();

        var d1 = new Date(date1);
        var d2 = new Date(date2);

        if (d1 > d2 && (date1 === "" || date2 === "")) {
            alert("Введите корректную дату!");
            return;
        }

        sort[index] = date1;
        index++;
        sort[index] = date2;

        var json = JSON.stringify(sort);
        $.ajax({
            url: path,
            type: 'POST',
            data: {key: 15, contain: json},
            success: function (data) {
                if (data === "[]") {
                    return false;
                }
                var res = JSON.parse(data);

                var show = $("#showSort");
                show.empty();
                show.css({padding: "0 0 0 20px"});
                var div = $("<div class='pad-1'></div>");
                show.append(div);

                for (var i = 0, max = res.length; i < max; i++) {
                    var row = $("<div class='row-2 showDev'></div>").val(res[i][4]);
                    row.append($("<div class='show-col cols col-1'></div>").text(i + 1));
                    row.append($("<div class='show-col cols col-2'></div>").text(res[i][0]));
                    row.append($("<div class='show-col cols col-6'></div>").text(res[i][1]));
                    row.append($("<div class='show-col cols col-2'></div>").text(res[i][2]));
                    row.append($("<div class='show-col cols col-1'></div>").text(res[i][3]));
                    div.append(row);
                }

                $("div.showDev").click(function () {
                    var top = $(this).position().top;
                    var left = $(this).position().left;
                    var val = $(this).val();
                    var body = shoWin(top, left);
                    initFrame(body, val);
                    clickBookmark(body, val);
                });
            }
        });
    });
}
