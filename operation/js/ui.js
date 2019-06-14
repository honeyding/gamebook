$(function(){

	//page
	$(document).on('click', '.btn-page', function(){
		var pageIdx = $(this).data('next-page');
		$.ajax({
			url: 'page/'+pageIdx+'.html',
			success: function(result){
				$('.content').html(result);
				if($('.page[data-aim]').length){
					$('.aim-select').show();
					cnt = $('.page').data('aim');
				}
				if($('.page[data-result]').length){
					// alert()
					$('.btn-page').on('click', function(){
						$('.aim-select').hide();
						$('.aim-select input:checkbox').prop('checked', false).attr('disabled', false);
					});
				}
			}
		});
		if($('.sheet > div').is(':visible')){
			$('.sheet > div').hide();
		}
	});

	//sheet
	var type;
	var cnt;
	$('.sheet > div').draggable();
	$('.btn-sheet').on('click', function(){
		type = $(this).data('sheet');
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
		}
	});

	$('.go-page').on('click', function(){
		var page = $('.go-page input').val();
		$.ajax({
			url: 'page/'+page+'.html',
			success: function(result){
				$('.content').html(result);
				if($('.page[data-aim]').length){
					$('.aim-select').show();
					cnt = $('.page').data('aim');
				}
				if($('.page[data-result]').length){
					// alert()
					$('.btn-page').on('click', function(){
						$('.aim-select').hide();
						$('.aim-select input:checkbox').prop('checked', false).attr('disabled', false);
					});
				}
			}
		});
	});

	//aim
	$('.aim-select input').on('change', function(){
		$('.aim-select .checkbox').each(function(){
			var num = $('.aim-select input:checkbox:checked').length;
			if(num == cnt){
				$('.aim-select input:checkbox:not(:checked)').attr('disabled', true)
			}else{
				$('.aim-select input').attr('disabled', false)
			}
		});
	});

});