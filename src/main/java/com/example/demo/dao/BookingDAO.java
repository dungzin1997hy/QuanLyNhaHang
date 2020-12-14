package com.example.demo.dao;

import com.example.demo.entity.BookingEntity;

import java.util.List;

public interface BookingDAO {
    List<BookingEntity> getAllBooking();
    List<BookingEntity> getBookingByCustomer(String phoneNumber);
    BookingEntity addBooking(BookingEntity bookingEntity);
    BookingEntity updateBooking(BookingEntity bookingEntity);
    void deleteBooking(int idBooking);
}
