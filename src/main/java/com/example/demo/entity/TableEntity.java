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

    public com.example.demo.model.Table toTable(){
        com.example.demo.model.Table table  = new com.example.demo.model.Table();
        table.setId(this.id);
        table.setArea(this.getArea());
        table.setType(this.getType());
        table.setStatus(this.getStatus());
        table.setName(this.name);
        return table;

    }

    public TableEntity(int id, String name, String type, String status, String area) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.area = area;
    }
}
