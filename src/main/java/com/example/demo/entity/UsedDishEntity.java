package com.example.demo.entity;

import com.example.demo.model.Bill;
import com.example.demo.model.UsedDish;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
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

    @ManyToOne
    @JoinColumn(name = "billId")
    private BillEntity billEntity;

    @ManyToOne
    @JoinColumn(name = "dishId", referencedColumnName = "id")
    private DishEntity dishEntity;

    @Column(name ="amount")
    private int amount;

    @Column(name ="time")
    private LocalDateTime time;

    public UsedDish toUsedDish(){
        UsedDish usedDish = new UsedDish();
        //com.example.demo.model.Table table = this.tableEntity.toTable();
        usedDish.setId(this.id);
        usedDish.setDish(this.dishEntity.toDish());
        usedDish.setAmount(this.amount);
        usedDish.setTime(this.time);
       // usedDish.setTable(table);
        return usedDish;
    }

}
