package com.example.tasklist.controller;

import com.example.tasklist.service.StatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tasklist.entity.Stat;
import com.example.tasklist.util.MyLogger;

@RestController
public class StatController {
    private final StatService statService;

    public StatController(StatService statService) {
        this.statService = statService;
    }

    private final Long defaultId = 1l;

    @GetMapping("/stat")
    public ResponseEntity<Stat> findById() {
        MyLogger.showMethodName("StatController: findById() ---------------------------------------------------------- ");
        return  ResponseEntity.ok(statService.findById(defaultId));
    }
}
