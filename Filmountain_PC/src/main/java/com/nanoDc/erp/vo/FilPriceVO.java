package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

import com.google.type.DateTime;

@Repository(value="FilPriceVO")
public class FilPriceVO {
	private long fil_price_id;
	private int fil_last;
	private Date reg_date;
	
	public long getFil_price_id() {
		return fil_price_id;
	}
	public void setFil_price_id(long fil_price_id) {
		this.fil_price_id = fil_price_id;
	}
	public int getFil_last() {
		return fil_last;
	}
	public void setFil_last(int fil_last) {
		this.fil_last = fil_last;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
}
