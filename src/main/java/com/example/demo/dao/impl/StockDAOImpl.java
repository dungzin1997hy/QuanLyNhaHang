package com.example.demo.dao.impl;

import com.example.demo.dao.StockDAO;
import com.example.demo.entity.StockEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import javax.persistence.Query;

@Repository
@Transactional
public class StockDAOImpl implements StockDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public StockEntity getStock(int id) {
        String sql ="select u from StockEntity u where u.id ='"+id+"'";
        Query query = entityManager.createQuery(sql);
        StockEntity stockEntity = (StockEntity) query.getSingleResult();
        return stockEntity;

    }
}
