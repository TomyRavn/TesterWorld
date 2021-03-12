function checklogin(frm) {
	if( !frm.agree01.checked ) {
		alert("회원가입약관을 반드시 읽어보시고 '동의'해주세요.");
		return false;
	}

	if( !frm.agree02.checked ) {
		alert("개인정보취급방침 및 이용약관을 반드시 읽어보시고 '동의'해주세요.");
		return false;
	}
	document.join_provision_form.action = "/_prog/_member/index.php?mode=W&site_dvs_cd=kr";
	document.join_provision_form.submit();
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_gnb Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#gnb").size() != 0){
		js_gnb();
	}
});
function js_gnb (){
	var res = "";
	var param = $("#gnb");
		param.nav = param.find(">.al_box> #nav");
		param.nav.ul = param.nav.find(">ul"); 
		param.nav.ul.li = param.nav.ul.find(">li"); 
		param.nav.ul.li.a = param.nav.ul.li.find(">a"); 
		param.nav.ul.li.dep2 = param.nav.ul.li.find(">.depth2"); 
		param.nav.ul.li.dep2.ul = param.nav.ul.li.dep2.find(">ul"); 
		param.nav.ul.li.dep2.ul.li = param.nav.ul.li.dep2.ul.find(">li"); 
		param.nav.ul.li.dep2.ul.li.a = param.nav.ul.li.dep2.ul.li.find(">a");
		param.nav.ul.li.dep2.ul.li.ul = param.nav.ul.li.dep2.ul.li.find(">ul");
		param.blind = param.find(">#blind");
		param.blind.hei = "436";
		
	//default
	/*
	param.nav.ul.li.dep2.each(function(e){
		$(this).addClass("num"+(e+1)).prepend("<h2>"+ $(this).siblings("a").text() +"</h2>");
	});
	*/	
	if(!$(".mob_btn").is(":hidden")) res = "mob";
	else res = "web";
	param.attr("class",res);		
	gnb_def(param);
	$(window).resize(function(){
		if(!$(".mob_btn").is(":hidden")) res2 = "mob";
		else res2 = "web";
		param.attr("class",res2);		
		if(res != res2){
			gnb_def(param);
			res = res2;
		}
	});
	
	//web
	param.nav.ul.li.a.mouseover(function(){
		if(param.attr("class") == "web"){
			param.nav.ul.li.a.removeClass("ov");
			$(this).addClass("ov");
			param.nav.ul.li.dep2.ul.removeClass("ov");
			$(this).siblings(".depth2").find(">ul").addClass("ov");	
			param.nav.ul.li.dep2.show();
			
			param.maxH = 0;
			for(var i=0; i<param.nav.ul.li.size(); i++){
				param.maxH = Math.max(param.maxH,param.nav.ul.li.eq(i).find(">.depth2 >ul").removeAttr("style").innerHeight());
			}
			param.nav.ul.li.dep2.ul.innerHeight(param.maxH);
			param.nav.ul.li.dep2.show().stop().animate({"height":param.maxH +"px"},500,"easeOutCubic"); 
			param.blind.show().stop().animate({"height":param.maxH +"px"},500,"easeOutCubic");		 		
		}
	});
	param.nav.ul.mouseleave(function(){
		if (param.attr("class") == "web") {
			gnb_def(param);
		}	
	});
	param.nav.ul.li.a.focus(function(){
		if (param.attr("class") == "web") {
			$(this).mouseover();
		}
	});
	param.nav.ul.li.dep2.ul.mouseenter(function(){
		if(param.attr("class") == "web"){
			param.nav.ul.li.a.removeClass("ov");
			$(this).parent().parent().find(">a").addClass("ov");
			param.nav.ul.li.dep2.ul.removeClass("ov");
			$(this).addClass("ov");		
		}
	});
	param.nav.ul.li.dep2.ul.li.a.mouseover(function(){
		if(param.attr("class") == "web"){
			param.nav.ul.li.a.removeClass("ov");
			$(this).parent().parent().parent().siblings("a").addClass("ov");		 		
		}
	});
	param.nav.ul.li.dep2.ul.li.last().find(">a").blur(function(){
		if (param.attr("class") == "web") {
			param.nav.ul.mouseleave();
		}
	});	
	
	
	//web
	$(".mob_btn").click(function(){
		if(!$(".mob_btn").hasClass("ov")){
			$(this).addClass("ov");
			var m_gnbHei = $("#wrap").outerHeight(); 
			param.css({"height":m_gnbHei+"px","display":"block"});	
			$("#wrap > *").stop().animate({"left":220},300,"easeOutCubic");
			$("#shadow").fadeIn(300,"easeOutCubic");		
		} else {
			$(this).removeClass("ov");
			$("#wrap>*").stop().animate({"left":0},300,"easeOutCubic",function(){
				param.css({"height":"auto","display":"none"});			
			});
			$("#shadow").fadeOut(300,"easeOutCubic");	
		}
		return false;	
	});
	param.nav.ul.li.a.click(function(){
		if(param.nav.ul.li.dep2.ul.is(":animated")) return false;
		if(param.attr("class") == "mob"){
			param.nav.ul.li.dep2.ul.css({"height":"auto"});
			param.nav.ul.li.a.not($(this)).removeClass("ov").siblings(".depth2").find(">ul").slideUp(300);
			$(this).toggleClass("ov").siblings(".depth2").find(">ul").slideToggle(300);
			return false;
		} else if (param.attr("class") == "web") {
			return true;	
		}	
	});	
	param.nav.ul.li.dep2.ul.li.a.click(function(){
		if(param.attr("class") == "mob"){
			if(param.nav.ul.li.dep2.ul.li.ul.is(":animated")) return false;
			if($(this).next().size() != 0){
				param.nav.ul.li.dep2.ul.li.a.not(this).removeClass("ov").next().slideUp();
				$(this).toggleClass("ov").next().slideToggle();	
				return false;
			} else {
				return true;	
			}
		}
	});	
	$("#shadow").click(function(){
		$(".mob_btn").removeClass("ov");
		$("#wrap>*").stop().animate({"left":0},300,"easeOutCubic",function(){
			param.css({"height":"auto","display":"none"});			
		});
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
			$("#wrap > *").stop().animate({"left":0},300,"easeOutCubic");
			$("#shadow").fadeOut(300,"easeOutCubic");
		}
	});
	param.nav.ul.li.a.bind("click",function(e){
		if (Modernizr.touch) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
}
function gnb_def(param){
	if(param.attr("class") == "web"){
		param.nav.ul.li.dep2.ul.removeClass("ov");
		param.nav.ul.li.a.removeClass("ov");
		param.nav.ul.li.dep2.ul.li.a.removeClass("ov");
		param.nav.ul.li.dep2.stop().animate({"height":0},500,"easeOutCubic",function(){$(this).hide();});
		param.nav.ul.li.dep2.ul.li.ul.hide();
		param.blind.stop().animate({"height":0},500,"easeOutCubic",function(){$(this).hide();});
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_lnb Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#lnb").size() != 0){
		js_lnb();
	}
});
function js_lnb(){
	var lnb_obj = $("#lnb");
		lnb_obj.hide = lnb_obj.find("ul");
		lnb_obj.show = lnb_obj.find(">li >a.ov").siblings("ul");
		lnb_obj.btn = lnb_obj.find(">li >a");
		lnb_obj.interval = "";
		lnb_obj.idx = lnb_obj.find(">li >a.ov").parent().index();

	//def
	lnb_obj.hide.hide()
	lnb_obj.show.slideDown(300);
	lnb_obj.hide.each(function(){
		if($(this).size() != 0){
			$(this).siblings("a").append("<span class='ico'></span>")
		}
	});
	
	lnb_obj.btn.click(function(){
		if($(this).next().size() == 1){
			if($(this).next().is(":hidden")){
				lnb_obj.btn.removeClass("ov").next().slideUp(300);
				if($(this).parent().find(">ul").is(":hidden")){
					$(this).addClass("ov");
					$(this).next().slideDown(300);
				} else {
					$(this).next().slideUp(300);
				}		
			}
			return false;
		} else {
			return true;
		}			
	});
	
	lnb_obj.mouseleave(function(){
		if(lnb_obj.show.is(":visible")) return false;
		lnb_obj.interval = setTimeout(function(){
			lnb_obj.btn.parent().eq(lnb_obj.idx).find(">a").addClass("ov");
			lnb_obj.hide.slideUp(300).prev().removeClass("ov")
			lnb_obj.show.slideDown(300).prev().addClass("ov");
		},500);
	});
	
	lnb_obj.mouseenter(function(){
		clearTimeout(lnb_obj.interval);
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	gong_u Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".gong_u").size() != 0){
		gong_u_AC();
	}
});

