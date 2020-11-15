package com.example.demo.dao.impl;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.Dish;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Dish getAllDish(String dishName) {
        try {
            String hql = "SELECT u FROM Dish u WHERE u.name = :dishName";
            Query query = entityManager.createQuery(hql);
            query.setParameter("dishName", dishName);
            return (Dish) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }


    @Override
    public List<String> getAllDishID() {
        String sql = "SELECT  distinct(id) from quanlynhahang.monan";
        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList();
    }

    @Override
    public void print() {
        System.out.println("dayla auto");
    }
}
