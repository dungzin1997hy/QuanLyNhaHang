package com.example.demo.dao;

import com.example.demo.entity.DishEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface DishDAO {
    DishEntity searchDishByName(String dishName);
    DishEntity searchDishById(int id);
    List<DishEntity> getAllDish();
    List<DishEntity> getAllDishByType(String type);
    List<String> getAllTypeDish();
    List<DishEntity> getListDishByName(String dishName);

    Boolean checkExistDish(String dishName);


    void addDish(DishEntity dishEntity);
    void deleteDish(int idDish);
    void update(DishEntity dishEntity);


    List<String> chartByDishType(String type, LocalDateTime startTime,LocalDateTime stopTime);

}
