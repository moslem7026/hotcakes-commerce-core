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
	auto: true,
	pager:true,
	controls: true,
});  


// OurMission //
$(".AboutUs").bxSlider({
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


// Owl/
$("#owl-TopService").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      pagination : false,
      paginationSpeed : 400,
      singleItem:true
 
});

$("#owl-AboutUs").owlCarousel({
 
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
 
});
  
  
$("#owl-demo").owlCarousel({
     
          autoPlay: false, //Set AutoPlay to 3 seconds
          navigation : true, // Show next and prev buttons
		  pagination : false,
          slideSpeed : 300,
          paginationSpeed : 400,     
          items : 4,
          itemsDesktop : [1199,3],
          itemsDesktopSmall : [979,3]
     
      });

});
