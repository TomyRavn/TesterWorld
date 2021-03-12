package kr.co.testerworld.account.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.testerworld.account.service.AccountService;
import kr.co.testerworld.account.service.AccountVO;
import kr.co.testerworld.util.CacheControlUtil;
import kr.co.testerworld.util.IPAddressUtil;
import kr.co.testerworld.util.Pager;
import kr.co.testerworld.util.user.UserHelper;

@Controller
@RequestMapping("/user")
public class AccountController {

	@Autowired
	AccountService accountService;
	
	IPAddressUtil ipAddressUtil = new IPAddressUtil();
	private String userAuth;
	private String userIdx;
	
	
	@GetMapping("/add.do")
	public String addUserForm(HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		return "account/userAdd";
	}
	
	@ResponseBody
	@PostMapping("/addAjax.do")
	String Regist(AccountVO accountVO, HttpServletRequest request, HttpServletResponse response, String idDuplication, int idDuplVal) throws Exception {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		String result = "error";
		
		if(idDuplication.equals("idUncheck"))
			result = "idUncheck";
		else {
			if(idDuplVal > 0) {
				result = "idUsed";
			}else if(idDuplVal < 0) {
				result = "idEmpty";
			}else {
				if(StringUtils.isEmpty(accountVO.getUserId())) {
					result = "idEmpty";
				}else if(StringUtils.isEmpty(accountVO.getUserPw())) {
					result = "pwEmpty";
				}else if(StringUtils.isEmpty(accountVO.getUserNm())) {
					result = "nmEmpty";
				}else {
					//real IP 
					accountVO.setInsIp(ipAddressUtil.getIp(request));
					accountService.add(accountVO);
					
					result = "success";
				}
			}
		}
				
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/loginAjax.do")
	void login(HttpServletRequest request, HttpServletResponse response, AccountVO accountVO) throws Exception {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		String result = "error";
		JSONObject jobj = new JSONObject();
		Map<String, String> userMap = null;
		
		try {
			userMap = accountService.login(accountVO);
			
			if(userMap.get("message").equals("success")) {
				UserHelper.login(request, userMap);
			}
			result = userMap.get("message");
			
		}catch (Exception e) {
			result = "error";
		}
		
		jobj.put("result", result);
		response.setContentType("text/javascript; charset=utf-8");
		PrintWriter printWriter = response.getWriter();
		printWriter.println(jobj.toString());
		printWriter.flush();
		printWriter.close();
	}
	
	@RequestMapping("/logout.do")
	String logout(HttpServletRequest request, HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		request.getSession().removeAttribute("uSesEnt");
		return "redirect:..";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/list.do")
	String selectUserList(HttpServletRequest request ,HttpServletResponse response, ModelMap model, Pager pager) {
		userAuth = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userAuth");
		userIdx = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userIdx");
		
		if(!(userAuth.equals("A") || userAuth.equals("M"))) return "redirect:../main.do";
			
		response = CacheControlUtil.getInstance().getResponse(response);
		
		List<AccountVO> accountList = accountService.selectUserList(pager);
		
		model.addAttribute("authority", userAuth);
		model.addAttribute("userIdx", userIdx);
		model.addAttribute("accountList", accountList);
		
		return "account/userList";
	}
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping("/deleteAjax.do")
	Map<String, Object> deleteUser(HttpServletRequest request ,AccountVO accountVO) {
		userAuth = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userAuth");
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		String result = "error";
		
		//로그인 안했을때도 URL로 삭제하는 경우를 막아주어야함, 필수 설정하자
		if(!(userAuth.equals("A") || userAuth.equals("M"))) {
			
			result = "noAuth";
			
		}else {
		
			try {
				accountService.deleteUser(accountVO);
				result = "success";
			} catch (Exception e) {
				result = "error";
			}
			
		}
		
		map.put("result", result);
		
		return map;
	}

	@ResponseBody
	@PostMapping("/idCheckAjax.do")
	int idCheckAjax(HttpServletRequest request, HttpServletResponse response, AccountVO accountVO) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		if(StringUtils.isEmpty(accountVO.getUserId())) {
			return -1;
		}
		
		return accountService.duplicateIdCheck(accountVO);
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/edit.do")
	String updateUserForm(HttpServletRequest request, ModelMap model, AccountVO accountVO) throws Exception {
		userAuth = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userAuth");
		userIdx = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userIdx");
		
		AccountVO accVO = accountService.selectUserFromId(accountVO);
		
		if(userAuth.equals("A")) {
			
		}else if(userAuth.equals("M")) {
			
			if((accVO.getUserAuth().equals("A") || accVO.getUserAuth().equals("M")) && !accVO.getUserIdx().equals(userIdx))
				return "redirect:list.do";
			
		}else {
			accVO.setUserIdx(userIdx);
			accVO = accountService.selectUserFromIdx(accVO);
		}
		
		model.addAttribute("authority", userAuth);
		model.addAttribute("userIdx", userIdx);
		model.addAttribute("accountVO", accVO);
		
		return "account/userEdit";
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/edit.do")
	String updateUser(HttpServletRequest request, AccountVO accountVO) throws Exception{
		userAuth = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userAuth");
		userIdx = ((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).get("userIdx");
		
		AccountVO accVO = accountService.selectUserFromId(accountVO);
		
		
		if(accVO.getUserIdx().equals(userIdx)) {
			accountVO.setUserIdx(accVO.getUserIdx());
			accountVO.setUptIp(ipAddressUtil.getIp(request));
			accountService.updateUser(accountVO);
			((Map<String, String>)(request.getSession().getAttribute("uSesEnt"))).replace("userNm", accountVO.getUserNm());
			
			return "redirect:../main.do";
		}else {
			
			accVO.setUserEm(accountVO.getUserEm());
			accVO.setUserTel(accountVO.getUserTel());
			accVO.setUserNm(accountVO.getUserNm());
			accVO.setUptIp(ipAddressUtil.getIp(request));
			
			if(userAuth.equals("A")) {
				accountService.updateUser(accVO);
				
				return "redirect:list.do";
			}else if(userAuth.equals("M")) {
				
				if(accVO.getUserAuth().equals("N")) {
					accountService.updateUser(accVO);
				}
			
				return "redirect:list.do";
			}else {
				return "redirect:../main.do";
			}
		
		}
	}
	
	
	@RequestMapping("/upgrade.do")
	String upgradeUser(HttpServletRequest request, AccountVO accountVO) {
		
		AccountVO accVO = accountService.selectUserGradeData(accountVO);
		accVO.setUptIp(ipAddressUtil.getIp(request));
		accountService.upgradeUser(accVO);
		
		return "redirect:list.do";
	}
	
	@RequestMapping("/downgrade.do")
	String downgradeUser(HttpServletRequest request, AccountVO accountVO) {
		
		AccountVO accVO = accountService.selectUserGradeData(accountVO);
		accVO.setUptIp(ipAddressUtil.getIp(request));
		accountService.downgradeUser(accVO);
		
		return "redirect:list.do";
	}
}