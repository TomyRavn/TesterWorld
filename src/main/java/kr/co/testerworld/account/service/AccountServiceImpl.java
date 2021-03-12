package kr.co.testerworld.account.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.testerworld.util.AES256Util;
import kr.co.testerworld.util.Pager;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	AccountDao accountDao;
	
	@Override
	public Map<String, String> login(AccountVO accountVO) throws Exception {
		
		Map<String, String> userMap = new java.util.HashMap<String, String>();
		
		userMap.put("message", "fail");
		
		String inputPw = AES256Util.loader().aesEncode(accountVO.getUserPw());
		
		AccountVO resAccountVO = accountDao.login(accountVO);
		
		if(resAccountVO != null) {
			String outputPw = resAccountVO.getUserPw();
			
			if(inputPw.equals(outputPw)) {
				userMap.put("userIdx", resAccountVO.getUserIdx());
				userMap.put("userId", resAccountVO.getUserId());
				userMap.put("userNm", resAccountVO.getUserNm());
				userMap.put("userAuth", resAccountVO.getUserAuth());
				userMap.put("message", "success");
			}else {
				userMap.put("message", "fail");
			}
		}
		
		return userMap;
	}

	@Override
	public void add(AccountVO accountVO) throws Exception {
		
		accountVO.setUserPw(AES256Util.loader().aesEncode(accountVO.getUserPw()));
		
		int checkSeqNum = accountDao.checkSeqNum();
		
		Date sysDate = new Date();
		SimpleDateFormat df = new SimpleDateFormat("MMddmmss");
		
		accountVO.setUserIdx("USER" + df.format(sysDate) + Integer.toString(checkSeqNum + 1));
		
		accountDao.add(accountVO);
		
	}

	@Override
	public List<AccountVO> selectUserList(Pager pager) {
		int total = accountDao.totalCount(pager);
		
		pager.setTotal((float) total);
		
		pager.setFirstIdx((pager.getPage()-1) * pager.getPerPage());
		
		return accountDao.selectUserList(pager);
	}

	@Override
	public void deleteUser(AccountVO accountVO) {
		accountDao.deleteUser(accountVO);
	}

	@Override
	public int duplicateIdCheck(AccountVO accountVO) {
		return accountDao.duplicateIdCheck(accountVO);
	}

	@Override
	public AccountVO selectUserFromId(AccountVO accountVO){
		return accountDao.selectUserFromId(accountVO);
	}
	
	@Override
	public AccountVO selectUserFromIdx(AccountVO accountVO){
		return accountDao.selectUserFromIdx(accountVO);
	}

	@Override
	public void updateUser(AccountVO accountVO){
		accountDao.updateUser(accountVO);
	}

	@Override
	public void upgradeUser(AccountVO accountVO) {
		accountDao.upgradeUser(accountVO);
	}

	@Override
	public void downgradeUser(AccountVO accountVO) {
		accountDao.downgradeUser(accountVO);
	}

	@Override
	public AccountVO selectUserGradeData(AccountVO accountVO) {
		return accountDao.selectUserGradeData(accountVO);
	}

}
