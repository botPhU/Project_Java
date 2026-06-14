# Phân Công Chi Tiết Team

Tài liệu này chốt cách làm việc hiện tại của team:

- Bạn là **trưởng nhóm**.
- Bạn là người **phụ trách toàn bộ frontend**.
- **Bảo Huy là lead backend**.
- Tất cả thành viên backend đều có phần code cụ thể, không để vai trò chỉ dừng ở review hoặc test chéo.

## 1. Người phụ trách frontend

| Người phụ trách | Phạm vi |
|---|---|
| Bạn (Trưởng nhóm) | Toàn bộ frontend |

### Các file frontend bạn đang giữ

- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/components/AppLayout.jsx`
- `frontend/src/components/Header.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/components/PublicOnlyRoute.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/PaperSearchPage.jsx`
- `frontend/src/pages/PaperDetailPage.jsx`
- `frontend/src/pages/DashboardPage.jsx`
- `frontend/src/pages/AdminPage.jsx`
- `frontend/src/services/apiClient.js`
- `frontend/src/services/authService.js`
- `frontend/src/services/paperService.js`
- `frontend/src/styles/global.css`
- `frontend/vite.config.js`

### Deliverable frontend của bạn

- route guard hoàn chỉnh
- login flow
- search paper
- paper detail
- dashboard
- trang System Administrator
- responsive cơ bản
- build pass bằng `npm run build`

## 2. Phân công backend theo thành viên

## 2.1. Bảo Huy

### Vai trò chính

- **lead backend**
- giữ kiến trúc chung backend
- review database và entity relationship
- trực tiếp code các phần backend lõi
- chốt chuẩn naming, exception, config dùng chung
- hỗ trợ review và merge các nhánh backend trước khi lên nhánh tích hợp

### Nhánh phụ trách chính

- `backend/trend-dashboard`
- `backend/datasource-sync`

### Nhánh phối hợp và kiểm soát kiến trúc

- `backend/auth-user`
- `backend/paper-search`
- `backend/bookmark-follow`
- `backend/notification`
- `backend/admin-system`

### Module phụ trách

- `common`
- `trend`
- `dashboard`
- `datasource`
- `sync`
- review `auth`, `paper`, `bookmark`, `notification`, `admin`

### File hiện có nên trực tiếp làm / kiểm soát

- `backend/src/main/java/com/swp/scijournal/common/model/BaseEntity.java`
- `backend/src/main/java/com/swp/scijournal/common/web/ApiResponse.java`
- `backend/src/main/java/com/swp/scijournal/common/config/SecurityConfig.java`
- `backend/src/main/resources/application.yml`
- `backend/src/main/java/com/swp/scijournal/trend/controller/TrendController.java`
- `backend/src/main/java/com/swp/scijournal/sync/job/AcademicSyncJob.java`

### File khung đã có để Bảo Huy tiếp tục code

- `backend/src/main/java/com/swp/scijournal/common/exception/GlobalExceptionHandler.java`
- `backend/src/main/java/com/swp/scijournal/common/exception/BusinessException.java`
- `backend/src/main/java/com/swp/scijournal/common/config/JacksonConfig.java`
- `backend/src/main/java/com/swp/scijournal/common/config/OpenApiDescription.md`
- `backend/src/main/java/com/swp/scijournal/trend/entity/PublicationTrend.java`
- `backend/src/main/java/com/swp/scijournal/trend/repository/PublicationTrendRepository.java`
- `backend/src/main/java/com/swp/scijournal/trend/dto/TrendPointResponse.java`
- `backend/src/main/java/com/swp/scijournal/trend/dto/KeywordTrendResponse.java`
- `backend/src/main/java/com/swp/scijournal/trend/service/TrendService.java`
- `backend/src/main/java/com/swp/scijournal/dashboard/controller/DashboardController.java`
- `backend/src/main/java/com/swp/scijournal/dashboard/dto/DashboardOverviewResponse.java`
- `backend/src/main/java/com/swp/scijournal/dashboard/service/DashboardService.java`
- `backend/src/main/java/com/swp/scijournal/datasource/openalex/OpenAlexClient.java`
- `backend/src/main/java/com/swp/scijournal/datasource/crossref/CrossrefClient.java`
- `backend/src/main/java/com/swp/scijournal/datasource/semanticscholar/SemanticScholarClient.java`
- `backend/src/main/java/com/swp/scijournal/datasource/dto/ExternalPaperRecord.java`
- `backend/src/main/java/com/swp/scijournal/datasource/entity/ApiDataSource.java`
- `backend/src/main/java/com/swp/scijournal/datasource/repository/ApiDataSourceRepository.java`
- `backend/src/main/java/com/swp/scijournal/sync/service/SyncService.java`

### Việc cụ thể

- làm chuẩn exception dùng chung
- làm cấu trúc response lỗi backend
- làm trend theo keyword và topic
- làm dashboard overview
- làm normalize dữ liệu academic source
- làm sync thủ công và sync định kỳ
- review cấu trúc database của toàn backend
- review code backend của các thành viên khác trước khi merge

### Deliverable

- `GET /api/v1/trends/keywords/{keyword}`
- `GET /api/v1/dashboard/overview`
- logic chuẩn hóa lỗi backend
- logic sync nguồn ngoài
- note kiến trúc backend

## 2.2. Trần Lương Minh

### Nhánh phụ trách

- `backend/auth-user`
- `backend/paper-search`

### Module phụ trách

- `auth`
- `user`
- `paper`

### File hiện có nên tiếp tục làm

- `backend/src/main/java/com/swp/scijournal/auth/controller/AuthController.java`
- `backend/src/main/java/com/swp/scijournal/auth/dto/AuthResponse.java`
- `backend/src/main/java/com/swp/scijournal/auth/dto/LoginRequest.java`
- `backend/src/main/java/com/swp/scijournal/auth/dto/RegisterRequest.java`
- `backend/src/main/java/com/swp/scijournal/auth/entity/Role.java`
- `backend/src/main/java/com/swp/scijournal/auth/entity/RoleName.java`
- `backend/src/main/java/com/swp/scijournal/auth/repository/RoleRepository.java`
- `backend/src/main/java/com/swp/scijournal/auth/service/AuthService.java`
- `backend/src/main/java/com/swp/scijournal/auth/service/DatabaseUserDetailsService.java`
- `backend/src/main/java/com/swp/scijournal/user/entity/User.java`
- `backend/src/main/java/com/swp/scijournal/user/repository/UserRepository.java`
- `backend/src/main/java/com/swp/scijournal/paper/controller/PaperController.java`
- `backend/src/main/java/com/swp/scijournal/paper/dto/PaperDetailResponse.java`
- `backend/src/main/java/com/swp/scijournal/paper/dto/PaperSummaryResponse.java`
- `backend/src/main/java/com/swp/scijournal/paper/entity/Author.java`
- `backend/src/main/java/com/swp/scijournal/paper/entity/Journal.java`
- `backend/src/main/java/com/swp/scijournal/paper/entity/Keyword.java`
- `backend/src/main/java/com/swp/scijournal/paper/entity/ResearchPaper.java`
- `backend/src/main/java/com/swp/scijournal/paper/repository/AuthorRepository.java`
- `backend/src/main/java/com/swp/scijournal/paper/repository/JournalRepository.java`
- `backend/src/main/java/com/swp/scijournal/paper/repository/KeywordRepository.java`
- `backend/src/main/java/com/swp/scijournal/paper/repository/ResearchPaperRepository.java`
- `backend/src/main/java/com/swp/scijournal/paper/service/PaperService.java`

### File nên tiếp tục hoàn thiện

- `backend/src/main/java/com/swp/scijournal/user/controller/UserController.java`
- `backend/src/main/java/com/swp/scijournal/user/dto/UserProfileResponse.java`
- `backend/src/main/java/com/swp/scijournal/user/service/UserService.java`
- `backend/src/main/java/com/swp/scijournal/paper/dto/PaperSearchRequest.java`
- `backend/src/main/java/com/swp/scijournal/paper/dto/PaperSearchResponse.java`
- `backend/src/main/java/com/swp/scijournal/paper/service/PaperQueryService.java`

### Việc cụ thể

- hoàn thiện đăng ký
- hoàn thiện đăng nhập
- hoàn thiện lấy thông tin user hiện tại
- phối hợp với Bảo Huy để chuẩn hóa response lỗi auth
- thêm phân trang cho search paper
- thêm validate cho filter search
- ổn định API paper detail

### Deliverable

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/me`
- `GET /api/v1/papers`
- `GET /api/v1/papers/{id}`

