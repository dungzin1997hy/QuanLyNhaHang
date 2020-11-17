package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.StaffDAO;
import com.example.demo.entity.StaffEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class StaffController {
    @Autowired
    private StaffDAO staffDAO;

    @PostMapping("/getAllStaff")
    public ApiResponse<List<StaffEntity>> getAllStaff() {
        List<StaffEntity> staffEntities = staffDAO.getAllStaff();
        return new ApiResponse<>(true, staffEntities, "");
    }

    @PostMapping("/searchStaffByName")
    public ApiResponse<List<StaffEntity>> getStaffByName(@RequestParam("staffName") String staffName) {
        List<StaffEntity> staffEntities = staffDAO.searchStaffByName(staffName);
        if (staffEntities.size() > 0) {
            return new ApiResponse<>(true, staffEntities, "");
        } else return new ApiResponse<>(false, null, "Không tìm thấy nhân viên");
    }

    @PostMapping("/updateStaff")
    public ApiResponse<String> updateStaff(@RequestParam("idStaff") int idStaff,
                                           @RequestParam("nameStaff") String nameStaff,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("email") String email,
                                           @RequestParam("cmnd") String cmnd,
                                           @RequestParam("role") String role) {
        StaffEntity staffEntity = new StaffEntity(idStaff,nameStaff,phoneNumber,email,cmnd,role);
        try {
            staffDAO.updateStaff(staffEntity);
            return new ApiResponse<>(true,"Thêm nhân viên thành công","");
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"Thêm nhân viên thất bại","");
        }


    }
}

