package com.ssafy.undaied;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class UndaidApplication {

	public static void main(String[] args) {
		SpringApplication.run(UndaidApplication.class, args);
	}

}
