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
import java.util.List;

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
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public List<UserEntity> getAllUser(){
        String sql = "SELECT u FROM UserEntity u";
        Query query = entityManager.createQuery(sql);
        List<UserEntity> userEntities = query.getResultList();
        return userEntities;
    }

    @Override
    public List<String> getAllUsername() {
        String sql = "SELECT u.username FROM UserEntity u";
        Query query = entityManager.createQuery(sql);
        List<String> strings = query.getResultList();
        return strings;
    }


    @Override
    public void addUser(UserEntity user) {
        entityManager.persist(user);
    }
}
