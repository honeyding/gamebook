$(function () {

	$('.content').mCustomScrollbar();

	var itemArr = [];
	var ringArr = [];
	var checkArr = [];
	var ysPageSave = $.cookie('ysPageSave');
	var brave = $.cookie('brave');
	var skill = $.cookie('skill');
	var ysItem = $.cookie('ysItem');
	var ysWeapon = $.cookie('ysWeapon');
	var ysShield = $.cookie('ysShield');
	var ysArmor = $.cookie('ysArmor');
	var ysRing = $.cookie('ysRing');
	var ysRingList = $.cookie('ysRingList');
	var check = $.cookie('check');

	var checkLength = $('.check-wrap .checkbox').length;
	for (i = 0; i < checkLength; i++) {
		checkArr.push(0);
	}
	$('.checkbox input:checkbox').change(function () {
		var checkbox = $(this);
		var idx = checkbox.parent().index();
		if (checkbox.prop('checked') == true) {
			checkArr[idx] = 1;
		} else {
			checkArr[idx] = 0;
		}
		$.cookie('check', checkArr, {
			'expires': 365
		});
		// console.log(checkArr)
	});

	//page save
	if (ysPageSave) {
		$.ajax({
			url: 'page/' + ysPageSave + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if (brave) {
					$('.brave').find('input').val(brave);
				}
				if (skill) {
					$('.skill').find('input').val(skill);
				}
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
				if (ysItem) {
					itemArr = ysItem.split(',');
					for (var i = 0; i < itemArr.length; i++) {
						$('.etc dd').append('<div>' + itemArr[i] + '</div>');
					}
				}
				if (check) {
					checkArr = check.split(',').map(Number);
					for (i in checkArr) {
						if (checkArr[i] == 1) {
							$('.checkbox input:checkbox').eq(i).prop('checked', true);
						} else {
							$('.checkbox input:checkbox').eq(i).prop('checked', false);
						}
					}
				}
			}
		});
	}

	//page
	$(document).on('click', '.btn-end', function () {
		$.removeCookie('ysPageSave', { path: '/ys' });
		$.removeCookie('brave', { path: '/ys' });
		$.removeCookie('skill', { path: '/ys' });
		$.removeCookie('ysItem', { path: '/ys' });
		$.removeCookie('ysWeapon', { path: '/ys' });
		$.removeCookie('ysShield', { path: '/ys' });
		$.removeCookie('ysArmor', { path: '/ys' });
		$.removeCookie('ysRing', { path: '/ys' });
		$.removeCookie('ysRingList', { path: '/ys' });
		$.removeCookie('check', { path: '/ys' });
	});
	$(document).on('click', '.btn-page', function () {
		var pageIdx = $(this).data('next-page');
		$.cookie('ysPageSave', pageIdx, {
			'expires': 365
		});
		// console.log(pageIdx)
		$.ajax({
			url: 'page/' + pageIdx + '.html',
			success: function (result) {
				$('.content .inner').html(result);
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
					$('.ring .select span').text(getRing);
					ringArr.push(getRing);
					$.cookie('ysRing', escape(getRing), {
						'expires': 365
					});
					$.cookie('ysRingList', ringArr, {
						'expires': 365
					});
					$('.ring .option').append('<li>' + getRing + '</li>');
				}
				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					$.cookie('ysItem', itemArr, {
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
					$('.ring .select span').text(getRing);
					ringArr.push(getRing);
					$.cookie('ysRing', escape(getRing), {
						'expires': 365
					});
					$.cookie('ysRingList', ringArr, {
						'expires': 365
					});
					$('.ring .option').append('<li>' + getRing + '</li>');
				}
				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					$.cookie('ysItem', itemArr, {
						'expires': 365
					});
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
		var total = value * 1 + step;
		$(this).prev('input').val(total);
		if ($(this).parent().hasClass('brave')) {
			$.cookie('brave', total, {
				'expires': 365
			});
		}
		if ($(this).parent().hasClass('skill')) {
			$.cookie('skill', total, {
				'expires': 365
			});
		}
	});
	$('.btn-minus').on('click', function () {
		var value = $(this).next().val();
		var total = value * 1 - step;
		$(this).next('input').val(total);
		if ($(this).parent().hasClass('brave')) {
			$.cookie('brave', total, {
				'expires': 365
			});
		}
		if ($(this).parent().hasClass('skill')) {
			$.cookie('skill', total, {
				'expires': 365
			});
		}
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