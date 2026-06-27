# Hệ thống Theo Dõi Xu Hướng Công Bố Tạp Chí Khoa Học

## 1. Giới thiệu

Đây là bộ khung mã nguồn cho đề tài `Scientific Journal Publication Trend Tracking System`.
Hệ thống được xây dựng theo mô hình web application, gồm:

- `backend`: Java Spring Boot cung cấp REST API, xử lý nghiệp vụ và đồng bộ dữ liệu học thuật
- `frontend`: React + Vite cung cấp giao diện tìm kiếm, dashboard và quản trị

Mục tiêu của hệ thống là giúp người dùng:

- tìm kiếm bài báo khoa học từ các nguồn công khai
- theo dõi xu hướng công bố theo từ khóa, chủ đề, tạp chí và thời gian
- xem dashboard thống kê trực quan
- lưu bookmark, theo dõi topic hoặc journal
- nhận thông báo khi có bài báo mới liên quan

## 2. Cấu trúc thư mục

```text
project_Java
|-- backend
|   |-- pom.xml
|   |-- ARCHITECTURE.md
|   `-- src
|-- frontend
|   |-- package.json
|   |-- vite.config.js
|   `-- src
|-- ARCHITECTURE.md
|-- docker-compose.yml
`-- README.md
```

## 3. Công nghệ sử dụng

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL cho database chính thức của dự án

### Frontend

- React
- Vite
- CSS thuần

## 4. Chức năng chính theo đề tài

- Đăng ký, đăng nhập, phân quyền người dùng
- Tìm kiếm bài báo theo keyword, author, journal
- Xem chi tiết bài báo
- Theo dõi xu hướng công bố theo keyword hoặc topic
- Hiển thị dashboard thống kê
- Theo dõi các chủ đề nổi bật
- Bookmark bài báo và từ khóa
- Follow journal hoặc topic
- Nhận thông báo về bài báo mới
- Đồng bộ metadata từ OpenAlex, Crossref, Semantic Scholar
- Quản trị người dùng và cấu hình hệ thống

## 5. Hướng chạy dự án

### 5.1. Chạy backend

Đi tới thư mục:

```powershell
cd backend
```

Chạy database bằng Docker:

```powershell
docker compose up -d
```

Chạy backend:

```powershell
mvn spring-boot:run
```

Nếu dùng IDE như IntelliJ IDEA hoặc VS Code, có thể chạy class:

- `com.swp.scijournal.ScientificJournalApplication`

### 5.1.1. Cấu hình PostgreSQL mặc định

Repo đã được dọn về một luồng duy nhất với PostgreSQL:

- `backend/src/main/resources/application.yml`
- `backend/src/main/resources/schema-postgres.sql`
- `backend/src/main/resources/data-postgres.sql`

Database mặc định:

- `host`: `localhost`
- `port`: `5432`
- `database`: `scientific_journal`
- `username`: `postgres`
- `password`: `postgres`

Hoặc set biến môi trường nếu muốn đổi kết nối:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/scientific_journal"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
mvn spring-boot:run
```

Ghi chú:

- Backend mặc định kết nối PostgreSQL và dùng schema cùng seed data trong `resources` để khởi tạo dữ liệu.
- Nếu đã từng chạy schema cũ, nên xóa volume Docker cũ trước khi chạy lại:

```powershell
docker compose down -v
docker compose up -d
```

### 5.2. Chạy frontend

Đi tới thư mục:

```powershell
cd frontend
```

Cài dependencies:

```powershell
npm install
```

Chạy môi trường phát triển:

```powershell
npm run dev
```

## 6. Các cổng mặc định

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432`

## 7. Lộ trình triển khai đề xuất

### Giai đoạn 1

- Xây dựng xác thực và phân quyền
- Hoàn thiện module tìm kiếm bài báo
- Hoàn thiện trang chi tiết bài báo

### Giai đoạn 2

- Đồng bộ dữ liệu từ OpenAlex
- Xây dựng dashboard cơ bản
- Xây dựng phân tích xu hướng theo năm và theo từ khóa

### Giai đoạn 3

- Bookmark và follow
- Notification
- Báo cáo
- Trang quản trị

## 8. Tài liệu kiến trúc

Xem thêm:

- [Kiến trúc tổng thể](./ARCHITECTURE.md)
- [Kiến trúc backend](./backend/ARCHITECTURE.md)

## 9. Ghi chú

- Bộ khung hiện tại được tối ưu cho mục đích đồ án và phát triển theo nhóm
- Backend hiện vẫn là skeleton nghiệp vụ ở một số module, nhưng toàn bộ luồng chạy đã thống nhất về PostgreSQL để cả team làm việc cùng một chuẩn dữ liệu
- Frontend hiện là khung giao diện ban đầu để nhóm phát triển tiếp các màn hình chính
- Database PostgreSQL đã được tách thành `schema + seed data` riêng để hỗ trợ triển khai và test ổn định hơn
