package kr.co.testerworld.code.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.testerworld.code.service.CodeService;
import kr.co.testerworld.code.service.CodeVO;
import kr.co.testerworld.util.CacheControlUtil;
import kr.co.testerworld.util.IPAddressUtil;

@Controller
@RequestMapping("/code")
public class CodeController {
	
	@Autowired
	CodeService codeService;

	IPAddressUtil ipAddressUtil = new IPAddressUtil();
	int tempVal = 0;
	
	@GetMapping("/regist.do")
	String codeRegistForm(CodeVO codeVO, ModelMap model, HttpServletResponse response, HttpServletRequest request) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		List<CodeVO> upperCodeList = codeService.selectUpperCodeList();
		model.addAttribute("upperCodeList", upperCodeList);
		
		if(!StringUtils.isEmpty(codeVO.getCodeIdx())) {
			codeVO = codeService.selectCode(codeVO);
			model.addAttribute("codeVO", codeVO);
		}else {
			model.addAttribute("codeVO", codeVO);
		}
		
		
		//부모창 새로고침
		if(tempVal == 0) {
			model.addAttribute("reloadState", tempVal);
		}else {
			if(tempVal > 0)
				model.addAttribute("reloadState", --tempVal);
		}
		
		
		model.addAttribute("upperCodeIdx", codeVO.getUpperCodeIdx());
		
		return "code/codeRegist";
	}
	
	@PostMapping("/regist.do")
	String codeRegist(ModelMap model, CodeVO codeVO, String reloadValue, HttpServletRequest request, HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		if(StringUtils.isEmpty(codeVO.getUpperCodeIdx())) {
			codeVO.setUpperCodeIdx(null);
		}
		
		//real IP 
		codeVO.setInsIp(ipAddressUtil.getIp(request));
		
		
		if(StringUtils.isEmpty(codeVO.getCodeIdx())) {
			if(codeService.selectExists() == 1) {
				if(codeService.selectDuplicate(codeVO) == 1) {
					request.getSession().setAttribute("message", "중복된 코드명입니다. 다시 입력해주세요.");
					return "redirect:regist.do";
				}
			}
			codeService.insertCode(codeVO);
			request.getSession().setAttribute("message", "프로그램 코드 저장이 완료되었습니다.");
		}
		
		String lastChangeCode = codeVO.getUpperCodeIdx();
		codeVO.setLastChangeCode(lastChangeCode);
		
		//부모창 새로고침
		tempVal = Integer.parseInt(reloadValue) + 2;
		
		
		return "redirect:regist.do";
	}
	
	@RequestMapping("/list.do")
	String codeList(CodeVO codeVO, ModelMap model, HttpServletResponse response) throws Exception{
		response = CacheControlUtil.getInstance().getResponse(response);
		
		String lastChangeCode = codeVO.getLastChangeCode();
		
		JSONArray codeList = codeService.selectTreeCodeList();
		
		String select1Depth = "";
		String select2Depth = "";
		
		if(!StringUtils.isEmpty(lastChangeCode)) {
			if(codeList.size() > 0) {
				CodeVO cdVO = new CodeVO();
				cdVO.setCodeIdx(lastChangeCode);
				cdVO = codeService.selectCode(codeVO);
				
				if(cdVO != null) {
					select1Depth = cdVO.getUpperCodeIdx();
					select2Depth = lastChangeCode;
				}
			}
		}
		
		model.addAttribute("select1Depth", select1Depth);
		model.addAttribute("select2Depth", select2Depth);
		
		model.addAttribute("codeList", codeList.toJSONString().replaceAll("\\\\/", "/"));
		model.addAttribute("codeVO", codeVO);
		
		return "code/codeList";
	}
}