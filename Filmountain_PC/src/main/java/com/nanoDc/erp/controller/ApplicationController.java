package com.nanoDc.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nanoDc.erp.service.ApplicationService;
import com.nanoDc.erp.vo.ApplicationVO;

@Controller
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/apply")
    public String showApplyForm() {
        return "index"; // home.html 템플릿 파일
    }

    @PostMapping("/submit")
    @ResponseBody
    public String submitApplication(@RequestBody ApplicationVO application) {
        applicationService.saveApplication(application);
        return "{\"status\":\"success\"}";
    }
}