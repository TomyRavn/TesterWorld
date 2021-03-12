//Slide Visual
$(function(){
	
	var $event = $(".visual_slide");
	var $eventLi = $event.find(" > .visual_img > div");
	var $eventBox = $event.find(" > .control_btn");
	var $eventBtn = $eventBox.find(" > a");
	var $eventCont = $eventLi;
	var $auto = $eventBox.find(" > .btn_auto > a");

	var eventTotal = $eventLi.length;
	var eventNum = 0;
	var eventOld =-1;

	var timer;

	$event.on("mouseenter mouseleave focusin focusout", function(e){
		
		clearInterval(timer);
		switch(e.type){
			case "mouseleave" :
			case "focusout" :
				if (!$auto.hasClass("on")) timer_start();
			break;
		}

	});

	$auto.on("click", function(e){
		e.preventDefault();
		if (!$auto.hasClass("on")) {
			$(this).addClass("on").attr("title", "플레이");
		} else {
			$(this).removeClass("on").attr("title", "정지");
		}

	});
	
	$eventCont.each(function(i){

		$(this).css({ top:$eventCont.height() * i });

	}).on("focusin", function(e){

		eventOld = eventNum;
		eventNum = $eventCont.index(this);
		change("next", 0);

	});
	
	$eventBtn.on("click", function(e){
		if (eventNum != $eventBtn.index(this)) {
			eventOld = eventNum;
			eventNum = $eventBtn.index(this);
			var direction = (eventNum > eventOld) ? "next" : "prev";
			change(direction);
		}

	});

	function change(_direction, _time){

		var time = (_time == undefined) ? 0.5 : _time;
		var oldTarget = (_direction == "next") ? -$eventCont.height() : $eventCont.height();
		TweenMax.to($eventCont.eq(eventOld), time, { top:oldTarget, ease:Cubic.easeInOut });

		$eventCont.eq(eventNum).css({ top:-oldTarget });
		TweenMax.to($eventCont.eq(eventNum), time, { top:0, ease:Cubic.easeInOut });

		$eventBtn.removeClass("on").eq(eventNum).addClass("on");
		//$eventBtn.removeAttr("title").eq(eventNum).attr("title", "선택됨");

	}
	
	timer_start();
	function timer_start(){

		timer = setInterval(function(){
			eventOld = eventNum;
			eventNum = (eventNum == eventTotal - 1) ? 0 : eventNum + 1;
			change("next");
		}, 5000);

	}
});



// popupzone control
$(document).ready(function(e) {
	pop_cont(); // popupzone control
});

function pop_cont(){
	var pop_cnt = $(".popupzone > ul > li").size();
	if(pop_cnt < 1){
		$(".popupzone").hide();
	}else{
		$(".infor_bn").hide();
		$(".popupzone").show();
	}
}
