import { ApiError, apiPost } from "./apiClient";

export async function savePaperBookmark(paperId) {
  const payload = await apiPost(`/api/v1/bookmarks/papers/${paperId}`, null, {
    headers: {},
    defaultErrorMessage: "Không thể lưu bookmark bài báo."
  });

  return payload.data ?? payload;
}

export async function followKeyword(keyword) {
  throw new ApiError(`Backend chưa hỗ trợ API theo dõi keyword "${keyword}".`, {
    code: "FOLLOW_KEYWORD_NOT_SUPPORTED"
  });
}
