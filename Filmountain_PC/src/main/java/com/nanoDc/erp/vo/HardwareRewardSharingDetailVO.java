package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="HardwareRewardSharingDetailVO")
public class HardwareRewardSharingDetailVO {

	private UserInfoVO userInfoVO;
	private HardwareRewardSharingVO hardwareRewardSharingVO;
	private HardwareProductVO hardwareProductVO;
	private long reward_sharing_detail_id;
	private long hw_reward_sharing_id;
	private int user_id;
	private double reward_fil;
	private String hw_product_name;
	private int hw_product_id;
	private Date regdate;
	
	
	
	public HardwareProductVO getHardwareProductVO() {
		return hardwareProductVO;
	}
	public void setHardwareProductVO(HardwareProductVO hardwareProductVO) {
		this.hardwareProductVO = hardwareProductVO;
	}
	public UserInfoVO getUserInfoVO() {
		return userInfoVO;
	}
	public void setUserInfoVO(UserInfoVO userInfoVO) {
		this.userInfoVO = userInfoVO;
	}
	public HardwareRewardSharingVO getHardwareRewardSharingVO() {
		return hardwareRewardSharingVO;
	}
	public void setHardwareRewardSharingVO(HardwareRewardSharingVO hardwareRewardSharingVO) {
		this.hardwareRewardSharingVO = hardwareRewardSharingVO;
	}
	public long getReward_sharing_detail_id() {
		return reward_sharing_detail_id;
	}
	public void setReward_sharing_detail_id(long reward_sharing_detail_id) {
		this.reward_sharing_detail_id = reward_sharing_detail_id;
	}
	public long getHw_reward_sharing_id() {
		return hw_reward_sharing_id;
	}
	public void setHw_reward_sharing_id(long hw_reward_sharing_id) {
		this.hw_reward_sharing_id = hw_reward_sharing_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public double getReward_fil() {
		return reward_fil;
	}
	public void setReward_fil(double reward_fil) {
		this.reward_fil = reward_fil;
	}
	public String getHw_product_name() {
		return hw_product_name;
	}
	public void setHw_product_name(String hw_product_name) {
		this.hw_product_name = hw_product_name;
	}
	public int getHw_product_id() {
		return hw_product_id;
	}
	public void setHw_product_id(int hw_product_id) {
		this.hw_product_id = hw_product_id;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
}
