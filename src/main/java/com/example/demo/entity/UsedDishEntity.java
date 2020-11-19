package com.example.demo.entity;

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
@Table(name = "useddish")
public class UsedDishEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "dishid")
    private DishEntity dishEntity;

    @ManyToOne
    @JoinColumn(name = "billid")
    private BillEntity billEntity;

    @Column(name ="amount")
    private int amount;

}
