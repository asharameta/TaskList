package com.example.tasklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tasklist.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}

