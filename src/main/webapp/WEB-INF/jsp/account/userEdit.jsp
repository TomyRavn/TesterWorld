<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원정보수정</title>
<style>
	input{
			width: 80%;
			display:table;
			margin-right:auto;
		}
	a, a:visited, a:hover{
		color: black;
	}
</style>
</head>
<body>
	<div class="container col-md-12 col-sm-12 col-xs-12" style="padding:100px 0px;">
		<form id="userEditForm" action="../user/edit.do" method="post">
			<table style="width: 30%; height: 100%; padding 8px; margin: 0 auto; ">
				<colgroup>
					<col width=25%/>
					<col width=75%/>
				</colgroup>
				<thead>
					<tr>
						<td colspan="2" style="text-align:center;"><h1>회원정보수정</h1></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th class="tableTd">아이디</th>
						<td class="tableTd">
							<input type="text" id="userId" value="<c:out value='${accountVO.userId}'/>" disabled/><input type="hidden" name="userId" value="<c:out value='${accountVO.userId}'/>"/>
						</td>
					</tr>
					<tr>
						<th class="tableTd">이메일</th>
						<td class="tableTd"><input type="text" name="userEm" maxlength="100" value="<c:out value='${accountVO.userEm}'/>" autocomplete="off"/></td>
					</tr>
					<tr>
						<th class="tableTd">전화번호</th>
						<td class="tableTd"><input type="text" name="userTel" maxlength="13" value="<c:out value='${accountVO.userTel}'/>" autocomplete="off"/></td>
					</tr>
					<tr>
						<th class="tableTd"><span style="color:red;">*</span> 이름</th>
						<td class="tableTd"><input type="text" name="userNm" maxlength="20" value="<c:out value='${accountVO.userNm}'/>" autocomplete="off"/></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td colspan="1">
							<button type="submit" class="boot_btn-primary boot_btn-lg" style="margin-left:75px;">수정</button>

							<c:choose>
							<c:when test="${(authority eq 'A' || authority eq 'M') && userIdx ne accountVO.userIdx}">
								<button type="button" class="boot_btn-danger boot_btn-lg" style="margin:60px 30px;" onClick="location.href='list.do'">취소</button>
							</c:when>
							<c:otherwise>
								<button type="button" class="boot_btn-danger boot_btn-lg" style="margin:60px 30px;" onClick="location.href='../main.do'">취소</button>
							</c:otherwise>
						</c:choose>
						</td>
					</tr>
					<tr>
						<td>
							<a href='changePw.do?userId=<c:out value="${accountVO.userId}"></c:out>'>
								<button type="button" style="margin-left:10%; width:60%;">비밀번호 변경하기 </button>
							</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</form>
	</div>
</body>
</html>