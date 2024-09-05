package com.nanoDc.erp.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.nanoDc.erp.mapper.FilPriceMapper;
import com.nanoDc.erp.vo.FilPriceVO;


@Component
public class NanoDCBatch {
	
	@Value("${batch.app.enabled}")
    private String batchEnabled;
	 @Autowired
	 	private FilPriceMapper filPriceMapper;
	
	 @Scheduled(cron = "0 */10 * * * ?")
    public void runBatchJob() throws IOException {
		if(batchEnabled.equals("false")) {
			System.out.println("스케줄러 가 꺼져있네요!(로컬이면 정상)");
			return;
		}
        String CURRENCY_PAIR = "fil_krw";
        String apiUrl = "https://api.korbit.co.kr/v1/ticker?currency_pair=" + CURRENCY_PAIR;
        String last = "";
        long timestamp=0;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            String responseData = responseEntity.getBody();
            
            JSONObject jsonObject = new JSONObject(responseData);
            timestamp = jsonObject.getLong("timestamp");
            last = jsonObject.getString("last");
        } else {
            System.err.println("Error: " + responseEntity.getStatusCode());
        }
        FilPriceVO filPriceVO = new FilPriceVO();
        filPriceVO.setFil_last(Integer.parseInt(last));
        filPriceMapper.addNewFilPrice(filPriceVO);
        

		System.out.println("스케줄러 성공! 로컬에서 뜨면 안되요. 스케줄러 로컬테스트 환경에서는 꺼주세요");
    }
}




