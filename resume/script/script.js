window.onload = init;


function User(fio, age, state) {
    this.fio = fio;
    this.age = age;
    this.state = state;
}

var user = new User("Федотов Александр Александрович", "33", "не одружений");

function init() {
    initBookmark();
}

function initBookmark() {
    for (var i = 1, max = 5; i <= max; i++) {
        var el = "#bookmark" + i;
        $(el).click(function () {
            var color = $(this).css("background-color");
            $(".content").css("background-color", color);

            var name = $(this).attr("id");
            var num = parseInt(name[name.length - 1]);
            
            if(isNaN())

            if ($(window).width() < 481) {

                if ($("div").is("#temp")) {
                    $("div").remove("#temp");
                }

                $(".container").height(452);
                $(this).after($("<div id='temp'></div>")
                        .css({width: "100%", height: "200px", backgroundColor: color, padding: "10px"}));
            }


        });
    }
}
