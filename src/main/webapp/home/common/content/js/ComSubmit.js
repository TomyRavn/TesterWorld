function ComSubmit(opt_formId) {
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.url = "";
	this.target = "";  
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.addParam = function addParam(key, value){
		if($("input[name='"+key+"']","#"+this.formId).length > 0 ){
			$("#"+key,"#"+this.formId).val(value);
		}else{  
			$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
		}
	};
	
	this.setParam = function setParam(key, value) {
		if($('#' + key).val()) {
			$('#' + key).val(value);
		
		} else {
			$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
		}
	}
	
	this.setTarget = function setTarget(target) {
		this.target = target;
	}
	
	this.submit = function submit(){
		var frm = $("#"+this.formId)[0];
		frm.action = this.url;
		frm.method = "get";
		
		if(this.target != "") {
			frm.target = this.target;
		}
		
		frm.submit();	
	};
}

function ComSubmitPost(opt_formId) {
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.url = "";
	this.target = "";  
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.addParam = function addParam(key, value){
		if($("input[name='"+key+"']","#"+this.formId).length > 0 ){
			$("#"+key,"#"+this.formId).val(value);
		}else{  
			$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
		}
	};
	
	this.setParam = function setParam(key, value) {
		if($('#' + key).val()) {
			$('#' + key).val(value);
		
		} else {
			$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
		}
	}
	
	this.setTarget = function setTarget(target) {
		this.target = target;
	}
	
	this.submit = function submit(){
		var frm = $("#"+this.formId)[0];
		frm.action = this.url;
		frm.method = "post";
		
		if(this.target != "") {
			frm.target = this.target;
		}
		
		frm.submit();	
	};
}

function gfn_isNull(str) {
	if (str == null) return true;
	if (str == "NaN") return true;
	if (new String(str).valueOf() == "undefined") return true;    
    var chkStr = new String(str);
    if( chkStr.valueOf() == "undefined" ) return true;
    if (chkStr == null) return true;    
    if (chkStr.toString().length == 0 ) return true;   
    return false; 
}