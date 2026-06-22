package com.example.demo.controller;

import com.example.demo.service.FcmService;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/push")
public class PushNotificationController {

    private final FcmService fcmService;

    public PushNotificationController(FcmService fcmService) {
        this.fcmService = fcmService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendPush(
            @RequestParam String token,
            @RequestParam String title,
            @RequestParam String body) {
        try {
            fcmService.sendNotification(token, title, body);
            return ResponseEntity.ok("Notification sent successfully");
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error sending notification: " + e.getMessage());
        }
    }
}
