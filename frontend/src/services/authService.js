import { ApiError, apiPost } from "./apiClient";

function normalizeUser(user) {
  return {
    id: user.id ?? user.userId,
    username: user.username,
    fullName: user.fullName ?? user.username,
    role: user.role,
    authMode: "backend",
    basicAuthToken: user.basicAuthToken ?? null
  };
}

function createBasicAuthToken(username, password) {
  const credentials = `${username}:${password}`;
  const bytes = new TextEncoder().encode(credentials);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return window.btoa(binary);
}

export async function login(credentials) {
  const trimmedCredentials = {
    username: credentials.username.trim(),
    password: credentials.password
  };

  const payload = await apiPost("/api/v1/auth/login", trimmedCredentials, {
    defaultErrorMessage: "Đăng nhập không thành công."
  });

  return normalizeUser({
    ...(payload.data ?? payload),
    basicAuthToken: createBasicAuthToken(trimmedCredentials.username, trimmedCredentials.password)
  });
}

export async function register(payload) {
  const registerPayload = {
    username: payload.username.trim(),
    email: payload.email.trim(),
    password: payload.password,
    fullName: payload.fullName.trim(),
    role: payload.role,
    institution: payload.institution?.trim() || "",
    researchInterests: payload.researchInterests?.trim() || ""
  };

  try {
    const response = await apiPost("/api/v1/auth/register", registerPayload, {
      defaultErrorMessage: "Đăng ký không thành công."
    });

    return response.data ?? response;
  } catch (error) {
    if (error instanceof ApiError && error.isNetworkError) {
      throw new ApiError("Không thể tạo tài khoản vào lúc này. Vui lòng thử lại sau.", {
        code: error.code,
        isNetworkError: true
      });
    }

    throw error;
  }
}
