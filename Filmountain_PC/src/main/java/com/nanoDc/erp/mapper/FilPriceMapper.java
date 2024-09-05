package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.FilPriceVO;

@Mapper
public interface FilPriceMapper {
	public void addNewFilPrice(FilPriceVO filPriceVO);
	public List<FilPriceVO> getFilPriceDataForMonth();
	public FilPriceVO getLatestFilPrice();
	

}
