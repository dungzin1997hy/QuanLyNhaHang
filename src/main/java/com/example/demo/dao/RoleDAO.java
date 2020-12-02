package com.example.demo.dao;

import com.example.demo.entity.RoleEntity;

import java.util.List;

public interface RoleDAO {
    List<RoleEntity> getAllRole();
    RoleEntity getRoleById(String id);
}
