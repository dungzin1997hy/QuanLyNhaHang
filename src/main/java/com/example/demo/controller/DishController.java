package com.example.demo.controller;


import com.example.demo.config.ApiResponse;
import com.example.demo.dao.DishDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.model.Dish;
import com.example.demo.service.DishService;
import com.example.demo.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DishController {

    @Autowired
    private FileDir fileDir;
    @Autowired
    public DishDAO dishDAO;

    @Autowired
    public DishService dishService;

    @PostMapping("/getAllDish")
    @ResponseBody
    public ApiResponse<List<Dish>> getAllDish() {
        List<Dish> list = dishService.getAllDish();
        return new ApiResponse<>(true, list, "");
    }

    @PostMapping("/searchDishByName")
    public ApiResponse<Dish> searchDishByName(@RequestParam("nameDish") String nameDish) {
        Dish dish = dishService.searchDishByName(nameDish);
        if (dish != null) {
            return new ApiResponse<>(true, dish, "");
        } else return new ApiResponse<>(false, new Dish(), "Món ăn không tồn tại");
    }
    @PostMapping("/searchListDishByName")
    public ApiResponse<List<Dish>> searchListDishByName(@RequestParam("nameDish") String nameDish) {
        List<Dish> dishes = dishService.searchListDishByName(nameDish);
        if (dishes.size() >0 ) {
            return new ApiResponse<>(true, dishes, "");
        } else return new ApiResponse<>(false, null, "Món ăn không tồn tại");
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
                                       @RequestParam("devices_add") String des,
                                       @RequestParam("fileImage")MultipartFile file) {
        if (dishDAO.checkExistDish(nameDish) == true) return new ApiResponse<>(false, "", "Tên món ăn đã tồn tại");
        try {
            File uploadDir = new File(fileDir.getFileDir());
            uploadDir.mkdirs();

            if (file.isEmpty()) {

            }
            String uploadFilePath = fileDir.getFileDir() + "/" + file.getOriginalFilename();

            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadFilePath);
            Files.write(path, bytes);

            DishEntity dishEntity = new DishEntity(nameDish, price, type, unit, "");
            dishEntity.setUrl(file.getOriginalFilename());
            dishDAO.addDish(dishEntity);
            return new ApiResponse<>(true, "Thêm món ăn thành công", "");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Lỗi");
        }
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