function gong_u_AC(){
	var gong_u_obj = $(".path_etc >ul >li");
		gong_u_obj.btn = gong_u_obj.find(">.gong_u"); 
		gong_u_obj.sns = gong_u_obj.find(">.sns_box");
		
	gong_u_obj.btn.click(function(){
		if(gong_u_obj.sns.find(">ul >li").is(":animated")) return false;
		
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			gong_u_obj.sns.show();
			gong_u_obj.sns.find(">ul >li.btn_t").show().stop().animate({"opacity":1,"top":39+"px"},300);
			gong_u_obj.sns.find(">ul >li.btn_f").show().stop().animate({"opacity":1,"top":78+"px"},300);
			gong_u_obj.sns.find(">ul >li.btn_b").show().stop().animate({"opacity":1,"top":117+"px"},300);
		} else {
			$(this).removeClass("on");
			gong_u_obj.sns.stop().delay(300).animate({"display":"none"},0);
			gong_u_obj.sns.find(">ul >li.btn_t").stop().animate({"opacity":0,"top":0+"px"},300,function(){$(this).hide();});
			gong_u_obj.sns.find(">ul >li.btn_f").stop().animate({"opacity":0,"top":0+"px"},300,function(){$(this).hide();});
			gong_u_obj.sns.find(">ul >li.btn_b").stop().animate({"opacity":0,"top":0+"px"},300,function(){$(this).hide();});	
		}
		return false;	
	});	
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	INPUT AUTO VAL Function
	
	ex)
	<input type="text" value="" class="js_input_val" title="검색어를 입력하세요" />

	ㆍ기본표현되는 텍스트는 title="" 의 값으로 합니다.
	ㆍ실행은 class="js_input_val" 클래스로 실행됩니다.

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	input_val_AC();
});
function input_val_AC(){
	var inputs = $(".js_input_val");
	for(var i=0; i<inputs.size(); i++){
		if(!inputs.eq(i).val()){
			inputs.titles = inputs.eq(i).attr("title");
			inputs.eq(i).val(inputs.titles);
		}
	}
	
	inputs.siblings("input[type=image], input[type=submit], input[type=button] , a").click(function(){
		var obj = $(this).siblings("input[type=text]"); 
		var v = obj.val();
		var t = obj.attr("title");
		
		if(v == t){
			obj.val("");			
		}
	});

	inputs.on("focus",function(){
		var t = $(this).attr("title");
		var v = $(this).val();

		if(t == v || v == ""){
			$(this).val("");
		}
	});
	inputs.on("blur",function(){
		var t = $(this).attr("title");
		var v = $(this).val();

		if(v == ""){
			$(this).val(t);
		}
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_scrollTop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_scrollTop ();
});
function js_scrollTop (){
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $("#header").height();
		
		if (winTop > headerTop) {
			$(".floating_top").fadeIn(300,"easeOutCubic");
		} else if (winTop <= headerTop) {
			$(".floating_top").fadeOut(300,"easeOutCubic");
		}
	});	
	$(".floating_top a").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},600,"easeOutCubic");
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	viewPdfjs Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function viewPdfjs(n) {
	var objDoc = $(".pdf_iframe").get(0).contentWindow;
	objDoc.PDFView.page = n;
}
function pdf_set_AC(){
	$(".pdf_viewer > ul > li > a").click(function(){
		$(".pdf_viewer > ul > li > a.ov").removeClass("ov");
		$(this).addClass("ov");
		return false;
	});
}
function pdf_view_AC(){
	var obj = $(".pdf_iframe");
		obj.interval = "";
	var objDoc = $(".pdf_iframe").get(0).contentWindow;
	var num = $(".pdf_viewer > .tab").height();


	obj.height(num);
	$(".pdf_viewer").height(num);

	obj.interval = setInterval(function(){
		var ob = obj.contents().find("#pageContainer1");
		if($.trim(ob.text()) != ""){		
			clearInterval(obj.interval);
			obj.contents().find(" #pageAutoOption").click();
			ob = obj.contents().find("#pageContainer1");
			var h = ob.height() + 50;
			
			obj.css({"height":h+"px"});
		}
	},10);

	$(objDoc).resize(function(){
		var obj = $(".pdf_iframe");
		var h = obj.contents().find("#pageContainer1").height() + 50;
		
		obj.css({"height":h+"px"});
		if(num < h){
			$(".pdf_viewer").height(h);
		}

		if($(".pdf_viewer > .tab").is(":hidden")){
			obj.height(h);
			$(".pdf_viewer").height(h);
		}
	});

}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	footer_relate Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_relate ();
});

