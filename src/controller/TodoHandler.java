package com.behram.jerseyrest.controller;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.behram.jerseyrest.bean.Todo;
import com.behram.jerseyrest.service.TodoService;

@Path("todo")
public class TodoHandler {

	TodoService todoService = new TodoService();
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Todo> getAllTodos() {
    	System.out.println("Fetching all TODOs - Controller");
    	List<Todo> todos = todoService.getAllTodos();
    	for(Todo todo: todos){
    		System.out.println(todo);
    	}
        return todoService.getAllTodos();
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTodo(Todo todo){
    	System.out.println("Adding a new Todo");
    	try{
    		return Response.ok(todoService.addTodo(todo),MediaType.APPLICATION_JSON).build();
    	}
    	catch(Exception e){
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
    @PUT
    @Path("/change/description")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTododescription(Todo todo){
    	System.out.println("Updating an existing Todo description");
    	try{
    		return Response.ok(todoService.updateTodoDescription(todo),MediaType.APPLICATION_JSON).build();
    	}
    	catch(Exception e){
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
    @PUT
    @Path("/change/assignedby")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTodoAssigner(Todo todo){
    	System.out.println("Updating Assigned by field of TODO");
    	try{
    		return Response.ok(todoService.updateTodoAssigner(todo),MediaType.APPLICATION_JSON).build();
    	}
    	catch(Exception e){
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
    @PUT
    @Path("/change/status")
    @Produces(MediaType.APPLICATION_JSON)
    public Todo updateTodoStatus(Todo todo){
    	System.out.println("Updating an existing Todo status");
    	return todoService.updateTodoStatus(todo);
    }
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteTodo(@PathParam("id") int id){
    	System.out.println("Deleting Todo with Id"+id);
    	todoService.deleteTodo(id);
    }
    
    @POST
    @Path("/addtodo/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public void addTodoToUser(@PathParam("id") int id,Todo todo){
    	
    }
}
