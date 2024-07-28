// src/main/java/com/example/demo/repository/QuestionRepository.java
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}