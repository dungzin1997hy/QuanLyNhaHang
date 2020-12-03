package com.example.demo.service.impl;

import com.example.demo.dao.MaterialDAO;
import com.example.demo.entity.MaterialEntity;
import com.example.demo.model.Material;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;


@Repository
@Transactional
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    MaterialDAO materialDAO;

    @Override
    public List<Material> getAllMaterial() {
        List<MaterialEntity> materialEntities = materialDAO.getAllMaterial();
        List<Material> materials = new ArrayList<>();
        for(MaterialEntity materialEntity : materialEntities){
            materials.add(materialEntity.toMaterial());
        }
        return materials;
    }

    @Override
    public List<Material> searchMaterialByName(String name) {
        List<MaterialEntity> materialEntities = materialDAO.searchMaterialByName(name);
        List<Material> materials = new ArrayList<>();
        for(MaterialEntity materialEntity : materialEntities){
            materials.add(materialEntity.toMaterial());
        }
        return materials;
    }
}
