package com.example.demo.entity;


import com.example.demo.model.Role;
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
@Table(name = "chucvu")
public class RoleEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column (name = "role")
    private String role;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "roleEntity")
    private List<StaffEntity> staffEntities;

    public RoleEntity(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public Role toRole(){
        Role role = new Role();
        role.setId(this.id);
        role.setRole(this.role);
        return role;
    }
}
