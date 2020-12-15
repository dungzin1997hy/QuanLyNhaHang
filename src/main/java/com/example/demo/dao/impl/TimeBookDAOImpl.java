package com.example.demo.dao.impl;

import com.example.demo.dao.TimeBookDAO;
import com.example.demo.entity.BookingEntity;
import com.example.demo.entity.TimeBookEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.sql.Time;
import java.util.List;

@Repository
@Transactional
public class TimeBookDAOImpl implements TimeBookDAO {

    @Autowired
    EntityManager entityManager;
    @Override
    public List<TimeBookEntity> getAllTimeBookEntity() {
        try {
            String sql = "SELECT u FROM TimeBookEntity u ";
            Query query = entityManager.createQuery(sql);
            List<TimeBookEntity> timeBookEntities = query.getResultList();
            return timeBookEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public TimeBookEntity searchTimeBookByID(int id) {
        try{
            String sql ="SELECT u FROM TimeBookEntity u WHERE u.id = '"+id+"'";
            Query query = entityManager.createQuery(sql);
            TimeBookEntity timeBookEntity = (TimeBookEntity) query.getSingleResult();
            return timeBookEntity;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
