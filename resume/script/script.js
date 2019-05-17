window.onload = init;


function User(fio, age, state) {
    this.fio = fio;
    this.age = age;
    this.state = state;
}

function Purpose(name, salary) {
    this.name = name;
    this.salary = salary;
}

function Experience(last) {
    this.last = last;
}

function Education(name1, name2) {
    this.name = name1;
    this.name2 = name2;
}

function Skill(s1, s2, s3, s4) {
    this.s1 = s1;
    this.s2 = s2;
    this.s3 = s3;
    this.s3 = s4;
}

function Contact(phone, mail) {
    this.phone = phone;
    this.mail = mail;
}

var user = new User("Федотов Александр Александрович", "35", "не одружений");
var purpose = new Purpose("Web-developer", "12000грн");
var experience = new Experience("Малиновського обʼєднаного управління Пенсійного фонду України в м. Одесі");
var education = new Education("Південноукраїнський державний педагогічний університет ім. К.Д.Ушинського", "Курси розробка програмного забезпечення");
var skill = new Skill("JavaScript, JQuery, HTML, CSS, MySQL, PHP, AJAX", "Линейка Windows NT; Linux (администратор)", "Java, Javafx", "Photoshop");
var contact = new Contact("(067) 866-02-79", "fonfonkun@gmail.com");

function init() {
    initBookmark();
    initResize();
    addElements(".content", 1);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function initBookmark() {
    for (var i = 1, max = 6; i <= max; i++) {
        var el = "#bookmark" + i;
        $(el).click(function () {
            var color = $(this).css("background-color");
            $(".content").css("background-color", color);
            var name = $(this).attr("id");
            var num = parseInt(name[name.length - 1]);
            addElements(".content", num);

            if ($(window).width() < 481) {
                if ($("div").is("#temp")) {
                    $("div").remove("#temp");
                }

                $(".container").height(452);
                $(this).after($("<div id='temp'></div>")
                        .css({width: "100%", height: "200px", backgroundColor: color, padding: "10px", fontSize: "11pt"}));
                addElements("#temp", num);
            }
        });
    }
}

function initResize() {
    $(window).resize(function () {
        if ($(window).width() > 481) {
            if ($("div").is("#temp")) {
                $("div").remove("#temp");
            }
        }
    });
}

function addElements(elem, key) {
    switch (key) {
        case 1:
            $(elem).empty();
            $(elem).append($("<h2></h2>").text(user.fio));
            $(elem).append($("<p></p>").text("Возраст: " + user.age));
            $(elem).append($("<p></p>").text("Статус: " + user.state));
            break;
        case 2:
            $(elem).empty();
            $(elem).append($("<p></p>").text(purpose.name));
            $(elem).append($("<p></p>").text(purpose.salary));
            break;
        case 3:
            $(elem).empty();

            if ($(window).width() < 481) {
                var top = $("<div></div>").css({width: "100%", height: "50px"});
                var bot = $("<div></div>").css({width: "100%", height: "130px"});
            } else {
                var top = $("<div></div>").css({width: "100%", height: "170px"});
                var bot = $("<div></div>").css({width: "100%", height: "150px"});
            }
            top.append($("<p></p>").text("Останне місце праці: " + experience.last));
            bot.append($("<h3></h3>").text("Портфолио"));
            bot.append($("<a id='pic1' href='../tetris/index.php'></a>"));
            $(elem).append(top).append(bot);
            break;
        case 4:
            $(elem).empty();
            $(elem).append($("<p></p>").text(education.name));
            $(elem).append($("<p></p>").text(education.name2));
            break;
        case 5:
            $(elem).empty();
            $(elem).append($("<p></p>").text(skill.s1));
            $(elem).append($("<p></p>").text(skill.s2));
            $(elem).append($("<p></p>").text(skill.s3));
            break;
        case 6:
            $(elem).empty();
            $(elem).append($("<p></p>").text(contact.phone));
            $(elem).append($("<p></p>").text(contact.mail));
            $(elem).append($("<p><a href='resume.php'>Версія для друку</a></p>"));
            break;
    }
}

