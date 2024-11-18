package com.nanoDc.erp.service;

import java.math.BigDecimal;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nanoDc.erp.mapper.AgreementMapper;
import com.nanoDc.erp.mapper.ApplicationMapper;
import com.nanoDc.erp.mapper.HardwareInvestmentMapper;
import com.nanoDc.erp.mapper.HardwareProductMapper;
import com.nanoDc.erp.mapper.HardwareRewardSharingMapper;
import com.nanoDc.erp.mapper.LiquidityMapper;
import com.nanoDc.erp.mapper.TransactionMapper;
import com.nanoDc.erp.mapper.UserInfoMapper;
import com.nanoDc.erp.vo.AgreementVO;
import com.nanoDc.erp.vo.ApplicationVO;
import com.nanoDc.erp.vo.HardwareInvestmentVO;
import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.HardwareRewardSharingVO;
import com.nanoDc.erp.vo.LiquidityVO;
import com.nanoDc.erp.vo.LoginVO;
import com.nanoDc.erp.vo.TransactionVO;
import com.nanoDc.erp.vo.UserInfoVO;



@Service
public class AdminService {
	@Autowired
    private PasswordEncoder pwEncoder;
	@Autowired
	UserInfoMapper userInfoMapper;
	@Autowired
	HardwareInvestmentMapper investmentMapper;
	@Autowired
	HardwareProductMapper productMapper;
	@Autowired
	HardwareRewardSharingMapper rewardSharingMapper;
	@Autowired
	TransactionMapper transactionMapper;
	@Autowired
	AgreementMapper agreementMapper;
	@Autowired
	ApplicationMapper applicationMapper;
	@Autowired
	LiquidityMapper liquidityMapper;
	
	//**>>>>>   관리자 지갑 정보   <<<<<**//
    @Value("${admin.wallet.address}")
    private String admin_walletAddress;
    
	 public boolean checkSession(HttpServletRequest request) {
	    	HttpSession session = request.getSession();
	    	LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        if (session.getAttribute("user") == null || loginVO.getId() == "") {
		        return false;
		    }
	        if (loginVO.getLevel() != null && !"관리자".equals(loginVO.getLevel())) {
	            return false;
	        }

	        
		    return true;
	    }	
	
	 public List<UserInfoVO> selectUserInfoList() {
	        return this.userInfoMapper.selectUserInfoList();
	    }
	 //계약서 정보 가져오기
	 public List<AgreementVO> selectAgreementlist() {
	        return this.agreementMapper.selectAgreementlist();
	    }
	//신청서 정보 가져오기
		 public List<ApplicationVO> selectApplication() {
		        return this.applicationMapper.selectApplication();
		    }
	 public List<HardwareProductVO> getProductList() {
	        return this.productMapper.getProductList();
	    }
	 public List<HardwareInvestmentVO> getInvestmentList() {
	        return this.investmentMapper.getInvestmentList();
	    }
	 
	 public List<HardwareRewardSharingVO> getRewardSharingList() {
	        return this.rewardSharingMapper.getRewardSharingList();
	    }
	 public UserInfoVO selectDetailUserInfoByUserId(int user_id) {
	    	return userInfoMapper.selectDetailUserInfoByUserId(user_id);
	    }
	 public List<TransactionVO> getTransactionList() {
	        return this.transactionMapper.getTransactionList();
	    }
	 
	 public List<LiquidityVO> getLiquidityList() {
	        return this.liquidityMapper.getLiquidityList();
	    }
	 public List<LiquidityVO> getLiquidityrewardList() {
	        return this.liquidityMapper.getLiquidityrewardList();
	    }
	 
