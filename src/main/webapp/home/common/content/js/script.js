$(function(){

	//lnb();
	mobileMenu();

	//select_bar 

	
	$('.selectbox select').each(function(){
		var select_name = $(this).children('option:selected').text();
		$(this).siblings('label').text(select_name);
	})
	

	var selectTarget = $('.selectbox select');
	 selectTarget.click(function(){
		 $(this).parent().addClass('on');
	});

	selectTarget.focusout(function(){
		 $('.selectbox').removeClass('on');
	});

	

	selectTarget.change(function(){
		var select_name = $(this).children('option:selected').text();
		$(this).siblings('label').text(select_name);
		
	});






	

});





function lnb(){

	var gnb_obj = $(".web #nav >  ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#nav"); 
		gnb_obj.blind = $("#header > .nav_bg"); 

	setTimeout(function(){gnb_close();},100);


	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_close(gnb_obj);
		},300);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});


	gnb_obj.li.ul.mouseenter(function(){
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	


	function gnb_close(){
		gnb_obj.li.find(">a").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":80+"px"},300);
		gnb_obj.blind.stop().animate({"height":0+"px"},300);
	}
	
	function gnb_open(idx){
		gnb_obj.li.find(">a").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");
		gnb_obj.li.find(">ul").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.li.ul.height(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":300+"px"},300);
		gnb_obj.blind.stop().animate({"height":220+"px"},300);
	}






}



function mobileMenu() {
	//모바일 	
	var param =  $(".mobile_nav_box");
		param.nav = $(".al_box> #mnav");
		param.nav.ul = param.nav.find(">ul"); 
		param.nav.ul.li = param.nav.ul.find(">li"); 
		param.nav.ul.li.a = param.nav.ul.li.find(">a"); 
		param.nav.ul.li.dep2 = param.nav.ul.li.find(">.ul"); 
		param.nav.ul.li.dep2.ul = param.nav.ul.li.dep2.find(">ul"); 
		param.nav.ul.li.dep2.ul.li = param.nav.ul.li.dep2.ul.find(">li"); 
		param.nav.ul.li.dep2.ul.li.a = param.nav.ul.li.dep2.ul.li.find(">a");
		param.nav.ul.li.dep2.ul.li.ul = param.nav.ul.li.dep2.ul.li.find(">ul");


	// mobile
	$(".btn_menu_open").click(function(){
		//var m_gnbHei = $("#wrap").outerHeight(); 
		var m_gnbHei = $(window).outerHeight(); 
		//$(".mobile_nav_box").css({"height":m_gnbHei+"px","display":"block"});	
		$(".mobile_nav_box").css({"display":"block"});	
		$("body").css({"overflow":"hidden", "position":"fixed"});	
		$(".mobile .al_box").css({"height":m_gnbHei-180,"overflow-y":'auto'});
		$("#shadow").fadeIn(300,"easeOutCubic");		
		return false;	
	});

	param.nav.ul.li.a.click(function(){
		if(param.nav.ul.li.dep2.ul.is(":animated")) return false;
		param.nav.ul.li.dep2.ul.css({"height":"auto"});
		param.nav.ul.li.a.not($(this)).removeClass("ov");

		//param.nav.ul.li.a.not($(this)).next().slideUp(300);
		//$(this).toggleClass("ov").next().slideToggle(300);
		//return false;

		
		
	});	

	$("#shadow, .btn_menu_close").click(function(){
		$(".mob_btn").removeClass("ov");
		$("body").css({"overflow":"", "position":"static"});
		$(".mobile_nav_box").css({"display":"none"});

		$("#shadow").fadeOut(300,"easeOutCubic");
		return false;	
	});


	$(window).resize(function() {
		if(param.attr("class") == "mob"){
			if($(".mob_btn").hasClass("ov")){
				var m_gnbHei = $("#wrap").outerHeight();
				param.css({"height":m_gnbHei+"px"});		
			} else {
				$("#shadow").fadeOut(300,"easeOutCubic");
			}
		} else if (param.attr("class") == "web") {
			param.nav.ul.li.dep2.ul.removeAttr("style");
			$(".mob_btn").removeClass("ov");	
			$("#shadow").fadeOut(300,"easeOutCubic");
		}
		$("body").css({"overflow":"", "position":"static"});	
	});
	param.nav.ul.li.a.bind("click",function(e){
		if (Modernizr.touch) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
}






function ShareLayer(e, link){

		var offset = $(e).offset();
		var ly_left = offset.left+(-20);
		var ly_top = offset.top+35;

		
		if(link){
			$('.share_list ul').empty();
			$('.share_list ul').html("<li><a href='#link' class='btn_t' onclick='twitterOpen(\""+link+"\"); return false;'><span></span></a></li><li><a href='#link' class='btn_f' onclick='facebookOpen(\""+link+"\"); return false;'><span></span></a></li><li><a href='#link' class='btn_b' onclick='blogOpen(\""+link+"\"); return false;'><span></span></a></li>");
		}
		
		$('.share_box').css({
			display:'block',
			top:ly_top,
			left:ly_left
		})

	


	$('.share_box .btn_close').click(function(){
		$('.share_box').hide();
	})
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



