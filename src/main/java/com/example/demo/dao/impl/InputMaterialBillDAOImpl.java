package com.example.demo.dao.impl;

import com.example.demo.dao.InputMaterialBillDAO;
import com.example.demo.entity.InputMaterialBillEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
}
