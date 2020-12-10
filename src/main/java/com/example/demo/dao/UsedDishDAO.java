package com.example.demo.dao;

import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;

import java.util.List;

public interface UsedDishDAO {
    List<UsedDishEntity> getUsedDishByTable(String id);
    UsedDishEntity getUsedDishByID(int id);
    void updateTable(UsedDishEntity usedDishEntity);
}
