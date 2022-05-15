package com.example.tasklist.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.example.tasklist.entity.Task;
import com.example.tasklist.repository.TaskRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> findAll() {
        return repository.findAll();
    }

    public Task add(Task task) {
        return repository.save(task);
    }

    public Task update(Task task){
        return repository.save(task);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public Page findByParams(String text, Integer completed, Long priorityId, Long categoryId, PageRequest paging){
        return repository.findByParams(text, completed, priorityId, categoryId, paging);
    }

    public Task findById(Long id){
        return repository.findById(id).get();
    }
}
