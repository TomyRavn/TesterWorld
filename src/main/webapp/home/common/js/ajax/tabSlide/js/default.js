(function($){

$(window).ycodacss('/js/ajax/tabSlide/css/ycodaslider-3.0.css');
	

$(window).bind("load", function() {
	
	$("div#yslider-docs")
	.ycodaslider({
	     height  : 450, //wh, 
	     scroll  : true,
	     tracking: true,
	     tracking_pre : 'docs'
	});
	$(".ycodaslider").hide();
	
	jQuery(".h-feeds").click(function(){
         var ref = jQuery("div#yslider-feeds").get(0);
         if(!ref.loaded){
             jQuery("div#yslider-feeds")
             .ycodafeeds()
             .ycodaslider({scroll:true,width : 653, tracking:true, tracking_pre: 'feeds'});
             ref.loaded = true;
         }
    });
    $(".h-code").click(function(){
	     var ref = $("div#yslider-code").get(0);
	     if(!ref.loaded){
		     $("div#yslider-code")
		     .ycodacode()
		     .ycodaslider({scroll:true, width: 600, height  : 450});
		     ref.loaded = true;
         }
         return false;
	});
	
	
	$("a.blank").attr("target", "_blank");
	
	$(".handle").each(function(nr){
    	var target = $(this).attr("class").split(" ")[1].split("-")[1];
       	$(this).click(function(){
        	$(".ycodaslider").hide();
       		$("#yslider-" + target).toggle();
       		return false;
        });
    });
	
	$("#yslider-docs").show();
	
});
	
})(jQuery);