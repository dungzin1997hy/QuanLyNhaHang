package com.example.demo.dao;

import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.TableEntity;

import java.util.List;

public interface TableDAO {
    List<TableEntity> searchTableByType(String Type);

    List<TableEntity> getAllTable();

    Boolean checkExistTable(String tableName);

    void addTable(TableEntity tableEntity);
    void deleteTable(int idTable);
    void updateTable(TableEntity tableEntity);
}
