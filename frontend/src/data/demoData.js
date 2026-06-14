export const demoUsers = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    fullName: "Phạm Hữu Trưởng",
    role: "ADMIN"
  },
  {
    id: 2,
    username: "student01",
    password: "123456",
    fullName: "Nguyễn Minh Sinh",
    role: "LECTURER_STUDENT"
  },
  {
    id: 3,
    username: "researcher01",
    password: "123456",
    fullName: "Lê Thanh Nghiên",
    role: "RESEARCHER"
  }
];

export const demoPapers = [
  {
    id: 101,
    title: "Machine Learning Trend Analysis for Scientific Publication Forecasting",
    authors: ["Andrew Ng", "Linh Tran"],
    journal: "IEEE Access",
    publicationYear: 2025,
    keywords: ["machine learning", "trend analysis", "scientific publishing"],
    sourceName: "OpenAlex",
    sourcePaperId: "OA-2025-00101",
    abstractText:
      "Nghiên cứu đề xuất quy trình phân tích xu hướng công bố khoa học bằng học máy, kết hợp dữ liệu nhiều nguồn để phát hiện topic tăng trưởng nhanh.",
    citationCount: 42,
    doi: "10.1109/ACCESS.2025.00101",
    url: "https://example.org/papers/101",
    trendScore: 91,
    monthlyGrowth: "+18%"
  },
  {
    id: 102,
    title: "Deep Learning Patterns in Modern Academic Search Systems",
    authors: ["Yoshua Bengio", "Quỳnh Anh"],
    journal: "Information Processing & Management",
    publicationYear: 2024,
    keywords: ["deep learning", "academic search", "metadata enrichment"],
    sourceName: "Crossref",
    sourcePaperId: "CR-2024-00102",
    abstractText:
      "Bài báo phân tích cách mô hình học sâu hỗ trợ chuẩn hóa metadata, cải thiện truy xuất tài liệu và gợi ý liên kết trích dẫn.",
    citationCount: 57,
    doi: "10.1016/IPM.2024.00102",
    url: "https://example.org/papers/102",
    trendScore: 87,
    monthlyGrowth: "+14%"
  },
  {
    id: 103,
    title: "Computer Vision Publication Growth in Interdisciplinary Journals",
    authors: ["Fei-Fei Li", "Bảo Hân"],
    journal: "Pattern Recognition Letters",
    publicationYear: 2025,
    keywords: ["computer vision", "interdisciplinary research", "publication growth"],
    sourceName: "Semantic Scholar",
    sourcePaperId: "SS-2025-00103",
    abstractText:
      "Nội dung tập trung vào tốc độ gia tăng công bố thuộc nhánh thị giác máy tính trong các tạp chí liên ngành giai đoạn gần đây.",
    citationCount: 33,
    doi: "10.1016/PRL.2025.00103",
    url: "https://example.org/papers/103",
    trendScore: 83,
    monthlyGrowth: "+11%"
  },
  {
    id: 104,
    title: "Large Language Models for Research Discovery and Recommendation",
    authors: ["Percy Liang", "Hà Vy"],
    journal: "Journal of Informetrics",
    publicationYear: 2025,
    keywords: ["large language model", "research discovery", "recommendation system"],
    sourceName: "OpenAlex",
    sourcePaperId: "OA-2025-00104",
    abstractText:
      "Bài báo khảo sát việc dùng mô hình ngôn ngữ lớn để tóm tắt bài báo, gợi ý chủ đề mới và phát hiện xu hướng nghiên cứu nổi lên.",
    citationCount: 48,
    doi: "10.1016/JOI.2025.00104",
    url: "https://example.org/papers/104",
    trendScore: 95,
    monthlyGrowth: "+24%"
  },
  {
    id: 105,
    title: "OpenAlex-Based Monitoring Framework for Emerging Research Topics",
    authors: ["Sarah Johnson", "Đức Phúc"],
    journal: "Scientometrics",
    publicationYear: 2023,
    keywords: ["openalex", "topic monitoring", "trend dashboard"],
    sourceName: "OpenAlex",
    sourcePaperId: "OA-2023-00105",
    abstractText:
      "Đề tài mô tả cách xây dựng hệ thống giám sát chủ đề mới nổi bằng dữ liệu OpenAlex, hỗ trợ dashboard theo tháng và theo năm.",
    citationCount: 65,
    doi: "10.1007/SMT.2023.00105",
    url: "https://example.org/papers/105",
    trendScore: 76,
    monthlyGrowth: "+9%"
  },
  {
    id: 106,
    title: "Semantic Scholar Metadata Fusion for Research Trend Mining",
    authors: ["David Park", "Minh Khôi"],
    journal: "Data & Knowledge Engineering",
    publicationYear: 2024,
    keywords: ["semantic scholar", "metadata fusion", "trend mining"],
    sourceName: "Semantic Scholar",
    sourcePaperId: "SS-2024-00106",
    abstractText:
      "Tài liệu trình bày kỹ thuật hợp nhất metadata từ Semantic Scholar và Crossref nhằm tăng chất lượng phát hiện xu hướng nghiên cứu.",
    citationCount: 29,
    doi: "10.1016/DKE.2024.00106",
    url: "https://example.org/papers/106",
    trendScore: 79,
    monthlyGrowth: "+12%"
  },
  {
    id: 107,
    title: "Benchmarking Trend Signals Across Crossref and OpenAlex",
    authors: ["Maria Chen", "Gia Hưng"],
    journal: "Online Information Review",
    publicationYear: 2022,
    keywords: ["crossref", "openalex", "benchmarking", "trend signals"],
    sourceName: "Crossref",
    sourcePaperId: "CR-2022-00107",
    abstractText:
      "Nghiên cứu so sánh tín hiệu xu hướng từ nhiều nguồn học thuật, đánh giá độ tin cậy của chỉ số tăng trưởng theo keyword và journal.",
    citationCount: 74,
    doi: "10.1108/OIR.2022.00107",
    url: "https://example.org/papers/107",
    trendScore: 72,
    monthlyGrowth: "+7%"
  },
  {
    id: 108,
    title: "AI in Education Publication Mapping with Keyword Follow Workflow",
    authors: ["Anita Rao", "Mai Phương"],
    journal: "Computers & Education",
    publicationYear: 2025,
    keywords: ["AI in Education", "keyword follow", "publication mapping"],
    sourceName: "OpenAlex",
    sourcePaperId: "OA-2025-00108",
    abstractText:
      "Bài báo xây dựng bản đồ công bố về AI trong giáo dục và đề xuất cơ chế theo dõi keyword để cập nhật nghiên cứu mới nhanh hơn.",
    citationCount: 21,
    doi: "10.1016/CEDU.2025.00108",
    url: "https://example.org/papers/108",
    trendScore: 88,
    monthlyGrowth: "+19%"
  }
];

