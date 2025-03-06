package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.AthPriceVO;

@Mapper
public interface AthPriceMapper {
	public void addNewAthPrice(AthPriceVO athPriceVO);
	public List<AthPriceVO> getAthPriceDataForMonth();
	public AthPriceVO getLatestAthPrice();
	

}
