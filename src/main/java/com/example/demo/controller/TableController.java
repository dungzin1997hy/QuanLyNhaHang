package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.dao.TableDAO;
import com.example.demo.entity.TableEntity;
import com.example.demo.model.Table;
import com.example.demo.service.TableService;
import javafx.scene.control.Tab;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TableController {

    @Autowired
    TableDAO tableDAO;
    @Autowired
    public TableService tableService;

    @PostMapping("/getAllTable")
    public ApiResponse<List<Table>> getAllTable() {
        List<Table> tables = tableService.getAllTable();
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("/searchTableByType")
    public ApiResponse<List<Table>> searchTableByType(@RequestParam("type") String type) {
        List<Table> tables = tableService.searchTableByType(type);
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("/getTableByArea")
    public ApiResponse<List<Table>> getTableByArea(@RequestParam("area") String area) {
        List<Table> tables = tableService.getTableByArea(area);
        return new ApiResponse<>(true, tables, "");
    }

    @PostMapping("/getTableByName")
    public ApiResponse<Table> getTableByName(@RequestParam("name") String name) {
        Table table = tableService.getTableByName(name);
        return new ApiResponse<>(true, table, "");
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
}
