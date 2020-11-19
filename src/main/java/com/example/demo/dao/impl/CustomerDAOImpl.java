package com.example.demo.dao.impl;

import com.example.demo.dao.CustomerDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.DishEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class CustomerDAOImpl implements CustomerDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CustomerEntity> searchCustomerByName(String nameCustomer) {
        try {
            String hql = "SELECT u FROM CustomerEntity u WHERE u.name LIKE '%" + nameCustomer + "%'";
            Query query = entityManager.createQuery(hql);

            List<CustomerEntity> customerEntities = query.getResultList();
            return customerEntities;
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public CustomerEntity searchCustomerByPhoneNumber(String phoneNumber) {

        try {
            String hql = "SELECT u FROM CustomerEntity u WHERE u.phoneNumber = :phoneNumber";
            Query query = entityManager.createQuery(hql);
            query.setParameter("phoneNumber", phoneNumber);
            return (CustomerEntity) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<CustomerEntity> getAllCustomer() {

        try {
            String sql = "SELECT u FROM CustomerEntity u";
            Query query = entityManager.createQuery(sql);
            List<CustomerEntity> customerEntities = query.getResultList();
            return customerEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean checkExistCustomer(String phoneNumber) {

        try {
            String sql = "SELECT u.phoneNumber FROM CustomerEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> customerNumbers = query.getResultList();
            if (customerNumbers.contains(phoneNumber)) {
                return true;
            } else return false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public void addCustomer(CustomerEntity customerEntity) {
        entityManager.persist(customerEntity);
    }

    @Override
    public void deleteCustomer(int idCustomer) {
        String sql = "delete from CustomerEntity b where b.id="+idCustomer;
        Query query = entityManager.createQuery(sql);
        query.executeUpdate();
    }

    @Override
    public void updateCustomer(CustomerEntity customerEntity) {
        entityManager.merge(customerEntity);
    }
}
