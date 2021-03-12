package kr.co.testerworld.board.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReplyDaoImpl implements ReplyDao {

	@Autowired
	SqlSession sql;
	
	@Override
	public List<ReplyVO> selectReplyList(ReplyVO replyVO) {
		return sql.selectList("reply.selectReplyList", replyVO);
	}

	@Override
	public ReplyVO selectReply(ReplyVO replyVO) {
		return sql.selectOne("reply.selectReply", replyVO);
	}
	
	@Override
	public void insertReply(ReplyVO replyVO) {
		sql.insert("reply.insertReply", replyVO);
	}

}
