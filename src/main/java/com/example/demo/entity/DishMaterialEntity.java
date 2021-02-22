package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monan_nguyenlieu")
public class DishMaterialEntity {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private DishMaterialEntity dishMaterialEntity;

    @ManyToOne
    private MaterialEntity materialEntity;

    @Column(name = "amount")
    private int amount;
}
