package com.example.demo.entity;

import com.example.demo.model.InputMaterial;
import com.example.demo.model.InputMaterialBill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "phieunhapkho")
public class InputMaterialBillEntity {
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

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "inputMaterialBillEntity")
    private List<InputMaterialEntity> inputMaterialEntities;


    public InputMaterialBill toInputBill(){
        InputMaterialBill input = new InputMaterialBill();
        input.setId(this.id);
        input.setTime(this.time);
        input.setTotal(this.Total);
        return input;
    }
}
