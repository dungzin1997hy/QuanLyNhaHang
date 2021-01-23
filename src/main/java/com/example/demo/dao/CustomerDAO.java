package com.example.demo.dao;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.DishEntity;

import java.util.List;

public interface CustomerDAO {
    List<CustomerEntity> searchCustomerByName(String nameCustomer);
    CustomerEntity searchCustomerByPhoneNumber(String phoneNumber);
    CustomerEntity getCustomerById(int id);
    List<CustomerEntity> getListCustomerByPhone(String phoneNumber);
    List<CustomerEntity> getAllCustomer();

    Boolean checkExistCustomer(String phoneNumber);

    void addCustomer(CustomerEntity customerEntity);
    void deleteCustomer(int id);
    void updateCustomer(CustomerEntity customerEntity);
}
