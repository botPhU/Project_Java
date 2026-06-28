# Academic API Integration Plan

Mục tiêu của file này là chốt các nguồn API học thuật phù hợp cho đề tài `Scientific Journal Tracker`, ưu tiên theo khả năng triển khai thực tế với backend hiện tại.

## 1. Nguồn nên tích hợp

### 1. OpenAlex

- Vai trò: nguồn chính để lấy danh sách bài báo, tác giả, tổ chức, venue, topic.
- Phù hợp nhất để làm nguồn đồng bộ đầu tiên cho hệ thống.
- Base URL: `https://api.openalex.org`
- Tài liệu: `https://developers.openalex.org/`

Use case nên dùng:

- tìm bài báo theo keyword
- lấy metadata bài báo mới theo năm / ngày công bố
- lấy danh sách tác giả, institution, source
- xây trend theo topic / keyword / journal

Endpoint nên bắt đầu:

- `GET /works`
- `GET /authors`
- `GET /sources`
- `GET /institutions`

Ví dụ:

```text
https://api.openalex.org/works?search=machine%20learning&per-page=25
https://api.openalex.org/works?filter=from_publication_date:2024-01-01,to_publication_date:2024-12-31
https://api.openalex.org/authors?search=Andrew%20Ng
```

Ghi chú kỹ thuật:

- OpenAlex hiện yêu cầu API key miễn phí cho API usage theo tài liệu mới.
- Nên lưu `openalex_id`, `doi`, `title`, `publication_date`, `source`, `authorships`, `concepts/topics`, `cited_by_count`.

### 2. Crossref

- Vai trò: nguồn bổ sung mạnh cho DOI metadata và truy vấn theo filter/date.
- Base URL: `https://api.crossref.org/v1`
- Tài liệu: `https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/`

Use case nên dùng:

- tra cứu bài báo theo DOI
- bù metadata thiếu từ nguồn khác
- lấy works theo khoảng ngày xuất bản
- lấy metadata journal / ISSN / member

Endpoint nên bắt đầu:

- `GET /works`
- `GET /works/{doi}`
- `GET /journals/{issn}/works`

Ví dụ:

```text
https://api.crossref.org/v1/works?query=machine%20learning&rows=20&mailto=team@example.com
https://api.crossref.org/v1/works/10.1038/nature12373
https://api.crossref.org/v1/works?filter=from-pub-date:2024-01-01,until-pub-date:2024-12-31&mailto=team@example.com
```

Ghi chú kỹ thuật:

- Crossref khuyến nghị dùng `mailto` trong query hoặc `User-Agent`.
- Nguồn này nên làm lớp enrichment sau OpenAlex, không nên là nguồn sync đầu tiên cho cả hệ thống.

### 3. Semantic Scholar

- Vai trò: bổ sung citation graph, author graph, paper ranking, paper search chất lượng tốt.
- Base URL: `https://api.semanticscholar.org/graph/v1`
- Tài liệu overview: `https://www.semanticscholar.org/product/api`
- Tài liệu API: `https://api.semanticscholar.org/api-docs/`
- Tutorial: `https://www.semanticscholar.org/product/api/tutorial`

Use case nên dùng:

- enrich `citationCount`
- tra cứu author influence / related authors
- tìm paper theo search quality tốt
- lấy recommendation cho màn gợi ý bài báo liên quan

Endpoint nên bắt đầu:

- `GET /paper/search/bulk`
- `GET /paper/{paperId}`
- `GET /author/{authorId}`

Ví dụ:

```text
https://api.semanticscholar.org/graph/v1/paper/search/bulk?query=%22machine%20learning%22&fields=title,year,citationCount,authors
https://api.semanticscholar.org/graph/v1/paper/10.1038/nature12373?fields=title,abstract,year,citationCount,authors
```

Ghi chú kỹ thuật:

- API key là tùy chọn nhưng nên dùng.
- Theo tutorial chính thức, dùng key riêng sẽ ổn định hơn và mặc định khoảng `1 request/second`.
- Semantic Scholar phù hợp làm nguồn enrich theo paper đã có DOI hơn là full sync ban đầu.

### 4. ORCID

- Vai trò: chuẩn hóa định danh tác giả, liên kết researcher profile.
- Base URL: `https://pub.orcid.org`
- Tài liệu: `https://info.orcid.org/what-is-orcid/services/public-api/`

Use case nên dùng:

