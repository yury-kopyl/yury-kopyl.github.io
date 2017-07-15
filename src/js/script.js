$('.nav__user').on('click', function(event){
	event.stopPropagation();
});

$('#person, #config').on('click', function () {
	if ( $(this).parent('.open').length === 0 ) {
		$('.dropdown.open').removeClass('open');
	}
	$(this).parent('.dropdown').toggleClass('open');
});

// Эмуляция Bootstrap Modal
$('.user__search, .user__callback').on('click', function () {
	var modal = $( $(this).attr('href') );

	$('body').addClass('modal-open');
	modal.css('display', 'block');
	setTimeout(function () {
		modal.addClass('in');
	}, 50);
});

$('.user__auth').on('click', function (e) {
	e.preventDefault();

	$('#auth').modal({
		toggle: true,
		backdrop: true
	});
});

$('.user__basket, .basket__close').on('click', function () {
	var block = $( $(this).attr('href') );

	block.toggleClass('in');
});

$('#search .modal__close, #callback .callback__close').on('click', function () {
	var modal = $( $(this).attr('href') );

	modal.removeClass('in');
	setTimeout(function () {
		modal.css('display', 'none');
		$('body').removeClass('modal-open');
	}, 300);
});

function resizeMatches() {
	if (window.matchMedia("(max-width: 767px)").matches) {
		// Для мобильных подключаем bootstrap affix который при скроле фиксирует меню
		$('.header__nav').affix({
			offset: {
				top: 58
			}
		});
	} else {
		// Для планшетов и выше отключаем bootstrap affix и удаляем его классы
		$(window).off('.affix');
		$('.header__nav').removeData('affix').removeClass('affix affix-top affix-bottom');
	}
}

$('.js-slick-carousel').slick({
	arrows: false,
	speed: 1000,
	slidesToShow: 6,
	slidesToScroll: 6,
	swipeToSlide: true,
	touchThreshold: 20,
	responsive: [
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			}
		},
		{
			breakpoint: 1799,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5
			}
		}
	]
});

$('.js-slick-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: '.js-slick-slider_mini',
	touchThreshold: 20
});

$('.js-slick-slider_mini').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	asNavFor: '.js-slick-slider',
	touchThreshold: 20,
	swipe: false,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				swipe: true
			}
		}
	]
});

$('.js-shop-slider').slick({
	arrows: false,
	centerMode: true,
	speed: 1000,
	slidesToShow: 3,
	swipeToSlide: true,
	centerPadding: '70px',
	slidesToScroll: 1,
	touchThreshold: 20,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				centerPadding: '20px',
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				centerPadding: '60px',
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				centerPadding: '60px',
			}
		}
	]
});




var initialCategory = $('.shop-category__item').index( $('.shop-category__item_active') );

$(window).on('resize orientationchange', function() {
	$('.js-shop-category').slick('resize');
});

$('.js-shop-category').slick({
	arrows: false,
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 4,
	centerPadding: '20px',
	swipeToSlide: true,
	touchThreshold: 20,
	centerMode: true,
	initialSlide: initialCategory,
	responsive: [
		{
			breakpoint: 9999,
			settings: "unslick"
		},
		{
			breakpoint: 380,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: '30px'
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: '50px',
			}
		},
		{
			breakpoint: 690,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: '70px'
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: '90px'
			}
		},
		{
			breakpoint: 850,
			settings: {
				centerPadding: '70px',
			}
		},
		{
			breakpoint: 1000,
			settings: {
				centerPadding: '90px',
			}
		},
		{
			breakpoint: 1200,
			settings: {
				centerPadding: '100px',
			}
		}
	]
});



$( ".js-shop-sort" ).select2({
	minimumResultsForSearch: Infinity
});

$( ".js-shop-authors" ).select2();




$(window).resize(resizeMatches);
resizeMatches();