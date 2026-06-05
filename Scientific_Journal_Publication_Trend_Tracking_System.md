# Scientific Journal Publication Trend Tracking System

## 1. Thông tin chung

- **Mã đề tài:** SU26SWP06
- **Tên đề tài:** Scientific Journal Publication Trend Tracking System
- **Submitted by:** PhuongLHK
- **Loại hệ thống:** Web application
- **Backend bắt buộc:** Java Spring Boot
- **Frontend đề xuất:** React, Next.js hoặc framework frontend hiện đại tương đương

## 2. Tổng quan đề tài

Trong bối cảnh số lượng bài báo khoa học và journal học thuật ngày càng gia tăng, việc theo dõi xu hướng nghiên cứu, các chủ đề nổi bật và sự phát triển của từng lĩnh vực học thuật trở nên khó khăn đối với giảng viên, sinh viên và nhà nghiên cứu.

Các nền tảng học thuật hiện nay chủ yếu hỗ trợ tìm kiếm bài báo theo từ khóa, tác giả hoặc tạp chí, nhưng chưa tập trung mạnh vào việc phân tích xu hướng công bố theo thời gian, phát hiện chủ đề đang nổi lên và trực quan hóa dữ liệu nghiên cứu một cách dễ hiểu.

Đề tài này hướng đến việc xây dựng một hệ thống hỗ trợ người dùng theo dõi xu hướng công bố khoa học dựa trên dữ liệu học thuật công khai, từ đó giúp họ tiết kiệm thời gian trong quá trình tìm kiếm tài liệu, xác định hướng nghiên cứu và nắm bắt sự thay đổi của các lĩnh vực quan tâm.

## 3. Bài toán cần giải quyết

Hệ thống được đề xuất để giải quyết các vấn đề sau:

- Khó theo dõi sự thay đổi và phát triển của các chủ đề nghiên cứu theo thời gian khi số lượng bài báo khoa học ngày càng lớn.
- Việc tìm kiếm bài báo trên các nền tảng học thuật hiện nay chủ yếu dựa trên keyword, chưa hỗ trợ phân tích xu hướng nghiên cứu một cách trực quan.
- Giảng viên, sinh viên và nhà nghiên cứu mất nhiều thời gian để xác định các chủ đề đang nổi bật hoặc có tiềm năng nghiên cứu.

## 4. Mục tiêu hệ thống

- Hỗ trợ tìm kiếm và tra cứu thông tin bài báo khoa học từ các nguồn học thuật công khai.
- Theo dõi xu hướng công bố theo keyword, topic, journal hoặc giai đoạn thời gian.
- Trực quan hóa dữ liệu nghiên cứu bằng biểu đồ và dashboard.
- Hỗ trợ người dùng lưu lại các bài báo, từ khóa hoặc chủ đề quan tâm để theo dõi lâu dài.
- Cập nhật dữ liệu định kỳ từ các academic API để cung cấp thông tin tương đối mới.

## 5. Đối tượng sử dụng

### 5.1. Researcher

- Phân tích xu hướng nghiên cứu.
- Theo dõi journal và keyword chuyên sâu.
- Khám phá các chủ đề mới nổi.
- Xem thống kê công bố theo thời gian.

### 5.2. Lecturer / Student

- Tìm kiếm bài báo tham khảo.
- Khám phá các chủ đề phổ biến.
- Lưu bài báo hoặc keyword quan tâm.
- Xem dashboard xu hướng cơ bản.

### 5.3. System Administrator

- Quản lý tài khoản người dùng.
- Cấu hình nguồn dữ liệu API.
- Cập nhật dữ liệu bài báo.
- Quản lý hệ thống.

## 6. Phạm vi chức năng

### 6.1. Chức năng cho người dùng

- Đăng ký, đăng nhập và phân quyền người dùng.
- Tìm kiếm bài báo theo keyword, author hoặc journal.
- Xem chi tiết bài báo và thông tin xuất bản.
- Theo dõi xu hướng công bố theo keyword hoặc topic.
- Xem biểu đồ thống kê và dashboard trực quan.
- Xem các research topic đang thịnh hành.
- Lưu bookmark cho bài báo hoặc keyword.
- Theo dõi journal hoặc research topic.
- Nhận thông báo khi có bài báo mới liên quan.
- Tạo các báo cáo phân tích đơn giản.