	 /*새로운 유저 추가*/
	 public String addNewUser(UserInfoVO userInfoVO, HttpServletRequest request) {
	    /*	UserInfoVO overlappingUserInfoVO = investmentMapper.verifyUserInfoVO(userInfoVO);
	    	if(overlappingUserInfoVO!=null) {
	    		return "error1";
	    	} */
	    	userInfoMapper.addNewUser(userInfoVO);
	    	
	    	int userId = userInfoMapper.get_last_useriId();
	    	userInfoVO.setUser_id(userId);
	    	String value = pwEncoder.encode(userInfoVO.getPassword());
	    	userInfoVO.setPassword(value);
	    	userInfoMapper.addNewUser_pwd(userInfoVO);
	    	AgreementVO agreementVO = new AgreementVO();

	    	 if ("신규계약".equals(userInfoVO.getContract_status())) {
	             if ("NanoDC2p".equals(userInfoVO.getProduct())) {
	                 agreementVO.setSupply_price(200000000);
	                 agreementVO.setFirst_payment(50000000);
	                 agreementVO.setSecond_payment(100000000);
	                 agreementVO.setLast_payment(50000000);
	                 agreementVO.setFinal_payment(200000000);
	                 agreementVO.setUser_id(userId);
	     	    	agreementVO.setContract_status(userInfoVO.getContract_status());
	     	    	agreementVO.setProcess("전자서명 진행중");
	     	    	agreementMapper.insertAgreementProcess(agreementVO);
	             }
	             else if ("NanoDC4p".equals(userInfoVO.getProduct())) {
	                 agreementVO.setSupply_price(300000000);
	                 agreementVO.setFirst_payment(100000000);
	                 agreementVO.setSecond_payment(100000000);
	                 agreementVO.setLast_payment(100000000);
	                 agreementVO.setFinal_payment(300000000);
	                 agreementVO.setUser_id(userId);
	     	    	agreementVO.setContract_status(userInfoVO.getContract_status());
	     	    	agreementVO.setProcess("전자서명 진행중");
	     	    	agreementMapper.insertAgreementProcess(agreementVO);
	             }
	             else if ("NanoDC6p".equals(userInfoVO.getProduct())) {
	                 agreementVO.setSupply_price(500000000);
	                 agreementVO.setFirst_payment(200000000);
	                 agreementVO.setSecond_payment(100000000);
	                 agreementVO.setLast_payment(200000000);
	                 agreementVO.setFinal_payment(500000000);
	                 agreementVO.setUser_id(userId);
	     	    	agreementVO.setContract_status(userInfoVO.getContract_status());
	     	    	agreementVO.setProcess("전자서명 진행중");
	     	    	agreementMapper.insertAgreementProcess(agreementVO);
	             }
	    	}
	    	 else {
	    		 agreementVO.setContract_status(userInfoVO.getContract_status());
	     	    	agreementVO.setProcess("전자서명 진행중");
	     	    	agreementMapper.insertAgreementProcess(agreementVO);
	    	 }
	    	//UserInfoVO newUserInfoVO = investmentMapper.verifyUserInfoVO(userInfoVO);
	    	//memoVO.setUser_id(newUserInfoVO.getUser_id());
	    	//memoVO.setMemo(newUserInfoVO.memoCreate("유저등록"));
	    	//regMemo(memoVO, request);
	    	return "success";
	    }
	 /* 유저 정보 수정 */
	 
	 public String updateUser(UserInfoVO userInfoVO, HttpServletRequest request) {
		 	userInfoMapper.updateUser(userInfoVO);
	    	return "success";
	    }
	 
	 /* 유저 비밀번호 초기화 */
	 public String userPwReset(UserInfoVO userInfoVO, HttpServletRequest request) {
		 	userInfoMapper.userPwReset(userInfoVO);
		 	String value = pwEncoder.encode(userInfoVO.getPassword());
	    	userInfoVO.setPassword(value);
	    	userInfoMapper.userPwReset(userInfoVO);
	    	return "success";
	    }
	 
	 public String updatePwd(UserInfoVO userInfoVO, HttpServletRequest request) {
		 	userInfoMapper.update_Password(userInfoVO);
	    	return "success";
	    }
	 
	 /* 유저 투자 리스트 가져오기 */
	 public List<HardwareInvestmentVO> selectInvestmentListForUser(UserInfoVO userInfoVO){
	    	return investmentMapper.selectInvestmentListForUser(userInfoVO);
	    }
	 /* 유저 투자 등록 */
	 public String addNewInvestment(HardwareInvestmentVO hardwareInvestmentVO, HttpServletRequest request) {
		 	investmentMapper.addNewinvestmentUser(hardwareInvestmentVO);
	    	return "success";
	    }
	 /* 유저 투자 수정 */
	 public String updateinvestmentUser(HardwareInvestmentVO hardwareInvestmentVO, HttpServletRequest request) {
		 	investmentMapper.updateinvestmentUser(hardwareInvestmentVO);
	    	return "success";
	    }
	 
	 /* 상품 업데이트 */
	 public String updateProduct(HardwareProductVO hardwareProductVO, HttpServletRequest request) {
		 	productMapper.updateProduct(hardwareProductVO);
	    	return "success";
	    }
	
