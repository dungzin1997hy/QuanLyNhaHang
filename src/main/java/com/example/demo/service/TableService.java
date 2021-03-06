package com.example.demo.service;

import com.example.demo.model.Table;

import java.util.Date;
import java.util.List;

public interface TableService {
    List<Table> getAllTable();
    List<Table> searchTableByType(String type);
    List<Table> getTableByArea(String area);
    List<Table> searchTableBooking(String type,int idTimeBook, Date date);


    Table getTableByName(String name);
}
