function viewer_1(param,btn,target,fadein){
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

	target.prepend(str);

	btn.click(function(){
		var t = $(this);

		var src = t.attr("href");
		var layer = $("#imgLayer");	
		var bg = $("#layerGround");
		var blackout = $("#blackout");

		w = $(window).width();
		h = $(window).height();
				
		//layer.html("<div id='exit'><a href='#descpt'><img src='/images/dc/common/photo_view_close.gif' alt='닫기' /></a></div><img class='thumb' src='"+src+"' alt='' />");
		layer.html("<div id='exit'><strong><img src='/js/prdnt/viewer_1/title.gif' alt='photo viewer' /></strong><a title='현재 레이어 닫기' href='#descpt'><img src='/js/prdnt/viewer_1/exit.gif' alt='' /></a></div><img class='thumb' src='"+src+"' alt='' />");
		layer.css({"position":"fixed","top":"0","left":"0","z-index":"1000","background":"#fff","opacity":"0","padding":"5px","box-shadow":"0 0 10px 1px #000"});

		blackout.css({"position":"fixed","z-index":"900","top":"0","left":"0","width":w,"height":h,"background":"#000","opacity":"0.8"}).hide();

		$("#exit").css({"position":"relative","width":"100%","text-align":"left"});
		$("#exit strong").css({"float":"left","padding-top":"10px"});
		$("#exit a").css({"float":"right","cursor":"pointer","width":"30px","height":"23px","text-align":"center","padding-top":"7px"});

		blackout.fadeIn(500);
		
		layer.fadeIn(fadein,function(){
			wimg = layer.find(".thumb").width();
			himg = layer.outerHeight();
			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			// style
			layer.find(".thumb").css({"width":"100%"});

			if(hgap <= 0) hgap = 10;

			layer.css({"width":wimg});
			layer.css({"left":wgap,"top":hgap});

			layer.stop(true,false).animate({opacity:1},{duration:fadein,easing:"easeOutExpo"});
			layer.draggable({
				cursor: 'move'
			});
		});

		var word = "iPad";
		var target = $(window);

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

			hgap = (h-himg)/2;
			wgap = (w-wimg)/2;

			if(hgap <= 0) hgap = 10;

			blackout.css({"width":w,"height":h});
			layer.delay(fadein).stop(true,false).animate({"left":wgap,"top":hgap},{duration:fadein*3,easing:"easeInOutExpo"});
		});

		return false;
	});

}