# Kiến Trúc Tổng Thể Hệ Thống

## 1. Mục tiêu kiến trúc

Kiến trúc của hệ thống được thiết kế để đáp ứng các yêu cầu sau:

- dễ triển khai trong phạm vi đồ án
- dễ chia việc cho nhiều thành viên
- dễ mở rộng thêm chức năng sau này
- đủ rõ ràng để viết báo cáo và thuyết trình
- phù hợp với yêu cầu backend bắt buộc dùng Java Spring Boot

## 2. Mô hình tổng thể

Hệ thống được tổ chức theo mô hình:

- `Frontend - Backend - Database - External APIs`

Luồng tổng quát:

1. Người dùng thao tác trên frontend
2. Frontend gọi REST API của backend
3. Backend xử lý nghiệp vụ và truy cập cơ sở dữ liệu
4. Backend đồng bộ metadata từ các nguồn học thuật bên ngoài theo lịch
5. Backend trả dữ liệu tổng hợp về frontend để hiển thị dashboard, biểu đồ và danh sách bài báo

## 3. Các thành phần chính

### 3.1. Frontend

Frontend chịu trách nhiệm:

- hiển thị giao diện người dùng
- tìm kiếm bài báo
- hiển thị dashboard và biểu đồ
- hiển thị danh sách bookmark, follow, notification
- cung cấp giao diện quản trị cho admin

Frontend nên gọi backend qua các API `/api/v1/**`.

### 3.2. Backend

Backend chịu trách nhiệm:

- xác thực và phân quyền
- quản lý tài khoản người dùng
- tìm kiếm và tra cứu metadata bài báo
- phân tích xu hướng công bố
- tổng hợp dữ liệu dashboard
- đồng bộ dữ liệu từ academic APIs
- gửi notification nội bộ
- cung cấp API cho admin

### 3.3. Cơ sở dữ liệu

Cơ sở dữ liệu dùng để lưu:

- người dùng
- bài báo khoa học
- tác giả
- journal
- keyword
- research topic
- bookmark
- follow target
- notification
- dữ liệu trend tổng hợp
- cấu hình nguồn đồng bộ

### 3.4. Nguồn dữ liệu bên ngoài

Các nguồn dữ liệu dự kiến:

- OpenAlex
- Crossref
- Semantic Scholar

Hệ thống chỉ thu thập `metadata`, không xử lý toàn văn bài báo.

## 4. Kiểu kiến trúc đề xuất

### 4.1. Kiến trúc backend

Kiến trúc backend phù hợp nhất cho đề tài này là:

- `Modular Monolith`

Lý do chọn:

- đơn giản hơn microservice
- dễ làm trong thời gian đồ án
- vẫn tách rõ nghiệp vụ theo module
- dễ nâng cấp từng phần sau này

### 4.2. Kiến trúc frontend

Kiến trúc frontend nên theo:

- `component-based architecture`

Tức là tách giao diện thành:

- layout
- pages
- components
- services gọi API
- các khối hiển thị dashboard

## 5. Các module nghiệp vụ

### 5.1. Module xác thực và phân quyền

Chức năng:

- đăng ký
- đăng nhập
- đăng xuất
- phân quyền theo vai trò

Vai trò tối thiểu:

- `RESEARCHER`
- `LECTURER_STUDENT`
- `ADMIN`

### 5.2. Module quản lý người dùng

Chức năng:

- quản lý thông tin hồ sơ
- quản lý trạng thái tài khoản
- xem danh sách người dùng với quyền admin

### 5.3. Module tìm kiếm bài báo

Chức năng:

- tìm kiếm theo keyword
- tìm kiếm theo author
- tìm kiếm theo journal
- lọc theo năm hoặc nguồn dữ liệu
- xem chi tiết bài báo

### 5.4. Module theo dõi xu hướng

Chức năng:

