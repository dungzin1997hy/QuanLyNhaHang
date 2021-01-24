package com.example.demo.model;

import com.example.demo.entity.StaffEntity;
import com.example.demo.service.BillService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recept extends Staff {
    @Autowired
    BillService billService;

    private List<Bill> bills;
    public Recept(int id, String name, String email, String phoneNumber, String address, String cmnd, String username, String password, String role, String urlImage, Role role1, String cmnd1) {
        super(id, name, email, phoneNumber, address, cmnd, username, password, role, urlImage, role1, cmnd1);
    }

    public List<Bill> getAllBillById(){
        List<Bill> list = billService.getBillByStaff(this.getId());
        return list;
    }
}
