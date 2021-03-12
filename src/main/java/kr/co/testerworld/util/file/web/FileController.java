package kr.co.testerworld.util.file.web;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.testerworld.file.service.FileService;
import kr.co.testerworld.util.file.excel.ExcelVO;
import kr.co.testerworld.util.file.excel.ExcelWrite;

@Controller
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileService fileService;
	
	@RequestMapping("/excel.do")
	public String getExcel(ModelMap model) throws Exception {
		
		List<List<String>> excelContent = new ArrayList<List<String>>();
		
		excelContent = fileService.readExcelSheet();
		
		model.addAttribute("excelContent", excelContent);
		
		return "file/excel";
	}
	
	@RequestMapping("/excel/download.do")
	public String saveExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Date now = new Date();
		String curr = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss").format(now);
		String fileName = "엑셀_테스트_" + curr; //파일명 설정
		
		
		//엑셀 생성
		ExcelWrite write = new ExcelWrite();
		ExcelVO excelVO = new ExcelVO();
		excelVO.setWb(new HSSFWorkbook());
		excelVO.setSheet(excelVO.getWb().createSheet());
		
		//셀 높이, 너비 조절
		excelVO.getSheet().setDefaultColumnWidth(15);
		excelVO.getSheet().setDefaultRowHeight((short) 400);
		
		//엑셀 스타일 적용
		excelVO.setStyle(excelVO.getWb().createCellStyle());
			//정렬
		excelVO.getStyle().setAlignment(HSSFCellStyle.ALIGN_CENTER); 			//가운데 정렬
		excelVO.getStyle().setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);	//높이 가운데 정렬
			//테두리
		excelVO.getStyle().setBorderRight(HSSFCellStyle.BORDER_THIN);
		excelVO.getStyle().setBorderLeft(HSSFCellStyle.BORDER_THIN);
		excelVO.getStyle().setBorderTop(HSSFCellStyle.BORDER_THIN);
		excelVO.getStyle().setBorderBottom(HSSFCellStyle.BORDER_THIN);
		
		//엑셀 내용
		write.rowInit(excelVO, 0);
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 8, "고객 예약 정보 관리");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "1. 기 본 사 항");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 1, 1, "단체명");
		write.addNewCell(excelVO, 1, 3, "");
		write.addNewCell(excelVO, 1, 0, "인원");
		write.addNewCell(excelVO, "순인원");
		write.addNewCell(excelVO, "");
		
		write.rowInit(excelVO, 8);
		write.addNewCell(excelVO, "연인원");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "입실일");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "");
		write.addNewCell(excelVO, "박");
		write.addNewCell(excelVO, 0, 1, "사업별 구분");
		write.addNewCell(excelVO, "");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "퇴실일");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "");
		write.addNewCell(excelVO, "일");
		write.addNewCell(excelVO, 0, 1, "감면 구분");
		write.addNewCell(excelVO, "");
		
		////////////////////////////////////////////
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "2. 통 계 구 분");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "프로그램 구분");
		write.addNewCell(excelVO, 0, 3, "");
		write.addNewCell(excelVO, 0, 1, "인원유형(대분류)");
		write.addNewCell(excelVO, "");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "개인/단체 구분");
		write.addNewCell(excelVO, 0, 3, "");
		write.addNewCell(excelVO, 0, 1, "인원유형(소분류)");
		write.addNewCell(excelVO, 0, 0, "");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "인증프로그램");
		write.addNewCell(excelVO, 0, 6, "");

		////////////////////////////////////////////
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "3. 고 객 정 보");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "고객명");
		write.addNewCell(excelVO, 0, 3, "");
		write.addNewCell(excelVO, 1, 0, "전화번호");
		write.addNewCell(excelVO, "유선");
		write.addNewCell(excelVO, "");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "전자우편");
		write.addNewCell(excelVO, 0, 3, ""); write.addCellNum(excelVO);
		write.addNewCell(excelVO, "무선");
		write.addNewCell(excelVO, "");
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "주소");
		write.addNewCell(excelVO, 0, 6, "");

		////////////////////////////////////////////
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 0, 1, "4. 예 산 세 부 내 역");

		////////////////////////////////////////////
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 24, 0, "4-1.\n수입\n예산");
		
		write.addNewCell(excelVO, 4, 0, "숙박비용");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "박");
		write.addNewCell(excelVO, "객실수");
		write.addNewCell(excelVO, 0, 1, "할인구분(적용률)");
		write.addNewCell(excelVO, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "1룸(정원 2명)");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "2룸(정원 5명)");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "3룸(정원 8명)");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 숙박비 = {객실료 + 추가비용}  x 기간\n* 객실료 : 객실 단가 x 객실수 x 적용률\n* 추가비용 : 침구류추가비 x 인원");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 6, "소 계");
		write.addNewCell(excelVO, "-");
		
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 4, 0, "시설이용료");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "추가시간");
		write.addNewCell(excelVO, 0, 1, "할인구분(적용률)");
		write.addNewCell(excelVO, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "대강당");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "중강당");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "회의실");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 시설이용비 = 시설이용 단가 x 횟수 + 추가시간금액\n* 기본료 : 4시간 이용 기준");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 6, "소 계");
		write.addNewCell(excelVO, "-");
		
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 4, 0, "프로그램비");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "인원");
		write.addNewCell(excelVO, 0, 1, "할인구분(적용률)");
		write.addNewCell(excelVO, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "산림교육프로그램");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "산림치료프로그램");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "자율형 프로그램");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 1, "");
		write.addNewCell(excelVO, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 프로그램비 = 단가 x 횟수 + 추가시간금액");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 6, "소 계");
		write.addNewCell(excelVO, "-");
		
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 4, 0, "식사비용");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "인원");
		write.addNewCell(excelVO, 0, 2, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "일반성인");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "영유아");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "36개월 미만");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 식비 = 식사단가 x 횟수 x 인원\n* 식사단가: 36개월 미만 무료 ");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "소 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "총 계");
		write.addNewCell(excelVO, 0, 2, "-");

		////////////////////////////////////////////
		write.addRowNum(excelVO);
		////////////////////////////////////////////
		
		write.rowInit(excelVO, 1);
		write.addNewCell(excelVO, 21, 0, "4-2.\n지출\n예산");
		
		write.addNewCell(excelVO, 3, 0, "버스임대료");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "대수");
		write.addNewCell(excelVO, 0, 2, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "45인승");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "20인승");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 버스임대료 = 버스 단가  x 횟수 x 대수");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "소 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 2, 0, "보험가입비");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "일");
		write.addNewCell(excelVO, "인원");
		write.addNewCell(excelVO, 0, 2, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "여행자보험");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 보험가입비 = 보험가입 단가 x 일수 x 인원");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "소 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 4, 0, "인건비");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "인원");
		write.addNewCell(excelVO, 0, 2, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "숲해설가");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "산림치유지도사");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "운영보조");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 인건비 =  단가 x 횟수 x 인원");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "소 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 4, 0, "식사비용");
		write.addNewCell(excelVO, "구 분");
		write.addNewCell(excelVO, "단 가");
		write.addNewCell(excelVO, "횟수");
		write.addNewCell(excelVO, "인원");
		write.addNewCell(excelVO, 0, 2, "금 액");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "일반성인");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "영유아");
		write.addNewCell(excelVO, "0");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, "36개월 미만");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, "-");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 3);
		write.addNewCell(excelVO, 0, 6, "* 식비 = 식사단가 x 횟수 x 인원\n* 식사단가: 36개월 미만 무료 ");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "소 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
		write.rowInit(excelVO, 2);
		write.addNewCell(excelVO, 0, 4, "총 계");
		write.addNewCell(excelVO, 0, 2, "-");
		
