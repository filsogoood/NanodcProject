package com.nanoDc.erp.service;

import com.nanoDc.erp.mapper.ApplicationMapper;
import com.nanoDc.erp.vo.ApplicationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationMapper applicationMapper;

    @Autowired
    private EmailService emailService;

    public void saveApplication(ApplicationVO application) {
        // 애플리케이션 저장
        applicationMapper.insertApplication(application);

        // 이메일 전송
        String[] to = { "ella@zetacube.net", "zofldls@naver.com" }; // 여러 이메일 주소
        String subject = "New Application Submission";
        String text = "이름: " + application.getName() + "\n" +
                "생년월일: " + application.getDob() + "\n" +
                "전화번호: " + application.getTel() + "\n" +
                "Email: " + application.getEmail() + "\n" +
                "구분: " + application.getLevel() + "\n" +
                "상품: " + application.getSp_product() + "\n" +
                "메세지: " + application.getMessage();
        emailService.sendSimpleMessage(to, subject, text);
    }
}