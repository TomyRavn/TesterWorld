<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<html>
<head>
<meta charset="UTF-8">
<title>메인 페이지</title>
</head>
<body>
	<div>
		<div style="float:right;">
			<h5 style="display:inline;"><span><strong>${userNm}</strong></span>님, 안녕하세요. </h5>
			<a href="user/logout.do"><button type="button">로그아웃</button></a>
			<br>
			<a href="user/edit.do?userId=${userId}"><button type="button" style="margin-top: 20px; float:right;">회원정보수정</button></a>
		</div>
		<div>
			<ul>
				<c:if test="${userAuth eq 'A' || userAuth eq 'M'}">
					<li>회원 관리 페이지 : <a href="user/list.do"><button>회원 관리</button></a></li>
				</c:if>
				<li>코드 관리 페이지 : <a href="code/list.do"><button>코드 관리</button></a></li>
				<li>파일 관리 페이지 : <a href="file/excel.do"><button>엑셀파일 관리</button></a></li>
				<li>게시판 : <a href="board/list.do"><button>게시판</button></a></li>
			</ul>
		</div>
	</div>
	
	<script type="text/javascript">
		
	</script>
</body>
</html>