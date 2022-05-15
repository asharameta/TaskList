package com.example.tasklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tasklist.entity.Priority;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {

}
