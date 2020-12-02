package com.example.demo.dao.impl;

import com.example.demo.dao.RoleDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.RoleEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional

public class RoleDAOImpl implements RoleDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public List<RoleEntity> getAllRole() {
        try {
            String sql = "SELECT u FROM RoleEntity u order by u.id";
            Query query = entityManager.createQuery(sql);
            List<RoleEntity> roleEntities = query.getResultList();
            return roleEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public RoleEntity getRoleById(String id) {
        try {
            String sql = "SELECT u FROM RoleEntity u where u.id= "+id;
            Query query = entityManager.createQuery(sql);
            return (RoleEntity) query.getSingleResult();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
