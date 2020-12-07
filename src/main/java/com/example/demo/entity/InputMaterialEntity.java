package com.example.demo.entity;


import com.example.demo.model.Material;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "nhapkho")
public class InputMaterialEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "inputBillId")
    private InputMaterialBillEntity inputMaterialBillEntity;

    @ManyToOne
    @JoinColumn(name = "materialId", referencedColumnName = "id")
    private MaterialEntity materialEntity;

    @Column(name ="amount")
    private int amount;
}
