<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 수정</title>
</head>
<body>
	<div class="row">
		<div class="container col-md-12 col-sm-12 col-xs-12">
			<div class="col-md-12">
				<form class="col-md-12" action="edit.do" method="post">
					<input type="hidden" name="bdIdx" value='<c:out value="${boardVO.bdIdx}"></c:out>' />
					<br><br>
					<table class="col-md-12">
						<tr class="col-md-12">
							<td class="col-md-12" style="width:1900px;"><label class="col-md-6">글 제목<input class="form-control" type="text" name="bdTitle" value='<c:out value="${boardVO.bdTitle}"></c:out>' autocomplete="off"/></label></td>
						</tr>
						<tr class="col-md-12">
							<td class="col-md-12" style="width:1900px;"><label class="col-md-6">작성자<input class="form-control" type="text" name="bdWriter" value='<c:out value="${boardVO.bdWriter}"></c:out>' disabled/></label></td>
						</tr>
						<tr class="col-md-12">
							<td class="col-md-12" style="width:1900px;"><label class="col-md-6">글 내용<textarea class="form-control" name="bdCn" rows="35" style="border-radius: 4px; border: 1px solid #ccc;  height: 400px; overflow:auto;"><c:out value="${boardVO.bdCn}"></c:out></textarea></label></td>
						</tr>
					</table>
					<a href="list.do"><button type="button" class="button boot_btn-default" style="margin-top:50px;">목록</button></a>
					<button type="submit" class="button boot_btn-primary" style="margin-top:50px; margin-left:43%;">수정</button>
					<a href='delete.do?bdIdx=<c:out value="${boardVO.bdIdx}"></c:out>'><button type="button" class="button boot_btn-warning" style="margin-top:50px; margin-left:10px;">삭제</button></a>
				</form>
			</div>
		</div>
	</div>
	<c:import url="boardReply.jsp"></c:import> 
</body>
</html>