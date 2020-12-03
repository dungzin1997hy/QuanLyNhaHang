package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.MaterialDAO;
import com.example.demo.entity.MaterialEntity;
import com.example.demo.model.Dish;
import com.example.demo.model.Material;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MaterialController {
    @Autowired
    MaterialDAO materialDAO;
    @Autowired
    MaterialService materialService;
    @PostMapping("/getAllMaterial")
    @ResponseBody
    public ApiResponse<List<Material>> getAllMaterial() {
        List<Material> list = materialService.getAllMaterial();
        return new ApiResponse<>(true, list, "");
    }
    @PostMapping("/deleteMaterial")
    @ResponseBody
    public ApiResponse<String> deleteMaterial(@RequestParam("idMaterial") int id){
        materialDAO.deleteMaterial(id);
        return new ApiResponse<>(true,"Xoá món ăn thành công","");
    }

    @PostMapping("/addMaterial")
    public ApiResponse<String> addMaterial(@RequestParam("nameMaterial") String nameMaterial,
                                           @RequestParam("price") Float price,
                                           @RequestParam("devices") String description,
                                           @RequestParam("unit") String unit){
        if(materialDAO.checkExistMaterial(nameMaterial) == true){
            return new ApiResponse<>(false,"","Tên nguyên liệu đã tồn tại");
        }
        MaterialEntity materialEntity = new MaterialEntity(nameMaterial,price,unit,0,description);
        materialDAO.addMaterial(materialEntity);
        return new ApiResponse<>(true,"Thêm nguyên liệu thành công","");
    }

    @PostMapping("/updateMaterial")
    public ApiResponse<String> updateMaterial(@RequestParam("name") String name,
                                              @RequestParam("idMaterial") int id,
                                              @RequestParam("price") Float price,
                                              @RequestParam("devices") String description,
                                              @RequestParam("amount") int amount,
                                              @RequestParam("unit") String unit){
        MaterialEntity materialEntity = new MaterialEntity(id,name,price,unit,amount,description);
        try{
            materialDAO.updateMaterial(materialEntity);
            return new ApiResponse<>(true,"Cập nhật nguyên liệu thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không cập nhật được nguyên liệu");
        }
    }

    @PostMapping("/searchMaterialByName")
    public ApiResponse<List<Material>> searchMaterialByName(@RequestParam("name")String name){
        try{
            List<Material> materials = materialService.searchMaterialByName(name);
            if(materials.size()>0){
                return new ApiResponse<>(true,materials,"");
            }
            else return new ApiResponse<>(false,null,"Không tìm được nguyên liệu này");

        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"Không tìm được nguyên liệu");
        }
    }
}
