package kr.co.testerworld.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.testerworld.util.user.UserHelper;

public class MngInterceptor extends HandlerInterceptorAdapter{

//	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		String reqURL = request.getRequestURI();
		String returnURL = "/";			// '/로 시작하면 절대경로, 아니면 상대경로'
		
		String[] whiteList = {
				"/user/loginAjax.do",
				"/user/add.do",
				"/user/logout.do",
				"/user/idCheckAjax.do",
				"/user/addAjax.do"
				};
		
		boolean IsInWhiteList = false;
		
		if(reqURL.endsWith("/")) {
			if (UserHelper.isLogin(request)) {
				response.sendRedirect("main.do");
				return false;
			}
		}
		
		if(reqURL.endsWith(".do")) {
			for(String list : whiteList) {
				if(reqURL.endsWith(list)) {
					IsInWhiteList = true;
					break;
				}
			}
			
			if(!IsInWhiteList) {
				Map<String, String> userMap = UserHelper.getUserMap(request);
				if (userMap == null) {
					response.sendRedirect(returnURL);
					return false;
				}
			}
		}

		return super.preHandle(request, response, handler);
	}
	
}