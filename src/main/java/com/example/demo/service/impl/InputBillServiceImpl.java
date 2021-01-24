package com.example.demo.service.impl;

import com.example.demo.dao.InputMaterialBillDAO;
import com.example.demo.entity.InputMaterialBillEntity;
import com.example.demo.entity.OutputMaterialBillEntity;
import com.example.demo.model.InputMaterialBill;
import com.example.demo.model.OutputMaterialBill;
import com.example.demo.service.InputBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class InputBillServiceImpl implements InputBillService {
    @Autowired
    InputMaterialBillDAO inputMaterialBillDAO;
    @Override
    public List<InputMaterialBill> getInputBillByStaff(int id) {
        List<InputMaterialBillEntity> list = inputMaterialBillDAO.getInputBillByStaff(id);
        List<InputMaterialBill> list1 = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            list1.add(list.get(i).toInputBill());
        }
        return list1;
    }
}
