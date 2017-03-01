package com.behram.jerseyrest.DAOInterface;

import java.util.List;
import java.util.Map;

import com.behram.jerseyrest.bean.Todo;

public interface TodoDAOInterface {
	public List<Todo> getAllTodos();
	public Map<String,Todo> getUserTodoMapping();
	public Todo addTodo(Todo todo);
	public Todo updateTodoStatus(Todo todo);
	public Todo updateTodoDescription(Todo todo);
	public Todo updateTodoAssigner(Todo todo);
	public void deleteTodo(int id);
}
