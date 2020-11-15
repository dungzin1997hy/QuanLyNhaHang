package com.example.demo.dao;

import com.example.demo.entity.Dish;

import java.util.List;

public interface DishDAO {
    Dish getAllDish(String dishName);

    List<String> getAllDishID();
    void print();
}
