package com.example.demo.service;

import com.example.demo.model.Material;

import java.util.List;

public interface MaterialService {
    List<Material> getAllMaterial();
    List<Material> searchMaterialByName(String name);
}
