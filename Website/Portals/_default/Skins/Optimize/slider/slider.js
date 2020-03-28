$( document ).ready(function( $ ) {
// nivoSlider
$('#slider').nivoSlider();

							 
							 
// bxslider //
$(".bxslider").bxSlider({
	auto: true,
	pager:false,
});  


// Testimonial //
$(".Testimonial").bxSlider({
	auto: false,
	pager:true,
	controls: true,
});  


// OurMission //
$("#OurMission").bxSlider({
	auto: true,
	pager:true,
	controls: false,
});  

// bx-example1 //
$('.bx-example1').bxSlider({
  slideWidth: 270,
    minSlides: 2,
    maxSlides: 4,
    moveSlides: 1,
    slideMargin: 10
});

// bx-thumbnail //
$('.bx-thumbnail').bxSlider({
	auto: true,
	controls:true,
	pagerCustom: '#bx-thumbnail-pager',
});

	  
});