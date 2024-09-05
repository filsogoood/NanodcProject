package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

import com.google.type.DateTime;

@Repository(value="WalletVO")
public class WalletVO {
	private long wallet_id;
	private String sp_address;
	private int user_id;
	private String status;
	private Date reg_date;
	private String lp_address;
	private String f4_address;
	
	public long getWallet_id() {
		return wallet_id;
	}
	public void setWallet_id(long wallet_id) {
		this.wallet_id = wallet_id;
	}
	public String getSp_address() {
		return sp_address;
	}
	public void setSp_address(String address) {
		this.sp_address = address;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public String getLp_address() {
		return lp_address;
	}
	public void setLp_address(String lp_address) {
		this.lp_address = lp_address;
	}
	public String getF4_address() {
		return f4_address;
	}
	public void setF4_address(String f4_address) {
		this.f4_address = f4_address;
	}
	
	
	
	
}
