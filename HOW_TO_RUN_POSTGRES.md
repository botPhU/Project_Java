# Cách Chạy PostgreSQL Cho Dự Án

## 1. Mục đích

File này hướng dẫn team chạy backend với PostgreSQL thay vì H2 in-memory.

Repo hiện hỗ trợ 2 cách chạy:

- `default profile`: dùng `H2` để demo nhanh
- `postgres profile`: dùng `PostgreSQL` để làm việc với database thực tế hơn

## 2. Các file liên quan

Backend đã có sẵn các file:

- `backend/src/main/resources/application-postgres.yml`
- `backend/src/main/resources/schema-postgres.sql`
- `backend/src/main/resources/data-postgres.sql`
- `docker-compose.yml`

## 3. Yêu cầu

Cần có một trong hai:

- `Docker Desktop`
- hoặc `PostgreSQL` cài trực tiếp trên máy

Nếu chỉ muốn chạy nhanh và thống nhất với team, nên dùng `Docker`.

## 4. Cách chạy bằng Docker

Từ thư mục gốc của repo:

```powershell
docker compose up -d
```

Thông tin database mặc định:

- `host`: `localhost`
- `port`: `5432`
- `database`: `scientific_journal`
- `username`: `postgres`
- `password`: `postgres`

## 5. Chạy backend với profile postgres

Đi vào thư mục backend:

```powershell
cd backend
```

Chạy bằng Maven:

```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=postgres"
```

## 6. Nếu muốn đổi thông số kết nối

Có thể set biến môi trường trước khi chạy:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/scientific_journal"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
mvn spring-boot:run "-Dspring-boot.run.profiles=postgres"
```

## 7. Nếu cài PostgreSQL thủ công

Tạo database tên:

```sql
scientific_journal
```

Sau đó chạy backend bằng profile `postgres` với đúng `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.

## 8. Schema và seed data

Khi chạy profile `postgres`, backend sẽ dùng:

- `schema-postgres.sql` để tạo bảng
- `data-postgres.sql` để nạp dữ liệu mẫu

Dữ liệu mẫu gồm:

- roles
- users demo
- journals
- authors
- keywords
- research topics
- research papers
- paper-author / paper-keyword / paper-topic
- bookmark
- notification
- publication trends
- api data sources

## 9. Reset database nếu từng chạy schema cũ

Nếu đã chạy Docker với schema cũ trước đó, nên reset volume:

```powershell
docker compose down -v
docker compose up -d
```

## 10. Cách kiểm tra nhanh

Sau khi backend chạy bằng profile `postgres`, có thể test nhanh:

- backend health
- đăng nhập bằng user demo
- search paper
- gọi trend endpoint

Một số user demo seed sẵn:

- `admin / 123456`
- `student01 / 123456`
- `researcher01 / 123456`

## 11. Lưu ý cho team

- Nếu đang làm frontend hoặc service layer, nên pull `main` mới nhất trước
- Nếu branch của bạn đang dùng entity cũ, hãy merge `main` trước khi code tiếp
- `postgres` là lựa chọn nên dùng khi làm việc nhóm để tránh lệch dữ liệu giữa các máy
