package com.nanoDc.erp.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanoDc.erp.vo.HardwareProductVO;
import com.nanoDc.erp.vo.HardwareRewardSharingDetailVO;
import com.nanoDc.erp.vo.HardwareRewardSharingVO;
import com.nanoDc.erp.vo.UserInfoVO;

@Mapper
public interface HardwareRewardSharingMapper {
	public List<HardwareRewardSharingVO> getRewardSharingList();
	public List<HardwareRewardSharingDetailVO> selectRewardSharingDetailListById(int reward_sharing_id);
	public List<HardwareRewardSharingDetailVO> selectRewardSharingDetailListByUser(int user_id);
	public void insertHardwareRewardSharing(HardwareRewardSharingVO hardwareRewardSharingVO);
	public void insertHardwareRewardSharingDetail(HardwareRewardSharingDetailVO hardwareRewardSharingDetailVO);
	public int selectLastShareId();
	
}
