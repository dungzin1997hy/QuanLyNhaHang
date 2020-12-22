package com.example.demo.service;

import com.example.demo.dao.CustomerDAO;
import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomer();
    List<Customer> searchCustomerByPhoneNumber(String phoneNumber);
}
