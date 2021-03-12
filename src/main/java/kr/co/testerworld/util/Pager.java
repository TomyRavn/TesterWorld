package kr.co.testerworld.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

public class Pager {

	/** 현재 페이지 default 값 */
	private int page = 1;
	
	/** 한 번에 보여줄 게시글 갯수 */
	private int perPage = 10;
	
	/** 총 게시글 수 */
	private float total;
	
	/** 한 번에 보여줄 페이지 갯수 */
	private int perGroup = 10;
	
	/** 현재 페이지 첫번째 Idx */
	private int firstIdx = 0;

	
	/** 선택한 검색 방법 */
	private String search = "";
	
	/** 검색 키워드 */
	private String keyword = "";
	
	
	/** 정렬할 목록 */
	private int header = 0;
	
	/** 정렬할 목록 */
	private int order = 1;
	
	
	/** getter, setter */
	public int getFirstIdx() {
		return firstIdx;
	}
	public void setFirstIdx(int firstIdx) {
		this.firstIdx = firstIdx;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPerPage() {
		return perPage;
	}
	public void setPerPage(int perPage) {
		this.perPage = perPage;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public int getPerGroup() {
		return perGroup;
	}
	public void setPerGroup(int perGroup) {
		this.perGroup = perGroup;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public int getHeader() {
		return header;
	}
	public void setHeader(int header) {
		this.header = header;
	}
	public int getOrder() {
		return order;
	}
	public void setOrder(int order) {
		this.order = order;
	}
	//===============================================//	
	
	public int getLast() {
		return (int) Math.ceil(total / perPage);
	}
	
	public int getPrev() {
//		return page <= perGroup ? 1 : (((page - 1) / perGroup) - 1) * perGroup + perGroup;
		return page <= 1 ? 1 : (page - 1);
	}
	
	public int getNext() {
//		int next = (((page - 1) / perGroup) + 1) * perGroup + 1;
		int next = page + 1;
		int last = getLast();
		
		return next < last ? next : last;
	}
	
	public List<Integer> getList(){
		ArrayList<Integer> list = new ArrayList<Integer>();
		
		int startPage = ((page - 1) / perGroup) * perGroup + 1;
		
		for(int index = startPage; index < startPage + perGroup && index <= getLast(); index++) {
			list.add(index);
		}
		
		return list;
	}
	
	public String getQuery() {
		if(StringUtils.isEmpty(search) || search.equals(""))
			return "";
		
		return "search=" + search + "&keyword=" + keyword;
	}
	
	public String getSort() {
		return "header=" + header + "&order=" + order;
	}
}