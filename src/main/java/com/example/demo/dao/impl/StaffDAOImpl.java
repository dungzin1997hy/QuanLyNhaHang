package com.example.demo.dao.impl;

import com.example.demo.dao.StaffDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.StaffEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class StaffDAOImpl implements StaffDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<StaffEntity> searchStaffByName(String staffName) {
        try {
            String hql = "SELECT u FROM StaffEntity u WHERE u.name = :staffName";
            Query query = entityManager.createQuery(hql);
            query.setParameter("staffName", staffName);
            List<StaffEntity> staffEntities = query.getResultList();
            return staffEntities;

        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<StaffEntity> getAllStaff() {
        return null;
    }

    @Override
    public Boolean checkExistStaff(String phoneNumber) {
        return null;
    }

    @Override
    public void addStaff(StaffEntity staffEntity) {

    }

    @Override
    public void deleteStaff(int idStaff) {

    }

    @Override
    public void updateCustomer(StaffEntity staffEntity) {

    }
}
