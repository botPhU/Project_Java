package com.swp.scijournal.paper.entity;

import com.swp.scijournal.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "authors")
public class Author extends BaseEntity {

    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Column(length = 255)
    private String affiliation;

    @Column(length = 100)
    private String country;

    @Column(length = 255)
    private String externalAuthorId;

    private Integer hIndex;

    private Integer totalCitations;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getExternalAuthorId() {
        return externalAuthorId;
    }

    public void setExternalAuthorId(String externalAuthorId) {
        this.externalAuthorId = externalAuthorId;
    }

    public Integer getHIndex() {
        return hIndex;
    }

    public void setHIndex(Integer hIndex) {
        this.hIndex = hIndex;
    }

    public Integer getTotalCitations() {
        return totalCitations;
    }

    public void setTotalCitations(Integer totalCitations) {
        this.totalCitations = totalCitations;
    }
}
