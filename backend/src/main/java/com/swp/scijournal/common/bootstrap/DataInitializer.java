package com.swp.scijournal.common.bootstrap;

import com.swp.scijournal.auth.entity.Role;
import com.swp.scijournal.auth.entity.RoleName;
import com.swp.scijournal.auth.repository.RoleRepository;
import com.swp.scijournal.paper.entity.Author;
import com.swp.scijournal.paper.entity.Journal;
import com.swp.scijournal.paper.entity.Keyword;
import com.swp.scijournal.paper.entity.ResearchPaper;
import com.swp.scijournal.paper.repository.AuthorRepository;
import com.swp.scijournal.paper.repository.JournalRepository;
import com.swp.scijournal.paper.repository.KeywordRepository;
import com.swp.scijournal.paper.repository.ResearchPaperRepository;
import com.swp.scijournal.user.entity.User;
import com.swp.scijournal.user.repository.UserRepository;
import java.util.LinkedHashSet;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final JournalRepository journalRepository;
    private final AuthorRepository authorRepository;
    private final KeywordRepository keywordRepository;
    private final ResearchPaperRepository researchPaperRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
        RoleRepository roleRepository,
        UserRepository userRepository,
        JournalRepository journalRepository,
        AuthorRepository authorRepository,
        KeywordRepository keywordRepository,
        ResearchPaperRepository researchPaperRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.journalRepository = journalRepository;
        this.authorRepository = authorRepository;
        this.keywordRepository = keywordRepository;
        this.researchPaperRepository = researchPaperRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedRoles();
        seedUsers();
        seedPapers();
    }

    private void seedRoles() {
        for (RoleName roleName : RoleName.values()) {
            roleRepository.findByName(roleName).orElseGet(() -> {
                Role role = new Role();
                role.setName(roleName);
                return roleRepository.save(role);
            });
        }
    }

    private void seedUsers() {
        if (userRepository.existsByUsername("admin")) {
            return;
        }

        createUser("admin", "admin@swp.local", "123456", "System Administrator", RoleName.ADMIN);
        createUser("student01", "student01@swp.local", "123456", "Student Demo", RoleName.LECTURER_STUDENT);
        createUser("researcher01", "researcher01@swp.local", "123456", "Researcher Demo", RoleName.RESEARCHER);
    }

    private void createUser(String username, String email, String password, String fullName, RoleName roleName) {
        Role role = roleRepository.findByName(roleName).orElseThrow();

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(role);
        userRepository.save(user);
    }

    private void seedPapers() {
        if (researchPaperRepository.count() > 0) {
            return;
        }

        Journal journal1 = saveJournal("Journal of Artificial Intelligence Research", "1076-9757");
        Journal journal2 = saveJournal("IEEE Access", "2169-3536");

        Author author1 = saveAuthor("Andrew Ng");
        Author author2 = saveAuthor("Yoshua Bengio");
        Author author3 = saveAuthor("Fei-Fei Li");

        Keyword keyword1 = saveKeyword("machine learning");
        Keyword keyword2 = saveKeyword("deep learning");
        Keyword keyword3 = saveKeyword("computer vision");
        Keyword keyword4 = saveKeyword("trend analysis");

        ResearchPaper paper1 = new ResearchPaper();
        paper1.setTitle("Machine Learning Publication Trends in Computer Science");
        paper1.setAbstractText("This paper analyzes machine learning publication growth across major computer science journals.");
        paper1.setPublicationYear(2024);
        paper1.setSourceName("OpenAlex");
        paper1.setSourcePaperId("OA-ML-2024-001");
        paper1.setJournal(journal1);
        paper1.setAuthors(new LinkedHashSet<>(List.of(author1, author2)));
        paper1.setKeywords(new LinkedHashSet<>(List.of(keyword1, keyword2, keyword4)));

        ResearchPaper paper2 = new ResearchPaper();
        paper2.setTitle("Deep Learning and Vision Research Topic Evolution");
        paper2.setAbstractText("The study explores how deep learning transformed computer vision publications over time.");
        paper2.setPublicationYear(2023);
        paper2.setSourceName("Crossref");
        paper2.setSourcePaperId("CR-DL-2023-002");
        paper2.setJournal(journal2);
        paper2.setAuthors(new LinkedHashSet<>(List.of(author2, author3)));
        paper2.setKeywords(new LinkedHashSet<>(List.of(keyword2, keyword3)));

        ResearchPaper paper3 = new ResearchPaper();
        paper3.setTitle("Research Trend Tracking Using Academic Metadata");
        paper3.setAbstractText("A metadata-driven approach for tracking emerging topics from public academic APIs.");
        paper3.setPublicationYear(2025);
        paper3.setSourceName("Semantic Scholar");
        paper3.setSourcePaperId("SS-RT-2025-003");
        paper3.setJournal(journal2);
        paper3.setAuthors(new LinkedHashSet<>(List.of(author1, author3)));
        paper3.setKeywords(new LinkedHashSet<>(List.of(keyword1, keyword4)));

        researchPaperRepository.saveAll(List.of(paper1, paper2, paper3));
    }

    private Journal saveJournal(String name, String issn) {
        Journal journal = new Journal();
        journal.setName(name);
        journal.setIssn(issn);
        return journalRepository.save(journal);
    }

    private Author saveAuthor(String name) {
        Author author = new Author();
        author.setName(name);
        return authorRepository.save(author);
    }

    private Keyword saveKeyword(String name) {
        Keyword keyword = new Keyword();
        keyword.setName(name);
        return keywordRepository.save(keyword);
    }
}
