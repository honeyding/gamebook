$(function () {

	//dark mode
	var dark = $.cookie('darkMode');
	if (dark) {
		$('html').addClass('dark-mode');
	}

	$('.btn-dark').click(function () {
		if ($('html').hasClass('dark-mode')) {
			$('html').removeClass('dark-mode');
			$.removeCookie('darkMode');
		} else {
			$('html').addClass('dark-mode');
			$.cookie('darkMode', true, {
				'expires': 365
			});
		}
	});

	$('.btn-nav').on('click', function () {
		if ($('.nav').is(':hidden')) {
			$(this).addClass('active');
			$('.nav').fadeIn();
		} else {
			$(this).removeClass('active');
			$('.nav').fadeOut();
		}
	});

	var num;
	function bgColor(num) {
		switch (num) {
			case 0:
				$('.book-wrap').css('background', '#f6dc64');
				break;
			case 1:
				$('.book-wrap').css('background', '#efe9e1');
				break;
			case 2:
				$('.book-wrap').css('background', '#8dd5a8');
				break;
		}
	}

	pcOption = {
		pager: false,
		touchEnabled: (navigator.maxTouchPoints > 0),
		onSliderLoad: function () {
			$('.book-item[aria-hidden=false]').find('.info .title, .info .provide').show();
		},
		onSlideBefore: function ($slideElement, oldIndex, newIndex) {
			$('.info .title, .info .provide').fadeOut();
			$slideElement.find('.info .title, .info .provide').fadeIn();

			num = newIndex % 3;
			bgColor(num);
		}
	}

	mobileOption = {
		pager: false,
		onSliderLoad: function () {
			$('.book-item[aria-hidden=false]').find('.info .title, .info .provide').show();
		},
		onSlideBefore: function ($slideElement, oldIndex, newIndex) {
			$('.info .title, .info .provide').fadeOut();
			$slideElement.find('.info .title, .info .provide').fadeIn();

			num = newIndex % 3;
			bgColor(num);
		}
	}

	if ($(window).width() > 768) {
		$('.book-list .slide-area').bxSlider(pcOption);
	} else {
		$('.book-list .slide-area').bxSlider(mobileOption);
	}

	$(window).resize(function () {
		itemHeight();
	});

	function itemHeight() {
		$('.book-list .slide-area').css({
			height: $(window).height()
		});
	}

});