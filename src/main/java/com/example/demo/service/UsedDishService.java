package com.example.demo.service;

import com.example.demo.model.UsedDish;

import java.util.List;

public interface UsedDishService {
    List<UsedDish> getUsedDishByTable(String id);
}
