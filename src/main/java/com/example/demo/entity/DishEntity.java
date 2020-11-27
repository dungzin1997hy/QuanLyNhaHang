package com.example.demo.entity;

import lombok.*;


import javax.persistence.*;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monan")
public class DishEntity {

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

   // @Transient
    @OneToOne(mappedBy = "dishEntity")
    private UsedDishEntity usedDishEntity;

    public DishEntity(String name, Float price, String type, String unit, String description) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.unit = unit;
        this.description = description;
    }

    public DishEntity(int id, String name, Float price, String type, String unit, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.unit = unit;
        this.description = description;
    }

    public DishEntity(int id) {
        this.id = id;
    }
}
