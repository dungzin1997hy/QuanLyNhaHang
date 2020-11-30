package com.example.demo.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "useddish")
@EntityListeners(AuditingEntityListener.class)
public class UsedDishEntity {

    @Id
    @Column(name = "id")

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "tableId")
    private TableEntity tableEntity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dishId", referencedColumnName = "id")
    private DishEntity dishEntity;


    @Column(name ="amount")
    private int amount;

    @Column(name ="time")
    private Time time;

}
