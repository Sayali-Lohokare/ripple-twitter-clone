package com.example.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private static final Logger logger = LoggerFactory.getLogger(S3Service.class);

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.region}")  // make region a class field
    private String region;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // generate a unique file name
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        logger.info("Uploading file to region: {}", region);
        logger.info("Uploading file: {} to bucket: {}", fileName, bucketName);

        // create the S3 put request
        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .acl(ObjectCannedACL.PUBLIC_READ) // make public
                .build();

        try {
            // upload to S3
            s3Client.putObject(putRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            logger.info("File uploaded successfully: {}", fileName);
        } catch (Exception e) {
            logger.error("Error uploading file: {} to bucket: {}", fileName, bucketName, e);
            throw e;
        }

        // return public URL
        String publicUrl = getPublicUrl(fileName);
        logger.info("Generated public URL: {}", publicUrl);
        return publicUrl;
    }

    private String getPublicUrl(String key) {
        // use the class field 'region'
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucketName,
                region,
                key);
    }
}
