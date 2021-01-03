package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {


    @GetMapping("/home-admin")
    public String a(){
       return "admin/dishManager";
    }
    @GetMapping("/home-letan")
    public String letan(){
        return "recept/booking";
    }


    @GetMapping({"/login"})
    public  String login(){
        return "login";
    }

    @GetMapping("/")
    public String temp(){
        return "/client/clientcall.html";
    }

    @GetMapping("/dishManager")
    public  String dishManager(){
        return "admin/dishManager";
    }

    @GetMapping("/tableManager")
    public String tableManager(){
        return "admin/tableManager";
    }
    @GetMapping("/booking")
    public String booking(){
        return "recept/booking";
    }


    @GetMapping("/staffManager")
    public String staffManager(){
        return "admin/staffManager";
    }

    @GetMapping("/customerManager")
    public String customer(){
        return "admin/customerManager";
    }

    @GetMapping("/warehouseManager")
    public String warehouse(){
        return "stock/warehouseManager";
    }

    @GetMapping("/receptHome")
    public String receptHome(){
        return "recept/receptHome";
    }

    @GetMapping("/loginError")
    public String login(HttpServletRequest request, Model model) {
        String errorMessage = "Sai username hoặc password";
        model.addAttribute("errorMessage", errorMessage);
        return "login";
    }
    @GetMapping("/clientcall")
    public String clientCall(){
        return "client/clientcall.html";
    }

    @GetMapping("/accountHome")
    public String accountant(){
        return "accountant/accountantHome";
    }
}
