package kr.co.testerworld.util.file;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class FileType {
	
	public static Workbook getWorkbook(String filePath) {
		FileInputStream fis = null;
		
		try {
			fis = new FileInputStream(filePath);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		
		Workbook wb = null;
		
		/**
		 * 엑셀의 HSSFWorkbook과 XSSFWorkbook을 알아서 구별
		 * 4.XX에서 작동, 엑셀 병합관련 문제로 다운그레이드하였음
		 */
//		try {
//			wb = WorkbookFactory.create(fis);
//		} catch (EncryptedDocumentException e) {
//			throw new IllegalAccessError("xls / xlsx 확장자만 읽을 수 있습니다.");
//		} catch (IOException e) {
//			throw new RuntimeException(e.getMessage(), e);
//		}
//		
//		return wb;
		
		
		/**
		* 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에
		* .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
		*/
		if(filePath.toUpperCase().endsWith(".XLS")) {
			try {
				wb = new HSSFWorkbook(fis);
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		} else if(filePath.toUpperCase().endsWith(".XLSX")) {
			try {
				wb = new XSSFWorkbook(fis);
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		}
	
		return wb;
	}
}