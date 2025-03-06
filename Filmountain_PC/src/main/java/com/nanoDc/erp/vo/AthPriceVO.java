package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

import com.google.type.DateTime;

@Repository(value="AthPriceVO")
public class AthPriceVO {
	private long ath_price_id;
	private int ath_last;
	private Date reg_date;
	
	public long getAth_price_id() {
		return ath_price_id;
	}
	public void setAth_price_id(long ath_price_id) {
		this.ath_price_id = ath_price_id;
	}
	public int getAth_last() {
		return ath_last;
	}
	public void setAth_last(int ath_last) {
		this.ath_last = ath_last;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
}
