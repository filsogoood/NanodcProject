package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.HardwareInvestmentVO;
import com.nanoDc.erp.vo.HardwareProductVO;

@Mapper
public interface HardwareProductMapper {
	public List<HardwareProductVO> getProductList();
	public void updateProduct(HardwareProductVO hardwareProductVO);
	public void addProduct(HardwareProductVO hardwareProductVO);
	public List<HardwareProductVO> getProductListByUserId(int user_id);
	public HardwareProductVO getProductById(int user_id);
	
}
