package com.example.demo.dao.impl;

import com.example.demo.dao.StaffDAO;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.StaffEntity;
import com.example.demo.entity.TableEntity;
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
            String hql = "SELECT u FROM StaffEntity u WHERE u.name like '%"+staffName+"%'";
            Query query = entityManager.createQuery(hql);
            List<StaffEntity> staffEntities = query.getResultList();
            return staffEntities;

        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<StaffEntity> getAllStaff() {
        try {
            String sql = "SELECT u FROM StaffEntity u order by u.id,u.name";
            Query query = entityManager.createQuery(sql);
            List<StaffEntity> staffEntities = query.getResultList();
            return staffEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public StaffEntity getStaffById(String idStaff) {
        try {
            String sql = "SELECT u FROM StaffEntity u where u.id = '" + idStaff + "'";
            return (StaffEntity) entityManager.createQuery(sql).getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
        }

    @Override
    public List<StaffEntity> searchStaffByRole(String role) {
        try {
            String sql = "SELECT u FROM StaffEntity u where u.roleEntity.id="+role;
            Query query = entityManager.createQuery(sql);
            List<StaffEntity> staffEntities = query.getResultList();
            return staffEntities;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean checkExistStaff(String cmnd) {
        try {
            String sql = "SELECT u.cmnd FROM StaffEntity u";
            Query query = entityManager.createQuery(sql);
            List<String> phoneNumbers = query.getResultList();
            if (phoneNumbers.contains(cmnd)) {
                return true;
            } else return false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public void addStaff(StaffEntity staffEntity) {
        entityManager.persist(staffEntity);
    }

    @Override
    public void deleteStaff(int idStaff) {
        StaffEntity staffEntity = getStaffById(idStaff+"");
        entityManager.remove(staffEntity);
    }

    @Override
    public void updateStaff(StaffEntity staffEntity) {
        entityManager.merge(staffEntity);
    }
}
