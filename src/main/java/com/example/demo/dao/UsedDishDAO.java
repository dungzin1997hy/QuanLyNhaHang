package com.example.demo.dao;

import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;
import org.apache.tomcat.jni.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface UsedDishDAO {
    List<UsedDishEntity> getUsedDishByTable(String id);
    UsedDishEntity getUsedDishByID(int id);
    List<String> getUsedDishCount(LocalDateTime startDate, LocalDateTime stopDate);

    List<String> getDishCount(LocalDateTime startDate,LocalDateTime stopDate,int idDish);

    void updateTable(UsedDishEntity usedDishEntity);
    void addUsedDish(UsedDishEntity usedDishEntity);
}
