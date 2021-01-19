package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.BillDAO;
import com.example.demo.dao.DishDAO;
import com.example.demo.dao.TableDAO;
import com.example.demo.dao.UsedDishDAO;
import com.example.demo.entity.BillEntity;
import com.example.demo.entity.DishEntity;
import com.example.demo.entity.TableEntity;
import com.example.demo.entity.UsedDishEntity;
import com.example.demo.model.Bill;
import com.example.demo.model.Table;
import com.example.demo.model.UsedDish;
import com.example.demo.service.TableService;
import com.example.demo.service.UsedDishService;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.scene.control.Tab;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.*;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class TableController {

    @Autowired
    TableDAO tableDAO;
    @Autowired
    public TableService tableService;

    @Autowired
    DishDAO dishDAO;
    @Autowired
    BillDAO billDAO;

    @Autowired
    UsedDishDAO usedDishDAO;


    @Autowired
    public UsedDishService usedDishService;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");

    @PostMapping("/api/getAllTable")
    public ApiResponse<List<Table>> getAllTable() {
        List<Table> tables = tableService.getAllTable();
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("/searchTableByType")
    public ApiResponse<List<Table>> searchTableByType(@RequestParam("type") String type) {
        List<Table> tables = tableService.searchTableByType(type);
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("api/getTableByArea/{area}")
    public ApiResponse<List<Table>> getTableByArea(@PathVariable String area) {
        List<Table> tables = tableService.getTableByArea(area);
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("/getTableByName")
    public ApiResponse<Table> getTableByName(@RequestParam("name") String name) {
        Table tableEntity = tableService.getTableByName(name);
        return new ApiResponse<>(true, tableEntity, "");
//        Table table = tableService.getTableByName(name);
//        return new ApiResponse<>(true, table, "");
    }

    @PostMapping("/addTable")
    public ApiResponse<String> addTable(@RequestParam("nameTable_add") String nameTable,
                                        @RequestParam("type_add") String type,
                                        @RequestParam("area_add") String area
    ) {
        if (tableDAO.checkExistTable(nameTable) == true) return new ApiResponse<>(false, "", "Tên bàn đã tồn tại");
        try {
            TableEntity tableEntity = new TableEntity(nameTable, type, "free", area);
            tableDAO.addTable(tableEntity);
            return new ApiResponse<>(true, "Thêm bàn thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Không thêm được bàn này");
        }
    }

    @PostMapping("/updateTable")
    public ApiResponse<String> updateTable(@RequestParam("idTable") int idTable,
                                           @RequestParam("nameTable_edit") String nameTable,
                                           @RequestParam("type_edit") String type,
                                           @RequestParam("area_edit") String area) {
        try {
            TableEntity tableEntity = new TableEntity(idTable, nameTable, type, "free", area);
            tableDAO.updateTable(tableEntity);
            return new ApiResponse<>(true, "Update thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Không update được bàn này");
        }
    }

    @PostMapping("/deleteTable")
    public ApiResponse<String> deleteTalbe(@RequestParam("idTable") int idTable) {
        try {
            tableDAO.deleteTable(idTable);
            return new ApiResponse<>(true, "Xoá bàn thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Xoá bàn thất bại");
        }
    }

    @PostMapping("/getUsedDishByTable")
    public ApiResponse<List<UsedDish>> getUsedDish(@RequestParam("idTable") String idTable) {
        try {
            List<UsedDish> usedDishes = usedDishService.getUsedDishByTable(idTable);
            return new ApiResponse<>(true, usedDishes, "");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/addPayBill")
    public ApiResponse<String> addPayBill(@RequestBody Listinteger listinteger) {
        try {
            LocalDateTime dt = LocalDateTime.parse(listinteger.time, formatter);
            BillEntity billEntity = new BillEntity();
            billEntity.setTime(dt);
            billEntity.setTotal(listinteger.total);
            billEntity.setPaymentType("tiền mặt");
            System.out.println(listinteger.nameTable);
            TableEntity tableEntity = tableDAO.getTableByName(listinteger.nameTable);

            tableEntity.setStatus("free");
            tableDAO.updateTable(tableEntity);
            billEntity.setTableEntity(tableEntity);
            BillEntity billEntity1 = billDAO.addBill(billEntity);
            for (int i : listinteger.list) {
                UsedDishEntity usedDishEntity = usedDishDAO.getUsedDishByID(i);
                usedDishEntity.setBillEntity(billEntity1);
                usedDishDAO.updateTable(usedDishEntity);
            }
            return new ApiResponse<>(true, "Thanh toán thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "", "Không thanh toán được");
        }
    }

    @PostMapping("/searchTableBooking")
    public ApiResponse<List<Table>> searchTableBooking(@RequestParam("type") String type,
                                                       @RequestParam("idTimeBook") int idTime,
                                                       @RequestParam("date") Date date) {
        try {
            List<Table> tables = tableService.searchTableBooking(type, idTime,date);
            System.out.println(tables.size());
            return new ApiResponse<>(true, tables, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, null, "Lỗi");
        }
    }


    @PostMapping("/callDish")
    public ApiResponse<String> callDish(@RequestBody CallDishList callDishList){
        try{
            TableEntity tableEntity = tableDAO.searchTableByID(callDishList.idTable+"");
            for(CallDish callDish : callDishList.callDishes){
                UsedDishEntity usedDishEntity = new UsedDishEntity();
                usedDishEntity.setTableEntity(tableEntity);
                usedDishEntity.setAmount(Integer.parseInt(callDish.amount));
                DishEntity dishEntity = dishDAO.searchDishById(callDish.idDish);
                usedDishEntity.setDishEntity(dishEntity);
                LocalDateTime now = LocalDateTime.now();
                usedDishEntity.setTime(now);
                usedDishDAO.addUsedDish(usedDishEntity);
            }
            return new ApiResponse<>(true,"Gọi món thành công","");
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Lỗi");
        }
    }


    @PostMapping("/setTable")
    public ApiResponse<String> setTable(@RequestParam("nameTable") String name){
        try{
            TableEntity tableEntity = tableDAO.getTableByName(name);
            tableEntity.setStatus("using");
            tableDAO.updateTable(tableEntity);
            return new ApiResponse<>(true,"Đặt bàn thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Lỗi");
        }
    }
}



@Data
class Listinteger implements Serializable {
    public List<Integer> list = new ArrayList<>();
    int total;
    String time;
    int idCustomer;
    int idRecept;
    String nameTable;
}


@Data
@AllArgsConstructor
@NoArgsConstructor
class CallDish implements Serializable{
    int idDish;
    String amount;
}

@Data
@AllArgsConstructor
@NoArgsConstructor

class CallDishList implements Serializable{

    List<CallDish> callDishes;
    int idTable;
}