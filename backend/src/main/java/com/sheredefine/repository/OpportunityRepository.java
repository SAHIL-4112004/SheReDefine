package com.sheredefine.repository;

import com.sheredefine.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, String> {
    List<Opportunity> findByFeaturedTrue();
    List<Opportunity> findByStatus(String status);
}
