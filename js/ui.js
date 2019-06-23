$(function(){

	$('.btn-nav').on('click', function(){
		if($('.nav').is(':hidden')){
			$(this).addClass('active');
			$('.nav').fadeIn();
		} else{
			$(this).removeClass('active');
			$('.nav').fadeOut();
		}
	});

	$('.book-list .slide-area').bxSlider({
		pager: false,
		onSliderLoad: function(){
			$('.book-item[aria-hidden=false]').find('.info .title, .info .provide').show();
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			$('.info .title, .info .provide').fadeOut();
			$slideElement.find('.info .title, .info .provide').fadeIn();

			var num = newIndex%3;
			switch(num){
				case 0:
					$('.book-wrap').css('background','#f6dc64');
					break;
				case 1:
					$('.book-wrap').css('background','#efe9e1');
					break;
				case 2:
					$('.book-wrap').css('background','#8dd5a8');
					break;
			}
		}
	});

	$(window).resize(function() {
	    itemHeight();
	});

	function itemHeight(){
		$('.book-list .slide-area').css({
			height: $(window).height()
		});
	}

});