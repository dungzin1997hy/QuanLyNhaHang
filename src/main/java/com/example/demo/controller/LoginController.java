package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
    @GetMapping({"/login","/"})
    public  String login(){
        return "login";
    }

    @GetMapping("/dishManager")
    public  String dishManager(){
        return "dishManager";
    }


    @GetMapping("/loginError")
    public String login(HttpServletRequest request, Model model) {
        String errorMessage = "Sai username hoặc password";
        model.addAttribute("errorMessage", errorMessage);
        return "login";
    }
}
