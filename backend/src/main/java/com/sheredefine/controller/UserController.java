package com.sheredefine.controller;

import com.sheredefine.model.User;
import com.sheredefine.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"})
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        
        String email = user.getEmail().toLowerCase();
        Optional<User> existingUser = userRepository.findByEmailAndRole(email, user.getRole());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("An account with this email is already registered.");
        }

        user.setEmail(email);
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            String nameClean = user.getName() != null ? user.getName().toLowerCase().replaceAll("[^a-z0-9]", "") : "user";
            user.setUsername(nameClean + "_" + (100 + (int)(Math.random() * 900)));
        }
        if (user.getIsVerified() == null) {
            user.setIsVerified(true);
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getUsername() == null || loginRequest.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Email/Username is required.");
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required.");
        }
        if (loginRequest.getRole() == null || loginRequest.getRole().isEmpty()) {
            return ResponseEntity.badRequest().body("Role is required.");
        }

        String usernameOrEmail = loginRequest.getUsername().toLowerCase();
        
        // Find user by email or username
        Optional<User> userOpt = userRepository.findByEmailAndRole(usernameOrEmail, loginRequest.getRole());
        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByUsername(usernameOrEmail);
        }

        if (!userOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Account not found. Please register first.");
        }

        User user = userOpt.get();
        if (!user.getRole().equalsIgnoreCase(loginRequest.getRole())) {
            return ResponseEntity.badRequest().body("Role mismatch. This account is registered as a " + user.getRole() + ".");
        }
        
        if (!loginRequest.getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password. Please try again.");
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User profileData) {
        if (profileData.getEmail() == null || profileData.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required for updating profile.");
        }

        String email = profileData.getEmail().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmailAndRole(email, profileData.getRole() != null ? profileData.getRole() : "participant");
        if (!userOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        
        // Update user fields
        if (profileData.getName() != null) user.setName(profileData.getName());
        if (profileData.getFirstName() != null) user.setFirstName(profileData.getFirstName());
        if (profileData.getLastName() != null) user.setLastName(profileData.getLastName());
        if (profileData.getPhone() != null) user.setPhone(profileData.getPhone());
        if (profileData.getGender() != null) user.setGender(profileData.getGender());
        if (profileData.getDob() != null) user.setDob(profileData.getDob());
        if (profileData.getCategory() != null) user.setCategory(profileData.getCategory());
        if (profileData.getProfilePhoto() != null) user.setProfilePhoto(profileData.getProfilePhoto());
        if (profileData.getProfileDetailsJson() != null) user.setProfileDetailsJson(profileData.getProfileDetailsJson());
        
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // Helper login request DTO
    public static class LoginRequest {
        private String username; // can be email or username
        private String password;
        private String role; // "participant", "host"

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}
