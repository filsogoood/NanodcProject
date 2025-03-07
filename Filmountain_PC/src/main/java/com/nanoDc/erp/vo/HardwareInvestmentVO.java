package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="HardwareInvestmentVO")
public class HardwareInvestmentVO {

	private String user_name;
	private String user_email;
	private int hw_id;
	private String hw_status;
	private Date hw_reg_date;
	private String hw_product_name;
	private int user_id;
	private int hw_product_id;
	private int hw_invest_fil;
	private int total_budget_fil;
	private String hw_product_status;
	private String invest_percent;
	private String picture_url;
	private String token;
	
	
	
	public String getInvest_percent() {
	    if (total_budget_fil != 0) {
	        double percentage = ((double) hw_invest_fil / total_budget_fil) * 100;
	        // Using String.format to format the percentage to 2 decimal places
	        return String.format("%.2f%%", percentage);
	    } else {
	        return "Total budget is zero, unable to calculate percentage.";
	    }
	}

	
	public int getTotal_budget_fil() {
		return total_budget_fil;
	}
	public void setTotal_budget_fil(int total_budget_fil) {
		this.total_budget_fil = total_budget_fil;
	}
	public String getPicture_url() {
		return picture_url;
	}
	public void setPicture_url(String picture_url) {
		this.picture_url = picture_url;
	}
	public String getHw_product_status() {
		return hw_product_status;
	}
	public void setHw_product_status(String hw_product_status) {
		this.hw_product_status = hw_product_status;
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
	public int getHw_id() {
		return hw_id;
	}
	public void setHw_id(int hw_id) {
		this.hw_id = hw_id;
	}
	public String getHw_status() {
		return hw_status;
	}
	public void setHw_status(String hw_status) {
		this.hw_status = hw_status;
	}
	public Date getHw_reg_date() {
		return hw_reg_date;
	}
	public void setHw_reg_date(Date hw_reg_date) {
		this.hw_reg_date = hw_reg_date;
	}
	public String getHw_product_name() {
		return hw_product_name;
	}
	public void setHw_product_name(String hw_product_name) {
		this.hw_product_name = hw_product_name;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getHw_product_id() {
		return hw_product_id;
	}
	public void setHw_product_id(int hw_product_id) {
		this.hw_product_id = hw_product_id;
	}
	public int getHw_invest_fil() {
		return hw_invest_fil;
	}
	public void setHw_invest_fil(int hw_invest_fil) {
		this.hw_invest_fil = hw_invest_fil;
	}


	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}
	
	
	
	
	
}