function js_relate (){
	var relate_obj = $(".relate_site >div");	
		relate_obj.btn = relate_obj.find(">.button");
		
	relate_obj.btn.click(function(){
		if($(this).siblings("ul").is(":animated")) return false;	
		
		if($(this).siblings("ul").is(":hidden")){
			$(this).toggleClass("on").siblings("ul").stop().slideDown(300);		
		} else {
			$(this).toggleClass("on").siblings("ul").stop().slideUp(300);	
		}
		relate_obj.btn.not($(this)).removeClass("on").siblings("ul").stop().slideUp(300);
		return false;	
	});
	
	relate_obj.find(">ul").mouseleave(function(){
		$(this).stop().slideUp(300).siblings(".button").removeClass("on");
	});	
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_cal Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$(".scroll").mCustomScrollbar({
		theme:"light"
	});
	js_cal ();
});
function js_cal (){
	var cal_obj = $(".ipsi_calendar td");
		cal_obj.openbtn = cal_obj.find(">.more_btn");
		cal_obj.closebtn = cal_obj.find(">.layer_more >.box >.close_btn"); 
	
	$('<span class="blind"></span>').insertAfter($(".layer_more >.box"));
	//$(".cal_cate").clone(false).insertAfter($(".layer_more .title"));
	$(".mregend").html($(".top_regend .cal_cate").clone(false))	

	cal_obj.openbtn.click(function(){
		$("#footer").css({"z-index":5});	
		cal_obj.openbtn.not($(this)).siblings(".layer_more").hide();
		$(this).siblings(".layer_more").show();
		var hei = $(window).height();
		$("#wrap").css({"height":hei, "overflow":"hidden"});
		return false;
	});
	
	cal_obj.closebtn.click(function(){
		$("#footer").css({"z-index":201});	
		$(this).parent().parent().hide();
		$("#wrap").removeAttr("style");
		return false;	
	});
	
	$(window).resize(function(){
		if($(".mob_btn").is(":visible")){
			if($(".layer_more").is(":visible")){
				var hei = $(window).height();
				$("#wrap").css({"height":hei, "overflow":"hidden"});			
			}
		}
	});	
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Slide Script

	ex)
	null : 옆으로 흐르는 배너 형태
	type_02 : 팝업존 형태
	type_03 : 비쥬얼 형태
	type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_slide").size() != 0){
		slide_AC();
	}
});

