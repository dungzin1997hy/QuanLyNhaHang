package com.example.demo.dao;

import com.example.demo.entity.MaterialEntity;

import java.util.List;

public interface MaterialDAO {
    MaterialEntity getMaterialById(int id);
    List<MaterialEntity> getAllMaterial();
    List<MaterialEntity> searchMaterialByName(String name);

    void addMaterial(MaterialEntity materialEntity);
    void deleteMaterial(int id);
    void updateMaterial(MaterialEntity materialEntity);
    Boolean checkExistMaterial(String name);



}
