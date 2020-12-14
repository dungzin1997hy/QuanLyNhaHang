package com.example.demo.service.impl;

import com.example.demo.dao.TimeBookDAO;
import com.example.demo.entity.TimeBookEntity;
import com.example.demo.model.TimeBook;
import com.example.demo.service.TimeBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class TimeBookServiceImpl implements TimeBookService {
    @Autowired
    TimeBookDAO timeBookDAO;
    @Override
    public List<TimeBook> getAllTimeBook() {
        List<TimeBookEntity> timeBookEntities = timeBookDAO.getAllTimeBookEntity();
        List<TimeBook> timeBooks = new ArrayList<>();
        for(TimeBookEntity timeBookEntity:timeBookEntities){
            timeBooks.add(timeBookEntity.toTimeBook());
        }
        return timeBooks;
    }
}
