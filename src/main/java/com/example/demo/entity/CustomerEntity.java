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

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "billEntity")
    private List<UsedDishEntity> usedDishEntities;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "customerEntity")
    private List<BookingEntity> bookingEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "customerEntity")
    private List<TableEntity> tableEntities;

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

