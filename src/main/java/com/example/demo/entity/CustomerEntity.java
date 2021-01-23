package com.example.demo.entity;

import com.example.demo.model.Customer;
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
@Table(name = "khachhang")
public class CustomerEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "phoneNumber")
    private String phoneNumber;

    @Column (name = "email")
    private String email;

    @OneToMany( mappedBy = "customerEntity")
    private List<BillEntity> billEntities;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "customerEntity")
    private List<BookingEntity> bookingEntities;


    @OneToMany(mappedBy = "customerEntity")
    private List<TableEntity> tableEntities;

    @PreRemove
    public void PreRemove(){
        for (BillEntity billEntity : billEntities) {
            billEntity.setCustomerEntity(null);
        }
        for (BookingEntity bookingEntity : bookingEntities) {
            bookingEntity.setCustomerEntity(null);
        }
        for (TableEntity tableEntity : tableEntities) {
            tableEntity.setCustomerEntity(null);
        }
    }

    public CustomerEntity(String name, String phoneNumber, String email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public CustomerEntity(int id, String name, String phoneNumber, String email) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public Customer toCustomer(){
        Customer customer = new Customer();
        customer.setId(this.id);
        customer.setEmail(this.email);
        customer.setName(this.name);
        customer.setPhoneNumber(this.phoneNumber);
        return customer;
    }

}

