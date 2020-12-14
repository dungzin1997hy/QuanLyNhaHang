package com.example.demo.dao.impl;

import com.example.demo.dao.BookingDAO;
import com.example.demo.entity.BookingEntity;
import com.example.demo.entity.CustomerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class BookingDAOImpl implements BookingDAO {
    @Autowired
    EntityManager entityManager;
    @Override
    public List<BookingEntity> getAllBooking() {
        try {
            String sql = "SELECT u FROM BookingEntity u where u.status = 'notcomplete' ";
            Query query = entityManager.createQuery(sql);
            List<BookingEntity> bookingEntities = query.getResultList();
            return bookingEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<BookingEntity> getBookingByCustomer(String phoneNumber) {
        try {
            String sql = "SELECT u FROM BookingEntity u where u.customerEntity.phoneNumber = "+phoneNumber;
            Query query = entityManager.createQuery(sql);
            List<BookingEntity> bookingEntities = query.getResultList();
            return bookingEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public BookingEntity addBooking(BookingEntity bookingEntity) {
        entityManager.persist(bookingEntity);
        return bookingEntity;
    }

    @Override
    public BookingEntity updateBooking(BookingEntity bookingEntity) {
        entityManager.merge(bookingEntity);
        return bookingEntity;
    }

    @Override
    public void deleteBooking(int idBooking) {
        String sql = "delete from BookingEntity b where b.id="+idBooking;
        Query query = entityManager.createQuery(sql);
        query.executeUpdate();
    }
}
