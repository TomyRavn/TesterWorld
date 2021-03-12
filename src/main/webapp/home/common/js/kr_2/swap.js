/******************************************************************************
* description :
* 레이어 위치 지정 또는 순서 출력을 사용자가 원하는 위치 또는 순서로
* 배열하도록 하는 함수.
* 아이디어 : http://www.google.co.kr/ig, http://kr.yahoo.com에 대한
* 확장형.
* 쇼핑몰에서 상품 위치나, 디자인관리에서 디자인 레이어 위치 이동에 따른 배열,
* 여러 통계 수치나, 입력폼과 출력폼이 동일한 화면에서 출력 순서 변경을 위해 만듦
*
* 추가 예정
*  - 구글처럼 레이어의 펼침과 접을 경우에 대한 효과(슬라이딩 또는 바인딩 형태)
*  - 2개 이상을 사용할 경우 드래그앤 드랍시 위치 문제 해경
*  - 순서 변경 후 결과값 되돌림.
*
* **
* last update : 2006.12
*
* x-wiz by lee n.thu
* e-mail : N.thu <support@x-wiz.com>
* 사람이면 누구나 사용이 가능하며, 소스 수정은 들키지만 않음 수정 가능합니다.
* 아직 완성본이 아닌 까닭에 공개하는 데 망설였으나, 부분적으로나만
* 사용이 가능할 듯 싶어 공개해서 올립니다.
*
* var xts=new xwzSwapRotation(영역레이어 ID,[[가로 갯수],[레이어간의 간격]]);
* **
* Method
*- setCol(int 값,bool 효과) : 가로갯수 변경, BOOL 변경 시 이동에 대한 효과 여부
*- getCol() :현재 가로갯수값을 되돌림
*- setBaudRate(int 값) : 위치 이동시 이동속도 설정
*- getBaudRate() : 현재 위치 이동속도 값을 되돌림
*- setOpacity(0~100) : 이동 시 투명도 설정
*- resetToggle(object) : 위치 초기화
*- prevToggle(object 이벤트 발생 객체,int[or object] 대상 객체 또는 대상 객체 인덱스) : 클릭 이벤트 발생 대상 객체가 이전 순서로 이동하는 버튼(이미지) 설정
*- nextToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 다음 순서로 이동
*- firstToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 처음 순서로 이동
*- lastToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 마지막 순서로 이동
*- upToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 위로 이동
*- downToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 아래로 이동
*- leftToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 왼쪽으로 이동
*- rightToggle(source object ,target int[or object]) : 클릭 이벤트 발생 시 대상 객체가 오른쪽으로 이동
*- onArrival(function[or string]) : 완료 후 호출하는 함수 또는 스크립트
* **
* 단추 지정 시 <span toggle="버튼옵션지정"></span> Tag로 감싸야함.
* 버튼 옵션 : prev, next, first, last, up, down, left, right, drag, reset

******************************************************************************/


