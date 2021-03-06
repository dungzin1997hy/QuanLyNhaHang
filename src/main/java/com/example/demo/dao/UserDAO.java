package com.example.demo.dao;

import com.example.demo.entity.UserEntity;
import com.example.demo.model.User;

import java.util.List;


public interface UserDAO {
    UserEntity getByUsername(String username);
    void addUser(UserEntity user);
    List<UserEntity> getAllUser();
    List<String> getAllUsername();
}
