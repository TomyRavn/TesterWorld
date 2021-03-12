<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/template/modal_top.do" charEncoding="utf-8" />
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>댓글 관리</title>
</head>
<body>
	<div class="container" style="margin-top: 10px; float:left;">
		<form id="replyForm" name="replyForm">
			<input type="hidden" name="repRefBdIdx" value="${boardVO.bdIdx}"/>
			<br><br>
			<div>
				<div>
					<span><strong>Comments</strong></span> <span id="cCnt"></span>
				</div>
				<div>
					<table class="table">
						<tr>
							<td>
								<label>작성자 <input type="text" id="repWriter" name="repWriter" placeholder="작성자를 입력해주세요." autocomplete="off"/></label>
								<label>비밀번호 <input type="password" id="repPw" name="repPw" placeholder="비밀번호를 입력해주세요."/></label>
							</td>
						</tr>
						<tr>
							<td>
								<textarea style="width: 1100px;" rows="3" cols="30" id="repCn" name="repCn" placeholder="댓글을 입력하세요"></textarea>
								<br>
								<div>
									<button type="button" class="btn pull-right boot_btn-success" onclick="fn_comment()">등록</button>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div id="replyList">
			</div>
		</form>
	</div>
	
	<script type="text/javascript">
		/*
		 * 댓글 등록하기(Ajax)
		 */
		function fn_comment(){
	   	 	$.ajax({
	      	  	type:'POST',
	     	  	url : "<c:url value='/board/replyAjax.do'/>",
	     	  	data:$("#replyForm").serialize(),
		        	success : function(data){
	              		getCommentList();
	               		$("#repWriter").val("");
	               		$("#repPw").val("");
	               		$("#repCn").val("");
	     			},
	        		error:function(request,status,error){
		            	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		      		}
	   		});
		}
	 
		/**
		 * 초기 페이지 로딩시 댓글 불러오기
		 */
		$(function(){
		    getCommentList();
		});
	 
		/**
		 * 댓글 불러오기(Ajax)
		 */
		function getCommentList(){
			
	    	$.ajax({
	       	 	type:'GET',
	        	url : "<c:url value='/board/replyAjax.do'/>",
	        	dataType : "json",
	        	data:$("#replyForm").serialize(),
	        	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
	        	success : function(data){
	            	var html = "";
		            var cCnt = Object.keys(data.replyList).length;
		            
		            if(cCnt > 0){
	    	           for(var i in data.replyList){ 
	    	        	   if(data.replyList[i].repPw == null || data.replyList[i].repPw == ""){
	                    		html += "<div>";
	                    		html += "<div><table class='table'><h6><strong>"+(Number(i)+Number(1))+". 작성자 : "+data.replyList[i].repWriter+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록일시 : "+data.replyList[i].repInsDate+"</strong></h6>";
	                    		html += "<div id='divCn"+data.replyList[i].repIdx+"'>" + data.replyList[i].repCn + "</div> <tr><td></td></tr>";
	                    		html += "</table></div>";
	                    		html += "</div>";
	    	        	   }else{
	    	        		   	html += "<div>";
	                    		html += "<div><table class='table'><h6><strong>"+(Number(i)+Number(1))+". 작성자 : "+data.replyList[i].repWriter+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록일시 : "+data.replyList[i].repInsDate+"</strong></h6>";
	                    		html += "<div id='divCn"+data.replyList[i].repIdx+"'></div><input type='password' id='checkRepPw"+data.replyList[i].repIdx+"' placeholder='비밀댓글입니다. 확인하시려면 비밀번호를 입력해주세요.' style='width:40%;'/><button type='button' id='checkBtn"+data.replyList[i].repIdx+"' class='btn boot_btn-success' style='margin-left:10px;' onclick='getPrivateComment("+data.replyList[i].repIdx+")'>확인</button> <tr><td></td></tr>";
	                    		html += "</table></div>";
	                    		html += "</div>";
	    	        	   }
	                	}
	            	}else{
	                	html += "<div>";
	                	html += "<div><table class='table'><h6 style='text-align:center;'><strong>등록된 댓글이 없습니다.</strong></h6> <tr><td></td></tr>";
	                	html += "</table></div>";
	                	html += "</div>";
		            }
	            	
	            	$("#cCnt").html(cCnt);
	            	$("#replyList").html(html);
	            
		        },
	        	error:function(request,status,error){
	        		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	       		}
	    	});
		}	
		
		function getPrivateComment(index){
			var pw = $("#checkRepPw"+index+"").val();
			if(!index){
				alert("열람을 원하는 비밀댓글을 선택해주세요.");
			}else if(!pw){
				alert("비밀번호를 입력해주세요.");
			}else{
				$.ajax({
		        	url : "<c:url value='/board/privateReplyAjax.do'/>",
		        	dataType : "json",
		        	data:{'idx':index,'pw':pw},
		        	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		        	success : function(data){
		            	var html = "";
		            	
		            	if(data.message == "success"){
	                		html += data.replyVO.repCn;
	                		$("#checkRepPw"+index+"").val("");
	                		$("#checkRepPw"+index+"").hide();
	                		$("#checkBtn"+index+"").hide();
	                		$("#divCn"+index+"").html(html);
		        	   }else{
		        		   $("#checkRepPw"+index+"").val("");
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