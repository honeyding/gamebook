$(function () {

	var dark = localStorage.getItem('darkMode');
	var hellPageSave = localStorage.getItem('hellPageSave');
	var badMark = localStorage.getItem('badMark');

	//dark mode
	// if (dark) {
	// 	$('html').addClass('dark-mode');
	// }

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

	//page save
	if (hellPageSave) {
		$.ajax({
			url: 'page/' + hellPageSave + '.html',
			success: function (result) {
				$('.content').html(result);
				if (badMark) {
					$('.bad span').text(badMark);
				}
			}
		});
	}

	//page
	$(document).on('click', '.btn-start', function () {
		$.removeCookie('hellPageSave, badMark');
	});
	$(document).on('click', '.btn-page', function () {
		var pageIdx = $(this).data('next-page');
		localStorage.setItem('hellPageSave', pageIdx);
		$.ajax({
			url: 'page/' + pageIdx + '.html',
			success: function (result) {
				$('.content').html(result);
				$('html, body').scrollTop(0);
				$('.btn-sheet').removeClass('active');
				if ($('.page[data-bad]').length) {
					var num = parseInt($('.bad span').text());
					var sum = $('.page').data('bad') + num;
					$('.bad span').text(sum);
					localStorage.setItem('badMark', sum);
				}
				var location = 'page/' + pageIdx + '.html';
			}
		});
		if ($('.sheet > div').is(':visible')) {
			$('.sheet > div').hide();
		}
	});

	$(document).on('click', '.btn-reset', function(){
		location.href = '/hell-escape/';
		localStorage.removeItem('hellPageSave');
		localStorage.removeItem('badMark');
	});

	$('.btn-go').on('click', function () {
		var page = $('.go-page input').val();
		$.cookie('hellPageSave', page, {
			'expires': 365
		});
		$.ajax({
			url: 'page/' + page + '.html',
			success: function (result) {
				$('.content').html(result);
				$('.btn-sheet').removeClass('active');
				if ($('.page[data-bad]').length) {
					var num = parseInt($('.bad span').text());
					var sum = $('.page').data('bad') + num;
					$('.bad span').text(sum);
					$.cookie('badMark', sum, {
						'expires': 365
					});
				}
			}
		});
	});

	$('.go-page input').keypress(function (event) {
		if (event.which == 13) {
			$('.btn-go').click();
			return false;
		}
	});

	//sheet
	var type;
	$('.sheet > div').draggable();
	$('.btn-sheet').on('click', function () {
		type = $(this).data('sheet');
		$(this).addClass('active').siblings('button').removeClass('active');
		$('.sheet').fadeIn();
		$('.sheet > div').hide();
		$('.sheet-' + type).show();
	});
	$('.btn-rotate').on('click', function () {
		$('.sheet-' + type).toggleClass('landscape');
		if ($('.sheet img').is(':visible')) {
			var el = $('.sheet-' + type + ' img');
			var rotate = el.attr('data-rotate');
			if (rotate == 270) {
				angle = 0;
			} else {
				angle = parseInt(rotate) + 90;
			}
			el.attr('data-rotate', angle);
			el.css({
				transform: 'rotate(' + angle + 'deg)'
			});
		}
	});
	$('.btn-sheetClose').on('click', function () {
		if ($('.sheet img').is(':visible')) {
			$('.sheet > div').hide().removeAttr('style');
			$('.btn-sheet').removeClass('active');
			$('.sheet').fadeOut();
		}
	});

});