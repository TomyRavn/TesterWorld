/** 팝업창 체크 **/
//이용방법
// A 태그안에 target 값이 _blank, blank 인 경우 자동 출력
// A 태그안에 rel 값이 window 인 경우 출력
// A 태그안의 onclick 값이 window.open 이 포함된 경우 출력

popupAlert = function(){	
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;	
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
}

popupAlert.prototype = {
	init:function(){//기본셋팅
		var This = this;
		this.obj = document.getElementsByTagName('a');

		for(i=0;i<this.obj.length;i++){
			if((this.obj[i].target=='_blank' || this.obj[i].target=='blank') || (this.obj[i].onclick && this.openChk(this.obj[i])) || this.obj[i].rel=='window' || this.obj[i].rel=='pop'){
				if(!this.obj[i].title) this.obj[i].title = "해당 링크는 팝업창으로 열립니다.";

				this.addEvent(
					this.obj[i],
					"mouseover",
					function(){
						This.closeLayer();
						This.popLayer(this);
						}
				);

				this.addEvent(
					this.obj[i],
					"focus",
					function(){
						This.closeLayer();
						This.popLayer(this);
						}
				);
				this.addEvent(
					this.obj[i],
					"mouseout",
					function(){
						This.closeLayer();
						}
				);
				this.addEvent(
					this.obj[i],
					"blur",
					function(){
						This.closeLayer();
						}
				);
			}
		}
	},
	findPosX:function(obj){//객체의 X 좌표 구함
		var curleft = 0;
		if(obj.offsetParent){
			while(obj.offsetParent){
				curleft += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		}
		else if(obj.x) curleft += obj.x;

		return curleft;
	},	
	findPosY:function(obj){//객체의 Y 좌표 구함
		var curtop = 0;
		if(obj.offsetParent){
			while(obj.offsetParent){
				curtop += obj.offsetTop;
				obj = obj.offsetParent;
			}
		}else if(obj.y) curtop += obj.y;

		return curtop;
	},
	popLayer:function(obj){//레이어 만듬
		if(!document.createElement) return false;
		if(!document.createTextNode) return false;
		var x = this.findPosX(obj);
		var y = this.findPosY(obj);
		
		var width = obj.childNodes[0].width;
		var height = obj.childNodes[0].height;
		if(!width) width = 12;
		if(!height) height = 12;
		var layer = document.createElement("div");		
		layer.id = 'popIcon';
		layer.style.zIndex = 9999;
		layer.style.position = 'absolute';
		layer.style.top = y + "px";
		layer.style.left = x + width + 5 +"px";
		layer.style.background = "#fff";
		layer.style.border = "solid #999 1px";
		layer.style.padding = "3px";
		var icon = document.createElement("img");
		icon.src = "/js/ajax/popChk/img/popIcon.gif";
		icon.alt = "해당 링크는 팝업창으로 열립니다.";
		layer.appendChild(icon);
		//var text = document.createTextNode("해당 링크는 팝업창으로 열립니다.");
		//layer.appendChild(text);
		if(obj.childNodes[0].tagName=='IMG'){
			document.getElementsByTagName("body")[0].appendChild(layer);
		}else{
			icon.id = "popIcon";
			icon.style.marginLeft = "5px";
			icon.style.position="absolute";
			obj.appendChild(icon);
		}
	},
	closeLayer:function(){//레이어 닫음
		var dObj = document.getElementsByTagName('div');
		var IObj = document.getElementsByTagName('IMG');
		
		for(j=0;j<dObj.length;j++){
			if(dObj[j].id=='popIcon'){
				dObj[j].parentNode.removeChild(dObj[j]);
			}
		}

		for(j=0;j<IObj.length;j++){
			if(IObj[j].id=='popIcon'){
				IObj[j].parentNode.removeChild(IObj[j]);
			}
		}
	},
	openChk:function(obj){
		var str = /window.open/
		chk = str.test(obj.onclick);

		return chk;
	},
	addEvent:function( obj, type, fn )
	{
		if (obj.addEventListener)
			obj.addEventListener( type, fn, false );
		else if (obj.attachEvent)
		{
			obj["e"+type+fn] = fn;
			obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
			obj.attachEvent( "on"+type, obj[type+fn] );
		}
	},
	removeEvent:function( obj, type, fn )
	{
		if (obj.removeEventListener)
			obj.removeEventListener( type, fn, false );
		else if (obj.detachEvent)
		{
			obj.detachEvent( "on"+type, obj[type+fn] );
			obj[type+fn] = null;
			obj["e"+type+fn] = null;
		}
	}
}

function popChk(){//팝업창 실행
	var popchk = new popupAlert();
	popchk.init();
}
addLoadEvent(popChk);