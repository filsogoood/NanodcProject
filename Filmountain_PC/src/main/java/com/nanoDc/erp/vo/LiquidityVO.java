package com.nanoDc.erp.vo;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.stereotype.Repository;


@Repository(value="LiquidityVO")
public class LiquidityVO {
	
	private long liquid_id;
	private BigDecimal fil_amount;
	private BigDecimal reward_amount;
	private int user_id;
	private String status;
	private String type;
	private Date reg_date;
	private int wallet_id;
	private String lp_address;
	private String user_name;
	private String user_email;
	private String outside_address;
	private BigDecimal liquidity_amount;
	private BigDecimal withraw_amount;
	private BigDecimal total_reward;
	private int lq_reward_id;
	private long lq_info_id;
	private long deposit_price;
	private String tx_message;
	private String memo;
	private String f4_address;
	private String key_id;
	private BigDecimal contributionPercentage;
	private BigDecimal total_liquidity_amount;
	private BigDecimal total_locked_fil;
	private BigDecimal locked_fil;
	
	public BigDecimal getFil_amount() {
		return fil_amount; 
	}
	public void setFil_amount(BigDecimal fil_amount) {
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

	public long getWallet_id() {
		return wallet_id;
	}
	public void setWallet_id(int wallet_id) {
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
	public long getLiquid_id() {
		return liquid_id;
	}
	public void setLiquid_id(long liquid_id) {
		this.liquid_id = liquid_id;
	}
	public BigDecimal getReward_amount() {
		return reward_amount;
	}
	public void setReward_amount(BigDecimal reward_amount) {
		this.reward_amount = reward_amount;
	}

	public long getLq_reward_id() {
		return lq_reward_id;
	}
	public void setLq_reward_id(int lq_reward_id) {
		this.lq_reward_id = lq_reward_id;
	}

	public BigDecimal getWithraw_amount() {
		return withraw_amount;
	}
	public void setWithraw_amount(BigDecimal withraw_amount) {
		this.withraw_amount = withraw_amount;
	}
	public BigDecimal getTotal_reward() {
		return total_reward;
	}
	public void setTotal_reward(BigDecimal total_reward) {
		this.total_reward = total_reward;
	}
	public long getLq_info_id() {
		return lq_info_id;
	}
	public void setLq_info_id(long lq_info_id) {
		this.lq_info_id = lq_info_id;
	}
	public long getDeposit_price() {
		return deposit_price;
	}
	public void setDeposit_price(long deposit_price) {
		this.deposit_price = deposit_price;
	}
	public String getOutside_address() {
		return outside_address;
	}
	public void setOutside_address(String outside_address) {
		this.outside_address = outside_address;
	}
	public String getTx_message() {
		return tx_message;
	}
	public void setTx_message(String tx_message) {
		this.tx_message = tx_message;
	}
	public String getLp_address() {
		return lp_address;
	}
	public void setLp_address(String lp_address) {
		this.lp_address = lp_address;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public BigDecimal getLiquidity_amount() {
		return liquidity_amount;
	}
	public void setLiquidity_amount(BigDecimal liquidity_amount) {
		this.liquidity_amount = liquidity_amount;
	}
	public String getF4_address() {
		return f4_address;
	}
	public void setF4_address(String f4_address) {
		this.f4_address = f4_address;
	}
	public String getKey_id() {
		return key_id;
	}
	public void setKey_id(String key_id) {
		this.key_id = key_id;
	}
	public BigDecimal getContributionPercentage() {
		return contributionPercentage;
	}
	public void setContributionPercentage(BigDecimal contributionPercentage) {
		this.contributionPercentage = contributionPercentage;
	}
	public BigDecimal getTotal_liquidity_amount() {
		return total_liquidity_amount;
	}
	public void setTotal_liquidity_amount(BigDecimal total_liquidity_amount) {
		this.total_liquidity_amount = total_liquidity_amount;
	}
	public BigDecimal getTotal_locked_fil() {
		return total_locked_fil;
	}
	public void setTotal_locked_fil(BigDecimal total_locked_fil) {
		this.total_locked_fil = total_locked_fil;
	}
	public BigDecimal getLocked_fil() {
		return locked_fil;
	}
	public void setLocked_fil(BigDecimal locked_fil) {
		this.locked_fil = locked_fil;
	}
	

	
	
}
