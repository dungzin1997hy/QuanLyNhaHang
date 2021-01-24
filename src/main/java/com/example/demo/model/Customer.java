package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Access;
import java.util.List;

@Data
@AllArgsConstructor

public class Customer extends Person{
    public Customer(int id, String name, String email, String phoneNumber) {
        super(id, name, email, phoneNumber);
    }
}
