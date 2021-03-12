function subDepth(str){
	var sd = {};
	sd.box = $(".subDepth1");
	sd.maxNum = 5;//라인수
	sd.xp = 10;//좌우여백
	sd.yp = 30;//상단여백
	sd.ul = sd.box.find(">ul");
	sd.li = sd.ul.find(">li");
	sd.a = sd.li.find(">a");
	sd.box3 = $(".subDepth2");
	sd.ul3 = sd.box3.find(">ul");
	sd.li3 = sd.ul3.find(">li");
	sd.li3.a = sd.li3.find(">a");

	//position . 2deps . 3deps
	subDepth_position(sd);

	sd.a.click(function(){		
		
		var obj = $(this).siblings(".subDepth2");
		if(obj.size() != 0){
			sd.ul3.hide();
			obj.find(">ul").show(300);
			sd.a.removeClass("ov");
			sd.li3.a.removeClass("ov");
			$(this).addClass("ov");	
			return false;
		} else {
			sd.ul3.hide();
			return true;
		}
		
		
	});

	//위치표시
	if(str){
		var str2 = parseInt(str.substr(2,2)) -1;
		var str3 = parseInt(str.substr(4,2)) -1;
		var sd3_idx = "sd3_"+str;

		sd.li.eq(str2).find(">a").addClass("ov")
		//2015-07-02 중간에 삭제된 메뉴가 있으면 제 위치를 찾지 못함.
		//sd.li.eq(str2).find(">.subDepth2 > ul").show(300).find(">li:eq("+str3+")>a").addClass("ov");		
		sd.li.eq(str2).find(">.subDepth2 > ul").show(300).find(">li#"+sd3_idx+">a").addClass("ov");		
	}
}

function subDepth_position(sd){	
	var wm = 0;
	var wm2 = 0;	
	var wm_all = 0;
	var h = sd.yp;	
	for(var i=0; i<sd.li.size(); i++){
		//2deps
		var aw = sd.li.eq(i).find(">a");
		if(i == sd.maxNum) h = sd.yp;
		if(i < sd.maxNum){
			wm = Math.max(wm,
				aw.width() + parseInt(aw.css("padding-left")) + parseInt(aw.css("padding-right"))
			); 	
				
			//sd.li.eq(i).attr("left",sd.xp).attr("top",h);
			sd.li.eq(i).css({"position":"absolute","left":sd.xp+"px","top":h+"px"});
		} else {
			wm2 = Math.max(wm2,
				aw.width() + parseInt(aw.css("padding-left")) + parseInt(aw.css("padding-right"))
			);			
			sd.li.eq(i).attr("left",wm+(sd.xp*3)).attr("top",h);
			sd.li.eq(i).css({"position":"absolute","left":wm+(sd.xp*3)+"px","top":h+"px"});
		}

		sd.li.eq(i).find(">.subDepth2").css({"position":"absolute","top":(h*-1)-3+"px"});

		h += sd.li.eq(i).innerHeight();
		

		//3deps
		var wm3 = 0;
		var wm4 = 0;
		var h3 = sd.yp;		
		for(var r=0; r<aw.siblings(".subDepth2").find(">ul>li").size(); r++){
			var aw3 =aw.siblings(".subDepth2").find(">ul>li").eq(r).find(">a");
			if(r == sd.maxNum) h3 = sd.yp;
			if(r < sd.maxNum){
				wm3 = Math.max(wm3,
					aw3.width() + parseInt(aw3.css("padding-left")) + parseInt(aw3.css("padding-right"))
				); 	
				aw3.parent().attr("left",sd.xp).attr("top",h3);
				aw3.parent().css({"position":"absolute","left":sd.xp+"px","top":h3+"px"});
			} else {
				wm4 = Math.max(wm4,
					aw3.width() + parseInt(aw3.css("padding-left")) + parseInt(aw3.css("padding-right"))
				); 	
				aw3.parent().attr("left",wm3+(sd.xp*3)).attr("top",h3);
				aw3.parent().css({"position":"absolute","left":wm3+(sd.xp*3)+"px","top":h3+"px"});
			}

			h3 += aw3.parent().innerHeight();
		}
		for(var r=0; r<aw.siblings(".subDepth2").find(">ul>li").size(); r++){
			var aw3 =aw.siblings(".subDepth2").find(">ul>li").eq(r).find(">a");
			if(r < sd.maxNum){
				aw3.parent().css({"width":wm3+"px"});
			} else {
				aw3.parent().css({"width":wm4+"px"});
			}
		}
	}
	wm_all = wm + wm2 + (sd.xp*4);

	for(var i=0; i<sd.li.size(); i++){
		if(i < sd.maxNum){
			sd.li.eq(i).css({"width":wm+"px"});
		} else {
			sd.li.eq(i).css({"width":wm2+"px"});
		}
	}
	sd.box.width(wm_all);
	sd.li.find(">a").css("display","block");
	sd.li3.find(">a").css("display","block");
	sd.box3.css("left",wm_all+"px").attr("left",wm_all);
	/*
	$(".subDepth1 > ul > li:eq(5)").find("> div").css("left",(wm_all/2 + 10)+"px");
	$(".subDepth1 > ul > li:eq(6)").find("> div").css("left",(wm_all/2 + 10)+"px");
	$(".subDepth1 > ul > li:eq(7)").find("> div").css("left",(wm_all/2 + 10)+"px");
	$(".subDepth1 > ul > li:eq(8)").find("> div").css("left",(wm_all/2 + 10)+"px");
	$(".subDepth1 > ul > li:eq(9)").find("> div").css("left",(wm_all/2 + 10)+"px");		
	*/
	$(".subDepth1 > ul > li:eq(5)").find("> div").css("left",(wm_all/2 - 10)+"px");
	$(".subDepth1 > ul > li:eq(6)").find("> div").css("left",(wm_all/2 - 10)+"px");
	$(".subDepth1 > ul > li:eq(7)").find("> div").css("left",(wm_all/2 - 10)+"px");
	$(".subDepth1 > ul > li:eq(8)").find("> div").css("left",(wm_all/2 - 10)+"px");
	$(".subDepth1 > ul > li:eq(9)").find("> div").css("left",(wm_all/2 - 10)+"px");
	sd.ul3.hide();
}


