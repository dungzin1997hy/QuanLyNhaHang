package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    private int id;
    private Customer customer;
    private TimeBook timeBook;
    private Table table;
    private Date date;
    private String status;
}
