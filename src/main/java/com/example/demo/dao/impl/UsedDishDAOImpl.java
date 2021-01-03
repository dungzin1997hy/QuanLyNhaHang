package com.example.demo.dao.impl;

import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.RoleEntity;
import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;
import com.example.demo.model.BillCount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional

public class UsedDishDAOImpl implements UsedDishDAO {
    @Autowired
    EntityManager entityManager;

    @Override
    public List<UsedDishEntity> getUsedDishByTable(String id) {
        try {
            String sql = "SELECT u FROM UsedDishEntity u where u.tableEntity.id ='"+id+"' and u.billEntity.id = null";
            Query query = entityManager.createQuery(sql);
            List<UsedDishEntity> roleEntities = query.getResultList();
            return roleEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



    @Override
    public UsedDishEntity getUsedDishByID(int id) {
        try{
            String sql ="SELECT u FROM UsedDishEntity u WHERE u.id='"+id+"'";
            Query query = entityManager.createQuery(sql);
            UsedDishEntity list = (UsedDishEntity) query.getSingleResult();
            return list;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<String> getUsedDishCount(LocalDateTime startDate, LocalDateTime stopDate) {
        try{
            String sql="select b.type, sum(a.amount) from DishEntity b left join b.usedDishEntities a where a.time <= :stopDate and a.time>=:startDate group by b.type";
            Query query = entityManager.createQuery(sql);
            query.setParameter("stopDate",stopDate);
            query.setParameter("startDate",startDate);
            List<String> billCountstemp = query.getResultList();
            System.out.println(billCountstemp);
            return billCountstemp;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<String> getDishCount(LocalDateTime startDate, LocalDateTime stopDate, int idDish) {
        try{
            String sql ="select cast(b.time as LocalDate),sum(b.amount) from DishEntity a left join a.usedDishEntities b where b.time <= :stopDate and b.time>=:startDate and a.id ='"+idDish+"' GROUP BY cast(b.time as LocalDate),a.id";
            Query query = entityManager.createQuery(sql);
            query.setParameter("startDate",startDate);
            query.setParameter("stopDate",stopDate);
            List<String> list = query.getResultList();
            System.out.println(list.toString());
            return list;

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void updateTable(UsedDishEntity usedDishEntity) {
        entityManager.merge(usedDishEntity);
    }

    @Override
    public void addUsedDish(UsedDishEntity usedDishEntity) {
        entityManager.persist(usedDishEntity);
    }
}
