package com.nanoDc.erp.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

import org.json.JSONArray;
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

import com.nanoDc.erp.mapper.AthPriceMapper;
import com.nanoDc.erp.mapper.FilPriceMapper;
import com.nanoDc.erp.vo.FilPriceVO;
import com.nanoDc.erp.vo.AthPriceVO;


@Component
public class NanoDCBatch {
	
	@Value("${batch.app.enabled}")
    private String batchEnabled;
	 @Autowired
	 	private FilPriceMapper filPriceMapper;
	 @Autowired
	 	private AthPriceMapper athPriceMapper;
	 
	

			/* public void runBatchJob() throws IOException {
		if(batchEnabled.equals("false")) {
			System.out.println("스케줄러 가 꺼져있네요!(로컬이면 정상)");
			return;
		}
        String CURRENCY_PAIR = "fil_krw";
        String apiUrl = "https://api.korbit.co.kr/v1/ticker?currency_pair=" + CURRENCY_PAIR;
        String apiUrl2 = "https://api.upbit.com/v1/ticker?markets=KRW-ATH";
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
    }*/
	 @Scheduled(cron = "0 */10 * * * ?")
	 public void runBatchJob() throws IOException {
	     if (batchEnabled.equals("false")) {
	         System.out.println("스케줄러 가 꺼져있네요! (로컬이면 정상)");
	         return;
	     }

	     RestTemplate restTemplate = new RestTemplate();
	     HttpHeaders headers = new HttpHeaders();
	     headers.set("accept", "application/json");
	     HttpEntity<String> entity = new HttpEntity<>(headers);

	     try {
	         // 📌 FIL-KRW 가격 가져오기 (Korbit API)
	         String korbitApiUrl = "https://api.korbit.co.kr/v1/ticker?currency_pair=fil_krw";
	         ResponseEntity<String> responseEntity = restTemplate.exchange(korbitApiUrl, HttpMethod.GET, entity, String.class);
	         
	         String lastFil = "";
	         if (responseEntity.getStatusCode().is2xxSuccessful()) {
	             JSONObject jsonObject = new JSONObject(responseEntity.getBody());
	             lastFil = jsonObject.getString("last");
	         } else {
	             System.err.println("Korbit API 요청 실패: " + responseEntity.getStatusCode());
	         }

	         // 📌 ATH-KRW 가격 가져오기 (Upbit API)
	         String upbitApiUrl = "https://api.upbit.com/v1/ticker?markets=KRW-ATH";
	         ResponseEntity<String> responseEntity2 = restTemplate.exchange(upbitApiUrl, HttpMethod.GET, entity, String.class);

	         String lastAth = "";
	         if (responseEntity2.getStatusCode().is2xxSuccessful()) {
	             JSONArray jsonArray = new JSONArray(responseEntity2.getBody());
	             JSONObject jsonObject2 = jsonArray.getJSONObject(0);
	             lastAth = jsonObject2.get("trade_price").toString();
	         } else {
	             System.err.println("Upbit API 요청 실패: " + responseEntity2.getStatusCode());
	         }

	         // 📌 FIL-KRW 데이터 저장
	         if (!lastFil.isEmpty()) {
	             FilPriceVO filPriceVO = new FilPriceVO();
	             filPriceVO.setFil_last(Integer.parseInt(lastFil));
	             filPriceMapper.addNewFilPrice(filPriceVO);
	             System.out.println("FIL-KRW 가격 저장 완료: " + lastFil);
	         }

	         // 📌 ATH-KRW 데이터 저장
	         if (!lastAth.isEmpty()) {
	        	 AthPriceVO athPriceVO = new AthPriceVO();
	        	 athPriceVO.setAth_last((int) Math.floor(Double.parseDouble(lastAth)));  // ATH 가격 저장
	             athPriceMapper.addNewAthPrice(athPriceVO);
	             System.out.println("ATH-KRW 가격 저장 완료: " + lastAth);
	         }

	         System.out.println("✅ 스케줄러 실행 완료!");

	     } catch (Exception e) {
	         System.err.println("스케줄러 실행 중 오류 발생: " + e.getMessage());
	         e.printStackTrace();
	     }
	 }

}



