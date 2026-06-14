import { demoUsers } from "../data/demoData";
import { apiPost, shouldUseDemoFallback } from "./apiClient";

function getRoleLabel(role) {
  switch (role) {
    case "ADMIN":
      return "Quản trị hệ thống";
    case "LECTURER_STUDENT":
      return "Giảng viên / Sinh viên";
    case "RESEARCHER":
      return "Nhà nghiên cứu";
    default:
      return role;
  }
}

function normalizeUser(user, authMode = "backend") {
  return {
    id: user.id,
    username: user.username,
    fullName: user.fullName ?? user.username,
    role: user.role,
    authMode
  };
}

export function getDemoAccounts() {
  return demoUsers.map((user) => ({
    username: user.username,
    password: user.password,
    label: `${user.fullName} - ${getRoleLabel(user.role)}`,
    role: user.role
  }));
}

export async function login(credentials) {
  const trimmedCredentials = {
    username: credentials.username.trim(),
    password: credentials.password
  };

  try {
    const payload = await apiPost("/api/v1/auth/login", trimmedCredentials, {
      defaultErrorMessage: "Đăng nhập không thành công."
    });
    return normalizeUser(payload.data ?? payload, "backend");
  } catch (error) {
    if (shouldUseDemoFallback(error)) {
      const matchedUser = demoUsers.find((user) => (
        user.username === trimmedCredentials.username &&
        user.password === trimmedCredentials.password
      ));

      if (matchedUser) {
        return normalizeUser(matchedUser, "demo");
      }
    }

    throw error;
  }
}
