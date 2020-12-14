package com.example.demo.entity;

import com.example.demo.model.TimeBook;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "timebook")
public class TimeBookEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "startTime")
    private Time startTime;

    @Column(name = "stopTime")
    private Time stopTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "timeBookEntity")
    private List<BookingEntity> bookingEntities;

    public TimeBook toTimeBook(){
        TimeBook timeBook = new TimeBook();
        timeBook.setId(this.id);
        timeBook.setStartTime(this.startTime);
        timeBook.setStopTime(this.stopTime);
        return timeBook;
    }
}
