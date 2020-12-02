package com.example.demo.service;

import com.example.demo.model.Staff;

import java.util.List;

public interface StaffService {
    List<Staff> getAllStaff();
    List<Staff> searchStaffByName(String name);
    List<Staff> searchStaffByRole(String role);

}
