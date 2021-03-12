package kr.co.testerworld.code.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CodeDaoImpl implements CodeDao {

	@Autowired
	SqlSession sql;
	
	@Override
	public void insertCode(CodeVO codeVO) {
		sql.insert("code.insertCode", codeVO);
	}

	@Override
	public int checkSeqNum() {
		int num = 0;
		
		if(sql.selectOne("code.checkSeqNum") != null) {
			num = sql.selectOne("code.checkSeqNum");
		}
		
		return num;
	}

	@Override
	public List<CodeVO> selectCodeList() {
		return sql.selectList("code.selectCodeList");
	}

	@Override
	public CodeVO selectCode(CodeVO codeVO) {
		return sql.selectOne("code.selectCode", codeVO);
	}

	@Override
	public int selectExists() {
		return sql.selectOne("code.selectExists");
	}

	@Override
	public int selectDuplicate(CodeVO codeVO) {
		return sql.selectOne("code.selectDuplicate", codeVO);
	}

}
