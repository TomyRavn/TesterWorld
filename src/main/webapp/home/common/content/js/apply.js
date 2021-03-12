//채용공고 지원
function applySubmit(rct_code, cpy_code, apt_code, apt_act){  //  채용코드, 기업코드, 적성검사번호, 적성검사바로실행여부

		
	var allData = {"rct_code":rct_code, "cpy_code":cpy_code,  "apt_code":apt_code, "apt_act":apt_act  };
	
	
	//포트포리오 첨부요청여부
	$.ajax({      
		type:"POST",  
		url:"/_prog/recruit/ajax_meminfo.php",   
		data: allData,
		dataType:"json",
		async: false,
		success:function(data){  
			ptf_pass = data['ptf_pass'];
			profile = data['profile'];
		},   
		error:function(e){  
			alert(e.responseText);  
		}  
	}); 

	if(profile == 'N'){
		alert('프로필이 등록되어있지 않습니다 \n프로필등록후 지원해주시기 바랍니다.');
		location.href="/_prog/profile/index.php?mode=W&site_dvs_cd=kr&menu_dvs_cd=03";
	}

	if(ptf_pass == 'N'){
		alert('포트폴리오 첨부요청이 필수인 채용공고입니다.\n프로필관리에서  포트폴리오 파일을 첨부하시고 지원해 주시기 바랍니다.');
		return false;
	}

	
	//중복확인
	$.ajax({      
		type:"POST",  
		url:"/_prog/recruit/ajax_overlap.php",   
		data: allData,
		dataType:"json",
		async: false,
		success:function(data){  
			overlap = data['overlap'];
		},   
		error:function(e){  
			alert(e.responseText);  
		}  
	}); 
	

	 
	if(overlap == 'Y'){
		alert('지원내역이 존재합니다. 중복지원 불가합니다');
		return false;
	}else{
		var apply = confirm('지원하시겠습니까?');
	}

	
	if(apply == true){
		$.ajax({      
			type:"POST",  
			url:"/_prog/recruit/ajax_apply.php",   
			data: allData,
			dataType:"json",
			async: false,
			success:function(data){  
				alert(data['stat']);
			},   
			error:function(e){  
				alert(e.responseText);  
			}  
		});  

		if(apt_act =='Y'){ //적성검사바로 실행시
			location.href='/_prog/company/?mode=V&site_dvs_cd=kr&menu_dvs_cd=01&rno='+apt_code+'&ptype=apt&rct_code='+rct_code+'&cpy_code='+cpy_code;
		}else{
			return false;
		}
		return false;
		
	}else{
		return false;
	}
}
