# Ứng dụng Quản lý Kho Hàng

Ứng dụng quản lý kho hàng được phát triển để giúp các cửa hàng nhỏ quản lý hàng hóa dễ dàng trên điện thoại. Dự án sử dụng React Native cho giao diện di động, Express.js cho backend, và file JSON để lưu dữ liệu. Hãy làm theo các bước dưới đây để cài đặt và chạy dự án!

## Yêu cầu hệ thống
- **Node.js** (phiên bản 14.x hoặc cao hơn)
- **npm** (đi kèm Node.js)
- **Expo CLI** (cho frontend React Native)
- **Visual Studio Code** (khuyến nghị để chỉnh sửa mã nguồn)
- Thiết bị di động hoặc emulator (Android/iOS) để chạy ứng dụng
- Kết nối internet để cài đặt thư viện và test API

## Cài đặt và Chạy Dự án

### 1. Cài đặt môi trường
- Tải và cài đặt [Node.js](https://nodejs.org/) nếu chưa có.
- Cài đặt Expo CLI bằng lệnh:
  ```bash
  npm install -g expo-cli
  ```
- Cài đặt Git để quản lý mã nguồn (tùy chọn):
  ```bash
  git clone https://github.com/[ten-nguoi-dung]/inventory-app.git
  ```

### 2. Chạy Backend (Express.js)
- Vào thư mục backend:
  ```bash
  cd src
  ```
- Cài đặt các thư viện cần thiết:
  ```bash
  npm install express jsonwebtoken cors fs
  ```
- Chuẩn bị file JSON:
  - Tạo file `inventory_db.json` và `users_db.json` trong thư mục `src` (hoặc sao chép từ mẫu nếu có).
  - Ví dụ nội dung `users_db.json`:
    ```json
    [{"email": "user01@gmail.com", "password": "123456"}]
    ```
  - Ví dụ nội dung `inventory_db.json`:
    ```json
    [{"id": "1", "name": "Item 1", "price": 10000, "quantity": 10}]
    ```
- Chạy server:
  ```bash
  npm run start
  ```
- Server sẽ chạy trên cổng 3000 (http://localhost:3000). Kiểm tra API bằng Postman hoặc trình duyệt.

### 3. Chạy Frontend (React Native)
- Vào thư mục frontend:
  ```bash
  cd app
  ```
- Cài đặt các thư viện:
  ```bash
  npm install
  ```
- Cài đặt thêm thư viện cần thiết:
  ```bash
  expo install axios react-navigation react-native-gesture-handler
  ```
- Chạy ứng dụng:
  ```bash
  npx expo start
  ```
- Mở ứng dụng trên:
  - Thiết bị thực: Quét mã QR bằng ứng dụng Expo Go trên điện thoại.
  - Emulator: Chọn "Run on Android emulator" hoặc "Run on iOS simulator" trong terminal.

### 4. Kết nối và Sử dụng
- Đảm bảo backend (http://localhost:3000) và frontend kết nối với nhau.
- Đăng nhập với email "user01@gmail.com" và mật khẩu "123456" (hoặc chỉnh sửa trong `users_db.json`).
- Thử các chức năng: xem danh sách, thêm, chỉnh sửa, xóa hàng hóa.

## Lưu ý Quan trọng
- **Sao lưu file JSON**: Luôn sao lưu `inventory_db.json` và `users_db.json` định kỳ để tránh mất dữ liệu.
- **CORS**: Đảm bảo cấu hình CORS trong `index.js` cho phép truy cập từ địa chỉ Expo (ví dụ: `http://localhost:19006`).
- **Bảo mật**: Mật khẩu trong `users_db.json` chưa mã hóa, nên chỉ dùng trong môi trường test. Sử dụng mã hóa (như bcrypt) trước khi triển khai thực tế.
- **Mạng**: Kiểm tra kết nối internet ổn định khi chạy trên thiết bị thực.

## Giải quyết vấn đề
- Nếu gặp lỗi cài đặt, kiểm tra phiên bản Node.js và Expo CLI.
- Nếu API không hoạt động, đảm bảo server backend đang chạy và cổng 3000 không bị chặn.

## Liên hệ
Nếu cần hỗ trợ, vui lòng liên hệ [102230328@sv1.dut.udn.vn] để được giúp đỡ!

Chúc bạn thành công khi chạy dự án!
