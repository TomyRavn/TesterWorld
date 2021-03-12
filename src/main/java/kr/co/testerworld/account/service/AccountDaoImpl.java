package kr.co.testerworld.account.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.co.testerworld.util.Pager;

@Repository
public class AccountDaoImpl implements AccountDao {

	@Autowired
	SqlSession sql;
	
	
	@Override
	public AccountVO login(AccountVO accountVO) {
		return sql.selectOne("user.login", accountVO);
	}

	@Override
	public void add(AccountVO accountVO) {
		sql.insert("user.add", accountVO);
	}

	@Override
	public int checkSeqNum() {
		
		int num = 0;
		
		if(sql.selectOne("user.checkSeqNum") != null) {
			num = sql.selectOne("user.checkSeqNum");
		}
		
		return num;
	}

	@Override
	public List<AccountVO> selectUserList(Pager pager) {
		return sql.selectList("user.selectUserList", pager);
	}

	@Override
	public int totalCount(Pager pager) {
		return sql.selectOne("user.totalCount", pager);
	}

	@Override
	public void deleteUser(AccountVO accountVO) {
		sql.delete("user.deleteUser", accountVO);
	}

	@Override
	public int duplicateIdCheck(AccountVO accountVO) {
		return sql.selectOne("user.duplicateIdCheck", accountVO);
	}

	@Override
	public AccountVO selectUserFromId(AccountVO accountVO) {		
		return sql.selectOne("user.selectUserFromId", accountVO);
	}
	
	@Override
	public AccountVO selectUserFromIdx(AccountVO accountVO) {		
		return sql.selectOne("user.selectUserFromIdx", accountVO);
	}

	@Override
	public void updateUser(AccountVO accountVO) {
		sql.update("user.updateUser", accountVO);
	}

	@Override
	public void upgradeUser(AccountVO accountVO) {
		sql.update("user.upgradeUser", accountVO);
	}

	@Override
	public void downgradeUser(AccountVO accountVO) {
		sql.update("user.downgradeUser", accountVO);
	}

	@Override
	public AccountVO selectUserGradeData(AccountVO accountVO) {
		return sql.selectOne("user.selectUserGradeData", accountVO);
	}

}
