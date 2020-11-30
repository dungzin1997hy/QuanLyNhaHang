package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Table {
    private int id;
    private String name;
    private String status;
    private String type;
    private String area;
    private List<UsedDish> usedDishList;

    
}
