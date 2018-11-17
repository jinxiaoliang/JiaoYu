$(function() {
	$('.nav').click(function(){
		$('.nav-web').fadeIn();
		$('.transparent').fadeIn();
	});
	$('.x,.transparent').click(function(){
		$('.nav-web').fadeOut();
		$('.transparent').fadeOut();
	});
	
	$('.zixun').click(function(){
		$('.tanchu').fadeIn();
		$('.transparent').fadeIn();
	});
	$('.ma_cl3,.transparent').click(function(){
		$('.tanchu').fadeOut();
		$('.transparent').fadeOut();
	});
});
