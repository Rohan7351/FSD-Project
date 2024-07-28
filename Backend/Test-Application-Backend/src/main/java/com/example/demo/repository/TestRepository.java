// src/main/java/com/example/demo/repository/TestRepository.java
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.Test;

public interface TestRepository extends JpaRepository<Test, Long> {
}
