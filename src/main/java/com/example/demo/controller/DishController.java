package com.example.demo.controller;


import com.example.demo.config.ApiResponse;
import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DishController {

    @Autowired
    public DishDAO dishDAO;


    @PostMapping("/getAllDish")
    @ResponseBody
    public ApiResponse<List<DishEntity>> getAllDish() {
        List<DishEntity> list = dishDAO.getAllDish();
        return new ApiResponse<>(true, list, "");
    }

    @PostMapping("/searchDishByName")
    @ResponseBody
    public ApiResponse<DishEntity> searchDishByName(@RequestParam("nameDish") String nameDish) {
        DishEntity dishEntity = dishDAO.searchDishByName(nameDish);
        if (dishEntity != null) {
            return new ApiResponse<>(true, dishEntity, "");
        } else return new ApiResponse<>(false, new DishEntity(), "Món ăn không tồn tại");
    }

    @PostMapping("/searchDishByType")
    @ResponseBody
    public ApiResponse<List<DishEntity>> searchDishByType(@RequestParam("typeDish") String typeDish) {
        List<DishEntity> dishEntities = new ArrayList<>();
        dishEntities = dishDAO.getAllDishByType(typeDish);
        if (dishEntities != null) {
            return new ApiResponse<>(true, dishEntities, "");
        } else return new ApiResponse<>(false, dishEntities, "Loại món ăn không tồn tại ");
    }

    @PostMapping("/getAllTypeDish")
    @ResponseBody
    public ApiResponse<List<String>> getAllTypeDish() {
        List<String> types = dishDAO.getAllTypeDish();
        return new ApiResponse<>(true, types, "");
    }

    @PostMapping("/addDish")
    @ResponseBody
    public ApiResponse<String> addDish(@RequestParam("nameDish_add") String nameDish,
                                       @RequestParam("price_add") float price,
                                       @RequestParam("type_add") String type,
                                       @RequestParam("unit_add") String unit,
                                       @RequestParam("devices_add") String des) {
        if (dishDAO.checkExistDish(nameDish) == true) return new ApiResponse<>(false, "", "Tên món ăn đã tồn tại");
        DishEntity dishEntity = new DishEntity(nameDish,price,type,unit,"");
        dishDAO.addDish(dishEntity);
        return new ApiResponse<>(true,"Thêm món ăn thành công","");
    }

    @PostMapping("/deleteDish")
    @ResponseBody
    public ApiResponse<String> deleteDish(@RequestParam("idDish") String idDish){
        int iddish = Integer.parseInt(idDish);
        dishDAO.deleteDish(iddish);
        return new ApiResponse<>(true,"Xoá món ăn thành công","");
    }

    @PostMapping("/updateDish")
    public ApiResponse<String> updateDish(@RequestParam("idDish_edit") int idDish,
                                          @RequestParam("nameDish_edit") String nameDish,
                                          @RequestParam("price_edit") float price,
                                          @RequestParam("type_edit") String type,
                                          @RequestParam("unit_edit") String unit,
                                          @RequestParam("devices_edit")String description){
        DishEntity dishEntity = new DishEntity(idDish,nameDish,price,type,unit,description);
        dishDAO.update(dishEntity);
        return new ApiResponse<>(true,"Cập nhật món ăn thành công", "");
    }
}
