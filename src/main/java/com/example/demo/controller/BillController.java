package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.BillDAO;
import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.BillEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.model.Bill;
import com.example.demo.service.BillService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return new ApiResponse<>(true, bills ,"");
        } catch (Exception e) {
            return null;
        }
    }
}
