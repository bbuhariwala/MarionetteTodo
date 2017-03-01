package com.behram.jerseyrest.service;

import java.util.List;

import com.behram.jerseyrest.DAOImpl.TodoDAOImpl;
import com.behram.jerseyrest.bean.Todo;

public class TodoService {
	TodoDAOImpl todoDAOImpl = new TodoDAOImpl();
	public TodoService() {
	}
	
	public List<Todo> getAllTodos(){
		System.out.println("Fetching all TODOs - Service");
		return todoDAOImpl.getAllTodos();
	}
	
	public Todo addTodo(Todo todo){
		return todoDAOImpl.addTodo(todo);
	}
	
	public Todo updateTodoDescription(Todo todo){
		return todoDAOImpl.updateTodoDescription(todo);
	}
	
	public Todo updateTodoAssigner(Todo todo) throws Exception{
		return todoDAOImpl.updateTodoAssigner(todo);
	}
	
	public Todo updateTodoStatus(Todo todo){
		return todoDAOImpl.updateTodoStatus(todo);
	}
	
	public void deleteTodo(int id){
		todoDAOImpl.deleteTodo(id);
	}
	
	
}
