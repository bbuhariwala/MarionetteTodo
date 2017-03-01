package com.behram.jerseyrest.DAOImpl;

import org.apache.commons.dbcp2.BasicDataSource;

public class DBUtility {
	private static BasicDataSource basicDataSource;
	
	public static BasicDataSource getDataSource(){
		if(basicDataSource == null){
			basicDataSource = new BasicDataSource();
			basicDataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
			basicDataSource.setUrl("jdbc:oracle:thin:@localhost:1521:orcl");
			basicDataSource.setUsername("system");
			basicDataSource.setPassword("shree1218oracle");
			basicDataSource.setMaxOpenPreparedStatements(100);
		}
		return basicDataSource;
	}
}
