package com.example.demo.dao.impl;

import com.example.demo.dao.OutputMaterialBillDAO;
import com.example.demo.entity.InputMaterialBillEntity;
import com.example.demo.entity.OutputMaterialBillEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.swing.text.html.parser.Entity;
import java.util.List;

@Transactional
@Repository
public class OutputMaterialBillDAOImpl implements OutputMaterialBillDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public OutputMaterialBillEntity addInputBill(OutputMaterialBillEntity outputMaterialBillEntity) {
        entityManager.persist(outputMaterialBillEntity);
        return outputMaterialBillEntity;
    }

    @Override
    public List<OutputMaterialBillEntity> getOutPutBillByStaff(int id) {
        String sql ="Select u from OutputMaterialBillEntity u where u.staffEntity.id ='"+id+"'";
        Query query = entityManager.createQuery(sql);
        List<OutputMaterialBillEntity> list = query.getResultList();
        return list;
    }
}
