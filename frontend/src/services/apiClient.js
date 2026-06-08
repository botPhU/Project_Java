const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json"
    }
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || payload?.error || "Không thể tải dữ liệu từ máy chủ.";
    throw new Error(message);
  }

  return payload;
}
