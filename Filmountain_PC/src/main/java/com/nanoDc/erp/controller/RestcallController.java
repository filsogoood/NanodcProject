package com.nanoDc.erp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RestcallController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/withdraw")
    public ResponseEntity<?> handleWithdraw(@RequestBody Map<String, Object> requestData) {
        String url = "http://192.168.100.14:5000/fevm/withdraw-v0";
        
        // 외부 API에 전달할 데이터를 준비합니다.
        Map<String, Object> externalApiData = new HashMap<>();
        externalApiData.put("liquidId", requestData.get("liquidId"));
        externalApiData.put("msigExecuteKeyId", requestData.get("msigExecuteKeyId"));
        externalApiData.put("amount", requestData.get("amount"));
        externalApiData.put("fromEthAddress", requestData.get("fromEthAddress"));
        externalApiData.put("toAddress", requestData.get("toAddress"));

        // 외부 API 호출
        ResponseEntity<Map> response = restTemplate.postForEntity(url, externalApiData, Map.class);

        // 외부 API 호출 결과를 반환
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> handleDeposit(@RequestBody Map<String, Object> requestData) {
        String url = "http://192.168.100.14:5000/fevm/deposit-v0";
        
        // 외부 API에 전달할 데이터를 준비합니다.
        Map<String, Object> externalApiData = new HashMap<>();
        externalApiData.put("liquidId", requestData.get("liquidId"));
        externalApiData.put("keyId", requestData.get("keyId"));
        externalApiData.put("amount", requestData.get("amount"));

        // 외부 API 호출
        ResponseEntity<Map> response = restTemplate.postForEntity(url, externalApiData, Map.class);

        // 외부 API 호출 결과를 반환
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
    @PostMapping("/generate-key")
    public ResponseEntity<?> generateKey(@RequestBody Map<String, Object> requestData) {
        String url = "http://192.168.100.14:5000/kms/generate-key";
        
        // 외부 API에 전달할 데이터를 준비합니다.
        Map<String, Object> externalApiData = new HashMap<>();
        externalApiData.put("userId", requestData.get("userId"));

        // 외부 API 호출
        ResponseEntity<Map> response = restTemplate.postForEntity(url, externalApiData, Map.class);

        // 외부 API 호출 결과를 반환
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
