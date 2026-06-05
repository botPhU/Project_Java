# Kiến Trúc Backend

## 1. Mục tiêu

Backend của hệ thống được thiết kế để:

- cung cấp REST API cho frontend
- xử lý nghiệp vụ tìm kiếm và phân tích xu hướng
- đồng bộ metadata từ nguồn học thuật công khai
- đảm bảo dễ chia module cho nhóm phát triển
- phù hợp với phạm vi đồ án Java Spring Boot

## 2. Công nghệ nền

- Java 17
- Spring Boot 3
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- Scheduler của Spring

## 3. Kiểu kiến trúc

Backend sử dụng kiến trúc:

- `Modular Monolith`

Kết hợp với cách tổ chức mã nguồn:

- `package-by-feature`

Điều này có nghĩa là mỗi nhóm chức năng sẽ có package riêng, thay vì gom toàn bộ `controller`, `service`, `repository` của toàn dự án vào một chỗ.

## 4. Lý do chọn kiến trúc này

- dễ đọc và dễ bảo trì
- phù hợp với quy mô đồ án
- dễ chia việc theo module
- dễ nâng cấp dần sang kiến trúc tách dịch vụ nếu cần

## 5. Các module chính

### 5.1. `common`

Chứa phần dùng chung toàn hệ thống:

- cấu hình
- model cơ sở
- response chung
- exception chung

### 5.2. `auth`

Chứa:

- đăng ký
- đăng nhập
- phân quyền
- kiểm tra thông tin xác thực

### 5.3. `user`

Chứa:

- hồ sơ người dùng
- quản lý tài khoản
- quản lý quyền truy cập ở mức người dùng

### 5.4. `paper`

Chứa:

- metadata bài báo
- tìm kiếm bài báo
- xem chi tiết bài báo
- lọc theo keyword, author, journal, năm

### 5.5. `trend`

Chứa:

- thống kê số bài báo theo thời gian
- thống kê keyword nổi bật
- thống kê journal nổi bật
- topic đang tăng trưởng

### 5.6. `dashboard`

Chứa:

- API tổng hợp dữ liệu cho trang dashboard
- các chỉ số nhanh và dữ liệu biểu đồ

### 5.7. `bookmark`

Chứa:

- bookmark bài báo
- lưu keyword
- follow topic
- follow journal

### 5.8. `notification`

Chứa:

- thông báo nội bộ
- đánh dấu đã đọc
- lọc thông báo theo người dùng

### 5.9. `datasource`

Chứa adapter tích hợp các nguồn ngoài:

- OpenAlex
- Crossref
- Semantic Scholar

Mỗi nguồn nên có:

- lớp gọi API
- lớp ánh xạ dữ liệu
- lớp chuyển về model chung của hệ thống

### 5.10. `sync`

Chứa:

- job đồng bộ theo lịch
- dịch vụ chuẩn hóa metadata
- xử lý cập nhật dữ liệu vào cơ sở dữ liệu

### 5.11. `admin`

Chứa:

- quản trị người dùng
- cấu hình nguồn dữ liệu
- chạy đồng bộ thủ công
- theo dõi cấu hình hệ thống

## 6. Cấu trúc package khuyến nghị

```text
com.swp.scijournal
|-- common
|   |-- config
|   |-- exception
|   |-- model
|   `-- web
|-- auth
|   |-- controller
|   |-- dto
|   |-- service
|   `-- repository
|-- user
|-- paper
|   |-- controller
|   |-- dto
|   |-- entity
|   |-- repository
|   `-- service
|-- trend
|-- dashboard
|-- bookmark
|-- notification
|-- datasource
|   |-- openalex
|   |-- crossref
|   `-- semanticscholar
|-- sync
|   |-- job
|   `-- service
`-- admin
```

## 7. Các thực thể cốt lõi

- `User`
- `Role`
- `ResearchPaper`
- `Author`
- `Journal`
- `Keyword`
- `ResearchTopic`
- `Bookmark`
- `FollowTarget`
- `Notification`
- `ApiDataSource`
- `PublicationTrend`

## 8. Quan hệ dữ liệu chính

- `ResearchPaper` và `Author`: nhiều nhiều
- `ResearchPaper` và `Keyword`: nhiều nhiều
- `ResearchPaper` và `Journal`: nhiều một
- `User` và `Bookmark`: một nhiều
- `User` và `FollowTarget`: một nhiều
- `PublicationTrend` lưu dữ liệu tổng hợp theo `keyword`, `topic` hoặc `journal`

## 9. Luồng xử lý backend quan trọng

### 9.1. Tìm kiếm bài báo

Luồng:

`Frontend -> PaperController -> PaperService -> PaperRepository -> Database`

### 9.2. Đồng bộ metadata

Luồng:

`Scheduler -> AcademicSyncJob -> SyncService -> DatasourceAdapter -> Database`

Bước xử lý:

1. gọi API ngoài
2. chuyển về model dữ liệu chung
3. chuẩn hóa metadata
4. cập nhật bảng paper, author, journal, keyword
5. cập nhật bảng trend

### 9.3. Hiển thị dashboard

Luồng:

`Frontend -> DashboardController/TrendController -> Service -> PublicationTrend`

Không nên tính toàn bộ biểu đồ trực tiếp từ bảng bài báo mỗi lần gọi API nếu dữ liệu lớn.

## 10. Quy tắc phát triển mã nguồn

- controller chỉ xử lý request và response
- service chứa nghiệp vụ
- repository chỉ truy vấn dữ liệu
- entity không dùng trực tiếp làm response ra ngoài
- DTO phải tách biệt với entity
- mapper nên tách riêng khi logic ánh xạ phức tạp
- tránh để module này truy cập trực tiếp sâu vào module khác nếu không cần thiết

## 11. API nên ưu tiên triển khai

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/papers`
- `GET /api/v1/papers/{id}`
- `GET /api/v1/trends/keywords/{keyword}`
- `GET /api/v1/dashboard/overview`
- `POST /api/v1/bookmarks/papers/{paperId}`
- `POST /api/v1/follows/topics/{topicId}`
- `GET /api/v1/notifications`
- `POST /api/v1/admin/sync/run`

## 12. Định hướng triển khai theo giai đoạn

### Giai đoạn 1

- auth
- user
- paper search
- paper detail

### Giai đoạn 2

- sync từ OpenAlex
- trend theo năm
- dashboard cơ bản

### Giai đoạn 3

- bookmark và follow
- notification
- admin
- report

## 13. Ghi chú thực tế

- chỉ nên đồng bộ một số lĩnh vực như Computer Science hoặc AI ở giai đoạn đầu
- nên bắt đầu với một nguồn dữ liệu chính là OpenAlex
- cần có log hoặc bảng lịch sử sync để dễ debug
- hệ thống không cần realtime, nên ưu tiên batch processing định kỳ
