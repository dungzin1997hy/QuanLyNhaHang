package com.example.demo.controller;


import com.example.demo.config.ApiResponse;
import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    private CustomerDAO customerDAO;

    @PostMapping("/getAllCustomer")
    public ApiResponse<List<CustomerEntity>> getAllCustomer() {
        List<CustomerEntity> customerEntities = customerDAO.getAllCustomer();
        return new ApiResponse<>(true, customerEntities, "");
    }

    @PostMapping("/searchCustomerByName")
    @ResponseBody
    public ApiResponse<List<CustomerEntity>> searchCustomerByName(@RequestParam("cusName") String cusName) {
        List<CustomerEntity> customerEntities = customerDAO.searchCustomerByName(cusName);
        if (customerEntities.size() > 0) {
            return new ApiResponse<>(true, customerEntities, "");
        } else return new ApiResponse<>(false, null, "Không tìm thấy khách hàng này");
    }

    @PostMapping("/addCustomer")
    public ApiResponse<String> addCustomer(@RequestParam("nameCus") String nameCus,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("email") String email) {
        if(customerDAO.checkExistCustomer(phoneNumber) == true) return new ApiResponse<>(false,"","Khách hàng đã tồn tại");
        CustomerEntity customerEntity = new CustomerEntity(nameCus, phoneNumber, email);
        try {
            customerDAO.addCustomer(customerEntity);

            return new ApiResponse<>(true,"Thêm khách hàng thành công","");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false,"Thêm khách hàng thất bại","");
        }
    }


}
