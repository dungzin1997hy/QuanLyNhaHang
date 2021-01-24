package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff  extends User{
    public Staff(int id, String name, String email, String phoneNumber, String address, String cmnd, String username, String password, String role, String urlImage, Role role1, String cmnd1) {
        super(id, name, email, phoneNumber, address, cmnd, username, password, role);
        this.urlImage = urlImage;
        this.role1 = role1;
        this.cmnd = cmnd1;
    }

    private String urlImage;
    private Role role1;
    private String cmnd;
}
