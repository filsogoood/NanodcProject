/*
 * Decompiled with CFR 0.151.
 * 
 * Could not load the following classes:
 *  org.springframework.stereotype.Repository
 */
package com.nanoDc.erp.vo;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.stereotype.Repository;




@Repository(value="userInfoVO")
public class UserInfoVO {
	private int user_id;
	private String wallet_addr;
	private String phone_number;
	private String user_status;
    private Date user_reg_date;
    private String user_investment_date;
    private int purchase_size;
    private String user_node;
    private float fil_amount;
    private String user_name;
    private String user_email;
    private int investment_count;
    private String password;
    private String original_password;
	private double available_balance;
	private double total_balance;
	private double total_investment_fil;
	private double total_reward_fil;
	private String level;
	private double processed_fil;
	private double paid_fil;
	private int hw_product_id;
	private String new_password;
	private int profileIcon_id;
	private String wallet_address;

	
	public int getProfileIcon_id() {
		return profileIcon_id;
	}
	public void setProfileIcon_id(int profileIcon_id) {
		this.profileIcon_id = profileIcon_id;
	}
	public int getHw_product_id() {
		return hw_product_id;
	}
	public void setHw_product_id(int hw_product_id) {
		this.hw_product_id = hw_product_id;
	}
	public double getProcessed_fil() {
		return processed_fil;
	}
	public void setProcessed_fil(double processed_fil) {
		this.processed_fil = processed_fil;
	}
	public double getPaid_fil() {
		return paid_fil;
	}
	public void setPaid_fil(double paid_fil) {
		this.paid_fil = paid_fil;
	}
	public String getOriginal_password() {
		return original_password;
	}
	public void setOriginal_password(String original_password) {
		this.original_password = original_password;
	}
	public double getAvailable_balance() {
		return Math.floor(available_balance * 100) / 100;
	}
	public void setAvailable_balance(double available_balance) {
		this.available_balance = available_balance;
	}
	public double getTotal_balance() {
		return total_balance;
	}
	public void setTotal_balance(double total_balance) {
		this.total_balance = total_balance;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getInvestment_count() {
		return investment_count;
	}
	public void setInvestment_count(int investment_count) {
		this.investment_count = investment_count;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getWallet_addr() {
		return wallet_addr;
	}
	public void setWallet_addr(String wallet_addr) {
		this.wallet_addr = wallet_addr;
	}

	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getUser_status() {
		return user_status;
	}
	public void setUser_status(String user_status) {
		this.user_status = user_status;
	}
	public Date getUser_reg_date() {
		return user_reg_date;
	}
	public void setUser_reg_date(Date user_reg_date) {
		this.user_reg_date = user_reg_date;
	}
	public String getUser_investment_date() {
		return user_investment_date;
	}
	public void setUser_investment_date(String user_investment_date) {
		this.user_investment_date = user_investment_date;
	}
	public int getPurchase_size() {
		return purchase_size;
	}
	public void setPurchase_size(int purchase_size) {
		this.purchase_size = purchase_size;
	}
	public String getUser_node() {
		return user_node;
	}
	public void setUser_node(String user_node) {
		this.user_node = user_node;
	}
	public float getFil_amount() {
		return fil_amount;
	}
	public void setFil_amount(float fil_amount) {
		this.fil_amount = fil_amount;
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
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public double getTotal_investment_fil() {
		return total_investment_fil;
	}
	public void setTotal_investment_fil(double total_investment_fil) {
		this.total_investment_fil = total_investment_fil;
	}
	public double getTotal_reward_fil() {
		return total_reward_fil;
	}
	public void setTotal_reward_fil(double total_reward_fil) {
		this.total_reward_fil = total_reward_fil;
	}
	public String getNew_password() {
		return new_password;
	}
	public void setNew_password(String new_password) {
		this.new_password = new_password;
	}
	public String getWallet_address() {
		return wallet_address;
	}
	public void setWallet_address(String wallet_address) {
		this.wallet_address = wallet_address;
	}

	
	
}

