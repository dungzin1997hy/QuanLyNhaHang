package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/trangchu")
    public String dashboard() {
        return "layout/trangchu";
    }
}
