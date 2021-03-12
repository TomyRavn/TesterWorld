package kr.co.testerworld.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	ReplyDao replyDao;
	
	@Override
	public List<ReplyVO> selectReplyList(ReplyVO replyVO) {
		return replyDao.selectReplyList(replyVO);
	}

	@Override
	public ReplyVO selectReply(ReplyVO replyVO) {
		return replyDao.selectReply(replyVO);
	}
	
	@Override
	public void insertReply(ReplyVO replyVO) {
		replyDao.insertReply(replyVO);
	}

//	@SuppressWarnings("unchecked")
//	@Override
//	public JSONArray selectReplyListToJson(ReplyVO replyVO) {
//		
//		JSONArray replyList = new JSONArray();
//		List<ReplyVO> repList = replyDao.selectReplyList(replyVO);
//		
//		for(int i = 0; i < repList.size(); i++) {
//			replyList.add(setReplyList(repList.get(i).getRepIdx(), repList.get(i).getRepCn(), repList.get(i).getRepWriter(), 
//					repList.get(i).getRepLike(), repList.get(i).getRepInsDate(), repList.get(i).getRepRefBdIdx(), repList.get(i).getRepPw()));
//		}
//		
//		return replyList;
//	}
//
//	
//	@SuppressWarnings("unchecked")
//	@Override
//	public JSONObject setReplyList(int repIdx, String repCn, String repWriter, int repLike, String repInsDate, int repRefBdIdx, String repPw) {
//		JSONObject obj = new JSONObject();
//		
//		obj.put("repIdx", repIdx);
//		obj.put("repCn", repCn);
//		obj.put("repWriter", repWriter);
//		obj.put("repLike", repLike);
//		obj.put("repInsDate", repInsDate);
//		obj.put("repRefBdIdx", repRefBdIdx);
//		obj.put("repPw", repPw);
//		
//		return obj;
//	}
	
}
