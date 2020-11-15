package com.example.demo.service;

import com.example.demo.dao.DishDAO;
import com.example.demo.dao.impl.DishDAOImpl;
import com.example.demo.entity.Dish;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class test {

    @Autowired
    public static DishDAOImpl dishDAO;

    public static void main(String[] args) {
        DishDAO dishDAO = new DishDAOImpl();
        Dish dish = dishDAO.getAllDish("2");

        System.out.println(dish.toString());
    }
}
