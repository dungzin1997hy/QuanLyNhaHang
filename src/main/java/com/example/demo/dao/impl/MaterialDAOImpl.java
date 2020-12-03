package com.example.demo.dao.impl;

import com.example.demo.dao.MaterialDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.MaterialEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional

public class MaterialDAOImpl implements MaterialDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public List<MaterialEntity> getAllMaterial() {
        try {
            String sql = "SELECT u FROM MaterialEntity u";
            Query query = entityManager.createQuery(sql);
            List<MaterialEntity> materialEntities = query.getResultList();
            return materialEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<MaterialEntity> searchMaterialByName(String name) {
        try {
            String sql = "SELECT u FROM MaterialEntity u WHERE u.name LIKE '%" + name + "%'";
            Query query = entityManager.createQuery(sql);
//            query.setParameter("name", nameDish);
            List<MaterialEntity> materialEntities = query.getResultList();
            return materialEntities;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void addMaterial(MaterialEntity materialEntity) {
        entityManager.persist(materialEntity);
    }

    @Override
    public void deleteMaterial(int id) {
        String sql = "delete from MaterialEntity b where b.id=" + id;
        Query query = entityManager.createQuery(sql);
        query.executeUpdate();
    }

    @Override
    public void updateMaterial(MaterialEntity materialEntity) {
        entityManager.merge(materialEntity);
    }

    @Override
    public Boolean checkExistMaterial(String name) {
        try {
            String sql = "SELECT u.name FROM MaterialEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> strings = query.getResultList();
            if(strings.contains(name))
                return true;
            else return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
