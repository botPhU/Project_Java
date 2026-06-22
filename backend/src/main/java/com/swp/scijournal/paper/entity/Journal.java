package com.swp.scijournal.paper.entity;

import com.swp.scijournal.common.model.BaseEntity;
import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "journals")
public class Journal extends BaseEntity {

    @Column(nullable = false, unique = true, length = 200)
    private String name;

    @Column(length = 50)
    private String issn;

    @Column(length = 255)
    private String publisher;

    @Column(precision = 6, scale = 2)
    private BigDecimal impactFactor;

    @Column(length = 255)
    private String subjectArea;

    @Column(length = 100)
    private String country;

    @Column(length = 500)
    private String websiteUrl;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIssn() {
        return issn;
    }

    public void setIssn(String issn) {
        this.issn = issn;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public BigDecimal getImpactFactor() {
        return impactFactor;
    }

    public void setImpactFactor(BigDecimal impactFactor) {
        this.impactFactor = impactFactor;
    }

    public String getSubjectArea() {
        return subjectArea;
    }

    public void setSubjectArea(String subjectArea) {
        this.subjectArea = subjectArea;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}
