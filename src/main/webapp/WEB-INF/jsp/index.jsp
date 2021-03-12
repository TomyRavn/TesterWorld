<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<html>
<head>
	<title>로그인</title>
	<style>
		table{
			width : 400px;
			margin: 0 auto;
			margin-top: 15%;
		}
		input{
			width: 100%;
			display:table; 
			margin-left:auto; 
			margin-right:auto;
		}
		h4{
			font-weight: bold;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="container col-md-12 col-sm-12 col-xs-12">
		<form name="loginForm">
			<table>
				<colgroup>
					<col width=10%;>
					<col width=90%;>
				</colgroup>
				<thead>
					<tr>
						<td colspan="2" style="text-align: center;"><h1>TESTER WORLD</h1></td>
					</tr>
				</thead>
				<tbody>
	 				<tr>
	 					<td>
	 						<h4>ID</h4>
	 					</td>
						<td>
							<input type="text" name="userId" id="userId" placeholder="ID를 입력해주세요" autocomplete="off"/>
						</td>
					</tr>
					<tr>
						<td>
	 						<h4>PW</h4>
	 					</td>
						<td>
							<input type="password" name="userPw" id="userPw" placeholder="비밀번호를 입력해주세요" />
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<button type="button" class="boot_btn-primary boot_btn-lg" id="loginButton" style="margin: 20px 0 0 22%;">로그인</button>
							<a href="user/add.do"><button type="button" class="boot_btn-primary boot_btn-lg" style="margin: 20px 0 0 8%;">회원가입</button></a>
						</td>
					</tr>	
				</tbody>
			</table>
		 </form>	
	</div>
	
	<script type="text/javascript">
		$('#loginButton').click(function(){
			login();
		});
	
		$('.container').keydown(function(event){
			if(event.which == 13){
				$('#loginButton').click();
				return false;
			}
		});
	
		function login() {
			$.ajax({
				url : '<c:url value="/user/loginAjax.do"/>',
				type : "post",
				data : $("form[name=loginForm]").serialize(),
				dataType : "json",
				success : function(data){
					console.log(data);
					
					if(data.result == 'success'){
						location.href = '<c:url value="/main.do"/>'
					}else if(data.result == 'fail'){
						alert('로그인에 실패하였습니다.');
					}else{
						alert('시스템 오류가 발생하였습니다.\n다시 시도해주세요.');
					}
				},
				error : function(){
					alert('시스템 오류가 발생하였습니다.');
				}
			});
		}
	</script>
</body>
</html>