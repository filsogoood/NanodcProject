package com.nanoDc.erp.mapper;

import com.nanoDc.erp.vo.ApplicationVO;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ApplicationMapper {
    void insertApplication(ApplicationVO application);
    public List<ApplicationVO> selectApplication();
    public void updateApplicationStatus (ApplicationVO applicationVO);
}