"use client"; // Bắt buộc phải có dòng này ở trên cùng

import { Provider } from "react-redux";
import store from "@/stores/store"; // Đường dẫn đến file store.ts bạn đã tạo

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}