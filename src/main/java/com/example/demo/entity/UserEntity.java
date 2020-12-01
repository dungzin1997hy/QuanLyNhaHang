package com.example.demo.entity;


import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "thanhvien")
public class UserEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @OneToOne(mappedBy = "userEntity")
    private StaffEntity staffEntity;

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User toUser(){
        User user = new User();
        user.setUsername(this.username);
        return user;
    }


}
