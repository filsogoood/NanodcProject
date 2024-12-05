package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanoDc.erp.vo.AgreementVO;

@Mapper
public interface AgreementMapper {
	public void insertAgreementProcess(AgreementVO AgreementVO);
	public List<AgreementVO> selectAgreementlist();
	public void updateAgreement(AgreementVO AgreementVO);
	public List<AgreementVO> selectByIdAgreementList(int user_id);
	public void updateContract_info(AgreementVO AgreementVO);
	void updateAuthStatus(@Param("user_id") int userId, @Param("auth_status") String authStatus);
	public int check_contract(int user_id);
	public int get_last_contract_id();
}
