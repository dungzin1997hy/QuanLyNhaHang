package com.example.demo.service.impl;

import com.example.demo.dao.TableDAO;
import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;
import com.example.demo.model.Table;
import com.example.demo.model.UsedDish;
import com.example.demo.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Repository
@Transactional
public class TableServiceImpl implements TableService {
    @Autowired
    TableDAO tableDAO;
    @Override
    public List<Table> getAllTable() {
        List<TableEntity> tableEntities =  tableDAO.getAllTable();
        List<Table> tables = new ArrayList<>();
        for(TableEntity tableEntity: tableEntities){
            Table table = new Table();
            table.setId(tableEntity.getId());
            table.setName(tableEntity.getName());
            table.setStatus(tableEntity.getStatus());
            table.setType(tableEntity.getType());
            table.setArea(tableEntity.getArea());
            tables.add(table);
        }
        return tables;
    }

    @Override
    public List<Table> searchTableByType(String type) {
        List<TableEntity> tableEntities = tableDAO.searchTableByType(type);
        List<Table> tables = new ArrayList<>();
        for(TableEntity tableEntity: tableEntities){
            Table table = new Table();
            table.setId(tableEntity.getId());
            table.setName(tableEntity.getName());
            table.setStatus(tableEntity.getStatus());
            table.setType(tableEntity.getType());
            table.setArea(tableEntity.getArea());
            tables.add(table);
        }
        return tables;
    }

    @Override
    public List<Table> getTableByArea(String area) {
        List<TableEntity> tableEntities = tableDAO.getTableByArea(area);
        List<Table> tables = new ArrayList<>();
        for(TableEntity tableEntity: tableEntities){
            Table table = new Table();
            table.setId(tableEntity.getId());
            table.setName(tableEntity.getName());
            table.setStatus(tableEntity.getStatus());
            table.setType(tableEntity.getType());
            table.setArea(tableEntity.getArea());
            tables.add(table);
        }
        return tables;
    }

    @Override
    public List<Table> searchTableBooking(String type, int idTimeBook) {
        List<TableEntity> tableEntities = tableDAO.searchTableBooking(type,idTimeBook);
        List<Table> tables = new ArrayList<>();
        for(TableEntity tableEntity: tableEntities){
            tables.add(tableEntity.toTable());
        }
        return tables;
    }

    @Override
    public Table getTableByName(String name) {
        TableEntity tableEntity = tableDAO.getTableByName(name);
//        List<UsedDishEntity> usedDishEntities = tableEntity.getUsedDishEntities();
//        List<UsedDish> usedDishes = new ArrayList<>();
//        for(UsedDishEntity usedDishEntity:usedDishEntities){
//            UsedDish usedDish = usedDishEntity.toUsedDish();
//            usedDishes.add(usedDish);
//        }
        Table table = new Table();
        table.setId(tableEntity.getId());
        table.setName(tableEntity.getName());
        table.setStatus(tableEntity.getStatus());
        table.setType(tableEntity.getType());
        table.setArea(tableEntity.getArea());
       // table.setUsedDishList(usedDishes);
        return table;


    }


}
