package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff {
    private int id;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private Role role;
    private User user;
    private String cmnd;
}
