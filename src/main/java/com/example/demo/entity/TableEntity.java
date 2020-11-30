package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ban")
public class TableEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "type")
    private String type;

    @Column (name = "status")

    private String status;

    @Column (name="area")
    private String area;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "tableEntity")
    private List<UsedDishEntity> usedDishEntities;


    public TableEntity(String name, String type,String status, String area) {
        this.name = name;
        this.type = type;
        this.status = "free";
        this.area = area;
    }



    public TableEntity(int id, String name, String type, String status, String area) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.area = area;
    }
}
