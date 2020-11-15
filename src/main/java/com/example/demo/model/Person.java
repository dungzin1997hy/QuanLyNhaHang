package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Person {
    private int id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
    private String sex;
    private String birthDay;

    public Person(String name, String address, String phoneNumber, String email, String sex, String birthDay) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.sex = sex;
        this.birthDay = birthDay;
    }
}
