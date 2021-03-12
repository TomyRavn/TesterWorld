var oneNum = -1;

$(document).ready(function(){
	gnb(); //GNB메뉴
	mobile_menu(); //모바일 GNB메뉴
})

//GNB메뉴
function gnb(){
	if(oneNum != -1) activeSub();
	$("#gnb>ul").children("li").each(function(){
		$(this).mouseenter(function(){
			if(oneNum != -1) {
				$("#gnb>ul").children("li").eq(oneNum).removeClass("on");
			}
			$(".gnb_layout").stop().animate({height:307}, 400, "easeOutCubic");
			$(this).addClass("on");
			
			/* 2뎁스메뉴가 없을때
			var idx = $(".gnb>ul>li").index($(this));
			var cnt  = $(".gnb>ul").children("li").eq(idx).find(">ul").size();
			if(cnt == 0){
				$(".gnb_layout").stop().animate({height:41}, 400, "easeOutCubic");	
			}
			*/
		})
		
		.focusin(function(){
			$(this).mouseenter();
		})

		$(this).mouseleave(function(){
			$(this).removeClass("on");
			$(".gnb_layout").stop().animate({height:42}, 400, "easeOutCubic");
			if(oneNum != -1) {
				activeSub()
			}
		})
		
		.focusout(function(){
			$(this).mouseleave();
		})
	})
}

function activeSub(){
	$("#gnb>ul").children("li").eq(oneNum).addClass("on");
}




//모바일 GNB메뉴
function mobile_menu(){
	var mob_gnb = $("#mob_gnb>ul");
	mob_gnb.li = mob_gnb.find(">li");
	mob_gnb.li.a = mob_gnb.li.find(">a");
	mob_gnb.li.ul = mob_gnb.li.find(">ul");
	mob_gnb.li.ul.li = mob_gnb.li.ul.find(">li");
	mob_gnb.li.ul.li.a = mob_gnb.li.ul.li.find(">a");
	
	mob_gnb.hide();	
	mob_gnb.li.ul.hide();
	$(".mob_gnb_btn>a").click(function(){
		mob_gnb.toggle();		
	});
	
	$(window).resize(function(){
		mob_gnb.hide();	
	})
	
	mob_gnb.li.a.click(function(e){
		var idx = mob_gnb.li.a.index($(this));
		var cnt  = mob_gnb.li.eq(idx).find(">ul").size();	
		e.preventDefault();
		mob_gnb.li.a.not(this).removeClass('ov').next().slideUp();
		$(this).toggleClass('ov').next().slideToggle();
		mob_gnb.li.ul.not(this).next().slideUp();
	});
	
	mob_gnb.li.ul.li.a.click(function(e){
		e.preventDefault();
		if($(this).next().length != 0){
			e.preventDefault();
			mob_gnb.li.ul.li.a.not(this).next().slideUp();
			$(this).next().slideToggle();	
		}
	});
};