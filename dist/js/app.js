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
let page = false
let imgArray = []

$('.nav a').click(function(e) {
    e.preventDefault()

    $('#page').addClass('out')
    let delay = 500

    let thispage = $(this).data('page')
    if (thispage == 'home' || thispage == 'cta') {
        delay = 800
        $('.ticker').addClass('out')
    } else {
        $('.ticker').removeClass('out')
    }

    if (thispage == 'cta') {
        $('body').addClass('cta')
    } else {
        $('body').removeClass('cta')
        changecol($(this).data('bg'))
    }

    setTimeout(function() {
        $(window).scrollTop(0)
        showpage(thispage)
    }, delay)
})

function showpage(thispage) {
    $('.current').removeClass('current')
    $('.nav a[data-page="' + thispage + '"]').addClass('current')
    $.get( "page-" + thispage + ".html", function( data ) {
        $("#page").html( data )

        tickertape()
        if (thispage == 'home' || thispage == 'cta') {
            page = false
            $('.ticker').addClass('out')
        } else {
            page = true
            $('.ticker').removeClass('out')
        }
        $("#page").removeClass('out')
    });
}

//Scroll
$(window).on('scroll', function(e){
    if (page == true) {
        var scroll = $(window).scrollTop()
        
        let offset = 0;

        if ($(window).innerWidth() < 901) {
            var multiplier = $(window).innerWidth() / $(window).innerHeight() * 0.9
            offset = $('#copy').offset().top * multiplier
        }

        var fraction = scroll / ($('#copy')[0].scrollHeight - $(window).height() + offset)
        var imgscroll = $('#images')[0].scrollHeight - $('#images').outerHeight()

        $('#images img').css('transform','translateY(' + (0 - (fraction * imgscroll)) + 'px)')
        $('#images').css('transform','translateY(' + (scroll) + 'px)')
    }
})

//Colours
function changecol(newcol) {
    document.documentElement.style.setProperty('--bgcol', newcol)
}

//Ready
$(document).ready(function() {
    showpage('home')
})

$(window).resize(function(){
    tickertape()
})