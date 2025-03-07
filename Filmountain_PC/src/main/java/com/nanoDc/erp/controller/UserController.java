package com.nanoDc.erp.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nanoDc.erp.config.AESUtil;
import com.nanoDc.erp.mapper.AthPriceMapper;
import com.nanoDc.erp.mapper.FilPriceMapper;
import com.nanoDc.erp.mapper.HardwareInvestmentMapper;
import com.nanoDc.erp.mapper.HardwareProductMapper;
import com.nanoDc.erp.mapper.UserInfoMapper;
import com.nanoDc.erp.service.UserService;
import com.nanoDc.erp.vo.AgreementVO;
import com.nanoDc.erp.vo.ApplicationVO;
import com.nanoDc.erp.vo.AthPriceVO;
import com.nanoDc.erp.vo.FilPriceVO;
import com.nanoDc.erp.vo.HardwareInvestmentVO;
import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.LoginVO;
import com.nanoDc.erp.vo.MainIndexMapper;
import com.nanoDc.erp.vo.TransactionVO;
import com.nanoDc.erp.vo.UserInfoVO;
import com.nanoDc.erp.vo.WalletVO;

@Controller
@RequestMapping("/")
public class UserController {
	
	 @Autowired
	 private UserService userService;
	 
	 @Autowired
	 private UserInfoMapper userInfoMapper;
	 
	 @Autowired
	 private HardwareInvestmentMapper hardwareInvestmentMapper;
	 
	 @Autowired
	 private HardwareProductMapper hardwareProductMapper;
	 
	 @Autowired
	 private FilPriceMapper filPriceMapper;
	 
	 @Autowired
	 private PasswordEncoder pwEncoder;
	 
	 @Autowired
	 private AESUtil aESUtil;
	 
	 @Autowired
	 private AthPriceMapper athPriceMapper;
	 
	 
	 @Value("${upload.directory2}")
	    private String uploadDirectory2;
	 	
	 
		@GetMapping(value={"/login"})
		  public ModelAndView Applogin(@ModelAttribute("loginError") String loginError,
		    		@ModelAttribute LoginVO loginVO,
		    	
		            HttpServletRequest request) {
		        ModelAndView mav = new ModelAndView();
		        HttpSession session = request.getSession();
		        if(userService.checkSession(request)==true) {
		        	mav.setViewName("redirect:/main");
		            return mav;
		        }
		            mav.setViewName("views/user/app/app_Login");
		            mav.addObject("loginError", loginError);
		            return mav;
		}
	
		@GetMapping(value={"/app/Signup"})
		  public ModelAndView AppSignup(@ModelAttribute("loginError") String loginError,
		    		@ModelAttribute LoginVO loginVO,
		    	
		            HttpServletRequest request) {
		        ModelAndView mav = new ModelAndView();
		        HttpSession session = request.getSession();
		        if(userService.checkSession(request)==true) {
		        	mav.setViewName("redirect:/main");
		            return mav;
		        }
		            mav.setViewName("views/user/userSignup");
		            return mav;
		} 
		
		@GetMapping("/checkUserEmail")
		public ResponseEntity<Map<String, Boolean>> checkUserEmail(@RequestParam String user_email) {
		    Map<String, Boolean> response = new HashMap<>();
		    
		    try {
		        // 사용자 입력 이메일 암호화
		        String encryptedEmail = AESUtil.encrypt(user_email);
		        
		        // 암호화된 이메일로 중복 체크
		        boolean isDuplicate = userService.isEmailDuplicate(encryptedEmail);
		        
		        // 결과를 해시맵에 담기
		        response.put("isDuplicate", isDuplicate);
		        
		        // 응답 반환
		        return ResponseEntity.ok(response);
		    } catch (Exception e) {
		        e.printStackTrace();
		        // 필요한 경우 예외 처리
		        response.put("error", true);
		        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(response);
		    }
		}
		
