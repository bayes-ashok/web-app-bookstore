package com.example.prj.service.impl;

import com.example.prj.entity.Item;
import com.example.prj.pojo.ItemPojo;
import com.example.prj.repository.ItemRepository;
import com.example.prj.service.ItemService;
import com.example.prj.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/canteen_mgmt/itemImage").toString();
    ImageToBase64 imageToBase64 = new ImageToBase64();
    @Override
    public void saveItem(ItemPojo itemPojo) throws IOException {
    Item item=new Item();


        if(itemPojo.getId()!=null){
            item=itemRepository.findById(itemPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        item.setItemName(itemPojo.getItemName());
        item.setItemDescription(itemPojo.getItemDescription());
        item.setItemCategory(itemPojo.getItemCategory());
        item.setItemQuantity(itemPojo.getItemQuantity());
        item.setItemPerPrice(itemPojo.getItemPerPrice());

        if (itemPojo.getItemImage() != null) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, itemPojo.getItemImage().getOriginalFilename());
            fileNames.append(itemPojo.getItemImage().getOriginalFilename());
            Files.write(fileNameAndPath, itemPojo.getItemImage().getBytes());
        }


        item.setItemImage(itemPojo.getItemImage().getOriginalFilename());


            itemRepository.save(item);

    }


    @Override
    public List<Item> findAll() {
        List<Item> items = itemRepository.findAll();
        items = items.stream().map(item -> {
            item.setItemImage(imageToBase64.getImageBase64("/itemImage/" + item.getItemImage()));
            return item;
        }).collect(Collectors.toList());
        return items;
    }

    @Override
    public Optional<Item> findById(Integer id) {
        return itemRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
           itemRepository.deleteById(id);
    }

@Override
public List<Item> searchByName(String itemName) {
    List<Item> items = itemRepository.findByItemNameIgnoreCaseContaining(itemName);
    items = items.stream().map(item -> {
        item.setItemImage(imageToBase64.getImageBase64("/itemImage/" + item.getItemImage()));
        return item;
    }).collect(Collectors.toList());
    return items;
}
    @Override
    public void updateItem(Integer id, ItemPojo updatedItemPojo)  {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            // Update the item fields with the updatedItemPojo values
            item.setItemName(updatedItemPojo.getItemName());
            item.setItemDescription(updatedItemPojo.getItemDescription());
            item.setItemPerPrice(updatedItemPojo.getItemPerPrice());
            // Save the updated item
            itemRepository.save(item);
        } else {
        }
    }
}