## 2.3. Trương Ngọc Duy

### Nhánh phụ trách

- `backend/bookmark-follow`
- `backend/notification`
- `backend/admin-system`

### Nhánh phối hợp

- phối hợp với Bảo Huy ở `backend/datasource-sync`

### Module phụ trách

- `bookmark`
- `notification`
- `admin`

### File khung đã có để tiếp tục code

- `backend/src/main/java/com/swp/scijournal/bookmark/controller/BookmarkController.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/entity/Bookmark.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/entity/FollowTarget.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/repository/BookmarkRepository.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/repository/FollowTargetRepository.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/dto/BookmarkResponse.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/service/BookmarkService.java`
- `backend/src/main/java/com/swp/scijournal/notification/controller/NotificationController.java`
- `backend/src/main/java/com/swp/scijournal/notification/entity/Notification.java`
- `backend/src/main/java/com/swp/scijournal/notification/repository/NotificationRepository.java`
- `backend/src/main/java/com/swp/scijournal/notification/dto/NotificationResponse.java`
- `backend/src/main/java/com/swp/scijournal/notification/service/NotificationService.java`
- `backend/src/main/java/com/swp/scijournal/admin/controller/AdminController.java`
- `backend/src/main/java/com/swp/scijournal/admin/dto/AdminUserResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/dto/SyncRunResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/service/AdminService.java`