- thống kê số lượng bài báo theo năm
- thống kê top keyword
- thống kê top journal
- phát hiện topic nổi bật
- xem xu hướng theo keyword hoặc topic

### 5.5. Module dashboard

Chức năng:

- hiển thị tổng quan dữ liệu
- hiển thị biểu đồ
- hiển thị các khối số liệu nổi bật
- hiển thị danh sách chủ đề đang tăng trưởng

### 5.6. Module bookmark và follow

Chức năng:

- bookmark bài báo
- lưu keyword quan tâm
- follow journal
- follow topic

### 5.7. Module notification

Chức năng:

- gửi thông báo nội bộ khi có bài báo phù hợp
- đánh dấu đã đọc hoặc chưa đọc

### 5.8. Module đồng bộ dữ liệu

Chức năng:

- gọi academic API định kỳ
- chuẩn hóa metadata
- ghi dữ liệu vào hệ thống
- cập nhật bảng trend tổng hợp

### 5.9. Module quản trị

Chức năng:

- quản lý người dùng
- cấu hình nguồn dữ liệu
- chạy đồng bộ thủ công
- theo dõi trạng thái hệ thống

## 6. Thiết kế dữ liệu mức cao

Các thực thể cốt lõi:

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
- `PublicationTrend`
- `ApiDataSource`

Quan hệ chính:

- một bài báo có nhiều tác giả
- một bài báo có nhiều keyword
- một bài báo thuộc một journal
- một người dùng có nhiều bookmark
- một người dùng có thể follow nhiều topic hoặc journal
- dữ liệu trend lưu theo từng mốc thời gian để hiển thị biểu đồ nhanh hơn

## 7. Luồng xử lý chính

### 7.1. Tìm kiếm bài báo

1. Người dùng nhập từ khóa trên frontend
2. Frontend gọi API tìm kiếm
3. Backend truy vấn cơ sở dữ liệu
4. Backend trả kết quả phân trang
5. Frontend hiển thị danh sách bài báo

### 7.2. Đồng bộ dữ liệu học thuật

1. Scheduler kích hoạt job đồng bộ
2. Backend gọi nguồn dữ liệu bên ngoài
3. Dữ liệu được chuẩn hóa về model chung
4. Hệ thống lưu hoặc cập nhật metadata
5. Hệ thống tính lại dữ liệu trend
6. Hệ thống tạo notification nếu cần

### 7.3. Xem dashboard xu hướng

1. Frontend gọi API dashboard hoặc trend
2. Backend đọc dữ liệu aggregate
3. Backend trả dữ liệu biểu đồ
4. Frontend dựng chart và các thẻ thống kê

## 8. Cấu trúc mã nguồn đề xuất

```text
project_Java
|-- backend
|   `-- src/main/java/com/swp/scijournal
|       |-- common
|       |-- auth
|       |-- user
|       |-- paper
|       |-- trend
|       |-- dashboard
|       |-- bookmark
|       |-- notification
|       |-- datasource
|       |-- sync
|       `-- admin
`-- frontend
    `-- src
        |-- components
        |-- pages
        |-- sections
        |-- services
        `-- styles
```

## 9. Hướng phát triển thực tế

### Ưu tiên 1

- xác thực
- tìm kiếm bài báo
- xem chi tiết bài báo

### Ưu tiên 2

- đồng bộ OpenAlex
- dashboard cơ bản
- thống kê theo năm

### Ưu tiên 3

- bookmark
- follow
- notification
- admin

## 10. Khuyến nghị cho nhóm đồ án

- trước tiên chỉ nên đồng bộ một nguồn chính là OpenAlex
- chỉ nên tập trung vào lĩnh vực Computer Science hoặc AI
- nên lưu sẵn dữ liệu aggregate cho biểu đồ để tránh truy vấn nặng
- nên tách module theo nghiệp vụ để chia việc thuận lợi
- nên hoàn thiện backend core trước rồi mới mở rộng giao diện đẹp hơn