		@GetMapping("/checkUser")
		public ResponseEntity<Map<String, Boolean>> checkUser(@RequestParam String user_name, @RequestParam String phone_number) {
		    Map<String, Boolean> response = new HashMap<>();
		    
		    try {
		        // 사용자 입력 이메일 암호화
		        String encryptedPhone_number = AESUtil.encrypt(phone_number);
		        
		        // 암호화된 이메일로 중복 체크
		        boolean isDuplicate = userService.isPhone_numberNameDuplicate(user_name,encryptedPhone_number);
		        
		        // 결과를 해시맵에 담기
		        response.put("isDuplicate", isDuplicate);
		        
		        // 응답 반환
		        return ResponseEntity.ok(response);
		    } catch (Exception e) {
		        e.printStackTrace();
		        // 필요한 경우 예외 처리
		        response.put("error", true);
		        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(response);
		    }
		}
		
		
		@GetMapping(value={"/app/logout"})
	    public String Applogout(HttpServletRequest request, HttpServletResponse response) {
	        HttpSession session = request.getSession();
	        session.invalidate();
	        
	       /* Cookie[] cookies = request.getCookies();
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                if ("nanodc_userApp".equals(cookie.getName())) {
	                    cookie.setMaxAge(0);
	                    response.addCookie(cookie);
	                    break;
	                }
	            }
	        }*/
	        return "redirect:/login";
	    }
		
		
		 
//		 @PostMapping(value={"/app/login.do"})
//		    private String doAppLogin(LoginVO loginVO, BindingResult result, RedirectAttributes redirect, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		        LoginVO lvo = new LoginVO();
//		        UserInfoVO userInfoVO = new UserInfoVO(); 
//		        try {
//		            // 입력받은 이메일 암호화
//		            String encryptedEmail = AESUtil.encrypt(loginVO.getId());
//		            userInfoVO.setUser_email(encryptedEmail);
//		        }catch (Exception e) {
//	                 e.printStackTrace();
//	                 userInfoVO.setUser_email("아이디를 확인해주세요");
//	             }
//		        userInfoVO = userInfoMapper.verifyUserInfoVO(userInfoVO);
//		        if (userInfoVO == null) {
//		        	redirect.addFlashAttribute("loginError", "아이디를 확인해주세요");
//		            return "redirect:/login";
//		        }
//		        if ("inactive".equals(userInfoVO.getUser_status())) {
//		        	redirect.addFlashAttribute("loginError", "유효하지 않은 아이디입니다.");
//		            return "redirect:/login";
//		        }
//		  
//		        
//		        HttpSession session = request.getSession();
//		        String rawPw = "";
//		        String encodePw = "";
//		        if (userInfoVO != null) {
//		        	lvo.setId(userInfoVO.getUser_name());
//		        	userInfoVO=userInfoMapper.selectDetailUserInfoByUserId(userInfoVO.getUser_id());
//		            lvo.setUserInfoVO(userInfoVO);
//		            lvo.setLevel(userInfoVO.getLevel());
//		        	rawPw = loginVO.getPassword();
//		            String value = pwEncoder.encode(rawPw);
//		            if (this.pwEncoder.matches((CharSequence)rawPw, encodePw = userInfoMapper.getUserPassword(userInfoVO.getUser_id()))) {
//		                lvo.setPassword("");
//		                 Cookie rememberMeCookie = new Cookie("nanodc_userApp", String.valueOf(userInfoVO.getUser_id()));
//		                 rememberMeCookie.setMaxAge(7 * 24 * 60 * 60); // 30 days
//		                 response.addCookie(rememberMeCookie);
//		                
//		                 
//		                session.setAttribute("user", (Object)lvo);
//		                
//		                return "redirect:/StorageProvider";
//		            }
//		        }
//		        
//		        redirect.addFlashAttribute("loginError", "비밀번호를 확인해주세요");
//		        return "redirect:/login";
//		    }
				 
