package kr.co.testerworld.code.service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface CodeService {

	List<CodeVO> selectCodeList();
	
	CodeVO selectCode(CodeVO codeVO);

	List<CodeVO> selectUpperCodeList();
	
	void insertCode(CodeVO codeVO);
		
	/** jstree */
	JSONArray selectTreeCodeList() throws Exception;
	JSONObject setTreeNode(String id, String parent, String text) throws Exception;

	int selectExists();

	int selectDuplicate(CodeVO codeVO);

}