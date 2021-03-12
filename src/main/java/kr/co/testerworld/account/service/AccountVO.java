package kr.co.testerworld.account.service;

public class AccountVO {
	
	/** 계정 인덱스 00000000000000000001 */
	private String userIdx;
	
	/** ID admin123 */
	private String userId;
	
	/** PW 암호화 text */
	private String userPw;
		
	/** 이메일 test@gmail.com */
	private String userEm;
	
	/** 연락처 01000000000 */
	private String userTel;

	/** 이름 홍길동 */
	private String userNm;
	
	/** 권한 코드 IDX */
	private String userAuth;
	
	/** 등록 일시 0000-00-00 00:00:00 */
	private String insDttm;
	
	/** 등록자 IDX */
	private String insIdx;
	
	/** 등록 IP 000.000.000.000 */
	private String insIp;
	
	/** 수정 일시 */
	private String uptDttm;
	
	/** 수정자 IDX */
	private String uptIdx;
	
	/** 수정 IP */
	private String uptIp;
	
	/** 삭제 일시 */
	private String delDttm;
	
	/** 삭제자 IDX */
	private String delIdx;
	
	/** 삭제 IP */
	private String delIp;
	
	/** 계정 Sequence(IDX 업데이트용) */
	private int userSeq;
	
	
	/** getter, setter */
	public String getUserIdx() {
		return userIdx;
	}

	public void setUserIdx(String userIdx) {
		this.userIdx = userIdx;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserPw() {
		return userPw;
	}

	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getUserEm() {
		return userEm;
	}

	public void setUserEm(String userEm) {
		this.userEm = userEm;
	}

	public String getUserTel() {
		return userTel;
	}

	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}

	public String getUserAuth() {
		return userAuth;
	}

	public void setUserAuth(String userAuth) {
		this.userAuth = userAuth;
	}

	public String getInsDttm() {
		return insDttm;
	}

	public void setInsDttm(String insDttm) {
		this.insDttm = insDttm;
	}

	public String getInsIdx() {
		return insIdx;
	}

	public void setInsIdx(String insIdx) {
		this.insIdx = insIdx;
	}

	public String getInsIp() {
		return insIp;
	}

	public void setInsIp(String insIp) {
		this.insIp = insIp;
	}

	public String getUptDttm() {
		return uptDttm;
	}

	public void setUptDttm(String uptDttm) {
		this.uptDttm = uptDttm;
	}

	public String getUptIdx() {
		return uptIdx;
	}

	public void setUptIdx(String uptIdx) {
		this.uptIdx = uptIdx;
	}

	public String getUptIp() {
		return uptIp;
	}

	public void setUptIp(String uptIp) {
		this.uptIp = uptIp;
	}

	public String getDelDttm() {
		return delDttm;
	}

	public void setDelDttm(String delDttm) {
		this.delDttm = delDttm;
	}

	public String getDelIdx() {
		return delIdx;
	}

	public void setDelIdx(String delIdx) {
		this.delIdx = delIdx;
	}

	public String getDelIp() {
		return delIp;
	}

	public void setDelIp(String delIp) {
		this.delIp = delIp;
	}

	public int getUserSeq() {
		return userSeq;
	}

	public void setUserSeq(int userSeq) {
		this.userSeq = userSeq;
	}
	
	
}