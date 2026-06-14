package com.swp.scijournal.bookmark.dto;

public record BookmarkResponse(
    Long id,
    Long paperId,
    String paperTitle
) {
}
