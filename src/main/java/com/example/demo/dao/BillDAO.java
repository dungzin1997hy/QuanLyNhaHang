package com.example.demo.dao;

import com.example.demo.entity.BillEntity;

import java.util.List;

public interface BillDAO {
    List<BillEntity> getAllBill();
    List<BillEntity> getBillByCustomer(int id);
    BillEntity addBill(BillEntity billEntity);
}
