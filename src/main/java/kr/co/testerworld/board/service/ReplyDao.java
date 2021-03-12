package kr.co.testerworld.board.service;

import java.util.List;

public interface ReplyDao {

	List<ReplyVO> selectReplyList(ReplyVO replyVO);
	
	ReplyVO selectReply(ReplyVO replyVO);

	void insertReply(ReplyVO replyVO);
	
}