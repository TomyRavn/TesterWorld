package kr.co.testerworld.util.file.excel;

import java.util.List;

public class ReadOption {
	
	/** 엑셀 파일의 경로 */
	private String filePath;
	
	/** 추출할 컬럼명 */
	private List<String> outputColumns;
	
	/** 추출을 시작할 행 번호 */
	private int startRow;

	
	/** getter, setter */
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public List<String> getOutputColumns() {
		return outputColumns;
	}

	public void setOutputColumns(List<String> outputColumns) {
		this.outputColumns = outputColumns;
	}

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}
	
}