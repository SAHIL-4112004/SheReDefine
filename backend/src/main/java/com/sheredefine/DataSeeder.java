package com.sheredefine;

import com.sheredefine.model.Notice;
import com.sheredefine.model.Opportunity;
import com.sheredefine.model.User;
import com.sheredefine.repository.NoticeRepository;
import com.sheredefine.repository.OpportunityRepository;
import com.sheredefine.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final OpportunityRepository opportunityRepository;
    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    public DataSeeder(OpportunityRepository opportunityRepository, NoticeRepository noticeRepository, UserRepository userRepository) {
        this.opportunityRepository = opportunityRepository;
        this.noticeRepository = noticeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (opportunityRepository.count() < 16) {
            opportunityRepository.deleteAll();
            seedOpportunities();
        }
        if (noticeRepository.count() == 0) {
            seedNotices();
        }
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedOpportunities() {
        Opportunity opp1 = new Opportunity();
        opp1.setId("opp-1");
        opp1.setTitle("Associate Software Engineer");
        opp1.setCompany("Google India");
        opp1.setType("INTERNSHIP");
        opp1.setCategory("fresh");
        opp1.setMode("Hybrid");
        opp1.setLocation("Bangalore, India");
        opp1.setEligibility("B.Tech/M.Tech female students graduating in 2026/2027");
        opp1.setDeadline("2026-06-30");
        opp1.setSeats(45);
        opp1.setIsPaid(true);
        opp1.setPrice("Stipend: ₹80,000/mo");
        opp1.setDescription("Join the Google Engineering team for a 12-week intensive summer internship program focusing on scalable systems.");
        opp1.setStatus("approved");
        opp1.setFeatured(true);
        opp1.setExtraDetails("Women-friendly entry role");
        opp1.setPosterTemplate("tech-blue");
        opp1.setLogoUrl("https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=120&auto=format&fit=crop");

        Opportunity opp2 = new Opportunity();
        opp2.setId("opp-2");
        opp2.setTitle("Senior Product Manager (Returnship)");
        opp2.setCompany("Salesforce");
        opp2.setType("JOB");
        opp2.setCategory("break");
        opp2.setMode("Remote");
        opp2.setLocation("Remote, India");
        opp2.setEligibility("Women with 2+ years of career gap and 5+ years prior PM experience");
        opp2.setDeadline("2026-06-15");
        opp2.setSeats(12);
        opp2.setIsPaid(true);
        opp2.setPrice("Competitive Salary");
        opp2.setDescription("A 6-month returnship program with dedicated mentorship, transition training, and high potential for full-time conversion.");
        opp2.setStatus("approved");
        opp2.setFeatured(true);
        opp2.setExtraDetails("Includes transition training");
        opp2.setPosterTemplate("sunset-rose");
        opp2.setLogoUrl("https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=120&auto=format&fit=crop");

        Opportunity opp3 = new Opportunity();
        opp3.setId("opp-3");
        opp3.setTitle("Freelance Technical Content Creator");
        opp3.setCompany("GeeksforGeeks");
        opp3.setType("JOB");
        opp3.setCategory("switch");
        opp3.setMode("Remote");
        opp3.setLocation("Remote");
        opp3.setEligibility("Open to women looking to switch careers or enter tech writing. Strong domain knowledge.");
        opp3.setDeadline("2026-07-10");
        opp3.setSeats(30);
        opp3.setIsPaid(true);
        opp3.setPrice("₹3,000 per article");
        opp3.setDescription("Write technical articles on algorithms, system design, or modern tech stacks. Work at your own pace, anytime.");
        opp3.setStatus("approved");
        opp3.setFeatured(false);
        opp3.setExtraDetails("Flexible hours");
        opp3.setLogoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop");

        Opportunity opp4 = new Opportunity();
        opp4.setId("opp-4");
        opp4.setTitle("Webinar: Re-entering the Tech Workspace after a Break");
        opp4.setCompany("Women in Tech India");
        opp4.setType("WEBINAR");
        opp4.setCategory("break");
        opp4.setMode("Online");
        opp4.setLocation("Zoom");
        opp4.setEligibility("Any woman currently on a career break planning a return");
        opp4.setDeadline("2026-06-05");
        opp4.setSeats(500);
        opp4.setIsPaid(false);
        opp4.setPrice("Free");
        opp4.setDescription("An interactive webinar with HR leaders and successful returnees sharing tips on resumes, interviews, and upskilling.");
        opp4.setStatus("approved");
        opp4.setFeatured(false);
        opp4.setExtraDetails("Live QA Session");
        opp4.setLogoUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=120&auto=format&fit=crop");

        Opportunity opp5 = new Opportunity();
        opp5.setId("opp-5");
        opp5.setTitle("Data Science Skill Bootcamp");
        opp5.setCompany("UpGrad Academy");
        opp5.setType("TRAINING");
        opp5.setCategory("fresh");
        opp5.setMode("Online");
        opp5.setLocation("UpGrad Portal");
        opp5.setEligibility("Graduates wanting to launch a career in Data Analytics / AI");
        opp5.setDeadline("2026-06-25");
        opp5.setSeats(100);
        opp5.setIsPaid(false);
        opp5.setPrice("Free (Scholarship-based)");
        opp5.setDescription("A 6-week fast-paced hands-on training module covering SQL, Python, and basic machine learning modeling.");
        opp5.setStatus("approved");
        opp5.setFeatured(true);
        opp5.setExtraDetails("Certificate on completion");
        opp5.setPosterTemplate("emerald-green");
        opp5.setLogoUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=120&auto=format&fit=crop");

        Opportunity opp6 = new Opportunity();
        opp6.setId("opp-6");
        opp6.setTitle("Leadership & Strategy Advisor");
        opp6.setCompany("Sheroes Council");
        opp6.setType("JOB");
        opp6.setCategory("switch");
        opp6.setMode("Hybrid");
        opp6.setLocation("Delhi NCR");
        opp6.setEligibility("Women with 15+ years experience in corporate or education sector");
        opp6.setDeadline("2026-06-20");
        opp6.setSeats(5);
        opp6.setIsPaid(true);
        opp6.setPrice("₹1,500/hour");
        opp6.setDescription("Provide strategic guidance and mentoring to young women entrepreneurs and small businesses starting up.");
        opp6.setStatus("approved");
        opp6.setFeatured(false);
        opp6.setExtraDetails("Part-time, flexible");
        opp6.setLogoUrl("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=120&auto=format&fit=crop");

        Opportunity opp7 = new Opportunity();
        opp7.setId("opp-7");
        opp7.setTitle("Chess Tournament");
        opp7.setCompany("Devverse");
        opp7.setType("COMPETITION");
        opp7.setCategory("fresh");
        opp7.setMode("Online");
        opp7.setLocation("Online");
        opp7.setEligibility("Open to all female chess and coding enthusiasts");
        opp7.setDeadline("2026-06-25");
        opp7.setSeats(100);
        opp7.setIsPaid(false);
        opp7.setPrice("Free");
        opp7.setDescription("Showcase your strategic skills in this national chess tournament for female tech professionals.");
        opp7.setStatus("approved");
        opp7.setFeatured(false);
        opp7.setLogoUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=120&auto=format&fit=crop");

        Opportunity opp8 = new Opportunity();
        opp8.setId("opp-8");
        opp8.setTitle("Lead the justice: Turning Conviction into Action");
        opp8.setCompany("InteractUp");
        opp8.setType("COMPETITION");
        opp8.setCategory("break");
        opp8.setMode("Online");
        opp8.setLocation("Online");
        opp8.setEligibility("Women interested in design, policy, and social justice advocacy");
        opp8.setDeadline("2026-06-28");
        opp8.setSeats(150);
        opp8.setIsPaid(false);
        opp8.setPrice("Free");
        opp8.setDescription("A visual and written challenge to design justice-oriented awareness campaigns.");
        opp8.setStatus("approved");
        opp8.setFeatured(false);
        opp8.setLogoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop");

        Opportunity opp9 = new Opportunity();
        opp9.setId("opp-9");
        opp9.setTitle("Safal Money Content Sprint : AI-First FinTech");
        opp9.setCompany("Safal Money");
        opp9.setType("COMPETITION");
        opp9.setCategory("switch");
        opp9.setMode("Online");
        opp9.setLocation("Online");
        opp9.setEligibility("Writers, creators and prompt engineers seeking FinTech experience");
        opp9.setDeadline("2026-07-02");
        opp9.setSeats(50);
        opp9.setIsPaid(true);
        opp9.setPrice("Cash prize: ₹25,000");
        opp9.setDescription("Sprint to build AI-powered content workflows for financial technology platforms.");
        opp9.setStatus("approved");
        opp9.setFeatured(false);
        opp9.setLogoUrl("https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=120&auto=format&fit=crop");

        Opportunity opp10 = new Opportunity();
        opp10.setId("opp-10");
        opp10.setTitle("1-on-1 Resume & Portfolio Review");
        opp10.setCompany("Anjali Sen (Meta PM)");
        opp10.setType("MENTORSHIP");
        opp10.setCategory("fresh");
        opp10.setMode("Online");
        opp10.setLocation("Zoom");
        opp10.setEligibility("Women preparing for product management roles");
        opp10.setDeadline("2026-06-30");
        opp10.setSeats(10);
        opp10.setIsPaid(false);
        opp10.setPrice("Free");
        opp10.setDescription("Book a direct session to align your resume with product manager criteria.");
        opp10.setStatus("approved");
        opp10.setFeatured(false);
        opp10.setLogoUrl("https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=120&auto=format&fit=crop");

        Opportunity opp11 = new Opportunity();
        opp11.setId("opp-11");
        opp11.setTitle("Career Transition Coaching: Non-Tech to Tech");
        opp11.setCompany("Priya Sharma (Sr. Eng Lead)");
        opp11.setType("MENTORSHIP");
        opp11.setCategory("switch");
        opp11.setMode("Online");
        opp11.setLocation("Zoom");
        opp11.setEligibility("Women pivoting careers into software engineering");
        opp11.setDeadline("2026-06-25");
        opp11.setSeats(8);
        opp11.setIsPaid(false);
        opp11.setPrice("Free");
        opp11.setDescription("Get advisory from a senior engineering manager on shifting to developer roles.");
        opp11.setStatus("approved");
        opp11.setFeatured(false);
        opp11.setLogoUrl("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=120&auto=format&fit=crop");

        Opportunity opp12 = new Opportunity();
        opp12.setId("opp-12");
        opp12.setTitle("Product Design Intern");
        opp12.setCompany("Salesforce");
        opp12.setType("INTERNSHIP");
        opp12.setCategory("fresh");
        opp12.setMode("Remote");
        opp12.setLocation("Remote, India");
        opp12.setEligibility("Female design/fine arts students graduating in 2026/2027");
        opp12.setDeadline("2026-07-05");
        opp12.setSeats(10);
        opp12.setIsPaid(true);
        opp12.setPrice("Stipend: ₹40,000/mo");
        opp12.setDescription("Design mockups, wireframes and user flows for business analytics dashboards.");
        opp12.setStatus("approved");
        opp12.setFeatured(false);
        opp12.setLogoUrl("https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=120&auto=format&fit=crop");

        Opportunity opp13 = new Opportunity();
        opp13.setId("opp-13");
        opp13.setTitle("Data Analyst Intern");
        opp13.setCompany("Cred");
        opp13.setType("INTERNSHIP");
        opp13.setCategory("fresh");
        opp13.setMode("Hybrid");
        opp13.setLocation("Bangalore");
        opp13.setEligibility("B.Tech/BSc graduates with strong SQL and Tableau skills");
        opp13.setDeadline("2026-06-28");
        opp13.setSeats(5);
        opp13.setIsPaid(true);
        opp13.setPrice("Stipend: ₹50,000/mo");
        opp13.setDescription("Work with marketing and product growth teams to extract insight from payment patterns.");
        opp13.setStatus("approved");
        opp13.setFeatured(false);
        opp13.setLogoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop");

        Opportunity opp14 = new Opportunity();
        opp14.setId("opp-14");
        opp14.setTitle("Front-End Developer Intern");
        opp14.setCompany("Adobe");
        opp14.setType("INTERNSHIP");
        opp14.setCategory("fresh");
        opp14.setMode("Online");
        opp14.setLocation("Online");
        opp14.setEligibility("CS/IT undergraduate students with basic React proficiency");
        opp14.setDeadline("2026-07-15");
        opp14.setSeats(20);
        opp14.setIsPaid(true);
        opp14.setPrice("Stipend: ₹60,000/mo");
        opp14.setDescription("Develop dynamic UI components for Creative Cloud web applications.");
        opp14.setStatus("approved");
        opp14.setFeatured(false);
        opp14.setLogoUrl("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=120&auto=format&fit=crop");

        Opportunity opp15 = new Opportunity();
        opp15.setId("opp-15");
        opp15.setTitle("Mock Technical Interview Prep");
        opp15.setCompany("Meera Nair (Principal Architect at AWS)");
        opp15.setType("MENTORSHIP");
        opp15.setCategory("break");
        opp15.setMode("Online");
        opp15.setLocation("Zoom");
        opp15.setEligibility("Women returning to code or seeking senior architect positions");
        opp15.setDeadline("2026-06-30");
        opp15.setSeats(5);
        opp15.setIsPaid(false);
        opp15.setPrice("Free");
        opp15.setDescription("Practice system design and software architecture questions in a live setting.");
        opp15.setStatus("approved");
        opp15.setFeatured(false);
        opp15.setLogoUrl("https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=120&auto=format&fit=crop");

        Opportunity opp16 = new Opportunity();
        opp16.setId("opp-16");
        opp16.setTitle("Late Career Transition Advice");
        opp16.setCompany("Kiran Mazumdar (Director at Sheroes)");
        opp16.setType("MENTORSHIP");
        opp16.setCategory("switch");
        opp16.setMode("Online");
        opp16.setLocation("Zoom");
        opp16.setEligibility("Women switching domains or entering tech in late 35s/40s");
        opp16.setDeadline("2026-07-02");
        opp16.setSeats(10);
        opp16.setIsPaid(false);
        opp16.setPrice("Free");
        opp16.setDescription("Consult on resume re-branding, networking, and mapping experience to new entry vectors.");
        opp16.setStatus("approved");
        opp16.setFeatured(false);
        opp16.setLogoUrl("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=120&auto=format&fit=crop");

        opportunityRepository.saveAll(Arrays.asList(opp1, opp2, opp3, opp4, opp5, opp6, opp7, opp8, opp9, opp10, opp11, opp12, opp13, opp14, opp15, opp16));
    }

    private void seedNotices() {
        Notice n1 = new Notice();
        n1.setId("notice-1");
        n1.setTitle("Google Women Techmakers Applications Opening Soon");
        n1.setContent("Get ready! The applications for Google WTM scholars open next week. Make sure your resumes are updated and verified on SheReDefine.");
        n1.setDate("2026-05-30");
        n1.setType("ANNOUNCEMENT");
        n1.setPostedBy("System Admin");

        Notice n2 = new Notice();
        n2.setId("notice-2");
        n2.setTitle("Resume Review Workshop with Salesforce Leads");
        n2.setContent("Join us this Saturday for a live resume review workshop. Limited seats. Register from the learning modules tab.");
        n2.setDate("2026-05-29");
        n2.setType("ANNOUNCEMENT");
        n2.setPostedBy("System Admin");

        noticeRepository.saveAll(Arrays.asList(n1, n2));
    }

    private void seedUsers() {
        // Seed default Candidate
        User candidate = new User();
        candidate.setName("Aaradhya Sen");
        candidate.setFirstName("Aaradhya");
        candidate.setLastName("Sen");
        candidate.setUsername("aaradhya_sen_100");
        candidate.setEmail("aaradhya.sen@example.com");
        candidate.setPhone("+91 98765 43210");
        candidate.setPassword("password123");
        candidate.setRole("participant");
        candidate.setIsVerified(true);
        candidate.setCategory("break");
        candidate.setGender("Female");
        candidate.setDob("1994-08-15");
        candidate.setProfilePhoto("");
        candidate.setDocUploaded("aadhaar_masked.pdf");
        
        String detailsJson = "{"
            + "\"careerBreak\":{"
            + "\"startDate\":\"2023-01-01\","
            + "\"endDate\":\"2026-01-01\","
            + "\"currentlyActive\":\"No\","
            + "\"reasonForBreak\":[\"Child Care\",\"Family Responsibilities\"],"
            + "\"duringBreak\":[\"Online Courses\",\"Certifications\",\"Homemaker\"]"
            + "},"
            + "\"previousExperience\":["
            + "{"
            + "\"companyName\":\"Infosys\","
            + "\"designation\":\"Senior Software Engineer\","
            + "\"industry\":\"IT Services\","
            + "\"employmentType\":\"Full-time\","
            + "\"startDate\":\"2018-06-01\","
            + "\"endDate\":\"2022-12-31\","
            + "\"responsibilities\":\"Developed backend microservices using Java and Spring Boot.\","
            + "\"achievements\":\"Reduced database query latency by 40% through redis caching.\""
            + "}"
            + "],"
            + "\"skillsBreak\":{"
            + "\"existingSkills\":\"Java, Spring Boot, MySQL, REST APIs\","
            + "\"refreshedSkills\":\"React, Node.js, AI Tools (GitHub Copilot)\","
            + "\"skillsToImprove\":\"System Design, Kubernetes\""
            + "},"
            + "\"preferences\":{"
            + "\"jobTypes\":[\"Full-time\",\"Remote\"],"
            + "\"industry\":\"Technology\","
            + "\"expectedSalary\":\"₹18,0,0 LPA\","
            + "\"noticePeriod\":\"Immediate\","
            + "\"availableHours\":\"40 hours/week\""
            + "},"
            + "\"socialLinks\":{"
            + "\"linkedin\":\"\","
            + "\"github\":\"\","
            + "\"portfolio\":\"\","
            + "\"twitter\":\"\","
            + "\"instagram\":\"\","
            + "\"facebook\":\"\","
            + "\"customLinks\":[]"
            + "}"
            + "}";
        candidate.setProfileDetailsJson(detailsJson);

        // Seed default Host
        User host = new User();
        host.setName("Neeraja Iyer");
        host.setFirstName("Neeraja");
        host.setLastName("Iyer");
        host.setUsername("neeraja_iyer_200");
        host.setEmail("neeraja.iyer@salesforce.com");
        host.setPhone("Salesforce Partner");
        host.setPassword("password123");
        host.setRole("host");
        host.setIsVerified(true);
        host.setCategory("host");
        host.setDocUploaded("org_license.pdf");
        String hostDetailsJson = "{"
            + "\"companyName\":\"Salesforce\","
            + "\"companyWebsite\":\"https://salesforce.com\","
            + "\"companyIndustry\":\"Cloud Software / SaaS\","
            + "\"companyLogo\":\"https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=120&auto=format&fit=crop\","
            + "\"companyDescription\":\"We are a global leader in customer relationship management (CRM) software, helping companies connect with their customers in a whole new way.\","
            + "\"recruiterTitle\":\"Senior Recruiter\","
            + "\"recruiterBio\":\"Passionate about finding outstanding diverse talent and helping returners launch back into tech roles.\","
            + "\"socialLinks\":{"
            + "\"linkedin\":\"https://linkedin.com/in/neerajaiyer\","
            + "\"twitter\":\"https://twitter.com/neerajaiyer\""
            + "}"
            + "}";
        host.setProfileDetailsJson(hostDetailsJson);

        userRepository.saveAll(Arrays.asList(candidate, host));
    }
}
