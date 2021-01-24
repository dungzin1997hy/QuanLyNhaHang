package com.example.demo.dao.impl;

import com.example.demo.dao.OutputMaterialBillDAO;
import com.example.demo.dao.OutputMaterialDAO;
import com.example.demo.entity.OutputMaterialEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Transactional
@Repository
public class OutputMaterialDAOImpl implements OutputMaterialDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public void addOutputMaterial(OutputMaterialEntity outputMaterialEntity) {
        entityManager.persist(outputMaterialEntity);
    }
}
