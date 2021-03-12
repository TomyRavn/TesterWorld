package kr.co.testerworld.util.user;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public class UserHelper {
	
	public static void login(HttpServletRequest request, Map<String, String> map) {
		request.getSession().setAttribute("uSesEnt", map);
	}
	
	public static boolean isLogin(HttpServletRequest request) {
		if(request.getSession().getAttribute("uSesEnt") == null) {
			return false;
		}else {
			return true;
		}
	}
	
	public static void logout(HttpServletRequest request) {
		request.getSession().setAttribute("uSesEnt", null);
	}
	
	@SuppressWarnings("unchecked")
	public static Map<String, String> getUserMap(HttpServletRequest request){
		Map<String, String> map = (Map<String, String>) request.getSession().getAttribute("uSesEnt");
		
		return map;
	}
	
}