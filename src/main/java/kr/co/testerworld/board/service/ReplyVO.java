package kr.co.testerworld.board.service;

public class ReplyVO{
	
	/** 댓글 IDX */
	private int repIdx;
	
	/** 댓글 내용 */
	private String repCn;
	
	/** 댓글 작성자 */
	private String repWriter;
	
	/** 좋아요 수 */
	private int repLike;
	
	/** 등록일 */
	private String repInsDate;
	
	/** 수정일 */
	private String repUptDate;
	
	/** 삭제일 */
	private String repDelDate;
	
	/** 등록자 IP */
	private String repInsIp;
	
	/** 수정자 IP */
	private String repUptIp;
	
	/** 삭제자 IP */
	private String repDelIp;
	
	/** 참조 게시글 IDX */
	private int repRefBdIdx;
	
	/** 댓글 비밀번호 */
	private String repPw;

	
	
	/** getter, setter */
	public int getRepIdx() {
		return repIdx;
	}

	public void setRepIdx(int repIdx) {
		this.repIdx = repIdx;
	}

	public String getRepCn() {
		return repCn;
	}

	public void setRepCn(String repCn) {
		this.repCn = repCn;
	}

	public String getRepWriter() {
		return repWriter;
	}

	public void setRepWriter(String repWriter) {
		this.repWriter = repWriter;
	}

	public int getRepLike() {
		return repLike;
	}

	public void setRepLike(int repLike) {
		this.repLike = repLike;
	}

	public String getRepInsDate() {
		return repInsDate;
	}

	public void setRepInsDate(String repInsDate) {
		this.repInsDate = repInsDate;
	}

	public String getRepUptDate() {
		return repUptDate;
	}

	public void setRepUptDate(String repUptDate) {
		this.repUptDate = repUptDate;
	}

	public String getRepDelDate() {
		return repDelDate;
	}

	public void setRepDelDate(String repDelDate) {
		this.repDelDate = repDelDate;
	}

	public String getRepInsIp() {
		return repInsIp;
	}

	public void setRepInsIp(String repInsIp) {
		this.repInsIp = repInsIp;
	}

	public String getRepUptIp() {
		return repUptIp;
	}

	public void setRepUptIp(String repUptIp) {
		this.repUptIp = repUptIp;
	}

	public String getRepDelIp() {
		return repDelIp;
	}

	public void setRepDelIp(String repDelIp) {
		this.repDelIp = repDelIp;
	}

	public int getRepRefBdIdx() {
		return repRefBdIdx;
	}

	public void setRepRefBdIdx(int repRefBdIdx) {
		this.repRefBdIdx = repRefBdIdx;
	}

	public String getRepPw() {
		return repPw;
	}

	public void setRepPw(String repPw) {
		this.repPw = repPw;
	}
}