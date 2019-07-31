
// JavaScript Document
$(document).ready(function() {
	
if($(window).width() < 1500){
$(".lister.onsc").addClass("scrol");
}

$('.sidebar-btn').on("click", function(){
 $('.sidebar, .sidebar .overlay').toggleClass("act");
});	
$('.closee').on("click", function(){
 $(this).closest(".sidebar").removeClass("act");
 $(this).closest(".sidebar-in").siblings(".overlay").removeClass("act");
});	
resizer();
	
$('.popup, .overlay').fadeIn();	
		
$('.close-btn, .overlay').on("click", function(){
 $('.popup, .overlay').fadeOut();
});	 

$('.pop-detals').on("click", function(){
 $('.popup, .overlay').fadeIn();
});	

$('.suces').on("click", function(){
 $('.popup').fadeOut();
var opo = $(this).attr("data-pop");
//console.log(opo);
 $("#"+opo).fadeIn();
});	
	
	
$(".scrol").mCustomScrollbar({
	scrollButtons:{enable:false},
	theme:"dark-thin"
});
		
	
$('.field input, textarea').blur(function(){
if($(this).val() != ''){
$(this).closest('.field').find('fieldset').addClass('active');
} else {
$(this).closest('.field').find('fieldset').removeClass('active');
}
});
$('.field input, textarea').focusin(function(){
$(this).closest('.field').find('fieldset').addClass('active');
});	



$('.mov').slick({
	  dots: false,
	  arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: false,
      autoplaySpeed: 2500
	});
	
	$('.automov').slick({
	  dots: false,
	  arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: false,
      autoplaySpeed: 2500,
	  responsive: [
		{
		  breakpoint: 1030,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 650,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 500,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
	  ]
	});
	
$(".btnsld").bind("click", function(){
		
var tab_id = $(this).attr("data-tab");
$("#"+tab_id).addClass('active');
$('.mov').get(0).slick.setPosition();

});	
//$('.movr').get(0).slick.setPosition();
//*****************************
    // Slick Sliders
    //*****************************
    $('').slick({
        arrows: false,
        dots: true,
        autoplay: true,
		pauseOnHover: true,
        autoplaySpeed: 5000
    });
    //*****************************
    // Responsive Slider
    //*****************************
    var respsliders = {
      1: {slider : '.auuto'}
     
    };
    $.each(respsliders, function() {
        $(this.slider).slick({
            arrows: true,
            dots: false,
            autoplay: false,
            settings: "unslick",
            responsive: [
                {
                  breakpoint: 2000,
                  settings: "unslick"
                },
                {
                  breakpoint: 767,
                  settings: {
                    unslick: true
                  }
                }
            ]
        });
});

$("footer h6 i.fa").click(function(){
$(this).parent().next().slideToggle();
$(this).toggleClass("fa-minus-square-o");
});
	

$(".hamburger--collapse").click(function(){
$(this).toggleClass("is-active").parents("html").toggleClass("mm-opening").find(".respon").toggleClass("mm-opened");
});

		
});

function resizer(){
	if($(window).width() >= 758){	
		var hg = $(window).height(); 
		$('.banner-wrap').height(hg);
	}
}

$(window).resize(function(){
   resizer();
});



$(".reg-link").click(function() {
	$(".forgot-password").hide();
	$('.modal-backdrop').hide();

});
