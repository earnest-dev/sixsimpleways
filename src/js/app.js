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
$('#nav a').click(function(e) {
    e.preventDefault();
    $(window).scrollTop(0)
    var thispage = $(this).data('page')
    showpage(thispage)
})

function showpage(thispage) {
    $.get( "page-" + thispage + ".html", function( data ) {
        $("#page").html( data );
        tickertape();
    });
}

//Scroll
$(window).on('scroll', function(e){
    

    var scroll = $(window).scrollTop()
    
    var fraction = scroll / ($('#copy').outerHeight() - $(window).height())
    var imgscroll = fraction * ($('#images').outerHeight() - $(window).height())

    $('#images').css('top',(0 - imgscroll) + 'px')
});

//Ready
$(document).ready(function() {
    showpage('home')
})

$(window).resize(function(){
    tickertape()
})