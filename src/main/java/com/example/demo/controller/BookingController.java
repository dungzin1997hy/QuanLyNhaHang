package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.BookingDAO;
import com.example.demo.entity.BookingEntity;
import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookingController {
    @Autowired
    BookingDAO bookingDAO;
    @Autowired
    BookingService bookingService;

    @PostMapping("/getAllBooking")
    public ApiResponse<List<Booking>> getAllBooking() {
        try {
            List<Booking> list = bookingService.getAllBooking();
            return new ApiResponse<>(true, list, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, null, "Lỗi");
        }
    }

    @PostMapping("/deleteBooking")
    public ApiResponse<String> deleteBooking(@RequestParam("idBooking")int id){
        try{
            bookingDAO.deleteBooking(id);
            return new ApiResponse<>(true,"Xoá đặt bàn thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không xoá được");
        }
    }
}