export const demoYearlyTrend = [
  { year: 2019, count: 34 },
  { year: 2020, count: 48 },
  { year: 2021, count: 57 },
  { year: 2022, count: 73 },
  { year: 2023, count: 88 },
  { year: 2024, count: 102 },
  { year: 2025, count: 126 }
];

export const demoSourceStatus = [
  { name: "OpenAlex", status: "Ổn định", schedule: "02:00 mỗi ngày", records: "14.200 bản ghi" },
  { name: "Crossref", status: "Ổn định", schedule: "02:10 mỗi ngày", records: "7.900 bản ghi" },
  { name: "Semantic Scholar", status: "Chờ API key", schedule: "Tạm dừng", records: "2.712 bản ghi" }
];

export const demoRecentUsers = [
  { username: "admin", role: "System Administrator", status: "Đã xác minh" },
  { username: "student01", role: "Lecturer / Student", status: "Hoạt động" },
  { username: "researcher01", role: "Researcher", status: "Hoạt động" }
];

export const demoSyncQueue = [
  { time: "02:00", job: "Đồng bộ metadata hằng ngày", status: "Đang lên lịch" },
  { time: "02:20", job: "Tổng hợp xu hướng theo keyword", status: "Đang lên lịch" },
  { time: "08:00", job: "Gửi notification digest", status: "Đang lên lịch" },
  { time: "Thủ công", job: "Manual sync cho admin", status: "Sẵn sàng" }
];

export const demoNotifications = [
  {
    id: 1,
    title: "Keyword 'large language model' tăng mạnh",
    time: "10 phút trước",
    type: "trend"
  },
  {
    id: 2,
    title: "Nguồn OpenAlex vừa đồng bộ thêm 214 bài báo mới",
    time: "35 phút trước",
    type: "sync"
  },
  {
    id: 3,
    title: "Journal IEEE Access có thêm 8 bài liên quan đến 'computer vision'",
    time: "1 giờ trước",
    type: "journal"
  }
];
