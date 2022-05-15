package com.example.tasklist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tasklist.entity.Category;
import com.example.tasklist.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping ("/category") // базовый адрес
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // just for test: http://localhost:8080/category/test
    @GetMapping("/test")
    public List<Category> test() {
        List<Category> list = categoryRepository.findAll();
        return list; // JSON формат будет использоваться автоматически
    }
}