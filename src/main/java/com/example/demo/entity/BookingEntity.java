package com.example.demo.entity;

import com.example.demo.model.Booking;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "datban")
public class BookingEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "timebookid")
    private TimeBookEntity timeBookEntity;

    @ManyToOne
    @JoinColumn(name = "customerid")
    private CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name="tableid")
    private TableEntity tableEntity;

    @Column(name = "date")
    private Date date;

    @Column(name = "status")
    private String status;

    public Booking toBooking(){
        Booking booking = new Booking();
        booking.setId(this.id);
        booking.setTimeBook(this.timeBookEntity.toTimeBook());
        booking.setTable(this.tableEntity.toTable());
        booking.setDate(this.date);
        booking.setCustomer(this.customerEntity.toCustomer());
        booking.setStatus(this.status);
        return booking;
    }
}
