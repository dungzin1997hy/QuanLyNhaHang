package com.example.demo.dao.impl;

import com.example.demo.dao.TableDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.TableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class TableDAOImpl implements TableDAO {
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<TableEntity> searchTableByType(String Type) {
        String sql ="SELECT u FROM TableEntity u WHERE u.type='"+Type+"' order by u.area";
        Query query = entityManager.createQuery(sql);
        List<TableEntity> tableEntities = query.getResultList();
        return tableEntities;
    }

    @Override
    public List<TableEntity> getAllTable() {
        try {
            String sql = "SELECT u FROM TableEntity u order by u.area,u.type,u.name asc";
            Query query = entityManager.createQuery(sql);
            List<TableEntity> tableEntities = query.getResultList();
            return tableEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<TableEntity> getTableByArea(String area) {
        try{
            String sql ="SELECT u FROM TableEntity u WHERE u.area='"+area+"' order by u.type";
            Query query = entityManager.createQuery(sql);
            List<TableEntity> tableEntities = query.getResultList();
            return tableEntities;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<TableEntity> searchTableBooking(String type, int idTime, Date date) {
        try {

            SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy");
            java.sql.Timestamp datetime = new Timestamp(formatter.parse(date.toString()).getTime());
          //  System.out.println("DateTime: " + datetime.toString());
            DateFormat f = new SimpleDateFormat("yyyy-MM-dd");
            String d = f.format(datetime);



            String sql = "SELECT a FROM TableEntity a WHERE '"+idTime+"' <> ALL (SELECT b.timeBookEntity.id FROM a.bookingEntities b) or '"+d+"'<> ALL (SELECT b.date from a.bookingEntities b) order by a.type";
         //   String sql1="Select b.tableEntity.id from TableEntity.bookingEntities b";
            Query query = entityManager.createQuery(sql);
            List<TableEntity> tableEntities = query.getResultList();
            return tableEntities;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public TableEntity getTableByName(String name) {
        try{
            String sql ="SELECT u FROM TableEntity u WHERE u.name='"+name+"'";
            Query query = entityManager.createQuery(sql);
            TableEntity list = (TableEntity) query.getSingleResult();
            return list;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public TableEntity getTableById(int id) {
        try{
            String sql ="select u from TableEntity u where u.id ='"+id+"'";
            Query query = entityManager.createQuery(sql);
            TableEntity tableEntity = (TableEntity) query.getSingleResult();
            return tableEntity;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
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
    public TableEntity searchTableByID(String id) {
        try{
            String sql ="SELECT u from TableEntity u where u.id='"+id+"'";
            Query query = entityManager.createQuery(sql);
            TableEntity tableEntity = (TableEntity) query.getSingleResult();
            return tableEntity;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void addTable(TableEntity tableEntity) {
        entityManager.persist(tableEntity);
    }

    @Override
    public void deleteTable(int idTable) {
//        String sql ="delete from TableEntity b where b.id="+idTable;
//        Query query = entityManager.createQuery(sql);
//        query.executeUpdate();
        TableEntity tableEntity = getTableById(idTable);
        entityManager.remove(tableEntity);
    }

    @Override
    public void updateTable(TableEntity tableEntity) {
        entityManager.merge(tableEntity);
    }
}
