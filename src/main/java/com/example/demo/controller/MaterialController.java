package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.*;
import com.example.demo.entity.*;
import com.example.demo.model.Dish;
import com.example.demo.model.Material;
import com.example.demo.service.MaterialService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MaterialController {


    @Autowired
    MaterialDAO materialDAO;
    @Autowired
    MaterialService materialService;
    @Autowired
    InputMaterialBillDAO inputMaterialBillDAO;
    @Autowired
    OutputMaterialBillDAO outputMaterialBillDAO;
    @Autowired
    OutputMaterialDAO outputMaterialDAO;
    @Autowired
    StaffDAO staffDAO;

    @Autowired
    InputMaterialDAO inputMaterialDAO;

    @Autowired
    StockDAO stockDAO;



    @PostMapping("/api/getAllMaterial")
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
        StockEntity stockEntity = stockDAO.getStock(1);
        if(materialDAO.checkExistMaterial(nameMaterial) == true){
            return new ApiResponse<>(false,"","Tên nguyên liệu đã tồn tại");
        }
        MaterialEntity materialEntity = new MaterialEntity(nameMaterial,price,unit,0,description,stockEntity);
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
        StockEntity stockEntity = stockDAO.getStock(1);
        MaterialEntity materialEntity = new MaterialEntity(id,name,price,unit,amount,description,stockEntity);
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

    @PostMapping("/inputMaterial")
    public ApiResponse<String> inputMaterial(@RequestBody MaterList materList){

        try {
            InputMaterialBillEntity inputMaterialBillEntity = new InputMaterialBillEntity();

            LocalDateTime now = LocalDateTime.now();
            inputMaterialBillEntity.setTime(now);
            inputMaterialBillEntity.setTotal(materList.total);
            inputMaterialBillEntity.setType("input");
            StaffEntity staffEntity = staffDAO.getStaffById(materList.idStaff+"");
            if(staffEntity!= null){
                inputMaterialBillEntity.setStaffEntity(staffEntity);
            }
            InputMaterialBillEntity inputMaterialBillEntity1 = inputMaterialBillDAO.addInputBill(inputMaterialBillEntity);


            for (Mater mater : materList.maters) {
                if(mater.id == 0){
                    continue;
                }
                InputMaterialEntity inputMaterialEntity = new InputMaterialEntity();
                MaterialEntity materialEntity = materialDAO.getMaterialById(mater.getId());
                int amount = materialEntity.getAmount();
                materialEntity.setAmount(amount+mater.amount);
                materialDAO.updateMaterial(materialEntity );

                inputMaterialEntity.setMaterialEntity(materialEntity);
                inputMaterialEntity.setInputMaterialBillEntity(inputMaterialBillEntity1);
                inputMaterialEntity.setAmount(mater.amount);
                inputMaterialDAO.addInputMaterial(inputMaterialEntity);

            }

            return new ApiResponse<>(true, "Lưu hoá đơn thành công", "");
        }catch(Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không lưu được hoá đơn");
        }
    }

    @PostMapping("/outputMaterial")
    public ApiResponse<String> outputMaterial(@RequestBody MaterList materList){

        try {
            OutputMaterialBillEntity inputMaterialBillEntity = new OutputMaterialBillEntity();

            LocalDateTime now = LocalDateTime.now();
            inputMaterialBillEntity.setTime(now);
            inputMaterialBillEntity.setTotal(materList.total);
            inputMaterialBillEntity.setType("output");
            StaffEntity staffEntity = staffDAO.getStaffById(materList.idStaff+"");
            System.out.println(materList.idStaff);
            if(staffEntity!= null){
                inputMaterialBillEntity.setStaffEntity(staffEntity);
            }
            OutputMaterialBillEntity inputMaterialBillEntity1 = outputMaterialBillDAO.addInputBill(inputMaterialBillEntity);


            for (Mater mater : materList.maters) {
                if(mater.id == 0){
                    continue;
                }
                OutputMaterialEntity inputMaterialEntity = new OutputMaterialEntity();
                MaterialEntity materialEntity = materialDAO.getMaterialById(mater.getId());
                int amount = materialEntity.getAmount();
                materialEntity.setAmount(amount+mater.amount);
                materialDAO.updateMaterial(materialEntity );

                inputMaterialEntity.setMaterialEntity(materialEntity);
                inputMaterialEntity.setOutputMaterialBillEntity(inputMaterialBillEntity1);
                inputMaterialEntity.setAmount(mater.amount);
                outputMaterialDAO.addOutputMaterial(inputMaterialEntity);
            }

            return new ApiResponse<>(true, "Lưu hoá đơn thành công", "");
        }catch(Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Không lưu được hoá đơn");
        }
    }
//    @PostMapping("/getAllBillInput")

}


@Data
class Mater implements Serializable{
    int id;
    int amount;
    int price;
}

@Data
class MaterList implements Serializable{
    public List<Mater> maters = new ArrayList<>();
    int total;
    int idStaff;
}