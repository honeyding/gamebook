$(function(){

	//page
	$(document).on('click', '.btn-page', function(){
		var pageIdx = $(this).data('next-page');
		$.ajax({
			url: '/hell-escape/page/'+pageIdx+'.html',
			success: function(result){
				$('.content').html(result);
				$('html, body').scrollTop(0);
				$('.btn-sheet').removeClass('active');
				if($('.page[data-bad]').length){
					var num = parseInt($('.bad span').text());
					$('.bad span').text($('.page').data('bad')+num);
				}
			}
		});
		if($('.sheet > div').is(':visible')){
			$('.sheet > div').hide();
		}
	});

	$('.go-page').on('click', function(){
		var page = $('.go-page input').val();
		$.ajax({
			url: '/hell-escape/page/'+page+'.html',
			success: function(result){
				$('.content').html(result);
				$('.btn-sheet').removeClass('active');
				if($('.page[data-bad]').length){
					var num = parseInt($('.bad span').text());
					$('.bad span').text($('.page').data('bad')+num);
				}
			}
		});
	});

	//sheet
	var type;
	$('.sheet > div').draggable();
	$('.btn-sheet').on('click', function(){
		type = $(this).data('sheet');
		$(this).addClass('active').siblings('button').removeClass('active');
		$('.sheet > div').hide();
		$('.sheet-'+type).show();
	});
	$('.btn-rotate').on('click', function(){
		$('.sheet-'+type).toggleClass('landscape');
		if($('.sheet img').is(':visible')){
			var el = $('.sheet-'+type+' img');
			var rotate = el.attr('data-rotate');
			if(rotate == 270){
				angle = 0;
			} else{
				angle = parseInt(rotate) + 90;
			}
			el.attr('data-rotate', angle);
			el.css({
				transform: 'rotate('+angle+'deg)'
			});
		}
	});
	$('.btn-sheetClose').on('click', function(){
		if($('.sheet img').is(':visible')){
			$('.sheet > div').hide().removeAttr('style');
			$('.btn-sheet').removeClass('active');
		}
	});

});