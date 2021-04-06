$(function () {

	$('.content').mCustomScrollbar();
	$('.panel').mCustomScrollbar();

	var hellColor = localStorage.getItem('hellColor');
	var hellDate = localStorage.getItem('hellDate');

	var hellPageSave = localStorage.getItem('hellPageSave');
	var badMark = localStorage.getItem('badMark');

	//dark mode
	// if (dark) {
	// 	$('html').addClass('dark-mode');
	// }

	// $('.btn-dark').click(function () {
	// 	if ($('html').hasClass('dark-mode')) {
	// 		$('html').removeClass('dark-mode');
	// 		$.removeCookie('darkMode');
	// 	} else {
	// 		$('html').addClass('dark-mode');
	// 		$.cookie('darkMode', true, {
	// 			'expires': 365
	// 		});
	// 	}
	// });

	if(hellColor){
		$('html').attr('data-color', hellColor);
		$('.color-select button[data-color="'+hellColor+'"]').parent().addClass('active').siblings().removeClass('active');
	}

	//page save
	if (hellPageSave) {
		$.ajax({
			url: 'page/' + hellPageSave + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if (badMark) {
					$('.bad p').text(badMark);
				}
				if(hellDate){
					$('.autosave .date').text(hellDate);
				}
			}
		});
	}

	//page
	// $(document).on('click', '.btn-start', function () {
	// 	$.removeCookie('hellPageSave, badMark');
	// });
	function saveDate(){
		var date = new Date();
	    var year = date.getFullYear();
	    var month = ("0" + (1 + date.getMonth())).slice(-2);
	    var day = ("0" + date.getDate()).slice(-2);
	    var hour = ("0" + date.getHours()).slice(-2);
	    var minute = ("0" + date.getMinutes()).slice(-2);

	    return year + '. ' + month + '. ' + day + '. ' + hour + ':' + minute;
	}
	$(document).on('click', '.btn-page', function () {
		var pageIdx = $(this).data('next-page');
		localStorage.setItem('hellPageSave', pageIdx);
		$.ajax({
			url: 'page/' + pageIdx + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				$('html, body').scrollTop(0);
				$('.btn-sheet').removeClass('active');
				if ($('.page[data-bad]').length) {
					var num = parseInt($('.bad p').text());
					var sum = $('.page').data('bad') + num;
					$('.bad p').text(sum);
					localStorage.setItem('badMark', sum);
				}
				var location = 'page/' + pageIdx + '.html';
				localStorage.setItem('hellDate', saveDate());
				$('.autosave .date').text(saveDate());
			}
		});
		if ($('.sheet > div').is(':visible')) {
			$('.sheet > div').hide();
		}
	});

	$(document).on('click', '.btn-reset, .btn-end', function(){
		location.href = '/gamebook/hell-escape/';
		localStorage.removeItem('hellPageSave');
		localStorage.removeItem('badMark');
		localStorage.removeItem('hellDate');
		$('.autosave .date').text('');
	});

	$('.btn-go').on('click', function () {
		var page = $('.go-page input').val();
		localStorage.setItem('hellPageSave', page);
		$.ajax({
			url: 'page/' + page + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				$('html, body').scrollTop(0);
				$('.btn-sheet').removeClass('active');
				if ($('.page[data-bad]').length) {
					var num = parseInt($('.bad p').text());
					var sum = $('.page').data('bad') + num;
					$('.bad p').text(sum);
					localStorage.setItem('badMark', sum);
				}
				var location = 'page/' + page + '.html';
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

	//panel
	$('.btn-option').click(function(){
		$('.modal-setting').fadeIn();
	});
	$('.btn-modalClose').click(function(){
		$('.modal-setting').fadeOut();
	});

	$('.color-select button').click(function(){
		var hellColor = $(this).data('color');
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('html').attr('data-color', hellColor);
		localStorage.setItem('hellColor', hellColor);
	});

});