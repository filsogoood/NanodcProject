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

@Repository(value="investmentVO")
public class InvestmentVO {
    private int investment_id;
    private String user_email;
    private String user_name;
    private String product_name;
    private int user_id;
    private int investment_category_id;
    private Date purchase_date;
    private int purchase_size;
    private float payout_fil;
    private float fil_paid_per_tb;
    private boolean is_getting_paid;
	private int cateogry_fil_per_tb;
	private float fil_invested;
	

	public float getFil_invested() {
		return fil_invested;
	}

	public void setFil_invested(float fil_invested) {
		this.fil_invested = fil_invested;
	}

	public int getCateogry_fil_per_tb() {
		return cateogry_fil_per_tb;
	}

	public void setCateogry_fil_per_tb(int cateogry_fil_per_tb) {
		this.cateogry_fil_per_tb = cateogry_fil_per_tb;
	}

	public float getFil_paid_per_tb() {
		return fil_paid_per_tb;
	}

	public void setFil_paid_per_tb(float fil_paid_per_tb) {
		this.fil_paid_per_tb = fil_paid_per_tb;
	}

	public float getPayout_fil() {
		return payout_fil;
	}

	public void setPayout_fil(float payout_fil) {
		this.payout_fil = payout_fil;
	}

	public boolean isIs_getting_paid() {
		return is_getting_paid;
	}

	public void setIs_getting_paid(boolean is_getting_paid) {
		this.is_getting_paid = is_getting_paid;
	}

	public int getInvestment_category_id() {
		return investment_category_id;
	}

	public void setInvestment_category_id(int investment_category_id) {
		this.investment_category_id = investment_category_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUser_email() {
        return this.user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_name() {
        return this.user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getProduct_name() {
        return this.product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Date getPurchase_date() {
        return this.purchase_date;
    }

    public void setPurchase_date(Date purchase_date) {
        this.purchase_date = purchase_date;
    }

    public int getPurchase_size() {
        return this.purchase_size;
    }

    public void setPurchase_size(int purchae_size) {
        this.purchase_size = purchae_size;
    }

    public int getInvestment_id() {
        return this.investment_id;
    }

    public void setInvestment_id(int investment_id) {
        this.investment_id = investment_id;
    }
    
    public String memoCreate(String title) {
    	Date date;
    	if(purchase_date==null) {
    		 date = new Date();
    	}else {
    		date = purchase_date;
    	}
    	SimpleDateFormat simpleDateFormat =new SimpleDateFormat("yyyy.MM.dd a HH:mm:ss"); 
    	String memo = "Title:" + title + ",date:" +simpleDateFormat.format(date)+",type:tib,amount:"+purchase_size+",status:active";
    	return memo;
    }
    
}

