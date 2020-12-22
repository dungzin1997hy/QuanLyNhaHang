package com.example.demo.entity;

import com.example.demo.model.Bill;
import com.example.demo.model.UsedDish;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @ManyToOne
    @JoinColumn(name = "staffid")
    private StaffEntity staffEntity;

    @ManyToOne
    @JoinColumn(name = "tableid")
    private TableEntity tableEntity;

    @ManyToOne
    @JoinColumn(name = "customerid")
    private CustomerEntity customerEntity;

    @Column(name = "total")
    private int total;

    @Column(name = "paymenttype")
    private String paymentType;

    @Column (name = "time")
    private LocalDateTime time;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "billEntity")
    private List<UsedDishEntity> usedDishEntities;

    public BillEntity(StaffEntity staffEntity, CustomerEntity customerEntity, int total, String paymentType, LocalDateTime time) {
        this.staffEntity = staffEntity;
        this.customerEntity = customerEntity;
        this.total = total;
        this.paymentType = paymentType;
        this.time = time;
    }

    public Bill toBill(){
        Bill bill = new Bill();
        bill.setId(this.id);
        bill.setNameTable(this.tableEntity.getName());
        bill.setPaymentType(this.paymentType);
        bill.setTotal(this.total);
        bill.setTime(this.time);
        bill.setNameStaff(this.staffEntity.getName());
        bill.setNameCustomer(this.customerEntity.getName());
        return bill;
    }
}
