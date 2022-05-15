package com.example.tasklist.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.tasklist.entity.Stat;

@Repository
public interface StatRepository extends CrudRepository<Stat, Long> {

}
