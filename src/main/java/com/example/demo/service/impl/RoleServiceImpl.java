package com.example.demo.service.impl;

import com.example.demo.dao.RoleDAO;
import com.example.demo.entity.RoleEntity;
import com.example.demo.model.Role;
import com.example.demo.service.RoleService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Repository
@Transactional

public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleDAO roleDAO;
    @Override
    public List<Role> getAllRole() {
        List<RoleEntity> roleEntities = roleDAO.getAllRole();
        List<Role> roles = new ArrayList<>();
        for(RoleEntity roleEntity : roleEntities){
            roles.add(roleEntity.toRole());
        }
        return roles;
    }
}