function slide_AC(){
	var slide = $(".js_slide");

	for(var i=0; i<slide.size(); i++){
		if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
		else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
		else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
		else slide_type_01(slide.eq(i));//배너
	}
}

function slide_type_01(slide){
	//배너
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");

				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}

}

function slide_type_02(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;

		var w = -100;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,function(){
			});

			w = 0;

			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).stop().animate({"left":"0"},slide.speeds,function(){
				slide.li.eq(0).appendTo(slide.ul);
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//심볼
	$("<ul></ul>").prependTo(slide.controls);
	for(var i=0; i<slide.li.size(); i++){
		$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">a").addClass("on");

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	//버튼 : 재생
	slide.btn_play.click(function(){
		slide.btn_play.hide();
		slide.btn_stop.css("display","inline-block");
		slide.autos = "Y";
		slide.times = setTimeout(function(){
			movement("right");
		},slide.times_speeds);
		return false;
	});

	//버튼 : 정지
	slide.btn_stop.click(function(){
		slide.btn_stop.hide();
		slide.btn_play.css("display","inline-block");
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});

	//버튼 : 심볼
	slide.simbols.find(">a").click(function(){
		if($(this).hasClass("on")) return false;
		var idx = slide.simbols.index($(this).parent());
		slide.btn_stop.click();
		movement(idx);
		return false;
	});

	//자동재생
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");

		var olds = 0;
		var news = 0;

		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;

			if(news >= slide.li.size()) news = 0;
		} else if(ty == "left"){
			//이전
			olds = slide.nums;
			news = slide.nums - 1;

			if(news < 1) news = slide.li.size();
		} else {
			//심볼클릭
			olds = slide.nums;
			news = ty+1;
			if(news >= slide.li.size()) news = 0;
		}

		if(slide.li.eq(news-1).is(":animated")) return false;

		slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}

