package com.nanoDc.erp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.barocert.BarocertException;
import com.barocert.kakaocert.KakaocertService;
import com.barocert.kakaocert.sign.Sign;
import com.barocert.kakaocert.sign.SignReceipt;
import com.barocert.kakaocert.sign.SignStatus;
import com.barocert.kakaocert.sign.SignResult;

import com.nanoDc.erp.mapper.AgreementMapper;
import com.nanoDc.erp.mapper.UserInfoMapper;
import com.nanoDc.erp.vo.AgreementVO;
import com.nanoDc.erp.vo.LoginVO;
import com.nanoDc.erp.vo.UserInfoVO;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class KakaoAgreementService {

    @Autowired
    private KakaocertService kakaocertService;

    @Autowired
    private AgreementMapper agreementMapper;

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Autowired
    private UserService userService;

    @Value("${kakaocert.clientCode}")
    private String clientCode;

    public Map<String, Object> requestSign(String name, String hp, String birthday, HttpServletRequest request)
            throws BarocertException {
        HttpSession session = request.getSession();

        if (!userService.checkSession(request)) {
            throw new RuntimeException("User not logged in");
        }

        LoginVO loginVO = (LoginVO) session.getAttribute("user");
        UserInfoVO userInfo = loginVO.getUserInfoVO();

        // Debug information
        System.out.println("LoginVO in session: " + loginVO);
        System.out.println("UserInfo from LoginVO: " + userInfo);

        // Check if the user has already verified the contract
        List<AgreementVO> agreements = agreementMapper.selectByIdAgreementList(userInfo.getUser_id());
        for (AgreementVO agreement : agreements) {
            if ("Verified".equals(agreement.getAuth_status())) {
                throw new RuntimeException("User has already verified the contract");
            }
        }

        // Validate the user information
        if (userInfo == null || !name.equals(userInfo.getUser_name()) || !hp.equals(userInfo.getPhone_number())
                || userInfo.getUser_id() != loginVO.getUserInfoVO().getUser_id()) {
            throw new RuntimeException("User information does not match the logged-in user");
        }

        // Encrypt user information
        String encryptedHp = kakaocertService.encrypt(hp);
        String encryptedName = kakaocertService.encrypt(name);
        String encryptedBirthday = kakaocertService.encrypt(birthday);

        // Prepare the sign object
        Sign sign = new Sign();
        sign.setReceiverHP(encryptedHp);
        sign.setReceiverName(encryptedName);
        sign.setReceiverBirthday(encryptedBirthday);
        sign.setSignTitle("Contract Signature Request");
        sign.setExtraMessage(kakaocertService.encrypt("Please sign the contract."));
        sign.setExpireIn(1000);
        sign.setToken(kakaocertService.encrypt("This is the contract content for signing."));
        sign.setTokenType("TEXT");
        sign.setAppUseYN(false);

        Map<String, Object> response = new HashMap<>();

        try {
            // Request sign and store session attributes
            SignReceipt result = kakaocertService.requestSign(clientCode, sign);
            session.setAttribute("receiptID", result.getReceiptID());
            session.setAttribute("name", name);
            session.setAttribute("hp", hp);
            session.setAttribute("birthday", birthday);
            session.setAttribute("user_id", userInfo.getUser_id()); // Set user ID dynamically
            response.put("result", true);
            response.put("receiptID", result.getReceiptID());
        } catch (BarocertException ke) {
            response.put("result", false);
            response.put("error", ke.getMessage());
        }
        return response;
    }

    public Map<String, Object> getSignStatus(String receiptID) throws BarocertException {
        Map<String, Object> response = new HashMap<>();
        try {
            SignStatus result = kakaocertService.getSignStatus(clientCode, receiptID);
            response.put("result", true);
            response.put("status", result);
        } catch (BarocertException ke) {
            response.put("result", false);
            response.put("error", ke.getMessage());
        }
        return response;
    }

    public Map<String, Object> verifySign(String receiptID, HttpSession session) throws BarocertException {
        Map<String, Object> response = new HashMap<>();
        try {
            SignResult result = kakaocertService.verifySign(clientCode, receiptID);
            if (result.getState() == 1) { // Signed state
                Integer userId = (Integer) session.getAttribute("user_id");
                if (userId == null) {
                    throw new NullPointerException("user_id is null in session");
                }

                // Update the database column auth_status = 1
                agreementMapper.updateAuthStatus(userId, "1");
                response.put("result", true);
                response.put("verification", result);
            } else {
                response.put("result", false);
                response.put("error", "Sign not completed");
            }
        } catch (NullPointerException e) {
            response.put("result", false);
            response.put("error", "NullPointerException: " + e.getMessage());
        } catch (BarocertException ke) {
            response.put("result", false);
            response.put("error", ke.getMessage());
        }
        return response;
    }

    public String verificationComplete(HttpSession session, Model model) {
        String receiptID = (String) session.getAttribute("receiptID");
        if (receiptID == null) {
            return "redirect:/index";
        }
        model.addAttribute("receiptID", receiptID);
        return "verification_complete";
    }

    public Map<String, Object> confirmAuthStatus(HttpSession session, String receiptID) {
        Map<String, Object> response = new HashMap<>();
        try {
            Integer userId = (Integer) session.getAttribute("user_id");
            if (userId == null) {
                throw new NullPointerException("user_id is null in session");
            }

            // Update the database column auth_status = 1
            agreementMapper.updateAuthStatus(userId, "1");
            response.put("result", true);
        } catch (NullPointerException e) {
            response.put("result", false);
            response.put("error", "NullPointerException: " + e.getMessage());
        } catch (Exception e) {
            response.put("result", false);
            response.put("error", e.getMessage());
        }
        return response;
    }

    public boolean isUserVerified(int userId) {
        List<AgreementVO> agreements = agreementMapper.selectByIdAgreementList(userId);
        return agreements.stream().anyMatch(agreement -> "1".equals(agreement.getAuth_status()));
    }
}