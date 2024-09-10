package com.nanoDc.erp.vo;

import java.sql.Timestamp;

public class ApplicationVO {
    private int application_id;
    private int user_id;
    private Timestamp created_at;
    private String sp_product;
    private String message;
    private String status;
    private String user_name;
    private String user_email;
    private String phone_number;
    

    // Getters and Setters
    public int getApplication_id() {
        return application_id;
    }

    public void setApplication_id(int application_id) {
        this.application_id = application_id;
    }



    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }


    public String getSp_product() {
        return sp_product;
    }

    public void setSp_product(String sp_product) {
        this.sp_product = sp_product;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
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

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}


}
