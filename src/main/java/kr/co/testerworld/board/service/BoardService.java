package kr.co.testerworld.board.service;

import java.util.List;

import kr.co.testerworld.util.Pager;

public interface BoardService {

	List<BoardVO> selectBoardList(Pager pager);

	void insertBoard(BoardVO boardVO);

	void deleteBoard(BoardVO boardVO);

	BoardVO selectBoard(BoardVO boardVO);

	void updateBoard(BoardVO boardVO);

	void dummy(BoardVO boardVO);
	
}