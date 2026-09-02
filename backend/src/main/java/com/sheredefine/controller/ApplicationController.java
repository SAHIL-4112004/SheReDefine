package com.sheredefine.controller;

import com.sheredefine.model.Application;
import com.sheredefine.repository.ApplicationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"})
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        if (application.getId() == null || application.getId().isEmpty()) {
            application.setId("app-" + System.currentTimeMillis());
        }
        if (application.getStatus() == null || application.getStatus().isEmpty()) {
            application.setStatus("Applied");
        }
        return applicationRepository.save(application);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable String id, @RequestParam String status) {
        return applicationRepository.findById(id)
                .map(application -> {
                    application.setStatus(status);
                    return ResponseEntity.ok(applicationRepository.save(application));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
