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

$('#nav a').click(function(e) {
    e.preventDefault();
    $('#page').addClass('out')
    $(window).scrollTop(0)
    changecol($(this).data('bg'))

    let delay = 500

    let thispage = $(this).data('page')
    if (thispage == 'home') {
        delay = 800
        $('.ticker').addClass('out')
    } else {
        $('.ticker').removeClass('out')
    }

    setTimeout(function() {
        showpage(thispage)
    }, delay)
})

function showpage(thispage) {
    $.get( "page-" + thispage + ".html", function( data ) {
        $("#page").html( data )

        tickertape()
        if (thispage == 'home') {
            page = false
            $('.ticker').addClass('out')
        } else {
            page = true
            $('.ticker').removeClass('out')
            
            /*
            var imglist = eval("imgArray." + thispage);
            for (let i = 0; i < imglist.length; i++) {
                console.log(imglist[i])
                $('#images').append('<img src="img/' + thispage + '/' + imglist[i] + '">')
            }
            */
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
            offset = $('#copy').offset().top - 20
        }

        var fraction = scroll / ($('#copy')[0].scrollHeight - $(window).height() + offset)
        var imgscroll = $('#images')[0].scrollHeight - $('#images').outerHeight()

        //console.log(  scroll + ": " + (fraction)   )

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
    /*
    $('#nav h2 a').each(function() {
        let thisnum = $(this).data('page')
        if (thisnum != 'home') {
            $.ajax({
                url: "imageloop.php",
                type: "POST",
                data: ({dir: thisnum}),
                dataType: "json",
                success: function (data) {
                    imgArray[thisnum] = data
                }
            });
        }
    })
    */
    showpage('home')
})

$(window).resize(function(){
    tickertape()
})