package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.HardwareRewardSharingVO;
import com.nanoDc.erp.vo.TransactionVO;
import com.nanoDc.erp.vo.WalletVO;

@Mapper
public interface WalletMapper {
	public void addspWallet(WalletVO walletVO);
	public List<WalletVO> getWalletListByUser(int user_id);
	public void deleteWalletByWalletId(long wallet_id);
	

}
