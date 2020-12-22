package com.example.demo.dao;

import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.TableEntity;

import java.util.Date;
import java.util.List;

public interface TableDAO {
    List<TableEntity> searchTableByType(String Type);

    List<TableEntity> getAllTable();
    List<TableEntity> getTableByArea(String area);
    List<TableEntity> searchTableBooking(String type, int idTime, Date date);

    TableEntity getTableByName(String name);
    TableEntity getTableById(int id);
    Boolean checkExistTable(String tableName);
    TableEntity searchTableByID(String id);


    void addTable(TableEntity tableEntity);
    void deleteTable(int idTable);
    void updateTable(TableEntity tableEntity);
}
