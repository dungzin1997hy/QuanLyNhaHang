package com.example.demo.controller;


import com.example.demo.config.ApiResponse;
import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.model.Bill;
import com.example.demo.model.Customer;
import com.example.demo.service.BillService;
import com.example.demo.service.CustomerService;
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

    @Autowired
    CustomerService customerService;
    @Autowired
    BillService billService;

    @PostMapping("/api/getAllCustomer")
    public ApiResponse<List<Customer>> getAllCustomer() {
        List<Customer> customers = customerService.getAllCustomer();
        return new ApiResponse<>(true, customers, "");
    }

    @PostMapping("/searchCustomerByPhoneNumber")
    @ResponseBody
    public ApiResponse<List<Customer>> searchCustomerByPhoneNumber(@RequestParam("customerPhoneNumber") String phoneNumber) {
        try {
            List<Customer> customers = customerService.searchCustomerByPhoneNumber(phoneNumber);
            if(customers.size()==0){
                return new ApiResponse<>(false,null,"Không tìm thấy khách hàng này");
            }
            return new ApiResponse<>(true, customers, "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, null, "Không tìm thấy khách hàng này");
        }
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
        if (customerDAO.checkExistCustomer(phoneNumber) == true)
            return new ApiResponse<>(false, "", "Khách hàng đã tồn tại");
        CustomerEntity customerEntity = new CustomerEntity(nameCus, phoneNumber, email);
        try {
            customerDAO.addCustomer(customerEntity);

            return new ApiResponse<>(true, "Thêm khách hàng thành công", "");
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "Thêm khách hàng thất bại", "");
        }
    }
    @PostMapping("/updateCustomer")
    public ApiResponse<String> updateCustomer(@RequestParam("id") int id,
                                              @RequestParam("nameCus") String nameCus,
                                              @RequestParam("phoneNumber") String phoneNumber,
                                              @RequestParam("email") String email){

        try{
            CustomerEntity customerEntity = new CustomerEntity(id,nameCus,phoneNumber,email);
            customerDAO.updateCustomer(customerEntity);
            return new ApiResponse<>(true,"Cập nhật khách hàng thành công","");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,"","Lỗi");
        }
    }

    @PostMapping("/getBillByCustomer")
    public ApiResponse<List<Bill>> getBill(@RequestParam("idCus") int id){
        try {
            List<Bill> bills = billService.getBillByCustomer(id);
            return new ApiResponse<>(true,bills,"");
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false,null,"Không có hoá đơn cho khách hàng này");
        }

    }

}