### 6.2. Chức năng cho quản trị viên

- Đồng bộ dữ liệu từ các academic API bên ngoài.
- Quản lý người dùng.
- Quản lý cấu hình hệ thống.
- Quản lý nguồn dữ liệu API.

## 7. Yêu cầu chức năng chi tiết

### 7.1. Authentication and Authorization

- Hệ thống phải cho phép người dùng đăng ký và đăng nhập.
- Hệ thống phải phân quyền tối thiểu cho các vai trò: Researcher, Lecturer/Student và System Administrator.

### 7.2. Paper Search

- Hệ thống phải cho phép tìm kiếm bài báo theo từ khóa.
- Hệ thống phải cho phép tìm kiếm bài báo theo tác giả.
- Hệ thống phải cho phép tìm kiếm bài báo theo journal.

### 7.3. Paper Details

- Hệ thống phải hiển thị thông tin chi tiết của bài báo.
- Thông tin hiển thị nên bao gồm tiêu đề, abstract, keywords, năm xuất bản, tác giả và journal.

### 7.4. Trend Tracking

- Hệ thống phải hỗ trợ theo dõi xu hướng công bố theo keyword hoặc research topic.
- Hệ thống phải cho phép người dùng xem xu hướng theo mốc thời gian.

### 7.5. Dashboard and Visualization

- Hệ thống phải hiển thị biểu đồ và dashboard thống kê.
- Hệ thống nên hỗ trợ các dạng biểu đồ phổ biến như số lượng bài báo theo năm, top keyword, top journal và topic nổi bật.

### 7.6. Trending Topics

- Hệ thống phải hiển thị danh sách các chủ đề nghiên cứu đang nổi bật dựa trên dữ liệu đã thu thập.

### 7.7. Bookmark and Follow

- Hệ thống phải cho phép người dùng lưu bài báo quan tâm.
- Hệ thống phải cho phép người dùng lưu keyword quan tâm.
- Hệ thống phải cho phép người dùng follow journal hoặc research topic.

### 7.8. Notifications

- Hệ thống phải hỗ trợ gửi thông báo khi có bài báo mới thuộc journal, keyword hoặc topic mà người dùng theo dõi.

### 7.9. Reports

- Hệ thống phải hỗ trợ tạo báo cáo phân tích đơn giản phục vụ học tập và nghiên cứu.

### 7.10. External Data Synchronization

- Hệ thống phải đồng bộ metadata bài báo từ các academic API bên ngoài theo lịch định kỳ.

### 7.11. Administration

- Quản trị viên phải có khả năng quản lý người dùng và cấu hình hệ thống.

## 8. Thực thể chính của hệ thống

- **User:** thông tin tài khoản và vai trò người dùng.
- **Research Paper:** metadata của bài báo khoa học.
- **Journal:** thông tin về tạp chí học thuật.
- **Keyword:** từ khóa liên quan đến bài báo hoặc chủ đề nghiên cứu.
- **Research Topic:** nhóm chủ đề nghiên cứu cần theo dõi.
- **Publication Trend:** dữ liệu thống kê xu hướng công bố theo thời gian.
- **Author:** thông tin tác giả bài báo.
- **Bookmark:** danh sách bài báo hoặc keyword mà người dùng đã lưu.
- **Notification:** thông báo gửi đến người dùng.
- **Dashboard Report:** dữ liệu tổng hợp phục vụ hiển thị báo cáo và dashboard.
- **API Data Source:** thông tin cấu hình nguồn dữ liệu bên ngoài.

## 9. Nguồn dữ liệu dự kiến

Hệ thống sử dụng dữ liệu công khai từ các nguồn học thuật như:

- Semantic Scholar
- OpenAlex
- Crossref

Các nguồn này được khai thác thông qua API miễn phí hoặc public API phù hợp với phạm vi đề tài.

## 10. Dữ liệu thu thập và xử lý

Hệ thống chỉ thu thập metadata của bài báo, bao gồm:

- Tiêu đề bài báo
- Abstract
- Keywords
- Năm xuất bản
- Tác giả
- Journal

