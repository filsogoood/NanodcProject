package com.nanoDc.erp.controller;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.barocert.BarocertException;
import com.nanoDc.erp.mapper.AgreementMapper;
import com.nanoDc.erp.service.KakaoAgreementService;
import com.nanoDc.erp.service.UserService;
import com.nanoDc.erp.vo.AgreementVO;
import com.nanoDc.erp.vo.LoginVO;

import java.util.Map;
import java.util.List;

@Controller
public class KakaocertServiceController {

    @Autowired
    private KakaoAgreementService kakaoAgreementService;

    @Autowired
    private UserService userService;

    @Autowired
    private AgreementMapper agreementMapper;

    @GetMapping("/kakaocert/signForm")
    public ModelAndView showSignForm(HttpServletRequest request, HttpSession session, Model model) {
    	ModelAndView mav = new ModelAndView();
    	if(!userService.checkSession(request)) {
        	mav.setViewName("redirect:/login");
            return mav;
        }

/*        Boolean signInitiated = (Boolean) session.getAttribute("signInitiated");
        if (signInitiated == null || !signInitiated) {
            return "redirect:/contract";
        }*/

        LoginVO loginVO = (LoginVO) session.getAttribute("user");
        if (loginVO != null && loginVO.getUserInfoVO() != null) {
            boolean isVerified = kakaoAgreementService.isUserVerified(loginVO.getUserInfoVO().getUser_id());
            if (isVerified) {
                model.addAttribute("message", "이미 서명하셨습니다.");
                mav.setViewName("redirect:/myAgreement");
                return mav;
            }
        }
        mav.setViewName("views/user/kakao_contract_sign");
        
        return mav;
    }

    @PostMapping("/kakaocert/requestSign")
    @ResponseBody
    public Map<String, Object> requestSign(
            @RequestParam("name") String name,
            @RequestParam("hp") String hp,
            @RequestParam("birthday") String birthday,
            HttpSession session, HttpServletRequest request) throws BarocertException {

        if (!userService.checkSession(request)) {
            throw new RuntimeException("User not logged in");
        }

        return kakaoAgreementService.requestSign(name, hp, birthday, request);
    }

    @GetMapping("/kakaocert/getSignStatus/{receiptID}")
    @ResponseBody
    public Map<String, Object> getSignStatus(@PathVariable("receiptID") String receiptID, HttpServletRequest request)
            throws BarocertException {
        if (!userService.checkSession(request)) {
            throw new RuntimeException("User not logged in");
        }
        return kakaoAgreementService.getSignStatus(receiptID);
    }

    @GetMapping("/kakaocert/verifySign/{receiptID}")
    @ResponseBody
    public Map<String, Object> verifySign(@PathVariable("receiptID") String receiptID, HttpSession session,
            HttpServletRequest request) throws BarocertException {
        if (!userService.checkSession(request)) {
            throw new RuntimeException("User not logged in");
        }
        return kakaoAgreementService.verifySign(receiptID, session);
    }

    @GetMapping("/kakaocert/confirmAuthStatus")
    public ModelAndView showConfirmationPage(@RequestParam("receiptID") String receiptID, HttpServletRequest request,
            Model model) {
    	ModelAndView mav = new ModelAndView();
    	if(!userService.checkSession(request)) {
        	mav.setViewName("redirect:/login");
            return mav;
        }
        model.addAttribute("receiptID", receiptID);
        mav.setViewName("views/user/kakao_confirm");
        
        return mav;
    }

    @PostMapping("/kakaocert/confirmAuthStatus")
    @ResponseBody
    public Map<String, Object> confirmAuthStatus(@RequestBody Map<String, String> requestBody,
            HttpServletRequest request) {
        if (!userService.checkSession(request)) {
            throw new RuntimeException("User not logged in");
        }
        String receiptID = requestBody.get("receiptID");
        return kakaoAgreementService.confirmAuthStatus(request.getSession(), receiptID);
    }

    @PostMapping("/kakaocert/initiateVerification")
    public ResponseEntity<?> initiateVerification(@RequestParam("user_id") int userId) {
        // Check if user has already verified
        List<AgreementVO> agreements = agreementMapper.selectByIdAgreementList(userId);
        for (AgreementVO agreement : agreements) {
            if ("1".equals(agreement.getAuth_status())) {
                return ResponseEntity.status(HttpStatus.SC_FORBIDDEN)
                        .body("User has already completed verification.");
            }
        }

        // Proceed with verification initiation
        // Your existing code to initiate verification...
        return ResponseEntity.ok().body("Verification initiated.");
    }

}