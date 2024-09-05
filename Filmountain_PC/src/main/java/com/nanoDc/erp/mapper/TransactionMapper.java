package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.HardwareRewardSharingVO;
import com.nanoDc.erp.vo.TransactionVO;
import com.nanoDc.erp.vo.UserInfoVO;

@Mapper
public interface TransactionMapper {
	public void addNewTransaction(TransactionVO transactionVO);
	public List<TransactionVO> selectTransactionsByUser(int user_id);
	public List<TransactionVO> getTransactionList();
	public void updateStatus(TransactionVO transactionVO);
}
