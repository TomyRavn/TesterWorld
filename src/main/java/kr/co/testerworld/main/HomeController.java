package kr.co.testerworld.main;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.testerworld.util.CacheControlUtil;

@Controller
public class HomeController {
	
	@GetMapping("/")
	public String index() {
		
		return "index";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/main.do")
	public String goMain(HttpServletRequest request, HttpServletResponse response, ModelMap model){
		response = CacheControlUtil.getInstance().getResponse(response);
		
		Map<String, String> map = (Map<String, String>) request.getSession().getAttribute("uSesEnt");
		
		String userNm = map.get("userNm");
		String userAuth = map.get("userAuth");
		String userId = map.get("userId");
		
		model.addAttribute("userAuth", userAuth);
		model.addAttribute("userNm", userNm);
		model.addAttribute("userId", userId);
		
		return "main";
	}
	
	
	/** template */
	@RequestMapping("/template/modal_top.do")
	public String modalTop() {
		return "template/modal_top";
	}
}