		@PostMapping(value={"/app/login.do"})
		private String doAppLogin(LoginVO loginVO, BindingResult result, RedirectAttributes redirect, HttpServletRequest request, HttpServletResponse response) throws Exception {
		    LoginVO lvo = new LoginVO();
		    UserInfoVO userInfoVO = new UserInfoVO(); 
		    try {
		        // 입력받은 이메일 암호화
		        String encryptedEmail = AESUtil.encrypt(loginVO.getId());
		        userInfoVO.setUser_email(encryptedEmail);
		    } catch (Exception e) {
		         e.printStackTrace();
		         userInfoVO.setUser_email("아이디를 확인해주세요");
		    }
		    userInfoVO = userInfoMapper.verifyUserInfoVO(userInfoVO);
		    if (userInfoVO == null) {
		        redirect.addFlashAttribute("loginError", "아이디를 확인해주세요");
		        return "redirect:/login";
		    }
		    if ("inactive".equals(userInfoVO.getUser_status())) {
		        redirect.addFlashAttribute("loginError", "유효하지 않은 아이디입니다.");
		        return "redirect:/login";
		    }

		    HttpSession session = request.getSession();
		    String rawPw = "";
		    String encodePw = "";
		    if (userInfoVO != null) {
		        lvo.setId(userInfoVO.getUser_name());
		        userInfoVO=userInfoMapper.selectDetailUserInfoByUserId(userInfoVO.getUser_id());
		        lvo.setUserInfoVO(userInfoVO);
		        lvo.setLevel(userInfoVO.getLevel());
		        rawPw = loginVO.getPassword();
		        String value = pwEncoder.encode(rawPw);
		        if (this.pwEncoder.matches((CharSequence)rawPw, encodePw = userInfoMapper.getUserPassword(userInfoVO.getUser_id()))) {
		            lvo.setPassword("");
		            Cookie rememberMeCookie = new Cookie("nanodc_userApp", String.valueOf(userInfoVO.getUser_id()));
		            rememberMeCookie.setMaxAge(7 * 24 * 60 * 60); // 7일
		            response.addCookie(rememberMeCookie);
		            
		            session.setAttribute("user", (Object)lvo);
		            
		            // 기존 코드:
		            // return "redirect:/StorageProvider";
		            
		            // 수정된 코드: 플랫폼 선택 페이지로 리다이렉트
		            return "redirect:/main";
		        }
		    }
		    
		    redirect.addFlashAttribute("loginError", "비밀번호를 확인해주세요");
		    return "redirect:/login";
		}

		// 추가: 플랫폼 선택 페이지 매핑
		@GetMapping(value={"/platform-choice"})
		public ModelAndView platformChoice(HttpServletRequest request) {
		    ModelAndView mav = new ModelAndView();
		    HttpSession session = request.getSession();
		    
		    if(!userService.checkSession(request)) {
		        mav.setViewName("redirect:/login");
		        return mav;
		    }
		    
		    LoginVO loginVO = (LoginVO)session.getAttribute("user");
		    mav.addObject("loginVO", loginVO);
		    mav.setViewName("views/user/app/platform_choice");
		    return mav;
		}

		// Aethir 플랫폼 페이지 매핑 (기본 골격)
		@GetMapping(value={"/aethir"})
		public ModelAndView aethirPlatform(HttpServletRequest request) {
		    ModelAndView mav = new ModelAndView();
		    HttpSession session = request.getSession();
		    
		    if(!userService.checkSession(request)) {
		        mav.setViewName("redirect:/login");
		        return mav;
		    }
		    
		    LoginVO loginVO = (LoginVO)session.getAttribute("user");
		    mav.addObject("loginVO", loginVO);
		    
		    // 아직 Aethir 플랫폼 페이지가 없으므로 임시로 공통 페이지로 연결
		    // 추후 Aethir 전용 대시보드 페이지를 만들면 해당 뷰로 변경
		    mav.setViewName("views/user/app/aethir_dashboard");
		    return mav;
		}
		
		
		 
