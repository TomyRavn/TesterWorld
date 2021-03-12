<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<html>
<head>
<meta charset="UTF-8">
<title>코드 등록</title>
</head>
<body>
	<div>
		<form action="regist.do" method="post">
			
			<h1>코드를 등록해주세요</h1>
			
			<select name="upperCodeIdx" class="form-control">
				<option value="">선택</option>
				<c:forEach var="result" items="${upperCodeList}" varStatus="status">
					<option value="${result.codeIdx}" 
					<c:if test="${result.codeIdx eq upperCodeIdx}">
						selected="selected"
					</c:if>>
						<c:forEach begin="1" end="${result.level}" step="1">
							&nbsp;&nbsp;&nbsp;&nbsp;
						</c:forEach>
						<c:out value="${result.codeNm}"/> (<c:out value="${result.level}"/> Depth)
					</option>
				</c:forEach>
			</select>
			<input style="padding: 8px 0; margin-top : 8px;" name="codeNm" placeholder="코드명을 입력해주세요." />
			<input style="padding: 8px 0; margin-top : 8px; width:400px;" name="codeCn" placeholder="코드 내용을 입력해주세요." />
			
			<input type="hidden" id="reloadValue" name="reloadValue" value="${reloadState}"/>
			<button type="submit" class="boot_btn boot_btn-primary register" style="padding: 8px 0; width:98px;">등록</button>
			
		</form>
	</div>
</body>

<script>
	$(document).ready(function() {
		
		console.log($('#reloadValue').val());
		
		if($('#reloadValue').val() == 1){
			parent.location.reload();
		}
		
	});
</script>
</html>