export async function login(credentials) {
  let response;

  try {
    response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(credentials)
    });
  } catch {
    throw new Error("Không kết nối được backend. Hãy chạy Spring Boot ở cổng 8080 trước.");
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || payload?.error || "Đăng nhập không thành công.";
    throw new Error(message);
  }

  return payload.data;
}