		 @GetMapping(value={"/main"})
		    public ModelAndView StorageProvider(HttpServletRequest request) {
			 	
		        ModelAndView mav = new ModelAndView();
		        HttpSession session = request.getSession();
		        if(!userService.checkSession(request)) {
		        	mav.setViewName("redirect:/login");
		            return mav;
		        }
		        LoginVO loginVO = (LoginVO)session.getAttribute("user");
		       
		   
		        String error="";
		     
		        if (loginVO != null) {
		            try {
		                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
		                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
		                
		            } catch (Exception e) {
		                // 필요한 경우 예외 처리
		            }
		        }
		        List<HardwareInvestmentVO> investmentList = this.userService.selectInvestmentListForUser(loginVO.getUserInfoVO());
		        
		        HardwareProductVO product_detail = hardwareProductMapper.getProductById(loginVO.getUserInfoVO().getHw_product_id()); 
		        List<HardwareRewardSharingDetailVO> rewardDetailList = userService.selectRewardSharingDetailListByUser(loginVO.getUserInfoVO().getUser_id());
		        
		        Date lastRewardDate = new Date();
		        Date firstRewardDate= new Date();
		        long  interval =0;
		        List<Double> dataList = new ArrayList<Double>();
		        if(!rewardDetailList.isEmpty()) {
		        lastRewardDate = rewardDetailList.get(0).getRegdate();
		        firstRewardDate = rewardDetailList.get(rewardDetailList.size()-1).getRegdate();
		        interval = (lastRewardDate.getTime() - firstRewardDate.getTime())/30;
		        for(long i= firstRewardDate.getTime() + interval;i<lastRewardDate.getTime()+interval;i += interval) {
		        	double data=0;
			        for(int j = rewardDetailList.size()-1;j>=0;j--) {
			        	if(rewardDetailList.get(j).getRegdate().getTime()<=i) {
			        		data += rewardDetailList.get(j).getReward_fil();
			        		if(j==0) {
			        			dataList.add(data);
				        		break;
			        		}
			        	}else {
			        		dataList.add(data);
			        		break;
			        	}
			        }
		        }

		        }
		        mav.addObject("error",error);
		     
		        mav.addObject("last", filPriceMapper.getLatestFilPrice().getFil_last());
		        mav.addObject("investmentList",investmentList);
		        mav.addObject("product_detail",product_detail);
		        mav.addObject("rewardDetailList",rewardDetailList);
		        mav.addObject("ath_last", athPriceMapper.getLatestAthPrice().getAth_last());
		        mav.addObject("loginVO", loginVO);
		        mav.setViewName("views/user/app/userSPApp_index");
		        return mav;
		    }
		 @ResponseBody
		 @PostMapping(value={"/userAppMainInfoBuilder"})
		 public MainIndexMapper userAppMainInfoBuilder(@RequestBody MainIndexMapper mainIndexMapper, HttpServletRequest request) {
			 HttpSession session = request.getSession();
		        if(!userService.checkSession(request)) {
		        	MainIndexMapper mainIndexMapper_temp = new MainIndexMapper();
		        	mainIndexMapper_temp.setError("session closed");
		        	return mainIndexMapper_temp;
		        }
		    return userService.userAppMainInfoBuilder(request,mainIndexMapper.getHw_product_id());
		    }   
	//유저프로필편집
	@GetMapping(value={"/profileEdit"})
	 public  ModelAndView profileEdit(HttpServletRequest request) {
	    ModelAndView mav = new ModelAndView();
	    HttpSession session = request.getSession();
		    if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        if (loginVO != null) {
	        	UserInfoVO userInfoVO = loginVO.getUserInfoVO();
	        	 try {
	        		 userInfoVO.setUser_email(AESUtil.decrypt(userInfoVO.getUser_email()));
	        		 userInfoVO.setPhone_number(AESUtil.decrypt(userInfoVO.getPhone_number()));
		            } catch (Exception e) {
		                
		                // 필요한 경우 예외 처리
		            }
	            mav.addObject("withLoginOptions", true);
	            mav.addObject("userInfoVO", userInfoVO);
	            mav.addObject("loginVO", loginVO);
	        } else {
	            mav.addObject("withLoginOptions", false);
	        }
	        mav.setViewName("views/user/userprofileEdit");
	        return mav;
	    }
	
		//나의 계약현황
		@GetMapping(value={"/myAgreement"})
		 public  ModelAndView myAgreement(HttpServletRequest request) {
		    ModelAndView mav = new ModelAndView();
		    HttpSession session = request.getSession();
			    if(!userService.checkSession(request)) {
		        	mav.setViewName("redirect:/login");
		            return mav;
		        }
		        LoginVO loginVO = (LoginVO)session.getAttribute("user");
		        if (loginVO != null) {
		        	UserInfoVO userInfoVO = loginVO.getUserInfoVO();
		        	 try {
		        		 userInfoVO.setUser_email(AESUtil.decrypt(userInfoVO.getUser_email()));
		        		 userInfoVO.setPhone_number(AESUtil.decrypt(userInfoVO.getPhone_number()));
			            } catch (Exception e) {
			                
			                // 필요한 경우 예외 처리
			            }
		        	int userId = loginVO.getUserInfoVO().getUser_id();
			        List<AgreementVO> agreements = userService.getAgreementsByUserId(userId);
			        mav.addObject("agreements", agreements);
		            mav.addObject("withLoginOptions", true);
		            mav.addObject("userInfoVO", userInfoVO);
		            mav.addObject("loginVO", loginVO);
		        } else {
		            mav.addObject("withLoginOptions", false);
		        }
		        mav.setViewName("views/user/userMyAgreement");
		        return mav;
		    }
	
	
	
	
	
	
	//유저프로필편집
	/*@GetMapping(value={"/profileIconEdit"})
	 public  ModelAndView profileIconEdit(HttpServletRequest request) {
	    ModelAndView mav = new ModelAndView();
	    HttpSession session = request.getSession();
		    if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        mav.addObject("loginVO", loginVO);
	        mav.setViewName("views/user/userApp_profileIconEdit");
	        return mav;
	    }*/
		
