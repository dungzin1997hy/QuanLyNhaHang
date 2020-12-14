package com.example.demo.service;

import com.example.demo.model.Booking;

import java.util.List;

public interface BookingService {
    List<Booking> getAllBooking();
    List<Booking> getBookingByCustomer(String phoneNumber);
}
