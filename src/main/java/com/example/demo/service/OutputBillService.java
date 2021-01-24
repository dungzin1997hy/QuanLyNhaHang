package com.example.demo.service;

import com.example.demo.model.OutputMaterialBill;

import java.util.List;

public interface OutputBillService {
    List<OutputMaterialBill> getOutputBillByStaff(int id);
}
