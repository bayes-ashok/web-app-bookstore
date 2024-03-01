package com.example.prj.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="cartitems")
public class Cart {
    @Id
    @SequenceGenerator(name = "cartitem_seq_gen", sequenceName = "cartitem_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "cartitem_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name="itemQuantity", nullable = false, length = 255)
    private Integer itemQuantity;
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

