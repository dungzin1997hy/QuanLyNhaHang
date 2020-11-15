package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@javax.persistence.Table(name = "ban")
public class Table {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="type")
    private String type;
    @Column(name="isUsing")
    private Boolean isUsing;
    @Column(name="maxNum")
    private int maxNum;

    public Table(String name, String type, Boolean isUsing, int maxNum) {
        this.name = name;
        this.type = type;
        this.isUsing = isUsing;
        this.maxNum = maxNum;
    }
}
