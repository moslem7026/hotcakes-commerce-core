$(document).ready(function () {

    function HoverOver() {
        $(this).addClass('hover');
    }

    function HoverOut() {
        $(this).removeClass('hover');
    }

    var config = {
        sensitivity: 1,
        interval: 10,
        over: HoverOver,
        timeout: 10,
        out: HoverOut
    };

    $(".dnnMenu .topLevel > li.haschild").hover(HoverOver, HoverOut);

    $(".subLevel li.haschild").hover(HoverOver, HoverOut);

});