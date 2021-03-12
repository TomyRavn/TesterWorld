<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html lang="ko" style="width: 99%; background: #FFF;">
<head>
<meta charset="UTF-8">

<!-- jQuery -->
<script src="<c:url value="/home/jquery/dist/jquery.min.js"/>"></script>

<!-- JQuery 1.12 -->
<script src="<c:url value="/template/common/js/jquery/jquery-ui-1.12.1.js"/>"></script>

<!-- JQuery CSS -->
<link rel="stylesheet" href="<c:url value="/template/common/css/jquery/jquery-ui-1.12.1.css"/>">

<!-- BootStrap -->
<link rel="stylesheet" href='<c:url value="/home/bootstrap/dist/css/bootstrap.min.css" />' />

<!-- BootStrap.js -->
<script src='<c:url value="/home/bootstrap/dist/js/bootstrap.min.js"/>'></script>

<!-- jstree CSS -->
<link rel="stylesheet" href="<c:url value="/home/jstree/dist/themes/default/style.min.css"/>" />

<!-- jstree.js -->
<script src="<c:url value="/home/jstree/dist/jstree.min.js"/>"></script>

<script>
	<% if(request.getSession().getAttribute("message") != null){ %>
		alert('<%=request.getSession().getAttribute("message")%>');
	<% } request.getSession().setAttribute("message", null); %>
</script>
	
</head>
<body>

</body>
</html>