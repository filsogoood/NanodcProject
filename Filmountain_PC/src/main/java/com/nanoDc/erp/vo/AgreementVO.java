package com.nanoDc.erp.vo;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository(value="AgreementVO")
public class AgreementVO {
    private int process_id;
    private String contract_status;
    private String auth_status;
    private int user_id;
    private String agreement_dir;
    private Date reg_date;
    private String process;
    private String system_location;
    private int supply_discount_price;
    private int final_payment;
    private int supply_price;
    private String product;
    private int first_payment;
    private int second_payment;
    private int last_payment;
    private String user_name;
    private String sp_product;
    // Getters and Setters
    public int getProcess_id() {
        return process_id;
    }

    public void setProcess_id(int process_id) {
        this.process_id = process_id;
    }

    public String getContract_status() {
        return contract_status;
    }

    public void setContract_status(String contract_status) {
        this.contract_status = contract_status;
    }

    public String getAuth_status() {
        return auth_status;
    }

    public void setAuth_status(String auth_status) {
        this.auth_status = auth_status;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getAgreement_dir() {
        return agreement_dir;
    }

    public void setAgreement_dir(String agreement_dir) {
        this.agreement_dir = agreement_dir;
    }

    public Date getReg_date() {
        return reg_date;
    }

    public void setReg_date(Date reg_date) {
        this.reg_date = reg_date;
    }

	public String getProcess() {
		return process;
	}

	public void setProcess(String process) {
		this.process = process;
	}

	public String getSystem_location() {
		return system_location;
	}

	public void setSystem_location(String system_location) {
		this.system_location = system_location;
	}

	public int getSupply_discount_price() {
		return supply_discount_price;
	}

	public void setSupply_discount_price(int supply_discount_price) {
		this.supply_discount_price = supply_discount_price;
	}

	public int getFinal_payment() {
		return final_payment;
	}

	public void setFinal_payment(int final_payment) {
		this.final_payment = final_payment;
	}

	public int getSupply_price() {
		return supply_price;
	}

	public void setSupply_price(int supply_price) {
		this.supply_price = supply_price;
	}



	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public int getFirst_payment() {
		return first_payment;
	}

	public void setFirst_payment(int first_payment) {
		this.first_payment = first_payment;
	}

	public int getSecond_payment() {
		return second_payment;
	}

	public void setSecond_payment(int second_payment) {
		this.second_payment = second_payment;
	}

	public int getLast_payment() {
		return last_payment;
	}

	public void setLast_payment(int last_payment) {
		this.last_payment = last_payment;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getSp_product() {
		return sp_product;
	}

	public void setSp_product(String sp_product) {
		this.sp_product = sp_product;
	}

	
}
