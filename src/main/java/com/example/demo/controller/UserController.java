package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.UserDAO;
import com.example.demo.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    public UserDAO userDao;




    @PostMapping("/getAllUser")
    public ApiResponse<List<UserEntity>> getAllUser(){
        List<UserEntity> userEntities = userDao.getAllUser();
        return new ApiResponse<>(true,userEntities,"");
    }

}
