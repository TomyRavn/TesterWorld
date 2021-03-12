<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시판</title>
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
</style>
</head>
<body>
	<div class="row">
		<div class="container col-md-12 col-sm-12 col-xs-12">
			<table style="width:98%; height: 100px; padding: 8px; margin:0 auto;">
				<colgroup>
					<col width="5%" />
					<col width="55%" />
					<col width="5%" />
					<col width="5%" />
					<col width="10%" />
					<col width="15%" />
					<col width="5%" />
				</colgroup>
				<thead>
					<tr>
						<td colspan="7"><h1><a href="list.do">게시판</a></h1></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th><a href="?page=${pager.page}&${pager.query}&header=0&order=${pager.header == 0 ? (pager.order + 1) % 2 : 0}">글번호</a></th>
						<th>제목</th>
						<th>조회수</th>
						<th>Like</th>
						<th>등록자</th>
						<th><a href="?page=${pager.page}&${pager.query}&header=1&order=${pager.header == 1 ? (pager.order + 1) % 2 : 0}">등록일</a></th>
						<th>관리</th>
					</tr>
					<c:forEach var="result"  items="${boardList}">
						<tr>
							<td><c:out value="${result.bdIdx}" /></td>
							<td><a href="edit.do?bdIdx=${result.bdIdx}"><c:out value="${result.bdTitle}" /></a> <a href="reply.do?repRefBdIdx=${result.bdIdx}" style="color:orange;"><c:out value=" [${result.replyCnt}]"/></a> </td>
							<td><c:out value="${result.bdCount}"/></td>
							<td></td>
							<td><c:out value="${result.bdWriter}" /></td>
							<td><c:out value="${result.bdRegDate}" /></td>
							<td><a href='delete.do?bdIdx=<c:out value="${result.bdIdx}"></c:out>'><button type="button" class="button boot_btn-warning">삭제</button></a></td>
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
						<option value="b" ${pager.search.equals("b")? 'selected' : ''}>제목</option>
						<option value="c" ${pager.search.equals("c")? 'selected' : ''}>등록자</option>
						<option value="d" ${pager.search.equals("d")? 'selected' : ''}>글번호</option>
					</select>
					<input type="text" name="keyword" style="height:30px;" value='<c:out value="${pager.keyword}"></c:out>' placeholder="검색어를 입력해주세요"/>
					<button type="submit" class="button boot_btn-brown">검색</button>
				</form>
			</div>
			<div class="col-md-6"></div>
			<div class="col-md-1" style="float:right; margin-top:20px;">
				<a href="regist.do"><button type="button" class="button boot_btn-primary">글 등록</button></a>
			</div>
			<div class="col-md-2" style="float:right; margin-top:20px;">
				<a href="dummy.do"><button type="button" class="button boot_btn-danger">더미 데이터 생성</button></a>
			</div>
		</div>
	</div>
</body>
</html>