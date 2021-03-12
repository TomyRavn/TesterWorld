<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 등록</title>
	<style>
		.form-control{
			width:500px;
		}
	</style>
</head>
<body>
	<div class="row">
		<div class="col-md-12 col-sm-12 col-xs-12">
			<div class="col-md-12">
				<form action="regist.do" method="post">
					<table style="width: 80%; height: 500px; vertical-align: center; position:absolute; top:50%; left:10%;">
						<tr>
							<td><label>글 제목<input class="form-control" type="text" name="bdTitle" placeholder="글 제목을 입력해주세요." autocomplete="off"/></label></td>
						</tr>
						<tr>
							<td><label>작성자<input class="form-control" type="text" name="bdWriter" placeholder="글 작성자를 입력해주세요." autocomplete="off"/></label></td>
						</tr>
						<tr>
							<td><label>글 내용<textarea class="form-control" name="bdCn" rows="35" style="border-radius: 4px; border: 1px solid #ccc;  height: 400px; overflow:auto;"></textarea></label></td>
						</tr>
					</table>
					<button type="submit" class="button boot_btn-primary" style="position:absolute; margin-top:650px; margin-left:40%;">게시</button>
				</form>
			</div>
		</div>
	</div>
</body>
</html>