package com.sheredefine.controller;

import com.sheredefine.model.Opportunity;
import com.sheredefine.repository.OpportunityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"})
public class OpportunityController {

    private final OpportunityRepository opportunityRepository;

    public OpportunityController(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(@PathVariable String id) {
        Optional<Opportunity> opportunity = opportunityRepository.findById(id);
        return opportunity.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Opportunity createOpportunity(@RequestBody Opportunity opportunity) {
        if (opportunity.getId() == null || opportunity.getId().isEmpty()) {
            opportunity.setId("opp-" + System.currentTimeMillis());
        }
        if (opportunity.getStatus() == null || opportunity.getStatus().isEmpty()) {
            opportunity.setStatus("pending");
        }
        if (opportunity.getFeatured() == null) {
            opportunity.setFeatured(false);
        }
        return opportunityRepository.save(opportunity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Opportunity> updateOpportunity(@PathVariable String id, @RequestBody Opportunity opportunityDetails) {
        return opportunityRepository.findById(id)
                .map(opportunity -> {
                    opportunity.setTitle(opportunityDetails.getTitle());
                    opportunity.setCompany(opportunityDetails.getCompany());
                    opportunity.setType(opportunityDetails.getType());
                    opportunity.setCategory(opportunityDetails.getCategory());
                    opportunity.setMode(opportunityDetails.getMode());
                    opportunity.setLocation(opportunityDetails.getLocation());
                    opportunity.setEligibility(opportunityDetails.getEligibility());
                    opportunity.setDeadline(opportunityDetails.getDeadline());
                    opportunity.setSeats(opportunityDetails.getSeats());
                    opportunity.setIsPaid(opportunityDetails.getIsPaid());
                    opportunity.setPrice(opportunityDetails.getPrice());
                    opportunity.setDescription(opportunityDetails.getDescription());
                    opportunity.setExtraDetails(opportunityDetails.getExtraDetails());
                    opportunity.setPosterTemplate(opportunityDetails.getPosterTemplate());
                    opportunity.setPosterUrl(opportunityDetails.getPosterUrl());
                    opportunity.setHostVerificationProof(opportunityDetails.getHostVerificationProof());
                    opportunity.setContactPerson(opportunityDetails.getContactPerson());
                    opportunity.setContactEmail(opportunityDetails.getContactEmail());
                    opportunity.setContactPhone(opportunityDetails.getContactPhone());
                    opportunity.setPosterRelationship(opportunityDetails.getPosterRelationship());
                    opportunity.setLifeStageTags(opportunityDetails.getLifeStageTags());
                    opportunity.setShortDescription(opportunityDetails.getShortDescription());
                    opportunity.setApplicationLink(opportunityDetails.getApplicationLink());
                    opportunity.setDetailsJson(opportunityDetails.getDetailsJson());
                    if (opportunityDetails.getStatus() != null) {
                        opportunity.setStatus(opportunityDetails.getStatus());
                    }
                    if (opportunityDetails.getFeatured() != null) {
                        opportunity.setFeatured(opportunityDetails.getFeatured());
                    }
                    return ResponseEntity.ok(opportunityRepository.save(opportunity));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Opportunity> updateStatus(@PathVariable String id, @RequestParam String status) {
        return opportunityRepository.findById(id)
                .map(opportunity -> {
                    opportunity.setStatus(status);
                    return ResponseEntity.ok(opportunityRepository.save(opportunity));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/featured")
    public ResponseEntity<Opportunity> updateFeatured(
            @PathVariable String id, 
            @RequestParam boolean featured,
            @RequestParam(required = false) String posterTemplate,
            @RequestParam(required = false) String posterUrl) {
        return opportunityRepository.findById(id)
                .map(opportunity -> {
                    opportunity.setFeatured(featured);
                    if (posterTemplate != null) {
                        opportunity.setPosterTemplate(posterTemplate);
                    }
                    if (posterUrl != null) {
                        opportunity.setPosterUrl(posterUrl);
                    }
                    return ResponseEntity.ok(opportunityRepository.save(opportunity));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable String id) {
        if (opportunityRepository.existsById(id)) {
            opportunityRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
