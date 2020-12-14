package com.example.demo.controller;

import com.example.demo.config.ApiResponse;
import com.example.demo.model.TimeBook;
import com.example.demo.service.TimeBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.util.List;

@RestController
public class TimeBookController {
    @Autowired
    TimeBookService timeBookService;
    @PostMapping("/getAllTimeBook")
    public ApiResponse<List<TimeBook>> getAllTimeBook(){
        try{
            List<TimeBook> timeBooks = timeBookService.getAllTimeBook();
            return new ApiResponse<>(true,timeBooks,"");
        }
        catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"Lỗi");
        }
    }
}
