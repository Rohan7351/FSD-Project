package com.example.demo.modal;
//src/main/java/com/example/demo/model/Test.java


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Test {

@Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String testName;
 private int duration; // duration in minutes

 @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
 private List<Question> questions;
 
 
 public Test(Long id, String testName, int duration, List<Question> questions) {
	 super();
	 this.id = id;
	 this.testName = testName;
	 this.duration = duration;
	 this.questions = questions;
 }
 
 public Test() {
	 super();
	 // TODO Auto-generated constructor stub
 }

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getTestName() {
	return testName;
}

public void setTestName(String testName) {
	this.testName = testName;
}

public int getDuration() {
	return duration;
}

public void setDuration(int duration) {
	this.duration = duration;
}

public List<Question> getQuestions() {
	return questions;
}

public void setQuestions(List<Question> questions) {
	this.questions = questions;
}

 // Getters and setters
}

//src/main/java/com/example/demo/model/Question.java

