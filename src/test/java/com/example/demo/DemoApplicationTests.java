package com.example.demo;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.model.Dish;
import com.example.demo.service.DishService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


class DemoApplicationTests {

    @Autowired
    DishService dishService;
    @Autowired
    DishDAO dishDAO;
    @Test
    void contextLoads() {
        String a ="error: device '127.0.0.1:62025' not found";
        String[] arr = a.split("'");
        System.out.println(Arrays.toString(arr));
    }

}
