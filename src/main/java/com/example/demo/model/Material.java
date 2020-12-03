package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Material {
    private int id;

    private String name;

    private Float price;

    private String unit;

    private int amount;

    private String description;

}
