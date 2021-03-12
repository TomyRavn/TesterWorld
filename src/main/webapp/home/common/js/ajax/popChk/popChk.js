/** �˾�â üũ **/
//�̿���
// A �±׾ȿ� target ���� _blank, blank �� ��� �ڵ� ���
// A �±׾ȿ� rel ���� window �� ��� ���
// A �±׾��� onclick ���� window.open �� ���Ե� ��� ���

popupAlert = function(){	
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;	
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
}

popupAlert.prototype = {
	init:function(){//�⺻����
		var This = this;
		this.obj = document.getElementsByTagName('a');

		for(i=0;i<this.obj.length;i++){
			if((this.obj[i].target=='_blank' || this.obj[i].target=='blank') || (this.obj[i].onclick && this.openChk(this.obj[i])) || this.obj[i].rel=='window' || this.obj[i].rel=='pop'){
				if(!this.obj[i].title) this.obj[i].title = "�ش� ��ũ�� �˾�â���� �����ϴ�.";

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
	findPosX:function(obj){//��ü�� X ��ǥ ����
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
	findPosY:function(obj){//��ü�� Y ��ǥ ����
		var curtop = 0;
		if(obj.offsetParent){
			while(obj.offsetParent){
				curtop += obj.offsetTop;
				obj = obj.offsetParent;
			}
		}else if(obj.y) curtop += obj.y;

		return curtop;
	},
	popLayer:function(obj){//���̾� ����
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
		icon.alt = "�ش� ��ũ�� �˾�â���� �����ϴ�.";
		layer.appendChild(icon);
		//var text = document.createTextNode("�ش� ��ũ�� �˾�â���� �����ϴ�.");
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
	closeLayer:function(){//���̾� ����
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

function popChk(){//�˾�â ����
	var popchk = new popupAlert();
	popchk.init();
}
addLoadEvent(popChk);