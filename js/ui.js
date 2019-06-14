$(function(){

	$('.book-list .slide-area').bxSlider({
		pager: false,
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