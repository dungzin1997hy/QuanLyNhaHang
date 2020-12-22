package com.example.demo.service;

import com.example.demo.model.Bill;

import java.util.List;

public interface BillService {
    List<Bill> getAllBill();
    List<Bill> getBillByCustomer(int id);
}
