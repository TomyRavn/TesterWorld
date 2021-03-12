package kr.co.testerworld.account.service;

import java.util.List;
import java.util.Map;

import kr.co.testerworld.util.Pager;

public interface AccountService {

	Map<String, String> login(AccountVO accountVO) throws Exception;

	void add(AccountVO accountVO) throws Exception;

	List<AccountVO> selectUserList(Pager pager);

	void deleteUser(AccountVO accountVO);

	int duplicateIdCheck(AccountVO accountVO);

	AccountVO selectUserFromId(AccountVO accountVO);

	AccountVO selectUserFromIdx(AccountVO accountVO);

	void updateUser(AccountVO accountVO) throws Exception;

	void upgradeUser(AccountVO accountVO);

	void downgradeUser(AccountVO accountVO);

	AccountVO selectUserGradeData(AccountVO accountVO);
	
}
