package com.oficina_dev.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class BackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(BackendApplication.class);

	public static void main(String[] args) {
		logger.info("Initializing application");
		Dotenv dotenv = Dotenv.configure().load();
		logger.debug("Loading environment variables from .env file");
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		var context = SpringApplication.run(BackendApplication.class, args);
		Environment env = context.getEnvironment();
		String port = env.getProperty("server.port");
		String profile = env.getActiveProfiles().length > 0 ? env.getActiveProfiles()[0] : "8080 (default value)";

		logger.info("Application initialized successfully using profile: {}", profile);
		logger.info("Application available at: http://localhost:{}", port);
	}
}
