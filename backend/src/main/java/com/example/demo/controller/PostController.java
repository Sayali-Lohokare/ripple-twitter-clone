package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import com.example.demo.service.NotificationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;
    private final NotificationService notificationService;  

    public PostController(PostRepository postRepository,
                          UserRepository userRepository,
                          AuthUtil authUtil,
                          NotificationService notificationService) { 
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.notificationService = notificationService;      
    }

    // ============================================================
    //                          CREATE POST
    // ============================================================
    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post post) {

        String currentUserId = authUtil.getCurrentUserId();

        if (post.getContent() == null || post.getContent().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing content");
        }

        User author = userRepository.findById(currentUserId).orElse(null);
        if (author == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        post.setUserId(currentUserId);
        post.setAuthorName(author.getName());
        post.setAuthorUsername(author.getUsername());
        post.setCreatedAt(System.currentTimeMillis());

        Post saved = postRepository.save(post);

        notificationService.notifyFollowersOfNewPost(author, saved);

        return ResponseEntity.ok(saved);
    }

    // ============================================================
    //                          GET POSTS
    // ============================================================
    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @GetMapping("/user/me")
    public List<Post> getMyPosts() {
        String currentUserId = authUtil.getCurrentUserId();
        return postRepository.findByUserId(currentUserId);
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable String userId) {
        return postRepository.findByUserId(userId);
    }

    // ============================================================
    //                          LIKE POST
    // ============================================================
    @PostMapping("/like/{postId}")
    public ResponseEntity<?> likePost(@PathVariable String postId) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (!post.getLikedBy().contains(currentUserId)) {
            post.getLikedBy().add(currentUserId);
            post.setLikesCount(post.getLikesCount() + 1);
        }

        Post saved = postRepository.save(post);
        return ResponseEntity.ok(saved);
    }

    // ============================================================
    //                          ADD COMMENT
    // ============================================================
    @PostMapping("/comment/{postId}")
    public ResponseEntity<?> addComment(
            @PathVariable String postId,
            @RequestParam String text) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (text == null || text.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing text");
        }

        Comment comment = new Comment();
        comment.setUserId(currentUserId);
        comment.setText(text);
        comment.setCreatedAt(System.currentTimeMillis());

        post.getComments().add(comment);
        post.setCommentsCount(post.getComments().size());

        return ResponseEntity.ok(postRepository.save(post));
    }

    // ============================================================
    //                          EDIT COMMENT
    // ============================================================
    @PatchMapping("/comment/edit/{postId}/{index}")
    public ResponseEntity<?> editComment(
            @PathVariable String postId,
            @PathVariable int index,
            @RequestParam String newText) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (index < 0 || index >= post.getComments().size()) {
            return ResponseEntity.badRequest().body("Invalid comment index");
        }

        Comment comment = post.getComments().get(index);
        if (!currentUserId.equals(comment.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not own this comment");
        }

        comment.setText(newText);
        return ResponseEntity.ok(postRepository.save(post));
    }

    // ============================================================
    //                          DELETE COMMENT
    // ============================================================
    @DeleteMapping("/comment/{postId}/{index}")
    public ResponseEntity<?> deleteComment(
            @PathVariable String postId,
            @PathVariable int index) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (index < 0 || index >= post.getComments().size()) {
            return ResponseEntity.badRequest().body("Invalid comment index");
        }

        Comment comment = post.getComments().get(index);
        if (!currentUserId.equals(comment.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not own this comment");
        }

        post.getComments().remove(index);
        post.setCommentsCount(post.getComments().size());

        return ResponseEntity.ok(postRepository.save(post));
    }

    // ============================================================
    //                          EDIT POST
    // ============================================================
    @PatchMapping("/edit/{postId}")
    public ResponseEntity<?> editPost(
            @PathVariable String postId,
            @RequestBody Map<String, Object> updates) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (!currentUserId.equals(post.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not own this post");
        }

        if (updates.containsKey("content")) {
            post.setContent((String) updates.get("content"));
        }

        if (updates.containsKey("imageUrls")) {
            Object value = updates.get("imageUrls");
            if (value instanceof List<?>) {
                List<?> rawList = (List<?>) value;
                List<String> images = rawList.stream()
                        .map(Object::toString)
                        .toList();
                post.setImageUrls(images);
            }
        }

        return ResponseEntity.ok(postRepository.save(post));
    }

    // ============================================================
    //                          DELETE POST
    // ============================================================
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable String postId) {

        String currentUserId = authUtil.getCurrentUserId();

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.badRequest().body("Post not found");
        }

        if (!currentUserId.equals(post.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not own this post");
        }

        postRepository.deleteById(postId);
        return ResponseEntity.ok("Post deleted successfully");
    }
}
