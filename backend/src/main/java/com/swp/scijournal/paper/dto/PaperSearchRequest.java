package com.swp.scijournal.paper.dto;

public record PaperSearchRequest(
    String keyword,
    String author,
    String journal,
    Integer year,
    Integer page,
    Integer size
) {
}
