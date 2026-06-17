INSERT INTO roles (name)
VALUES ('ADMIN'), ('LECTURER_STUDENT'), ('RESEARCHER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, role_id)
SELECT 'admin', 'admin@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'System Administrator', TRUE, r.id
FROM roles r
WHERE r.name = 'ADMIN'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, role_id)
SELECT 'student01', 'student01@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'Student Demo', TRUE, r.id
FROM roles r
WHERE r.name = 'LECTURER_STUDENT'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, email, password, full_name, active, role_id)
SELECT 'researcher01', 'researcher01@swp.local', '$2a$10$5Q3sQkYkFhR8YjvQ8Fz0F.C2aV3bIhK6M6Q8kG7x8OQ2X3o7r0V6e', 'Researcher Demo', TRUE, r.id
FROM roles r
WHERE r.name = 'RESEARCHER'
ON CONFLICT (username) DO NOTHING;

INSERT INTO journals (name, issn)
VALUES
    ('Journal of Artificial Intelligence Research', '1076-9757'),
    ('IEEE Access', '2169-3536')
ON CONFLICT (name) DO NOTHING;

INSERT INTO authors (name)
VALUES
    ('Andrew Ng'),
    ('Yoshua Bengio'),
    ('Fei-Fei Li')
ON CONFLICT (name) DO NOTHING;

INSERT INTO keywords (name)
VALUES
    ('machine learning'),
    ('deep learning'),
    ('computer vision'),
    ('trend analysis')
ON CONFLICT (name) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, source_name, source_paper_id, journal_id)
SELECT
    'Machine Learning Publication Trends in Computer Science',
    'This paper analyzes machine learning publication growth across major computer science journals.',
    2024,
    'OpenAlex',
    'OA-ML-2024-001',
    j.id
FROM journals j
WHERE j.name = 'Journal of Artificial Intelligence Research'
ON CONFLICT (source_name, source_paper_id) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, source_name, source_paper_id, journal_id)
SELECT
    'Deep Learning and Vision Research Topic Evolution',
    'The study explores how deep learning transformed computer vision publications over time.',
    2023,
    'Crossref',
    'CR-DL-2023-002',
    j.id
FROM journals j
WHERE j.name = 'IEEE Access'
ON CONFLICT (source_name, source_paper_id) DO NOTHING;

INSERT INTO research_papers (title, abstract_text, publication_year, source_name, source_paper_id, journal_id)
SELECT
    'Research Trend Tracking Using Academic Metadata',
    'A metadata-driven approach for tracking emerging topics from public academic APIs.',
    2025,
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

INSERT INTO notifications (user_id, title, content, read)
SELECT u.id, 'New publication synced', 'A new research paper was synchronized from OpenAlex.', FALSE
FROM users u
WHERE u.username = 'researcher01'
ON CONFLICT DO NOTHING;

INSERT INTO publication_trends (target_name, target_type, period_year, publication_count)
VALUES
    ('machine learning', 'KEYWORD', 2023, 12),
    ('machine learning', 'KEYWORD', 2024, 18),
    ('machine learning', 'KEYWORD', 2025, 26),
    ('deep learning', 'KEYWORD', 2023, 15),
    ('deep learning', 'KEYWORD', 2024, 20)
ON CONFLICT (target_name, target_type, period_year) DO NOTHING;

INSERT INTO api_data_sources (source_name, base_url, active)
VALUES
    ('OpenAlex', 'https://api.openalex.org', TRUE),
    ('Crossref', 'https://api.crossref.org', TRUE),
    ('Semantic Scholar', 'https://api.semanticscholar.org/graph/v1', TRUE)
ON CONFLICT (source_name) DO NOTHING;
