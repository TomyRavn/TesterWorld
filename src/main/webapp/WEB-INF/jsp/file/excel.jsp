<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />	

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>엑셀 파일</title>
	<style>
		table{
			border-collapse:collapse;
		}
		td{
			border:1px solid black;
			width:150px;
		}
	</style>
</head>
<body>
	<div>
		<a title="엑셀 다운로드" href="excel/download.do"><button type="button">엑셀 다운로드</button></a>
		<div>
			<ul class="nav navbar-right panel_titlebox">
				<li><a class="collapse-link" href="<c:url value="../main.do"/>">HOME</a></li>
				<li><div>&#62;</div></li>
				<li><a class="collapse-link" href="<c:url value="excel.do"/>">엑셀 읽기</a></li>
			</ul>
		</div>
	
		<div>
			<form name="fileForm" method="post" enctype="multipart/form-data">
				<table id="excelCnt">
					<c:forEach var="i" items="${excelContent}" varStatus="st">
						<tr>	
							<c:forEach var="j" items="${excelContent[st.index]}" varStatus="status">
								<td class="tableValue">${i[status.index]}</td>
							</c:forEach>
						</tr>
					</c:forEach>
				</table>
				
				<input id="excelFile" type="file" name="userFile" />
				<button type="button" onclick="fileDownload()">다운로드</button>
			</form>
		</div>
	</div>
	
	<script type="text/javascript">
		$(document).ready(function(){
			var tableValue = document.getElementsByClassName("tableValue");
			
			for(var i = 0 ; i < tableValue.length; i++){
				if(tableValue[i].innerHTML == "0"){
					tableValue[i].innerHTML = "";
				}
			}
		});
		
		
		function fileDownload(){
			var userFile = document.fileForm;
			
			userFile.action = "download.do";
			userFile.submit();
		}
	</script>
</body>
</html>