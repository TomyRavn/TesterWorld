$(document).ready(function() {
    //nav_top(); //네비게이션 상단 고정
		
	var mainRollingData = {container:$(".popupzone"), imgcontainer:$(".popupzone>ul"), item:$(".popupzone>ul>li>div"), stopBtn:$(".btncontroll"), dotBtn:$(".popupzone>ul>li>a.btnroll"), isPlay:true, delay:6000, speed:500};    
    var initMainBanner = new RollingBannerFade(mainRollingData);
	//close_btn();
	sc_ev(); // TOP버튼
	bn_go(); // 배너 버튼 이동
});

// 네비게이션 상단 고정
/*
function nav_top(){
	var nav = $(".fix_layout");	
	var navTop = nav.offset().top;
	
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		if (winTop >= navTop) {
			nav.addClass("fixed")
		} else if (winTop <= navTop) {
			nav.removeClass("fixed")
		}
	});	
}
*/
	

/*  
 * param : {container:전체배너컨테이너, imgcontainer:배너ul컨테이너, item:배너아이템, prevBtn:이전버튼, nextBtn:다음버튼, stopBtn:멈춤버튼, dotBtn:리스트버튼, delay:딜레이, speed:스피드, isPlay:자동플레이}
 * */
var RollingBannerFade = function(data){
    var $bannerContainer = $(data.container);
    if($bannerContainer.length < 1){ return;}
    var $bannerImgContainer = $(data.imgcontainer);
    var $bannerItem = $(data.item);
    var bannerWidth = $(data.item).width();
    var bannerLen =  $(data.item).length;
    var $prevBtn = $(data.prevBtn);
    var $nextBtn = $(data.nextBtn);
    var $stopBtn = $(data.stopBtn);
    var $dotBtn = $(data.dotBtn);          
    var isPlay = (data.isPlay !== undefined) ? data.isPlay : true;    
    var bdelay = data.delay || 5000, bspeed = data.speed || 700;
    var isTweening = false , isMouseEnter=false, bannerIdx = 0, bannerInterval;
    
    bannerInit();
   
    function bannerInit(){
        if(bannerLen < 2){
            $prevBtn.hide();
            $nextBtn.hide();
            $stopBtn.hide();
            $dotBtn.hide();
            return;
        }
        
        bannerMove(0);
        
        $prevBtn.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();
            if(isTweening)return false;
            var idx = ++bannerIdx;        
            bannerMove(idx);         
        });
        
        $nextBtn.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();          
            if(isTweening)return false;  
            var idx = --bannerIdx;        
            bannerMove(idx);         
        });
        
        $stopBtn.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();           
            bannerStopPlay();            
        });
        
        $dotBtn.on("click focusin", function(e){
            e.stopPropagation();
            e.preventDefault();                      
            if(isTweening)return false;  
            var idx = $(this).parent().index();                
            bannerMove(idx);         
        });
        
        $bannerContainer.on("mouseenter focusin", function(e){      
            isMouseEnter  = true;
            if(bannerInterval)clearInterval(bannerInterval);
            bannerInterval = null;                 
        });
        
        $bannerContainer.on("mouseleave", function(e){        
            isMouseEnter =false;   
            if(isPlay){
                if(bannerInterval)clearInterval(bannerInterval);
                bannerInterval = setInterval(bannerInter,bdelay);   
            }
        });
        
         if(isPlay){
            if(bannerInterval)clearInterval(bannerInterval);
            bannerInterval = setInterval(bannerInter,bdelay);    
        }            
        
    }
    
    function bannerInter(){
        bannerIdx++;
        if(bannerIdx >= bannerLen) bannerIdx=0;
        bannerMove(bannerIdx);
    }
    
    function bannerMove(_idx){
        isTweening = true;
         if($dotBtn){
           $dotBtn.parent().removeClass("on");
           $dotBtn.eq(_idx).parent().addClass("on");
        }
        $bannerItem.css({"opacity":0,"display":"none"});
        $bannerItem.eq(_idx).stop().css({"display":"block"}).animate({"opacity":1},bspeed , function(){
            motionComplete(_idx); 
        });                
                
        bannerIdx = _idx;               
    }
    
   function motionComplete(_idx){
        isTweening =false;       
        if(!isMouseEnter){
            if(isPlay){
                if(bannerInterval)clearInterval(bannerInterval);
                bannerInterval = setInterval(bannerInter,bdelay);   
            }    
        }
   }
    
    function bannerStopPlay(){
        if(isPlay){
            isPlay = false;
            if(bannerInterval)clearInterval(bannerInterval);
            if($stopBtn){
                $stopBtn.find("img").attr("src",$stopBtn.find("img").attr("src").replace("btn_stop", "btn_play"));    
                $stopBtn.find("img").attr("alt","배너 재생하기");   
            }            
        }else{
            isPlay = true;            
            if(bannerInterval)clearInterval(bannerInterval);
            bannerInterval = setInterval(bannerInter,bdelay);
            if($stopBtn){
                $stopBtn.find("img").attr("src",$stopBtn.find("img").attr("src").replace("btn_play", "btn_stop"));    
                $stopBtn.find("img").attr("alt","배너 정지하기");    
            }            
        }
    }
};

/*
function close_btn(){
	
	var bn_size = $(".popupzone ul li").size();
	if(bn_size == 0){
		$(".popupzone").hide();	
	}
	
	$(".close_btn").click(
		function(){
			$(".popupzone").stop().animate({right:0+"px"},500,function(){
				$(".open_btn").fadeIn(200);
			});	
			return false;
		}
	);

	$(".open_btn").click(
		function(){
			$(".open_btn").fadeOut(200);
			$(".popupzone").stop().animate({right:310+"px"},500);	
			return false;
		}
	);
}
*/

function bn_go(){
	$(".go_activ").on('mouseenter focusin', function(){
		$(this).find(".btn").stop().animate({left:50+"px"},300);	
	});
	$(".go_activ").on('mouseleave focusout', function(){
			$(this).find(".btn").stop().animate({left:7+"%"},300);	
	});
}

// TOP버튼
function sc_ev(){
	$(window).scroll(function () {
		var scrollHeight = $(window).scrollTop() + $(window).height();
		//var headerHeight = parseInt($(".header").css("height"));
		
		var documentHeight = $(window).height() - $(window).scrollTop() + $(".header_wrap").height()*2;
		
		
		//var documentHeight = $(document).height();
		//$("#output").val(scrollHeight + "-" + documentHeight);
		if(scrollHeight >= documentHeight){
		//if(scrollHeight == documentHeight){	
			$(".div_top").fadeIn("slow");
		}else{
			$(".div_top").fadeOut("slow");
		}
	});

	$(".div_top .top").click(function () {
		$("html, body").animate({scrollTop : 0 }, "slow");
		return false;
	});	
}