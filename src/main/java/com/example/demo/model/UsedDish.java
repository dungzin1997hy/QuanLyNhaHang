package com.example.demo.model;

import com.example.demo.entity.DishEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsedDish {
    private int id;
    private int amount;
    private Table table;
    private Dish dish;
    private String status;
    private LocalDateTime time;
}
