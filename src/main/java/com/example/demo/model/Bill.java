package com.example.demo.model;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.TableEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    private int id;
    private TableEntity tableEntity;
    private CustomerEntity customerEntity;
    private StaffEntity staffEntity;
    private List<UsedDish> usedDishList;

    public Bill(TableEntity tableEntity, CustomerEntity customerEntity, StaffEntity staffEntity, List<UsedDish> usedDishList) {
        this.tableEntity = tableEntity;
        this.customerEntity = customerEntity;
        this.staffEntity = staffEntity;
        this.usedDishList = usedDishList;
    }
}
