package com.sheredefine.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Opportunity {
    @Id
    private String id;
    private String title;
    private String company;
    private String type;
    private String category;
    private String mode;
    private String location;
    private String eligibility;
    private String deadline;
    private Integer seats;
    private Boolean isPaid;
    private String price;
    
    @Lob
    private String description;
    
    private String status; // "pending", "approved"
    private Boolean featured;
    private String extraDetails;
    private String posterTemplate; // "tech-blue", "sunset-rose", "emerald-green", "luxury-purple"
    private String posterUrl;
    private String logoUrl;

    private String hostVerificationProof;
    private String contactPerson;
    private String contactEmail;
    private String contactPhone;
    private String posterRelationship;
    private String lifeStageTags;
    private String shortDescription;
    private String applicationLink;

    @Lob
    private String detailsJson;

    // Getters and Setters
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public Boolean getIsPaid() { return isPaid; }
    public void setIsPaid(Boolean isPaid) { this.isPaid = isPaid; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public String getExtraDetails() { return extraDetails; }
    public void setExtraDetails(String extraDetails) { this.extraDetails = extraDetails; }

    public String getPosterTemplate() { return posterTemplate; }
    public void setPosterTemplate(String posterTemplate) { this.posterTemplate = posterTemplate; }

    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }

    public String getHostVerificationProof() { return hostVerificationProof; }
    public void setHostVerificationProof(String hostVerificationProof) { this.hostVerificationProof = hostVerificationProof; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getPosterRelationship() { return posterRelationship; }
    public void setPosterRelationship(String posterRelationship) { this.posterRelationship = posterRelationship; }

    public String getLifeStageTags() { return lifeStageTags; }
    public void setLifeStageTags(String lifeStageTags) { this.lifeStageTags = lifeStageTags; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getApplicationLink() { return applicationLink; }
    public void setApplicationLink(String applicationLink) { this.applicationLink = applicationLink; }

    public String getDetailsJson() { return detailsJson; }
    public void setDetailsJson(String detailsJson) { this.detailsJson = detailsJson; }
}
