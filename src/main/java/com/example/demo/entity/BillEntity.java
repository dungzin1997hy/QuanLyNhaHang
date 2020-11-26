package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "bill")
public class BillEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @ManyToOne
//    @JoinColumn(name = "tableid")
//    private TableEntity tableEntity;
//
//    @ManyToOne
//    @JoinColumn(name = "staffid")
//    private StaffEntity staffEntity;
//
//    @ManyToOne
//    @JoinColumn(name = "customerid")
//    private CustomerEntity customerEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "billEntity")
    private List<UsedDishEntity> usedDishEntities;

    @Column(name = "total")
    private int total;

    @Column(name = "paymenttype")
    private String paymentType;

    @Column (name = "time")
    private String time;



}
