package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.UserInfoVO;

@Mapper
public interface UserInfoMapper {
	public List<UserInfoVO> selectUserInfoList();
	public void addNewUser(UserInfoVO userInfoVO);
	public void addNewUser_pwd(UserInfoVO userInfoVO);
	public int get_last_useriId();
	public void updateUser(UserInfoVO userInfoVO);
	public void userPwReset(UserInfoVO userInfoVO);
	public UserInfoVO verifyUserInfoVO(UserInfoVO userInfoVO);
	public String getUserPassword(int i);
	public UserInfoVO selectDetailUserInfoByUserId(int user_id);
	public UserInfoVO selectInvestDetailInfoByUserIdAndProductId(UserInfoVO userInfoVO);
	public void update_Password (UserInfoVO userInfoVO);
	public void update_user_icon (UserInfoVO userInfoVO);
	public int checkUser_email(String userEmail);
	public int checkPhonenumberName(String user_name, String phone_number);
	
}
