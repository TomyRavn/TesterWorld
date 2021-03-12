package kr.co.testerworld.board.service;

public class BoardVO {

	/** 게시글 IDX */
	private int bdIdx;
	
	/** 게시글 제목 */
	private String bdTitle;
	
	/** 게시글 등록일 */
	private String bdWriter;
	
	/** 게시글 내용 */
	private String bdCn;
	
	/** 게시글 등록일 */
	private String bdRegDate;
	
	/** 등록자 IP */
	private String insIp;
	
	/** 수정자 IP */
	private String uptIp;
	
	/** 조회 수 */
	private int bdCnt;
	
	/** 댓글 갯수 */
	private int replyCnt;
	
	
	
	/** getter, setter */
	public int getBdIdx() {
		return bdIdx;
	}
	public void setBdIdx(int bdIdx) {
		this.bdIdx = bdIdx;
	}
	public String getBdTitle() {
		return bdTitle;
	}
	public void setBdTitle(String bdTitle) {
		this.bdTitle = bdTitle;
	}
	public String getBdWriter() {
		return bdWriter;
	}
	public void setBdWriter(String bdWriter) {
		this.bdWriter = bdWriter;
	}
	public String getBdCn() {
		return bdCn;
	}
	public void setBdCn(String bdCn) {
		this.bdCn = bdCn;
	}
	public String getBdRegDate() {
		return bdRegDate;
	}
	public void setBdRegDate(String bdRegDate) {
		this.bdRegDate = bdRegDate;
	}
	public String getInsIp() {
		return insIp;
	}
	public void setInsIp(String insIp) {
		this.insIp = insIp;
	}
	public String getUptIp() {
		return uptIp;
	}
	public void setUptIp(String uptIp) {
		this.uptIp = uptIp;
	}
	public int getBdCnt() {
		return bdCnt;
	}
	public void setBdCnt(int bdCnt) {
		this.bdCnt = bdCnt;
	}
	public int getReplyCnt() {
		return replyCnt;
	}
	public void setReplyCnt(int replyCnt) {
		this.replyCnt = replyCnt;
	}
}