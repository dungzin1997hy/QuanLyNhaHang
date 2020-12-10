package com.example.demo.entity;

import com.example.demo.model.Dish;
import lombok.*;


import javax.persistence.*;
import javax.persistence.Table;
import java.util.List;

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
   @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "dishEntity")
   private List<UsedDishEntity> usedDishEntities;

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

    public Dish toDish(){
        Dish dish = new Dish();
        dish.setId(this.getId());
        dish.setName(this.getName());
        dish.setType(this.getType());
        dish.setPrice(this.getPrice());
        dish.setDescription(this.getDescription());
        dish.setUnit(this.getUnit());
        return dish;
    }

    public DishEntity(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        if(this == null){
            return "null";
        }
        return "DishEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", type='" + type + '\'' +
                ", unit='" + unit + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
