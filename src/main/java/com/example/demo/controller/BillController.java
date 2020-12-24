package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.BillDAO;
import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.BillEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.model.Bill;
import com.example.demo.model.BillCount;
import com.example.demo.service.BillService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
public class BillController {
    @Autowired
    private BillDAO billDAO;

    @Autowired
    private BillService billService;

    @PostMapping("/getAllBill")
    public ApiResponse<List<Bill>> getAllBill() {
        List<Bill> bills = billService.getAllBill();
        try {
            return new ApiResponse<>(true, bills, "");
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/getBillByDay")
    public ApiResponse<List<BillCount>> getBillByDay(@RequestParam("startDate") String startDate,
                                                     @RequestParam("stopDate") String stopDate) {
        try {
            startDate = startDate + " 00:00";
            stopDate = stopDate + " 23:59";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime start = LocalDateTime.parse(startDate, formatter);
            LocalDateTime stop = LocalDateTime.parse(stopDate, formatter);
            List<BillCount> billCounts = billDAO.getAllBillByDay(start, stop);
            return new ApiResponse<>(true, billCounts, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, null, "");
        }
    }
//    @PostMapping("/saveBill")
//    public ApiResponse<String> saveBill(){
//
//    }
}
