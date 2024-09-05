package com.nanoDc.erp.vo;
import java.util.List;

import org.springframework.stereotype.Repository;


@Repository(value="MainIndexMapper")
public class MainIndexMapper {
	 private Integer hw_product_id;
	 private String progress_src;
     private String main_bg_src;
     private List<List<HardwareProductVO>> dividedList;
     private UserInfoVO investDetailForHw;
     private LoginVO loginVO ;
     private HardwareProductVO selectedhardwareProduct;
     private String error;
     
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public Integer getHw_product_id() {
		return hw_product_id;
	}
	public void setHw_product_id(Integer hw_product_id) {
		this.hw_product_id = hw_product_id;
	}
	public String getProgress_src() {
		return progress_src;
	}
	public void setProgress_src(String progress_src) {
		this.progress_src = progress_src;
	}
	public String getMain_bg_src() {
		return main_bg_src;
	}
	public void setMain_bg_src(String main_bg_src) {
		this.main_bg_src = main_bg_src;
	}
	public List<List<HardwareProductVO>> getDividedList() {
		return dividedList;
	}
	public void setDividedList(List<List<HardwareProductVO>> dividedList) {
		this.dividedList = dividedList;
	}
	public UserInfoVO getInvestDetailForHw() {
		return investDetailForHw;
	}
	public void setInvestDetailForHw(UserInfoVO investDetailForHw) {
		this.investDetailForHw = investDetailForHw;
	}
	public LoginVO getLoginVO() {
		return loginVO;
	}
	public void setLoginVO(LoginVO loginVO) {
		this.loginVO = loginVO;
	}
	public HardwareProductVO getSelectedhardwareProduct() {
		return selectedhardwareProduct;
	}
	public void setSelectedhardwareProduct(HardwareProductVO selectedhardwareProduct) {
		this.selectedhardwareProduct = selectedhardwareProduct;
	}

}
