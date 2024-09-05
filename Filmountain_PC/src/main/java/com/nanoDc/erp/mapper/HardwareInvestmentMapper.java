package com.nanoDc.erp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.HardwareInvestmentVO;
import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.UserInfoVO;

@Mapper
public interface HardwareInvestmentMapper {
	 public List<HardwareInvestmentVO> getInvestmentList();
	 public List<HardwareInvestmentVO> selectInvestmentListForUser(UserInfoVO userInfoVO);
	 public List<HardwareInvestmentVO> selectInvestmentListForProduct(int hw_product_id);
	 public void addNewinvestmentUser(HardwareInvestmentVO hardwareInvestmentVO);
	 public void updateinvestmentUser(HardwareInvestmentVO hardwareInvestmentVO);
	 public Integer selectUserDefaultProductId(int user_id);
	
	
}
