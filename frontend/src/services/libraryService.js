const SAVED_PAPER_KEY = "sj_tracker_saved_papers";
const FOLLOWED_KEYWORDS_KEY = "sj_tracker_followed_keywords";

function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedPaperIds() {
  return readJson(SAVED_PAPER_KEY);
}

export function isPaperSaved(paperId) {
  return getSavedPaperIds().includes(String(paperId));
}

export function toggleSavedPaper(paperId) {
  const savedIds = getSavedPaperIds();
  const normalizedId = String(paperId);
  const nextValue = savedIds.includes(normalizedId)
    ? savedIds.filter((item) => item !== normalizedId)
    : [...savedIds, normalizedId];

  writeJson(SAVED_PAPER_KEY, nextValue);
  return nextValue.includes(normalizedId);
}

export function getFollowedKeywords() {
  return readJson(FOLLOWED_KEYWORDS_KEY);
}

export function followKeyword(keyword) {
  const followedKeywords = getFollowedKeywords();
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword || followedKeywords.includes(normalizedKeyword)) {
    return followedKeywords;
  }

  const nextValue = [...followedKeywords, normalizedKeyword];
  writeJson(FOLLOWED_KEYWORDS_KEY, nextValue);
  return nextValue;
}
