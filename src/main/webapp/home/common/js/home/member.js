var emailchk = false;

function emailChange(){
	if(emailchk){
		$('#id_chk_div').css('color','#ff0000');
		$('#id_chk_msg').text('이메일이 변경되었습니다. 다시 중복확인을 실행하여 주세요.');
	}
	emailchk = false;
}

//이메일 정규식 확인
function emailRegex(email) {
	var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return (email != '' && email != 'undefined' && regex.test(email));
}

function idChk(){
	var frm = $('#inputFrm2');
	var mb_id = document.inputFrm2.mb_id;
	if(!mb_id.value) {
		alert('이메일을 입력해 주세요.');
		return false;
	}
	
	if(!emailRegex(mb_id.value)){
		alert('이메일 형식에 맞게 입력해주세요.');
		return false;
	}
	
	$.ajax({
		type:'POST',
		dataType:'json',
		data:frm.serialize(),
		url:'/email_check.json',
		success:function(data){
			if(data=='notoverlap'){
				$('#id_chk_div').css('display','inline');
				$('#id_chk_div').css('color','#008f00');
				$('#id_chk_msg').text('사용 가능한 이메일 주소 입니다.');
				emailchk = true;
			}else{
				$('#id_chk_div').css('display','inline');
				$('#id_chk_div').css('color','#ff0000');
				$('#id_chk_msg').text('중복되는 이메일 주소 입니다.');
			}
		},error:function(error){
			alert('서버와 연결에 실패하였습니다.(ERROR CODE : '+error.status+')');
		}
	});

}
