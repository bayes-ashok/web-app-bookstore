package com.example.prj.pojo;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderPojo {
    private Integer id;
    private Integer userId;
    private Integer cartId;
    private String address;
    private Integer phone_no;


}
