package com.sheredefine.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    private String id;
    
    private String opportunityId;
    private String opportunityTitle;
    private String company;
    private String candidateName;
    private String email;
    private String phone;
    private String resume;
    
    @Lob
    private String coverNote;
    
    private String status; // "Applied", "Shortlisted", "Rejected", etc.
    private String appliedAt;
    
    @Lob
    private String submittedDetailsJson; // Candidate full snapshot details on submit

    // Constructors
    public Application() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOpportunityId() { return opportunityId; }
    public void setOpportunityId(String opportunityId) { this.opportunityId = opportunityId; }

    public String getOpportunityTitle() { return opportunityTitle; }
    public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getResume() { return resume; }
    public void setResume(String resume) { this.resume = resume; }

    public String getCoverNote() { return coverNote; }
    public void setCoverNote(String coverNote) { this.coverNote = coverNote; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAppliedAt() { return appliedAt; }
    public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }

    public String getSubmittedDetailsJson() { return submittedDetailsJson; }
    public void setSubmittedDetailsJson(String submittedDetailsJson) { this.submittedDetailsJson = submittedDetailsJson; }
}
