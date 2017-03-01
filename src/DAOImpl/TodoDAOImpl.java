package com.behram.jerseyrest.DAOImpl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.behram.jerseyrest.DAOInterface.TodoDAOInterface;
import com.behram.jerseyrest.bean.Todo;

public class TodoDAOImpl implements TodoDAOInterface {

	private BasicDataSource basicDataSource;
	private JdbcTemplate jdbcTemplate;
	private DataSourceTransactionManager dataSourceTransactionManager;
	private static final String insertQuery = "INSERT INTO TODOS(ID,ASSIGNEDBY,TASKDESCRIPTION,DATECREATED,DATEMODIFIED,STATUS,MARKEDDELETED) VALUES(?,?,?,?,?,?,?)";
	private static final String selectQuery = "SELECT * FROM TODOS WHERE MARKEDDELETED='F'";
	private static final String deleteQuery = "UPDATE TODOS SET MARKEDDELETED='T' WHERE ID= ? ";
	private static final String updateTDescQuery = "UPDATE TODOS SET TASKDESCRIPTION= ?, DATEMODIFIED= ? WHERE ID= ?";
	private static final String updateTStatusQuery = "UPDATE TODOS SET STATUS= ?, DATEMODIFIED= ? WHERE ID= ?";
	private static final String updateAssignedByQuery = "UPDATE TODOS SET ASSIGNEDBY= ?,DATEMODIFIED= ? WHERE ID= ?";
	private static final String getMaxIdQuery = "SELECT MAX(ID) FROM TODOS";
	public TodoDAOImpl() {
		basicDataSource = DBUtility.getDataSource();
		jdbcTemplate = new JdbcTemplate(basicDataSource);
		dataSourceTransactionManager = new DataSourceTransactionManager();
		dataSourceTransactionManager.setDataSource(basicDataSource);
	}

	@Override
	public List<Todo> getAllTodos() {
		System.out.println("Fetching all TODOs - DAO");
		List<Todo> todos = jdbcTemplate.query(selectQuery, new RowMapper<Todo>() {
			@Override
			public Todo mapRow(ResultSet result, int rowNum) throws SQLException {
				Todo todo = new Todo();
				todo.setId(result.getInt("ID"));
				todo.setAssignedBy(result.getString("ASSIGNEDBY"));
				todo.setTaskDescription(result.getString("TASKDESCRIPTION"));
				todo.setDateCreated(result.getString("DATECREATED"));
				todo.setDateModified(result.getString("DATEMODIFIED"));
				todo.setStatus(result.getString("STATUS"));
				return todo;
			}
			
		});
		return todos;
	}

	@Override
	public Map<String, Todo> getUserTodoMapping() {
		return null;
	}

	@Override
	public Todo addTodo(Todo todo) {
		TransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
		TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
		try{
			int id = getMaxId();
			jdbcTemplate.update(insertQuery,id,todo.getAssignedBy(),todo.getTaskDescription(),todo.getDateCreated(),todo.getDateModified(),todo.getStatus(),"F");
			dataSourceTransactionManager.commit(transactionStatus);
			todo.setId(id);
		}
		catch(Exception e){
			System.out.println("Insert failed");
			e.printStackTrace();
			dataSourceTransactionManager.rollback(transactionStatus);
			throw e;
		}
		return todo;
	}

	@Override
	public void deleteTodo(int id) {

		TransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
		TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
		try {
			jdbcTemplate.update(deleteQuery,id);
			dataSourceTransactionManager.commit(transactionStatus);
		}
		catch(Exception e){
			System.out.println("Deletion failed");
			e.printStackTrace();
			dataSourceTransactionManager.rollback(transactionStatus);
		}
	}

	@SuppressWarnings("deprecation")
	private int getMaxId() {
		return jdbcTemplate.queryForInt(getMaxIdQuery) + 1;
	}

	@Override
	public Todo updateTodoStatus(Todo todo) {
		TransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
		TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
		try {
			jdbcTemplate.update(updateTStatusQuery,todo.getStatus(),todo.getDateModified(),todo.getId());
			dataSourceTransactionManager.commit(transactionStatus);
		}
		catch(Exception e){
			System.out.println("Updating Status failed");
			dataSourceTransactionManager.rollback(transactionStatus);
		}
		return todo;
	}
	
	@Override
	public Todo updateTodoAssigner(Todo todo) {
		TransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
		TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
		try {
			jdbcTemplate.update(updateAssignedByQuery,todo.getAssignedBy(),todo.getDateModified(),todo.getId());
			dataSourceTransactionManager.commit(transactionStatus);
		}
		catch(Exception e){
			System.out.println("Updating field Assigned By failed");
			dataSourceTransactionManager.rollback(transactionStatus);
			throw e;
		}
		return todo;
	}
	
	@Override
	public Todo updateTodoDescription(Todo todo) {
		TransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
		TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
		try {
			jdbcTemplate.update(updateTDescQuery,todo.getTaskDescription(),todo.getDateModified(),todo.getId());
			dataSourceTransactionManager.commit(transactionStatus);
		}
		catch(Exception e){
			System.out.println("Updating Description failed");
			dataSourceTransactionManager.rollback(transactionStatus);
		}
		return todo;
	}
	/*public static void main(String[] args) {
		TodoDAOImpl todoDAOImpl = new TodoDAOImpl();
		List<Todo> todos = todoDAOImpl.getAllTodos();
		for(Todo todo : todos) {
			System.out.println(todo);
		}
		System.out.println(todoDAOImpl.getMaxId());
	}*/
}
