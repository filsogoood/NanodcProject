/*
 * Decompiled with CFR 0.151.
 * 
 * Could not load the following classes:
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.security.crypto.password.PasswordEncoder
 *  org.springframework.stereotype.Repository
 */
package com.nanoDc.erp.vo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository(value="loginVO")
public class LoginVO {
    @Autowired
    private PasswordEncoder pwEncoder;
    private String id;
    private String password;
    private UserInfoVO userInfoVO;
    private String level;

	public UserInfoVO getUserInfoVO() {
		return userInfoVO;
	}

	public void setUserInfoVO(UserInfoVO userInfoVO) {
		this.userInfoVO = userInfoVO;
	}

	public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}
}

