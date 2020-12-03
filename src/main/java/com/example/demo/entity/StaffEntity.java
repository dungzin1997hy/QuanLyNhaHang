package com.example.demo.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "nhanvien")
public class StaffEntity {
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

    @Column (name="cmnd")
    private String cmnd;

    @Column (name="address")
    private String address;

    @ManyToOne
    @JoinColumn(name="roleId")
    private RoleEntity roleEntity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserEntity userEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "staffEntity")
    private List<BillEntity> billEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "staffEntity")
    private List<InputMaterialEntity> inputMaterialEntities;

    public StaffEntity(int id, String name, String phoneNumber, String email, String cmnd) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cmnd = cmnd;
    }

    public StaffEntity(int id, String name, String phoneNumber, String email, String cmnd, String address, RoleEntity roleEntity) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cmnd = cmnd;
        this.address = address;
        this.roleEntity = roleEntity;

    }

    public StaffEntity(String name, String phoneNumber, String email, String cmnd, String address) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cmnd = cmnd;
        this.address = address;

    }
}
