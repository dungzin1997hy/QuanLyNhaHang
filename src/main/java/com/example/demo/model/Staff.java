package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff  extends Person{
    private String urlImage;
    private String address;
    private Role role;
    private User user;
    private String cmnd;
}
