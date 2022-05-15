package com.example.tasklist.service;

import org.springframework.stereotype.Service;
import com.example.tasklist.entity.Stat;
import com.example.tasklist.repository.StatRepository;

import javax.transaction.Transactional;

@Service
@Transactional
public class StatService {
    private final StatRepository repository;

    public StatService(StatRepository repository) {
        this.repository = repository;
    }

    public Stat findById(Long id){
        return repository.findById(id).get();
    }
}
