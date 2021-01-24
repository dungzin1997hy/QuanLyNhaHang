package com.example.demo.dao;

import com.example.demo.entity.InputMaterialBillEntity;

import java.util.List;

public interface InputMaterialBillDAO {
    InputMaterialBillEntity addInputBill(InputMaterialBillEntity inputMaterialBillEntity);
    List<InputMaterialBillEntity> getInputBillByStaff(int id);
}
