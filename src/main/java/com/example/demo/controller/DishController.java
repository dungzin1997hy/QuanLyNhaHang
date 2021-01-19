package com.example.demo.controller;


import com.example.demo.config.ApiResponse;
import com.example.demo.dao.DishDAO;
import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.DishEntity;
import com.example.demo.model.Dish;
import com.example.demo.service.DishService;
import com.example.demo.util.FileDir;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DishController {

    @Autowired
    private FileDir fileDir;
    @Autowired
    public DishDAO dishDAO;
    @Autowired
    UsedDishDAO usedDishDAO;

    @Autowired
    public DishService dishService;

    @PostMapping("/api/getAllDish")
    @ResponseBody
    public ApiResponse<List<Dish>> getpa() {
        List<Dish> list = dishService.getAllDish();

        return new ApiResponse<>(true, list, "");
    }


    @PostMapping("/getAllDish")
    @ResponseBody
    public ApiResponse<List<Dish>> getAllDish() {
        List<Dish> list = dishService.getAllDish();
        return new ApiResponse<>(true, list, "");
    }


    @PostMapping("/searchDishByName")
    public ApiResponse<Dish> searchDishByName(@RequestParam("nameDish") String name) {

        Dish dish = dishService.searchDishByName(name);
        if (dish != null) {
            return new ApiResponse<>(true, dish, "");
        } else return new ApiResponse<>(false, new Dish(), "Món ăn không tồn tại");
    }

    @PostMapping("/searchListDishByName")
    public ApiResponse<List<Dish>> searchListDishByName(@RequestParam("nameDish") String nameDish) {
        List<Dish> dishes = dishService.searchListDishByName(nameDish);
        if (dishes.size() > 0) {
            return new ApiResponse<>(true, dishes, "");
        } else return new ApiResponse<>(false, null, "Món ăn không tồn tại");
    }

    @PostMapping("/searchDishByType")
    @ResponseBody
    public ApiResponse<List<Dish>> searchDishByType(@RequestParam("typeDish") String typeDish) {
        List<Dish> dishEntities = new ArrayList<>();
        dishEntities = dishService.searchDishByType(typeDish);
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
    public ApiResponse<String> addDish(@ModelAttribute UploadForm form) {
       // System.out.println(form.getNameDish_add() + " " + form.getType_add());
        if (dishDAO.checkExistDish(form.getNameDish_add()) == true)
            return new ApiResponse<>(false, "", "Tên món ăn đã tồn tại");
        try {
            File uploadDir = new File(fileDir.getFileDir());
            uploadDir.mkdirs();

            if (form.getFileImage_add().isEmpty()) {
                return new ApiResponse<>(false, "", "Không thấy ảnh");
            }
            String uploadFilePath = fileDir.getFileDir() + "/" + form.getFileImage_add().getOriginalFilename();
           // System.out.println(uploadFilePath);
            byte[] bytes = form.getFileImage_add().getBytes();
            Path path = Paths.get(uploadFilePath);
            Files.write(path, bytes);

            DishEntity dishEntity = new DishEntity(form.getNameDish_add(), form.getPrice_add(), form.getType_add(), form.getUnit_add(), form.getDevices_add());
            dishEntity.setUrl(form.getFileImage_add().getOriginalFilename());
         //   System.out.println(dishEntity.getUrl());
            dishDAO.addDish(dishEntity);
            return new ApiResponse<>(true, "Thêm món ăn thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Lỗi");
        }
    }

    @PostMapping("/deleteDish")
    @ResponseBody
    public ApiResponse<String> deleteDish(@RequestParam("idDish") String idDish) {
        int iddish = Integer.parseInt(idDish);
        dishDAO.deleteDish(iddish);
        return new ApiResponse<>(true, "Xoá món ăn thành công", "");
    }

    @PostMapping("/updateDish")
    public ApiResponse<String> updateDish(@ModelAttribute UpdateForm form) {
        try {
           // System.out.println(form.toString());
            DishEntity dishEntity = dishDAO.searchDishById(form.getIdDish_edit());

            if (form.getFileImage_edit().isEmpty()) {
                dishEntity.setUrl(dishEntity.getUrl());
            } else {
                dishEntity.setUrl(form.getFileImage_edit().getOriginalFilename());
                File uploadDir = new File(fileDir.getFileDir());
                uploadDir.mkdirs();

                String uploadFilePath = fileDir.getFileDir() + "/" + form.getFileImage_edit().getOriginalFilename();
              //  System.out.println(uploadFilePath);
                byte[] bytes = form.getFileImage_edit().getBytes();
                Path path = Paths.get(uploadFilePath);
                Files.write(path, bytes);
            }


         //   System.out.println(dishEntity.getUrl());
            dishEntity.setName(form.getNameDish_edit());
            dishEntity.setDescription(form.getDevices_edit());
            dishEntity.setPrice(form.getPrice_edit());
            dishEntity.setType(form.getType_edit());
            dishEntity.setUnit(form.getUnit_edit());


            dishDAO.update(dishEntity);
            return new ApiResponse<>(true, "Cập nhật món ăn thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Error");
        }

    }
    @PostMapping("/getDishCount")
    public ApiResponse<List<String>> getDishCount(@RequestParam("startDate")String startDate,
                                                  @RequestParam("stopDate")String stopDate,
                                                  @RequestParam("idDish")int idDish){
        try{
            startDate = startDate + " 00:00";
            stopDate = stopDate + " 23:59";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime start = LocalDateTime.parse(startDate, formatter);
            LocalDateTime stop = LocalDateTime.parse(stopDate, formatter);
            List<String> list = usedDishDAO.getDishCount(start,stop,idDish);
            return new ApiResponse<>(true,list,"");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"");
        }
    }

    @PostMapping("/chartDishByType")
    public ApiResponse<List<String>> getDishCountByType(@RequestParam("startDate")String startDate,
                                                  @RequestParam("stopDate")String stopDate,
                                                  @RequestParam("type")String type){
        try{
            startDate = startDate + " 00:00";
            stopDate = stopDate + " 23:59";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime start = LocalDateTime.parse(startDate, formatter);
            LocalDateTime stop = LocalDateTime.parse(stopDate, formatter);
            List<String> list = dishDAO.chartByDishType(type,start,stop);
            return new ApiResponse<>(true,list,"");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"");
        }
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UploadForm {
    private MultipartFile fileImage_add;
    private String nameDish_add;
    private float price_add;
    private String type_add;
    private String unit_add;
    private String devices_add;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class UpdateForm {
    private MultipartFile fileImage_edit;
    private int idDish_edit;
    private String nameDish_edit;
    private float price_edit;
    private String type_edit;
    private String unit_edit;
    private String devices_edit;
}