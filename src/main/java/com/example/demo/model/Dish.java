package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dish {
    private int id;
    private String name;
    private float price;
    private String type;
    private String unit;
    private String description;

    public Dish(String name, float price, String type, String unit, String description) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.unit = unit;
        this.description = description;
    }
}
