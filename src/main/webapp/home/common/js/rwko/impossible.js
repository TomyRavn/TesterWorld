function contResize(){
	var ww = $(window).width();
	if(ww<769) $('.wrapper').animate({width: ww + 400},0).find('#header').animate({width: ww},0);
	else $('.wrapper').add('#header').animate({'width':'100%'},0);
}
contResize();
$(window).resize(function(){contResize();});
