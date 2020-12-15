package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.BookingDAO;
import com.example.demo.dao.CustomerDAO;
import com.example.demo.dao.TableDAO;
import com.example.demo.dao.TimeBookDAO;
import com.example.demo.entity.BookingEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.TableEntity;
import com.example.demo.entity.TimeBookEntity;
import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class BookingController {
    @Autowired
    BookingDAO bookingDAO;
    @Autowired
    BookingService bookingService;
    @Autowired
    CustomerDAO customerDAO;
    @Autowired
    TimeBookDAO timeBookDAO;
    @Autowired
    TableDAO tableDAO;

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

    @PostMapping("/addBooking")
    public ApiResponse<String> addBooking(@RequestParam("cusPhone") String phone,
                                          @RequestParam("timebookid") int timebookid,
                                          @RequestParam("idban") String idTable,
                                          @RequestParam("date")Date date){
        try {
            CustomerEntity customerEntity = customerDAO.searchCustomerByPhoneNumber(phone);
            TimeBookEntity timeBookEntity = timeBookDAO.searchTimeBookByID(timebookid);
            TableEntity tableEntity = tableDAO.searchTableByID(idTable);
            BookingEntity bookingEntity = new BookingEntity();
            bookingEntity.setCustomerEntity(customerEntity);
            bookingEntity.setDate(date);
            bookingEntity.setTableEntity(tableEntity);
            bookingEntity.setTimeBookEntity(timeBookEntity);
            bookingEntity.setStatus("notcomplete");
            bookingDAO.addBooking(bookingEntity);
            return new ApiResponse<>(true,"Thêm đặt bàn thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không thêm được đặt bàn");
        }
    }
}

