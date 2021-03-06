package com.example.demo.service;

import com.example.demo.model.Dish;

import java.util.List;

public interface DishService {
    List<Dish> getAllDish();
    List<Dish> searchListDishByName(String name);
    List<Dish> searchDishByType(String type);
    Dish searchDishByName(String name);
}
