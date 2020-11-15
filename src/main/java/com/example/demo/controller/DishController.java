package com.example.demo.controller;

import com.example.demo.dao.DishDAO;
import com.example.demo.entity.Dish;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DishController {
    @Autowired
    public DishDAO dishDAO;

    @PostMapping("/tim-kiem-mon-an")
    @ResponseBody
    public ResponseEntity<String >searchDishByName(@RequestParam("dishName")String dishName){
        Dish dish = dishDAO.getAllDish(dishName);
        try {
            return new ResponseEntity<>((new ObjectMapper()).writeValueAsString(dish), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Lấy thông tin thành công", HttpStatus.OK);
    }
}
