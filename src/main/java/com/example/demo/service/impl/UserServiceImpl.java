package com.example.demo.service.impl;


import com.example.demo.dao.UserDAO;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.Staff;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public Staff getByUsername(String username) {
        try {
            UserEntity userEntity = userDAO.getByUsername(username);
            Staff staff = new Staff();
            staff.setUsername(userEntity.getUsername());
            staff.setId(userEntity.getStaffEntity().getId());
            staff.setUrlImage(userEntity.getStaffEntity().getUrl());
            staff.setName(userEntity.getStaffEntity().getName());
            return staff;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userDAO.getByUsername(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("Not Found !");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userEntity.getRole());
        authorities.add(authority);
        return new org.springframework.security.core.userdetails.User(username, userEntity.getPassword(), authorities);

    }
}
