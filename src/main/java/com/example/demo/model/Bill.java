package com.example.demo.model;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.TableEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    private int id;
    private String nameTable;
    private String nameCustomer;
    private String nameStaff;
    private int total;
    private String paymentType;
    private LocalDateTime time;
}
