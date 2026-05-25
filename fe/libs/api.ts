export const api = async (
  url: string,
  options: RequestInit = {}
) => {

  // lấy token từ localStorage
  const token =
    localStorage.getItem("token");

  // gọi fetch với headers mới
  return fetch(url, {
    ...options,

    headers: {
      "Content-Type":
        "application/json",

      // gửi JWT lên backend
      Authorization:
        `Bearer ${token}`,

      // giữ lại headers cũ nếu có
      ...options.headers,
    },
  });
};