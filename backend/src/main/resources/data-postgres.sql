INSERT INTO roles (name)
VALUES ('ADMIN'), ('LECTURER_STUDENT'), ('RESEARCHER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, institution, research_interests, role_id)
SELECT 'admin', 'admin@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'System Administrator', TRUE, 'FPT University', 'System administration', r.id
FROM roles r
WHERE r.name = 'ADMIN'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, institution, research_interests, role_id)
SELECT 'student01', 'student01@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'Student Demo', TRUE, 'FPT University', 'Machine learning, literature review', r.id
FROM roles r
WHERE r.name = 'LECTURER_STUDENT'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, institution, research_interests, role_id)
SELECT 'researcher01', 'researcher01@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'Researcher Demo', TRUE, 'FPT University', 'AI research trends, scientometrics', r.id
FROM roles r
WHERE r.name = 'RESEARCHER'
ON CONFLICT (username) DO NOTHING;

INSERT INTO journals (name, issn, publisher, impact_factor, subject_area, country, website_url)
VALUES
    ('Journal of Artificial Intelligence Research', '1076-9757', 'AI Access Foundation', 4.80, 'Artificial Intelligence', 'United States', 'https://www.jair.org'),
    ('IEEE Access', '2169-3536', 'IEEE', 3.90, 'Computer Science', 'United States', 'https://ieeeaccess.ieee.org')
ON CONFLICT (name) DO NOTHING;

INSERT INTO authors (name, affiliation, country, external_author_id, h_index, total_citations)
VALUES
    ('Andrew Ng', 'Stanford University', 'United States', 'OA-AUTH-001', 150, 100000),
    ('Yoshua Bengio', 'University of Montreal', 'Canada', 'OA-AUTH-002', 220, 180000),
    ('Fei-Fei Li', 'Stanford University', 'United States', 'OA-AUTH-003', 170, 140000)
ON CONFLICT (name) DO NOTHING;

INSERT INTO keywords (name, normalized_name)
VALUES
    ('machine learning', 'machine learning'),
    ('deep learning', 'deep learning'),
    ('computer vision', 'computer vision'),
    ('trend analysis', 'trend analysis')
ON CONFLICT (name) DO NOTHING;

INSERT INTO research_topics (name, description, domain)
VALUES
    ('AI Research Trends', 'Theo dõi xu hướng nghiên cứu liên quan đến AI.', 'Artificial Intelligence'),
    ('Academic Search Analytics', 'Phân tích dữ liệu tra cứu học thuật.', 'Computer Science')
ON CONFLICT (name) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, doi, publication_date, document_type, language, url, citation_count, source_name, source_paper_id, journal_id)
SELECT
    'Machine Learning Publication Trends in Computer Science',
    'This paper analyzes machine learning publication growth across major computer science journals.',
    2024,
    '10.1000/oa-ml-2024-001',
    DATE '2024-04-01',
    'Journal Article',
    'English',
    'https://example.org/papers/oa-ml-2024-001',
    18,
    'OpenAlex',
    'OA-ML-2024-001',
    j.id
FROM journals j
WHERE j.name = 'Journal of Artificial Intelligence Research'
ON CONFLICT (source_name, source_paper_id) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, doi, publication_date, document_type, language, url, citation_count, source_name, source_paper_id, journal_id)
SELECT
    'Deep Learning and Vision Research Topic Evolution',
    'The study explores how deep learning transformed computer vision publications over time.',
    2023,
    '10.1000/cr-dl-2023-002',
    DATE '2023-08-12',
    'Journal Article',
    'English',
    'https://example.org/papers/cr-dl-2023-002',
    24,
    'Crossref',
    'CR-DL-2023-002',
    j.id
FROM journals j
WHERE j.name = 'IEEE Access'
ON CONFLICT (source_name, source_paper_id) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, doi, publication_date, document_type, language, url, citation_count, source_name, source_paper_id, journal_id)
SELECT
    'Research Trend Tracking Using Academic Metadata',
    'A metadata-driven approach for tracking emerging topics from public academic APIs.',
    2025,
    '10.1000/ss-rt-2025-003',
    DATE '2025-02-20',
    'Conference Paper',
    'English',
    'https://example.org/papers/ss-rt-2025-003',
    11,
    'Semantic Scholar',
    'SS-RT-2025-003',
    j.id
