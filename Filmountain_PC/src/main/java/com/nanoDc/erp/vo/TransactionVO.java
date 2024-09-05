package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;


@Repository(value="TransactionVO")
public class TransactionVO {
	
	private long transaction_id;
	private double fil_amount;
	private int user_id;
	private String status;
	private String type;
	private Date reg_date;
	private String message;
	private long wallet_id;
	private String sp_address;
	private String user_name;
	private String user_email;
	private int hw_product_id;
	
	
	public int getHw_product_id() {
		return hw_product_id;
	}
	public void setHw_product_id(int hw_product_id) {
		this.hw_product_id = hw_product_id;
	}
	public long getTransaction_id() {
		return transaction_id;
	}
	public void setTransaction_id(long transaction_id) {
		this.transaction_id = transaction_id;
	}
	public double getFil_amount() {
		return fil_amount;
	}
	public void setFil_amount(double fil_amount) {
		this.fil_amount = fil_amount;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public long getWallet_id() {
		return wallet_id;
	}
	public void setWallet_id(long wallet_id) {
		this.wallet_id = wallet_id;
	}

	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getSp_address() {
		return sp_address;
	}
	public void setSp_address(String sp_address) {
		this.sp_address = sp_address;
	}

	
	
}
