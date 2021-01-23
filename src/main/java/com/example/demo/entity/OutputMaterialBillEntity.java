package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "phieuxuatkho")
public class OutputMaterialBillEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="time")
    private LocalDateTime time;

    @Column(name="total")
    private int Total;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "staffid")
    private StaffEntity staffEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "outputMaterialBillEntity")
    private List<OutputMaterialEntity> outputMaterialEntities ;
}
