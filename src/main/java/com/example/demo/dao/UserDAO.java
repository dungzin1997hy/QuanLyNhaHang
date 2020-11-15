package com.example.demo.dao;

import com.example.demo.entity.UserEntity;
import com.example.demo.model.User;


public interface UserDAO {
    UserEntity getByUsername(String username);
    void addUser(User user);
}
