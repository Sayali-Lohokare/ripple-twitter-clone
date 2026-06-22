package com.example.demo.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3ClientBuilder;

@Configuration
public class S3Config {

    private static final Logger logger = LoggerFactory.getLogger(S3Config.class);

    @Value("${aws.region}")
    private String region;

    @Value("${aws.access-key:}") // optional
    private String accessKey;

    @Value("${aws.secret-key:}") // optional
    private String secretKey;

    @Bean
    public S3Client s3Client() {
        logger.info("Initializing S3Client with region: {}", region);

        S3ClientBuilder builder = S3Client.builder()
                .region(Region.of(region));

        if (!accessKey.isEmpty() && !secretKey.isEmpty()) {
            logger.info("Using StaticCredentialsProvider with provided accessKey and secretKey");
            builder.credentialsProvider(
                    StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)));
        } else {
            logger.info("Using DefaultCredentialsProvider (env vars, IAM roles, ~/.aws/credentials)");
            builder.credentialsProvider(DefaultCredentialsProvider.create());
        }

        S3Client client = builder.build();
        logger.info("S3Client initialized successfully");

        return client;
    }
}