	//유저 sp 대시보드
	
		//유저투자
		@GetMapping(value={"/investment"})
	    public ModelAndView investment(HttpServletRequest request) {
	        ModelAndView mav = new ModelAndView();
	        HttpSession session = request.getSession();
	        if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        List<HardwareInvestmentVO> investmentList = this.userService.selectInvestmentListForUser(loginVO.getUserInfoVO());
	        
	        HardwareProductVO product_detail = hardwareProductMapper.getProductById(loginVO.getUserInfoVO().getHw_product_id()); 
	        mav.addObject("product_detail",product_detail);
	        mav.addObject("investmentList", investmentList);
	        mav.addObject("loginVO", loginVO);
	        mav.setViewName("views/user/app/userApp-SPinvestment");
	        return mav;
	    }
		//유저 보상
		@GetMapping(value={"/reward"})
	    public ModelAndView reward(HttpServletRequest request) {
	        ModelAndView mav = new ModelAndView();
	        HttpSession session = request.getSession();
	        if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        
	        List<HardwareRewardSharingDetailVO> rewardDetailList = userService.selectRewardSharingDetailListByUser(loginVO.getUserInfoVO().getUser_id());
	        
	        Date lastRewardDate = new Date();
	        Date firstRewardDate= new Date();
	        long  interval =0;
	        List<Double> dataList = new ArrayList<Double>();
	        if(!rewardDetailList.isEmpty()) {
	        lastRewardDate = rewardDetailList.get(0).getRegdate();
	        firstRewardDate = rewardDetailList.get(rewardDetailList.size()-1).getRegdate();
	        interval = (lastRewardDate.getTime() - firstRewardDate.getTime())/30;
	        for(long i= firstRewardDate.getTime() + interval;i<lastRewardDate.getTime()+interval;i += interval) {
	        	double data=0;
		        for(int j = rewardDetailList.size()-1;j>=0;j--) {
		        	if(rewardDetailList.get(j).getRegdate().getTime()<=i) {
		        		data += rewardDetailList.get(j).getReward_fil();
		        		if(j==0) {
		        			dataList.add(data);
			        		break;
		        		}
		        	}else {
		        		dataList.add(data);
		        		break;
		        	}
		        }
	        }

	        }
	        
	    
	        
	        
	        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	        userService.userVOsessionUpdate(request);
	        if (loginVO != null) {
	            try {
	                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
	                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
	                
	            } catch (Exception e) {
	                // 필요한 경우 예외 처리
	            }
	        }
	        mav.addObject("dataList",dataList);
	        mav.addObject("firstDate",dateFormat.format(firstRewardDate));
	        mav.addObject("lastDate",dateFormat.format(lastRewardDate));
	        mav.addObject("dataSize",dataList.size());
	        mav.addObject("rewardDetailList", rewardDetailList);
	        mav.addObject("loginVO", loginVO);
	        mav.setViewName("views/user/app/reward");
	        return mav;
	    }
		
		
		@GetMapping(value={"/cash"})
	    public ModelAndView SP_dashboard(HttpServletRequest request) {
			
	        ModelAndView mav = new ModelAndView();
	        HttpSession session = request.getSession();
	        if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	            
	       
	        List<WalletVO> walletList = this.userService.getWalletListByUser(loginVO.getUserInfoVO().getUser_id());
	        List<TransactionVO> transactionList = this.userService.selectTransactionsByUser(loginVO.getUserInfoVO().getUser_id());
	        List<HardwareProductVO> product_detail = this.userService.getProductListByUserId(loginVO.getUserInfoVO().getUser_id());
	        List<HardwareInvestmentVO> investmentList = this.userService.selectInvestmentListForUser(loginVO.getUserInfoVO());
	        List<HardwareRewardSharingDetailVO> reward_list = this.userService.selectRewardSharingDetailListByUser(loginVO.getUserInfoVO().getUser_id());
	        
	        Date lastRewardDate = new Date();
	        Date firstRewardDate= new Date();
	        long  interval =0;
	        List<Double> dataList = new ArrayList<Double>();
	        if(!reward_list.isEmpty()) {
	        lastRewardDate = reward_list.get(0).getRegdate();
	        firstRewardDate = reward_list.get(reward_list.size()-1).getRegdate();
	        interval = (lastRewardDate.getTime() - firstRewardDate.getTime())/30;
	        for(long i= firstRewardDate.getTime() + interval;i<lastRewardDate.getTime()+interval;i += interval) {
	        	double data=0;
		        for(int j = reward_list.size()-1;j>=0;j--) {
		        	if(reward_list.get(j).getRegdate().getTime()<=i) {
		        		data += reward_list.get(j).getReward_fil();
		        		if(j==0) {
		        			dataList.add(data);
			        		break;
		        		}
		        	}else {
		        		dataList.add(data);
		        		break;
		        	}
		        }
	        }

	        }
	   
	        
	        
	        UserInfoVO userInfoVO = loginVO.getUserInfoVO();
	       
	        
	        
	        userService.userVOsessionUpdate(request);
	        if (loginVO != null) {
	            try {
	                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
	                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
	                loginVO.getUserInfoVO().setPhone_number(AESUtil.decrypt(loginVO.getUserInfoVO().getPhone_number()));
	                userInfoVO.setPhone_number(AESUtil.decrypt(loginVO.getUserInfoVO().getPhone_number()));
	                
	            } catch (Exception e) {
	                // 필요한 경우 예외 처리
	            }
	        }
	        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	        mav.addObject("product_detail",product_detail);
	        mav.addObject("reward_list",reward_list);
	        mav.addObject("dataList",dataList);
	        mav.addObject("firstDate",dateFormat.format(firstRewardDate));
	        mav.addObject("lastDate",dateFormat.format(lastRewardDate));
	        mav.addObject("dataSize",dataList.size());
	        mav.addObject("investmentList", investmentList);
	        mav.addObject("transactionList", transactionList);
	        mav.addObject("walletList", walletList);
	        mav.addObject("loginVO", loginVO);
	        mav.addObject("userInfoVO", userInfoVO);
	        mav.addObject("withLoginOptions", true);
	        mav.setViewName("views/user/userStorageProvider");
	  
	        return mav;
	    }
 
