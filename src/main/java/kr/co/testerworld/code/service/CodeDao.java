package kr.co.testerworld.code.service;

import java.util.List;

public interface CodeDao {

	public void insertCode(CodeVO codeVO);

	public int checkSeqNum();

	public List<CodeVO> selectCodeList();
	
	public CodeVO selectCode(CodeVO codeVO);

	public int selectExists();

	public int selectDuplicate(CodeVO codeVO);
}