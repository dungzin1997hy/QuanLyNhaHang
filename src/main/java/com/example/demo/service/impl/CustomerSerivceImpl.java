package com.example.demo.service.impl;

import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class CustomerSerivceImpl implements CustomerService {
    @Autowired
    CustomerDAO customerDAO;
    @Override
    public List<Customer> getAllCustomer() {
        List<CustomerEntity> customerEntities = customerDAO.getAllCustomer();
        List<Customer> customers = new ArrayList<>();
        for(CustomerEntity customerEntity:customerEntities){
            customers.add(customerEntity.toCustomer());
        }
        return customers;
    }

    @Override
    public Customer searchCustomerByPhoneNumber(String phoneNumber) {
        CustomerEntity customerEntity = customerDAO.searchCustomerByPhoneNumber(phoneNumber);
        return customerEntity.toCustomer();
    }
}
