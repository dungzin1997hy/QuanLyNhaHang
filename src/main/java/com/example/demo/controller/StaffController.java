package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.RoleDAO;
import com.example.demo.dao.StaffDAO;
import com.example.demo.dao.UserDAO;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.Role;
import com.example.demo.model.Staff;
import com.example.demo.service.RoleService;
import com.example.demo.service.StaffService;
import javafx.animation.ScaleTransition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StaffController {
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private StaffService staffService;
    @Autowired
    RoleService roleService;
    @Autowired
    RoleDAO roleDAO;
    @Autowired
    private UserDAO userDAO;

    @PostMapping("/getAllStaff")
    public ApiResponse<List<Staff>> getAllStaff() {

        try {
            List<Staff> staffEntities = staffService.getAllStaff();
            return new ApiResponse<>(true, staffEntities, "");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"không lấy được nhân viên");
        }
    }

    @PostMapping("/searchStaffByName")
    public ApiResponse<List<Staff>> searchStaffByName(@RequestParam("staffName") String staffName) {
        List<Staff> staffList = staffService.searchStaffByName(staffName);
        if (staffList.size() > 0) {
            return new ApiResponse<>(true, staffList, "");
        } else return new ApiResponse<>(false, null, "Không tìm thấy nhân viên");
    }

    @PostMapping("/updateStaff")
    public ApiResponse<String> updateStaff(@RequestParam("idStaff") int idStaff,
                                           @RequestParam("nameStaff") String nameStaff,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("email") String email,
                                           @RequestParam("cmnd") String cmnd,
                                           @RequestParam("idRole")String idRole,
                                           @RequestParam("address") String address,
                                           @RequestParam("username") String username) {
        RoleEntity roleEntity = roleDAO.getRoleById(idRole);
        StaffEntity staff = staffDAO.getStaffById(idStaff+"");
        StaffEntity staffEntity = new StaffEntity(idStaff,nameStaff,phoneNumber,email,cmnd);
        staffEntity.setRoleEntity(roleEntity);
        staffEntity.setAddress(address);
        UserEntity userEntity = new UserEntity(staff.getUserEntity().getId(),username,staff.getUserEntity().getPassword(),roleEntity.getRole());
        staffEntity.setUserEntity(userEntity);
        try {
            staffDAO.updateStaff(staffEntity);
            return new ApiResponse<>(true,"Sửa thông tin nhân viên thành công","");
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"Sửa thông tin nhân viên thất bại","");
        }
    }

    @PostMapping("/deleteStaff")
    public ApiResponse<String> deleteStaff(@RequestParam("idStaff") int idStaff){
        try{
            staffDAO.deleteStaff(idStaff);
            return new ApiResponse<>(true,"Xoá nhân viên thành công","");
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không xoá được");
        }
    }

    @PostMapping("/addStaff")
    public ApiResponse<String> addStaff(@RequestParam("nameStaff_add") String name,
                                        @RequestParam("phoneNumber_add") String phoneNumber,
                                        @RequestParam("cmnd_add") String cmnd,
                                        @RequestParam("email_add") String email,
                                        @RequestParam("role") String role,
                                        @RequestParam("address_add") String address,
                                        @RequestParam("username_add") String username,
                                        @RequestParam("password_add") String password){

        List<String> strings = userDAO.getAllUsername();
        if(strings.contains(username)) return new ApiResponse<>(false,"","Username đã tồn tại");

        RoleEntity roleEntity = roleDAO.getRoleById(role);
        List<StaffEntity> staffEntities = staffDAO.getAllStaff();
        for(StaffEntity staffEntity:staffEntities){
            if(staffEntity.getCmnd().equals(cmnd)) return new ApiResponse<>(false,"","Số cmnd đã tồn tại");
            if(staffEntity.getEmail().equals(email)) return new ApiResponse<>(false,"","Email đã tồn tại");
            if(staffEntity.getPhoneNumber().equals(phoneNumber)) return new ApiResponse<>(false,"","Số điện thoại đã tồn tại");
        }
        UserEntity userEntity = new UserEntity(username,password,roleEntity.getRole());

        StaffEntity staffEntity = new StaffEntity(name,phoneNumber,email,cmnd,address);
        staffEntity.setRoleEntity(roleEntity);
        staffEntity.setUserEntity(userEntity);
        try{
            staffDAO.addStaff(staffEntity);
            return new ApiResponse<>(true,"Thêm thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không thêm được nhân viên này");
        }
    }
//    @PostMapping("/getStaffByName")
//    public ApiResponse<Staff> getStaffByName(@RequestParam("nameStaff") String name){
//        Staff staff = staffService.getStaffByName(name);
//        return new ApiResponse<>(true,staff,"");
//    }
    @PostMapping("/searchStaffByRole")
    public ApiResponse<List<Staff>> getStaffByRole(@RequestParam("idRole") String Role){
        List<Staff> staffList = staffService.searchStaffByRole(Role);

            return new ApiResponse<>(true, staffList, "");

    }


    @PostMapping("/getAllRole")
    public ApiResponse<List<Role>> getAllRole(){
        List<Role> roles= roleService.getAllRole();
        return new ApiResponse<>(true,roles,"");
    }
}

