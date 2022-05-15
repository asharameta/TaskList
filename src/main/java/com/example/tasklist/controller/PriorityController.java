package com.example.tasklist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tasklist.entity.Priority;
import com.example.tasklist.repository.PriorityRepository;

import java.util.List;

@RestController
@RequestMapping ("/priority")
public class PriorityController {
    private PriorityRepository priorityRepository;

    public PriorityController(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    // just for test: http://localhost:8080/priority/test
    @GetMapping("/test")
    public List<Priority> test() {
        List<Priority> list = priorityRepository.findAll();
        return list; // JSON
    }
}
