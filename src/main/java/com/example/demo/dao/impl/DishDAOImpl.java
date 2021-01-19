package com.example.demo.dao.impl;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import com.sun.xml.internal.messaging.saaj.packaging.mime.util.QEncoderStream;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional

public class DishDAOImpl implements DishDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public DishEntity searchDishByName(String dishName) {
        try {
            String hql = "SELECT u FROM DishEntity u WHERE u.name =:dishName";
            Query query = entityManager.createQuery(hql);
            query.setParameter("dishName", dishName);
            return (DishEntity) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public DishEntity searchDishById(int id) {
        try{
            String sql="Select u from DishEntity u where u.id = '"+id+"'";
            Query query = entityManager.createQuery(sql);
            return (DishEntity) query.getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public List<DishEntity> getAllDish() {
        try {
            String sql = "SELECT u FROM DishEntity u order by u.type,u.name";
            Query query = entityManager.createQuery(sql);
            List<DishEntity> dishEntities = query.getResultList();
            return dishEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<DishEntity> getAllDishByType(String type) {
        try {
            String sql = "SELECT u FROM DishEntity u WHERE u.type =:type order by u.type,u.name";
            Query query = entityManager.createQuery(sql);
            query.setParameter("type", type);
            List<DishEntity> dishEntities = query.getResultList();
            return dishEntities;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public Boolean checkExistDish(String dishName) {
        try {
            String sql = "SELECT u.name FROM DishEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> dishNames = query.getResultList();
            if (dishNames.contains(dishName)) {
                return true;
            } else return false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public List<String> getAllTypeDish() {
        String sql = "SELECT DISTINCT u.type FROM DishEntity u";
        Query query = entityManager.createQuery(sql);
        List<String> types = query.getResultList();
        return types;
    }

    @Override
    public List<DishEntity> getListDishByName(String nameDish) {
        try {
            String sql = "SELECT u FROM DishEntity u WHERE u.name LIKE '%" + nameDish + "%'";
            Query query = entityManager.createQuery(sql);
//            query.setParameter("name", nameDish);
            List<DishEntity> dishEntities = query.getResultList();
            return dishEntities;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void addDish(DishEntity dishEntity) {
        entityManager.persist(dishEntity);
    }

    @Override
    public void deleteDish(int idDish) {
        DishEntity dishEntity = searchDishById(idDish);
//        String sql = "delete from DishEntity b where b.id=" + idDish;
//        Query query = entityManager.createQuery(sql);
//        query.executeUpdate();
        entityManager.remove(dishEntity);
    }

    @Override
    public void update(DishEntity dishEntity) {
        entityManager.merge(dishEntity);
    }

    @Override
    public List<String> chartByDishType(String type, LocalDateTime startDate, LocalDateTime stopDate) {
        try{
            String sql ="Select a.name,sum(b.amount),cast(b.time as date) from DishEntity a left join a.usedDishEntities b " +
                    "where ((b.time <= :stopDate and b.time>=:startDate) or cast(b.time as date) is null)  and a.type='"+type+"' " +
                    "group by a.name,cast(b.time as date) order by cast(b.time as date),a.name";
            //String sql ="Select a.name,sum(b.amount) from DishEntity a left join a.usedDishEntities b where b.time <= :stopDate and b.time>=:startDate and a.type='"+type+"' group by a.name";
            Query query = entityManager.createQuery(sql);
            query.setParameter("stopDate",stopDate);
            query.setParameter("startDate",startDate);
            List<String> list = query.getResultList();
            return list;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


}