FROM journals j
WHERE j.name = 'IEEE Access'
ON CONFLICT (source_name, source_paper_id) DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND a.name = 'Andrew Ng'
ON CONFLICT DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND a.name = 'Yoshua Bengio'
ON CONFLICT DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'CR-DL-2023-002' AND a.name = 'Yoshua Bengio'
ON CONFLICT DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'CR-DL-2023-002' AND a.name = 'Fei-Fei Li'
ON CONFLICT DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'SS-RT-2025-003' AND a.name = 'Andrew Ng'
ON CONFLICT DO NOTHING;

INSERT INTO paper_authors (paper_id, author_id)
SELECT rp.id, a.id
FROM research_papers rp, authors a
WHERE rp.source_paper_id = 'SS-RT-2025-003' AND a.name = 'Fei-Fei Li'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND k.name = 'machine learning'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND k.name = 'deep learning'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND k.name = 'trend analysis'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'CR-DL-2023-002' AND k.name = 'deep learning'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'CR-DL-2023-002' AND k.name = 'computer vision'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'SS-RT-2025-003' AND k.name = 'machine learning'
ON CONFLICT DO NOTHING;

INSERT INTO paper_keywords (paper_id, keyword_id)
SELECT rp.id, k.id
FROM research_papers rp, keywords k
WHERE rp.source_paper_id = 'SS-RT-2025-003' AND k.name = 'trend analysis'
ON CONFLICT DO NOTHING;

INSERT INTO paper_topics (paper_id, topic_id)
SELECT rp.id, t.id
FROM research_papers rp, research_topics t
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND t.name = 'AI Research Trends'
ON CONFLICT DO NOTHING;

INSERT INTO paper_topics (paper_id, topic_id)
SELECT rp.id, t.id
FROM research_papers rp, research_topics t
WHERE rp.source_paper_id = 'OA-ML-2024-001' AND t.name = 'Academic Search Analytics'
ON CONFLICT DO NOTHING;

INSERT INTO paper_topics (paper_id, topic_id)
SELECT rp.id, t.id
FROM research_papers rp, research_topics t
WHERE rp.source_paper_id = 'CR-DL-2023-002' AND t.name = 'AI Research Trends'
ON CONFLICT DO NOTHING;

INSERT INTO paper_topics (paper_id, topic_id)
SELECT rp.id, t.id
FROM research_papers rp, research_topics t
WHERE rp.source_paper_id = 'SS-RT-2025-003' AND t.name = 'Academic Search Analytics'
ON CONFLICT DO NOTHING;

INSERT INTO bookmarks (user_id, paper_id)
SELECT u.id, rp.id
FROM users u, research_papers rp
WHERE u.username = 'student01' AND rp.source_paper_id = 'CR-DL-2023-002'
ON CONFLICT DO NOTHING;

INSERT INTO follow_targets (user_id, target_type, target_value)
SELECT u.id, 'TOPIC', 'machine learning'
FROM users u
WHERE u.username = 'researcher01'
ON CONFLICT DO NOTHING;

INSERT INTO notifications (user_id, title, content, type, read)
SELECT u.id, 'New publication synced', 'A new research paper was synchronized from OpenAlex.', 'SYSTEM', FALSE
FROM users u
WHERE u.username = 'researcher01'
AND NOT EXISTS (
    SELECT 1
    FROM notifications n
    WHERE n.user_id = u.id
      AND n.title = 'New publication synced'
      AND n.content = 'A new research paper was synchronized from OpenAlex.'
);

INSERT INTO publication_trends (target_name, target_type, period_year, publication_count, citation_count)
VALUES
    ('machine learning', 'KEYWORD', 2023, 12, 90),
    ('machine learning', 'KEYWORD', 2024, 18, 140),
    ('machine learning', 'KEYWORD', 2025, 26, 220),
    ('deep learning', 'KEYWORD', 2023, 15, 110),
    ('deep learning', 'KEYWORD', 2024, 20, 165)
ON CONFLICT (target_name, target_type, period_year) DO NOTHING;

INSERT INTO api_data_sources (source_name, base_url, active, rate_limit_per_minute, last_sync_at)
VALUES
    ('OpenAlex', 'https://api.openalex.org', TRUE, 60, CURRENT_TIMESTAMP),
    ('Crossref', 'https://api.crossref.org', TRUE, 50, CURRENT_TIMESTAMP),
    ('Semantic Scholar', 'https://api.semanticscholar.org/graph/v1', TRUE, 30, CURRENT_TIMESTAMP)
ON CONFLICT (source_name) DO NOTHING;
