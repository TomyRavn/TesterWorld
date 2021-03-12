function viewer_board(param,btn,target,fadein,itemsURL){
	var param = $(param);
	var btn = param.find(btn);
	var str_bg = "<div id='blackout'></div>"
	var str_layer = "<div id='imgLayer' style='display:none;tabindex:0'></div>";

	var target = $(target);

	var w = 0;
	var h = 0;
	
	var himg = 0;
	var wimg = 0;
	var hgap = 0;
	var wgap = 0;

	var itemsAttr;
	var itemsSTR = new Array();
	var itemsRESELT;

	var summary;

	var elem = 0;
	target.prepend(str_bg);

	// 오브젝트 액션
	btn.click(function(){
		var t = $(this);
		var elem = t.parent().index();

		target.prepend(str_layer);
		
		var src = t.attr("href");
		var layer = $("#imgLayer");	
		var bg = $("#layerGround");
		var blackout = $("#blackout");
		var view_title = t.find(".title").text();
		var view_date = t.find(".date").text();

		itemsAttr = t.parent().find("input.images").val();
		itemsAttr = itemsAttr.split(",");
		itemsAttr = $.grep(itemsAttr,function(item){return (item != '');}); // 필터링 참인것만 반환

		summary = t.parent().find("input.summary").val();
		summary = summary.replace(/#br/g,"<br />");

		w = $(window).width();
		h = $(window).height();

		layer.html("<div id='exit'><strong>"+view_title+"</strong><span>"+view_date+"</span><a title='현재 레이어 닫기' href='#descpt'><img src='/js/prdnt/viewer_2/exit.png' alt='' /></a></div><div class='thumb_wrap'><img class='thumb' width='617' height='465' src='"+src+"' alt='' /></div>");
		layer.css({"position":"fixed","top":"0","left":"0","z-index":"1000","background":"#fff","opacity":"0","box-shadow":"0 0 10px 1px #000"});

		blackout.css({"position":"fixed","z-index":"900","top":"0","left":"0","width":w,"height":h,"background":"#000","opacity":"0.8"}).hide();

		$("#exit").css({"float":"left","position":"relative","width":"100%","text-align":"left","background":"#fff","padding":"20px 0"});
		$("#exit strong").css({"float":"left","color":"#333841","font-size":"20px","padding-bottom":"20px","padding-left":"20px"});
		$("#exit span").css({"float":"right","color":"#686868","font-size":"13px","font-weight":"bold","padding-right":"25px"});
		$("#exit a").css({"position":"absolute","cursor":"pointer","top":"-20px","right":"-20px"});

		$(".thumb_wrap").css({"position":"relative","clear":"both","padding":"20px","background":"#efefef"});

		// 롤 리스트 생성
		function itemLoader(){
			// 초기화
			itemsSTR = [];
			itemsRESELT = "";

			for(var i=0;i<itemsAttr.length;i++){
				itemsSTR[i] = "<a onclick='return false;' href='"+itemsURL+itemsAttr[i]+"'><img width='105' height='79' src='"+itemsURL+itemsAttr[i]+"' alt='' /></a>";
				itemsRESELT += itemsSTR[i];
			}


			// 롤 영역
			$(".thumb_wrap").append("<div class='grap'><div class='obj'>"+itemsRESELT+"</div></div>");
			// 컨트롤
			$(".thumb_wrap").append("<div class='control'><a class='prev' rel='prev' href='#'><img src='/js/prdnt/viewer_2/prev.gif' alt='이전' /></a><a class='next' rel='next' href='#'><img src='/js/prdnt/viewer_2/next.gif' alt='다음' /></a></div>");
			// 텍스트 출력
			layer.append("<div id='flexcroll' class='summary'><p>"+summary+"</p></div>");

			layer.find(".grap").css({"position":"relative","width":"554px","height":"79px","overflow":"hidden","margin":"7px auto 0 auto"});
			layer.find(".obj").css({"position":"relative","width":"1000000px","height":"79px"});
			layer.find(".obj>a").css({"float":"left","margin-right":"7px"});

			layer.find(".prev").css({"position":"absolute","bottom":"40px","left":"15px"});
			layer.find(".next").css({"position":"absolute","bottom":"40px","right":"15px"});

			layer.find(".summary").css({"margin":"20px","line-height":"18px"});
		}

		function roll_trigger(){
		    var param = "#imgLayer"; // 영역
		    var obj = ".obj>a"; // 객체
		    var btn = ".control"; // 실행
		    var interval = 3000; // 반복 텀
		    var speed = 500; // 애니메이션 진행 시간
		    var viewSize = 5; // 한번에보여질 객체 수
		    var moreSize = 7; // css로 추가된 여백(margin,padding)
		    var dir = "x"; // 이동방향
		    var data = 0; // 슬라이드 방향 (0:아래에서 위로, 1:위에서 아래로)
		    var auto = false; // 자동 플레이 true, false
		    var count = false; // 페이징 사용 true, false (사용시 담당자 문의)
		    var hover = false; // stop / play
		    var method = "easeOutCubic"; // 슬라이드 타입 선택 /js/jquery.easing.1.3.js 참조
		
		    stateScrollObj(param,obj,btn,interval,speed,viewSize,moreSize,dir,data,auto,count,hover,method);
		}

		function select_trigger(){
			var b = $("#imgLayer .obj>a");
			var o = $("#imgLayer .thumb");

			var def = 3;
			var box_w = b.width()-def*2;
			var box_h = b.height()-def*2;

			b.prepend("<span class='over'></span>");

			b.css({"position":"relative"});
			b.find(".over").css({"position":"absolute","top":"0","left":"0","width":box_w,"height":box_h,"border":def+"px #2353a5 solid","opacity":"0"});
			b.eq(0).find(".over").css({"opacity":"1"});

			b.click(function(){
				var t = $(this);
				
				src = t.attr("href");
				o.attr("src",src);

				t.find(".over").css({"border-color":"#2353a5"});
				b.find(".over").stop(true,false).animate({"opacity":"0"},{duration:300,easing:"easeOutCubic"});
				t.find(".over").stop(true,false).animate({"opacity":"1"},{duration:300,easing:"easeOutCubic"});

				return false;
			});
		}

		blackout.fadeIn(500);

		layer.fadeIn(fadein,function(){
			itemLoader();
			roll_trigger();
			select_trigger();

			layer.focus();

			wimg = layer.find(".thumb").outerWidth()+40;
			himg = layer.outerHeight();
			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			// style
			//layer.find(".thumb").css({"width":"100%"}); 리사이즈
			if(hgap <= 0) hgap = 10;

			// 등록된 그림이 없으면 
			if(itemsAttr == ""){
				hgap += $(".thumb_wrap").outerHeight()/2;
				$(".thumb_wrap").remove();
			}

			layer.css({"width":wimg});
			layer.css({"left":wgap,"top":hgap});

			//alert(himg+", "+$(window).outerHeight());

			if(summary.length > 200){
				if(itemsAttr != ""){
					$(".summary").css({"height":"70px"});
					$(this).load(fleXenv.fleXcrollMain("flexcroll"));
				}
			}

			layer.stop(true,false).animate({opacity:1},{duration:fadein,easing:"easeOutExpo"});
			layer.draggable({
				cursor: 'move',
				cancel: '.summary'
			});
		});

		var word = "iPad";

		if (navigator.userAgent.match(word) != null){
			var path = $("#imgLayer");

			path.click(function(){
				layer.fadeOut(100,function(){
					layer.remove();
					btn.eq(elem).focus();
				});

				blackout.fadeOut(200);
				
				return false;
			});
		}else{
			$("#exit>a:eq(0)").click(function(){

				layer.fadeOut(100,function(){
					layer.remove();
				});

				blackout.fadeOut(200);
				btn.eq(elem).focus();

				w = 0;
				h = 0;

				himg = 0;
				wimg = 0;
				hgap = 0;
				wgap = 0;
				
				return false;
			});
		}

		$(window).resize(function(){
			w = $(window).width();
			h = $(window).height();

			himg = layer.outerHeight();

			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			if(hgap <= 0) hgap = 10;

			blackout.css({"width":w,"height":h});
			layer.delay(fadein).stop(true,false).animate({"left":wgap,"top":hgap},{duration:fadein*3,easing:"easeInOutExpo"});
		});

		return false;
	});

	// 로드
	var view_interval;
	var view = $(".bdList>li").size();
	var n=0;

	$(".bdList>li").hide();

	view_interval = setInterval(function(){
		if(view > n){
			$(".bdList>li").delay(100).eq(n).fadeIn(300);
			n++;
		}else{
			clearInterval(view_interval);
		}
	},50);
}