	//FIL 가격 현황 페이지
		@GetMapping(value={"/price"})
	    public ModelAndView price(HttpServletRequest request) {
	        ModelAndView mav = new ModelAndView();
	        HttpSession session = request.getSession();
	        if(!userService.checkSession(request)) {
	        	mav.setViewName("redirect:/login");
	            return mav;
	        }
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        List<FilPriceVO> filPriceList = filPriceMapper.getFilPriceDataForMonth();
	        List<AthPriceVO> athPriceList = athPriceMapper.getAthPriceDataForMonth();
	        
	        Date lastDate = new Date();
	        Date firstDate= new Date();
	        long interval=0;
	        List<Integer> dataList = new ArrayList<Integer>();
	        if(!filPriceList.isEmpty()) {
		        lastDate = filPriceMapper.getLatestFilPrice().getReg_date();
		        firstDate = filPriceList.get(0).getReg_date();
		        interval = (lastDate.getTime() - firstDate.getTime())/30;
		        for(int i=0;i<filPriceList.size();i++) {
		        	dataList.add(filPriceList.get(i).getFil_last());
		        }
	        }
	        
	        Date athLastDate = new Date();
	        Date athFirstDate = new Date();
	        List<Integer> athDataList = new ArrayList<Integer>();
	        
	        if(!athPriceList.isEmpty()) {
	            athLastDate = athPriceMapper.getLatestAthPrice().getReg_date();
	            athFirstDate = athPriceList.get(0).getReg_date();
	            for(int i=0; i<athPriceList.size(); i++) {
	                athDataList.add(athPriceList.get(i).getAth_last());
	            }
	        }
	        
	        userService.userVOsessionUpdate(request);
	        if (loginVO != null) {
	            try {
	                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
	                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
	                
	            } catch (Exception e) {
	                // 필요한 경우 예외 처리
	            }
	        }
	        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	        mav.addObject("firstDate",dateFormat.format(firstDate));
	        mav.addObject("lastDate",dateFormat.format(lastDate));
	        mav.addObject("dataList",dataList);
	        mav.addObject("dataSize",dataList.size());
	        mav.addObject("loginVO", loginVO);
	        mav.setViewName("views/user/app/price");
	        
	        mav.addObject("athDataList", athDataList);
	        mav.addObject("athFirstDate", dateFormat.format(athFirstDate));
	        mav.addObject("athLastDate", dateFormat.format(athLastDate));
	        mav.addObject("athDataSize", athDataList.size());
	        mav.addObject("ath_last", athPriceMapper.getLatestAthPrice().getAth_last());
	        
	        return mav;
	    }
		
