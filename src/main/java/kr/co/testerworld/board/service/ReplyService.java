package kr.co.testerworld.board.service;

import java.util.List;

public interface ReplyService {

	List<ReplyVO> selectReplyList(ReplyVO replyVO);
	
//	JSONArray selectReplyListToJson(ReplyVO replyVO);
//	JSONObject setReplyList(int repIdx, String repCn, String repWriter, int repLike, String repInsDate, int repRefBdIdx, String repPw);

	ReplyVO selectReply(ReplyVO replyVO);
	
	void insertReply(ReplyVO replyVO);
	
}