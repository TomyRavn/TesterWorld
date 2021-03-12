/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_slide Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_slide();
});
function js_slide (){
	var section_obj = $(".slide_cont");
		section_obj.pointer = section_obj.find(">#pointer>a"); 
		section_obj.ul = section_obj.find(">#tema_section"); 	
		section_obj.ul.li = section_obj.ul.find(">li"); 
		section_obj.control = section_obj.find(">#control>a");  
		section_obj.idx = 0;
		section_obj.save = 0;
		section_obj.ease = "easeInOutExpo";
		
		section_obj.pointer.click(function(){
			if(section_obj.ul.li.is(":animated")) return false;
			section_obj.idx = section_obj.pointer.index($(this));
			if(section_obj.idx == section_obj.save) return false;
			if(section_obj.idx < section_obj.save) {
				move_dir (section_obj,"helper");
			} else {
				move_dir (section_obj,"infor");
			}
			return false;
		});
		
		section_obj.control.click(function(){
			section_obj.pointer.click();
		});
		
	//default	
	def (section_obj);
	resize (section_obj);
}
function move_dir (section_obj,dir){
	section_obj.pointer.removeClass("active");
	section_obj.pointer.eq(section_obj.idx).addClass("active");
	section_obj.control.css({"display":"block"}).stop().animate({"opacity":0.7},500,section_obj.ease,function(){
		$(this).find(">.txt").css({"display":"inline-block"}).stop().animate({"opacity":1},500,section_obj.ease).find(">span").css({"display":"inline-block"}).stop().animate({"opacity":1,"width":50+"px"},500,section_obj.ease);
	});
	section_obj.control.eq(section_obj.idx).stop().animate({"opacity":0},500,section_obj.ease,function(){
		$(this)	.css({"display":"none"});
		$(this).find(">.txt").css({"display":"none","opacity":0}).find(">span").css({"display":"none","opacity":0,"width":0});
	});
	
	if(dir == "helper"){
		section_obj.ul.li.eq(section_obj.save).stop().animate({"left":100+"%"},1000,section_obj.ease,function(){
			$(this).css({"display":"none"});	
		});
		section_obj.ul.li.eq(section_obj.idx).css({"left":-100+"%","display":"block"}).stop().animate({"left":0+"%"},1000,section_obj.ease,function(){
			section_obj.save = section_obj.idx;	
			resize (section_obj);
		});	
	} else if(dir == "infor"){
		section_obj.ul.li.eq(section_obj.save).stop().animate({"left":-100+"%"},1000,section_obj.ease,function(){
			$(this).css({"display":"none"});	
		});
		section_obj.ul.li.eq(section_obj.idx).css({"left":100+"%","display":"block"}).stop().animate({"left":0+"%"},1000,section_obj.ease,function(){
			section_obj.save = section_obj.idx;	
			resize (section_obj);
		});
	}		
}
function def (section_obj){
	section_obj.pointer.first().addClass("active");
	section_obj.ul.li.css({"left":100+"%","display":"none"}).eq(section_obj.save).css({"left":"0","display":"block"});	
}
function resize (section_obj){
	if($(".mob_btn").is(":visible")){
		var t = section_obj.ul.li.eq(section_obj.save).find(">div").innerHeight();
			section_obj.ul.css({"height":(t+55+$(".quick_link").height())+"px"});
			$(".quick_link").css({"top":(t+20)+"px"});	
	}
	$(window).resize(function(){
		if($(".mob_btn").is(":visible")){
			setTimeout(
				function(){
					var t = section_obj.ul.li.eq(section_obj.save).find(">div").innerHeight();
					section_obj.ul.css({"height":(t+55+$(".quick_link").height())+"px"});
					$(".quick_link").css({"top":(t+20)+"px"});	
				}
			, 500);
		}	
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_layerpop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_layerpop();
});
function js_layerpop (){
	var layerpop_obj = $("#layer_pop");
		layerpop_obj.btn = layerpop_obj.find(">.btn");
		layerpop_obj.box = layerpop_obj.find(">.box");  
		layerpop_obj.box.prev = layerpop_obj.box.find(">.control >.prev_btn"); 
		layerpop_obj.box.next = layerpop_obj.box.find(">.control >.next_btn"); 
		layerpop_obj.box.slider = layerpop_obj.box.find(">.slider >ul"); 
		layerpop_obj.box.slider.elem = layerpop_obj.box.slider.find(">li"); 
	var dir = ""; 	
	
	layerpop_obj.btn.find(">span>strong").text(layerpop_obj.box.slider.elem.size());
	if(layerpop_obj.box.slider.elem.size() <= 0){
		layerpop_obj.box.remove();	
	}
	
	layerpop_obj.btn.click(function(){
		if(layerpop_obj.box.slider.elem.size() <= 0) return false;
		if(layerpop_obj.box.is(":animated")) return false;
		if(!$(this).hasClass("on")){
			$(this).addClass("on").find(">span.txt").html("팝업닫기");
			$("#header").css({"z-index":151});
			layerpop_obj.box.show().stop().animate({"opacity":1},500,"easeInOutExpo");	
		} else {
			
			$(this).removeClass("on").find(">span.txt").html("팝업 <strong>"+layerpop_obj.box.slider.elem.size()+"</strong>건");
			layerpop_obj.box.stop().animate({"opacity":0},500,"easeInOutExpo",function(){
				$("#header").css({"z-index":990});
				$(this).hide();		
			});	
		}
		return false;	
	});	

	//팝업이 1개이상이면 자동으로 띄우기 
	if(layerpop_obj.box.slider.elem.size() >= 1){
		layerpop_obj.btn.addClass("on").find(">span.txt").html("팝업닫기");
		layerpop_obj.box.show().stop().animate({"opacity":1},500,"easeInOutExpo");	
	}
	
	
	layerpop_obj.box.prev.click(function(){
		layerpop_dir (layerpop_obj,"prev");
		return false;	
	});	
	
	layerpop_obj.box.next.click(function(){
		layerpop_dir (layerpop_obj,"next");
		return false;	
	});	 
}
function layerpop_dir (layerpop_obj,dir){
	if(layerpop_obj.box.slider.is(":animated")) return false;
	if(dir == "prev"){
		var elem_pos = layerpop_obj.box.slider.find(">li:eq(1)").position().left;  
		layerpop_obj.box.slider.stop().animate({"left":-elem_pos+"px"},600,"easeInOutExpo",function(){
			layerpop_obj.box.slider.css({"left":0});
			layerpop_obj.box.slider.find(">li").first().appendTo(layerpop_obj.box.slider);	 
		});
	} else if(dir == "next"){
		var elem_pos = layerpop_obj.box.slider.find(">li:eq(1)").position().left;  
		layerpop_obj.box.slider.css({"left":-elem_pos+"px"});
		layerpop_obj.box.slider.find(">li").last().prependTo(layerpop_obj.box.slider);
		layerpop_obj.box.slider.stop().animate({"left":0+"px"},600,"easeInOutExpo");	
	}
} 




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_banner Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_banner ();
});
function js_banner (){
	var banner_obj = $(".quick_link >.al_box");
		banner_obj.prev = banner_obj.find(">.prev_btn"); 
		banner_obj.next = banner_obj.find(">.next_btn"); 
		banner_obj.slider = banner_obj.find(">.move >ul"); 
		banner_obj.slider.elem = banner_obj.slider.find(">li"); 
	var dir = ""; 	
	var autoplay = "";
	
	
	////////////////////////////////////////////////
	var play_speed = 2000;//(1000:1초)	
	var paly_auto = "Y";//(Y,N)
	////////////////////////////////////////////////
	
	//roop
	function banner_dir(dir){
		if(banner_obj.slider.is(":animated")) return false;
		fn_stop();
		var elem_pos = banner_obj.slider.find(">li:eq(1)").position().left;
		if(dir == "prev"){
			banner_obj.slider.stop().animate({"left":-elem_pos+"px"},600,"easeInOutExpo",function(){
				banner_obj.slider.css({"left":0});
				banner_obj.slider.find(">li").first().appendTo(banner_obj.slider);
			});
		} else if(dir == "next"){
			banner_obj.slider.css({"left":-elem_pos+"px"});
			banner_obj.slider.find(">li").last().prependTo(banner_obj.slider);
			banner_obj.slider.stop().animate({"left":0+"px"},600,"easeInOutExpo");	
		}
	} 
	
	//def	
	function banner_def (){
		var elem_size = $(".quick_link .move").outerWidth();
		var win_size = $(document).width();
		
		if(win_size > 1063){
			$(".quick_link .move >ul >li").css({"width":elem_size/6+"px"});		
		} else if (win_size <= 1063 && win_size > 1006){
			$(".quick_link .move >ul >li").css({"width":elem_size/5+"px"});	
		} else if (win_size <= 1006 && win_size > 740){
			$(".quick_link .move >ul >li").css({"width":elem_size/4+"px"});	
		} else if (win_size <= 740 && win_size > 500){
			$(".quick_link .move >ul >li").css({"width":elem_size/3+"px"});	
		} else if (win_size <= 500){
			$(".quick_link .move >ul >li").css({"width":elem_size/2+"px"});	
		}
	}

	
	//controll
	function fn_play(){if(paly_auto == "Y"){autoplay = setTimeout(function(){banner_dir ("prev");},play_speed);}}//play
	function fn_stop(){clearTimeout(autoplay);}//stop
	
	//auto
	fn_play();
	
		
	banner_obj.prev.click(function(){banner_dir ("prev");return false;});//prev
	banner_obj.next.click(function(){banner_dir ("next");return false;});//next
	
	//mouse
	banner_obj.mouseenter(function(){fn_stop();});	
	banner_obj.mouseleave(function(){fn_play();});	
	
	//resize
	banner_def ();	
	$(window).resize(function(){banner_def ();}); 
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	이미지 맵(반응형)

	ex)
	$('img[usemap]').rwdImageMaps();

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('img[usemap]').rwdImageMaps();
});
