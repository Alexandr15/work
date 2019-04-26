/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = init;


function init() {

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#desc").append($("<div class='rect'></div>").data("x", j).data("y", i));
        }
    }




    var count = 0;
    var timer = setInterval(function () {

        var x = Math.floor(Math.random() * (4 - 0)) + 0;
        var y = Math.floor(Math.random() * (4 - 0)) + 0;

        $(".rect").each(function () {
            if (parseInt($(this).data("x")) === x && parseInt($(this).data("y")) === y) {
                $(this).removeAttr("class");
                $(this).attr("class", "rect2");

                //$(this).css("background-image", "url(/home/sasha/public_html/test/2.png)");
                return;
            }
        });
        
        var x = Math.floor(Math.random() * (4 - 0)) + 0;
        var y = Math.floor(Math.random() * (4 - 0)) + 0;

        $(".rect2").each(function () {
            if (parseInt($(this).data("x")) === x && parseInt($(this).data("y")) === y) {
                $(this).removeAttr("class");
                $(this).attr("class", "rect");

                //$(this).css("background-image", "url(/home/sasha/public_html/test/2.png)");
                return;
            }
        });

        if (count > 20) {
            console.log("end");
            clearInterval(timer);
        }
        //count++;
    }, 1000);

    //var count2 = 0;
//    var timer2 = setInterval(function () {
//
//        var x = Math.floor(Math.random() * (4 - 0)) + 0;
//        var y = Math.floor(Math.random() * (4 - 0)) + 0;
//
//        $(".rect2").each(function () {
//            if (parseInt($(this).data("x")) === x && parseInt($(this).data("y")) === y) {
//                $(this).removeAttr("class");
//                $(this).attr("class", "rect");
//
//                //$(this).css("background-image", "url(/home/sasha/public_html/test/2.png)");
//                return;
//            }
//        });
//
//        if (count2 > 20) {
//            console.log("end2");
//            clearInterval(timer2);
//        }
//        count++;
//    }, 1000);

}