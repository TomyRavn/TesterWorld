<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />

<script type="text/javascript">
	window.onload = function() {
		$('#jstree').jstree({
			"core" : {
			    "animation" : 0,
		    	"check_callback" : true,
		    	"themes" : { "stripes" : true },
		    	"data" : ${codeList},
			}
		});
		
		$("#jstree").on('loaded.jstree', function() {
			$("#jstree").jstree("open_node", $("#"+"<c:out value='${select1Depth}' />"));
			$("#jstree").jstree("open_node", $("#"+"<c:out value='${select2Depth}' />"));
		});
		
		$('#jstree').on("changed.jstree", function (e, data) {
		  		$('#subIframe').prop('src', "regist.do?codeIdx="+data.selected);
		});
	}
	
	//수정 작업중
// 	$("#subIframe", parent.document).load("list", function(){
// 		   document.reload();
// 	});
</script>

<html>
<head>
<meta charset="UTF-8">
<title>코드 리스트</title>
</head>
<body>
	<div>
		<div class="row">
			<div class="col-md-12">		
				<table id="datatable" class="col-md-3" style="height: 640px;width: 40%;margin-right: 0.5%;">
					<colgroup>
						<col width="100%"/>
					</colgroup>
					<caption class="hdn">코드 관리</caption>
					<thead>
						<tr>
							<th style="padding:15px 0;border-right: none;text-align: center;background-color: #405467;color:#FFF;">Code Tree</th>
						</tr>
					</thead>
					<tbody>
						<c:choose>
							<c:when test="${fn:length(codeList) <= 2}">
								<tr>
									<td class="listCenter">
										<div style="height: 590px;text-align: center;line-height: 30px;">
											등록된 코드가 없습니다.
										</div>
									</td>
								</tr>
							</c:when>
							<c:otherwise>
								<tr style="background-color: #FFF;">
									<td class="tit" style="text-align: left;padding: 0;vertical-align: top;"> 
										<div class="programCodesDiv">
											<div id="jstree"></div>
										</div>
									</td>
								</tr>
							</c:otherwise>
						</c:choose>
					</tbody>  
				</table>
				<iframe src="regist.do" id="subIframe" class="col-md-7" style="min-height:900px;padding: 0;" onload="this.height=this.contentWindow.document.body.scrollHeight"></iframe>
			</div>
		</div>
	</div>
</body>
</html>