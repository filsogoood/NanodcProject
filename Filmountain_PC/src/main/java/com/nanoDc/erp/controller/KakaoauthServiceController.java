package com.nanoDc.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.barocert.BarocertException;
import com.barocert.kakaocert.KakaocertService;
import com.barocert.kakaocert.identity.Identity;
import com.barocert.kakaocert.identity.IdentityReceipt;
import com.nanoDc.erp.vo.IdentityStatusVO;

@RestController
@RequestMapping("/kakaocert")
public class KakaoauthServiceController {

    private static final Logger logger = LoggerFactory.getLogger(KakaoauthServiceController.class);

    @Autowired
    private KakaocertService kakaocertService;

    @Value("${kakaocert.clientCode}")
    private String ClientCode;

    @PostMapping("/requestIdentity")
    public IdentityReceipt requestIdentity(@RequestBody Map<String, String> requestData) throws BarocertException {
        logger.info("Requesting identity with data: {}", requestData);

        String receiverHP = requestData.get("tel");
        String receiverName = requestData.get("name");
        String receiverBirthday = requestData.get("dob");

        Identity identity = new Identity();
        try {
            identity.setReceiverHP(kakaocertService.encrypt(receiverHP));
            identity.setReceiverName(kakaocertService.encrypt(receiverName));
            identity.setReceiverBirthday(kakaocertService.encrypt(receiverBirthday));
            identity.setReqTitle("NANODC 본인인증 요청");
            identity.setExtraMessage(kakaocertService.encrypt("본인인증 요청"));
            identity.setExpireIn(1000);
            identity.setToken(kakaocertService.encrypt("본인인증 요청"));
            identity.setAppUseYN(false);
        } catch (Exception e) {
            logger.error("Error encrypting identity information", e);
            throw new BarocertException(0, "Encryption error", e);
        }

        try {
            IdentityReceipt result = kakaocertService.requestIdentity(ClientCode, identity);
            logger.info("Identity requested successfully: {}", result);
            return result;
        } catch (BarocertException ke) {
            logger.error("Error requesting identity", ke);
            throw ke;
        }
    }

    @GetMapping("/checkIdentityStatus")
    public ResponseEntity<IdentityStatusVO> checkIdentityStatus(@RequestParam String requestId) {
        logger.info("Checking identity status for requestId: {}", requestId);
        if (!requestId.matches("\\d+")) {
        	IdentityStatusVO response = new IdentityStatusVO(-1, "Invalid requestId: Must be numeric");
            return ResponseEntity.badRequest().body(response);
        }
        try {
            com.barocert.kakaocert.identity.IdentityStatus barocertStatus = kakaocertService.getIdentityStatus(ClientCode, requestId);

            // 상태에 따른 메시지 설정
            String message;
            boolean isCompleted = false;
            switch (barocertStatus.getState()) {
                case 0:
                    message = "대기 중입니다."; // "Pending"
                    break;
                case 1:
                    if (barocertStatus.getCompleteDT() != null) {
                        message = "본인인증이 완료되었습니다."; // "Request completed"
                        isCompleted = true;
                    } else {
                        message = "본인인증 요청이 접수되었습니다."; // "Request accepted"
                    }
                    break;
                case 2:
                    message = "요청이 만료되었습니다."; // "Request expired"
                    break;
                default:
                    message = "알 수 없는 상태입니다."; // "Unknown status"
                    break;
            }

            // 로그에 상태와 completeDT 추가
            logger.info("Identity status: state = {}, completeDT = {}", barocertStatus.getState(), barocertStatus.getCompleteDT());

            IdentityStatusVO status = new IdentityStatusVO(barocertStatus.getState(), message, barocertStatus.getCompleteDT());
            return ResponseEntity.ok(status); // 상태에 관계없이 상태 반환

        } catch (BarocertException e) {
            logger.error("Error checking identity status", e);
            IdentityStatusVO response = new IdentityStatusVO(-1, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}