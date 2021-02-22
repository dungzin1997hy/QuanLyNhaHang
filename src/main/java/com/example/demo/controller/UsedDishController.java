package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.UsedDishEntity;
import com.example.demo.model.BillCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class UsedDishController {
    @Autowired
    UsedDishDAO usedDishDAO;

    @PostMapping("/getUsedDishCount")
    public ApiResponse<List<String>> getUsedDishCount(@RequestParam("startDate") String startDate,
                                                      @RequestParam("stopDate") String stopDate) {
        try {
            startDate = startDate + " 00:00";
            stopDate = stopDate + " 23:59";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime start = LocalDateTime.parse(startDate, formatter);
            LocalDateTime stop = LocalDateTime.parse(stopDate, formatter);
            List<String> count = usedDishDAO.getUsedDishCount(start, stop);
            return new ApiResponse<>(true, count, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, null, "");
        }
    }

    @PostMapping("/deleteUsedDish")
    public ApiResponse<String> deleteUsedDish(@RequestParam("idUsedDish") int id){
        try{
            UsedDishEntity usedDishEntity = usedDishDAO.getUsedDishByID(id);
            usedDishDAO.deleteUsedDish(usedDishEntity);
            return new ApiResponse<>(true,"Xoá gọi món thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Loi");
        }
    }
}
