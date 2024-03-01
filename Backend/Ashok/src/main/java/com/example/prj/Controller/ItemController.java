package com.example.prj.Controller;

import com.example.prj.entity.Item;
import com.example.prj.entity.User;
import com.example.prj.pojo.ItemPojo;

import com.example.prj.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequestMapping("/item")
@RestController
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/save")
    public String saveItem(@RequestBody @ModelAttribute ItemPojo itemPojo) throws IOException {
        itemService.saveItem(itemPojo);
        return "data created successfully yoh";
    }

    @GetMapping("/getAll")
    public List<Item> findAll(){
        return itemService.findAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Item> findById(@PathVariable("id") Integer id){
        return itemService.findById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        itemService.deleteById(id);
    }
//    @GetMapping("/searchByName/{itemName}")
//    public List<Item> searchByName(@PathVariable("itemName") String itemName) {
//        return itemService.searchByName(itemName);
//    }
@GetMapping("/searchByName/{itemName}")
public List<Item> searchByName(@PathVariable("itemName") String itemName) {
    return itemService.searchByName(itemName);
}
    @PutMapping("/update/{id}")
    public ResponseEntity<String>updateItem(@PathVariable("id") Integer id, @RequestBody ItemPojo updatedItemPojo) {
        try {
            itemService.updateItem(id, updatedItemPojo);
            return new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }




}