### Việc cụ thể

- làm bookmark và follow
- làm notification list và read
- làm backend cho admin user và sync trigger
- phối hợp với Bảo Huy khi đụng config hoặc sync

### Deliverable

- `POST /api/v1/bookmarks/papers/{paperId}`
- `POST /api/v1/follows/topics/{topicId}`
- `GET /api/v1/notifications`
- `PATCH /api/v1/notifications/{id}/read`
- `POST /api/v1/admin/sync/run`

## 2.4. Nguyễn Chí Hải

### Vai trò chính

- code backend phần kiểm thử vận hành và bàn giao kỹ thuật
- phụ trách tài liệu cài đặt và release
- trực tiếp làm phần hỗ trợ monitor và ghi log phục vụ kiểm tra hệ thống

### Nhánh phụ trách

- `backend/admin-system`
- phối hợp với Bảo Huy ở `backend/datasource-sync`

### Module phụ trách

- `admin`
- `sync`
- `common monitor / release support`

### File nên trực tiếp làm

- `backend/src/main/java/com/swp/scijournal/admin/controller/AdminController.java`
- `backend/src/main/java/com/swp/scijournal/admin/dto/AdminUserResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/dto/SyncRunResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/service/AdminService.java`
- `backend/src/main/java/com/swp/scijournal/sync/service/SyncService.java`
- `backend/src/main/resources/application.yml`
- `README.md`

### File có thể tạo thêm

- `backend/src/main/java/com/swp/scijournal/admin/dto/SystemHealthResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/dto/SystemConfigResponse.java`
- `backend/src/main/java/com/swp/scijournal/admin/service/SystemMonitorService.java`
- `backend/src/main/java/com/swp/scijournal/common/config/ReleaseNote.md`

### Việc cụ thể

- hoàn thiện API chạy sync thủ công
- làm response trạng thái hệ thống cho admin
- làm phần hỗ trợ kiểm tra cấu hình backend
- chuẩn bị tài liệu release và hướng dẫn cài đặt
- phối hợp kiểm tra luồng deploy local của backend

### Deliverable

- `POST /api/v1/admin/sync/run`
- dữ liệu trạng thái hệ thống cho admin
- tài liệu install guide
- release note

## 2.5. Trần Hà Đức Huỳnh

### Vai trò chính

