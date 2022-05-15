package com.example.tasklist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tasklist.entity.Stat;
import com.example.tasklist.repository.StatRepository;

@RestController
public class StatController {
    private final StatRepository statRepository;

    public StatController(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    private final Long defaultId = 1l;

    @GetMapping("/stat")
    public ResponseEntity<Stat> findById() {
        return  ResponseEntity.ok(statRepository.findById(defaultId).get());
    }
}
