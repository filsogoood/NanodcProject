package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="HardwareRewardSharingVO")
public class HardwareRewardSharingVO {

	private int reward_sharing_id;
	private int hw_product_id;
	private Date regdate;
	private double fil_paid_per_tb;
	private String status;	
	private double total_fil;
	private HardwareProductVO hardwareProductVO;
	public HardwareProductVO getHardwareProductVO() {
		return hardwareProductVO;
	}
	public void setHardwareProductVO(HardwareProductVO hardwareProductVO) {
		this.hardwareProductVO = hardwareProductVO;
	}
	public double getTotal_fil() {
		return total_fil;
	}
	public void setTotal_fil(double total_fil) {
		this.total_fil = total_fil;
	}
	public int getReward_sharing_id() {
		return reward_sharing_id;
	}
	public void setReward_sharing_id(int reward_sharing_id) {
		this.reward_sharing_id = reward_sharing_id;
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
	public double getFil_paid_per_tb() {
		return fil_paid_per_tb;
	}
	public void setFil_paid_per_tb(double fil_paid_per_tb) {
		this.fil_paid_per_tb = fil_paid_per_tb;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
