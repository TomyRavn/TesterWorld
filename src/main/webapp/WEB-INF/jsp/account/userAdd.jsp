<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<c:import url="/template/modal_top.do" charEncoding="utf-8" />
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
	<style>
		.tableTd{
			padding: 5px;
		}
		input{
			width: 100%;
			display:table; 
			margin-left:auto; 
			margin-right:auto;
		}
	</style>
</head>
<body>
	<div class="container col-md-12 col-sm-12 col-xs-12" style="padding:100px 0px;">
		<form id="userForm" action="../user/add.do" method="post">
			<table style="width: 30%; height: 100%; padding 8px; margin: 0 auto; ">
				<colgroup>
					<col width=15%/>
					<col width=60%/>
					<col width=25%/>
				</colgroup>
				<thead><tr><td colspan="3"><h1 style="text-align:center; font-weight:bold;">회원가입</h1></td></tr></thead>
				<tbody>
					<tr>
						<th class="tableTd"><span style="color:red;">*</span> 아이디</th>
						<td class="tableTd"><input type="text" id="userId" name="userId" maxlength="50" placeholder="아이디를 입력해주세요." autocomplete="off" onkeydown="inputIdChk()" onfocus="buttonInit()"/></td>
						<td class="tableTd">
							<button type="button" onClick="idDuplicateCheck()">중복확인</button>
							<input type="hidden" id="idDuplication" name="idDuplication" value="idUncheck"/>
							<input type="hidden" id="idDuplVal" name="idDuplVal" value="-1"/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td id="idCheckResult" style="display:none;"></td>
						<td></td>
					</tr>
					<tr>
						<th class="tableTd"><span style="color:red;">*</span> 비밀번호</th>
						<td class="tableTd"><input type="password" name="userPw" maxlength="50" placeholder="비밀번호를 입력해주세요." onfocus="buttonInit()"/></td>
						<td class="tableTd"></td>
					</tr>
					<tr>
						<th class="tableTd">이메일</th>
						<td class="tableTd"><input type="text" name="userEm" maxlength="100" placeholder="이메일을 입력해주세요." autocomplete="off" onfocus="buttonInit()"/></td>
						<td class="tableTd"></td>
					</tr>
					<tr>
						<th class="tableTd">전화번호</th>
						<td class="tableTd"><input type="text" name="userTel" maxlength="13" placeholder="전화번호를 입력해주세요." autocomplete="off" onfocus="buttonInit()"/></td>
						<td class="tableTd"></td>
					</tr>
					<tr>
						<th class="tableTd"><span style="color:red;">*</span> 이름</th>
						<td class="tableTd"><input type="text" name="userNm" maxlength="20" placeholder="이름을 입력해주세요." autocomplete="off" onfocus="buttonInit()"/></td>
						<td class="tableTd"></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td colspan="1">
							<button type="button" class="boot_btn-primary boot_btn-lg" style="margin-left:110px;" onClick="registUser()">등록</button>
							<button type="button" class="boot_btn-danger boot_btn-lg" style="margin:20px 30px;" onClick="location.href='..'">취소</button>
						</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
		</form>
	</div>
	
	<script>
		window.onload = init();
		
		function registUser(){
			$.ajax({
				type : "post",
				url : "addAjax.do",
				data : $('#userForm').serialize(),
				success : function(data){
					console.log(data);
					
					if(data == 'success'){
						alert("회원가입이 완료되었습니다.");
						location.href="..";
					}else if(data == 'idUncheck'){
						alert("아이디 중복체크를 해주세요.");
					}else if(data == 'idEmpty'){
						alert("아이디를 입력해주세요.");
					}else if(data== 'pwEmpty'){
						alert("비밀번호를 입력해주세요.");
					}else if(data == 'nmEmpty'){
						alert("이름을 입력해주세요.");
					}
					
				},
				error : function(request,status,error){
        			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  				}
			});
		}
	
		function idDuplicateCheck(){
			var html = "";
			$('#idDuplication').val("idCheck");
			
			$.ajax({
	  	  		type:"post",
	 	  		url : "idCheckAjax.do",
	 	  		data:{
	 	  			userId : $('#userId').val()
	 	  		},
	    	    	success : function(data){
	    	    		$('#idCheckResult').attr('style','display:block;');
	    	    		
	    	    		if(data > 0) html += "<h6 style='color:red; margin-left:30px;'><strong>이미 사용중인 아이디입니다.</strong></h6>";
	    	    		else if(data == 0) html += "<h6 style='color:green; margin-left:30px;'><strong>사용 가능한 아이디입니다.</strong></h6>";
	    	    		else html += "<h6 style='color:red; margin-left:30px;'><strong>아이디를 입력하지 않았습니다.</strong></h6>"
	    	    		
	    	    		$('#idCheckResult').html(html);
	    	    		$('#idDuplVal').val(data);
	 				},
	    			error:function(request,status,error){
	            		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	      		}
			});	
		}
		
		function buttonInit(){
			if($('#idDuplVal').val() == 0)
				$('#idCheckResult').attr('style','display:none;');
		}
		
		function init(){
			$('#idCheckResult').attr('style','display:none;');
			$('#idDuplication').val("idUncheck");
		}
		
		function inputIdChk(){
			$('#idDuplication').val("idUncheck");
		}
	</script>
</body>
</html>