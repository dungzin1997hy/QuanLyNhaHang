package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.StaffDAO;
import com.example.demo.dao.UserDAO;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    public UserDAO userDao;
    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    StaffDAO staffDAO;

    @PostMapping("/username")
    public ApiResponse<User> getUsername(Principal principal){
        try {
            String username = principal.getName();
            User user = userService.getByUsername(username);

            return new ApiResponse<>(true, user, "");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"");
        }
    }


    @PostMapping("/getAllUser")
    public ApiResponse<List<UserEntity>> getAllUser(){
        List<UserEntity> userEntities = userDao.getAllUser();
        return new ApiResponse<>(true,userEntities,"");
    }

    @PostMapping("/user/changePassword")
    public ApiResponse<String> changePassword(
            @RequestParam("idUser") int idUser,
            @RequestParam("newPassword") String newPassword,
            @RequestParam("oldPassword") String oldPassword){
        try{

            StaffEntity staffEntity = staffDAO.getStaffById(idUser+"");
            String oldPasswordEncode = passwordEncoder.encode(oldPassword);
            String newPasswordEncode = passwordEncoder.encode(newPassword);
            System.out.println(newPasswordEncode);
            if(passwordEncoder.matches(oldPassword,staffEntity.getUserEntity().getPassword())==false)
                return new ApiResponse<>(false,"","Mật khẩu cũ không đúng");
            else {
                UserEntity userEntity = staffEntity.getUserEntity();
                System.out.println(userEntity.getPassword());
                System.out.println(newPasswordEncode);
                userEntity.setPassword(newPasswordEncode);
                staffEntity.setUserEntity(userEntity);
            }
            staffDAO.updateStaff(staffEntity);
            return new ApiResponse<>(true,"Đổi mật khẩu thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","");
        }
    }

}
