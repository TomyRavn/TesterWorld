package kr.co.testerworld.board.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.co.testerworld.util.Pager;

@Repository
public class BoardDaoImpl implements BoardDao {

	@Autowired
	SqlSession sql;
	
	@Override
	public List<BoardVO> selectBoardList(Pager pager) {
		return sql.selectList("board.selectBoardList", pager);
	}

	@Override
	public void insertBoard(BoardVO boardVO) {
		sql.insert("board.insertBoard", boardVO);
	}

	@Override
	public void deleteBoard(BoardVO boardVO) {
		sql.delete("board.deleteBoard", boardVO);
	}

	@Override
	public BoardVO selectBoard(BoardVO boardVO) {
		return sql.selectOne("board.selectBoard", boardVO);
	}

	@Override
	public void updateBoard(BoardVO boardVO) {
		sql.update("board.updateBoard", boardVO);
	}
	
	@Override
	public void updateViewCount(BoardVO boardVO) {
		sql.update("board.updateViewCount", boardVO);
	}
	
	@Override
	public int totalCount(Pager pager) {
		return sql.selectOne("board.totalCount", pager);
	}

	@Override
	public void dummy(BoardVO boardVO) {
		sql.insert("board.insertBoard", boardVO);
	}
	
}
