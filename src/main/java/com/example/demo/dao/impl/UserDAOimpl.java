package com.example.demo.dao.impl;


import com.example.demo.dao.UserDAO;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
@Transactional
public class UserDAOimpl implements UserDAO {
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public UserEntity getByUsername(String username) {
        try {
            String hql = "SELECT u FROM UserEntity u WHERE u.username = :username";
            Query query = entityManager.createQuery(hql);
            query.setParameter("username", username);
            return (UserEntity) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public void addUser(User user) {
//        String sql = "INSERT INTO thanhvien (MaKH,MaThang,SoDienCu,SoDienMoi,Status) VALUES ('" + user.getUsername() + "', '" + dienKe.getMaThang() + "', '" + dienKe.getSoDienCu() + "', '" + dienKe.getSoDienMoi() + "', '" + dienKe.getStatus() + "')";
//        Query query = entityManager.createNativeQuery(sql);
//        query.executeUpdate();
    }
}