- xác thực / lưu ORCID cho user nghiên cứu
- map tác giả trong hệ thống với ORCID iD
- tra thông tin công khai của researcher

Ghi chú kỹ thuật:

- ORCID Public API cần đăng ký client credentials.
- Không nên dùng ORCID làm nguồn paper chính.
- Nên tích hợp sau khi auth + author model đã ổn định.

### 5. OpenCitations

- Vai trò: nguồn mở để lấy citation count / references / citations theo DOI.
- Base URL: `https://api.opencitations.net/index/v1`
- Tài liệu: `https://api.opencitations.net/index/v1`

Use case nên dùng:

- bổ sung citation count mở
- lấy danh sách tài liệu trích dẫn / được trích dẫn theo DOI
- kiểm tra chéo citation data ngoài Semantic Scholar

Endpoint nên bắt đầu:

- `GET /citation-count/{doi}`
- `GET /reference-count/{doi}`
- `GET /citations/{doi}`
- `GET /references/{doi}`

Ví dụ:

```text
https://api.opencitations.net/index/v1/citation-count/10.1038/nature12373
https://api.opencitations.net/index/v1/references/10.1038/nature12373
```

Ghi chú kỹ thuật:

- OpenCitations khuyến khích dùng access token trong header `authorization`.
- Nguồn này phù hợp làm phụ trợ cho trend/citation, không phải nguồn metadata paper chính.

## 2. Thứ tự tích hợp đề xuất

### Giai đoạn 1

- OpenAlex

Lý do:

- coverage rộng
- entity model rất hợp với schema hiện tại
- thuận lợi nhất để sync `papers`, `authors`, `sources`, `topics`

### Giai đoạn 2

- Crossref
- Semantic Scholar

Lý do:

- Crossref bù DOI metadata và lọc works theo date tốt
- Semantic Scholar bù citation, author influence, recommendation

### Giai đoạn 3

- ORCID
- OpenCitations

Lý do:

- ORCID phù hợp khi mở rộng hồ sơ researcher thật
- OpenCitations phù hợp khi cần citation graph mở và kiểm tra chéo

## 3. Mapping vào schema hiện tại

Các cột đang có trong `research_papers` và có thể map trực tiếp:

- `title`
- `abstract_text`
- `publication_year`
- `doi`
- `publication_date`
- `document_type`
- `language`
- `url`
- `citation_count`
- `source_name`
- `source_paper_id`

Các bảng liên quan:

- `authors`
- `journals`
- `keywords`
- `research_topics`
- `paper_authors`
- `paper_keywords`
- `paper_topics`
- `publication_trends`
- `api_data_sources`

## 4. Hướng implement ngay trong backend

### Bước 1

- hoàn thiện `OpenAlexClient`
- fetch `works`
- normalize về `ExternalPaperRecord`
- lưu vào `research_papers`

### Bước 2

- thêm `doi-based enrichment`
- nếu paper có DOI thì gọi Crossref hoặc Semantic Scholar để cập nhật:
  - `abstract`
  - `citation_count`
  - `authors`
  - `journal`

### Bước 3

- thêm bảng log sync riêng nếu cần:
  - `sync_runs`
  - `sync_run_items`

## 5. Kết luận thực dụng

Nếu chỉ được làm một nguồn trước, nên làm:

1. `OpenAlex`
2. `Crossref`
3. `Semantic Scholar`

Nếu mục tiêu là sản phẩm chạy được sớm và có trend thật:

- dùng OpenAlex để đồng bộ bulk paper
- dùng Crossref để enrich DOI
- dùng Semantic Scholar để tăng chất lượng citation / author / recommendation

## 6. Nguồn chính thức

- OpenAlex: `https://developers.openalex.org/`
- OpenAlex searching guide: `https://developers.openalex.org/guides/searching`
- Crossref REST API tips: `https://www.crossref.org/documentation/retrieve-metadata/rest-api/tips-for-using-the-crossref-rest-api/`
- Semantic Scholar API overview: `https://www.semanticscholar.org/product/api`
- Semantic Scholar API docs: `https://api.semanticscholar.org/api-docs/`
- Semantic Scholar tutorial: `https://www.semanticscholar.org/product/api/tutorial`
- ORCID Public API: `https://info.orcid.org/what-is-orcid/services/public-api/`
- ORCID search tutorial: `https://info.orcid.org/documentation/api-tutorials/api-tutorial-searching-the-orcid-registry/`
- OpenCitations Index API: `https://api.opencitations.net/index/v1`
