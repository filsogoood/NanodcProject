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
import com.nanoDc.erp.mapper.FilPriceMapper;
import com.nanoDc.erp.mapper.HardwareInvestmentMapper;
import com.nanoDc.erp.mapper.HardwareProductMapper;
import com.nanoDc.erp.mapper.LiquidityMapper;
import com.nanoDc.erp.mapper.UserInfoMapper;
import com.nanoDc.erp.service.UserService;
import com.nanoDc.erp.vo.AgreementVO;
import com.nanoDc.erp.vo.ApplicationVO;
import com.nanoDc.erp.vo.FilPriceVO;
import com.nanoDc.erp.vo.HardwareInvestmentVO;
import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.LiquidityVO;
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
	 	private LiquidityMapper liquidityMapper;
	 @Autowired
		private AESUtil aESUtil;
	 @Value("${upload.directory2}")
	    private String uploadDirectory2;
	 	
	 
		@GetMapping(value={"/login"})
		  public ModelAndView Applogin(@ModelAttribute("loginError") String loginError,
		    		@ModelAttribute LoginVO loginVO,
		    	
		            HttpServletRequest request) {
		        ModelAndView mav = new ModelAndView();
		        HttpSession session = request.getSession();
		        if(userService.checkSession(request)==true) {
		        	mav.setViewName("redirect:/app/index");
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
		        	mav.setViewName("redirect:/app/index");
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
	        return "redirect:/app/login";
	    }
		
		
		 
		 @PostMapping(value={"/app/login.do"})
		    private String doAppLogin(LoginVO loginVO, BindingResult result, RedirectAttributes redirect, HttpServletRequest request, HttpServletResponse response) throws Exception {
		        LoginVO lvo = new LoginVO();
		        UserInfoVO userInfoVO = new UserInfoVO(); 
		        try {
		            // 입력받은 이메일 암호화
		            String encryptedEmail = AESUtil.encrypt(loginVO.getId());
		            userInfoVO.setUser_email(encryptedEmail);
		        }catch (Exception e) {
	                 e.printStackTrace();
	                 userInfoVO.setUser_email("아이디를 확인해주세요");
	             }
		        userInfoVO = userInfoMapper.verifyUserInfoVO(userInfoVO);
		        if (userInfoVO == null) {
		        	redirect.addFlashAttribute("loginError", "아이디를 확인해주세요");
		            return "redirect:/app/login";
		        }
		        if ("inactive".equals(userInfoVO.getUser_status())) {
		        	redirect.addFlashAttribute("loginError", "유효하지 않은 아이디입니다.");
		            return "redirect:/app/login";
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
		                 rememberMeCookie.setMaxAge(7 * 24 * 60 * 60); // 30 days
		                 response.addCookie(rememberMeCookie);
		                
		                 
		                session.setAttribute("user", (Object)lvo);
		                
		                return "redirect:/app/index";
		            }
		        }
		        
		        redirect.addFlashAttribute("loginError", "비밀번호를 확인해주세요");
		        return "redirect:/app/login";
		    }
				 
		
		
		 @GetMapping(value={"/app/index"})
		 public  ModelAndView Appindex(HttpServletRequest request) {
		    ModelAndView mav = new ModelAndView();
		    HttpSession session = request.getSession();
			    if(!userService.checkSession(request)) {
		        	mav.setViewName("redirect:/login");
		            return mav;
		        }
		        LoginVO loginVO = (LoginVO)session.getAttribute("user");
		        if (loginVO != null) {
		            try {
		                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
		                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
		                
		            } catch (Exception e) {
		                // 필요한 경우 예외 처리
		            }
		        }
		        
		        mav.addObject("loginVO", loginVO);
		        mav.setViewName("views/user/app/userApp_home");
		        return mav;
		    }
		 
		 @GetMapping(value={"/StorageProvider"})
		    public ModelAndView StorageProvider(HttpServletRequest request,@RequestParam(required = false) Integer hw_product_id) {
			 	
		        ModelAndView mav = new ModelAndView();
		        HttpSession session = request.getSession();
		        if(!userService.checkSession(request)) {
		        	mav.setViewName("redirect:/user/login");
		            return mav;
		        }
		        LoginVO loginVO = (LoginVO)session.getAttribute("user");
		        if ("관리자".equals(loginVO.getUserInfoVO().getLevel())) {
			    	 mav.setViewName("redirect:/admin/login");
			    	 return mav;
			        }
		        MainIndexMapper mainIndexMapper = userService.userAppMainInfoBuilder(request, hw_product_id);
		        String error="";
		        if(mainIndexMapper.getError().equals("No Investment")) {
		        	error="No Investment";
		        }
		        if (loginVO != null) {
		            try {
		                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
		                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
		                
		            } catch (Exception e) {
		                // 필요한 경우 예외 처리
		            }
		        }
		        mav.addObject("error",error);
		        mav.addObject("main_bg_src",mainIndexMapper.getMain_bg_src());
		        mav.addObject("progress_src",mainIndexMapper.getProgress_src());
		        mav.addObject("dividedList",mainIndexMapper.getDividedList());
		        mav.addObject("investDetailForHw",mainIndexMapper.getInvestDetailForHw());
		        mav.addObject("last", filPriceMapper.getLatestFilPrice().getFil_last());
		        mav.addObject("loginVO", mainIndexMapper.getLoginVO());
		        mav.setViewName("views/user/app/userSPApp_index");
		        return mav;
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
	        userService.userVOsessionUpdate(request);
	        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	        mav.addObject("firstDate",dateFormat.format(firstDate));
	        mav.addObject("lastDate",dateFormat.format(lastDate));
	        mav.addObject("dataList",dataList);
	        mav.addObject("dataSize",dataList.size());
	        mav.addObject("loginVO", loginVO);
	        mav.setViewName("views/user/price");
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
			        mav.addObject("loginVO", loginVO);
			        mav.addObject("investDetailForHw", investDetailForHw);
			        mav.setViewName("views/user/status");
			        return mav;
			    }
	 
		@GetMapping(value = {"/Liquidity_Dashboard"})
		public ModelAndView Liquidity_Dashboard(HttpServletRequest request) {
		    ModelAndView mav = new ModelAndView();
		    HttpSession session = request.getSession();

		    if (!userService.checkSession(request)) {
		        mav.setViewName("redirect:/login");
		        return mav;
		    }

		    LoginVO loginVO = (LoginVO) session.getAttribute("user");
		    mav.addObject("withLoginOptions", true);
		    mav.addObject("userName", loginVO.getUserInfoVO().getUser_name());

		    int userId = loginVO.getUserInfoVO().getUser_id();
		    List<WalletVO> walletList = this.userService.getWalletListByUser(userId);
		    List<LiquidityVO> selectLiquiditytxByUser = userService.selectLiquiditytxByUser(userId);
		    List<LiquidityVO> selectLiquidityRewardByUser = userService.selectLiquidityRewardByUser(userId);
		    List<LiquidityVO> selectLiquidityInfotxByUser = userService.selectLiquidityInfotxByUser(userId);
		    List<LiquidityVO> findUserContributionByUserId = userService.findUserContributionByUserId(userId);
		    int filprice = filPriceMapper.getLatestFilPrice().getFil_last();

		    for (LiquidityVO liquidity : selectLiquiditytxByUser) {
		        BigDecimal filAmount = liquidity.getFil_amount();
		        
		        if (filAmount != null) {
		            // 불필요한 소수점 이하 0 제거
		            filAmount = filAmount.stripTrailingZeros();
		            // 소수점 이하가 없는 경우 정수로 출력되도록 toPlainString() 사용
		            liquidity.setFil_amount(new BigDecimal(filAmount.toPlainString()));
		        }
		    }
		    UserInfoVO userInfoVO = loginVO.getUserInfoVO();
	        if (loginVO != null) {
	        	
	        	 try {
	        		 userInfoVO.setUser_email(AESUtil.decrypt(userInfoVO.getUser_email()));
	        		 userInfoVO.setPhone_number(AESUtil.decrypt(userInfoVO.getPhone_number()));
		            } catch (Exception e) {
		                // 필요한 경우 예외 처리
		            }
	           
	        }
	        if (loginVO != null) {
	            try {
	                // loginVO 안의 userInfoVO 객체에 직접 접근하여 값 변경
	                loginVO.getUserInfoVO().setUser_email(AESUtil.decrypt(loginVO.getUserInfoVO().getUser_email()));
	                
	            } catch (Exception e) {
	                // 필요한 경우 예외 처리
	            }
	        }
		    mav.addObject("loginVO", loginVO);
		    mav.addObject("userInfoVO", userInfoVO);
		    mav.addObject("LiquiditytxByUser", selectLiquiditytxByUser);
		    mav.addObject("LiquidityRewardByUser", selectLiquidityRewardByUser);
		    mav.addObject("LiquidityInfotxByUser", selectLiquidityInfotxByUser);
		    mav.addObject("findUserContributionByUserId", findUserContributionByUserId);
		    mav.addObject("filprice", filprice);
		    mav.addObject("walletList", walletList);

		    mav.setViewName("views/user/app/userLiquidity");
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
	 /* LP송금신청 */
	 @ResponseBody
	 @PostMapping(value={"/addNewLPTransaction"})
	 public String addNewLPTransaction(@RequestBody LiquidityVO liquidityVO, HttpServletRequest request) {
	    return userService.addNewLPTransaction(liquidityVO);
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