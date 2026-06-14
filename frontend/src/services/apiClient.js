export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status ?? null;
    this.code = options.code ?? null;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

async function parsePayload(response) {
  return response.json().catch(() => null);
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    defaultErrorMessage = "Không thể tải dữ liệu từ máy chủ."
  } = options;

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...headers
      },
      body
    });
  } catch {
    throw new ApiError("Không kết nối được backend. Hãy chạy Spring Boot ở cổng 8080 trước.", {
      code: "NETWORK_ERROR",
      isNetworkError: true
    });
  }

  const payload = await parsePayload(response);

  if (!response.ok) {
    throw new ApiError(payload?.message || payload?.error || defaultErrorMessage, {
      status: response.status,
      code: payload?.code || `HTTP_${response.status}`
    });
  }

  return payload;
}

export function apiGet(path, options = {}) {
  return apiRequest(path, {
    ...options,
    method: "GET"
  });
}

export function apiPost(path, data, options = {}) {
  return apiRequest(path, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    body: JSON.stringify(data)
  });
}

export function shouldUseDemoFallback(error) {
  return error instanceof ApiError && (error.isNetworkError || error.status === 404 || error.status >= 500);
}
