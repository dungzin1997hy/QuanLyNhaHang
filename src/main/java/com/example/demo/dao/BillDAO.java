package com.example.demo.dao;

import com.example.demo.entity.BillEntity;
import com.example.demo.model.BillCount;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface BillDAO {
    List<BillEntity> getAllBill();
    List<BillEntity> getBillByCustomer(int id);
    BillEntity addBill(BillEntity billEntity);

    List<BillCount> getAllBillByDay(LocalDateTime startDate, LocalDateTime stopDate);
}
