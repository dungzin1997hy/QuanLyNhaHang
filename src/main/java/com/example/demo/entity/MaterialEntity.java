package com.example.demo.entity;

import com.example.demo.model.Material;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "nguyenlieu")
public class MaterialEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "price")
    private Float price;

    @Column (name = "unit")
    private String unit;

    @Column(name ="amount")
    private int amount = 0;

    @Column (name = "description")
    private String description;

    @OneToMany(mappedBy = "materialEntity")
    private List<InputMaterialEntity> inputMaterialEntities;

    @PreRemove
    public void PreRemove(){
        for (InputMaterialEntity inputMaterialEntity : inputMaterialEntities) {
            inputMaterialEntity.setMaterialEntity(null);
        }
    }

    public Material toMaterial(){
        Material material = new Material();
        material.setId(this.id);
        material.setName(this.name);
        material.setPrice(this.price);
        material.setUnit(this.unit);
        material.setAmount(this.amount);
        material.setDescription(this.description);
        return material;
    }

    public MaterialEntity(int id, String name, Float price, String unit, int amount, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.amount = amount;
        this.description = description;
    }

    public MaterialEntity(String name, Float price, String unit, int amount, String description) {
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.amount = amount;
        this.description = description;
    }
}
