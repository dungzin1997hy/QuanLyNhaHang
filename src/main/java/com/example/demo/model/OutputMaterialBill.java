package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OutputMaterialBill {
    private int id;
    private LocalDateTime time;
    private int total;
    private Stocker stocker;
}
