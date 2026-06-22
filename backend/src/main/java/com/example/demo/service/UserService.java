package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;

    public UserService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       NotificationService notificationService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.notificationService = notificationService;
    }
    
    private boolean isBCryptHash(String value) {
        if (value == null) return false;
        return value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$");
    }

    // ---------------- REGISTER USER ---------------
    public User registerUser(User user) {

        if (user.getPassword() != null && !user.getPassword().isBlank()
                && !isBCryptHash(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        user.setFollowers(new ArrayList<>());
        user.setFollowing(new ArrayList<>());
        user.setSavedPosts(new ArrayList<>());

        return userRepo.save(user);
    }

    // ---------------- FIND USER BY ID ---------------
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    // ---------------- SEARCH USERS ---------------
    public List<User> searchUsers(String query) {
        return userRepo
                .findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrBioContainingIgnoreCase(
                        query, query, query
                );
    }

    // ---------------- FOLLOW USER ---------------
    public Map<String, Object> followUser(String followerId, String targetId) {

        if (followerId.equals(targetId))
            return Map.of("error", "You cannot follow yourself");

        User follower = getUserById(followerId);
        User target = getUserById(targetId);

        if (follower == null || target == null)
            return Map.of("error", "Invalid follower or target user");

        boolean newFollow = false;

        if (!follower.getFollowing().contains(targetId)){
            follower.getFollowing().add(targetId);
            newFollow = true; 
        }
        if (!target.getFollowers().contains(followerId)){
            target.getFollowers().add(followerId);
            newFollow = true;   
        }

        userRepo.save(target);
        userRepo.save(follower);

        if (newFollow) {
            notificationService.notifyUser(
                    targetId,                 // receiver = user being followed
                    followerId,               // who followed
                    "FOLLOW",                 // type
                    "started following you",  // message
                    null                      // no referenceId
            );
        }
        

        return Map.of(
                "message", "Followed successfully",
                "followerId", followerId,
                "targetId", targetId
        );
    }

    // ---------------- UNFOLLOW USER ---------------
    public Map<String, Object> unfollowUser(String followerId, String targetId) {

        if (followerId.equals(targetId))
            return Map.of("error", "You cannot unfollow yourself");

        User follower = getUserById(followerId);
        User target = getUserById(targetId);

        if (follower == null || target == null)
            return Map.of("error", "Invalid follower or target user");

        follower.getFollowing().remove(targetId);
        target.getFollowers().remove(followerId);

        userRepo.save(target);
        userRepo.save(follower);

        return Map.of("message", "Unfollowed successfully");
    }

    // ---------------- GET FOLLOWERS ---------------
    public List<User> getFollowers(String userId) {
        User user = getUserById(userId);
        return user == null ? new ArrayList<>() : userRepo.findAllById(user.getFollowers());
    }

    // ---------------- GET FOLLOWING ---------------
    public List<User> getFollowing(String userId) {
        User user = getUserById(userId);
        return user == null ? new ArrayList<>() : userRepo.findAllById(user.getFollowing());
    }

    // ---------------- RECOMMEND USERS ---------------
    public List<User> recommendUsers(String userId) {

        User currentUser = getUserById(userId);
        if (currentUser == null) return new ArrayList<>();

        Set<String> recommendedIds = new HashSet<>();

        for (String followingId : currentUser.getFollowing()) {
            User friend = getUserById(followingId);
            if (friend != null) {
                recommendedIds.addAll(friend.getFollowing());
            }
        }

        recommendedIds.remove(userId);
        recommendedIds.removeAll(currentUser.getFollowing());

        return userRepo.findAllById(recommendedIds);
    }

    // ---------------- SAVE POST ---------------
    public Map<String, Object> savePost(String userId, String postId) {

        User user = getUserById(userId);
        if (user == null) return Map.of("error", "User not found");

        if (!user.getSavedPosts().contains(postId))
            user.getSavedPosts().add(postId);

        userRepo.save(user);

        return Map.of("message", "Post saved", "savedPosts", user.getSavedPosts());
    }

    // ---------------- UNSAVE POST ---------------
    public Map<String, Object> unsavePost(String userId, String postId) {

        User user = getUserById(userId);
        if (user == null) return Map.of("error", "User not found");

        user.getSavedPosts().remove(postId);
        userRepo.save(user);

        return Map.of("message", "Post removed from saved list");
    }

    // ---------------- UPDATE PROFILE ---------------
    public User updateProfile(String userId, User updated) {

        User user = getUserById(userId);
        if (user == null) return null;

        if (updated.getName() != null) user.setName(updated.getName());
        if (updated.getBio() != null) user.setBio(updated.getBio());
        if (updated.getProfileImage() != null) user.setProfileImage(updated.getProfileImage());
        if (updated.getUsername() != null) user.setUsername(updated.getUsername());

        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            String newPassword = updated.getPassword();
            if (!isBCryptHash(newPassword)) {
                newPassword = passwordEncoder.encode(newPassword);
            }
            user.setPassword(newPassword);
        }

        return userRepo.save(user);
    }

    // ---------------- UPDATE FCM TOKEN ---------------
    public User updateFcmToken(String userId, String fcmToken) {
        User user = getUserById(userId);
        if (user == null) return null;

        user.setFcmToken(fcmToken);
        return userRepo.save(user);
    }
}
