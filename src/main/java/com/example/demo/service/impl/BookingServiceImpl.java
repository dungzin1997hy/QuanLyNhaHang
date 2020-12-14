package com.example.demo.service.impl;

import com.example.demo.dao.BookingDAO;
import com.example.demo.entity.BookingEntity;
import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    BookingDAO bookingDAO;
    @Override
    public List<Booking> getAllBooking() {
        List<BookingEntity> bookingEntities = bookingDAO.getAllBooking();
        List<Booking> bookings = new ArrayList<>();
        for(BookingEntity bookingEntity:bookingEntities){
            bookings.add(bookingEntity.toBooking());

        }
        return bookings;
    }

    @Override
    public List<Booking> getBookingByCustomer(String phoneNumber) {
        List<BookingEntity> bookingEntities = bookingDAO.getBookingByCustomer(phoneNumber);
        List<Booking> bookings = new ArrayList<>();
        for(BookingEntity bookingEntity:bookingEntities){
            bookings.add(bookingEntity.toBooking());

        }
        return bookings;
    }
}
