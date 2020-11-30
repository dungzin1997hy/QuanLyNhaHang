package com.example.demo.service;

import com.example.demo.model.Table;

import java.util.List;

public interface TableService {
    List<Table> getAllTable();
    List<Table> searchTableByType(String type);
    List<Table> getTableByArea(String area);

    Table getTableByName(String name);
}
