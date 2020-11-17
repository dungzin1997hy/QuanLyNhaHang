package com.example.demo.dao;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.StaffEntity;

import java.util.List;

public interface StaffDAO {
    List<StaffEntity> searchStaffByName(String nameStaff);

    List<StaffEntity> getAllStaff();

    Boolean checkExistStaff(String phoneNumber);

    void addStaff(StaffEntity staffEntity);
    void deleteStaff(int idStaff);
    void updateCustomer(StaffEntity staffEntity);
}
