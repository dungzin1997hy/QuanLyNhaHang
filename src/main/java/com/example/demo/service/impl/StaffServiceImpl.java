package com.example.demo.service.impl;

import com.example.demo.dao.StaffDAO;
import com.example.demo.entity.StaffEntity;
import com.example.demo.model.Staff;
import com.example.demo.model.User;
import com.example.demo.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class StaffServiceImpl implements StaffService {
    @Autowired
    StaffDAO staffDAO;

    @Override
    public List<Staff> getAllStaff() {
        List<StaffEntity> staffEntities = staffDAO.getAllStaff();
        List<Staff> staffs = new ArrayList<>();
        for(StaffEntity staffEntity : staffEntities){
            Staff staff = new Staff();
            staff.setId(staffEntity.getId());
            staff.setUrlImage(staffEntity.getUrl());
            staff.setName(staffEntity.getName());
            staff.setEmail(staffEntity.getEmail());
            staff.setPhoneNumber(staffEntity.getPhoneNumber());
            staff.setCmnd(staffEntity.getCmnd());
            staff.setAddress(staffEntity.getAddress());
            if(staffEntity.getRoleEntity()!= null) {
                staff.setRole1(staffEntity.getRoleEntity().toRole());
            }
            User user = new User();
            user.setUsername(staffEntity.getUserEntity().getUsername());
            staff.setUsername(staffEntity.getUserEntity().getUsername());
            staffs.add(staff);
        }
        return staffs;
    }

    @Override
    public List<Staff> searchStaffByName(String name) {
        List<StaffEntity> staffEntities = staffDAO.searchStaffByName(name);
        List<Staff> staffs = new ArrayList<>();
        for(StaffEntity staffEntity : staffEntities){
            Staff staff = new Staff();
            staff.setId(staffEntity.getId());
            staff.setName(staffEntity.getName());
            staff.setEmail(staffEntity.getEmail());
            staff.setUrlImage(staffEntity.getUrl());
            staff.setPhoneNumber(staffEntity.getPhoneNumber());
            staff.setCmnd(staffEntity.getCmnd());
            staff.setAddress(staffEntity.getAddress());
            if(staffEntity.getRoleEntity()!= null) {
                staff.setRole1(staffEntity.getRoleEntity().toRole());
            }
            User user = new User();
            user.setUsername(staffEntity.getUserEntity().getUsername());
            staff.setUsername(staffEntity.getUserEntity().getUsername());
            staffs.add(staff);
        }
        return staffs;
    }

    @Override
    public List<Staff> searchStaffByRole(String role) {
        List<StaffEntity> staffEntities = staffDAO.searchStaffByRole(role);
        List<Staff> staffs = new ArrayList<>();
        for(StaffEntity staffEntity : staffEntities){
            Staff staff = new Staff();
            staff.setId(staffEntity.getId());
            staff.setName(staffEntity.getName());
            staff.setUrlImage(staffEntity.getUrl());
            staff.setEmail(staffEntity.getEmail());
            staff.setPhoneNumber(staffEntity.getPhoneNumber());
            staff.setCmnd(staffEntity.getCmnd());
            staff.setAddress(staffEntity.getAddress());
            if(staffEntity.getRoleEntity()!= null) {
                staff.setRole1(staffEntity.getRoleEntity().toRole());
            }
            User user = new User();
            user.setUsername(staffEntity.getUserEntity().getUsername());
            staff.setUsername(staffEntity.getUserEntity().getUsername());
            staffs.add(staff);
        }
        return staffs;
    }


}
