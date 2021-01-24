package com.example.demo.service;

import com.example.demo.model.InputMaterialBill;
import com.example.demo.model.OutputMaterialBill;

import java.util.List;

public interface InputBillService {
    List<InputMaterialBill> getInputBillByStaff(int id);
}
