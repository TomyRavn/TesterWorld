package kr.co.testerworld.code.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class CodeServiceImpl implements CodeService {

	@Autowired
	CodeDao codeDao;
	
	@Override
	public List<CodeVO> selectCodeList() {
		return codeDao.selectCodeList();
	}
	
	@Override
	public void insertCode(CodeVO codeVO) {
		int checkSeqNum = codeDao.checkSeqNum();
		
		codeVO.setCodeIdx("CD_" + Integer.toString(checkSeqNum + 1));
		
		codeDao.insertCode(codeVO);
	}

	@SuppressWarnings("unchecked")
	@Override
	public JSONArray selectTreeCodeList() throws Exception {
		
		List<CodeVO> tmpList = codeDao.selectCodeList();
		JSONArray codeList = new JSONArray();
		
		for(int i = 0; i < tmpList.size(); i++) {		//Column 총 갯수
			
			if(StringUtils.isEmpty(tmpList.get(i).getUpperCodeIdx())) {
				tmpList.get(i).setLevel(1);
				
				codeList.add(setTreeNode(tmpList.get(i).getCodeIdx(), "#", tmpList.get(i).getCodeNm()));
				
				for (int j = 0; j < tmpList.size(); j++) {
					if(tmpList.get(i).getCodeIdx().equals(tmpList.get(j).getUpperCodeIdx())) {
						tmpList.get(j).setLevel(2);
						
						codeList.add(setTreeNode(tmpList.get(j).getCodeIdx(), tmpList.get(j).getUpperCodeIdx(), tmpList.get(j).getCodeNm()));
						
						
						for (int k = 0; k < tmpList.size(); k++) {
							if(tmpList.get(j).getCodeIdx().equals(tmpList.get(k).getUpperCodeIdx())) {
								tmpList.get(k).setLevel(3);
								
								codeList.add(setTreeNode(tmpList.get(k).getCodeIdx(), tmpList.get(k).getUpperCodeIdx(), tmpList.get(k).getCodeNm()));
							}						
						}
					}					
				}
			}	
		}
		
		return codeList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public JSONObject setTreeNode(String id, String parent, String text) throws Exception {
		JSONObject obj = new JSONObject();
		
		obj.put("id", id);
		obj.put("parent", parent);
		obj.put("text", text);
		
		return obj;
	}

	@Override
	public CodeVO selectCode(CodeVO codeVO) {
		return codeDao.selectCode(codeVO);
	}

	@Override
	public List<CodeVO> selectUpperCodeList() {
		List<CodeVO> tmpList = codeDao.selectCodeList();
		List<CodeVO> codeList = new ArrayList<CodeVO>();
		
		for (int i = 0; i < tmpList.size(); i++) {
			if(StringUtils.isEmpty(tmpList.get(i).getUpperCodeIdx())) {
				tmpList.get(i).setLevel(1);
				codeList.add(tmpList.get(i));
								
				for (int j = 0; j < tmpList.size(); j++) {	//등록시에는 2depth까지만 선택하면 됨(상위 코드)
					if(tmpList.get(i).getCodeIdx().equals(tmpList.get(j).getUpperCodeIdx())) {
						tmpList.get(j).setLevel(2);
						codeList.add(tmpList.get(j));
					}
				}
			}
		}
		
		return codeList;
	}

	@Override
	public int selectExists() {
		return codeDao.selectExists();
	}

	@Override
	public int selectDuplicate(CodeVO codeVO) {
		return codeDao.selectDuplicate(codeVO);
	}
}