//		HSSFFormulaEvaluator.evaluateAllFormulaCells(excelVO.getWb());
//		for(int i = 1; i < 63; i++) {
//			for(int j = 1; j < 9; j++) {
//				excelVO.getSheet().autoSizeColumn(j + ((i-1)*9));
//			}
//		}
		
		write.setBordersToMergedCells(excelVO);
		//////////////////////////////////////////////////
		
		
		//파일명 한글 깨짐 방지
		String header = request.getHeader("User-Agent");
        if (header.contains("MSIE") || header.contains("Trident")) {
            fileName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
        } else {
           fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
           response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        }
        //
	
        //파일 다운로드
		//1.
		ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		excelVO.getWb().write(outByteStream);
		
		
		byte[] outArray = outByteStream.toByteArray();
		response.setContentType("application/ms-excel");
		response.setHeader("Expires:", "0");
		response.setHeader("Content-Length", Long.toString(outArray.length));
		response.setHeader("Content-Disposition", "attachment; filename="  + fileName + ".xls");
		OutputStream outStream = response.getOutputStream();
		outStream.write(outArray);
		outStream.flush();
		outStream.close();
		
		//2. 파일명 한글 깨지는 문제 잔존
//		File file = new File("C:\\Users\\GB-DEV-009\\Desktop\\ExcelDownload\\" + fileName + ".xls");
//		FileOutputStream fos = null;
//		
//		fos = new FileOutputStream(file);
//		excelVO.getWb().write(fos);
//		
//		if(excelVO.getWb() != null) excelVO.getWb().close();
//		if(fos != null) fos.close();
		
		return "redirect:excel.do";
	}
	
	
	@RequestMapping("/download.do")
	public String saveFile(MultipartFile multiFile, MultipartHttpServletRequest multiRequest) throws Exception {
		
		MultipartFile userFile = multiRequest.getFile("userFile");

		if (userFile == null || userFile.isEmpty()) {
			throw new RuntimeException("파일을 선택 해 주세요.");
		}

		File destFile = new File("C:\\Users\\GB-DEV-009\\Desktop\\ExcelDownload\\" + userFile.getOriginalFilename());
		
		if(!destFile.exists()) {
			destFile.mkdirs();
        }
		
		try {
			userFile.transferTo(destFile);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		
		return "redirect:excel.do";
		
	}
	
}