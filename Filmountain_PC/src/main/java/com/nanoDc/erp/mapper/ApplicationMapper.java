package com.nanoDc.erp.mapper;

import com.nanoDc.erp.vo.ApplicationVO;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ApplicationMapper {
    public void insertApplication(ApplicationVO applicationVO);
    public List<ApplicationVO> selectApplication();
    public void updateApplicationStatus (ApplicationVO applicationVO);
}