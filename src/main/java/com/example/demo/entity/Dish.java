package com.example.demo.entity;

import lombok.*;


import javax.persistence.*;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "monan")
public class Dish {

    @Id
    @Column (name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "price")
    private Float price;

    @Column (name = "type")
    private String type;
    @Column (name = "unit")
    private String unit;
    @Column (name = "description")
    private String description;

    public Dish(String name, Float price, String type, String unit, String description) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.unit = unit;
        this.description = description;
    }
}
