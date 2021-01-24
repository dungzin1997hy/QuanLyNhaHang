package com.example.demo.service.impl;

import com.example.demo.dao.OutputMaterialBillDAO;
import com.example.demo.entity.OutputMaterialBillEntity;
import com.example.demo.model.OutputMaterialBill;
import com.example.demo.service.OutputBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class OutputBillServiceImpl implements OutputBillService {
    @Autowired
    OutputMaterialBillDAO outputMaterialBillDAO;

    @Override
    public List<OutputMaterialBill> getOutputBillByStaff(int id) {
        List<OutputMaterialBillEntity> list = outputMaterialBillDAO.getOutPutBillByStaff(id);
        List<OutputMaterialBill> list1 = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            list1.add(list.get(i).toOnputBill());
        }
        return list1;
    }
}
