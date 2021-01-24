package com.example.demo.dao.impl;

import com.example.demo.dao.InputMaterialBillDAO;
import com.example.demo.entity.InputMaterialBillEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class InputMaterialBillDAOImpl implements InputMaterialBillDAO {

    @Autowired
    private EntityManager entityManager;
    @Override
    public InputMaterialBillEntity addInputBill(InputMaterialBillEntity inputMaterialBillEntity) {
        entityManager.persist(inputMaterialBillEntity);
        return inputMaterialBillEntity;
    }

    @Override
    public List<InputMaterialBillEntity> getInputBillByStaff(int id) {
        String sql ="Select u from InputMaterialBillEntity u where u.staffEntity.id ='"+id+"'";
        Query query = entityManager.createQuery(sql);
        List<InputMaterialBillEntity> list = query.getResultList();
        return list;
    }
}