				@GetMapping(value={"/status"})
			    public ModelAndView status(HttpServletRequest request) {
			        ModelAndView mav = new ModelAndView();
			        HttpSession session = request.getSession();
			        if(!userService.checkSession(request)) {
			        	mav.setViewName("redirect:/login");
			            return mav;
			        }
			        
			        LoginVO loginVO = (LoginVO)session.getAttribute("user");
			        int userId = loginVO.getUserInfoVO().getUser_id();
			        List<HardwareProductVO> investDetailForHw = hardwareProductMapper.getProductListByUserId(userId);
			        userService.userVOsessionUpdate(request);
			        if (loginVO != null) {
			            try {
			                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
			                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
			                
			            } catch (Exception e) {
			                // 필요한 경우 예외 처리
			            }
			        }
			        mav.addObject("loginVO", loginVO);
			        mav.addObject("investDetailForHw", investDetailForHw);
			        mav.setViewName("views/user/app/status");
			        return mav;
			    }
	 
		

		 @GetMapping(value={"/privacyPolicy"})
		 public  ModelAndView privacyPolicy(HttpServletRequest request) {
			 ModelAndView mav = new ModelAndView();
			    HttpSession session = request.getSession();
				    
			        LoginVO loginVO = (LoginVO)session.getAttribute("user");  
			        if (loginVO != null) {
			        	UserInfoVO userInfoVO = loginVO.getUserInfoVO();
			        	 try {
			        		 userInfoVO.setUser_email(AESUtil.decrypt(userInfoVO.getUser_email()));
			        		 userInfoVO.setPhone_number(AESUtil.decrypt(userInfoVO.getPhone_number()));
				            } catch (Exception e) {
				                
				                // 필요한 경우 예외 처리
				            }
			            mav.addObject("withLoginOptions", true);
			            mav.addObject("userInfoVO", userInfoVO);
			        } else {
			            mav.addObject("withLoginOptions", false);
			        }
		        mav.setViewName("views/user/privacyPolicy");
		        return mav;
		 }
		        
		@GetMapping(value={"/termsBasic"})
		public  ModelAndView termsBasic(HttpServletRequest request) {
				    ModelAndView mav = new ModelAndView();
				   
				        mav.setViewName("views/user/termsBasic");
				        return mav;   
		}
		
		@GetMapping(value={"/termsPersonalSign"})
		public  ModelAndView termsPersonalSign(HttpServletRequest request) {
				    ModelAndView mav = new ModelAndView();
				   
				        mav.setViewName("views/user/termsPersonalSign");
				        return mav;   
		}
		 @GetMapping(value={"/contract"})
		 public ModelAndView contract(HttpServletRequest request) {
		     ModelAndView mav = new ModelAndView();
		     HttpSession session = request.getSession();
		     if (!userService.checkSession(request)) {
		         mav.setViewName("redirect:/login");
		         return mav;
		     }
		     
		     LoginVO loginVO = (LoginVO) session.getAttribute("user");
		     if (loginVO != null && loginVO.getUserInfoVO() != null) {
		         int userId = loginVO.getUserInfoVO().getUser_id();
		         List<AgreementVO> agreements = userService.getAgreementsByUserId(userId);
		         for (AgreementVO agreement : agreements) {
		             if ("true".equals(agreement.getAuth_status())) {
		                 mav.setViewName("redirect:/user/agreement");
		                 return mav;
		             }
		         }
		         mav.addObject("loginVO", loginVO);
		         mav.addObject("agreements", agreements);
		         LocalDate currentDate = LocalDate.now();
		         DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyyMMdd");
		         String formattedDate1 = currentDate.format(formatter1);
		         mav.addObject("currentDate", formattedDate1);

		         DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy년 M월 d일");
		         String formattedDate2 = currentDate.format(formatter2);
		         mav.addObject("formattedDate", formattedDate2);
		     } else {
		         mav.setViewName("redirect:/login");
		         return mav;
		     }
		     
		     mav.setViewName("views/user/contract_view");
		     return mav;
		 }
	 