Hệ thống không xử lý toàn văn bài báo do giới hạn về bản quyền và dung lượng dữ liệu.

## 11. Giả định và ràng buộc

- Dữ liệu từ các API bên thứ ba được giả định là hợp lệ, có cấu trúc thống nhất và luôn khả dụng.
- Hệ thống chỉ phân tích dữ liệu thuộc một số lĩnh vực được chọn trước, ví dụ: Computer Science hoặc AI, nhằm giảm độ phức tạp.
- Dữ liệu được cập nhật theo chu kỳ định kỳ, ví dụ mỗi ngày hoặc mỗi tuần.
- Hệ thống không yêu cầu xử lý realtime.
- Hệ thống chỉ tập trung vào phân tích metadata, không đi sâu vào phân tích nội dung full-text.
- Hệ thống phải được triển khai dưới dạng web application.
- Backend bắt buộc sử dụng Java với Spring Boot.
- Frontend có thể phát triển bằng React, Next.js hoặc công nghệ frontend phù hợp để kết nối với Spring Boot API.

## 12. Giá trị mang lại

- Giúp sinh viên và giảng viên nhanh chóng tìm được hướng nghiên cứu phù hợp.
- Hỗ trợ researcher theo dõi sự phát triển của lĩnh vực quan tâm một cách trực quan hơn.
- Giảm thời gian lọc và tổng hợp tài liệu từ nhiều nguồn học thuật khác nhau.
- Tạo nền tảng phục vụ phân tích xu hướng công bố khoa học trong phạm vi học thuật đã chọn.

## 13. Gợi ý module triển khai

- Module quản lý người dùng và phân quyền
- Module tìm kiếm bài báo
- Module đồng bộ dữ liệu từ academic API
- Module phân tích xu hướng công bố
- Module dashboard và visualization
- Module bookmark và follow
- Module notification
- Module quản trị hệ thống

## 14. Định hướng công nghệ triển khai

### 14.1. Kiến trúc tổng thể

Hệ thống được định hướng phát triển theo mô hình web application tách biệt frontend và backend:

- **Frontend:** giao diện web cho người dùng tra cứu, xem dashboard, bookmark và theo dõi xu hướng.
- **Backend:** cung cấp REST API, xử lý nghiệp vụ, đồng bộ dữ liệu học thuật và quản trị hệ thống.
- **Database:** lưu trữ dữ liệu người dùng, metadata bài báo, keyword, journal, bookmark, notification và dữ liệu thống kê.

### 14.2. Backend bắt buộc

Backend bắt buộc sử dụng:

- Java
- Spring Boot

Backend có thể bao gồm các thành phần:

- Spring Web cho REST API
- Spring Data JPA để thao tác dữ liệu
- Spring Security cho xác thực và phân quyền
- Scheduler hoặc background jobs để đồng bộ dữ liệu từ API bên ngoài

### 14.3. Frontend đề xuất

Frontend có thể sử dụng một trong các công nghệ sau:

- React
- Next.js
- Hoặc framework frontend hiện đại tương đương

Frontend nên đảm nhiệm:

- Giao diện tìm kiếm bài báo
- Giao diện dashboard và biểu đồ xu hướng
- Giao diện bookmark, follow và notification
- Giao diện quản trị cho admin

### 14.4. Tích hợp giữa frontend và backend

- Frontend gọi dữ liệu thông qua REST API do Spring Boot cung cấp.
- Backend chịu trách nhiệm xác thực, phân quyền, xử lý nghiệp vụ và đồng bộ dữ liệu từ academic APIs.
- Frontend tập trung vào trải nghiệm người dùng và trực quan hóa dữ liệu.

## 15. Kết luận

Scientific Journal Publication Trend Tracking System là một đề tài phù hợp để phát triển thành hệ thống hỗ trợ học thuật có giá trị thực tiễn. Điểm mạnh của đề tài nằm ở khả năng kết hợp giữa tìm kiếm bài báo, phân tích xu hướng công bố và trực quan hóa dữ liệu, từ đó giúp người dùng hiểu rõ hơn về sự phát triển của các hướng nghiên cứu theo thời gian.
