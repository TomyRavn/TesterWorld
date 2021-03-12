package kr.co.testerworld.account.service;

import java.util.List;

import kr.co.testerworld.util.Pager;

public interface AccountDao {

	AccountVO login(AccountVO accountVO);
	
	void add(AccountVO accountVO);
	
	int checkSeqNum();

	List<AccountVO> selectUserList(Pager pager);

	int totalCount(Pager pager);

	void deleteUser(AccountVO accountVO);

	int duplicateIdCheck(AccountVO accountVO);

	AccountVO selectUserFromId(AccountVO accountVO);

	AccountVO selectUserFromIdx(AccountVO accountVO);

	void updateUser(AccountVO accountVO);

	void upgradeUser(AccountVO accountVO);

	void downgradeUser(AccountVO accountVO);

	AccountVO selectUserGradeData(AccountVO accountVO);
}