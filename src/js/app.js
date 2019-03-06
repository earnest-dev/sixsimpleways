//Tickertape
let tick = 0

const ticker = setInterval(function(){
    tick = tick - 0.5
    if (tick <= 0 - $('.ticker h2 span').width()) {
        tick = 60
    }
    $('.ticker h2 span').css('transform', 'translateX( ' + tick + 'px)')
}, 1)

function tickertape() {
    tick = 0
    $('.ticker h2').html('<span>' + $('.ticker h2').text() + '</span><span>' + $('.ticker h2').text() + '</span>' )
    $('.ticker h2 span').css('width', Math.ceil($('.ticker h2 span').width()) + 'px' )
}



//Links
let page = false;

$('#nav a').click(function(e) {
    e.preventDefault();
    $('#page').removeClass('in')
    $(window).scrollTop(0)
    showpage($(this).data('page'))
    changecol($(this).data('bg'))
})

function showpage(thispage) {
    $.get( "page-" + thispage + ".html", function( data ) {
        $("#page").html( data )
        $("#page").addClass('in')
        tickertape()
        if (thispage == 'home') {
            page = false
        } else {
            page = true
        }    
    });
}

//Scroll
$(window).on('scroll', function(){
    if (page == true) {
        var scroll = $(window).scrollTop()
    
        var fraction = scroll / ($('#copy')[0].scrollHeight - $(window).height() + $('#copy').offset().top)
        var imgscroll = $('#images')[0].scrollHeight - $('#images').outerHeight()

        console.log(  scroll + ": " + (fraction)   )

        $('#images img').css('transform','translateY(' + (0 - (fraction * imgscroll)) + 'px)')
        $('#images').css('transform','translateY(' + (scroll) + 'px)')
    }
});

//Colours
function changecol(newcol) {
    document.documentElement.style.setProperty('--bgcol', newcol);
}

//Ready
$(document).ready(function() {
    showpage('home')
})

$(window).resize(function(){
    tickertape()
})