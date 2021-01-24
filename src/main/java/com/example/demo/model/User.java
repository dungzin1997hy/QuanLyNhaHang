package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends Person {
    private String username;
    private String password;
    private String role;

    public User(int id, String name, String email, String phoneNumber, String address, String cmnd, String username, String password, String role) {
        super(id, name, email, phoneNumber, address, cmnd);
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
