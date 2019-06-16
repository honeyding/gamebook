$(function(){

	$('.btn-nav').on('click', function(){
		// $('.nav').show().animate({
		// 	top:0,
		// 	right:0,
		// 	width:'100%',
		// 	height:'100%'
		// });
		$('.nav').fadeIn();
	});
	$('.btn-close').on('click', function(){
		// $('.nav').animate({
		// 	top:'70px',
		// 	right:'110px',
		// 	width:0,
		// 	height:0
		// }, function(){
		// 	$('.nav').hide()
		// });
		$('.nav').fadeOut();
	});

	$('.book-list .slide-area').bxSlider({
		pager: false,
		touchEnabled: false,
		onSliderLoad: function(){
			$('.book-item[aria-hidden=false]').find('.info').show();
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			$('.book-item .info').fadeOut();
			$slideElement.find('.info').fadeIn();
		}
	});

	// $('.book-list .slide-area').slick({
	// 	prevArrow: $('.btn-prev'),
	// 	nextArrow: $('.btn-next')
	// });
	// $('.book-list .slide-area').on('afterChange', function(slick, currentSlide){
	// 	var currentSlide = $('.book-list .slide-area').slick('slickCurrentSlide');
	// 	console.log(currentSlide)
	// 	if(currentSlide == 1){alert()}
	// });

});