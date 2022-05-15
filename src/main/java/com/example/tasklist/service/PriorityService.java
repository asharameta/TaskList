package com.example.tasklist.service;

import org.springframework.stereotype.Service;
import com.example.tasklist.entity.Priority;
import com.example.tasklist.repository.PriorityRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PriorityService {
    private final PriorityRepository repository;

    public PriorityService(PriorityRepository repository) {
        this.repository = repository;
    }

    public List<Priority> findAll() {
        return repository.findAllByOrderByIdAsc();
    }

    public Priority add(Priority priority) {
        return repository.save(priority);
    }

    public Priority update(Priority priority){
        return repository.save(priority);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public Priority findById(Long id){
        return repository.findById(id).get();
    }

    public List<Priority> findByTitle(String text){
        return repository.findByTitle(text);
    }
}
