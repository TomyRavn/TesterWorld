$(document).ready(function() {
	gnb(); // GNB Menu
	mobileMenu(); // Mobile GNB 
	mobile_slide(); // Mobile Slide
	tm_slide(); // Top Util
	agencies_slide(); // Agencies
	navi_toggle(); // 로케이션 토글메뉴	
});


// GNB Menu
function gnb (){
	var gnb = $("#gnb").find(">ul");
		gnb.li = gnb.find(">li");
		gnb.li.a = gnb.li.find(">a");
		gnb.li.ul = gnb.li.find(">ul");
		gnb.li.ul.li = gnb.li.ul.find(">li");
		gnb.li.ul.li.a = gnb.li.ul.li.find(">a");
		gnb_bg = $(".gnb_bg");
		
	gnb.li.a.bind("mouseover",function(e){
		var idx = gnb.li.a.index($(this));
		var gnb_bg_hei = gnb.li.ul.eq(idx).innerHeight();
		
		gnb.li.ul.hide();
		gnb.li.ul.eq(idx).show(0);
		gnb.li.a.removeClass("_ov");
		$(this).addClass("_ov");
		//gnb.li.ul.innerHeight(gnb_bg_hei);
		gnb_bg.stop().innerHeight(gnb_bg_hei).show(0);
		
		var asas = $(this).parent().find(">ul").size();
		if(asas == 0){
			gnb_bg.hide();	
		}
		//return false;
	});

	gnb.li.a.bind("click",function(e){
		if (Modernizr.touch) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	gnb.mouseleave(function(){
		gnb.li.ul.hide();
		gnb_bg.height(0).hide();
		gnb.li.a.removeClass("_ov");
		return false;
	});		 
	
	gnb.li.a.focus(function(){
		$(this).mouseover();
		return false;
	 });	 
	
	gnb.li.a.bind("touchend",function(e){
		e.preventDefault();
		e.stopPropagation();
	}); 
	
}


function mobileMenu(){
	$(".depth1 h2").click(function(e){
		e.preventDefault();
		$(".depth1 h2").not(this).removeClass("on").next().slideUp();
		$(this).toggleClass("on").next().slideToggle();
		$(".depth2 h3").not(this).next().slideUp();
	});
	
	$(".depth2 h3").click(function(e){
		//e.preventDefault();
		if($(this).next().length != 0){
			e.preventDefault();
			$(".depth2 h3").not(this).next().slideUp();
			$(this).next().slideToggle();	
		}
	});
}


function mobile_slide(a,b,c){
	//alert('mobile_slide');
	$("#rwd_header .rwd_gnb_btn > a").click(function(){
		alert('b');
		var wrapHeight = $("#wrapper").outerHeight();  
		
		alert('c' + wrapHeight);
		
		$(".mobile_gnb").css("height" , wrapHeight);
		
//		alert(      $("#wrapper > *").css("left")   + " || " + parseInt($("#wrapper > *").css("left") )   );
		
		$("#wrapper>*").animate({"position":"relative" , "left":"173px"},300);
		
		alert('d')
		
		if(parseInt($("#wrapper > *").css("left")) != 0){
			
			alert('vvvvv')
			$("#wrapper > *").animate({"left":"0px"},300,function(){
				$(".depth1").find(".on").removeClass("on");
				$(".depth2, .depth3").hide();
				$(".depth1>li").eq(a-1).find("h2").addClass("on").next().show().children("li").eq(b-1).find(".depth3").show().children("li").eq(c-1).addClass("on");
			});
		}
		return false;
	});
	
	///rwd_gnb_init()
	
	//mobile_height(); // 모바일 높이
}


function rwd_gnb_init(event) {
   var evtObject = document.getElementById("rwd_gnb_link1");
   
   if (evtObject.addEventListener) {
      evtObject.addEventListener("click", handler, false);
   } else if (evtObject.attachEvent) {
      evtObject.attachEvent("onclick", handler);
   } else if (evtObject.onclick) {
      evtObject.onclick = handler;
   }
}

// 이벤트 핸들러
function handler(event) {
   // 이벤트 처리 코드
	var wrapHeight = $("#wrapper").outerHeight();  
	
	alert('a' + wrapHeight);
	
	//alert('c' + wrapHeight);
	
	$(".mobile_gnb").css("height" , wrapHeight);
	$("#wrapper>*").animate({"left":"173px"},300);
	if(parseInt($("#wrapper>*").css("left")) != 0){
		$("#wrapper>*").animate({"left":"0px"},300,function(){
			$(".depth1").find(".on").removeClass("on");
			$(".depth2, .depth3").hide();
			$(".depth1>li").eq(a-1).find("h2").addClass("on").next().show().children("li").eq(b-1).find(".depth3").show().children("li").eq(c-1).addClass("on");
		});
	}
}



// 모바일 높이
/*
function mobile_height(){
	var toputil_height = $(".toputil_wrap").height();
	$('.mobile_gnb').css({"top" : -toputil_height + "px"});
}
*/	


// Resize
$(window).resize(function(){	
	$("#wrapper>*").css("left","0");
	//mobile_height();
});



// Top Util
var tm = null;
function tm_slide(){
	var tm_menu = $(".tm_tab");
		tm_menu.dt = tm_menu.find("> dt");
		tm_menu.dt.a = tm_menu.dt.find("> a");
		tm_menu.dd = tm_menu.find("> dd");
		tm_menu.dd.btn = tm_menu.dd.find(">.close_btn");
		tm_tabbg = $(".tm_tabbg");
			
	tm_menu.dt.a.click(function(){
		var cnt = tm_menu.dt.a.index($(this));
		var bg_height = tm_menu.dd.eq(cnt).height() + 20;

		if(cnt != tm){
			tm_menu.dt.a.css({"font-weight":"normal"});
			$(this).css({"font-weight":"600"});
			tm_menu.dd.hide();
			if(cnt == 0){
				tm_tabbg.css({"background":"#1e75bc"});
			} else if(cnt == 1){
				tm_tabbg.css({"background":"#7da61f"});
			} else{
				tm_tabbg.css({"background":"#5f5f5f"});
			}
			tm_menu.dd.eq(cnt).fadeIn(400);
			tm_tabbg.css({"display":"block"}).stop().animate({"height" : bg_height + "px"},200);
			
			$(window).resize(function(){
				var bg_height = tm_menu.dd.eq(cnt).height() + 20;
				tm_tabbg.css({"display":"block"}).stop().animate({"height" : bg_height + "px"},100);
			});

			tm = cnt;
		}
		return false;	
	});
	
	tm_menu.dd.btn.click(function(){
		tm_tabbg.stop().animate({"height" : 0 + "px"},300,function(){
			$(this).css({"display":"none"});	
		});
		$(window).resize(function(){
			tm_tabbg.stop().animate({"height" : 0 + "px"},300,function(){
				$(this).css({"display":"none"});	
			});
		});
		tm_menu.dd.hide();
		tm_menu.dt.a.css({"font-weight":"normal"});
		
		
		tm = null;
		return false;		
	});
};


// Agencies
function agencies_slide(){
	var agencies_btn = $(".agencies_btn  > span").find(">a");
		agencies_view = $(".agencies_view");
		agencies_view.btn = $(".agencies_view").find(">.close_btn");	
		
	agencies_btn.click(function(){
		
		agencies_view.slideDown(300,function(){
			agencies_view.btn.fadeIn(100);
		});
		
	});	

	agencies_view.btn.click(function(){
		$(this).fadeOut(100);
		agencies_view.slideUp(200);
	});
};


// 로케이션 토글메뉴
function navi_toggle(){
	var navi = $(".navi > ul");
		navi.li = navi.find(">li");
		navi.li.a = navi.li.find(">a");
	
	navi_ac(navi);
	$(window).resize(function(){
		navi_ac(navi);
	});	
}

function navi_ac(navi){
	var navi_wid = $(".location").width();	
	if(navi_wid < 990){	
		navi.li.last().attr("class","last");
		navi.find(">li.last > a").click(function(e){
			e.preventDefault();
			navi.li.a.next().slideDown(200).parent().find("> a").addClass("ov");
		});
		navi.mouseleave(function() {
			navi.li.a.removeClass("ov");
			$(".toggle_menu").slideUp();
		});
	} else {
		navi.li.last().attr("class","");
		navi.find(">li > a").unbind();
	}
}