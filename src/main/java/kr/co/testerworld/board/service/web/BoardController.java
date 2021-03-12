package kr.co.testerworld.board.service.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.testerworld.board.service.BoardService;
import kr.co.testerworld.board.service.BoardVO;
import kr.co.testerworld.board.service.ReplyService;
import kr.co.testerworld.board.service.ReplyVO;
import kr.co.testerworld.util.CacheControlUtil;
import kr.co.testerworld.util.IPAddressUtil;
import kr.co.testerworld.util.Pager;

@Controller
@RequestMapping("/board")
public class BoardController {
	
	@Autowired
	BoardService boardService;
	
	@Autowired
	ReplyService replyService;
	
	IPAddressUtil ipAddressUtil = new IPAddressUtil();

	@RequestMapping("/list.do")
	String boardList(ModelMap model, HttpServletRequest request, HttpServletResponse response, Pager pager) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		List<BoardVO> boardList = boardService.selectBoardList(pager);
		
		model.addAttribute("boardList", boardList);
		
		return "board/boardMain";
	}
	
	@GetMapping("/regist.do")
	String boardRegistForm(HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		return "board/boardRegist";
	}
	
	@PostMapping("/regist.do")
	String boardRegist(BoardVO boardVO, HttpServletRequest request, HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		boardVO.setInsIp(ipAddressUtil.getIp(request));
		
		if(StringUtils.isEmpty(boardVO.getBdWriter())) {
			request.getSession().setAttribute("message", "작성자를 입력해주세요");
			return "redirect:regist.do";
		}
		else {
			if(StringUtils.isEmpty(boardVO.getBdTitle())) {
				boardVO.setBdTitle("제목없음");
			}
			boardService.insertBoard(boardVO);
			request.getSession().setAttribute("message", "글 등록에 성공하였습니다.");
			return "redirect:list.do";
		}
	}
	
	@RequestMapping("/delete.do")
	String boardDelete(BoardVO boardVO) {
		
		boardService.deleteBoard(boardVO);
		
		return "redirect:list.do";
	}
	
	@GetMapping("/edit.do")
	String boardEditForm(BoardVO boardVO, ModelMap model, HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		BoardVO bdVO = boardService.selectBoard(boardVO);
		
		model.addAttribute("boardVO", bdVO);
		
		return "board/boardEdit";
	}
	
	@PostMapping("/edit.do")
	String boardEdit(BoardVO boardVO, HttpServletRequest request, HttpServletResponse response) {
		response = CacheControlUtil.getInstance().getResponse(response);
		
		//real IP 
		boardVO.setUptIp(ipAddressUtil.getIp(request));
		
		if(StringUtils.isEmpty(boardVO.getBdTitle())) {
			boardVO.setBdTitle("제목없음");
		}
		
		if(!StringUtils.isEmpty(boardVO.getBdIdx())) {
			BoardVO tempVO = boardService.selectBoard(boardVO);
			
			if(!boardVO.getBdTitle().equals(tempVO.getBdTitle()) || !boardVO.getBdCn().equals(tempVO.getBdCn())) {
				boardService.updateBoard(boardVO);
				request.getSession().setAttribute("message", "글 수정이 성공하였습니다.");
			}
		
		}else {
			request.getSession().setAttribute("message", "글 수정이 실패하였습니다.");
		}
		
		return "redirect:list.do";
	}
	
	@RequestMapping("/dummy.do")
	String dummy(HttpServletRequest request) {
		
		BoardVO boardVO = new BoardVO();
		
		for(int i = 0; i < 10; i++) {
			boardVO.setBdTitle("더미 데이터" + i + (System.currentTimeMillis()));
			boardVO.setBdWriter("더미 작성자");
			boardVO.setBdCn("아무 내용");
			boardVO.setInsIp(ipAddressUtil.getIp(request));
			boardService.dummy(boardVO);
		}
		
		return "redirect:list.do";
	}
	
	
	@ResponseBody
	@GetMapping("/replyAjax.do")
	Map<String, Object> boardReplyListAjax(ReplyVO replyVO) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		List<ReplyVO> replyList = replyService.selectReplyList(replyVO);
		
		map.put("replyList", replyList);
		
		return map;
	}
	
	@ResponseBody
	@PostMapping("/replyAjax.do")
	void boardReplyAjax(HttpServletRequest request, ReplyVO replyVO) {
		
		if(!StringUtils.isEmpty(replyVO.getRepCn()) && !StringUtils.isEmpty(replyVO.getRepWriter())) {
			//real IP 
			replyVO.setRepInsIp(ipAddressUtil.getIp(request));
			
			replyService.insertReply(replyVO);
		}
	}
	
	@ResponseBody
	@RequestMapping("/privateReplyAjax.do")
	Map<String, Object> boardPrivateReplyAjax(HttpServletRequest request, ReplyVO replyVO) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		replyVO.setRepIdx(Integer.parseInt(request.getParameter("idx")));
		replyVO.setRepPw(request.getParameter("pw"));
		
		ReplyVO repVO = replyService.selectReply(replyVO);
		
		if(repVO != null) {
			map.put("message", "success");
			map.put("replyVO", repVO);
		}
		
		return map;
	}
	
	
	@RequestMapping("/reply.do")
	String ViewReply(ReplyVO replyVO, ModelMap model) {
		List<ReplyVO> replyList = replyService.selectReplyList(replyVO);
		
		model.addAttribute("replyList", replyList);
		
		return "board/reply";
	}
}