- code backend phần nghiệp vụ bổ trợ
- phụ trách các logic liên quan đến role flow và business wording
- hỗ trợ hoàn thiện API bám sát product vision

### Nhánh phụ trách

- `backend/bookmark-follow`
- `backend/notification`

### Nhánh phối hợp

- phối hợp với Trần Lương Minh ở `backend/paper-search`

### Module phụ trách

- `bookmark`
- `notification`
- `business flow support`

### File nên trực tiếp làm

- `backend/src/main/java/com/swp/scijournal/bookmark/controller/BookmarkController.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/entity/Bookmark.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/entity/FollowTarget.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/repository/BookmarkRepository.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/repository/FollowTargetRepository.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/dto/BookmarkResponse.java`
- `backend/src/main/java/com/swp/scijournal/bookmark/service/BookmarkService.java`
- `backend/src/main/java/com/swp/scijournal/notification/controller/NotificationController.java`
- `backend/src/main/java/com/swp/scijournal/notification/entity/Notification.java`
- `backend/src/main/java/com/swp/scijournal/notification/repository/NotificationRepository.java`
- `backend/src/main/java/com/swp/scijournal/notification/dto/NotificationResponse.java`
- `backend/src/main/java/com/swp/scijournal/notification/service/NotificationService.java`

### File có thể tạo thêm

- `backend/src/main/java/com/swp/scijournal/bookmark/dto/FollowTopicResponse.java`
- `backend/src/main/java/com/swp/scijournal/notification/dto/NotificationSummaryResponse.java`
- `backend/src/main/java/com/swp/scijournal/notification/service/NotificationRuleService.java`

### Việc cụ thể

- hoàn thiện follow keyword hoặc topic
- hoàn thiện rule tạo notification
- làm wording response bám nghiệp vụ hơn
- phối hợp tối ưu luồng người dùng giữa search, bookmark và notification

### Deliverable

- `POST /api/v1/follows/topics/{topicId}`
- `GET /api/v1/notifications`
- `PATCH /api/v1/notifications/{id}/read`
- logic rule notification

## 2.6. Trưởng nhóm

### Vai trò chính

- bạn giữ toàn bộ frontend
- quản lý branch và merge backend
- kiểm soát tiến độ team
- chốt bản tích hợp cuối

### File bạn nên theo dõi ở backend

- `backend/src/main/java/com/swp/scijournal/common/config/SecurityConfig.java`
- `backend/src/main/resources/application.yml`
- tất cả controller của các module

### Việc cụ thể

- review PR backend cùng với lead backend
- kiểm tra conflict khi merge
- kiểm tra backend khớp với frontend
- chốt API contract giữa frontend và backend

## 3. Quy tắc để đỡ conflict

- Bảo Huy là đầu mối review backend trước khi merge nhánh chức năng
- Trần Lương Minh không sửa sâu vào `trend`, `dashboard`, `sync`, `admin` nếu chưa thống nhất với Bảo Huy
- Trương Ngọc Duy không sửa sâu vào `auth`, `user`, `paper`, `common`, `sync` nếu chưa thống nhất với Bảo Huy
- Nguyễn Chí Hải khi sửa `admin` hoặc `sync` cần thống nhất API với Trương Ngọc Duy và Bảo Huy
- Trần Hà Đức Huỳnh khi sửa `bookmark` hoặc `notification` cần thống nhất flow với Trương Ngọc Duy
- các file `SecurityConfig`, `application.yml`, entity dùng chung, exception dùng chung cần báo Bảo Huy trước khi sửa

## 4. Thứ tự merge khuyến nghị

1. `backend/auth-user`
2. `backend/paper-search`
3. `backend/trend-dashboard`
4. `backend/datasource-sync`
5. `backend/bookmark-follow`
6. `backend/notification`
7. `backend/admin-system`

## 5. Ghi chú cuối

- frontend bạn tự làm, team backend chỉ cần giữ API ổn định
- Bảo Huy là lead backend nên mọi thay đổi backend lớn nên đi qua Bảo Huy trước
- Nguyễn Chí Hải và Trần Hà Đức Huỳnh đều đã có phần code cụ thể, không để ở vai trò test chéo hoặc review chéo nữa
