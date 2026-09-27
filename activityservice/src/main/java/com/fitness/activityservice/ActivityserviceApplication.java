package com.fitness.activityservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class ActivityserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActivityserviceApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner checkMongo(MongoTemplate mongoTemplate) {
		return args -> {
			System.out.println("Database = " + mongoTemplate.getDb().getName());
			System.out.println("Collection exists = " +
					mongoTemplate.collectionExists("activities"));
		};
	}*/

	@Bean
	public CommandLineRunner checkMongo(
			MongoTemplate mongoTemplate,
			@Value("${spring.data.mongodb.uri:NOT_FOUND}") String uri) {

		return args -> {
			System.out.println("Mongo URI = " + uri);
			System.out.println("Database = " + mongoTemplate.getDb().getName());
		};
	}

}
