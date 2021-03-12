

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
			returnStr = "영문 ";
		}
		if(rule.indexOf("int") < 0 && !chk && str){
			chk = isNumber(str);
			returnStr += "숫자 ";
		}
		if(rule.indexOf("kr") < 0 && !chk && str){
			chk = isKorean(str);
			returnStr += "한글 ";
		}
	}

	if(chk){
		alert("' "+returnStr + "' 는 입력이 불가능합니다.");
		obj.value = "";
	}
}

/* --------------------------------------------------
   알파벳인지 체크
  ------------------------------------------------*/
function isAlphabet(ch) {
   var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
   if ( 65 <= numUnicode && numUnicode <= 90 ) return true;            // 대문자
   if ( 97 <= numUnicode && numUnicode <= 122 ) return true;            // 소문자
   return false;
}

/* --------------------------------------------------
   한글인지 체크
  ------------------------------------------------*/
function isKorean(ch) {
   var numUnicode = ch.charCodeAt(0);
   if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;            
   return false;
}
  

/* --------------------------------------------------
   숫자인지 체크
  ------------------------------------------------*/
function isNumber(ch) {
   var numUnicode = ch.charCodeAt(0);                                                                                    
   if ( 48 <= numUnicode && numUnicode <= 57 ) return true;            
   return false;
}

//마지막 글자 추출
function lastLan(val){
	var length = val.length;
	var str = val.substr(length-1,length);
	return str;
}
