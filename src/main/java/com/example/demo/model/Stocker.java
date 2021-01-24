package com.example.demo.model;

import com.example.demo.service.InputBillService;
import com.example.demo.service.OutputBillService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stocker extends Staff {
    @Autowired
    InputBillService inputBillService;

    @Autowired
    OutputBillService outputBillService;


    public Stocker(int id, String name, String email, String phoneNumber, String address, String cmnd, String username, String password, String role, String urlImage, Role role1, String cmnd1) {
        super(id, name, email, phoneNumber, address, cmnd, username, password, role, urlImage, role1, cmnd1);
    }

    private List<InputMaterialBill> inputBill;
    private List<OutputMaterial> outputBill;

    public List<InputMaterialBill> getInputBillById(){
        return inputBillService.getInputBillByStaff(this.getId());
    }

    public List<OutputMaterialBill> getOutputBillById(){
        return outputBillService.getOutputBillByStaff(this.getId());
    }
}
