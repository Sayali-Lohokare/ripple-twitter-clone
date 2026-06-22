package com.example.demo.service;

import com.example.demo.model.Notification;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepo;
    private final UserRepository userRepo;
    private final FirebaseMessagingService firebaseMessagingService;

    public NotificationService(NotificationRepository notificationRepo,
                               UserRepository userRepo,
                               FirebaseMessagingService firebaseMessagingService) {
        this.notificationRepo = notificationRepo;
        this.userRepo = userRepo;
        this.firebaseMessagingService = firebaseMessagingService;
    }

    // --------------- CREATE NOTIFICATION ---------------
    public void notifyUser(String userId,
                           String fromUserId,
                           String type,
                           String message,
                           String referenceId) {

        Notification n = new Notification();
        n.setUserId(userId);
        n.setFromUserId(fromUserId);
        n.setType(type);
        n.setMessage(message);
        n.setReferenceId(referenceId);
        n.setCreatedAt(System.currentTimeMillis());
        n.setRead(false);

        User fromUser = userRepo.findById(fromUserId).orElse(null);
        if (fromUser != null) {
            n.setFromUsername(fromUser.getUsername());
        }

        notificationRepo.save(n);

        // ---- send push via Firebase, if user has a token ----
        User target = userRepo.findById(userId).orElse(null);
        if (target != null && target.getFcmToken() != null) {
            try {
                firebaseMessagingService.sendToToken(
                        target.getFcmToken(),
                        type,          // title
                        message        // body
                );
            } catch (Exception e) {
                // log and continue; do not break request flow
                e.printStackTrace();
            }
        }
    }

    // --------------- GET NOTIFICATIONS FOR CURRENT USER ---------------
    public List<Notification> getForUser(String userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // --------------- MARK ALL AS READ ----------------
    public void markAllRead(String userId) {
        List<Notification> list = notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
        for (Notification n : list) {
            if (!n.isRead()) {
                n.setRead(true);
            }
        }
        notificationRepo.saveAll(list);
    }

    // --------------- NOTIFY FOLLOWERS OF NEW POST ---------------
    public void notifyFollowersOfNewPost(User author, Post post) {

    for (String followerId : author.getFollowers()) {
        notifyUser(
                followerId,
                author.getId(),
                "NEW_POST",
                author.getUsername() + " posted a new update",
                post.getId());
        }
    }
}
