function viewer_2(param,btn,target,fadein,itemsURL){
	var param = $(param);
	var btn = param.find(btn);
	var str = "<div id='layerGround'></div><div id='imgLayer' style='display:none;'></div><div id='blackout'></div>";

	var target = $(target);

	var w = 0;
	var h = 0;
	
	var himg = 0;
	var wimg = 0;
	var hgap = 0;
	var wgap = 0;

	var items = param.find(".tt a");
	var itemsAttr;
	var itemsSTR = new Array();
	var itemsRESELT;

	var summary;

	var elem = 0;

	target.prepend(str);

	// 버튼 액션
	items.click(function(){
		var t =  $(this);
		var idx = t.parent().parent().find(".idx").text();
		itemsAttr = t.attr("data-images");
		itemsAttr = itemsAttr.split(",");

		elem = t.index();
		$(".day"+idx).eq(elem).click();

		return false;
	});

	// 오브젝트 액션
	btn.click(function(){
		var t = $(this);
		
		var src = t.attr("href");
		var layer = $("#imgLayer");	
		var bg = $("#layerGround");
		var blackout = $("#blackout");
		var view_title = t.find(".title").text();
		var view_date = t.find(".date").text();

		var tdx = t.attr("class");
			tdx = tdx.split(" ")[1];

		elem = t.index("."+tdx);

		itemsAttr = $("#"+tdx+">a:eq("+elem+")").attr("data-images");
		itemsAttr = itemsAttr.split(",");
		itemsAttr = $.grep(itemsAttr,function(item){return (item != '');}); // 필터링 참인것만 반환

		w = $(window).width();
		h = $(window).height();

		layer.html("<div id='exit'><strong>"+view_title+"</strong><span>"+view_date+"</span><a title='현재 레이어 닫기' href='#descpt'><img src='/js/prdnt/viewer_2/exit.png' alt='' /></a></div><div class='thumb_wrap'><img class='thumb' width='617px' height='411px' src='"+src+"' alt='' /></div>");
		layer.css({"position":"fixed","top":"0","left":"0","z-index":"1000","background":"#fff","opacity":"0","box-shadow":"0 0 10px 1px #000"});

		blackout.css({"position":"fixed","z-index":"900","top":"0","left":"0","width":w,"height":h,"background":"#000","opacity":"0.8"}).hide();

		$("#exit").css({"position":"relative","width":"100%","text-align":"left","background":"#fff","padding-top":"20px"});
		$("#exit strong").css({"float":"left","color":"#333841","font-size":"20px","padding-bottom":"20px","padding-left":"20px"});
		$("#exit span").css({"float":"right","color":"#686868","font-size":"13px","font-weight":"bold","padding-right":"25px"});
		$("#exit a").css({"position":"absolute","cursor":"pointer","top":"-20px","right":"-20px"});

		$(".thumb_wrap").css({"clear":"both","padding":"20px","background":"#efefef"});

		// 롤 리스트 생성
		function itemLoader(){
			var ht = layer.outerHeight()+5;

			// 초기화
			itemsSTR = [];
			itemsRESELT = "";

			for(var i=0;i<itemsAttr.length;i++){
				itemsSTR[i] = "<a onclick='return false;' href='"+itemsURL+itemsAttr[i]+"'><img width='105px' height='72px' src='"+itemsURL+itemsAttr[i]+"' alt='' /></a>";
				itemsRESELT += itemsSTR[i];
			}

			summary = $("#"+tdx+" input:eq("+elem+")").val();
			summary = summary.replace(/#br/g,"<br />");

			// 롤 영역
			$(".thumb_wrap").append("<div class='grap'><div class='obj'>"+itemsRESELT+"</div></div>")
			// 컨트롤
			$(".thumb_wrap").after("<div class='control'><a class='prev' rel='prev' href='#'><img src='/js/prdnt/viewer_2/prev.gif' alt='이전' /></a><a class='next' rel='next' href='#'><img src='/js/prdnt/viewer_2/next.gif' alt='다음' /></a></div>");
			// 텍스트 출력
			layer.append("<div class='summary'><p>"+summary+"</p></div>");

			layer.find(".grap").css({"position":"relative","width":"554px","height":"72px","overflow":"hidden","margin":"7px auto 0 auto"});
			layer.find(".obj").css({"position":"relative","width":"1000000px","height":"72px"});
			layer.find(".obj>a").css({"float":"left","margin-right":"7px"});

			layer.find(".prev").css({"position":"absolute","top":ht,"left":"15px"});
			layer.find(".next").css({"position":"absolute","top":ht,"right":"15px"});

			layer.find(".summary").css({"padding":"20px","line-height":"18px","width":"617px"});
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

			wimg = layer.find(".thumb").width();
			himg = layer.outerHeight();
			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			// style
			//layer.find(".thumb").css({"width":"100%"}); 리사이즈
			layer.find(".thumb").css({"width":"617px","height":"411px"}); // 고정사이즈 사용

			if(hgap <= 0) hgap = 10;

			//layer.css({"width":wimg});
			layer.css({"left":wgap,"top":hgap});
			
			if(itemsAttr == "") $(".thumb_wrap").remove(); // 등록된 그림이 없으면 
			if(summary.length > 500){ // 글자수가 기준보다 크면
				$(".summary").css({"height":"110px"});
				fleXenv.fleXcrollMain("flexcroll");
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
					layer.html("");
				});

				blackout.fadeOut(200);
				
				return false;
			});
		}else{
			$("#exit>a:eq(0)").click(function(){

				layer.fadeOut(100,function(){
					layer.html("");
				});

				blackout.fadeOut(200);
				
				return false;
			});
		}

		$(window).resize(function(){
			w = $(window).width();
			h = $(window).height();

			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			if(hgap <= 0) hgap = 10;

			blackout.css({"width":w,"height":h});
			layer.delay(fadein).stop(true,false).animate({"left":wgap,"top":hgap},{duration:fadein*3,easing:"easeInOutExpo"});
		});

		return false;
	});

}