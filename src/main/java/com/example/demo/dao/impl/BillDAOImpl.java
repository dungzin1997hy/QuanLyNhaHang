package com.example.demo.dao.impl;

import com.example.demo.dao.BillDAO;
import com.example.demo.entity.BillEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.InputMaterialBillEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class BillDAOImpl implements BillDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<BillEntity> getAllBill() {
        try {
            String sql = "SELECT u FROM BillEntity u";
            Query query = entityManager.createQuery(sql);
            List<BillEntity> userList = query.getResultList();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<BillEntity> getBillByCustomer(int id) {
        try{
            String sql ="Select u from BillEntity u where u.customerEntity.id = '"+id+"' order by u.time desc ";
            Query query = entityManager.createQuery(sql);
            List<BillEntity> billEntities = query.getResultList();
            return billEntities;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public BillEntity addBill(BillEntity billEntity) {
        entityManager.persist(billEntity);
        return billEntity;
    }
}
