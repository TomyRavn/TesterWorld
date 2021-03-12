package kr.co.testerworld.file.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.testerworld.util.file.excel.ExcelRead;
import kr.co.testerworld.util.file.excel.ReadOption;

@Service("FileService")
public class FileServiceImpl implements FileService {
	
	public List<List<String>> readExcelSheet() throws Exception {
		ReadOption readOption = new ReadOption();

		readOption.setFilePath("C:\\Users\\GB-DEV-009\\Desktop\\산림복지\\프로그램 운영관리시스템 연동사항 및 서식(0908).xlsx");
		readOption.setStartRow(1);

		List<List<String>> excelContent = new ArrayList<List<String>>();
		excelContent = ExcelRead.read(readOption, 15);

		return excelContent;
	}
}