	 /*유저 프로필 편집 기능 */
	 @ResponseBody
	    @PostMapping(value = { "/DOuserprofileEdit" })
	    public String DOadminPwdUpdate(@RequestBody UserInfoVO userInfoVO, HttpServletRequest request) {
		 String uvo = this.userInfoMapper.getUserPassword(userInfoVO.getUser_id());
		 if(!userService.checkSession(request)) {
	    		return "failed:session_closed";
	    	}
		   String rawPw = "";
	       String encodePw = "";
	      
	       int user_id = userInfoVO.getUser_id();
	       
	       rawPw = userInfoVO.getPassword();
	        if (this.pwEncoder.matches((CharSequence)rawPw, encodePw = uvo)) {
	        	userInfoVO.setNew_password(pwEncoder.encode(userInfoVO.getNew_password()));
	        	HttpSession session = request.getSession();
	        	session.invalidate();
	            	return  userService.updateProfile(userInfoVO, request);
	           }
	            else{
	            	return "비밀번호가 일치하지 않습니다";}
	    }
	 /*유저 프로필 편집 기능 */
	 @ResponseBody
	    @PostMapping(value = { "/user_profile_icon_edit" })
	    public String user_profile_icon_edit(@RequestBody UserInfoVO userInfoVO, HttpServletRequest request) {
		 String uvo = this.userInfoMapper.getUserPassword(userInfoVO.getUser_id());
		 if(!userService.checkSession(request)) {
	    		return "failed:session_closed";
	    	}
	        return  userService.update_user_icon(userInfoVO, request);
	    } 
	 /* SP송금신청 */
	 @ResponseBody
	 @PostMapping(value={"/addNewTransaction"})
	 public String addNewTransaction(@RequestBody TransactionVO transactionVO, HttpServletRequest request) {
		  HttpSession session =  userService.userVOsessionUpdate(request);
	        LoginVO loginVO = (LoginVO)session.getAttribute("user");
	        transactionVO.setHw_product_id(loginVO.getUserInfoVO().getHw_product_id());
	    return userService.addNewTransaction(transactionVO);
	    }   
	
	 /* 유저지갑추가 */
	 @ResponseBody
	 @PostMapping(value={"/addspWallet"})
	 public String addNewWallet(@RequestBody WalletVO walletVO, HttpServletRequest request) {
	    return userService.addspWallet(walletVO);
	    }   
	 /* 유저지갑삭제 */
	 @ResponseBody
	 @PostMapping(value={"/deleteWalletByWalletId"})
	 public String deleteWalletByWalletId(@RequestBody WalletVO walletVO, HttpServletRequest request) {
	    return userService.deleteWalletByWalletId(walletVO.getWallet_id());
	    }  
	 /* 신청서 제출 */
	 @ResponseBody
	 @PostMapping(value={"/insertApplication"})
	 public String insertApplication(@RequestBody ApplicationVO applicationVO, HttpServletRequest request) {
	    return userService.insertApplication(applicationVO,request);
	    }  
	 
	 
	 @ResponseBody
	 @PostMapping(value = "/updateContract", consumes = {"multipart/form-data"})
	 public String updateContract(@RequestPart("agreementVO") AgreementVO agreementVO,
	                              @RequestPart(value = "file", required = false) MultipartFile file,
	                              HttpServletRequest request) {
	     Logger logger = LoggerFactory.getLogger(this.getClass());

	     logger.debug("Request received for updating contract");

	     if (!userService.checkSession(request)) {
	         logger.debug("Session invalid");
	         return "failed:session_closed";
	     }

	     

	     if (file != null && !file.isEmpty()) {
	         try {
	             String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	             logger.debug("Uploading file: {}", fileName);

	             Path uploadPath = Paths.get(uploadDirectory2);
	             if (!Files.exists(uploadPath)) {
	                 Files.createDirectories(uploadPath);
	             }

	             Path filePath = uploadPath.resolve(fileName);
	             file.transferTo(filePath.toFile());
	             String filePathString = "/" + fileName;
	             agreementVO.setAgreement_dir(filePathString);

	             logger.debug("File uploaded successfully: {}", filePathString);
	         } catch (IOException e) {
	             logger.error("File upload error", e);
	             return "failed:file_upload_error";
	         }
	     } else {
	         logger.debug("No file to upload or file is empty");
	     }

	     return userService.updateContract_info(agreementVO, request);
	 }
  			


}