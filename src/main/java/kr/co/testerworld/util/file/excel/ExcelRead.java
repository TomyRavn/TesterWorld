package kr.co.testerworld.util.file.excel;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

import kr.co.testerworld.util.file.FileType;

public class ExcelRead {
	/** 정해진 시트 인덱스만 읽는 방식 */
	public static List<List<String>> read(ReadOption readOption, int column){
		
		Workbook wb = FileType.getWorkbook(readOption.getFilePath());
		
		Sheet sheet = wb.getSheetAt(1);
		
		int numOfRows = sheet.getPhysicalNumberOfRows();
		int numOfCells = 0;
		
		Row row = null;
		Cell cell = null;
		
		List<List<String>> result = new ArrayList<List<String>>();
		
		for (int rowIndex = readOption.getStartRow() - 1; rowIndex < numOfRows; rowIndex++) {
			row = sheet.getRow(rowIndex);
			
			//row != null은 꼭 넣어주어야 함(사용자가 입력한 Row가 아닐 때도 읽어들이는 오류가 발생)
			if(row != null) {
				numOfCells = column;
				
				List<String> list = new ArrayList<String>();
				
				for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
					cell = row.getCell(cellIndex);
					
					list.add(CellRef.getValue(cell));
				}
				
				result.add(list);
			}
		}
		return result;
	}
	
	/** 시트 인덱스를 입력받아 읽을 수 있는 방식 */
	public static List<List<String>> readPlus(ReadOption readOption, int column, int sheetNumber){
		
		Workbook wb = FileType.getWorkbook(readOption.getFilePath());
		
		int numberOfSheets = wb.getNumberOfSheets();
		
		if(sheetNumber >= (numberOfSheets - 1)) {
			sheetNumber = numberOfSheets - 1;
		}else if(sheetNumber <= 0) {
			sheetNumber = 0;
		}
		
		Sheet sheet = wb.getSheetAt(sheetNumber);
		
		int numOfRows = sheet.getPhysicalNumberOfRows();
		int numOfCells = 0;
		
		Row row = null;
		Cell cell = null;
		
		List<List<String>> result = new ArrayList<List<String>>();
		
		for (int rowIndex = readOption.getStartRow() - 1; rowIndex < numOfRows; rowIndex++) {
			row = sheet.getRow(rowIndex);
			
			//row != null은 꼭 넣어주어야 함(사용자가 입력한 Row가 아닐 때도 읽어들이는 오류가 발생)
			if(row != null) {
				numOfCells = column;
				
				List<String> list = new ArrayList<String>();
				
				for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
					cell = row.getCell(cellIndex);
					
					list.add(CellRef.getValue(cell));
				}
				
				result.add(list);
			}
		}
		return result;
	}
	
	/** 정해진 시트 인덱스만 읽는 방식 */
	public static List<List<String>> specialRead(ReadOption readOption, int column){
	
		Workbook wb = FileType.getWorkbook(readOption.getFilePath());
		
		Sheet sheet = wb.getSheetAt(1);
		
		int numOfRows = sheet.getPhysicalNumberOfRows();
		int numOfCells = 0;
		
		Row row = null;
		Cell cell = null;
		
//		첫행, 마지막행, 첫열, 마지막열
		sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
		
		List<List<String>> result = new ArrayList<List<String>>();
		
		for (int rowIndex = readOption.getStartRow() - 1; rowIndex < numOfRows; rowIndex++) {
			row = sheet.getRow(rowIndex);
			
			//row != null은 꼭 넣어주어야 함(사용자가 입력한 Row가 아닐 때도 읽어들이는 오류가 발생)
			if(row != null) {
				numOfCells = column;
				
				List<String> list = new ArrayList<String>();
				
				for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
					cell = row.getCell(cellIndex);
					
					list.add(CellRef.getValue(cell));
				}
				
				result.add(list);
			}
		}
		
		return result;
	}
}