	 /*상품 등록*/
	 public String addProduct(HardwareProductVO hardwareProductVO, HttpServletRequest request) {
		 	productMapper.addProduct(hardwareProductVO);
	    	return "success";
	    }
	 /*배분 상세내역 조회*/
	 public List<HardwareRewardSharingDetailVO> selectRewardSharingDetailListById(int reward_sharing_id){
         return rewardSharingMapper.selectRewardSharingDetailListById(reward_sharing_id);
      }
	 /*송금 신청 승인*/
	 public String approveFundRequest(TransactionVO transactionVO) {
			
			
		    
		 	transactionMapper.updateStatus(transactionVO);
		    return "success";  
		}
	 /*송금 신청 거절*/
	 public String declineFundRequest(TransactionVO transactionVO) {
			// TODO Auto-generated method stub
		 transactionMapper.updateStatus(transactionVO);
		    // 조회된 행이 존재하고 상태가 '신청'인 경우에만 업데이트
			return "success";	
		} 
	 //**>>>>>   유저 배분 추가   <<<<<**//
	    	public String payout(HardwareRewardSharingVO hardwareRewardSharingVO, HttpServletRequest request) {
	
	    	rewardSharingMapper.insertHardwareRewardSharing(hardwareRewardSharingVO);
	    	int lastRewardShare_id = rewardSharingMapper.selectLastShareId();
	    	List<HardwareInvestmentVO> hardwareInvestmentList = investmentMapper.selectInvestmentListForProduct(hardwareRewardSharingVO.getHw_product_id());
	    	double totalInvestment = 0;
	    	for(int i=0;i<hardwareInvestmentList.size();i++) {
	    		totalInvestment += hardwareInvestmentList.get(i).getHw_invest_fil();
	    	}
	    	HardwareRewardSharingDetailVO rewardSharingDetail = new HardwareRewardSharingDetailVO();
	    	
	    	for(int i=0;i<hardwareInvestmentList.size();i++) {
	    		rewardSharingDetail.setReward_fil(hardwareInvestmentList.get(i).getHw_invest_fil()/totalInvestment*hardwareRewardSharingVO.getTotal_fil());
	    		rewardSharingDetail.setUser_id(hardwareInvestmentList.get(i).getUser_id());
	    		rewardSharingDetail.setHw_reward_sharing_id(lastRewardShare_id);
	    		rewardSharingMapper.insertHardwareRewardSharingDetail(rewardSharingDetail);
	    	} 		
	    	return "success";
	    }
	    	
	    //**>>>>>  지갑 체크   <<<<<**//
	    public BigDecimal walletCheck() {
	    	    String cmd = "echo $(lotus wallet balance "+ admin_walletAddress +") | awk '{print $1}'";
	    	    System.out.println(cmd);
	    	    String[] command = {"/bin/sh", "-c", cmd};
	    	    BigDecimal result = new BigDecimal(0); 
	    	    try {
	    	        ProcessBuilder processBuilder = new ProcessBuilder(command);
	    	        Process process = processBuilder.start();
	    	        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	    	        String line;
	    	        while ((line = reader.readLine()) != null) {
	    	            try {
	    	                result = new BigDecimal(line);
	    	            } catch (NumberFormatException e) {
	    	                result = new BigDecimal(-1);
	    	            }
	    	        }
	    	        int exitCode = process.waitFor();
	    	        if (exitCode != 0) {
	    	            result = new BigDecimal(-1); 
	    	        }
	    	    } catch (Exception e) {
	    	        result = new BigDecimal(-1); 
	    	    }
	    	    return result;
	    	}	
	    		
	  //**>>>>>  계약현황 업데이트  <<<<<**//
	    public String updateAgreement(AgreementVO agreementVO, HttpServletRequest request) {
		 	agreementMapper.updateAgreement(agreementVO);
	    	return "success";
	    }
	    
	  //**>>>>>  신청서 현황 업데이트  <<<<<**//
	    public String updateApplicationStatus(ApplicationVO applicationVO, HttpServletRequest request) {
		 	applicationMapper.updateApplicationStatus(applicationVO);
	    	return "success";
	    }
	    
	    
	  //**>>>>>  로터스 코인 전송 기능  <<<<<**//
	    public String lotusSend(String user_address, BigDecimal fil_amount) {
	    	    String cmd = "lotus send --from " +  admin_walletAddress +  " " + user_address + " " + fil_amount.toPlainString();
	    	    System.out.println(cmd);
	    	    
	    	    String[] command = {"/bin/sh", "-c", cmd};
	    	    String result = "";

	    	    try {
	    	        ProcessBuilder processBuilder = new ProcessBuilder(command);
	    	        Process process = processBuilder.start();
	    	        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	    	        String line;

	    	        while ((line = reader.readLine()) != null) {
	    	            result += line + "\n";
	    	        }

	    	        int exitCode = process.waitFor();
	    	        if (exitCode != 0) {
	    	            result = "Command failed";
	    	        }
	    	    } catch (Exception e) {
	    	        result = "ERROR";
	    	    }

	    	    return result.trim();
	    	}	
	 
}
