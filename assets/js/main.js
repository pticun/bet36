function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	t = t <= 0 ? 0 : t;

	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	if(!clock){
		return;
	}
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.sec');

	if ($('#' + id).data('deadline')) {
		endtime = new Date($('#' + id).data('deadline'));
	}


	function updateClock() {
		var t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

function showMenu(){
	$(document).on('click', '.menu-icon', function () {
		if($(window).innerWidth() < 1200){
			$('.menu').addClass('showed');
			$('.menu').append('<div class="close"></div>');
		}
	});
	$(document).on('click', '.close', function () {
		if($(window).innerWidth() < 1200 && $('.menu:not(.close)')){
			$('.menu').removeClass('showed');
			$('.close').remove();
		}
	});
}

function showPopup(element) {
	$(element).addClass('show');

	$(element)
		.children('.close')
		.on('click', function(event) {
			$(element).removeClass('show');
		});
}

function sslider() {
	var options;
	var owlSlid;
	function startSlider() {
		if(owlSlid) {
			owlSlid.trigger('destroy.owl.carousel');
		}

		if($(window).innerWidth() < 768) {
			options = {
				items: 1,
				loop: true,
				autoplay: true,
				autoplayHoverPause:true,
				autoplayTimeout:3000,

			};
			$('.logotypes_section').addClass('owl-carousel');
			owlSlid = $(".logotypes_section").owlCarousel(options);
		} else if ( $(window).innerWidth() < 992 && $(window).innerWidth() > 767){
			options = {
				items: 4,
				loop: true,
				autoplay: true,
				autoplayHoverPause:true,
				autoplayTimeout:3000,
			};
			$('.logotypes_section').addClass('owl-carousel');
			owlSlid = $(".logotypes_section").owlCarousel(options);
		}
		else if ( $(window).innerWidth() < 1199 && $(window).innerWidth() > 991){
			options = {
				items: 4,
				loop: true,
				autoplay: true,
				autoplayHoverPause:true,
				autoplayTimeout:3000,
			};
			$('.logotypes_section').addClass('owl-carousel');
			owlSlid = $(".logotypes_section").owlCarousel(options);
		} else {
			$('.logotypes_section').removeClass('owl-carousel')
		}
	}

	startSlider();

	$(window).resize(function () {
		startSlider();
	});
}

function shiftRoadmapItems() {
	var container = '.roadmap-wrapper',
			item = '.timeline-single',
			prefix = 'roadmap-';

	// Init
	if (!$(container).data('init')) {
		var id = 0;
		$(container + ' ' + item).each(function(index, element) {
			id++;
			$(element).attr('id', prefix + id);

			if ($(element).data('home') === false) {
				$(element).attr('data-home', prefix + (id + 1));
			}
		});

		$(container).attr('data-init', 'true');
	}

	// Commence shifting!
	var itemsToShift = $(container + ' [data-dest]');

	itemsToShift.each(function(index, element) {
		var elementId = $(element).attr('id');
		var destination;

		if ($(window).width() <= 768) {
			destination = prefix + $(element).data('dest');
		} else {
			destination = $(container + ' [data-home=' + elementId + ']').attr('id');
		}

		$(element).insertAfter('#' + destination);
	});
}

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();


	/**
	 * Endtimer in 2 section
	 */
	var deadline = new Date(1513353600000);
	initializeClock('timer-js', deadline);


	sslider();

	showMenu();


	var slider = document.getElementById('slider');

	noUiSlider.create(slider, {
		start: 190000,
		step:1,
		connect: [true, false],
		range: {
			'min': 0,
			'max': 500000
		},
		format: wNumb({
			decimals: 0
		})
	});

	slider.noUiSlider.on('slide', function(){
		var moneyFormat = wNumb({
			prefix: '',
			suffix: ' USD',
			thousand: ','
		});
		var bettrFormat = wNumb({
			prefix: '',
			suffix: ' BTC',
			thousand: ',',
			decimals: 6
		});
		$('.slider-input-value').val(slider.noUiSlider.get());
		$('.set-slider-formatted-value, .investment-dollars-value').text(moneyFormat.to(parseInt(slider.noUiSlider.get())));
		$('.set-slider-calculated-value, .investment-btc-value').text(bettrFormat.to(parseInt(slider.noUiSlider.get()) * 0.000137));
	});

});

// Wait for all the content to finish loading (images included)
$(window).bind('load', function() {

	var visitCount = document.cookie.replace(/(?:(?:^|.*;\s*)visitCount\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	visitCount++;
	document.cookie = 'visitCount=' + visitCount + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';

	$('[class*="popup"]').each(function(index, element) {
		var showLimit = $(element).data('show-limit');
		var recordClosed = $(element).data('record-closed');

		if (showLimit && !(recordClosed && closedBefore)) {

			if (visitCount < showLimit) {
				setTimeout(function() {
					showPopup(element, recordClosed);
				}, 10000);
			}
		} else {
			showPopup(element, recordClosed);
		}
	});
});
