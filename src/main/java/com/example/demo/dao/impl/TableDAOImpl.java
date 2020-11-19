package com.example.demo.dao.impl;

import com.example.demo.dao.TableDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.TableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class TableDAOImpl implements TableDAO {
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<TableEntity> searchTableByType(String Type) {
        String sql ="SELECT u FROM TableEntity u WHERE u.type="+Type;
        Query query = entityManager.createQuery(sql);
        List<TableEntity> tableEntities = query.getResultList();
        return tableEntities;
    }

    @Override
    public List<TableEntity> getAllTable() {
        try {
            String sql = "SELECT u FROM TableEntity u";
            Query query = entityManager.createQuery(sql);
            List<TableEntity> tableEntities = query.getResultList();
            return tableEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean checkExistTable(String tableName) {
        try {
            String sql = "SELECT u.name FROM TableEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> tableNames = query.getResultList();
            if (tableNames.contains(tableName)) {
                return true;
            } else return false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;

    }

    @Override
    public void addTable(TableEntity tableEntity) {
        entityManager.persist(tableEntity);
    }

    @Override
    public void deleteTable(int idTable) {
        String sql ="delete from TableEntity b where b.id="+idTable;
        Query query = entityManager.createQuery(sql);
        query.executeUpdate();
    }

    @Override
    public void updateTable(TableEntity tableEntity) {
        entityManager.merge(tableEntity);
    }
}
