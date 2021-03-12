package kr.co.testerworld.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.testerworld.util.Pager;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	BoardDao boardDao;
	
	@Override
	public List<BoardVO> selectBoardList(Pager pager) {
		int total = boardDao.totalCount(pager);
		
		pager.setTotal((float) total);
		
		pager.setFirstIdx((pager.getPage()-1) * pager.getPerPage());
		
		return boardDao.selectBoardList(pager);
	}

	@Override
	public void insertBoard(BoardVO boardVO) {
		boardDao.insertBoard(boardVO);
	}

	@Override
	public void deleteBoard(BoardVO boardVO) {
		boardDao.deleteBoard(boardVO);
	}

	@Override
	public BoardVO selectBoard(BoardVO boardVO) {
		boardDao.updateViewCount(boardVO);
		return boardDao.selectBoard(boardVO);
	}

	@Override
	public void updateBoard(BoardVO boardVO) {
		boardDao.updateBoard(boardVO);
	}

	@Override
	public void dummy(BoardVO boardVO) {
		boardDao.dummy(boardVO);
	}

}
