package com.example.demo.service.impl;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.model.Dish;
import com.example.demo.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class DishServiceImpl implements DishService {
    @Autowired
    DishDAO dishDAO;

    @Override
    public List<Dish> getAllDish() {
        List<DishEntity> dishEntities = dishDAO.getAllDish();
        List<Dish> dishes = new ArrayList<>();
        for(DishEntity dishEntity: dishEntities){
            Dish dish = new Dish();
            dish.setId(dishEntity.getId());
            dish.setName(dishEntity.getName());
            dish.setPrice(dishEntity.getPrice());
            dish.setType(dishEntity.getType());
            dish.setUnit(dishEntity.getUnit());
            dish.setDescription(dishEntity.getDescription());
            dishes.add(dish);
        }
        return dishes;
    }

    @Override
    public List<Dish> searchListDishByName(String name) {
        List<DishEntity> dishEntities = dishDAO.getListDishByName(name);
        List<Dish> dishes = new ArrayList<>();
        for(DishEntity dishEntity: dishEntities){
            Dish dish = new Dish();
            dish.setId(dishEntity.getId());
            dish.setName(dishEntity.getName());
            dish.setPrice(dishEntity.getPrice());
            dish.setType(dishEntity.getType());
            dish.setUnit(dishEntity.getUnit());
            dish.setDescription(dishEntity.getDescription());
            System.out.println(dish.toString());
            dishes.add(dish);
        }
        return dishes;
    }

    @Override
    public Dish searchDishByName(String name) {
        DishEntity dishEntity = dishDAO.searchDishByName(name);
        Dish dish = new Dish();
        dish.setId(dishEntity.getId());
        dish.setName(dishEntity.getName());
        dish.setPrice(dishEntity.getPrice());
        dish.setType(dishEntity.getType());
        dish.setUnit(dishEntity.getUnit());
        dish.setDescription(dishEntity.getDescription());
        System.out.println(dish.toString());
        return  dish;
    }


}
