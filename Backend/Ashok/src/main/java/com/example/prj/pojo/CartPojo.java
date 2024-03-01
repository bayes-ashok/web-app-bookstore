package com.example.prj.pojo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CartPojo {
    private Integer id;
    @NotNull
    private Integer itemId;
    @NotNull
    private Integer itemQuantity;
    @NotNull
    private Integer userId;

}
