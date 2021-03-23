$(function () {

	$('.content').mCustomScrollbar();
	$('.char-info').mCustomScrollbar();

	var itemArr = [];
	var ringArr = [];
	var checkArr = [];

	var ysPageSave = localStorage.getItem('ysPageSave');
	var brave = localStorage.getItem('brave');
	var skill = localStorage.getItem('skill');
	var ysItem = localStorage.getItem('ysItem');
	var ysWeapon = localStorage.getItem('ysWeapon');
	var ysShield = localStorage.getItem('ysShield');
	var ysArmor = localStorage.getItem('ysArmor');
	var ysRing = localStorage.getItem('ysRing');
	var ysRingList = localStorage.getItem('ysRingList');
	var check = localStorage.getItem('check');

	function pad(n) {
	    return (n < 10 && n >= 0) ? ('0' + n) : n;
	}
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
		localStorage.setItem('check', checkArr);
		// console.log(checkArr)
	});

	//page save
	if (ysPageSave) {
		$.ajax({
			url: 'page/' + ysPageSave + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if (brave) {
					$('.brave').find('input').val(pad(brave));
				}
				if (skill) {
					$('.skill').find('input').val(pad(skill));
				}
				if (ysWeapon) {
					$('.weapon .item').text(ysWeapon);
				}
				if (ysShield) {
					$('.shield .item').text(ysShield);
				}
				if (ysArmor) {
					$('.armor .item').text(ysArmor);
				}
				if (ysRing) {
					$('.ring .select span').text(ysRing);
					ringArr = ysRingList.split(',');
					for (i in ringArr) {
						$('.ring .option').append('<li>' + ringArr[i] + '</li>');
					}
				}
				if (ysItem) {
					itemArr = ysItem.split(',');
					for (i in itemArr) {
						$('.etc dd').append('<div>' + itemArr[i] + '</div>');
					}
				}
				if (check) {
					checkArr = check.split(',');
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
	$(document).on('click', '.btn-reset', function () {
		location.href = '/gamebook/ys/';
		localStorage.removeItem('ysPageSave');
		localStorage.removeItem('brave');
		localStorage.removeItem('skill');
		localStorage.removeItem('ysItem');
		localStorage.removeItem('ysWeapon');
		localStorage.removeItem('ysShield');
		localStorage.removeItem('ysArmor');
		localStorage.removeItem('ysRing');
		localStorage.removeItem('ysRingList');
		localStorage.removeItem('check');
	});
	$(document).on('click', '.btn-page', function () {
		var pageIdx = $(this).data('next-page');
		localStorage.setItem('ysPageSave', pageIdx);
		// console.log(pageIdx)
		$.ajax({
			url: 'page/' + pageIdx + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if ($('.page[data-weapon]').length) {
					var getWeapon = $('.page').data('weapon');
					localStorage.setItem('ysWeapon', getWeapon);
					$('.weapon .item').text(getWeapon);
				}
				if ($('.page[data-shield]').length) {
					var getShield = $('.page').data('shield');
					localStorage.setItem('ysShield', getShield);
					$('.shield .item').text(getShield);
				}
				if ($('.page[data-armor]').length) {
					var getArmor = $('.page').data('armor');
					localStorage.setItem('ysArmor', getArmor);
					$('.armor .item').text(getArmor);
				}
				if ($('.page[data-ring]').length) {
					var getRing = $('.page').data('ring');
					$('.ring .select span').text(getRing);
					ringArr.push(getRing);
					localStorage.setItem('ysRing', getRing);
					localStorage.setItem('ysRingList', ringArr);
					$('.ring .option').append('<li>' + getRing + '</li>');
				}
				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					localStorage.setItem('ysItem', itemArr);
				}
			}
		});
	});

	$('.go-page button').on('click', function () {
		var page = $('.go-page input').val();
		localStorage.setItem('ysPageSave', page);
		$.ajax({
			url: 'page/' + page + '.html',
			success: function (result) {
				$('.content .inner').html(result);
				if ($('.page[data-weapon]').length) {
					var getWeapon = $('.page').data('weapon');
					localStorage.setItem('ysWeapon', getWeapon);
					$('.weapon .item').text(getWeapon);
				}
				if ($('.page[data-shield]').length) {
					var getShield = $('.page').data('shield');
					localStorage.setItem('ysShield', getShield);
					$('.shield .item').text(getShield);
				}
				if ($('.page[data-armor]').length) {
					var getArmor = $('.page').data('armor');
					localStorage.setItem('ysArmor', getArmor);
					$('.armor .item').text(getArmor);
				}
				if ($('.page[data-ring]').length) {
					var getRing = $('.page').data('ring');
					$('.ring .select span').text(getRing);
					ringArr.push(getRing);
					localStorage.setItem('ysRing', getRing);
					localStorage.setItem('ysRingList', ringArr);
					$('.ring .option').append('<li>' + getRing + '</li>');
				}
				if ($('.page[data-item]').length) {
					var getItem = $('.page').data('item');
					itemArr.push(getItem);
					$('.etc dd').append('<div>' + getItem + '</div>');
					localStorage.setItem('ysItem', itemArr);
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
		var value = $(this).siblings('input').val();
		var total = value * 1 + step;
		$(this).siblings('input').val(pad(total));
		if ($(this).parent().hasClass('brave')) {
			localStorage.setItem('brave', total);
		}
		if ($(this).parent().hasClass('skill')) {
			localStorage.setItem('skill', total);
		}
	});
	$('.btn-minus').on('click', function () {
		var value = $(this).siblings('input').val();
		var total = value * 1 - step;
		$(this).siblings('input').val(pad(total));
		if ($(this).parent().hasClass('brave')) {
			localStorage.setItem('brave', total);
		}
		if ($(this).parent().hasClass('skill')) {
			localStorage.setItem('skill', total);
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