package com.example.demo.dao.impl;

import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional

public class UsedDishDAOImpl implements UsedDishDAO {
    @Autowired
    EntityManager entityManager;

    @Override
    public List<UsedDishEntity> getUsedDishByTable(String id) {
        try {
            String sql = "SELECT u FROM UsedDishEntity u where u.tableEntity.id ='"+id+"' and u.billEntity.id = null";
            Query query = entityManager.createQuery(sql);
            List<UsedDishEntity> roleEntities = query.getResultList();
            return roleEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public UsedDishEntity getUsedDishByID(int id) {
        try{
            String sql ="SELECT u FROM UsedDishEntity u WHERE u.id='"+id+"'";
            Query query = entityManager.createQuery(sql);
            UsedDishEntity list = (UsedDishEntity) query.getSingleResult();
            return list;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void updateTable(UsedDishEntity usedDishEntity) {
        entityManager.merge(usedDishEntity);
    }
}
