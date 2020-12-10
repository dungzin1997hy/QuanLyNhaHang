package com.example.demo.service.impl;

import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.UsedDishEntity;
import com.example.demo.model.UsedDish;
import com.example.demo.service.UsedDishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class UsedDishServiceImpl implements UsedDishService {
    @Autowired
    UsedDishDAO usedDishDAO;
    @Override
    public List<UsedDish> getUsedDishByTable(String id) {
        List<UsedDishEntity> usedDishEntities = usedDishDAO.getUsedDishByTable(id);
        List<UsedDish> usedDishes = new ArrayList<>();
        for(UsedDishEntity usedDishEntity:usedDishEntities){
            UsedDish usedDish = usedDishEntity.toUsedDish();
            usedDishes.add(usedDish);
        }
        return usedDishes;

    }
}
