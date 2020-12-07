package com.example.demo.dao.impl;

import com.example.demo.dao.InputMaterialDAO;
import com.example.demo.entity.InputMaterialEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@Transactional
public class InputMaterialDAOImpl implements InputMaterialDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void addInputMaterial(InputMaterialEntity inputMaterialEntity) {
        entityManager.persist(inputMaterialEntity);
    }
}
