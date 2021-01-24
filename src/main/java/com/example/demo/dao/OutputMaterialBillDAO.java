package com.example.demo.dao;

import com.example.demo.entity.InputMaterialBillEntity;
import com.example.demo.entity.OutputMaterialBillEntity;

import java.util.List;

public interface OutputMaterialBillDAO {
    OutputMaterialBillEntity addInputBill(OutputMaterialBillEntity outputMaterialBillEntity);
    List<OutputMaterialBillEntity> getOutPutBillByStaff(int id);
}
