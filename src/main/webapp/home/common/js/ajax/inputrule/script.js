

function langChk(obj){
	var rule = obj.rel;
	var value = obj.value;
	var str = lastLan(value);
	var chk = false;
	var alertStr = "";
	var returnStr = "";
	if(rule){
		if(rule.indexOf("en") < 0 && !chk && str){
			chk = isAlphabet(str);
			returnStr = "���� ";
		}
		if(rule.indexOf("int") < 0 && !chk && str){
			chk = isNumber(str);
			returnStr += "���� ";
		}
		if(rule.indexOf("kr") < 0 && !chk && str){
			chk = isKorean(str);
			returnStr += "�ѱ� ";
		}
	}

	if(chk){
		alert("' "+returnStr + "' �� �Է��� �Ұ����մϴ�.");
		obj.value = "";
	}
}

/* --------------------------------------------------
   ���ĺ����� üũ
  ------------------------------------------------*/
function isAlphabet(ch) {
   var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
   if ( 65 <= numUnicode && numUnicode <= 90 ) return true;            // �빮��
   if ( 97 <= numUnicode && numUnicode <= 122 ) return true;            // �ҹ���
   return false;
}

/* --------------------------------------------------
   �ѱ����� üũ
  ------------------------------------------------*/
function isKorean(ch) {
   var numUnicode = ch.charCodeAt(0);
   if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;            
   return false;
}
  

/* --------------------------------------------------
   �������� üũ
  ------------------------------------------------*/
function isNumber(ch) {
   var numUnicode = ch.charCodeAt(0);                                                                                    
   if ( 48 <= numUnicode && numUnicode <= 57 ) return true;            
   return false;
}

//������ ���� ����
function lastLan(val){
	var length = val.length;
	var str = val.substr(length-1,length);
	return str;
}
