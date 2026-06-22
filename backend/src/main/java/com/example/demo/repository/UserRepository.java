package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    // find by email for login
    User findByEmail(String email);
   // find by id
    Optional<User> findById(String id);

    // used in searchUsers(...)
    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrBioContainingIgnoreCase(
            String username, String email, String bio
    );
}
