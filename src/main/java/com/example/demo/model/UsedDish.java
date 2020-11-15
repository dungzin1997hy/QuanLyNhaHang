package com.example.demo.model;


import com.example.demo.entity.Dish;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsedDish {
    private int id;
    private int count;
    private Dish dish;
    private String description;
}
