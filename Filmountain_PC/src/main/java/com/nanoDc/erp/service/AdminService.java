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
import com.nanoDc.erp.config.AESUtil;


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
	LiquidityMapper liquidityMapper;
	@Autowired
	private AESUtil aESUtil;
	@Autowired
	AgreementMapper agreementMapper;
	@Autowired
	ApplicationMapper applicationMapper;
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
	        List<UserInfoVO> userInfoList = userInfoMapper.selectUserInfoList();
	        for (UserInfoVO userInfo : userInfoList) {
	            try {
	                userInfo.setUser_email(AESUtil.decrypt(userInfo.getUser_email()));
	                userInfo.setPhone_number(AESUtil.decrypt(userInfo.getPhone_number()));
	            } catch (Exception e) {
	                e.printStackTrace();
	                // 필요한 경우 예외 처리
	            }
	        }
	        return userInfoList;
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
	        UserInfoVO userInfo = userInfoMapper.selectDetailUserInfoByUserId(user_id);
	        try {
	            userInfo.setUser_email(AESUtil.decrypt(userInfo.getUser_email()));
	            userInfo.setPhone_number(AESUtil.decrypt(userInfo.getPhone_number()));
	        } catch (Exception e) {
	            e.printStackTrace();
	            // 필요한 경우 예외 처리
	        }
	        return userInfo;
	    }
	 public List<TransactionVO> getTransactionList() {
		    List<TransactionVO> transactionList = this.transactionMapper.getTransactionList();

		    for (TransactionVO transaction : transactionList) {
		        try {
		            transaction.setUser_email(AESUtil.decrypt(transaction.getUser_email()));
		        } catch (Exception e) {
		            e.printStackTrace();
		            // 필요한 경우 예외 처리
		        }
		    }

		    return transactionList;
		}

	 //LP 풀 참여 리스트
	 public List<LiquidityVO> getLiquidityList() {
	        return this.liquidityMapper.getLiquidityList();
	    }
	 public List<LiquidityVO> getLiquidityrewardList() {
	        return this.liquidityMapper.getLiquidityrewardList();
	    }
	 
	 public List<LiquidityVO> getLiquidityInfoByUser(int user_id) {
	        return this.liquidityMapper.getLiquidityInfoByUser(user_id);
	    }
	 public String updateLiquidityInfo(LiquidityVO liquidityVO, HttpServletRequest request) {
		 liquidityMapper.updateLiquidityInfo(liquidityVO);
	    	return "success";
	    }
	 
	 public String updateLPStatus(LiquidityVO liquidityVO, HttpServletRequest request) {
		 liquidityMapper.updateLPStatus(liquidityVO);
	    	return "success";
	    }
	 /*새로운 유저 추가*/
	 public String addNewUser(UserInfoVO userInfoVO, HttpServletRequest request) {
	    /*	UserInfoVO overlappingUserInfoVO = investmentMapper.verifyUserInfoVO(userInfoVO);
	    	if(overlappingUserInfoVO!=null) {
	    		return "error1";
	    	} */
	
			try {
				String encryptedUserEmail = AESUtil.encrypt(userInfoVO.getUser_email());
				String encryptionUserPhonenumber = AESUtil.encrypt(userInfoVO.getPhone_number());
				userInfoVO.setUser_email(encryptedUserEmail);
				userInfoVO.setPhone_number(encryptionUserPhonenumber);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	    	int userId = userInfoMapper.get_last_useriId();
	    	userInfoVO.setUser_id(userId);
	    	String value = pwEncoder.encode(userInfoVO.getPassword());
	    	userInfoVO.setPassword(value);
	    	userInfoMapper.addNewUser(userInfoVO);
	    
	    	
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
	 public List<HardwareRewardSharingDetailVO> selectRewardSharingDetailListById(int reward_sharing_id) {
	        List<HardwareRewardSharingDetailVO> rewardSharingDetailList = rewardSharingMapper.selectRewardSharingDetailListById(reward_sharing_id);

	        for (HardwareRewardSharingDetailVO detail : rewardSharingDetailList) {
	            UserInfoVO userInfo = detail.getUserInfoVO();
	            if (userInfo != null) {
	                try {
	                    userInfo.setUser_email(AESUtil.decrypt(userInfo.getUser_email()));
	                    userInfo.setPhone_number(AESUtil.decrypt(userInfo.getPhone_number()));
	                } catch (Exception e) {
	                    e.printStackTrace();
	                    // 필요한 경우 예외 처리
	                }
	            }
	        }
	        return rewardSharingDetailList;
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
	    		
	  //계약서 정보 가져오기
		 public List<AgreementVO> selectAgreementlist() {
		        return this.agreementMapper.selectAgreementlist();
		    }
		//신청서 정보 가져오기
			 public List<ApplicationVO> selectApplication() {
				 List<ApplicationVO> selectApplicationList = applicationMapper.selectApplication();
				 for (ApplicationVO application : selectApplicationList) {
			            try {
			            	application.setUser_email(AESUtil.decrypt(application.getUser_email()));
			            	application.setPhone_number(AESUtil.decrypt(application.getPhone_number()));
			            } catch (Exception e) {
			                e.printStackTrace();
			                // 필요한 경우 예외 처리
			            }
			        }
			        return selectApplicationList;
			    }
	    
			//**>>>>>  신청서 현황 업데이트  <<<<<**//
			    public String updateApplicationStatus(ApplicationVO applicationVO, HttpServletRequest request) {
				 	applicationMapper.updateApplicationStatus(applicationVO);
			    	return "success";
			    }
			    
			  //**>>>>>  새로운 계약 삽입 <<<<<**//
			    public String insertAgreement(AgreementVO agreementVO, HttpServletRequest request) {
				 	agreementMapper.insertAgreementProcess(agreementVO);
			    	return "success";
			    }
			    
			    //**>>>>>  계약현황 업데이트  <<<<<**//
			    public String updateAgreement(AgreementVO agreementVO, HttpServletRequest request) {
				 	agreementMapper.updateAgreement(agreementVO);
			    	return "success";
			    }
	 
	    
	 
}
