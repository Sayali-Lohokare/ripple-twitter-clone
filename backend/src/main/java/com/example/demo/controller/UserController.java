package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.PostRepository;
import com.example.demo.security.AuthUtil;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PostRepository postRepository;
    private final AuthUtil authUtil;

    public UserController(UserService userService,
                          PostRepository postRepository,
                          AuthUtil authUtil) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.authUtil = authUtil;
    }

    // ============================================================
    //                      REGISTER USER
    // ============================================================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // ============================================================
    //                      USER PROFILE
    // ============================================================
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable String userId) {

        User user = userService.getUserById(userId);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");

        List<Post> posts = postRepository.findByUserId(userId);

        Map<String, Object> profile = new HashMap<>();
        profile.put("user", user);
        profile.put("posts", posts);
        profile.put("totalPosts", posts.size());
        profile.put("followers", user.getFollowers().size());
        profile.put("following", user.getFollowing().size());
        profile.put("savedPosts", user.getSavedPosts());

        return ResponseEntity.ok(profile);
    }

    // ============================================================
    //                      SEARCH USERS
    // ============================================================
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }

    // ============================================================
    //                  FOLLOW / UNFOLLOW USERS
    // ============================================================
    // Use current logged-in user as follower
    @PostMapping("/follow")
    public ResponseEntity<?> followUser(@RequestParam String targetId) {
        String followerId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.followUser(followerId, targetId));
    }

    @PostMapping("/unfollow")
    public ResponseEntity<?> unfollowUser(@RequestParam String targetId) {
        String followerId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.unfollowUser(followerId, targetId));
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getFollowers(userId));
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<?> getFollowing(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getFollowing(userId));
    }

    // ============================================================
    //                  RECOMMEND USERS TO FOLLOW
    // ============================================================
    @GetMapping("/recommend/me")
    public ResponseEntity<?> recommendUsersForCurrentUser() {
        String userId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.recommendUsers(userId));
    }

    // ============================================================
    //                      SAVE / UNSAVE POST
    // ============================================================
    @PostMapping("/save")
    public ResponseEntity<?> savePost(@RequestParam String postId) {
        String userId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.savePost(userId, postId));
    }

    @PostMapping("/unsave")
    public ResponseEntity<?> unsavePost(@RequestParam String postId) {
        String userId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.unsavePost(userId, postId));
    }

    @GetMapping("/me/saved")
    public ResponseEntity<?> getMySavedPosts() {

        String userId = authUtil.getCurrentUserId();

        User user = userService.getUserById(userId);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");

        List<Post> saved = postRepository.findAllById(user.getSavedPosts());
        return ResponseEntity.ok(saved);
    }

    // ============================================================
    //                  UPDATE USER PROFILE (SELF)
    // ============================================================
    @PatchMapping("/update/me")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {

        String userId = authUtil.getCurrentUserId();

        User updated = userService.updateProfile(userId, updatedUser);
        if (updated == null)
            return ResponseEntity.badRequest().body("User not found");

        return ResponseEntity.ok(updated);
    }

    // ============================================================
    //                  UPDATE FCM TOKEN (SELF)
    // ============================================================
    @PostMapping("/me/fcm-token")
public ResponseEntity<?> updateMyFcmToken(@RequestBody Map<String, String> body) {

    String userId = authUtil.getCurrentUserId();
    String token = body.get("fcmToken");

    if (token == null || token.isBlank()) {
        return ResponseEntity.badRequest().body("fcmToken is required");
    }

    User updated = userService.updateFcmToken(userId, token);
    if (updated == null) {
        return ResponseEntity.badRequest().body("User not found");
    }

    return ResponseEntity.ok(Map.of(
            "fcmToken", updated.getFcmToken()
    ));
}


   @GetMapping("/{userId}/fcm-token")
public ResponseEntity<?> getUserFcmToken(@PathVariable String userId) {

    User user = userService.getUserById(userId);

    if (user == null) {
        return ResponseEntity.badRequest().body("User not found");
    }

    Map<String, Object> response = new HashMap<>();
    response.put("fcmToken", user.getFcmToken()); // null-safe

    return ResponseEntity.ok(response);
}
}
