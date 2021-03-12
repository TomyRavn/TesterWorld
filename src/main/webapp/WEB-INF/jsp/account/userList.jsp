<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<c:import url="/template/modal_top.do" charEncoding="utf-8" />
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 관리</title>
<style>
th,td {
	border: 1px solid black;
	text-align: center;
}
li{
	list-style:none;
	display:inline-block;
}
.active{
	font-weight:900;
}
a, a:hover{
	color:black;
	text-decoration:none;
}
.valTd{
	height : 30px;
}
</style>
</head>
<body>
	<div class="row">
		<div class="container col-md-12 col-sm-12 col-xs-12">
			<table style="width:98%; height: 100px; padding: 8px; margin:0 auto;">
				<colgroup>
					<col width="10%" />
					<col width="20%" />
					<col width="10%" />
					<col width="10%" />
					<col width="15%" />
					<col width="10%"  />
					<col width="10%" />
					<col width="15%" />
				</colgroup>
				<thead>
					<tr>
						<td colspan="8"><h1><a href="list.do">회원 목록</a></h1></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th><a href="?page=${pager.page}&${pager.query}&header=0&order=${pager.header == 0 ? (pager.order + 1) % 2 : 0}">회원 ID</a></th>
						<th>이메일</th>
						<th>연락처</th>
						<th>이름</th>
						<th><a href="?page=${pager.page}&${pager.query}&header=1&order=${pager.header == 1 ? (pager.order + 1) % 2 : 0}">가입일시</a></th>
						<th><a href="?page=${pager.page}&${pager.query}&header=2&order=${pager.header == 2 ? (pager.order + 1) % 2 : 0}">가입IP</a></th>
						<th>등급</th>
						<th>관리</th>
					</tr>
					<c:forEach var="result"  items="${accountList}">
						<tr>
							<td class="valTd"><c:out value="${result.userId}" /></td>
							<td class="valTd"><c:out value="${result.userEm}" /></td>
							<td class="valTd"><c:out value="${result.userTel}" /></td>
							<td class="valTd"><c:out value="${result.userNm}" /></td>
							<td class="valTd"><c:out value="${result.insDttm}" /></td>
							<td class="valTd"><c:out value="${result.insIp}" /></td>
							<td class="valTd">
								<c:if test="${result.userAuth eq 'N'}"><c:out value="일반 사용자" /></c:if>
								<c:if test="${result.userAuth eq 'M'}"><c:out value="운영자" /></c:if>
								<c:if test="${result.userAuth eq 'A'}"><c:out value="시스템관리자" /></c:if>
							</td>
							<td class="valTd">
								<c:if test="${(result.userAuth ne 'A' && authority eq 'A') || (result.userAuth ne 'A') && (result.userAuth ne 'M' && authority eq 'M') && authority ne 'N' || userIdx eq result.userIdx}">
									<a href='edit.do?userId=<c:out value="${result.userId}"></c:out>'><button type="button" class="button boot_btn-primary">수정</button></a>
								</c:if>
								<c:if test="${(result.userAuth ne 'A' && authority eq 'A') || (result.userAuth ne 'A') && (result.userAuth ne 'M' && authority eq 'M') && authority ne 'N'}">
									<a href='upgrade.do?userId=<c:out value="${result.userId}"></c:out>'><button type="button" class="button boot_btn-success">▲</button></a>
								</c:if>
								<c:if test="${((result.userAuth ne 'A' && authority eq 'A') || (result.userAuth ne 'A') && (result.userAuth ne 'M' && authority eq 'M') && authority ne 'N') && result.userAuth ne 'N'}">
									<a href='downgrade.do?userId=<c:out value="${result.userId}"></c:out>'><button type="button" class="button boot_btn-warning">▼</button></a>
								</c:if>
								<c:if test="${(result.userAuth ne 'A' && authority eq 'A') || (result.userAuth ne 'A') && (result.userAuth ne 'M' && authority eq 'M') && authority ne 'N' || userIdx eq result.userIdx}">
									<button type="button" class="button boot_btn-danger" style="margin-left:30px;" onClick='DeleteUser("${result.userId}")'>삭제</button>
								</c:if>
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		
		<div class="container col-md-12">
			<ul style="margin-top:50px; text-align: center;">
				<li><a href="?page=1&${pager.query}&${pager.sort}">[처음]</a></li>
				<li><a href="?page=${pager.prev}&${pager.query}&${pager.sort}">[이전]</a></li>
						
				<c:forEach var="page" items="${pager.list}">
					<li class="${page == pager.page ? 'active' : ''}"><a href="?page=${page}&${pager.query}&${pager.sort}">[${page}]</a></li>
				</c:forEach>
				
				<li><a href="?page=${pager.next}&${pager.query}&${pager.sort}">[다음]</a></li>
				<li><a href="?page=${pager.last}&${pager.query}&${pager.sort}">[마지막]</a></li>
			</ul>
		</div>
		
		<div class="container col-md-12">
			<div class="col-md-3" style="float:left; margin-top:20px; margin-left:100px;">
				<form method="get" action="">
					<select name="search" style="height:30px;">
						<option value="">선택</option>
						<option value="a" ${pager.search.equals("a")? 'selected' : ''}>전체</option>
						<option value="b" ${pager.search.equals("b")? 'selected' : ''}>ID</option>
						<option value="c" ${pager.search.equals("c")? 'selected' : ''}>이메일</option>
						<option value="d" ${pager.search.equals("d")? 'selected' : ''}>연락처</option>
						<option value="e" ${pager.search.equals("e")? 'selected' : ''}>이름</option>
					</select>
					<input type="text" name="keyword" style="height:30px;" value='<c:out value="${pager.keyword}"></c:out>' placeholder="검색어를 입력해주세요"/>
					<button type="submit" class="button boot_btn-brown">검색</button>
				</form>
			</div>
			<div class="col-md-9"></div>
		</div>
	</div>
	
	<script>
		function DeleteUser(userId){
			if(confirm("'"+userId+"' 회원을 삭제하시겠습니까?")){
				$.ajax({
					url : "deleteAjax.do",
					type : "post",
					data : {
						"userId" : userId
					},
					success : function(data){
						if(data.result == 'success'){
							alert('회원 삭제가 완료되었습니다.');
							location.href="list.do";
						}else if(data.result == 'error'){
							alert('회원 삭제를 실패하였습니다.')
							location.href="list.do";
						}else{
							location.href = "../main.do";
						}
					},
					error:function(request,status,error){
	            		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				});
			}
		}
	</script>
</body>
</html>