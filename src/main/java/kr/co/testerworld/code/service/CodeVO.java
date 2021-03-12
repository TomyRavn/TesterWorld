package kr.co.testerworld.code.service;

public class CodeVO {
	
	/** 코드 IDX */
	private String codeIdx;
	
	/** 코드명 */
	private String codeNm;
	
	/** 코드 내용 */
	private String codeCn;
	
	/** 상위 코드 IDX */
	private String upperCodeIdx;
	
	/** 코드 시퀀스(코드 IDX용) */
	private int codeSeq;
	
	/** 등록자 IP */
	private String insIp;
	
	///////////////////////////
	//	   jstree 관련 변수	 //
	///////////////////////////
	
	/** Depth */
	private int level;
	
	/** 마지막 변경 코드 */
	private String lastChangeCode;
	
	
	
	/** getter, setter */
	public String getCodeIdx() {
		return codeIdx;
	}
	public void setCodeIdx(String codeIdx) {
		this.codeIdx = codeIdx;
	}
	public String getCodeNm() {
		return codeNm;
	}
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}
	public String getCodeCn() {
		return codeCn;
	}
	public void setCodeCn(String codeCn) {
		this.codeCn = codeCn;
	}
	public String getUpperCodeIdx() {
		return upperCodeIdx;
	}
	public void setUpperCodeIdx(String upperCodeIdx) {
		this.upperCodeIdx = upperCodeIdx;
	}
	public int getCodeSeq() {
		return codeSeq;
	}
	public void setCodeSeq(int codeSeq) {
		this.codeSeq = codeSeq;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getLastChangeCode() {
		return lastChangeCode;
	}
	public void setLastChangeCode(String lastChangeCode) {
		this.lastChangeCode = lastChangeCode;
	}
	public String getInsIp() {
		return insIp;
	}
	public void setInsIp(String insIp) {
		this.insIp = insIp;
	}
	
}