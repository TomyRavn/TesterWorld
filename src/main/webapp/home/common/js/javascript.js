//확인창 스크립트 - 특정 문구를 사용할 경우에는 msg 에 값 입력, '삭제하시겠습니까?' 기본값
function ConfirmMsg(msg){
	if(msg) var chk = confirm(msg);
	else var chk = confirm("처리하시겠습니까?");

	if(chk) return true;
	else return false;
}

//이메일 함수 변경 추가 - FormBoxClass 의 email 셋팅과 연동
function domainChange(obj){
	var input = jQuery("#emal_domain");
	var email_domain = obj.value;
	
	if(!email_domain) {
		input.val('');
		input.attr("readonly",false);
	}
	else {
		input.val(email_domain);
		input.attr("readonly",true);
	}
}

//값의 공백여부 확인
function isEmptyForm(obj, len, nm)
{
	var maxlen = 1;
	maxlen = parseInt(len);
	if(obj && obj.rel !='nochk'){ //해당 객체가 있고 rel 값이 nochk 가 아닐경우에만 체크
		if(obj.value.length <maxlen) 
		{
			alert(nm+" 확인해 주세요");
			if(obj.type !='hidden') obj.focus();
			return true;
		}
	}
	return false;
}
//자바스크립트 trim
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}

//입력폼 필수처리
function disableForm(form, obj){
	var arr = form.split(',');
	var cnt = arr.length;
	
	if(!document.getElementById(arr[0]).disabled) {
		for(i=0;i<cnt;i++){
			document.getElementById(arr[i].trim()).disabled = true;
		}
		jQuery(obj).find('span').html('사용함');
	}
	else {
		for(i=0;i<cnt;i++){
			document.getElementById(arr[i].trim()).disabled = false;
		}
		jQuery(obj).find('span').html('사용안함');
	}
}


//입력 폼 한번만 넘어가도록 처리
jQuery(function(){
	jQuery("form").submit(function(){
		return frmChk(jQuery(this)[0]);
		jQuery(this).find("input[type='image']").attr("disabled",true);
	})
})


//이미지 보기 프로세스
function viewImgProcess(obj){
	var file_nm = obj.href;
	var viewImg = "<div style='position:absolute;top:50%;left:50%;border:3px solid #9f9f9f;background:white;color:#afafaf;text-align:center;' id='viewImg'><img src="+file_nm+" /><br />※2초뒤에  사라집니다.</div>";
	jQuery(obj).parent().append(viewImg).find("#viewImg").delay("2000").fadeOut(500);
}

//이미지 삭제 프로세스
function imgDelProcess($key){
	
}

//새창 뛰우기 
function openwin1(code,linkurl,width,height,scroll)
{		
	/*** 팝업 창 화면 중앙에 오픈시키기**/
	
	if ( getCookie(code) != "done" )	{
	    var str;
	    
	    str = "height=" + height + ",innerHeight=" + height;
	    str += ",width=" + width + ",innerWidth=" + width;
	    if(scroll==1) str += ",scrollbars=yes";
	
	    if (window.screen) {
	        var ah = screen.availHeight - 30;
	        var aw = screen.availWidth - 10;
	        var xc = (aw - width) / 2;
	        var yc = (ah - height) / 2;
	
	        str += ",left=" + xc + ",screenX=" + xc;
	        str += ",top=" + yc + ",screenY=" + yc;

	    }
		//팝업이 없을시 아래 2줄 앞부분을 "//"으로 가려줌
	    noticeWindow = window.open(linkurl, code , str);
	    //noticeWindow.opener = self;
	    noticeWindow.focus();
	}
}

//페이지 인쇄
function printContent(getUrl, site_dvs_cd, menu_dvs_cd) 
{
	window.open("/_module/print/printContent.php?link_url="+getUrl,"print","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=770,height=700");
}



function SearchKeyword(obj){
	var skeyword;
	skeyword  = encodeURI(obj);
	window.open("https://aa.bb.cc/Search/TotalSearch.jsp?sT=3&tid=&v_allword="+skeyword,"print","left=200,top=50,scrollbars=yes,toolbar=no,resizable=yes");
}


function ContView(obj){
	//http://new.i815.or.kr/media_data/magazine/2010/07/201007/EBook.htm?page=5
	var skeyword;
	skeyword  = encodeURI(obj);
	window.open("/media_data/magazine/"+skeyword,"print","left=200,top=50,scrollbars=yes,toolbar=no,resizable=yes");
}

function _ContView(obj){
	var skeyword;
	skeyword  = encodeURI(obj);
	window.open("/media_data/thesis/"+skeyword,"print","left=200,top=50,scrollbars=yes,toolbar=no,resizable=yes");
}

