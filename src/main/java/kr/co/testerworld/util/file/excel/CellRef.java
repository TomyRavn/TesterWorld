package kr.co.testerworld.util.file.excel;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.util.CellReference;

public class CellRef {
	
	public static String getName(Cell cell, int cellIndex) {
		int cellNum = 0;
		
		if(cell != null) {
			cellNum = cell.getColumnIndex();
		}else {
			cellNum = cellIndex;
		}
		
		return CellReference.convertNumToColString(cellNum);
	}
	
	public static String getValue(Cell cell) {
		String value = "";
		
		if(cell == null) {
			value = "0";
		}else if(cell.toString().equals("-")) {
			value = "0";
		}else {
			if(cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
				value = cell.getCellFormula();
			}else if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
				if(DateUtil.isCellDateFormatted(cell)) {
					Date date = cell.getDateCellValue();
					value = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
				}else {
					value = cell.getNumericCellValue() + "";
				}
			}else if(cell.getCellType() == Cell.CELL_TYPE_STRING) {
				value = cell.getStringCellValue() + "";
			}else if(cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {
				value = cell.getBooleanCellValue() + "";
			}else if(cell.getCellType() == Cell.CELL_TYPE_ERROR) {
				value = cell.getErrorCellValue() + "";
			}else if(cell.getCellType() == Cell.CELL_TYPE_BLANK) {
				value = "0";
			}else {
				value = cell.getStringCellValue();
			}
		}
		
		return value;
	}
}