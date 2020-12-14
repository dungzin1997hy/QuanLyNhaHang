package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Access;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    private int id;
    private String name;
    private String phoneNumber;
    private String email;
}
