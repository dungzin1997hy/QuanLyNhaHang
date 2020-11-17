package com.example.demo.dao.impl;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional

public class DishDAOImpl implements DishDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public DishEntity searchDishByName(String dishName) {
        try {
            String hql = "SELECT u FROM DishEntity u WHERE u.name LIKE %"+dishName+"%";
            Query query = entityManager.createQuery(hql);
            query.setParameter("dishName", dishName);
            return (DishEntity) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<DishEntity> getAllDish() {
        try {
            String sql = "SELECT u FROM DishEntity u";
            Query query = entityManager.createQuery(sql);
            List<DishEntity> dishEntities = query.getResultList();
            return dishEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<DishEntity> getAllDishByType(String type) {
        try {
            String sql = "SELECT u FROM DishEntity u WHERE u.type =:type";
            Query query = entityManager.createQuery(sql);
            query.setParameter("type", type);
            List<DishEntity> dishEntities = query.getResultList();
            return dishEntities;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public Boolean checkExistDish(String dishName) {
        try {
            String sql = "SELECT u.name FROM DishEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> dishNames = query.getResultList();
            if (dishNames.contains(dishName)) {
                return true;
            } else return false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public List<String> getAllTypeDish(){
        String sql = "SELECT DISTINCT u.type FROM DishEntity u";
        Query query = entityManager.createQuery(sql);
        List<String> types = query.getResultList();
        return types;
    }

    @Override
    public void addDish(DishEntity dishEntity) {
        entityManager.persist(dishEntity);
    }

    @Override
    public void deleteDish(int idDish) {
        String sql ="delete from DishEntity b where b.id=:id";
        Query query = entityManager.createQuery(sql);
        query.executeUpdate();
    }

    @Override
    public void update(DishEntity dishEntity) {
        entityManager.merge(dishEntity);
    }


}