function slide_type_04(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(">.btn_left");
	slide.btn_right = slide.controls.find(">.btn_right");
	slide.btn_play = slide.controls.find(">.btn_play");
	slide.btn_stop = slide.controls.find(">.btn_stop");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 500;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//view
	//slide_view
	var setNum = $(".js_slide").index(slide);
	slide.attr("id","slide_view_"+setNum);
	$('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
	views(0,$(".slide_view_"+setNum));

	//제어
	if(slide.li.size() < 2){
		slide.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		slide.btn_stop.click();
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		slide.btn_stop.click();
		movement("left");
		return false;
	});

	slide.li.find(">a").click(function(){
		var idx = slide.li.index($(this).parent());
		var cl = $(this).parents(".js_slide").attr("id");

		views(idx,$("."+cl));
		return false;
	});

	//view
	function views(idx,obj){
		var idx = idx;
		var titles = slide.li.eq(idx).find(">a").attr("title");
		var imgs = slide.li.eq(idx).find(">a img")[0].src;
		var alts = slide.li.eq(idx).find(">a img").attr("alt");

		slide.li.find(">a.on").removeClass("on");
		slide.li.eq(idx).find(">a").addClass("on");
		obj.find(" img").attr("src",imgs);
		obj.find(" img").attr("alt",alts);
		if(titles){
			obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
		} else {
			obj.find(" span").html(alts);
		}
	}

	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;

		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");

			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}

		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	탭 셀렉트변환 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tab").size() != 0){
		tab_mobile();
		$(window).resize(function(){tab_mobile();});
	}
});
function tab_mobile(){
	var b = $(window).width();
	var tab = $(".js_tab");
		tab.ul = tab.find(">ul");
		tab.li = tab.find(">ul>li");
		tab.on = tab.find(">ul>li.on");
		tab.a = tab.li.find(">a");
	
	
	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
		tab.ti = tab.find(">.title");
		
	tab.ti.html(tab.on.find(">a").clone());
		
		tab.btn = tab.ti.find(">a");
	
	
	tab.btn.click(function(){
		if(tab.ul.is(":hidden")){
			$(this).addClass("on");
			tab.ul.slideDown(200);
		} else {
			$(this).removeClass("on");
			tab.ul.slideUp(200);
		}
		return false;
	});

	tab.a.click(function(){
		if(tab.hasClass("select")){
			tab.ul.slideUp(200);
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			tab.on = tab.find(">ul>li.on");
			tab_mobile_set(tab);
			if(tab.hasClass("onepage")){
				$(".tab_onepage").removeClass("on");
				var idx = $(this).attr("href").substring(5, 8);
				$(".tab_onepage#tab0"+idx).addClass("on");
				return false;		
			}
		} else if(tab.hasClass("onepage")){
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			$(".tab_onepage").removeClass("on");
			var idx = $(this).attr("href").substring(5, 8);
			$(".tab_onepage#tab0"+idx).addClass("on");
			return false;
		}
	});
		
	if($(".mob_btn").is(":visible")){	
		//if(tab.hasClass("select")) return false;
		//tab.addClass("select");		
	} else {
		if(!tab.hasClass("select")) return false;
		tab.removeClass("select");
		tab.ul.removeAttr("style");
	}
	
}
