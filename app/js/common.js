$('.btn-view-password').on('click', function (e) {
    e.preventDefault();

    if ($(this).siblings('.input-password').attr('type') === 'password') {
        $(this).addClass('view');
        $(this).siblings('.input-password').attr('type', 'text').addClass('click');
    } else {
        $(this).removeClass('view');
        $(this).siblings('.input-password').attr('type', 'password').removeClass('click');
    }
    return false;
});


$('.btn-burger').on('click', function () {
    $('body, html').toggleClass('no-scroll');
    $('.overlay-menu').fadeToggle();
    $('.sidebar').fadeToggle();
});

$('.btn-close-sidebar, .overlay-menu').on('click', function () {
    $('.sidebar').fadeOut();
    $('body, html').removeClass('no-scroll');
    $('.overlay-menu').fadeOut();
});


// dropdown menu
$(function () {
    $('.dropdown-toggle').click(function () {

        let pd = $(this).parents('.dropdown');
        $('.dropdown').not(pd).find('.dropdown-toggle').removeClass('active').next('.dropdown-menu').slideUp(200);
        $(this).toggleClass('active').next('.dropdown-menu').slideToggle();
    });

    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown-menu').slideUp();
            $('.dropdown-toggle').removeClass('active');
        }
    });
});


$('.form-search input').on('keyup change', function () {
    if (this.value.length > 0) {
        $(this).parents('.form-search').addClass('active');
    } else {
        $(this).parents('.form-search').removeClass('active');
    }
});

$('.clear-search').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.form-search').removeClass('active');
    $(this).parents('.form-search').find('input').val('');
});


// модальные окна (несколько)
$(function () {
    let overlay = $('.overlay'),
        open_modal = $('.open_modal'),
        close = $('.modal__close, .overlay, .btn-close-modal'),
        modal = $('.modal__div');

    open_modal.on('click', function (event) {
        event.preventDefault();

        modal.css('display', 'none').animate({
            opacity: 0,
            top: '45%'
        }, 200);

        let div = $(this).attr('href');
        overlay.fadeIn(400,
            function () {
                $(div)
                    .css('display', 'flex')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    });

    close.on('click', function () {
        modal
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
    });
});
//end


// tabs
$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
});


// активная ссылка меню
$('.menu li a').each(function () {
    let location = window.location.href;
    let link = this.href;
    if (location === link) {
        $(this).addClass('active');
    }
});
// end


// accordeon
function accordeon() {
    var panel = $('.panel_heading');

    if (panel.hasClass('in')) {
        $('.in').find('.block_hover').slideDown();
    }

    $('.panel_heading .block_title').on('click', function () {
        $(this).parent().toggleClass('in').find('.block_hover').slideToggle();
    });
}

accordeon();


$(window).on('load', function () {
    $('.preloader').delay(1000).fadeOut(1000);
});


$(window).on('load', function () {
    setTimeout(function () {
        $('.icon-loader-btn').delay(3000).fadeOut();
        $('.btn span:hidden').delay(3000).fadeIn();
    }, 4000);

});

$('.btn-view-text').on('click', function () {
    $(this).parent().find('.box-text').addClass('open');
    $(this).fadeOut();
});


// new js
$(document).ready(function ($) {
    $('.tabs-wrap li a').click(function (e) {
        e.preventDefault();
    });
    $('.tabs-wrap li').click(function () {
        $('.tabs-wrap li').removeClass('active');
        $(this).addClass('active').closest('.tabs-wrap').find('.tab_content').removeClass('active');

        var selectTab = $(this).find('a').attr("href");

        $(selectTab).addClass('active');
    });
});


$.datepicker.setDefaults(
    {
        closeText: 'Закрыть',
        prevText: '',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });


$(function() {
    $('.datepicker').datepicker({
        range: 'period', // режим - выбор периода
        numberOfMonths: 2,
        onSelect: function(dateText, inst, extensionRange) {
            // extensionRange - объект расширения
            $('.startDate').html(extensionRange.startDateText);
            $('.endDate').html(extensionRange.endDateText);
        }
    });


    var debounce;
    $(window).resize(function() {
        clearTimeout(debounce);
        if ($(window).width() < 768) {
            debounce = setTimeout(function() {
                debounceDatepicker(1)
            }, 250);
        } else {
            debounce = setTimeout(function() {
                debounceDatepicker(2)
            }, 250);
        }
    }).trigger('resize');

    function debounceDatepicker(no) {
        $(".datepicker").datepicker("option", "numberOfMonths", no);
    }


    $('.datepicker').datepicker('setDate', ['+4d', '+8d']);

    // объект расширения (хранит состояние календаря)
    var extensionRange = $('.datepicker').datepicker('widget').data('datepickerExtensionRange');
    if(extensionRange.startDateText) $('.startDate').html(extensionRange.startDateText);
    if(extensionRange.endDateText) $('.endDate').html(extensionRange.endDateText);
});

