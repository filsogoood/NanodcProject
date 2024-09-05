/*
 * Decompiled with CFR 0.151.
 * 
 * Could not load the following classes:
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.security.config.annotation.web.builders.HttpSecurity
 *  org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
 *  org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
 *  org.springframework.security.crypto.password.PasswordEncoder
 */
package com.nanoDc.erp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

@Configuration
public class SecurityConfiguration
extends WebSecurityConfigurerAdapter {
	 @Override
    protected void configure(HttpSecurity http) throws Exception {
        ((HttpSecurity)((HttpSecurity)((HttpSecurity)http.cors().disable()).csrf().disable()).formLogin().disable()).headers().frameOptions().disable();
    }
	  @Override
	    public void configure(WebSecurity web) throws Exception {
	        web.httpFirewall(new DefaultHttpFirewall());
	    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

