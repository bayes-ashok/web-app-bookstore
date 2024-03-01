package com.example.prj.Controller;

import com.example.prj.entity.Item;
import com.example.prj.entity.Order;
import com.example.prj.pojo.ItemPojo;
import com.example.prj.pojo.OrderPojo;
import com.example.prj.service.ItemService;
import com.example.prj.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/order")
@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/save")
    public String saveItem(@Valid @RequestBody OrderPojo orderPojo){
        orderService.saveItem(orderPojo);
        return "data created successfully yoh order";
    }

    @GetMapping("/getAll")
    public List<Order> findAll(){
        return orderService.findAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Order> findById(@PathVariable("id") Integer id){
        return orderService.findById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        orderService.deleteById(id);
    }
}



