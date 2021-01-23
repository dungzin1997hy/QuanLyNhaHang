package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "xuatkho")
public class OutputMaterialEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "outputBillId")
    private OutputMaterialBillEntity outputMaterialBillEntity;

    @ManyToOne
    @JoinColumn(name = "materialId", referencedColumnName = "id")
    private MaterialEntity materialEntity;

    @Column(name ="amount")
    private int amount;
}
