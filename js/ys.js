$(function () {

	$('.content').mCustomScrollbar();

	var itemArr = [];
	var ringArr = [];
	var ysPageSave = $.cookie('ysPageSave');
	var ysItem = $.cookie('ysItem');
	var ysWeapon = $.cookie('ysWeapon');
	var ysShield = $.cookie('ysShield');
	var ysArmor = $.cookie('ysArmor');
	var ysRing = $.cookie('ysRing');
	var ysRingList = $.cookie('ysRingList');

	//page save
	if (ysPageSave) {
		$.ajax({
			url: 'page/' + ysPageSave + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if (ysWeapon) {
					$('.weapon .item').text(unescape(ysWeapon));
				}
				if (ysShield) {
					$('.shield .item').text(unescape(ysShield));
				}
				if (ysArmor) {
					$('.armor .item').text(unescape(ysArmor));
				}
				if (ysRing) {
					$('.ring .select span').text(unescape(ysRing));
					ringArr = ysRingList.split(',');
					for (var i = 0; i < ringArr.length; i++) {
						$('.ring .option').append('<li>' + ringArr[i] + '</li>');
					}
				}
			}
		});
	}

	//page
	$(document).on('click', '.btn-end', function () {
		$.removeCookie('ysPageSave');
	});
	$(document).on('click', '.btn-page', function () {
		var pageIdx = $(this).data('next-page');
		$.cookie('ysPageSave', pageIdx, {
			'expires': 365
		});
		console.log(pageIdx)
		$.ajax({
			url: 'page/' + pageIdx + '.html',
			success: function (result) {
				$('.content .inner').html(result);

				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					$.cookie('ysItem', itemArr, {
						'expires': 365
					});

					console.log(itemArr)
				}
				if ($('.page[data-weapon]').length) {
					var getWeapon = $('.page').data('weapon');
					$.cookie('ysWeapon', getWeapon, {
						'expires': 365
					});
					$('.weapon .item').text(getWeapon);
				}
				if ($('.page[data-shield]').length) {
					var getShield = $('.page').data('shield');
					$.cookie('ysShield', getShield, {
						'expires': 365
					});
				}
				if ($('.page[data-armor]').length) {
					var getArmor = $('.page').data('armor');
					$.cookie('ysArmor', getArmor, {
						'expires': 365
					});
				}
				if ($('.page[data-ring]').length) {
					var getRing = $('.page').data('ring');
					ringArr.push(getRing);
					$.cookie('ysRing', getRing, {
						'expires': 365
					});
					$.cookie('ysRingList', ringArr, {
						'expires': 365
					});
				}
			}
		});
	});

	$('.go-page button').on('click', function () {
		var page = $('.go-page input').val();
		$.cookie('ysPageSave', page, {
			'expires': 365
		});
		$.ajax({
			url: 'page/' + page + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					$.cookie('ysItem', itemArr, {
						'expires': 365
					});
				}
				if ($('.page[data-weapon]').length) {
					var getWeapon = $('.page').data('weapon');
					$.cookie('ysWeapon', escape(getWeapon), {
						'expires': 365
					});
					$('.weapon .item').text(getWeapon);
				}
				if ($('.page[data-shield]').length) {
					var getShield = $('.page').data('shield');
					$.cookie('ysShield', escape(getShield), {
						'expires': 365
					});
					$('.shield .item').text(getShield);
				}
				if ($('.page[data-armor]').length) {
					var getArmor = $('.page').data('armor');
					$.cookie('ysArmor', escape(getArmor), {
						'expires': 365
					});
					$('.armor .item').text(getArmor);
				}
				if ($('.page[data-ring]').length) {
					var getRing = $('.page').data('ring');
					ringArr.push(getRing);
					$.cookie('ysRing', escape(getRing), {
						'expires': 365
					});
					$.cookie('ysRingList', ringArr, {
						'expires': 365
					});
					$('.ring .option').append('<li>' + getRing + '</li>');
				}
			}
		});
	});
	$('.go-page input').keypress(function (event) {
		if (event.which == 13) {
			$('.go-page button').click();
			return false;
		}
	});

	var step = 1;
	$('.btn-plus').on('click', function () {
		var value = $(this).prev().val();
		$(this).prev('input').val(value * 1 + step);
	});
	$('.btn-minus').on('click', function () {
		var value = $(this).next().val();
		$(this).next('input').val(value * 1 - step);
	});

	$('.select span').on('click', function () {
		$('.option').stop().slideUp(200);
		$(this).next('.option').stop().slideDown(200);
		return false;
	});
	$(document).on('click', '.option li', function () {
		var txt = $(this).text();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.option').prev('span').text(txt);
	});
	$('body').on('click', function () {
		$('.option').stop().slideUp(200);
	});

});