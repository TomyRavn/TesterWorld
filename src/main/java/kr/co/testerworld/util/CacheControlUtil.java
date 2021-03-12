package kr.co.testerworld.util;

import javax.servlet.http.HttpServletResponse;

//뒤로가기 시 alert(message)를 방지하기 위해 캐시를 삭제해주는 싱글톤 유틸 클래스
public class CacheControlUtil {
	
	private CacheControlUtil() {}
	
	private static class CacheControlUtilHolder{
		private static final CacheControlUtil CACHE_CONTROL_UTIL = new CacheControlUtil();
	}
	
	public static CacheControlUtil getInstance() {
		return CacheControlUtilHolder.CACHE_CONTROL_UTIL;
	}
	
	public HttpServletResponse getResponse(HttpServletResponse response) {
		
		response.setHeader("Expires","0");
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0"); 
		response.setHeader("Pragma", "no-cache");
		
		return response;
	}
	
}