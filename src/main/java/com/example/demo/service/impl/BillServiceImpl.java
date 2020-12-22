package com.example.demo.service.impl;

import com.example.demo.dao.BillDAO;
import com.example.demo.entity.BillEntity;
import com.example.demo.model.Bill;
import com.example.demo.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class BillServiceImpl implements BillService {
    @Autowired
    private BillDAO billDAO;
    @Override
    public List<Bill> getAllBill() {
        List<BillEntity> billEntities = billDAO.getAllBill();
        List<Bill> bills = new ArrayList<>();
        if(billEntities==null)
            return null;


        return bills;
    }

    @Override
    public List<Bill> getBillByCustomer(int id) {
        try{
            List<BillEntity> billEntities = billDAO.getBillByCustomer(id);
            List<Bill> bills = new ArrayList<>();
            for(BillEntity billEntity : billEntities){
                bills.add(billEntity.toBill());
            }
            return bills;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
