package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.RoleDAO;
import com.example.demo.dao.StaffDAO;
import com.example.demo.dao.UserDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.Role;
import com.example.demo.model.Staff;
import com.example.demo.service.RoleService;
import com.example.demo.service.StaffService;
import com.example.demo.util.FileDir;
import javafx.animation.ScaleTransition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class StaffController {
    @Autowired
    private FileDir fileDir;
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
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/api/getAllStaff")
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
    public ApiResponse<String> updateStaff(@ModelAttribute UpdateStaffForm form) {
        try {
            System.out.println(form.toString());
            //lỗi
            RoleEntity roleEntity = roleDAO.getRoleById(form.getRole_edit());
            StaffEntity staffEntity = staffDAO.getStaffById(form.getIdStaff_edit()+"");
         //   StaffEntity staffEntity = new StaffEntity(form.getIdStaff_edit(),form.getNameStaff_edit(),form.getPhoneNumber_edit(),form.getEmail_edit(),form.getCmnd_edit());

            staffEntity.setName(form.getNameStaff_edit());
            staffEntity.setPhoneNumber(form.getPhoneNumber_edit());
            staffEntity.setRoleEntity(roleEntity);
            staffEntity.setCmnd(form.getCmnd_edit());
            staffEntity.setEmail(form.getEmail_edit());
            staffEntity.setAddress(form.getAddress_edit());


            UserEntity userEntity = new UserEntity(staffEntity.getUserEntity().getId(),form.getUsername_edit(),staffEntity.getUserEntity().getPassword(),roleEntity.getRole());
            staffEntity.setUserEntity(userEntity);

            if (form.getFileImage_edit().isEmpty()) {
                staffEntity.setUrl(staffEntity.getUrl());
            } else {
                staffEntity.setUrl(form.getFileImage_edit().getOriginalFilename());
                File uploadDir = new File(fileDir.getFileDir());
                uploadDir.mkdirs();

                String uploadFilePath = fileDir.getFileDir() + "/" + form.getFileImage_edit().getOriginalFilename();
                System.out.println(uploadFilePath);
                byte[] bytes = form.getFileImage_edit().getBytes();
                Path path = Paths.get(uploadFilePath);
                Files.write(path, bytes);
            }


            staffDAO.updateStaff(staffEntity);
            return new ApiResponse<>(true, "Cập nhật nhân viên thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Error");
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
    public ApiResponse<String> addStaff(@ModelAttribute UploadStaffForm form){

        List<String> strings = userDAO.getAllUsername();
        if(strings.contains(form.getNameStaff_add())) return new ApiResponse<>(false,"","Username đã tồn tại");
        try {
            File uploadDir = new File(fileDir.getFileDir());
            uploadDir.mkdirs();

            if (form.getFileImage_add().isEmpty()) {
                return new ApiResponse<>(false, "", "Không thấy ảnh");
            }
            String uploadFilePath = fileDir.getFileDir() + "/" + form.getFileImage_add().getOriginalFilename();
            System.out.println(uploadFilePath);
            byte[] bytes = form.getFileImage_add().getBytes();
            Path path = Paths.get(uploadFilePath);
            Files.write(path, bytes);
            RoleEntity roleEntity = roleDAO.getRoleById(form.getRole_add());
            List<StaffEntity> staffEntities = staffDAO.getAllStaff();
            for(StaffEntity staffEntity:staffEntities){
                if(staffEntity.getCmnd().equals(form.getCmnd_add())) return new ApiResponse<>(false,"","Số cmnd đã tồn tại");
                if(staffEntity.getEmail().equals(form.getEmail_add())) return new ApiResponse<>(false,"","Email đã tồn tại");
                if(staffEntity.getPhoneNumber().equals(form.getPhoneNumber_add())) return new ApiResponse<>(false,"","Số điện thoại đã tồn tại");
            }
            UserEntity userEntity = new UserEntity(form.getUsername_add(),passwordEncoder.encode(form.getPassword_add()),roleEntity.getRole());

            StaffEntity staffEntity = new StaffEntity(form.getNameStaff_add(),form.getPhoneNumber_add(),form.getEmail_add(),form.getCmnd_add(),form.getAddress_add());
            staffEntity.setRoleEntity(roleEntity);
            staffEntity.setUserEntity(userEntity);
            staffEntity.setUrl(form.getFileImage_add().getOriginalFilename());
            staffDAO.addStaff(staffEntity);
            return new ApiResponse<>(true,"Thêm thành công","");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Lỗi");
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


    @PostMapping("/api/getAllRole")
    public ApiResponse<List<Role>> getAllRole(){
        List<Role> roles= roleService.getAllRole();
        return new ApiResponse<>(true,roles,"");
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UploadStaffForm {
    private MultipartFile fileImage_add;
    private String nameStaff_add;
    private String phoneNumber_add;
    private String role_add;
    private String cmnd_add;
    private String email_add;
    private String address_add;
    private String username_add;
    private String password_add;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UpdateStaffForm {
    private MultipartFile fileImage_edit;
    private int idStaff_edit;
    private String nameStaff_edit;
    private String phoneNumber_edit;
    private String role_edit;
    private String cmnd_edit;
    private String email_edit;
    private String address_edit;
    private String username_edit;
}