package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.nanoDc.erp.vo.LiquidityVO;
import com.nanoDc.erp.vo.TransactionVO;
import com.nanoDc.erp.vo.UserInfoVO;

@Mapper
public interface LiquidityMapper {
	public List<LiquidityVO> getLiquidityList();
	public List<LiquidityVO> getTotalPoolInfo();
	public List<LiquidityVO> getLiquidityrewardList();
	public List<LiquidityVO> selectLiquiditytxByUser(int userId);
	public List<LiquidityVO> selectLiquidityRewardByUser(int userId);
	public List<LiquidityVO> selectLiquidityInfotxByUser(int userId);
	public List<LiquidityVO> findUserContributionByUserId(int userId);
	public void addNewLPTransaction(LiquidityVO liquidityVO);
	public void updateLPStatus(LiquidityVO liquidityVO);

}
