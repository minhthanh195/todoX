import { clsx } from "clsx"; 
// clsx giúp viết class có điều kiện
import { twMerge } from "tailwind-merge"
// xử lý xung đột khi gộp nhiều tailwind css khác nhau, kiểm tra xung đột nếu trùng thì sử dụng class được viết sau cùng.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