/** * xwzSwapRotation 생성. * * @Param {String}	byID 해당 객체를 포함하고있는 객체 * @Param {Number}	Columns 각 Row로 분활될 Column갯수 * @Param {Number}	Distance 각 대상 객체 간의 간격 * @return {Object}	Returns a new xwzSwapRotation. */

 var xwzSwapRotation=function(byID,Columns,Distance){ 	this.version='0.9a'; 	this.sName='__xwzSRW_'+byID; 	this.oFrame=document.getElementById(byID); 	if(this.oFrame==null) return null; 	if(window.__xwzSwapRotation==null) window.__xwzSwapRotation=[]; 	window.__xwzSwapRotation[this.sName]=this; 	this.nDistance=Distance||0;/*객체들간의 간격*/

 	this.nColumns =Columns||1;/*Column 갯수*/

 	this.nOpacity=50;/*이동간의 투명도설정*/

 	this.nBaud=50;/*이동속도*/

 	this.nAvailableCookie=7;/*쿠키유지시간*/

 	this.zIndex=0;/*deep index*/

 	this.Nodes=[];/*객체 배열변수*/

 	this.Atlas=[];/*각 좌표값 배열변수*/

 	this.Queue=[];/*이동대상 배열변수*/

 	this.resTime=null;/*시간*/

 	this.eventHandle=null;/*event*/

 	this.Observers=[]; 	this.oClone=null; 		this._Drops={dX:0,dY:0,nArrival:null,nDepart:null,oAvailable:null};/*drag drop정보*/

 	/* 	* config set up 	*/

 	this._initializ(); }; /** * 각 객체들의 순서를 쿠키에서 가져오는 함수 * @return {String} Return 쿠키값. */

 xwzSwapRotation.prototype.loadSequel=function(){ 	var offsetMin=0,offsetMax=0; 	if(document.cookie.length>0){/*쿠키가 존재하는 체크*/

 		offsetMin=document.cookie.indexOf(this.sName+'=');/*해당한 이름을 갖는 쿠키 정보 시작 위치*/

 		if(offsetMin!==-1){ 			offsetMin+=this.sName.length+1;offsetMax=document.cookie.indexOf(';',offsetMin); 			if(offsetMax===-1){offsetMax=document.cookie.length;}; 			return (unescape(document.cookie.substring(offsetMin,offsetMax))).toString().split(','); 		} 	} 	return false; }; /** * 각 레이어들의 순서를 쿠키로 저장하는 함수 */

 xwzSwapRotation.prototype.saveSequel=function(){ 	var dtExpire=null,sExpire='',S=[],domain=window.document.domain||window.location.hostname; 	for(var i=0;i<this.Nodes.length;i++){S[i]=this.Nodes[i].getAttribute('_WedgeIndex');} 	if(this.nAvailableCookie*24>0){dtExpire=new Date((new Date()).getTime()+(this.nAvailableCookie*24)*3600000);sExpire='; expires='+dtExpire.toGMTString();} 	document.cookie=(this.sName)+'='+escape(S.toString())+sExpire+'; path=/; HttpOnly '+(typeof(domain)=='string'&&domain!='' ?'domain='+domain:'')+';'; }; /** * 이벤트 핸들러에 대한 함수 집합 */

 xwzSwapRotation.prototype.Event={ 	/** 	* 객체에 이벤트가 발생될 경우 해당 함수를 호출하도록 하는 함수 	*/

 	add:function(element,name,fpnotify,useCapture){ 		if(element.addEventListener)element.addEventListener(name,fpnotify,useCapture||false);else if(element.attachEvent)element.attachEvent('on'+name, fpnotify); 	}, 	/** 	*객체에 이벤트가 발생할 경우의 함수 호출에 대한 정지 	*/

 	remove:function(element,name,fpnotify,useCapture){ 		if(element.removeEventListener)element.removeEventListener(name,fpnotify,useCapture||false);else if(element.detachEvent) element.detachEvent('on'+name,fpnotify); 	}, 	/** 	*마우스 포인터의 X 좌표값 	*/

 	pointX:function(event){ 		return event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)); 	}, 	/** 	*마우스 포인터의 Y 좌표값 	*/

 	pointY:function(event){ 		return event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop)); 	}, 	/** 	*마우스 버튼 클릭 	*/

 	whichButton:function(event){ 		return (event.button||event.which||0); 	} }; /** * Opacity style Apply * @Param {Object} element-style 요소를 갖는 객체 * @Param {Number}	nValue-투명도 */

 xwzSwapRotation.prototype._notifyOpacity=function(element, nValue){ 	try{ 		if(typeof(element.style.filter)== 'string'){ 			element.style.filter=nValue==null ? '':'progid:DXImageTransform.Microsoft.Alpha(opacity='+nValue+')'; 			if(!element.currentStyle||!element.currentStyle.hasLayout){element.style.zoom=1;} 		}else{ 			element.style.opacity=nValue==null? null:nValue/100; 			element.style['-moz-opacity']=nValue==null? null:nValue/100; 			element.style['-khtml-opacity']=nValue==null? null:nValue/100; 		} 	}catch(e){}; }; /** * 각 객체들의 고유 인덱스를 통해서 해당 객체의 배열에서의 위치를 찾는 함수 */

 xwzSwapRotation.prototype.getIndex=function(_index){for(var i in this.Nodes){if(this.Nodes[i].getAttribute('_WedgeIndex')==_index)return i*1;}}; /** * 인덱스 또는 객체값을 통해 해당 객체의 배열 위치를 찾는 함수 */

 xwzSwapRotation.prototype.searchWedge=function(mixValue){if(typeof mixValue=='object'){for(var i in this.Nodes)if(this.Nodes[i]==mixValue)return i*1;}else if(typeof mixValue=='number'){for(var i in this.Nodes)if(i==mixValue)return i*1;};return false}; /** * Column 갯수 */

 xwzSwapRotation.prototype.setCol=function(nValue,bOpt){this.nColumns=nValue;if(bOpt==true)this.depart();else this.compose();}; xwzSwapRotation.prototype.getCol=function(){return this.nColumns;}; /** * */

 xwzSwapRotation.prototype.setBaudRate=function(nValue){this.nBaud=nValue;}; xwzSwapRotation.prototype.getBaudRate=function(){return this.nBaud;}; /** * */

 xwzSwapRotation.prototype.setOpacity=function(nValue){this.nOpacity=nValue;}; /** * */

 xwzSwapRotation.prototype.resetToggle=function(objSrc){objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\'].reset();');}; xwzSwapRotation.prototype.prevToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._stack('+_index+',-1);');}; xwzSwapRotation.prototype.nextToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._stack('+_index+',+1);');}; xwzSwapRotation.prototype.firstToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._above('+_index+');');}; xwzSwapRotation.prototype.lastToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._below('+_index+');');}; xwzSwapRotation.prototype.upToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+_index+',\'up\');');}; xwzSwapRotation.prototype.downToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+_index+',\'down\');');}; xwzSwapRotation.prototype.leftToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+_index+',\'left\');');}; xwzSwapRotation.prototype.rightToggle=function(objSrc,mixValue){var _index=this.searchWedge(mixValue);if(_index!==false)objSrc.onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+_index+',\'right\');');}; /** * 초기화 함수 */

 xwzSwapRotation.prototype._initializ=function(){ 	var i=0,j=0,nX=0,nY=0,v=[],h=[]; 	var oNode=null,List=[],_t=[],_f=this.loadSequel(),pName=''; 	var wdt=0, hgt=0; 	/*add Node*/

 	for(i=0;i<this.oFrame.childNodes.length;i++){ 		oNode=this.oFrame.childNodes[i]; 		if(oNode.nodeName.toLowerCase()=='#text'||oNode.nodeName.toLowerCase()=='#comment'||typeof(oNode)!='object')continue; 		oNode.setAttribute('_WedgeIndex', this.Nodes.length); 		oList=oNode.getElementsByTagName('SPAN'); 		for(j=0;j<oList.length;j++){ 			if(oList[j].getAttribute('toggle')==null)continue; 			oList[j].style.cursor='pointer'; 			if(oList[j].getAttribute('toggle').toLowerCase()=='prev'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._stack('+this.Nodes.length+',-1);'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='next'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._stack('+this.Nodes.length+',+1);'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='first'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._above('+this.Nodes.length+');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='last'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._below('+this.Nodes.length+');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='up'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+this.Nodes.length+',\'up\');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='down'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+this.Nodes.length+',\'down\');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='left'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+this.Nodes.length+',\'left\');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='right'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\']._cross('+this.Nodes.length+',\'right\');'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='drag'){ 				oList[j].style.cursor='move';				oList[j].onmousedown=new Function('event','__xwzSwapRotation[\''+this.sName+'\'].eventHandle=event||window.event;__xwzSwapRotation[\''+this.sName+'\'].departDrag('+this.Nodes.length+')'); 			}else if(oList[j].getAttribute('toggle').toLowerCase()=='reset'){ 				oList[j].onclick=new Function('__xwzSwapRotation[\''+this.sName+'\'].reset();'); 			}; 		}; 				wdt = oNode.style.width;hgt=oNode.style.height; 		if(wdt.indexOf('%')!==-1)wdt=this.oFrame.offsetWidth*(parseInt(wdt)/100)-(this.nDistance); 		if(hgt.indexOf('%')!==-1)hgt=this.oFrame.offsetHeight*(parseInt(hgt)/100)-(this.nDistance); 		if(oNode.style.width){ 			nX=wdt; 		}else{ 			nX=oNode.offsetWidth; 		} 		if(oNode.style.height){ 			nY=hgt; 		}else{ 			nY=oNode.offsetHeight; 		} 				this.Atlas[this.Nodes.length]={X:0,Y:0,cX:nX,cY:nY,dX:0,dY:0}; 		this.Nodes[this.Nodes.length]=oNode;oNode.style.position='absolute'; 		oNode.style.width=nX+'px';oNode.style.height=nY+'px'; 		oNode.style.margin='5px 0px 0px 0px'; 		oNode.style.display='inline'; 		this.zIndex=oNode.style.zIndex; 	}; 	this.oFrame.style.position='relative'; 	if(_f!=false){/*sort*/

 		oList=this.Nodes;this.Nodes=[]; 		for(i=0;i<oList.length;i++){if(oList[_f[i]]==null)continue;_t[_t.length]=_f[i];}; 		for(i=0;i<_t.length;i++){j=_t[i]==null?i:_t[i];this.Nodes[i]=oList[j]}; 		oList=null;_f=null;_t=null; 	}; 		this.oClone=document.createElement('DIV'); 	with(this.oClone.style){border='#808080 2px dashed';position='absolute';display='none';cursor='move';}; 	this._notifyOpacity(this.oClone); 	this.oFrame.appendChild(this.oClone); 	this.compose(); }; /** * 각 레이어 위치를 초기 상태로 되돌리는 함수 */

 xwzSwapRotation.prototype.reset=function(){ 	var S=[], nIndex=0; 	for(var i=0;i<this.Nodes.length;i++){ 		nIndex=this.Nodes[i].getAttribute('_WedgeIndex')*1; 		S[nIndex]=this.Nodes[i]; 	}; 	this.Nodes=S;this.saveSequel();this.compose(); }; /** * 선택된 레이어를 첫번째 배열요소로 이동 * @Param {Number}	_index 레이어 인덱스 번호 */

 xwzSwapRotation.prototype._above=function(_index){ 	var oList=[],i=0,s=this.getIndex(_index);if(s==0)return; 	oList[0]=this.Nodes[s]; 	for(i=0;i<this.Nodes.length;i++){if(i!=s)oList[oList.length]=this.Nodes[i];}; 	this.Nodes=oList;this.depart(); }; /** * 선택된 레이어를 마지막번째 배열요소로 이동 * @Param {Number} _index 레이어 인덱스 번호 */

 xwzSwapRotation.prototype._below=function(_index){ 	var oList=[],i=0,s=this.getIndex(_index);if(s==this.Nodes.length-1)return; 	for(i=0;i<this.Nodes.length;i++){if(i!=s)oList[oList.length]=this.Nodes[i];}; 	oList[oList.length]=this.Nodes[s];this.Nodes=oList;this.depart(); }; /** * 선택된 레이어를 정해진 step만큼 이동시키는 함수 * @Param {Number}_index 레이어 인덱스 번호 * @Param {String} _step[:=decrease,increase,first,last] */

 xwzSwapRotation.prototype._stack=function(_index,_step){ 	var s= this.getIndex(_index),d=s+_step,dist=0,oNodtmp=this.Nodes[s]; 	d=d<0?this.Nodes.length-1:d>this.Nodes.length-1?0:d; 	if(d==this.Nodes.length-1&&s==0){/*prev*/

 		oNodtmp=this.Nodes.shift();this.Nodes.push(oNodtmp); 	}else if(d==0&&s==this.Nodes.length-1){/*next*/

 		oNodtmp=this.Nodes.pop();this.Nodes.unshift(oNodtmp); 	}else{ 		this.Nodes[s]=this.Nodes[d];this.Nodes[d]=oNodtmp; 	}; 	this.depart(); }; /** * 선택된 레이어를 정해진 Y,X 축으로 step만큼 이동시키는 함수 * @Param {Number}	_index 레이어 인덱스 번호 */

 xwzSwapRotation.prototype._cross=function(_index,_arrow){ 	_arrow=(_arrow).toString().toLowerCase() || (this.nColumns>0?'up':'left'); 	var s=this.getIndex(_index),d=s,oNodtmp=null; 	var iX=Math.floor(s%this.nColumns),iY=Math.floor(s/this.nColumns),mX=Math.floor(this.Nodes.length-1%this.nColumns),mY=Math.floor(this.Nodes.length-1/this.nColumns); 	if(_arrow=='up')iY=iY>0?iY-1:iY; 	else if(_arrow=='down')iY=iY<mY?iY+1:iY; 	else if(_arrow=='left')iX=iX>0?iX-1:iX; 	else if(_arrow=='right')iX=iX<mX?iX+1:iX; 	d=(iY*this.nColumns)+iX; 	if(d==s||d<0||d>this.Nodes.length-1) return false; 	oNodtmp=this.Nodes[s];this.Nodes[s]=this.Nodes[d];this.Nodes[d]=oNodtmp;this.depart(); }; /** * 레이어 각 위치에 대한 정렬 및 크기 */

 xwzSwapRotation.prototype.molding=function(){ 	var d=this._grid(this.Nodes,this.nColumns),nX=Math.floor(this.nDistance/2),nY=Math.floor(this.nDistance/2); 	for(i=0;i<d.horizontal.length;i++){nX+=d.horizontal[i]+this.nDistance;}; 	for(i=0;i<d.vertical.length;i++){nY+=d.vertical[i]+this.nDistance;}; 	this.oFrame.style.width=nX+Math.floor(this.nDistance/2)+'px'; 	this.oFrame.style.height=nY+Math.floor(this.nDistance/2)+'px'; }; xwzSwapRotation.prototype.compose=function(){ var Rect=this._mapping(this.Nodes, this.nColumns,this.nDistance); 	for(var i=0;i<this.Nodes.length;i++){ 		this.Atlas[i].X=Rect[i].X;this.Atlas[i].Y=Rect[i].Y; 		this.Atlas[i].cX=Rect[i].cX;this.Atlas[i].cY=Rect[i].cY; 		this.Nodes[i].style.left=Rect[i].X+'px';this.Nodes[i].style.top=Rect[i].Y+'px'; 		this.Nodes[i].style.zIndex=this.zIndex+i; 	}; 	this.molding(); }; /** * 각 레이어의 가로, 세로[x,y]에 대한 정보 제공 * @return {Object} */

 xwzSwapRotation.prototype._grid=function(Nodes,Columns){ 	var iX=0,iY=0,nX=0,nY=0,h=[],v=[]; 	for(var i=0;i<Nodes.length;i++){ 		nX=parseInt(Nodes[i].style.width);nY=parseInt(Nodes[i].style.height)+5; 		iX=Math.floor(i%Columns);iY=Math.floor(i/Columns); 		v[iY]=(v[iY]||0)>nY?v[iY]:nY;	h[iX]=(h[iX]||0)>nX?h[iX]:nX; 	} 	return {vertical:v,horizontal:h}; }; /** * 레이어들에 대한 좌표값을 배열화하여 되돌림 */

 xwzSwapRotation.prototype._mapping=function(Nodes,Columns,Distance){ 	var iX=0,iY=0,nX=Math.abs(Distance/2),nY=Math.abs(Distance/2),Map=[],d=this._grid(Nodes,Columns); 	for(var i=0;i<Nodes.length;i++){ 		iX=Math.floor(i%Columns);iY=Math.floor(i/Columns); 		nX +=(d.horizontal[iX]+Distance);if(iX==0){nX=Math.abs(Distance/2);if(iY>0)nY+=(d.vertical[iY-1]+Distance);}; 		Map[i]={X:nX,Y:nY,cX:parseInt(Nodes[i].style.width),cY:parseInt(Nodes[i].style.height)}; 	}; 	return Map; }; /** *레이어 이동 */

 xwzSwapRotation.prototype.depart=function(){ 	this.Queue=[]; 	var dX=0,dY=0,Rect=this._mapping(this.Nodes,this.nColumns,this.nDistance); 	for(var i=0;i<this.Nodes.length;i++){ 		dX=Rect[i].X-parseInt(this.Nodes[i].style.left),dY=Rect[i].Y-parseInt(this.Nodes[i].style.top); 		if(dX!=0||dY!=0){ 			this.Atlas[i]=Rect[i]; 			this.Queue[this.Queue.length]={ 					style:this.Nodes[i].style, 					distX:dX,distY:dY, 					posX:parseInt(this.Nodes[i].style.left), 					posY:parseInt(this.Nodes[i].style.top), 					mvX:Rect[i].X, 					mvY:Rect[i].Y, 					nCurX:dX!=0?0:this.nBaud, 					nCurY:dY!=0?0:this.nBaud 				}; 			this._notifyOpacity(this.Nodes[i], this.nOpacity); 		}; 		this.Nodes[i].style.zIndex=this.zIndex+i; 	}; 	this.molding();this.aviate();/**/

 }; /** * */

 xwzSwapRotation.prototype.aviate=function(){ 	clearTimeout(this.resTime);this.resTime=null; 	var Toggle=null,Queue=[]; 	var dY=0,dX=0; 	var nPg=0; 	for(var i=0;i<this.Queue.length;i++){ 		Toggle=this.Queue[i]; 		if(Toggle.nCurX < this.nBaud){ 			dX = Math.round(Math.sin(Toggle.nCurX / this.nBaud*Math.PI/2)*Toggle.distX); 			Toggle.style.left=(Toggle.posX+dX)+'px'; 			Toggle.nCurX++; 		} 		if(Toggle.nCurY < this.nBaud){ 			dY = Math.round(Math.sin(Toggle.nCurY / this.nBaud*Math.PI/2)*Toggle.distY); 			Toggle.style.top=(Toggle.posY+dY)+'px'; 			Toggle.nCurY++; 		} 		if(Toggle.nCurX >= this.nBaud && Toggle.nCurY >= this.nBaud ){ 			this._notifyOpacity(Toggle); 			Toggle.style.left=(Toggle.mvX)+'px'; 			Toggle.style.top=(Toggle.mvY)+'px'; 		}else{ 			Queue[Queue.length]=Toggle; 		} 	}; 	if(Queue.length==0){ 		this.Queue=[];this.molding();this.saveSequel();return false; 	} 	this.Queue=Queue; 	this.resTime=setTimeout('__xwzSwapRotation[\''+this.sName+'\'].aviate()',0); }; /** * */

 xwzSwapRotation.prototype.getScroll=function(){ 	var region={top:0,left:0,width:0,height:0}; 	if(window.document.documentElement && window.document.documentElement.scrollTop){ 		region.top=window.document.documentElement.scrollTop;region.left=window.document.documentElement.scrollLeft; 	}else if(window.document.body){ 		region.top=window.document.body.scrollTop;region.left=window.document.body.scrollLeft; 	} 	if(window.innerWidth){ 		region.width=window.innerWidth;region.height=window.innerHeight; 	}else if(window.document.documentElement&&window.document.documentElement.clientWidth){ 		region.width=window.document.documentElement.clientWidth;region.height=window.document.documentElement.clientHeight; 	}else{ 		region.width=window.document.body.offsetWidth;region.height=window.document.body.offsetHeight; 	} 	return region; }; /** * */

 xwzSwapRotation.prototype._arrangeDrag=function(element){ 	var Queue=[],Rect=[]; 	for(i=0;i<this.Queue.length;i++){ 		if(i!=this._Drops.nDepart)Queue[Queue.length]=this.Queue[i]; 	} 	Queue[Queue.length]=null; 	for(i=Queue.length-1;i>this._Drops.nArrival;i--)Queue[i]=Queue[i-1]; 	Queue[this._Drops.nArrival]=this.Queue[this._Drops.nDepart]; 	Rect=this._mapping(Queue,this.nColumns,this.nDistance); 	for(i=0;i<Queue.length;i++){ 		if(i!=this._Drops.nArrival){ 			Queue[i].style.left=Rect[i].X+'px';Queue[i].style.top=Rect[i].Y+'px';Queue[i].style.zIndex=this.zIndex+i; 		}else if(element!=null){ 			element.style.left=Rect[i].X;element.style.top=Rect[i].Y;element.style.zIndex=this.zIndex+i; 		} 	}; 	return {Nodes:Queue,Rect:Rect} }; /** * */

 xwzSwapRotation.prototype.departDrag=function(_index){ 	window.focus(); 	if(this.Event.whichButton(this.eventHandle)!==1){this.arrivalDrag();return false;} 	var s= this.getIndex(_index),z=0,sc=this.getScroll(); 	this._Drops.oAvailable=this.Nodes[s]; 	this.Queue=[]; 	this._notifyOpacity(this._Drops.oAvailable, 60); 	this._Drops.nArrival=this._Drops.nDepart=s; 	z=this._Drops.oAvailable.style.zIndex; 	this.oClone.style.zIndex=this._Drops.oAvailable.style.zIndex; 	this._Drops.oAvailable.style.zIndex=this.zIndex+(this.Nodes.length*1000); 	this.oClone.style.left=this._Drops.oAvailable.offsetLeft; 	this.oClone.style.top=this._Drops.oAvailable.offsetTop; 	this.oClone.style.width=this._Drops.oAvailable.offsetWidth; 	this.oClone.style.height=this._Drops.oAvailable.offsetHeight; 	this.oClone.style.display=''; 	this._Drops.dX=sc.left+this.Event.pointX(this.eventHandle)-parseInt(this.oClone.style.left); 	this._Drops.dY=sc.top+this.Event.pointY(this.eventHandle)-parseInt(this.oClone.style.top); 	this.Observers['mousemove']=new Function('__xwzSwapRotation[\''+this.sName+'\'].aviateDrag();'); 	this.Observers['mouseup']=new Function('__xwzSwapRotation[\''+this.sName+'\'].arrivalDrag();'); 	this.Event.add(window.document,'mouseup',this.Observers['mouseup']); 	this.Event.add(window.document,'mousemove',this.Observers['mousemove']); 	this.Queue=this.Nodes; 	window.document.onselectstart=new Function('return false'); }; /** * */

 xwzSwapRotation.prototype.aviateDrag=function(){ 	/**/

 	if(this.Event.whichButton(this.eventHandle)!==1&&this.Event.whichButton(this.eventHandle)!==19||this._Drops.oAvailable==null){this.arrivalDrag();return false;} 	var eX=this.eventHandle.pageX||this.eventHandle.clientX||0,eY=this.eventHandle.pageY||this.eventHandle.clientY||0; 	var i=0,sc=this.getScroll(),x=sc.left+eX-this._Drops.dX,y=sc.top+eY-this._Drops.dY; 	this._Drops.oAvailable.style.left=x+'px';this._Drops.oAvailable.style.top=y+'px'; 	var iY=Math.floor(this._Drops.nDepart/this.nColumns),cY=Math.abs(this.Atlas[this._Drops.nDepart].Y-y); 	var iX=Math.floor(this._Drops.nDepart%this.nColumns),cX=Math.abs(this.Atlas[this._Drops.nDepart].X-x); 	for(i=0;i<this.Atlas.length;i+=this.nColumns){if(cY>Math.abs(this.Atlas[i].Y-y)){cY=Math.abs(this.Atlas[i].Y-y);iY=Math.floor(i/this.nColumns);}}; 	for(i=0;i<this.nColumns;i++){if(cX>Math.abs(this.Atlas[i].X-x)){cX=Math.abs(this.Atlas[i].X-x);iX=Math.floor(i%this.nColumns);}}; 	this._Drops.nArrival=(iY*this.nColumns)+iX; 	this._Drops.nArrival=(this._Drops.nArrival>this.Queue.length-1)?this.Queue.length-1:this._Drops.nArrival; 	this._arrangeDrag(this.oClone); }; /** * */

 xwzSwapRotation.prototype.arrivalDrag=function(){ 	if(this.Observers['mouseup']!=null)this.Event.remove(window.document,'mouseup',this.Observers['mouseup']); 	if(this.Observers['mousemove']!=null)this.Event.remove(window.document,'mousemove',this.Observers['mousemove']); 	this.Observers['mouseup']=null;this.Observers['mousemove']=null;window.document.onselectstart=null; 	var oReturn=null,nPg=dX=dY=0; 	if(this._Drops.oAvailable!=null){/**/

 		if( this.Queue.length>0){ 			oReturn=this._arrangeDrag(this._Drops.oAvailable); 			this._notifyOpacity(this._Drops.oAvailable); 		}else{ 			nPg=Math.sin(1/this.nBaud*Math.PI/2); 			oReturn=this._arrangeDrag(); 			dX=this.Atlas[this._Drops.nArrival].X-parseInt(this._Drops.oAvailable.style.left);dY=this.Atlas[this._Drops.nArrival].Y-parseInt(this._Drops.oAvailable.style.top); 			this.Queue=[{style:this._Drops.oAvailable.style,posX:this.Atlas[this._Drops.nArrival].X,posY:this.Atlas[this._Drops.nArrival].Y,distX:Math.abs(dX),distY:Math.abs(dY),gridX:Math.round(nPg*dX),gridY:Math.round(nPg*dY)}]; 			this._notifyOpacity(this._Drops.oAvailable, this.nOpacity); 			this.aviate(); 		}; 		this.Nodes=oReturn.Nodes; 		this.Atlas=oReturn.Rect; 		this._Drops.oAvailable.style.zIndex=this.oClone.style.zIndex; 	} 	this.oClone.style.zIndex=-1;this.oClone.style.display='none'; 	this._Drops.dX=0;this._Drops.dY=0;this._Drops.nArrival=null;this._Drops.nDepart=null; 	this._Drops.oAvailable=null; 	this.Observers=[];/*drag drop정보*/

 };