//다른 자바스크립트 파일 인클루드 시키기
var jsload = function(src){
	var src = src;
	return{
		insSrc:function(src){
			var script = document.createElement('script'); 
			script.type = 'text/javascript'; 
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		insCss:function(src){
			var css = document.createElement('link'); 
			css.type = 'text/css'; 
			css.href = src;
			css.rel = 'stylesheet';
			css.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(css);
		}
	}
}();

//jsload.insSrc('/js/jquery.js');//jQuery load

//jquery lightbox 관련 파일
//jsload.insSrc('/js/ajax/lightbox/js/jquery.lightbox.js');//js load
//jsload.insCss('/js/ajax/lightbox/css/jquery.lightbox.css');//css load

//jquery facebox 관련 파일
jsload.insSrc('/resources/js/ajax/facebox/facebox.js');//js load
jsload.insCss('/resources/js/ajax/facebox/facebox.css');//css load

//웹접근성 체크
//jsload.insSrc('/js/webinspector.js');//js load

//팝업창 체크
//jsload.insSrc('/js/ajax/popChk/popChk.js');//js load

//이미지 천천히 로딩
jsload.insSrc('/resources/js/ajax/lazyload/jquery.lazyload.mini.js');//js load

//첨부이미지 미리보기
jsload.insSrc('/resources/js/ajax/prevImg/humanmsg.js');//js load
jsload.insCss('/resources/js/ajax/prevImg/humanmsg.css');//css load


//다중 팝업존 wclee 2010.11.16
function makeObj(){
	var bt;
	var pz_id='';
	var effect;
    var count=0;
	var pz_num = 0;
	var pz_count = 0;
	var itval;
	    
	/*var pz_mv_control=function(){ // right mv control
	
		if(pz_count == pz_id.find(">ul>li").length-1){
			pz_count = -1;
			pz_num = -1;
		}
		pz_count++;
		pz_mv_right();
	
	  }*/
  
	var pz_mv_right=function(){	 // right move
		pz_id.find(">ul>li").hide();	
		pz_num++;	
		if(pz_num < pz_id.find(">ul>li").length){
			if(effect=="Y"){
				pz_id.find(">ul>li").eq(pz_num).fadeIn();
			}else{
				pz_id.find(">ul>li").eq(pz_num).show();
			}
		}else{
			pz_num=0;
			if(effect=="Y"){
				pz_id.find(">ul>li").eq(pz_num).fadeIn();
			}else{
				pz_id.find(">ul>li").eq(pz_num).show();
			}
		}
	
	}
	
	var pz_mv_left=function(){ // left move
		if(pz_num != 0){
			pz_num--;
			pz_id.find(">ul>li").hide();
			if(effect=="Y"){
				pz_id.find(">ul>li").eq(pz_num).fadeIn();
			}else{
				pz_id.find(">ul>li").eq(pz_num).show();
			}
			
		}
	
	}
	
	  var clearItv=function(){ // set clearInterval
	  	clearInterval(itval);
	  }
	
	  this.pz_init=function(obj,pz_time,eff){ 	

			pz_id = jQuery("#"+obj);
			pz_id.find(" > ul > li").hide();			
			pz_id.find(" > ul > li:eq(0)").show();
			pz_id.find(" > div > span:eq(0)").show();
			
			effect=eff;//효과 관련

			pz_id.find(">dl > dd:eq(0)").bind("click",function(){
				pz_mv_left();
			});
			
			pz_id.find(">dl > dd:eq(1)").bind("click",function(){
				setItv(pz_time);
			});
			
			pz_id.find(">dl > dd:eq(2)").bind("click",function(){
				clearItv();
			});
			pz_id.find(">dl > dd:eq(3)").bind("click",function(){
				pz_mv_right();
			});
			
			setItv(pz_time); // popup_zone start setInterval
			
					
	  }
	  
	  var setItv=function(pz_time){ //  set setInterval
			itval=setInterval(pz_mv_right,pz_time);
	  }


}

function popup_zone_list(list_arry,ti,ef){
	var pz_arr=[];
	for(a=0; a < list_arry.length ; a++ ){
		pz_arr[a]=new makeObj();
		pz_arr[a].pz_init(list_arry[a],ti,ef);
	}
}	

/** 다중팝업존 여기까지 end **/

//배너모음
var m_bn_count=0;
var m_bn_p_click_check= 0;
function m_bn_init(){
	var $j=jQuery;
	m_bn_count = $j("#m_bn_move > ul > li").size();
	
	//$j("#m_bn_move").css({"height":"20px","overflow":"hidden"});
	
	$j("#m_bn_p").click(function(){m_bn_p_click();return false;});	
	$j("#m_bn_s").click(function(){m_bn_s_click();return false;});
	$j("#m_bn_r").click(function(){m_bn_r_click();return false;});
	$j("#m_bn_l").click(function(){m_bn_l_click();return false;});
	
	m_bn_s_click();
}
function m_bn_p_click(){
	var $j=jQuery;	
	var setwidth = $j("#m_bn_move > ul > li").eq(0).width();
	
	if(m_bn_p_click_check == 0){
		m_bn_p_click_check = 1;
		$j("#m_bn_move > ul > li").eq(0).clone().appendTo($j("#m_bn_move > ul"));
		$j("#m_bn_move > ul").animate(
			{
				left:-setwidth
			}
			,2000
			,function(){
				$j("#m_bn_move > ul > li").eq(0).remove();
				$j("#m_bn_move > ul").css({"left":"0px"});
				m_bn_p_click_check = 0;
				m_bn_p_click();
			}
		);
	}
}
function m_bn_s_click(){
	var $j=jQuery;
	var count = $j("#m_bn_move > ul > li").size();
	m_bn_p_click_check = 0;
	$j("#m_bn_move > ul").stop();
	$j("#m_bn_move > ul").css({"left":"0px"});
	if(m_bn_count < count){
		$j("#m_bn_move > ul > li:last").remove();
	}
}
function m_bn_r_click(){
	var $j=jQuery;
	m_bn_s_click();
	$j("#m_bn_move > ul > li").eq(0).clone().appendTo($j("#m_bn_move > ul"));
	$j("#m_bn_move > ul > li").eq(0).remove();
}
function m_bn_l_click(){
	var $j=jQuery;
	m_bn_s_click();
	$j("#m_bn_move > ul > li:last").clone().prependTo($j("#m_bn_move > ul"));
	$j("#m_bn_move > ul > li:last").remove();
}



