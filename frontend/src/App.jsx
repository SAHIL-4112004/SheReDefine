import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Briefcase,
  BookOpen,
  Users,
  ShieldAlert,
  CheckCircle,
  Calendar,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Lock,
  X,
  Compass,
  ArrowUpRight,
  Home,
  GraduationCap,
  Trophy,
  UserCheck,
  FileQuestion,
  Video,
  Code,
  MoreHorizontal,
  Activity,
  Sparkles,
  Route,
  Award,
  History,
  Heart,
  Bookmark,
  Laptop,
  Smartphone,
  Mail,
  Trash2,
  ArrowLeft,
  Bell,
  BellOff,
  FileText,
  ExternalLink,
  Send,
  Paperclip
} from 'lucide-react';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_CLUBS,
  INITIAL_APPLICATIONS,
  CURATED_COURSES,
  INITIAL_NOTICES
} from './data/mockData';

const CLUB_DETAILS_LOOKUP = {
  "club-tech": {
    category: "Technology & Engineering",
    description: "Empowering women in software engineering, product management, design, and system architecture. Join our discussion and share opportunities!",
    coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=120&auto=format&fit=crop",
    media: {
      files: [
        { name: "Resume_Guide_Tech.pdf", size: "1.2 MB", type: "PDF" },
        { name: "System_Design_Fundamentals.pdf", size: "4.5 MB", type: "PDF" },
        { name: "Salesforce_PM_Returnship_Details.pdf", size: "890 KB", type: "PDF" }
      ],
      links: [
        { name: "Tech Returnee Checklist", url: "https://example.com/checklist" },
        { name: "Interview Prep Resources", url: "https://geeksforgeeks.org" }
      ]
    },
    membersList: {
      moderators: [
        { name: "Nisha Rao", title: "Engineering Lead @ Google", initial: "NR", color: "bg-pink-100 text-pink-600" },
        { name: "Ananya Sen", title: "Staff Architect @ Salesforce", initial: "AS", color: "bg-teal-100 text-teal-600" }
      ],
      members: [
        { name: "Devanshi Garg", title: "Member since May 2026", initial: "DG", color: "bg-blue-100 text-blue-600" },
        { name: "Priya Sharma", title: "Member since Apr 2026", initial: "PS", color: "bg-purple-100 text-purple-600" },
        { name: "Kiran Mazumdar", title: "Member since Jun 2026", initial: "KM", color: "bg-orange-100 text-orange-600" }
      ]
    }
  },
  "club-ent": {
    category: "Business & Startups",
    description: "Accelerating female founders, startups, pitching strategies, venture capital, and sustainable business models. Connect and build together.",
    coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    logoUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=120&auto=format&fit=crop",
    media: {
      files: [
        { name: "Pitch_Deck_Template_2026.pdf", size: "2.1 MB", type: "PDF" },
        { name: "FemTech_Market_Research.pdf", size: "3.4 MB", type: "PDF" }
      ],
      links: [
        { name: "VC Funding Application Form", url: "https://example.com/vc-apply" },
        { name: "SheReDefine Mentorship Match", url: "https://example.com/mentorship" }
      ]
    },
    membersList: {
      moderators: [
        { name: "Aaradhya Sen", title: "Founder @ FemHealth", initial: "AS", color: "bg-pink-100 text-pink-600" },
        { name: "Priya Sharma", title: "Co-founder @ Safal Money", initial: "PS", color: "bg-teal-100 text-teal-600" }
      ],
      members: [
        { name: "Nisha Rao", title: "Member since Mar 2026", initial: "NR", color: "bg-blue-100 text-blue-600" },
        { name: "Kiran Mazumdar", title: "Member since Feb 2026", initial: "KM", color: "bg-orange-100 text-orange-600" },
        { name: "Devanshi Garg", title: "Member since May 2026", initial: "DG", color: "bg-purple-100 text-purple-600" }
      ]
    }
  },
  "club-data": {
    category: "Data Science & AI",
    description: "Exploring data analytics, machine learning, deep learning models, SQL/Python data pipelines, and artificial intelligence ethics.",
    coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop",
    media: {
      files: [
        { name: "Data_Science_Bootcamp_Syllabus.pdf", size: "750 KB", type: "PDF" },
        { name: "SQL_Cheatsheet_for_Interviews.pdf", size: "1.8 MB", type: "PDF" }
      ],
      links: [
        { name: "Kaggle Dataset Directory", url: "https://kaggle.com" },
        { name: "UpGrad Academy Program", url: "https://upgrad.com" }
      ]
    },
    membersList: {
      moderators: [
        { name: "Kiran Mazumdar", title: "Chief Data Scientist", initial: "KM", color: "bg-pink-100 text-pink-600" },
        { name: "Ananya Sharma", title: "Senior Analyst @ Cred", initial: "AS", color: "bg-teal-100 text-teal-600" }
      ],
      members: [
        { name: "Nisha Rao", title: "Member since Jan 2026", initial: "NR", color: "bg-blue-100 text-blue-600" },
        { name: "Aaradhya Sen", title: "Member since Apr 2026", initial: "AS", color: "bg-purple-100 text-purple-600" },
        { name: "Devanshi Garg", title: "Member since May 2026", initial: "DG", color: "bg-orange-100 text-orange-600" }
      ]
    }
  }
};

function createDefaultProfileDetails() {
  return {
    education: {
      qualification: "",
      course: "",
      specialization: "",
      college: "",
      startYear: "",
      endYear: "",
      courseType: "Full-time",
      cgpa: "",
      rollNumber: "",
      description: ""
    },
    skills: {
      technicalSkills: "",
      softSkills: "",
      languages: "",
      proficiency: "Intermediate"
    },
    resumeName: "resume.pdf",
    projects: [],
    certificates: [],
    positions: [],
    workExperience: {
      internship: "",
      freelance: "",
      partTime: ""
    },
    aboutMe: "",
    personalDetails: {
      permanentAddress: "",
      currentAddress: "",
      hobbies: ""
    },
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: "",
      instagram: "",
      facebook: "",
      customLinks: []
    },
    careerBreak: {
      startDate: "",
      endDate: "",
      currentlyActive: "No",
      reasonForBreak: [],
      otherReason: "",
      duringBreak: []
    },
    previousExperience: [],
    skillsBreak: {
      existingSkills: "",
      refreshedSkills: "",
      skillsToImprove: ""
    },
    certificationsBreak: [],
    preferences: {
      jobTypes: [],
      industry: "",
      expectedSalary: "",
      noticePeriod: "",
      availableHours: ""
    },
    resumesBreak: {
      previousResume: "previous_resume.pdf",
      updatedResume: "updated_resume.pdf"
    },
    confidenceBuilder: {
      supportNeeded: []
    },
    currentSituation: "Homemaker",
    informalExperience: [],
    skillsAssessment: {
      existingSkills: {
        Communication: 3,
        Leadership: 3,
        Organization: 3,
        Finance: 3,
        Teaching: 3,
        Sales: 3,
        Technology: 3
      },
      digitalSkills: {
        "MS Office": 3,
        Excel: 3,
        Email: 3,
        "Google Workspace": 3,
        "Social Media": 3,
        "AI Tools": 3,
        Programming: 1
      }
    },
    learningInterests: [],
    workPreferencesLate: {
      modes: [],
      schedules: [],
      jobTypes: []
    },
    journey: "",
    supportLate: []
  };
}

function createDefaultHostProfileDetails() {
  return {
    companyName: "",
    companyWebsite: "",
    companyIndustry: "",
    companyLogo: "",
    companyDescription: "",
    recruiterTitle: "",
    recruiterBio: "",
    socialLinks: {
      linkedin: "",
      twitter: ""
    }
  };
}

const MOCK_INTERVIEW_QUESTIONS = {
  technical: [
    "Explain how React fiber reconciliation works under the hood.",
    "What are the trade-offs of micro-frontends versus a modular monolith?",
    "Explain the difference between optimistic UI updates and traditional loading states with examples.",
    "How does the browser rendering engine work, and how can we optimize React layout rendering for heavy DOM trees?",
    "Explain the difference between call, apply, and bind in JavaScript."
  ],
  behavioral: [
    "Tell me about a time you had to deliver a critical project with vague or changing requirements. How did you align stakeholders?",
    "Describe a situation where you had a strong disagreement with a technical decision made by your lead. How did you resolve it?",
    "How do you approach a significant career gap on your resume when talking to hiring managers?",
    "Tell me about a time you made a technical mistake that impacted production. What did you learn?"
  ],
  system: [
    "Design a real-time collaborative document editor like Google Docs. How do you handle operational transformation?",
    "Design a rate limiter for a public API that can scale to 100,000 requests per second.",
    "How would you architect a global distribution system for video streaming like Netflix?",
    "How do you design a database schema and indexing strategy for a high-traffic e-commerce cart system?"
  ]
};

export default function App() {
  const API_BASE = window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8080" 
    : "http://localhost:8080";

  // --------------------------------------------------
  // Core State & Authentication
  // --------------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('she_is_logged_in') === 'true';
  });

  const [loginRole, setLoginRole] = useState("candidate"); // candidate, host
  const [loginMode, setLoginMode] = useState("user"); // user, admin

  const [authView, setAuthView] = useState("login"); // login, register
  const [authError, setAuthError] = useState(null);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "fresh",
    companyName: "",
    contactName: "",
    businessEmail: "",
    partnerRole: "Employer",
    password: "",
    confirmPassword: "",
    declarationChecked: false
  });

  const [adminForm, setAdminForm] = useState({
    email: "admin@sheredefine.com",
    password: "admin123"
  });

  const [adminNoticeForm, setAdminNoticeForm] = useState({ title: "", content: "" });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('she_current_user');
    let user = saved ? JSON.parse(saved) : {
      name: "",
      email: "",
      phone: "",
      role: "participant", // participant, host, admin
      isVerified: false,
      category: "fresh",
      docUploaded: ""
    };
    if (user) {
      if (user.name && (!user.firstName || !user.lastName)) {
        const parts = user.name.trim().split(/\s+/);
        user.firstName = parts[0] || "";
        user.lastName = parts.slice(1).join(" ") || "";
      } else {
        user.firstName = user.firstName || "";
        user.lastName = user.lastName || "";
      }
      if (!user.username) {
        user.username = user.name ? (user.name.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900)) : "";
      }
      if (!user.gender) {
        user.gender = "Female";
      }
      if (!user.dob) {
        user.dob = "";
      }
      if (!user.profilePhoto) {
        user.profilePhoto = "";
      }
      if (user.profileDetails) {
        user.profileDetails = user.role === "host"
          ? { ...createDefaultHostProfileDetails(), ...user.profileDetails }
          : { ...createDefaultProfileDetails(), ...user.profileDetails };
      } else {
        user.profileDetails = user.role === "host" ? createDefaultHostProfileDetails() : createDefaultProfileDetails();
      }
    }
    return user;
  });

  useEffect(() => {
    localStorage.setItem('she_is_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('she_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('she_opportunities_react');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length < INITIAL_OPPORTUNITIES.length) {
        localStorage.setItem('she_opportunities_react', JSON.stringify(INITIAL_OPPORTUNITIES));
        return INITIAL_OPPORTUNITIES;
      }
      return parsed;
    }
    return INITIAL_OPPORTUNITIES;
  });

  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('she_clubs_react');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length < INITIAL_CLUBS.length) {
        localStorage.setItem('she_clubs_react', JSON.stringify(INITIAL_CLUBS));
        return INITIAL_CLUBS;
      }
      return parsed;
    }
    return INITIAL_CLUBS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('she_applications_react');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [webinarRegistrations, setWebinarRegistrations] = useState(() => {
    const saved = localStorage.getItem('she_webinars_react');
    return saved ? JSON.parse(saved) : ["opp-4"];
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('she_notices_react');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [selectedOppDetail, setSelectedOppDetail] = useState(null);

  // Navigation & Filtering State
  const [currentView, setCurrentView] = useState("opportunities"); // opportunities, community, courses, applications, host, admin
  const [currentTab, setCurrentTab] = useState("all"); // all, fresh, break, switch
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterMode, setFilterMode] = useState("ALL");

  // My Activity tab-specific states
  const [activeActivityTab, setActiveActivityTab] = useState("applications"); // applications, rounds, courses, sessions, certificates, history, watchlist, bookmarks
  const [watchlist, setWatchlist] = useState(["opp-1", "opp-3"]);
  const [recentlyViewed, setRecentlyViewed] = useState(["opp-2", "opp-5", "opp-6"]);

  // Interactive states for new modules
  const [mockTestsEmail, setMockTestsEmail] = useState("");
  const [mockTestsSubmitted, setMockTestsSubmitted] = useState(false);
  const [suggestedTopic, setSuggestedTopic] = useState("");
  const [suggestedTopicSubmitted, setSuggestedTopicSubmitted] = useState(false);
  const [mockTestsReminded, setMockTestsReminded] = useState({}); // { [testTitle]: boolean }

  const [mockInterviewsEmail, setMockInterviewsEmail] = useState("");
  const [mockInterviewsSubmitted, setMockInterviewsSubmitted] = useState(false);
  const [mockInterviewTrack, setMockInterviewTrack] = useState("technical"); // technical, behavioral, system
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(
    "How does the browser rendering engine work, and how can we optimize React layout rendering for heavy DOM trees?"
  );

  const [codeQuestCode, setCodeQuestCode] = useState(
    `function reverseLinkedList(head) {\n  // Type your JavaScript solution here...\n  let prev = null;\n  let current = head;\n  while (current !== null) {\n    let nextTemp = current.next;\n    current.next = prev;\n    prev = current;\n    current = nextTemp;\n  }\n  return prev;\n}`
  );
  const [codeQuestStatus, setCodeQuestStatus] = useState("idle"); // idle, running, success

  // SPA History Stack for Back/Forward Navigation in Dock
  const [historyStack, setHistoryStack] = useState([{ view: "opportunities", filterType: "ALL" }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isNavigatingHistory, setIsNavigatingHistory] = useState(false);

  // Sync current page view & type filter changes to the custom history stack
  useEffect(() => {
    if (isNavigatingHistory) {
      setIsNavigatingHistory(false);
      return;
    }
    const currentState = historyStack[historyIndex];
    if (currentState && currentState.view === currentView && currentState.filterType === filterType) {
      return;
    }
    // Truncate stack after current index and append new entry
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push({ view: currentView, filterType: filterType });
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  }, [currentView, filterType]);

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setIsNavigatingHistory(true);
      setHistoryIndex(newIndex);
      const target = historyStack[newIndex];
      setCurrentView(target.view);
      setFilterType(target.filterType);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setIsNavigatingHistory(true);
      setHistoryIndex(newIndex);
      const target = historyStack[newIndex];
      setCurrentView(target.view);
      setFilterType(target.filterType);
    }
  };

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [authStep, setAuthStep] = useState(1);
  const [authForm, setAuthForm] = useState({ name: "", email: "", phone: "", selfDec: "female", doc: null });
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyOpp, setApplyOpp] = useState(null);
  const [applyForm, setApplyForm] = useState({ resumeName: "resume_submitted.pdf", coverNote: "" });
  const [selectedOppForApplicants, setSelectedOppForApplicants] = useState(null);

  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [hostFormStep, setHostFormStep] = useState(1);
  const [hostForm, setHostForm] = useState({
    title: "",
    company: "",
    type: "JOB",
    category: "fresh",
    mode: "Online",
    location: "",
    deadline: "",
    seats: 10,
    isPaid: "Paid",
    price: "",
    eligibility: "",
    description: "",
    featured: false,
    posterTemplate: "tech-blue",
    posterUrl: "",
    
    // Common Metadata
    hostVerificationProof: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    posterRelationship: "HR",
    lifeStageTags: ["student"],
    shortDescription: "",
    applicationLink: "in-platform",
    
    // Type-Specific Details (Job)
    jobEmploymentType: "full-time",
    jobExperienceLevel: "fresher",
    jobSalaryRange: "",
    jobRequiredSkills: "",
    jobCareerBreakFriendly: "yes",
    
    // Type-Specific Details (Internship)
    internshipDuration: "",
    internshipStipend: "",
    internshipHoursPerWeek: "full-time",
    internshipEligibility: "",
    internshipConversionOffer: "maybe",
    internshipCertificate: "yes",
    
    // Type-Specific Details (Competition)
    competitionFormat: "solo",
    competitionMaxTeamSize: 4,
    competitionTheme: "",
    competitionPrizeDetails: "",
    competitionRegistrationFee: "Free",
    competitionTimeline: "",
    competitionEligibility: "open to all",
    competitionRubricLink: "",
    
    // Type-Specific Details (Mentorship)
    mentorshipExpertise: "",
    mentorshipBio: "",
    mentorshipLinkedIn: "",
    mentorshipFormat: "1:1",
    mentorshipDuration: "",
    mentorshipPaidOrFree: "Free",
    mentorshipWhoFor: "",
    mentorshipSelectionProcess: "open",
    
    // Type-Specific Details (Course/Workshop)
    courseInstructorCredentials: "",
    courseMode: "live",
    courseDuration: "",
    coursePrice: "Free",
    courseCertificate: "yes",
    coursePrerequisites: "",
    coursePlatform: "",
    courseSchedule: "",
    
    // Type-Specific Details (Club/Community)
    clubFocus: "",
    clubMembershipType: "open",
    clubFee: "Free",
    clubPlatform: "Discord",
    clubActivityCadence: "",
    clubGuidelinesLink: "",
    clubSizeCap: ""
  });

  const [hostActiveTab, setHostActiveTab] = useState("overview");
  const [expandedDock, setExpandedDock] = useState("none"); // "none", "user", "host"
  const [editingOpp, setEditingOpp] = useState(null);
  const [isEditOppModalOpen, setIsEditOppModalOpen] = useState(false);
  const [candidateProfileToView, setCandidateProfileToView] = useState(null);

  const [adminExpandedOppId, setAdminExpandedOppId] = useState(null);

  const parseOppDetails = (opp) => {
    if (!opp) return {};
    if (opp.detailsJson) {
      try {
        return JSON.parse(opp.detailsJson);
      } catch (err) {
        console.log("Error parsing detailsJson:", err);
      }
    }
    // Fallback support for seeded/mock opportunities
    return {
      experienceLevel: opp.eligibility || "",
      salaryRange: opp.price || "Not Disclosed",
      requiredSkills: opp.extraDetails ? opp.extraDetails.split(",") : []
    };
  };

  const navigateHostTab = (direction) => {
    const tabs = ["overview", "jobs", "internships", "competitions", "mentorship", "mock_prep", "webinars", "clubs", "applications", "company"];
    let currentIndex = tabs.indexOf(hostActiveTab);
    if (currentIndex === -1) currentIndex = 0;

    if (direction === "next") {
      if (currentIndex < tabs.length - 1) {
        setCurrentView("host");
        setHostActiveTab(tabs[currentIndex + 1]);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentView("host");
        setHostActiveTab(tabs[currentIndex - 1]);
      }
    }
  };

  useEffect(() => {
    const handleHostDockKeyDown = (e) => {
      if (currentUser?.role !== "host" || expandedDock !== "host") return;

      // Ignore if user is typing in form fields
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select" || document.activeElement?.isContentEditable) {
        return;
      }

      const tabs = ["overview", "jobs", "internships", "competitions", "mentorship", "mock_prep", "webinars", "clubs", "applications", "company"];
      if (e.key === "ArrowLeft") {
        const currentIndex = tabs.indexOf(hostActiveTab);
        if (currentIndex > 0) {
          e.preventDefault();
          navigateHostTab("prev");
        }
      } else if (e.key === "ArrowRight") {
        const currentIndex = tabs.indexOf(hostActiveTab);
        if (currentIndex < tabs.length - 1) {
          e.preventDefault();
          navigateHostTab("next");
        }
      }
    };

    window.addEventListener("keydown", handleHostDockKeyDown);
    return () => {
      window.removeEventListener("keydown", handleHostDockKeyDown);
    };
  }, [currentUser, expandedDock, hostActiveTab]);
  const [editOppForm, setEditOppForm] = useState({
    title: "",
    company: "",
    type: "JOB",
    category: "fresh",
    mode: "Online",
    location: "",
    deadline: "",
    seats: 10,
    isPaid: "Paid",
    price: "",
    eligibility: "",
    description: "",
    featured: false,
    posterTemplate: "tech-blue",
    posterUrl: ""
  });

  const [hostSearchQuery, setHostSearchQuery] = useState("");
  const [hostStatusFilter, setHostStatusFilter] = useState("ALL");
  const [hostRoleFilter, setHostRoleFilter] = useState("ALL");

  // Temporary Form States for lists
  const [newProject, setNewProject] = useState({ title: "", description: "", technologies: "", teamSize: "", duration: "", projectLink: "", githubLink: "" });
  const [newCert, setNewCert] = useState({ name: "", org: "", issueDate: "", url: "" });
  const [newPosition, setNewPosition] = useState({ title: "", roleType: "Club Position", organization: "", duration: "" });
  const [newExperience, setNewExperience] = useState({ companyName: "", designation: "", industry: "", employmentType: "Full-time", startDate: "", endDate: "", responsibilities: "", achievements: "" });
  const [newCertBreak, setNewCertBreak] = useState({ courseName: "", platform: "", completionDate: "", certificateName: "" });
  const [newInformal, setNewInformal] = useState({ activityName: "", duration: "", responsibilities: "", skillsUsed: "" });
  const [newCustomLink, setNewCustomLink] = useState({ label: "", url: "" });

  // Host detail review state
  const [selectedAppDetails, setSelectedAppDetails] = useState(null);

  // Community Chat & Club detail states
  const [selectedClubId, setSelectedClubId] = useState(null);

  const [clubChats, setClubChats] = useState(() => {
    const saved = localStorage.getItem('she_club_chats');
    if (saved) return JSON.parse(saved);
    return {
      "club-tech": [
        { id: 1, sender: "Nisha Rao", time: "2 hours ago", text: "Has anyone completed the Salesforce Returnship before? Thinking of applying for the Senior PM role.", color: "text-[#db2777]" },
        { id: 2, sender: "Devanshi Garg", time: "1 hour ago", text: "Yes! The transition support program they offer is excellent. You get allocated a peer buddy from day one. Definitely go for it!", color: "text-[#0d9488]" }
      ],
      "club-ent": [
        { id: 1, sender: "Aaradhya Sen", time: "3 hours ago", text: "Looking for co-founders for a new FemTech platform in the healthcare space. Any leads?", color: "text-[#db2777]" },
        { id: 2, sender: "Priya Sharma", time: "2 hours ago", text: "I'd love to discuss! I have a background in healthcare product management.", color: "text-[#0d9488]" }
      ],
      "club-data": [
        { id: 1, sender: "Ananya Sharma", time: "5 hours ago", text: "Has anyone started the Data Science Skill Bootcamp on UpGrad?", color: "text-[#db2777]" },
        { id: 2, sender: "Kiran Mazumdar", time: "4 hours ago", text: "Yes, the SQL modules are excellent. Highly recommend starting this week.", color: "text-[#0d9488]" }
      ]
    };
  });

  const [clubSettings, setClubSettings] = useState(() => {
    const saved = localStorage.getItem('she_club_settings');
    if (saved) return JSON.parse(saved);
    return {
      "club-tech": { muteNotifications: false },
      "club-ent": { muteNotifications: false },
      "club-data": { muteNotifications: false }
    };
  });

  const [newMessageText, setNewMessageText] = useState("");
  const [activeMediaTab, setActiveMediaTab] = useState("files");
  const [isCreateClubModalOpen, setIsCreateClubModalOpen] = useState(false);
  const [createClubForm, setCreateClubForm] = useState({
    name: "",
    icon: "💻",
    category: "Technology",
    description: "",
    coverPreset: "tech"
  });

  useEffect(() => {
    localStorage.setItem('she_club_chats', JSON.stringify(clubChats));
  }, [clubChats]);

  useEffect(() => {
    localStorage.setItem('she_club_settings', JSON.stringify(clubSettings));
  }, [clubSettings]);

  const dockRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (dockRef.current && (dockRef.current === document.activeElement || dockRef.current.contains(document.activeElement))) {
        if (e.key === "ArrowLeft") {
          handleGoBack();
        } else if (e.key === "ArrowRight") {
          handleGoForward();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [historyIndex, historyStack]);

  // Application Settings collapsible and form states
  const [expandedSettings, setExpandedSettings] = useState({
    notifications: true,
    password: true,
    security: true,
    account: true,
    devices: true
  });

  const [newsletterActive, setNewsletterActive] = useState(() => {
    const saved = localStorage.getItem('she_settings_newsletter');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [automatedReminders, setAutomatedReminders] = useState(() => {
    const saved = localStorage.getItem('she_settings_reminders');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [jobAlerts, setJobAlerts] = useState(() => {
    const saved = localStorage.getItem('she_settings_job_alerts');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [mfaActive, setMfaActive] = useState(() => {
    const saved = localStorage.getItem('she_settings_mfa');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [profileVisibility, setProfileVisibility] = useState(() => {
    const saved = localStorage.getItem('she_settings_visibility');
    return saved !== null ? JSON.parse(saved) : "Public";
  });

  const [loggedDevices, setLoggedDevices] = useState(() => {
    const saved = localStorage.getItem('she_settings_devices');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: "device-1",
        os: "macOS",
        browser: "Chrome",
        location: "Mumbai, India",
        time: "Active Now",
        isCurrent: true
      },
      {
        id: "device-2",
        os: "Android 13 (Samsung Galaxy S23)",
        browser: "Samsung Internet",
        location: "Pune, India",
        time: "Last active: 2 hours ago",
        isCurrent: false
      },
      {
        id: "device-3",
        os: "Android 12 (OnePlus Nord)",
        browser: "Chrome Mobile",
        location: "Delhi, India",
        time: "Last active: 3 days ago",
        isCurrent: false
      }
    ];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('she_opportunities_react', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('she_clubs_react', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('she_applications_react', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('she_webinars_react', JSON.stringify(webinarRegistrations));
  }, [webinarRegistrations]);

  useEffect(() => {
    localStorage.setItem('she_notices_react', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('she_settings_newsletter', JSON.stringify(newsletterActive));
  }, [newsletterActive]);

  useEffect(() => {
    localStorage.setItem('she_settings_reminders', JSON.stringify(automatedReminders));
  }, [automatedReminders]);

  useEffect(() => {
    localStorage.setItem('she_settings_job_alerts', JSON.stringify(jobAlerts));
  }, [jobAlerts]);

  useEffect(() => {
    localStorage.setItem('she_settings_mfa', JSON.stringify(mfaActive));
  }, [mfaActive]);

  useEffect(() => {
    localStorage.setItem('she_settings_visibility', JSON.stringify(profileVisibility));
  }, [profileVisibility]);

  useEffect(() => {
    localStorage.setItem('she_settings_devices', JSON.stringify(loggedDevices));
  }, [loggedDevices]);

  // Log new device session when user successfully logs in
  useEffect(() => {
    if (isLoggedIn && currentUser && currentUser.email) {
      const ua = navigator.userAgent;
      let os = "macOS";
      if (ua.indexOf("Windows") !== -1) os = "Windows";
      else if (ua.indexOf("Android") !== -1) os = "Android Phone";
      else if (ua.indexOf("iPhone") !== -1) os = "iPhone";
      else if (ua.indexOf("Linux") !== -1) os = "Linux";

      let browser = "Chrome";
      if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
      else if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Safari";
      else if (ua.indexOf("Edg") !== -1) browser = "Edge";

      setLoggedDevices(prev => {
        // If current device session is already active in the list, keep it
        const hasCurrent = prev.some(d => d.isCurrent && d.os === os && d.browser === browser);
        if (hasCurrent) {
          return prev;
        }

        // De-mark other current device sessions
        const updated = prev.map(d => ({
          ...d,
          isCurrent: false,
          time: d.isCurrent ? "Last active: Just now" : d.time
        }));

        // Add new session
        const newSession = {
          id: "device-" + Date.now(),
          os: os,
          browser: browser,
          location: "Mumbai, India",
          time: "Active Now",
          isCurrent: true
        };
        return [newSession, ...updated];
      });
    }
  }, [isLoggedIn, currentUser?.email]);

  // Fetch from Spring Boot backend if available, fallback to localStorage/mock data
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const oppsRes = await fetch(`${API_BASE}/api/opportunities`);
        if (oppsRes.ok) {
          const oppsData = await oppsRes.json();
          if (oppsData && oppsData.length > 0) {
            setOpportunities(oppsData);
          }
        }
      } catch (err) {
        console.log("Backend not running or unreachable, using local opportunities data:", err);
      }

      try {
        const noticesRes = await fetch(`${API_BASE}/api/notices`);
        if (noticesRes.ok) {
          const noticesData = await noticesRes.json();
          if (noticesData && noticesData.length > 0) {
            setNotices(noticesData);
          }
        }
      } catch (err) {
        console.log("Backend not running or unreachable, using local notices data:", err);
      }

      try {
        const appsRes = await fetch(`${API_BASE}/api/applications`);
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          if (appsData && appsData.length > 0) {
            const parsedApps = appsData.map(app => {
              if (app.submittedDetailsJson) {
                try {
                  return { ...app, submittedDetails: JSON.parse(app.submittedDetailsJson) };
                } catch (e) {
                  return app;
                }
              }
              return app;
            });
            setApplications(parsedApps);
          }
        }
      } catch (err) {
        console.log("Backend not running or unreachable, using local applications data:", err);
      }
    };
    fetchBackendData();
  }, [isLoggedIn]);

  // Click outside user menu or more menu to close them
  useEffect(() => {
    if (!isProfileDropdownOpen && !isMoreDropdownOpen) return;
    const handleOutsideClick = () => {
      setIsProfileDropdownOpen(false);
      setIsMoreDropdownOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isProfileDropdownOpen, isMoreDropdownOpen]);

  // --------------------------------------------------
  // Filtering & Computing Listings
  // --------------------------------------------------
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // 1. Must be approved (only admins can see pending listings in their own dashboard)
      if (opp.status !== "approved") return false;

      // 2. Life stage category filter
      if (currentTab !== "all" && opp.category !== currentTab) return false;

      // 3. Search query matching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchString = `${opp.title} ${opp.company} ${opp.description} ${opp.location}`.toLowerCase();
        if (!matchString.includes(query)) return false;
      }

      // 4. Type filter
      if (filterType !== "ALL" && opp.type !== filterType) return false;

      // 5. Mode filter
      if (filterMode !== "ALL" && opp.mode.toUpperCase() !== filterMode) return false;

      return true;
    });
  }, [opportunities, currentTab, searchQuery, filterType, filterMode]);

  const featuredOpportunities = useMemo(() => {
    return opportunities.filter(opp =>
      opp.status === "approved" && (opp.featured || ["opp-1", "opp-2", "opp-5"].includes(opp.id))
    );
  }, [opportunities]);

  const internshipOpportunities = useMemo(() => {
    return opportunities.filter(opp => opp.type === "INTERNSHIP" && opp.status === "approved");
  }, [opportunities]);

  const jobOpportunities = useMemo(() => {
    return opportunities.filter(opp => opp.type === "JOB" && opp.status === "approved");
  }, [opportunities]);

  const competitionOpportunities = useMemo(() => {
    return opportunities.filter(opp => opp.type === "COMPETITION" && opp.status === "approved");
  }, [opportunities]);

  const mentorshipOpportunities = useMemo(() => {
    return opportunities.filter(opp => opp.type === "MENTORSHIP" && opp.status === "approved");
  }, [opportunities]);

  const webinarOpportunities = useMemo(() => {
    return opportunities.filter(opp => (opp.type === "WEBINAR" || opp.type === "WORKSHOP") && opp.status === "approved");
  }, [opportunities]);

  // --------------------------------------------------
  // UI Interactions
  // --------------------------------------------------
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setCurrentUser(prev => ({ ...prev, role: selectedRole }));
    if (selectedRole === "host") {
      setCurrentView("opportunities");
    } else if (selectedRole === "admin") {
      setCurrentView("admin");
    } else {
      setCurrentView("opportunities");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser(prev => ({
          ...prev,
          profilePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileDetail = (section, field, value) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      if (field === null) {
        details[section] = value;
      } else {
        details[section] = {
          ...details[section],
          [field]: value
        };
      }
      return {
        ...prev,
        profileDetails: details
      };
    });
  };

  const handleCheckboxChange = (section, field, option, checked) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      let list = details[section]?.[field] || [];
      if (checked) {
        list = [...list, option];
      } else {
        list = list.filter(o => o !== option);
      }
      details[section] = {
        ...details[section],
        [field]: list
      };
      return { ...prev, profileDetails: details };
    });
  };

  const handleTopCheckboxChange = (field, option, checked) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      let list = details[field] || [];
      if (checked) {
        list = [...list, option];
      } else {
        list = list.filter(o => o !== option);
      }
      details[field] = list;
      return { ...prev, profileDetails: details };
    });
  };

  const handleRatingChange = (assessmentType, skillName, value) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.skillsAssessment = {
        ...details.skillsAssessment,
        [assessmentType]: {
          ...details.skillsAssessment[assessmentType],
          [skillName]: parseInt(value)
        }
      };
      return { ...prev, profileDetails: details };
    });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!currentUser.firstName || !currentUser.lastName || !currentUser.phone) {
      alert("First Name, Last Name, and Phone Number are required.");
      return;
    }
    const updatedUser = {
      ...currentUser,
      name: `${currentUser.firstName} ${currentUser.lastName}`.trim()
    };

    // Construct the backend payload with serialized profileDetailsJson
    const backendPayload = {
      ...updatedUser,
      profileDetailsJson: JSON.stringify(updatedUser.profileDetails || createDefaultProfileDetails())
    };

    try {
      const response = await fetch(`${API_BASE}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(backendPayload)
      });

      if (response.ok) {
        const savedUser = await response.json();
        if (savedUser.profileDetailsJson) {
          try {
            savedUser.profileDetails = JSON.parse(savedUser.profileDetailsJson);
          } catch (err) {
            savedUser.profileDetails = updatedUser.profileDetails;
          }
        } else {
          savedUser.profileDetails = createDefaultProfileDetails();
        }
        setCurrentUser(savedUser);

        // Update local storage registered list
        const registeredUsers = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
        const idx = registeredUsers.findIndex(u => u.email.toLowerCase() === savedUser.email.toLowerCase() && u.role === savedUser.role);
        if (idx !== -1) {
          registeredUsers[idx] = savedUser;
        } else {
          registeredUsers.push(savedUser);
        }
        localStorage.setItem('she_registered_users', JSON.stringify(registeredUsers));

        alert("Profile details saved successfully on backend database!");
      } else {
        const errMsg = await response.text();
        alert("Failed to save profile on backend: " + errMsg);
      }
    } catch (err) {
      console.warn("Backend server not reached. Saving locally:", err);
      // Fallback local storage save
      setCurrentUser(updatedUser);
      const registeredUsers = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
      const idx = registeredUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase() && u.role === updatedUser.role);
      if (idx !== -1) {
        registeredUsers[idx] = updatedUser;
      } else {
        registeredUsers.push(updatedUser);
      }
      localStorage.setItem('she_registered_users', JSON.stringify(registeredUsers));
      alert("Profile details saved successfully (Offline Mode)!");
    }
  };

  const addProject = () => {
    if (!newProject.title) return alert("Project title is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.projects = [...(details.projects || []), newProject];
      return { ...prev, profileDetails: details };
    });
    setNewProject({ title: "", description: "", technologies: "", teamSize: "", duration: "", projectLink: "", githubLink: "" });
  };

  const removeProject = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.projects = details.projects.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addCertificate = () => {
    if (!newCert.name) return alert("Certificate name is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.certificates = [...(details.certificates || []), newCert];
      return { ...prev, profileDetails: details };
    });
    setNewCert({ name: "", org: "", issueDate: "", url: "" });
  };

  const removeCertificate = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.certificates = details.certificates.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addPosition = () => {
    if (!newPosition.title) return alert("Position title is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.positions = [...(details.positions || []), newPosition];
      return { ...prev, profileDetails: details };
    });
    setNewPosition({ title: "", roleType: "Club Position", organization: "", duration: "" });
  };

  const removePosition = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.positions = details.positions.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addExperience = () => {
    if (!newExperience.companyName) return alert("Company name is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.previousExperience = [...(details.previousExperience || []), newExperience];
      return { ...prev, profileDetails: details };
    });
    setNewExperience({ companyName: "", designation: "", industry: "", employmentType: "Full-time", startDate: "", endDate: "", responsibilities: "", achievements: "" });
  };

  const removeExperience = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.previousExperience = details.previousExperience.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addCertBreak = () => {
    if (!newCertBreak.courseName) return alert("Course name is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.certificationsBreak = [...(details.certificationsBreak || []), newCertBreak];
      return { ...prev, profileDetails: details };
    });
    setNewCertBreak({ courseName: "", platform: "", completionDate: "", certificateName: "" });
  };

  const removeCertBreak = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.certificationsBreak = details.certificationsBreak.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addInformal = () => {
    if (!newInformal.activityName) return alert("Activity name is required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.informalExperience = [...(details.informalExperience || []), newInformal];
      return { ...prev, profileDetails: details };
    });
    setNewInformal({ activityName: "", duration: "", responsibilities: "", skillsUsed: "" });
  };

  const removeInformal = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.informalExperience = details.informalExperience.filter((_, i) => i !== index);
      return { ...prev, profileDetails: details };
    });
  };

  const addCustomLink = () => {
    if (!newCustomLink.label || !newCustomLink.url) return alert("Label and URL are required.");
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.socialLinks = {
        ...details.socialLinks,
        customLinks: [...(details.socialLinks?.customLinks || []), newCustomLink]
      };
      return { ...prev, profileDetails: details };
    });
    setNewCustomLink({ label: "", url: "" });
  };

  const removeCustomLink = (index) => {
    setCurrentUser(prev => {
      const details = { ...prev.profileDetails };
      details.socialLinks = {
        ...details.socialLinks,
        customLinks: details.socialLinks.customLinks.filter((_, i) => i !== index)
      };
      return { ...prev, profileDetails: details };
    });
  };

  const handleApplyNow = (opp) => {
    if (currentUser.role === "host") {
      alert("Host accounts cannot apply to opportunities.");
      return;
    }
    setApplyOpp(opp);
    const details = currentUser.profileDetails || {};
    let rName = "resume.pdf";
    if (currentUser.category === "break" && details.resumesBreak?.updatedResume) {
      rName = details.resumesBreak.updatedResume;
    } else if (details.resumeName) {
      rName = details.resumeName;
    }
    setApplyForm({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      phone: currentUser.phone || "",
      resumeName: rName,
      coverNote: ""
    });
    setIsApplyModalOpen(true);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!applyOpp) return;

    const newApp = {
      id: "app-" + Date.now(),
      opportunityId: applyOpp.id,
      opportunityTitle: applyOpp.title,
      company: applyOpp.company,
      candidateName: `${applyForm.firstName || currentUser.firstName || currentUser.name} ${applyForm.lastName || currentUser.lastName || ""}`.trim(),
      email: currentUser.email,
      phone: applyForm.phone || currentUser.phone || "",
      resume: applyForm.resumeName,
      coverNote: applyForm.coverNote,
      status: "Applied",
      appliedAt: new Date().toISOString().split('T')[0],
      submittedDetails: {
        category: currentUser.category,
        basicInfo: {
          firstName: applyForm.firstName || currentUser.firstName || "",
          lastName: applyForm.lastName || currentUser.lastName || "",
          phone: applyForm.phone || currentUser.phone || "",
          gender: currentUser.gender,
          dob: currentUser.dob
        },
        ...(currentUser.profileDetails || createDefaultProfileDetails())
      }
    };

    setApplications(prev => [...prev, newApp]);

    const backendApp = {
      id: newApp.id,
      opportunityId: newApp.opportunityId,
      opportunityTitle: newApp.opportunityTitle,
      company: newApp.company,
      candidateName: newApp.candidateName,
      email: newApp.email,
      phone: newApp.phone,
      resume: newApp.resume,
      coverNote: newApp.coverNote,
      status: newApp.status,
      appliedAt: newApp.appliedAt,
      submittedDetailsJson: JSON.stringify(newApp.submittedDetails)
    };

    fetch(`${API_BASE}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendApp)
    }).catch(err => console.log("Failed to persist application to backend:", err));

    setIsApplyModalOpen(false);
    setApplyForm({ firstName: "", lastName: "", phone: "", resumeName: "resume_submitted.pdf", coverNote: "" });
    alert("Application successfully submitted! Track progress in 'My Applications'.");
  };

  // Settings view interactive handlers
  const toggleSettingsPanel = (panelName) => {
    setExpandedSettings(prev => ({
      ...prev,
      [panelName]: !prev[panelName]
    }));
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password updated successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeviceLogout = (deviceId) => {
    const targetDevice = loggedDevices.find(d => d.id === deviceId);
    if (targetDevice && targetDevice.isCurrent) {
      const confirmLogout = window.confirm("This is your current active session. Would you like to log out of your account?");
      if (confirmLogout) {
        // Log out user
        setCurrentUser(null);
        setCurrentView("opportunities");
        alert("You have been logged out.");
      }
      return;
    }

    setLoggedDevices(prev => prev.filter(d => d.id !== deviceId));
    alert("Logged out of device session successfully.");
  };

  const handleLogoutAllDevices = () => {
    const confirmAll = window.confirm("Are you sure you want to log out of all other active sessions?");
    if (confirmAll) {
      setLoggedDevices(prev => prev.filter(d => d.isCurrent));
      alert("All other sessions have been logged out successfully.");
    }
  };

  const handleDeleteAccount = () => {
    const doubleCheck = window.confirm(
      "WARNING: This action is permanent and cannot be undone. Are you sure you want to delete your SheReDefine account?"
    );
    if (doubleCheck) {
      setCurrentUser(null);
      setCurrentView("opportunities");
      alert("Your account has been deleted. We are sorry to see you go!");
    }
  };

  const saveOpportunityToBackend = async (newOpp) => {
    try {
      await fetch(`${API_BASE}/api/opportunities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOpp)
      });
    } catch (err) {
      console.log("Could not save opportunity to backend:", err);
    }
  };

  const saveNoticeToBackend = async (newNotice) => {
    try {
      await fetch(`${API_BASE}/api/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice)
      });
    } catch (err) {
      console.log("Could not save notice to backend:", err);
    }
  };

  const deleteNoticeFromBackend = async (noticeId) => {
    try {
      await fetch(`${API_BASE}/api/notices/${noticeId}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.log("Could not delete notice from backend:", err);
    }
  };

  const syncOpportunityStatusToBackend = async (id, status) => {
    try {
      await fetch(`${API_BASE}/api/opportunities/${id}/status?status=${status}`, {
        method: "PUT"
      });
    } catch (err) {
      console.log("Could not sync opportunity status to backend:", err);
    }
  };

  const syncOpportunityFeaturedToBackend = async (id, featured, template, url) => {
    try {
      let endpoint = `${API_BASE}/api/opportunities/${id}/featured?featured=${featured}`;
      if (template) endpoint += `&posterTemplate=${template}`;
      if (url) endpoint += `&posterUrl=${encodeURIComponent(url)}`;
      await fetch(endpoint, {
        method: "PUT"
      });
    } catch (err) {
      console.log("Could not sync opportunity featured status to backend:", err);
    }
  };

  const registerForWebinar = (oppId) => {
    if (currentUser.role === "host") {
      alert("Host accounts cannot register for events.");
      return;
    }
    if (webinarRegistrations.includes(oppId)) return;
    setWebinarRegistrations(prev => [...prev, oppId]);
    alert("Registration Successful! An invite and calendar reminder have been sent to your email.");
  };

  const toggleLifeStageTag = (tag) => {
    setHostForm(prev => {
      const tags = prev.lifeStageTags.includes(tag)
        ? prev.lifeStageTags.filter(t => t !== tag)
        : [...prev.lifeStageTags, tag];
      return { ...prev, lifeStageTags: tags };
    });
  };

  const submitNewOpportunity = (e) => {
    e.preventDefault();

    const categoryDetails = {};
    if (hostForm.type === "JOB") {
      categoryDetails.employmentType = hostForm.jobEmploymentType;
      categoryDetails.experienceLevel = hostForm.jobExperienceLevel;
      categoryDetails.salaryRange = hostForm.jobSalaryRange;
      categoryDetails.requiredSkills = hostForm.jobRequiredSkills.split(",").map(s => s.trim()).filter(Boolean);
      categoryDetails.careerBreakFriendly = hostForm.jobCareerBreakFriendly;
      categoryDetails.openings = hostForm.seats;
    } else if (hostForm.type === "INTERNSHIP") {
      categoryDetails.duration = hostForm.internshipDuration;
      categoryDetails.stipend = hostForm.internshipStipend;
      categoryDetails.hoursPerWeek = hostForm.internshipHoursPerWeek;
      categoryDetails.eligibility = hostForm.internshipEligibility;
      categoryDetails.conversionOffer = hostForm.internshipConversionOffer;
      categoryDetails.certificate = hostForm.internshipCertificate;
    } else if (hostForm.type === "COMPETITION") {
      categoryDetails.format = hostForm.competitionFormat;
      categoryDetails.maxTeamSize = hostForm.competitionMaxTeamSize;
      categoryDetails.theme = hostForm.competitionTheme;
      categoryDetails.prizeDetails = hostForm.competitionPrizeDetails;
      categoryDetails.registrationFee = hostForm.competitionRegistrationFee;
      categoryDetails.timeline = hostForm.competitionTimeline;
      categoryDetails.eligibility = hostForm.competitionEligibility;
      categoryDetails.rubricLink = hostForm.competitionRubricLink;
    } else if (hostForm.type === "MENTORSHIP") {
      categoryDetails.mentorExpertise = hostForm.mentorshipExpertise;
      categoryDetails.mentorBio = hostForm.mentorshipBio;
      categoryDetails.mentorLinkedIn = hostForm.mentorshipLinkedIn;
      categoryDetails.format = hostForm.mentorshipFormat;
      categoryDetails.duration = hostForm.mentorshipDuration;
      categoryDetails.paidOrFree = hostForm.mentorshipPaidOrFree;
      categoryDetails.whoFor = hostForm.mentorshipWhoFor;
      categoryDetails.selectionProcess = hostForm.mentorshipSelectionProcess;
    } else if (hostForm.type === "WEBINAR" || hostForm.type === "WORKSHOP" || hostForm.type === "TRAINING" || hostForm.type === "COURSES") {
      categoryDetails.instructorCredentials = hostForm.courseInstructorCredentials;
      categoryDetails.courseMode = hostForm.courseMode;
      categoryDetails.duration = hostForm.courseDuration;
      categoryDetails.price = hostForm.coursePrice;
      categoryDetails.certificate = hostForm.courseCertificate;
      categoryDetails.prerequisites = hostForm.coursePrerequisites;
      categoryDetails.platform = hostForm.coursePlatform;
      categoryDetails.schedule = hostForm.courseSchedule;
    } else if (hostForm.type === "CLUB") {
      categoryDetails.clubFocus = hostForm.clubFocus;
      categoryDetails.membershipType = hostForm.clubMembershipType;
      categoryDetails.clubFee = hostForm.clubFee;
      categoryDetails.clubPlatform = hostForm.clubPlatform;
      categoryDetails.activityCadence = hostForm.clubActivityCadence;
      categoryDetails.guidelinesLink = hostForm.clubGuidelinesLink;
      categoryDetails.sizeCap = hostForm.clubSizeCap;
    }

    const newOpp = {
      id: "opp-" + Date.now(),
      title: hostForm.title,
      company: hostForm.company,
      type: hostForm.type,
      category: hostForm.category,
      mode: hostForm.mode,
      location: hostForm.location,
      eligibility: hostForm.eligibility,
      deadline: hostForm.deadline,
      seats: Number(hostForm.seats),
      isPaid: hostForm.isPaid === "Paid",
      price: hostForm.price || "Free",
      description: hostForm.description,
      status: "pending", // Needs Admin approval
      featured: hostForm.featured || false,
      extraDetails: hostForm.category === "break" ? "Returnship role" : (hostForm.category === "fresh" ? "Women-friendly entry" : "Switch role"),
      posterTemplate: hostForm.posterTemplate || "tech-blue",
      posterUrl: hostForm.posterUrl || "",

      // New columns mapping
      hostVerificationProof: hostForm.hostVerificationProof,
      contactPerson: hostForm.contactPerson,
      contactEmail: hostForm.contactEmail,
      contactPhone: hostForm.contactPhone,
      posterRelationship: hostForm.posterRelationship,
      lifeStageTags: hostForm.lifeStageTags.join(","),
      shortDescription: hostForm.shortDescription,
      applicationLink: hostForm.applicationLink,
      detailsJson: JSON.stringify(categoryDetails)
    };

    setOpportunities(prev => [...prev, newOpp]);
    saveOpportunityToBackend(newOpp);
    setIsHostModalOpen(false);
    setHostFormStep(1);
    setHostForm({
      title: "",
      company: "",
      type: "JOB",
      category: "fresh",
      mode: "Online",
      location: "",
      deadline: "",
      seats: 10,
      isPaid: "Paid",
      price: "",
      eligibility: "",
      description: "",
      featured: false,
      posterTemplate: "tech-blue",
      posterUrl: "",
      hostVerificationProof: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      posterRelationship: "HR",
      lifeStageTags: ["student"],
      shortDescription: "",
      applicationLink: "in-platform",
      jobEmploymentType: "full-time",
      jobExperienceLevel: "fresher",
      jobSalaryRange: "",
      jobRequiredSkills: "",
      jobCareerBreakFriendly: "yes",
      internshipDuration: "",
      internshipStipend: "",
      internshipHoursPerWeek: "full-time",
      internshipEligibility: "",
      internshipConversionOffer: "maybe",
      internshipCertificate: "yes",
      competitionFormat: "solo",
      competitionMaxTeamSize: 4,
      competitionTheme: "",
      competitionPrizeDetails: "",
      competitionRegistrationFee: "Free",
      competitionTimeline: "",
      competitionEligibility: "open to all",
      competitionRubricLink: "",
      mentorshipExpertise: "",
      mentorshipBio: "",
      mentorshipLinkedIn: "",
      mentorshipFormat: "1:1",
      mentorshipDuration: "",
      mentorshipPaidOrFree: "Free",
      mentorshipWhoFor: "",
      mentorshipSelectionProcess: "open",
      courseInstructorCredentials: "",
      courseMode: "live",
      courseDuration: "",
      coursePrice: "Free",
      courseCertificate: "yes",
      coursePrerequisites: "",
      coursePlatform: "",
      courseSchedule: "",
      clubFocus: "",
      clubMembershipType: "open",
      clubFee: "Free",
      clubPlatform: "Discord",
      clubActivityCadence: "",
      clubGuidelinesLink: "",
      clubSizeCap: ""
    });
    alert("Opportunity hosted successfully! Awaiting Admin approval before showing on public board.");
  };

  const updateOpportunityOnBackend = async (id, updatedOpp) => {
    try {
      await fetch(`${API_BASE}/api/opportunities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOpp)
      });
    } catch (err) {
      console.log("Could not update opportunity on backend:", err);
    }
  };

  const deleteOpportunityFromBackend = async (id) => {
    try {
      await fetch(`${API_BASE}/api/opportunities/${id}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.log("Could not delete opportunity from backend:", err);
    }
  };

  const submitEditedOpportunity = (e) => {
    e.preventDefault();
    if (!editingOpp) return;
    const updatedOpp = {
      ...editingOpp,
      title: editOppForm.title,
      company: editOppForm.company,
      type: editOppForm.type,
      category: editOppForm.category,
      mode: editOppForm.mode,
      location: editOppForm.location,
      eligibility: editOppForm.eligibility,
      deadline: editOppForm.deadline,
      seats: Number(editOppForm.seats),
      isPaid: editOppForm.isPaid === "Paid",
      price: editOppForm.price || "Free",
      description: editOppForm.description,
      featured: editOppForm.featured || false,
      posterTemplate: editOppForm.posterTemplate || "tech-blue",
      posterUrl: editOppForm.posterUrl || ""
    };

    setOpportunities(prev => prev.map(o => o.id === editingOpp.id ? updatedOpp : o));
    updateOpportunityOnBackend(editingOpp.id, updatedOpp);
    setIsEditOppModalOpen(false);
    setEditingOpp(null);
    alert("Opportunity updated successfully!");
  };

  const toggleClubJoin = (clubId) => {
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        return { ...c, joined: !c.joined, count: c.joined ? c.count - 1 : c.count + 1 };
      }
      return c;
    }));
  };

  const postChatMessage = () => {
    if (!newMessageText.trim() || !selectedClubId) return;
    const newMsg = {
      id: Date.now(),
      sender: currentUser.name || "Guest User",
      time: "Just now",
      text: newMessageText.trim(),
      color: "text-brand-600 font-black"
    };

    setClubChats(prev => ({
      ...prev,
      [selectedClubId]: [...(prev[selectedClubId] || []), newMsg]
    }));
    setNewMessageText("");
  };

  const handleEnterClub = (clubId) => {
    setSelectedClubId(clubId);
    setCurrentView("club-detail");
  };

  const toggleClubMute = (clubId) => {
    setClubSettings(prev => ({
      ...prev,
      [clubId]: {
        ...prev[clubId],
        muteNotifications: !prev[clubId]?.muteNotifications
      }
    }));
  };

  const submitNewClub = (e) => {
    e.preventDefault();
    if (!createClubForm.name.trim() || !createClubForm.description.trim()) return;

    const newClubId = `club-custom-${Date.now()}`;

    const coverPresets = {
      tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      startup: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      data: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      creative: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
      health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
    };

    const newClub = {
      id: newClubId,
      name: createClubForm.name.trim(),
      icon: createClubForm.icon,
      count: 1,
      joined: true
    };

    CLUB_DETAILS_LOOKUP[newClubId] = {
      category: createClubForm.category,
      description: createClubForm.description.trim(),
      coverUrl: coverPresets[createClubForm.coverPreset] || coverPresets.tech,
      logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=120&auto=format&fit=crop",
      media: {
        files: [
          { name: "Welcome_Guide.pdf", size: "250 KB", type: "PDF" }
        ],
        links: [
          { name: "SheReDefine Platform", url: "https://sheredefine.example.com" }
        ]
      },
      membersList: {
        moderators: [
          {
            name: currentUser.name || "Guest User",
            title: "Club Founder & Moderator",
            initial: (currentUser.name || "Guest User").split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2),
            color: "bg-brand-100 text-brand-650"
          }
        ],
        members: []
      }
    };

    const initialMsg = {
      id: Date.now(),
      sender: "System Bot",
      time: "Just now",
      text: `🎉 Welcome to #${createClubForm.name.trim().toLowerCase().replace(/\s+/g, "-")}! The channel was successfully created by ${currentUser.name || "Guest User"}.`,
      color: "text-slate-500 font-bold"
    };

    setClubChats(prev => {
      const updated = {
        ...prev,
        [newClubId]: [initialMsg]
      };
      localStorage.setItem('she_club_chats', JSON.stringify(updated));
      return updated;
    });

    setClubSettings(prev => {
      const updated = {
        ...prev,
        [newClubId]: { muteNotifications: false }
      };
      localStorage.setItem('she_club_settings', JSON.stringify(updated));
      return updated;
    });

    setClubs(prev => {
      const updated = [newClub, ...prev];
      localStorage.setItem('she_clubs_react', JSON.stringify(updated));
      return updated;
    });

    setIsCreateClubModalOpen(false);
    setCreateClubForm({
      name: "",
      icon: "💻",
      category: "Technology",
      description: "",
      coverPreset: "tech"
    });

    setSelectedClubId(newClubId);
    setCurrentView("club-detail");
  };

  const handleOtpInput = (val, idx) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[idx] = val;
    setOtpDigits(updatedDigits);

    if (val.length === 1 && idx < 3) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
  };

  const verifyOTPAndLogin = () => {
    setCurrentUser(prev => ({
      ...prev,
      name: authForm.name || "Aaradhya Sen",
      email: authForm.email || "aaradhya.sen@example.com",
      phone: authForm.phone,
      isVerified: true
    }));
    setIsAuthModalOpen(false);
    setAuthStep(1);
    setAuthForm({ name: "", email: "", phone: "", selfDec: "female", doc: null });
    setOtpDigits(["", "", "", ""]);
    alert("Authentication Successful! Safe access granted to SheReDefine.");
  };

  const handleRoleTabChange = (role) => {
    setLoginRole(role);
    setAuthError(null);
    setLoginForm({
      username: "",
      password: ""
    });
  };

  const toggleAuthView = (view) => {
    setAuthView(view);
    setAuthError(null);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    const {
      fullName,
      email,
      phone,
      category,
      companyName,
      contactName,
      businessEmail,
      partnerRole,
      password,
      confirmPassword,
      declarationChecked
    } = registerForm;

    // Check basic passwords match
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match. Please verify.");
      return;
    }

    let newUser = null;

    if (loginRole === "candidate") {
      if (!declarationChecked) {
        setAuthError("You must self-declare that you identify as a woman to register.");
        return;
      }
      const parts = fullName.trim().split(/\s+/);
      const fName = parts[0] || "";
      const lName = parts.slice(1).join(" ") || "";
      const generatedUsername = (fullName.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900));

      newUser = {
        name: fullName,
        firstName: fName,
        lastName: lName,
        username: generatedUsername,
        email: email,
        phone: phone,
        role: "participant",
        isVerified: true,
        category: category,
        gender: "Female",
        dob: "",
        profilePhoto: "",
        docUploaded: "aadhaar_masked.pdf",
        password: password,
        profileDetailsJson: JSON.stringify(createDefaultProfileDetails())
      };
    } else if (loginRole === "host") {
      newUser = {
        name: contactName,
        email: businessEmail,
        phone: companyName + " - " + partnerRole,
        role: "host",
        isVerified: true,
        category: "host",
        docUploaded: "org_license.pdf",
        password: password,
        profileDetailsJson: JSON.stringify(createDefaultHostProfileDetails())
      };
    }

    if (newUser) {
      try {
        const response = await fetch(`${API_BASE}/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          const savedUser = await response.json();
          if (savedUser.profileDetailsJson) {
            try {
              const parsed = JSON.parse(savedUser.profileDetailsJson);
              savedUser.profileDetails = savedUser.role === "host"
                ? { ...createDefaultHostProfileDetails(), ...parsed }
                : { ...createDefaultProfileDetails(), ...parsed };
            } catch (err) {
              savedUser.profileDetails = savedUser.role === "host" ? createDefaultHostProfileDetails() : createDefaultProfileDetails();
            }
          } else {
            savedUser.profileDetails = savedUser.role === "host" ? createDefaultHostProfileDetails() : createDefaultProfileDetails();
          }

          setCurrentUser(savedUser);
          setIsLoggedIn(true);
          setCurrentView("opportunities");

          // Also save in local storage for sync/fallback
          const registeredUsers = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
          if (!registeredUsers.some(u => u.email.toLowerCase() === savedUser.email.toLowerCase() && u.role === savedUser.role)) {
            registeredUsers.push(savedUser);
            localStorage.setItem('she_registered_users', JSON.stringify(registeredUsers));
          }
          alert("Registration Successful!");
        } else {
          const errMsg = await response.text();
          setAuthError(errMsg || "Registration failed on server.");
          return;
        }
      } catch (err) {
        console.warn("Backend unavailable. Registering locally:", err);
        // Fallback local storage registration
        const registeredUsers = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
        if (registeredUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase() && u.role === newUser.role)) {
          setAuthError("An account with this email address already exists.");
          return;
        }
        newUser.profileDetails = createDefaultProfileDetails();
        registeredUsers.push(newUser);
        localStorage.setItem('she_registered_users', JSON.stringify(registeredUsers));

        setCurrentUser(newUser);
        setIsLoggedIn(true);
        setCurrentView("opportunities");
        alert("Registration Successful (Offline Mode)!");
      }

      setRegisterForm({
        fullName: "",
        email: "",
        phone: "",
        category: "fresh",
        companyName: "",
        contactName: "",
        businessEmail: "",
        partnerRole: "Employer",
        password: "",
        confirmPassword: "",
        declarationChecked: false
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (loginMode === "admin") {
      if (adminForm.password === "admin123") {
        const adminUser = {
          name: "System Admin",
          email: adminForm.email,
          phone: "+91 00000 00000",
          role: "admin",
          isVerified: true,
          category: "all",
          docUploaded: "system_root.pem"
        };
        setCurrentUser(adminUser);
        setIsLoggedIn(true);
        setCurrentView("admin");
      } else {
        setAuthError("Invalid administrator passcode. Access Denied.");
      }
    } else {
      const email = loginForm.username.toLowerCase();
      const password = loginForm.password;

      try {
        const response = await fetch(`${API_BASE}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: email,
            password: password,
            role: loginRole === "candidate" ? "participant" : "host"
          })
        });

        if (response.ok) {
          const dbUser = await response.json();
          if (dbUser.profileDetailsJson) {
            try {
              const parsed = JSON.parse(dbUser.profileDetailsJson);
              dbUser.profileDetails = dbUser.role === "host"
                ? { ...createDefaultHostProfileDetails(), ...parsed }
                : { ...createDefaultProfileDetails(), ...parsed };
            } catch (err) {
              dbUser.profileDetails = dbUser.role === "host" ? createDefaultHostProfileDetails() : createDefaultProfileDetails();
            }
          } else {
            dbUser.profileDetails = dbUser.role === "host" ? createDefaultHostProfileDetails() : createDefaultProfileDetails();
          }

          setCurrentUser(dbUser);
          setIsLoggedIn(true);
          setCurrentView("opportunities");
          return;
        } else {
          const errMsg = await response.text();
          setAuthError(errMsg || "Invalid credentials.");
          return;
        }
      } catch (err) {
        console.warn("Backend unavailable. Logging in locally:", err);
      }

      // LOCAL STORAGE FALLBACK
      // 1. Check local registered users
      const registeredUsers = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
      const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email && u.role === (loginRole === "candidate" ? "participant" : "host"));

      if (matchedUser) {
        if (matchedUser.password === password) {
          setCurrentUser(matchedUser);
          setIsLoggedIn(true);
          setCurrentView("opportunities");
        } else {
          setAuthError("Invalid password. Please try again.");
        }
        return;
      }

      // 2. Check defaults
      if (loginRole === "candidate") {
        const isDefault = email === "aaradhya.sen@example.com";
        if (!isDefault) {
          setAuthError("Account not found. Please register first.");
          return;
        }
        if (password !== "password123") {
          setAuthError("Invalid password. Please try again.");
          return;
        }
        const name = "Aaradhya Sen";
        const parts = name.trim().split(/\s+/);
        const fName = parts[0] || "";
        const lName = parts.slice(1).join(" ") || "";
        const generatedUsername = (name.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900));

        const user = {
          name: name,
          firstName: fName,
          lastName: lName,
          username: generatedUsername,
          email: loginForm.username,
          phone: "+91 98765 43210",
          role: "participant",
          isVerified: true,
          category: isDefault ? "break" : "fresh",
          gender: "Female",
          dob: isDefault ? "1994-08-15" : "",
          profilePhoto: "",
          docUploaded: "aadhaar_masked.pdf",
          profileDetails: createDefaultProfileDetails()
        };

        if (isDefault) {
          user.profileDetails.careerBreak = {
            startDate: "2023-01-01",
            endDate: "2026-01-01",
            currentlyActive: "No",
            reasonForBreak: ["Child Care", "Family Responsibilities"],
            duringBreak: ["Online Courses", "Certifications", "Homemaker"]
          };
          user.profileDetails.previousExperience = [
            {
              companyName: "Infosys",
              designation: "Senior Software Engineer",
              industry: "IT Services",
              employmentType: "Full-time",
              startDate: "2018-06-01",
              endDate: "2022-12-31",
              responsibilities: "Developed backend microservices using Java and Spring Boot.",
              achievements: "Reduced database query latency by 40% through redis caching."
            }
          ];
          user.profileDetails.skillsBreak = {
            existingSkills: "Java, Spring Boot, MySQL, REST APIs",
            refreshedSkills: "React, Node.js, AI Tools (GitHub Copilot)",
            skillsToImprove: "System Design, Kubernetes"
          };
          user.profileDetails.preferences = {
            jobTypes: ["Full-time", "Remote"],
            industry: "Technology",
            expectedSalary: "₹18,00,000 LPA",
            noticePeriod: "Immediate",
            availableHours: "40 hours/week"
          };
        }

        setCurrentUser(user);
        setIsLoggedIn(true);
        setCurrentView("opportunities");
      } else if (loginRole === "host") {
        const isDefault = email === "neeraja.iyer@salesforce.com";
        if (!isDefault) {
          setAuthError("Account not found. Please register first.");
          return;
        }
        if (password !== "password123") {
          setAuthError("Invalid password. Please try again.");
          return;
        }
        const name = "Neeraja Iyer";
        const parts = name.trim().split(/\s+/);
        const fName = parts[0] || "";
        const lName = parts.slice(1).join(" ") || "";
        const host = {
          name: name,
          firstName: fName,
          lastName: lName,
          username: isDefault ? "neeraja_iyer_200" : (name.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900)),
          email: loginForm.username,
          phone: isDefault ? "Salesforce Partner" : "+91 00000 00000",
          role: "host",
          isVerified: true,
          category: "host",
          docUploaded: "org_license.pdf",
          profileDetails: isDefault ? {
            companyName: "Salesforce",
            companyWebsite: "https://salesforce.com",
            companyIndustry: "Cloud Software / SaaS",
            companyLogo: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=120&auto=format&fit=crop",
            companyDescription: "We are a global leader in customer relationship management (CRM) software, helping companies connect with their customers in a whole new way.",
            recruiterTitle: "Senior Recruiter",
            recruiterBio: "Passionate about finding outstanding diverse talent and helping returners launch back into tech roles.",
            socialLinks: {
              linkedin: "https://linkedin.com/in/neerajaiyer",
              twitter: "https://twitter.com/neerajaiyer"
            }
          } : createDefaultHostProfileDetails()
        };
        setCurrentUser(host);
        setIsLoggedIn(true);
        setCurrentView("opportunities");
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser({
      name: "",
      email: "",
      phone: "",
      role: "participant",
      isVerified: false,
      category: "fresh",
      docUploaded: ""
    });
    setIsLoggedIn(false);
    setExpandedDock("none");
    setCurrentView("opportunities");
    setIsProfileDropdownOpen(false);
    setAuthView("login");
    setAuthError(null);
  };

  // Admin approvals
  const approveListing = (oppId) => {
    syncOpportunityStatusToBackend(oppId, "approved");
    setOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        return { ...o, status: "approved" };
      }
      return o;
    }));
  };

  const rejectListing = (oppId) => {
    syncOpportunityStatusToBackend(oppId, "rejected");
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
  };

  const createAdminNotice = (e) => {
    e.preventDefault();
    if (!adminNoticeForm.title || !adminNoticeForm.content) return;

    const newNotice = {
      id: "notice-" + Date.now(),
      title: adminNoticeForm.title,
      content: adminNoticeForm.content,
      date: new Date().toISOString().split('T')[0],
      postedBy: "System Admin",
      type: "ANNOUNCEMENT"
    };

    setNotices(prev => [newNotice, ...prev]);
    saveNoticeToBackend(newNotice);
    setAdminNoticeForm({ title: "", content: "" });
    alert("Announcement published directly to Notice Board!");
  };

  const deleteAdminNotice = (noticeId) => {
    setNotices(prev => prev.filter(n => n.id !== noticeId));
    deleteNoticeFromBackend(noticeId);
  };

  const updateApplicantStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return { ...a, status: newStatus };
      }
      return a;
    }));

    fetch(`${API_BASE}/api/applications/${appId}/status?status=${newStatus}`, {
      method: "PUT"
    }).catch(err => console.log("Failed to sync application status to backend:", err));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#f6f8fb] relative overflow-hidden font-sans">
        {/* Background Glowing Circles */}
        <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#ff6d2d]/25 blur-[120px] pointer-events-none animate-blob-1 mix-blend-multiply z-0"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[700px] h-[700px] rounded-full bg-[#3b82f6]/25 blur-[140px] pointer-events-none animate-blob-2 mix-blend-multiply z-0"></div>

        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-between border-b border-slate-200/50 bg-white/60 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-2">
            <a href="#" className="text-2xl font-black tracking-tight text-ink-900">
              SheReDefine<span className="h-2 w-2 rounded-full bg-brand-500 inline-block ml-1"></span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Vetted & Verified Ecosystem</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-grow flex items-center justify-center p-4 sm:p-8 relative z-10 my-6">
          <div className="max-w-[1100px] w-full bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">

            {/* Left: Branding/Marketing Panel (visible on large screens) */}
            <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 p-10 flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-500/20 blur-[80px] pointer-events-none"></div>

              <div className="space-y-2 relative z-10">
                <span className="bg-brand-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">Women-Only</span>
                <h2 className="text-2xl font-black tracking-tight leading-tight">Safe. Verified.<br />Opportunity Hub.</h2>
                <p className="text-slate-400 text-xs font-medium leading-relaxed pt-2">
                  A verification-backed ecosystem designed exclusively for women to transition, upskill, and thrive.
                </p>
              </div>

              <div className="space-y-6 relative z-10 my-8">
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-xl text-lg shrink-0">💼</span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-brand-500">Vetted Careers</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Returnships, fresh entry, and high-impact jobs with verified status.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-xl text-lg shrink-0">👩‍🏫</span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-indigo-400">1-on-1 Mentorship</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Schedule direct coaching calls with senior female executives.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-xl text-lg shrink-0">💬</span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-teal-400">Secure Circles</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Connect & network in safe, community-moderated spaces.</p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 relative z-10 border-t border-slate-800 pt-4 flex items-center justify-between">
                <span>© 2026 SheReDefine</span>
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>50K+ Active Members</span>
              </div>
            </div>

            {/* Right: Authentication Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white relative">

              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {loginMode === "admin"
                    ? "Administrator Portal"
                    : authView === "login"
                      ? "Join SheReDefine"
                      : "Create SheReDefine Account"}
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  {loginMode === "admin"
                    ? "Enter system passkey to access operational dashboard."
                    : authView === "login"
                      ? "Access candidate listings, support circles, and mentoring slots."
                      : "Vetted & verification-backed access to exclusive opportunities."}
                </p>
              </div>

              {loginMode !== "admin" && (
                /* Role Selection Tabs */
                <div className="relative bg-slate-100 p-1 rounded-2xl flex mb-6">
                  {/* Sliding pill */}
                  <div
                    className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out"
                    style={{
                      left: loginRole === "candidate" ? "4px" : "50%",
                      width: "calc(50% - 8px)"
                    }}
                  ></div>
                  <button
                    type="button"
                    onClick={() => handleRoleTabChange("candidate")}
                    className={`relative z-10 w-1/2 text-center py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition ${loginRole === "candidate" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleTabChange("host")}
                    className={`relative z-10 w-1/2 text-center py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition ${loginRole === "host" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    Partner / Host
                  </button>
                </div>
              )}

              {/* Inline Error Alert */}
              {authError && (
                <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold leading-relaxed mb-4 flex items-start gap-2 animate-shake">
                  <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
                  <span>{authError}</span>
                </div>
              )}

              {authView === "login" ? (
                /* --------------------------------------------------
                   LOGIN FORM
                   -------------------------------------------------- */
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  {loginMode === "admin" ? (
                    /* Admin Fields */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Administrator Email</label>
                        <input
                          type="email"
                          required
                          placeholder="admin@sheredefine.com"
                          value={adminForm.email}
                          onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">System Passcode</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={adminForm.password}
                          onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-semibold"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Candidate or Partner/Host Fields */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Username or Email</label>
                        <input
                          type="text"
                          required
                          placeholder="email@example.com"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                          className={`w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 text-sm font-semibold ${loginRole === "candidate" ? "focus:ring-[#2164c5]" : "focus:ring-brand-500"
                            }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className={`w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 text-sm font-semibold ${loginRole === "candidate" ? "focus:ring-[#2164c5]" : "focus:ring-brand-500"
                            }`}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full text-white rounded-xl py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 active:scale-95 mt-6 ${loginMode === "admin"
                      ? "bg-slate-900 hover:bg-slate-800"
                      : loginRole === "candidate"
                        ? "bg-[#2164c5] hover:bg-blue-700 shadow-[#2164c5]/20"
                        : "bg-brand-500 hover:bg-brand-700 shadow-brand-500/20"
                      }`}
                  >
                    {loginMode === "admin" ? "Authenticate Admin" : "Log In"}
                  </button>

                  {loginMode === "admin" ? (
                    <button
                      type="button"
                      onClick={() => setLoginMode("user")}
                      className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 block pt-3 transition"
                    >
                      Back to Candidate/Partner Login
                    </button>
                  ) : (
                    <div className="text-center pt-4">
                      <span className="text-xs text-slate-400 font-semibold">Don't have an account? </span>
                      <button
                        type="button"
                        onClick={() => toggleAuthView("register")}
                        className={`text-xs font-black hover:underline transition ${loginRole === "candidate" ? "text-[#2164c5]" : "text-brand-500"
                          }`}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                /* --------------------------------------------------
                   REGISTRATION FORM
                   -------------------------------------------------- */
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                  {loginRole === "candidate" ? (
                    /* Candidate Registration Fields */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Aaradhya Sen"
                          value={registerForm.fullName}
                          onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="aaradhya.sen@example.com"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Career Life Stage</label>
                        <select
                          value={registerForm.category}
                          onChange={(e) => setRegisterForm({ ...registerForm, category: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold text-slate-700 cursor-pointer"
                        >
                          <option value="fresh">After Studies (Freshers)</option>
                          <option value="break">After Break (Returnships)</option>
                          <option value="switch">Late 30s Swinger / Entry</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5] text-sm font-semibold"
                          />
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 pt-2">
                        <input
                          type="checkbox"
                          id="declaration"
                          checked={registerForm.declarationChecked}
                          onChange={(e) => setRegisterForm({ ...registerForm, declarationChecked: e.target.checked })}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2164c5] focus:ring-[#2164c5] cursor-pointer"
                        />
                        <label htmlFor="declaration" className="text-[11px] font-semibold text-slate-500 leading-snug cursor-pointer select-none">
                          I self-declare that I identify as a woman and agree to SheReDefine's secure community verification rules.
                        </label>
                      </div>
                    </div>
                  ) : (
                    /* Partner/Host Registration Fields */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Salesforce"
                          value={registerForm.companyName}
                          onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Contact Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Neeraja Iyer"
                          value={registerForm.contactName}
                          onChange={(e) => setRegisterForm({ ...registerForm, contactName: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Business Email</label>
                        <input
                          type="email"
                          required
                          placeholder="neeraja.iyer@salesforce.com"
                          value={registerForm.businessEmail}
                          onChange={(e) => setRegisterForm({ ...registerForm, businessEmail: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Partner Role</label>
                        <select
                          value={registerForm.partnerRole}
                          onChange={(e) => setRegisterForm({ ...registerForm, partnerRole: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold text-slate-700 cursor-pointer"
                        >
                          <option value="Employer">Employer / Recruiter</option>
                          <option value="Mentor">Mentor</option>
                          <option value="Instructor">Instructor</option>
                          <option value="Speaker">Speaker</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full text-white rounded-xl py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 active:scale-95 mt-6 ${loginRole === "candidate"
                      ? "bg-[#2164c5] hover:bg-blue-700 shadow-[#2164c5]/20"
                      : "bg-brand-500 hover:bg-brand-700 shadow-brand-500/20"
                      }`}
                  >
                    Register Account
                  </button>

                  <div className="text-center pt-4">
                    <span className="text-xs text-slate-400 font-semibold">Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => toggleAuthView("login")}
                      className={`text-xs font-black hover:underline transition ${loginRole === "candidate" ? "text-[#2164c5]" : "text-brand-500"
                        }`}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Footer with Administrator Link */}
        {loginMode !== "admin" && (
          <footer className="py-6 text-center text-xs text-slate-400 relative z-10 border-t border-slate-200/40 bg-white/40">
            <span>Are you a platform administrator? </span>
            <button
              onClick={() => { setLoginMode("admin"); setAuthStep(1); }}
              className="text-slate-700 hover:text-slate-900 font-extrabold hover:underline inline-flex items-center gap-1.5 transition ml-1"
            >
              <Lock className="h-3 w-3 inline" /> Admin Login
            </button>
          </footer>
        )}
      </div>
    );
  }

  const renderUserDock = (isHostSubDock = false) => {
    return (
      <div
        ref={!isHostSubDock ? dockRef : null}
        tabIndex={0}
        className={isHostSubDock
          ? "flex items-center gap-3.5 bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-[2.25rem] px-6 py-3.5 overflow-visible transition-all duration-300 hover:scale-[1.01] focus:outline-none"
          : "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3.5 bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-[2.25rem] px-6 py-3.5 max-w-[95vw] overflow-visible transition-all duration-300 hover:scale-[1.01] focus:outline-none"
        }
      >

        {/* Browser-style Back & Forward Navigation */}
        <div className="flex items-center gap-2 shrink-0 px-2">
          <button
            onClick={handleGoBack}
            disabled={historyIndex <= 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${historyIndex > 0
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
              : "text-slate-300 bg-slate-50/50 cursor-not-allowed"
              }`}
            title="Go Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleGoForward}
            disabled={historyIndex >= historyStack.length - 1}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${historyIndex < historyStack.length - 1
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105 active:scale-95 cursor-pointer"
              : "text-slate-300 bg-slate-50/50 cursor-not-allowed"
              }`}
            title="Go Forward"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Divider separating navigation controls from menu options */}
        <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>

        {/* 1. Home */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => {
              setCurrentView("opportunities");
              setFilterType("ALL");
              setFilterMode("ALL");
              setSearchQuery("");
              setCurrentTab("all");
            }}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Home"
          >
            <Home className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "opportunities" && filterType === "ALL"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "opportunities" && filterType === "ALL" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Home
            </span>
          </button>
        </div>

        {/* Featured */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => {
              setCurrentView("features");
            }}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Featured"
          >
            <Sparkles className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "features"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "features" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Featured
            </span>
          </button>
        </div>

        {/* 2. Internships */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => {
              setCurrentView("internships");
            }}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Internships"
          >
            <GraduationCap className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "internships"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "internships" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Internships
            </span>
          </button>
        </div>

        {/* 3. Jobs */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => {
              setCurrentView("jobs");
            }}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Jobs"
          >
            <Briefcase className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "jobs"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "jobs" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Jobs
            </span>
          </button>
        </div>

        {/* 4. Competitions */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("competitions")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Competitions"
          >
            <Trophy className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "competitions"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "competitions" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Competitions
            </span>
          </button>
        </div>

        {/* 5. Mentorship */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("mentorship")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Mentorship"
          >
            <UserCheck className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "mentorship"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "mentorship" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Mentorship
            </span>
          </button>
        </div>

        {/* 6. Mock Tests */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("mock-tests")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Mock Tests"
          >
            <FileQuestion className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "mock-tests"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "mock-tests" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Mock Tests
            </span>
          </button>
        </div>

        {/* 7. Mock Interview */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("mock-interviews")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Mock Interview"
          >
            <Video className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "mock-interviews"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "mock-interviews" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Mock Interview
            </span>
          </button>
        </div>

        {/* 8. 100 Days to Code */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("100days-code")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="100 Days to Code"
          >
            <Code className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "100days-code"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "100days-code" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              100 Days to Code
            </span>
          </button>
        </div>

        {/* 9. Courses */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("courses")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="Courses"
          >
            <BookOpen className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "courses"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "courses" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Courses
            </span>
          </button>
        </div>

        {/* 10. More (Expansion dropdown for dashboard/admin panels) */}
        <div className="relative more-menu-container shrink-0 flex flex-col items-center justify-center w-16 h-14 group" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="More Options"
          >
            <MoreHorizontal className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${isMoreDropdownOpen || currentView === "community" || currentView === "club-detail" || currentView === "host" || currentView === "admin"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {(currentView === "community" || currentView === "club-detail" || currentView === "host" || currentView === "admin") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              More
            </span>
          </button>

          {/* More popover list */}
          {isMoreDropdownOpen && (
            <div className="absolute bottom-full mb-3.5 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-left space-y-1">
              <button
                onClick={() => {
                  setCurrentView("community");
                  setIsMoreDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition"
              >
                <span>💬</span>
                <span>Clubs & Community</span>
              </button>

              {currentUser.role === 'host' && (
                <button
                  onClick={() => {
                    setCurrentView("host");
                    setIsMoreDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <span>💼</span>
                  <span>Host Dashboard</span>
                </button>
              )}

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    setCurrentView("admin");
                    setIsMoreDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <span>🛡️</span>
                  <span>Admin Portal</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 11. My Activity */}
        <div className="relative group shrink-0 flex flex-col items-center justify-center w-16 h-14">
          <button
            onClick={() => setCurrentView("applications")}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="My Activity"
          >
            <Activity className={`h-6 w-6 transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5 ${currentView === "applications"
              ? "text-brand-500"
              : "text-slate-500 group-hover:text-slate-900"
              }`} />

            {currentView === "applications" && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              My Activity
            </span>
          </button>
        </div>

        {/* User Options Section (macOS User symbol) */}
        <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>

        <div className="relative user-menu-container shrink-0 flex flex-col items-center justify-center w-16 h-14 group" onClick={(e) => e.stopPropagation()}>
          {/* User Button */}
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
            aria-label="User Options"
          >
            <div className="relative transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5">
              <User className={`h-6 w-6 ${isProfileDropdownOpen || currentView === "profile" || currentView === "settings"
                ? "text-brand-500"
                : "text-slate-500 group-hover:text-slate-900"
                }`} />
              {currentUser.isVerified && currentUser.name !== "Guest User" && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>

            {(currentView === "profile" || currentView === "settings") && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_6px_#ff6d2d] transition-all duration-200 group-hover:opacity-0"></span>
            )}

            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Profile
            </span>
          </button>

          {/* macOS Style Floating Popover above the button */}
          {isProfileDropdownOpen && (
            <div className="absolute bottom-full mb-3.5 right-0 w-64 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-2xl p-3.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-left space-y-2">

              {/* Option 1: Profile picture + Name (Click to redirect to profile page) */}
              <div
                onClick={() => {
                  setCurrentView("profile");
                  setIsProfileDropdownOpen(false);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition text-left group/item"
              >
                <div className="h-10 w-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-700 font-black text-sm border border-orange-100 group-hover/item:scale-105 transition-transform">
                  {currentUser.name ? currentUser.name.charAt(0) : "G"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-800 truncate group-hover/item:text-brand-500 transition-colors">{currentUser.name || "Guest User"}</p>
                  <p className="text-[10px] font-semibold text-slate-400 truncate">View Profile Details</p>
                </div>
              </div>

              {/* Option 2: Settings (Click to redirect to settings page) */}
              <button
                onClick={() => {
                  setCurrentView("settings");
                  setIsProfileDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition text-left text-xs font-extrabold"
              >
                <span className="text-sm">⚙️</span>
                <span>Application Settings</span>
              </button>

              {/* Option 3: Login/Logout button */}
              <div className="pt-2 border-t border-slate-100">
                {currentUser.isVerified && currentUser.name !== "Guest User" ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs rounded-xl transition duration-150"
                  >
                    Logout / Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full py-2 bg-[#2164c5] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition duration-150"
                  >
                    Verify & Login
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

        {isHostSubDock && (
          <>
            <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>
            <button
              onClick={() => {
                setExpandedDock("none");
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:scale-105 active:scale-95 transition"
              title="Minimize User Dock"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </>
        )}

      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8fb] relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[700px] h-[700px] rounded-full bg-[#ff6d2d]/22 blur-[120px] pointer-events-none animate-blob-1 z-0 mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[800px] h-[800px] rounded-full bg-[#3b82f6]/22 blur-[140px] pointer-events-none animate-blob-2 z-0 mix-blend-multiply"></div>
      <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#a855f7]/18 blur-[120px] pointer-events-none animate-blob-3 z-0 mix-blend-multiply"></div>

      {/* --------------------------------------------------
          NAVBAR / HEADER
          -------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-center">
          <div className="flex items-center gap-2">
            {/* <span className="h-9 w-9 bg-brand-500 rounded-xl flex items-center justify-center text-white font-black text-xl">S</span> */}
            <a href="#" onClick={() => setCurrentView("opportunities")} className="text-2xl font-black tracking-tight text-ink-900">
              SheReDefine<span className="h-2 w-2 rounded-full bg-brand-500 inline-block ml-1"></span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto w-full flex-grow flex relative z-10">



        {/* --------------------------------------------------
            MAIN CONTAINER
            -------------------------------------------------- */}
        <main className="flex-grow px-4 md:px-8 py-8 pb-28">

          {/* ================================================
              VIEW 1: OPPORTUNITIES BOARD
              ================================================ */}
          {currentView === "opportunities" && (
            <div className="space-y-12 max-w-[95%] mx-auto">

              {/* Profile Incompleteness Alert Banner */}
              {isLoggedIn && currentUser.role === "participant" && (!currentUser.firstName || !currentUser.lastName || !currentUser.phone) && (
                <div className="bg-gradient-to-r from-brand-50/80 to-amber-50/80 border border-brand-100/60 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-xs mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-500 text-white rounded-2xl shadow-sm">
                      <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-base">Complete Your Profile Details!</h4>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        Fill in your target life stage details to activate <strong className="text-brand-600">1-Click Auto-Fill</strong> for hiring forms, eliminating manual copy-pasting for job opportunities.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView("profile")}
                    className="shrink-0 bg-brand-500 hover:bg-brand-600 text-white text-xs font-black uppercase px-5 py-3 rounded-2xl transition shadow-xs whitespace-nowrap active:scale-95"
                  >
                    Complete Profile Now →
                  </button>
                </div>
              )}

              {/* Host Mode Welcome Banner */}
              {isLoggedIn && currentUser.role === "host" && (
                <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/60 rounded-3xl p-6 flex items-start gap-4 text-left shadow-xs mt-4 animate-fade-in-up">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm shrink-0">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-base">WELCOME {currentUser.name ? currentUser.name.toUpperCase() : "HOST"} to HOST DASHBOARD</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      You are browsing SheReDefine in <strong className="text-blue-600">Host Mode</strong>. You can see other hosts' opportunities here. Use the bottom dock to toggle between the User Panel and your Recruiter Workspace.
                    </p>
                  </div>
                </div>
              )}

              {/* Premium Animated Landing Area */}
              {filterType === "ALL" && searchQuery === "" && (
                <div className="space-y-12">
                  {/* Hero Landing Animation Block */}
                  <div className="relative rounded-3xl border border-slate-200/80 bg-white p-10 md:p-14 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] animate-fade-in-up group">
                    {/* Glowing Animated Orbs in Background */}
                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-200/40 blur-[100px] pointer-events-none animate-pulse-glow"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-200/30 blur-[120px] pointer-events-none animate-pulse-glow animation-delay-300"></div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 z-10">

                      {/* Left: Text Content */}
                      <div className="max-w-2xl space-y-6 flex-grow">
                        <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-black uppercase px-5 py-2 rounded-full border border-orange-100/60 tracking-wider shadow-sm animate-float">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                          </span>
                          Inspiring Women to Grow
                        </span>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                          Empowering Women to <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-[#2164c5] drop-shadow-sm">Re-imagine & Re-define</span> Careers.
                        </h1>

                        <h3 className="text-lg md:text-xl font-bold text-slate-700 max-w-xl leading-relaxed">
                          Re-imagining and Re-defining Career Pathways for Women.
                        </h3>

                        <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
                          SheReDefine is the premier, verification-backed ecosystem designed exclusively for women to transition, upskill, and thrive. Whether you are seeking your first internship, returning after a career break, switching to freelancing, or looking for 1-on-1 mentorship, we are here to support your journey.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-4">
                          <button
                            onClick={() => {
                              document.getElementById("opportunities-feed")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                          >
                            Explore Opportunities
                          </button>

                        </div>
                      </div>

                      {/* Right: Premium Collage Animation (Visible in Desktop, Laptop, and Tablet - hidden on mobile) */}
                      <div className="hidden md:flex relative w-full lg:w-[450px] h-[380px] shrink-0 items-center justify-center select-none mt-8 lg:mt-0">
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-indigo-500/10 rounded-full blur-3xl opacity-60"></div>

                        {/* Card 1: SHE Can, SHE Will, SHE Did (Bottom-left stack) */}
                        <div className="absolute left-0 bottom-4 w-[200px] bg-white p-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 ease-out animate-float-medium z-10 hover:z-40 hover:scale-105 group-hover:-translate-x-4 group-hover:translate-y-4 group-hover:-rotate-12">
                          <img src="/hero-img-1.png" alt="She Can She Will She Did" className="w-full aspect-[2/3] object-cover rounded-xl" />
                          <div className="mt-2 text-center text-[10px] font-extrabold text-brand-700 tracking-wider uppercase">Our Motto</div>
                        </div>

                        {/* Card 2: Women Profile Silhouette (Center main card) */}
                        <div className="absolute left-[125px] top-4 w-[220px] bg-white p-3.5 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.1)] border border-slate-150 transition-all duration-500 ease-out animate-float-slow z-20 hover:z-40 hover:scale-105 group-hover:-translate-y-2">
                          <img src="/hero-img-3.png" alt="Diverse Women Network" className="w-full aspect-[2/3] object-cover rounded-2xl" />
                          <div className="mt-2.5 text-center text-[10px] font-black text-slate-800 tracking-wide uppercase">SheReDefine Community</div>
                        </div>

                        {/* Card 3: You Go Girl Cartoon (Top-right stack) */}
                        <div className="absolute right-0 top-12 w-[180px] bg-white p-2.5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 ease-out animate-float-fast z-30 hover:z-40 hover:scale-105 group-hover:translate-x-6 group-hover:-translate-y-4 group-hover:rotate-12">
                          <img src="/hero-img-2.png" alt="You Go Girl" className="w-full aspect-[2/3] object-cover rounded-xl" />
                          <div className="mt-2 text-center text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase">Support Circles</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-6 pt-4">
                    <div className="text-left flex justify-between items-end">
                      <div>
                        <span className="bg-brand-50 text-brand-700 text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-orange-100/60 tracking-wider shadow-sm">
                          ✨ Handpicked Premium Roles & Bootcamps
                        </span>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-2">Featured Opportunities</h2>
                        <p className="text-slate-400 text-xs font-semibold mt-1">
                          Vetted by SheReDefine experts for high candidate response rates and safe work cultures.
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentView("features")}
                        className="text-xs font-black text-brand-500 hover:text-brand-700 flex items-center gap-1.5 transition"
                      >
                        View All Curated <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {featuredOpportunities.map(opp => (
                        <div
                          key={opp.id}
                          onClick={() => {
                            setSelectedOppDetail(opp);
                            setCurrentView("opportunity-detail");
                          }}
                          className="cursor-pointer group relative rounded-3xl aspect-[3/4] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-350 bg-slate-100 border border-slate-200"
                        >
                          {opp.posterUrl ? (
                            /* Visual Image Flyer */
                            <div className="w-full h-full relative">
                              <img
                                src={opp.posterUrl}
                                alt={opp.title}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop" }}
                              />
                              {/* Bottom Gradient Overlay for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                            </div>
                          ) : (
                            /* Premium SVG/CSS Card Flyer */
                            <div className={`w-full h-full p-6 flex flex-col justify-between transition duration-500 group-hover:scale-[1.02] ${opp.posterTemplate === "tech-blue" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white" :
                              opp.posterTemplate === "sunset-rose" ? "bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 text-white" :
                                opp.posterTemplate === "emerald-green" ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-800 text-white" :
                                  opp.posterTemplate === "luxury-purple" ? "bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-950 text-white" :
                                    "bg-gradient-to-br from-[#2164c5] to-indigo-800 text-white"
                              }`}>
                              <div className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
                              <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 rounded-full bg-black/15 blur-lg pointer-events-none"></div>

                              <div className="relative z-10 flex flex-col justify-between h-full text-left">
                                <div>
                                  <div className="flex justify-between items-center mb-6">
                                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-black tracking-widest uppercase">
                                      ★ {opp.type}
                                    </span>
                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                  </div>

                                  <p className="text-white/80 text-[10px] font-black uppercase tracking-wider">{opp.company}</p>
                                  <h3 className="text-xl font-black tracking-tight leading-tight mt-1 line-clamp-3 group-hover:text-brand-100 transition-colors">{opp.title}</h3>
                                </div>

                                <div className="pt-4">
                                  <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest">Target Stage</p>
                                  <p className="text-xs font-extrabold capitalize mt-0.5">
                                    {opp.category === "fresh" ? "🎒 After Studies" :
                                      opp.category === "break" ? "⏰ After Career Break" :
                                        "🚀 Late 30s Switcher"}
                                  </p>
                                  <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-center">
                                    <span className="text-[9px] text-white/70 font-semibold uppercase tracking-wider">Tap to open flyer</span>
                                    <span className="text-sm">➜</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Hover Overlay Button */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-20">
                            <span className="bg-white text-slate-900 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                              View Flyer Details
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High-Fidelity Modular Sections */}
                  <div className="space-y-12 pt-4">
                    {/* Section 1: Internships */}
                    <ScrollableRowSection
                      title="Internships"
                      subtitle="Kickstart your professional journey with hands-on, vetted roles."
                      items={internshipOpportunities}
                      onViewAll={() => {
                        setCurrentView("internships");
                      }}
                      onItemClick={(item) => {
                        setSelectedOppDetail(item);
                        setCurrentView("opportunity-detail");
                      }}
                    />

                    {/* Section 2: Jobs */}
                    <ScrollableRowSection
                      title="Jobs"
                      subtitle="Vetted full-time and freelance job opportunities for women."
                      items={jobOpportunities}
                      onViewAll={() => {
                        setCurrentView("jobs");
                      }}
                      onItemClick={(item) => {
                        setSelectedOppDetail(item);
                        setCurrentView("opportunity-detail");
                      }}
                    />

                    {/* Section 3: Competitions */}
                    <ScrollableRowSection
                      title="Competitions"
                      subtitle="Uncover the most talked-about competitions today."
                      items={competitionOpportunities}
                      onViewAll={() => {
                        setCurrentView("competitions");
                      }}
                      onItemClick={(item) => {
                        setSelectedOppDetail(item);
                        setCurrentView("opportunity-detail");
                      }}
                    />

                    {/* Section 4: Mentorship */}
                    <ScrollableRowSection
                      title="Mentorship"
                      subtitle="1-on-1 career guidance with industry leaders and tech professionals."
                      items={mentorshipOpportunities}
                      onViewAll={() => {
                        setCurrentView("mentorship");
                      }}
                      onItemClick={(item) => {
                        setSelectedOppDetail(item);
                        setCurrentView("opportunity-detail");
                      }}
                    />

                    {/* Section 5: Courses & Learning */}
                    <ScrollableRowSection
                      title="Courses & Learning"
                      subtitle="Curated fast-track skill bootcamps and certifications."
                      items={CURATED_COURSES}
                      onViewAll={() => {
                        setCurrentView("courses");
                      }}
                      onItemClick={(item) => {
                        if (item.url) {
                          window.open(item.url, "_blank");
                        } else {
                          setSelectedOppDetail(item);
                          setCurrentView("opportunity-detail");
                        }
                      }}
                    />

                    {/* Section 6: Webinars & Workshops */}
                    <ScrollableRowSection
                      title="Webinars & Workshops"
                      subtitle="Live interactive discussions, masterclasses, and Q&A panels."
                      items={webinarOpportunities}
                      onViewAll={() => {
                        setCurrentView("opportunities");
                        setFilterType("WEBINAR");
                        document.getElementById("opportunities-feed")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      onItemClick={(item) => {
                        setSelectedOppDetail(item);
                        setCurrentView("opportunity-detail");
                      }}
                    />

                    {/* Section 7: Clubs & Community */}
                    <ScrollableRowSection
                      title="Clubs & Community"
                      subtitle="Share queries, join focus groups, and network in safe circles."
                      items={clubs.map(club => ({
                        ...club,
                        title: club.name,
                        company: `${club.count.toLocaleString()} members`,
                        location: "Online",
                        isClub: true
                      }))}
                      onViewAll={() => {
                        setCurrentView("community");
                      }}
                      onItemClick={(item) => {
                        setCurrentView("community");
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Opportunities Feed Container */}
              {(filterType !== "ALL" || searchQuery !== "") && (
                <div id="opportunities-feed" className="space-y-8 pt-4">
                  {/* Search & Category Filter Section */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 relative overflow-hidden shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 mb-4">
                      {filterType === "ALL" && searchQuery === "" ? "Search Opportunities Feed" : `Filtered Results: ${filterType}`}
                    </h3>

                    {/* Search Input */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <Search className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Search Opportunities by company, title or tag..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2164c5] focus:bg-white transition text-sm font-semibold"
                        />
                      </div>
                    </div>

                    {/* Sub category boxes */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {[
                        { label: "Internships", type: "INTERNSHIP", emoji: "👜" },
                        { label: "Jobs", type: "JOB", emoji: "💼" },
                        { label: "Competitions", type: "COMPETITION", emoji: "🏆" },
                        { label: "Mentorship", type: "MENTORSHIP", emoji: "👩‍🏫" },
                        { label: "Community", type: "COMMUNITY", emoji: "💬" },
                        { label: "Webinars", type: "WEBINAR", emoji: "🎙️" },
                        { label: "Workshops", type: "WORKSHOP", emoji: "🧠" }
                      ].map(item => (
                        <button
                          key={item.type}
                          onClick={() => {
                            if (item.type === "COMMUNITY") {
                              setCurrentView("community");
                            } else {
                              setFilterType(item.type);
                            }
                          }}
                          className={`p-4 rounded-2xl border text-left transition ${filterType === item.type ? "border-[#2164c5] bg-[#eaf3ff]" : "border-slate-200 bg-[#f4f8ff] hover:bg-slate-50"}`}>
                          <p className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">{item.label}</p>
                          <p className="mt-2 text-2xl">{item.emoji}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Life stage Category Tabs (Core Vision) */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCurrentTab("all")}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition ${currentTab === "all" ? "bg-[#2164c5] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                        ✨ All Stage Roles
                      </button>
                      <button
                        onClick={() => setCurrentTab("fresh")}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition ${currentTab === "fresh" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                        🎒 After Studies (Freshers)
                      </button>
                      <button
                        onClick={() => setCurrentTab("break")}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition ${currentTab === "break" ? "bg-rose-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                        ⏰ After Break (Returnships)
                      </button>
                      <button
                        onClick={() => setCurrentTab("switch")}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition ${currentTab === "switch" ? "bg-teal-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                        🚀 Late 30s Swinger / Entry
                      </button>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2">
                      <select
                        value={filterMode}
                        onChange={(e) => setFilterMode(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                        <option value="ALL">Any Mode</option>
                        <option value="ONLINE">Remote / Online</option>
                        <option value="HYBRID">Hybrid</option>
                        <option value="OFFLINE">Offline / In-person</option>
                      </select>
                      <button
                        onClick={() => {
                          setFilterType("ALL");
                          setFilterMode("ALL");
                          setSearchQuery("");
                          setCurrentTab("all");
                        }}
                        className="text-xs font-bold text-slate-500 hover:underline">
                        Clear Filters
                      </button>
                    </div>
                  </div>

                  {/* Grid of Listings */}
                  <div>
                    <h3 className="text-lg font-black text-slate-800 border-l-4 border-[#2164c5] pl-3 mb-6">Featured Opportunities</h3>
                    {filteredOpportunities.length === 0 ? (
                      <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                        <p className="text-slate-400 font-bold">No opportunities match the selected criteria.</p>
                      </div>
                    ) : (
                      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredOpportunities.map(opp => {
                          const isApplied = applications.some(a => a.opportunityId === opp.id);
                          const isRegistered = webinarRegistrations.includes(opp.id);
                          const isEvent = opp.type === "WEBINAR" || opp.type === "WORKSHOP";

                          return (
                            <article key={opp.id} className="rounded-3xl border border-slate-200 bg-white p-6 hover:shadow-lg transition flex flex-col justify-between hover:-translate-y-0.5 duration-200">
                              <div>
                                <div className="flex justify-between items-start gap-2 mb-4">
                                  <span className="bg-[#f4f8ff] text-[#2164c5] text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                                    {opp.type}
                                  </span>
                                  <span className="text-xs font-semibold text-slate-400">
                                    Closes: {opp.deadline}
                                  </span>
                                </div>

                                <h4 className="text-xl font-bold text-slate-800 line-clamp-1">{opp.title}</h4>
                                <p className="text-sm font-bold text-[#2164c5] mt-1">{opp.company}</p>

                                <p className="text-sm text-slate-500 font-medium mt-3 line-clamp-2">
                                  {opp.description}
                                </p>

                                <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                  <div className="flex justify-between text-xs">
                                    <span className="font-bold text-slate-400 uppercase">Eligibility</span>
                                    <span className="font-semibold text-slate-700 truncate max-w-[150px]">{opp.eligibility}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="font-bold text-slate-400 uppercase">Location</span>
                                    <span className="font-semibold text-slate-700">{opp.location} ({opp.mode})</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                                <span className="text-sm font-black text-slate-900">{opp.price}</span>
                                {isEvent ? (
                                  <button
                                    onClick={() => registerForWebinar(opp.id)}
                                    disabled={isRegistered || currentUser.role === "host"}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition ${isRegistered || currentUser.role === "host" ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-brand-500 hover:bg-brand-700 text-white shadow-sm"}`}>
                                    {currentUser.role === "host" ? "Host View" : isRegistered ? "Registered ✓" : "Register Now"}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleApplyNow(opp)}
                                    disabled={isApplied || currentUser.role === "host"}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition ${isApplied || currentUser.role === "host" ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-[#2164c5] hover:bg-blue-700 text-white shadow-sm"}`}>
                                    {currentUser.role === "host" ? "Host View" : isApplied ? "Applied ✓" : "Apply Now"}
                                  </button>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================
              VIEW: OPPORTUNITY DETAIL PAGE
              ================================================ */}
          {currentView === "opportunity-detail" && selectedOppDetail && (
            <div className="space-y-8 max-w-[95%] mx-auto text-left animate-fade-in-up">
              {/* Back Button and Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                  <span className="bg-brand-50 text-brand-700 text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-orange-100/60 tracking-wider shadow-sm">
                    ★ {selectedOppDetail.type} Detail
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mt-2">{selectedOppDetail.title}</h2>
                  <p className="text-lg font-bold text-brand-500 mt-1">{selectedOppDetail.company}</p>
                </div>
                <button
                  onClick={() => {
                    const lastHistory = historyStack[historyStack.length - 2];
                    if (lastHistory) {
                      setCurrentView(lastHistory.view);
                    } else {
                      setCurrentView("opportunities");
                    }
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition shadow-sm"
                >
                  ← Back to List
                </button>
              </div>

              {/* Main Content Layout */}
              <div className="grid gap-8 md:grid-cols-3">

                {/* Left: Poster / Dynamic Flyer Banner */}
                <div className="md:col-span-1 space-y-6">
                  {selectedOppDetail.posterUrl ? (
                    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md aspect-[3/4] bg-slate-100">
                      <img
                        src={selectedOppDetail.posterUrl}
                        alt="Opportunity Flyer"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop" }}
                      />
                    </div>
                  ) : (
                    /* Dynamic Premium Poster using CSS patterns */
                    <div className={`rounded-3xl aspect-[3/4] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group border border-slate-200 ${selectedOppDetail.posterTemplate === "tech-blue" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white" :
                      selectedOppDetail.posterTemplate === "sunset-rose" ? "bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 text-white" :
                        selectedOppDetail.posterTemplate === "emerald-green" ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-800 text-white" :
                          selectedOppDetail.posterTemplate === "luxury-purple" ? "bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-950 text-white" :
                            "bg-gradient-to-br from-[#2164c5] to-indigo-800 text-white"
                      }`}>
                      <div className="absolute top-[-20%] right-[-20%] w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
                      <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 rounded-full bg-black/10 blur-lg"></div>

                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                              {selectedOppDetail.type}
                            </span>
                            <span className="h-2 w-2 rounded-full bg-green-400"></span>
                          </div>

                          <p className="text-white/80 text-xs font-black uppercase tracking-wider">{selectedOppDetail.company}</p>
                          <h3 className="text-2xl font-black tracking-tight leading-tight mt-1 line-clamp-4">{selectedOppDetail.title}</h3>
                        </div>

                        <div className="pt-8">
                          <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Stage Focus</p>
                          <p className="text-sm font-extrabold capitalize mt-0.5">
                            {selectedOppDetail.category === "fresh" ? "🎒 After Studies" :
                              selectedOppDetail.category === "break" ? "⏰ After Career Break" :
                                "🚀 Late 30s Switcher"}
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
                            <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">SheReDefine Verified</span>
                            <span className="text-lg">✨</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Job details and description */}
                <div className="md:col-span-2 space-y-6">

                  {/* Summary Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-slate-200 p-5 rounded-3xl shadow-xs text-center">
                    <div className="space-y-0.5 border-r border-slate-100 last:border-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</p>
                      <p className="text-sm font-extrabold text-slate-800">{selectedOppDetail.location}</p>
                      <p className="text-xs text-slate-500 font-semibold">{selectedOppDetail.mode}</p>
                    </div>
                    <div className="space-y-0.5 border-r border-slate-100 last:border-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stipend/Price</p>
                      <p className="text-sm font-extrabold text-slate-800">{selectedOppDetail.price}</p>
                      <p className="text-xs text-slate-500 font-semibold">{selectedOppDetail.isPaid ? "Paid opportunity" : "Free / Scholarship"}</p>
                    </div>
                    <div className="space-y-0.5 border-r border-slate-100 last:border-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deadline</p>
                      <p className="text-sm font-extrabold text-slate-800">{selectedOppDetail.deadline}</p>
                      <p className="text-xs text-rose-500 font-semibold">Apply before close</p>
                    </div>
                    <div className="space-y-0.5 border-r border-slate-100 last:border-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Seats/Slots</p>
                      <p className="text-sm font-extrabold text-slate-800">{selectedOppDetail.seats} Available</p>
                      <p className="text-xs text-slate-500 font-semibold">Vetted intake</p>
                    </div>
                  </div>

                  {/* Core Description and Details */}
                  <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xs space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-slate-800 border-l-4 border-brand-500 pl-3">Opportunity Description</h3>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-line">
                        {selectedOppDetail.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 space-y-3 text-left">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Candidate Eligibility</h4>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-700 text-xs font-bold leading-relaxed">{selectedOppDetail.eligibility}</p>
                      </div>
                    </div>

                    {/* Structured Specifications Panel */}
                    {(() => {
                      const details = parseOppDetails(selectedOppDetail);
                      if (!details || Object.keys(details).length === 0) return null;
                      
                      return (
                        <div className="pt-6 border-t border-slate-100 space-y-4 text-left animate-fade-in-up">
                          <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                            {selectedOppDetail.type} Specifications
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-150 rounded-2xl">
                            
                            {selectedOppDetail.type === "JOB" && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Employment Type</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.employmentType || "Full-time"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Experience Level</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.experienceLevel || "Fresher"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Salary Range</p>
                                  <p className="text-xs font-black text-slate-800">{details.salaryRange || "Not Disclosed"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Career-Break Friendly?</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.careerBreakFriendly || "Yes"}</p>
                                </div>
                                {details.requiredSkills && details.requiredSkills.length > 0 && (
                                  <div className="sm:col-span-2 space-y-1">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Required Skills</p>
                                    <div className="flex flex-wrap gap-1">
                                      {details.requiredSkills.map((skill, sIdx) => (
                                        <span key={sIdx} className="bg-brand-50 text-brand-700 text-[9px] font-bold px-2 py-0.5 rounded border border-orange-100">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            {selectedOppDetail.type === "INTERNSHIP" && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                                  <p className="text-xs font-black text-slate-800">{details.duration || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Stipend</p>
                                  <p className="text-xs font-black text-slate-800">{details.stipend || "Unpaid"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Hours Mode</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.hoursPerWeek || "Full-time"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Eligibility</p>
                                  <p className="text-xs font-black text-slate-800">{details.eligibility || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Conversion to PPO?</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.conversionOffer || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Certificate Offered?</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.certificate || "Yes"}</p>
                                </div>
                              </>
                            )}

                            {selectedOppDetail.type === "COMPETITION" && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Format</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.format || "Solo"} {details.format === "team" && `(Max team size: ${details.maxTeamSize || 4})`}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Theme / Domain</p>
                                  <p className="text-xs font-black text-slate-800">{details.theme || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Prizes & Perks</p>
                                  <p className="text-xs font-black text-slate-850">{details.prizeDetails || "Certificate"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Timeline</p>
                                  <p className="text-xs font-black text-slate-800">{details.timeline || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Registration Fee</p>
                                  <p className="text-xs font-black text-slate-800">{details.registrationFee || "Free"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Eligibility</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.eligibility || "Open to all"}</p>
                                </div>
                                {details.rubricLink && (
                                  <div className="sm:col-span-2 space-y-0.5">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Judging Rubric URL</p>
                                    <a href={details.rubricLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#2164c5] hover:underline break-all">
                                      {details.rubricLink}
                                    </a>
                                  </div>
                                )}
                              </>
                            )}

                            {selectedOppDetail.type === "MENTORSHIP" && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Expertise / Domain</p>
                                  <p className="text-xs font-black text-slate-800">{details.mentorExpertise || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">LinkedIn Profile</p>
                                  <a href={details.mentorLinkedIn} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#2164c5] hover:underline break-all">
                                    {details.mentorLinkedIn || "LinkedIn"}
                                  </a>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Mentorship Format</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.format || "1:1"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Sessions & Duration</p>
                                  <p className="text-xs font-black text-slate-800">{details.duration || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Cost</p>
                                  <p className="text-xs font-black text-slate-800">{details.paidOrFree || "Free"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Who it is for</p>
                                  <p className="text-xs font-black text-slate-800">{details.whoFor || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Selection Process</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.selectionProcess || "Open"}</p>
                                </div>
                                <div className="sm:col-span-2 space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Mentor Bio / Credentials</p>
                                  <p className="text-xs font-semibold text-slate-600 leading-relaxed italic">"{details.mentorBio || "N/A"}"</p>
                                </div>
                              </>
                            )}

                            {(selectedOppDetail.type === "COURSES" || selectedOppDetail.type === "WEBINAR" || selectedOppDetail.type === "WORKSHOP" || selectedOppDetail.type === "TRAINING") && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Instructor / Host</p>
                                  <p className="text-xs font-black text-slate-800">{details.instructorCredentials || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Course Mode</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.courseMode || "Live"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                                  <p className="text-xs font-black text-slate-800">{details.duration || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Price</p>
                                  <p className="text-xs font-black text-slate-800">{details.price || "Free"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Certificate Offered?</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.certificate || "Yes"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Platform / LMS link</p>
                                  <p className="text-xs font-black text-slate-800">{details.platform || "Zoom"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Prerequisites</p>
                                  <p className="text-xs font-black text-slate-800">{details.prerequisites || "None"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Schedule</p>
                                  <p className="text-xs font-black text-slate-800">{details.schedule || "N/A"}</p>
                                </div>
                              </>
                            )}

                            {selectedOppDetail.type === "CLUB" && (
                              <>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Community Focus / Theme</p>
                                  <p className="text-xs font-black text-slate-800">{details.clubFocus || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Membership Admission</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.membershipType || "Open"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Fee</p>
                                  <p className="text-xs font-black text-slate-800">{details.clubFee || "Free"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Primary Platform</p>
                                  <p className="text-xs font-black text-slate-800 capitalize">{details.clubPlatform || "Discord"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Activity Cadence</p>
                                  <p className="text-xs font-black text-slate-800">{details.activityCadence || "N/A"}</p>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">Member Size Cap</p>
                                  <p className="text-xs font-black text-slate-800">{details.sizeCap || "No Limit"}</p>
                                </div>
                                {details.guidelinesLink && (
                                  <div className="sm:col-span-2 space-y-0.5">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Community guidelines</p>
                                    <a href={details.guidelinesLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#2164c5] hover:underline break-all">
                                      Code of Conduct Guidelines
                                    </a>
                                  </div>
                                )}
                              </>
                            )}

                          </div>
                        </div>
                      );
                    })()}

                    {/* Common Host & Verification Metadata */}
                    {selectedOppDetail.contactPerson && (
                      <div className="pt-6 border-t border-slate-100 space-y-4 text-left">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Host & Verification Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Host Relationship</p>
                            <p className="text-xs font-black text-slate-700 capitalize">{selectedOppDetail.posterRelationship || "HR Representative"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Verification Status</p>
                            <div className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                              <span className="text-xs font-black text-green-700">Verified Organization</span>
                            </div>
                          </div>
                          {selectedOppDetail.hostVerificationProof && (
                            <div className="sm:col-span-2 space-y-0.5">
                              <p className="text-[10px] text-slate-400 font-bold uppercase">Verification Audit Source</p>
                              <span className="text-xs font-semibold text-slate-600 break-all">{selectedOppDetail.hostVerificationProof}</span>
                            </div>
                          )}
                          <div className="border-t border-slate-100/70 sm:col-span-2 pt-3 my-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Host Contact Details</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-bold text-slate-500">Contact:</span> <span className="font-semibold text-slate-700">{selectedOppDetail.contactPerson || "HR Office"}</span>
                              </div>
                              {selectedOppDetail.contactEmail && (
                                <div>
                                  <span className="font-bold text-slate-500">Email:</span> <a href={`mailto:${selectedOppDetail.contactEmail}`} className="text-brand-500 hover:underline font-semibold">{selectedOppDetail.contactEmail}</a>
                                </div>
                              )}
                              {selectedOppDetail.contactPhone && (
                                <div className="col-span-2">
                                  <span className="font-bold text-slate-500">Phone:</span> <span className="font-semibold text-slate-700">{selectedOppDetail.contactPhone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedOppDetail.extraDetails && !selectedOppDetail.contactPerson && (
                      <div className="pt-6 border-t border-slate-100 space-y-3">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Extra Highlights</h4>
                        <p className="text-slate-600 text-xs font-semibold leading-relaxed flex items-center gap-2">
                          <span className="text-[#2164c5] text-lg">✔</span> {selectedOppDetail.extraDetails}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Application Action Area */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-850 p-6 rounded-3xl text-white shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h4 className="font-extrabold text-sm text-white/90">Ready to redefine your path?</h4>
                      <p className="text-[11px] text-white/60 font-medium">Verify your profile stage settings to fast-track evaluation.</p>
                    </div>

                    {selectedOppDetail.type === "WEBINAR" || selectedOppDetail.type === "WORKSHOP" ? (
                      <button
                        onClick={() => registerForWebinar(selectedOppDetail.id)}
                        disabled={webinarRegistrations.includes(selectedOppDetail.id) || currentUser.role === "host"}
                        className={`w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition ${webinarRegistrations.includes(selectedOppDetail.id) || currentUser.role === "host"
                          ? "bg-white/10 text-white/45 cursor-not-allowed border border-white/10"
                          : "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20 active:scale-95"
                          }`}
                      >
                        {currentUser.role === "host" ? "Host View Only" : webinarRegistrations.includes(selectedOppDetail.id) ? "Registered ✓" : "Register Event"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApplyNow(selectedOppDetail)}
                        disabled={applications.some(a => a.opportunityId === selectedOppDetail.id) || currentUser.role === "host"}
                        className={`w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition ${applications.some(a => a.opportunityId === selectedOppDetail.id) || currentUser.role === "host"
                          ? "bg-white/10 text-white/45 cursor-not-allowed border border-white/10"
                          : "bg-[#2164c5] hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                          }`}
                      >
                        {currentUser.role === "host" ? "Host View Only" : applications.some(a => a.opportunityId === selectedOppDetail.id) ? "Applied ✓" : "Apply to Role"}
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 9: FEATURED OPPORTUNITIES PAGE
              ================================================ */}
          {currentView === "features" && (
            <div className="space-y-8 max-w-[95%] mx-auto text-left animate-fade-in-up">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="bg-brand-50 text-brand-700 text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-orange-100/60 tracking-wider shadow-sm">
                    📢 Curated Bulletin Board
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 border-l-4 border-brand-500 pl-3 mt-2">
                    Notice Board & Featured Highlights
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Direct announcements from system administrators and official flyers for host opportunities.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("opportunities")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition shadow-sm self-start md:self-center"
                >
                  ← Back to Board
                </button>
              </div>

              {/* Layout for Notice Board */}
              <div className="grid gap-8 lg:grid-cols-3">

                {/* Left Columns (Col 1 & 2): Visual Opportunity Posters Pinboard */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-250 pb-3">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <span>📌</span> Opportunity Flyers & Banners
                    </h3>
                    <span className="bg-brand-100 text-brand-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                      {featuredOpportunities.length} Featured
                    </span>
                  </div>

                  {featuredOpportunities.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-xs">
                      <p className="text-slate-400 font-bold text-lg">No opportunity flyers pinned yet.</p>
                      <p className="text-slate-400 text-xs mt-1">Hosts can put their approved opportunities here from their panel.</p>
                    </div>
                  ) : (
                    /* Pinboard Grid of Posters */
                    <div className="grid gap-6 sm:grid-cols-2">
                      {featuredOpportunities.map(opp => (
                        <div
                          key={opp.id}
                          onClick={() => {
                            setSelectedOppDetail(opp);
                            setCurrentView("opportunity-detail");
                          }}
                          className="cursor-pointer group relative rounded-3xl aspect-[3/4] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-350 bg-slate-100 border border-slate-200"
                        >
                          {opp.posterUrl ? (
                            /* Visual Image Flyer */
                            <div className="w-full h-full relative">
                              <img
                                src={opp.posterUrl}
                                alt={opp.title}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=600&auto=format&fit=crop" }}
                              />
                              {/* Bottom Gradient Overlay for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                            </div>
                          ) : (
                            /* Premium SVG/CSS Card Flyer */
                            <div className={`w-full h-full p-6 flex flex-col justify-between transition duration-500 group-hover:scale-[1.02] ${opp.posterTemplate === "tech-blue" ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white" :
                              opp.posterTemplate === "sunset-rose" ? "bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 text-white" :
                                opp.posterTemplate === "emerald-green" ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-800 text-white" :
                                  opp.posterTemplate === "luxury-purple" ? "bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-950 text-white" :
                                    "bg-gradient-to-br from-[#2164c5] to-indigo-800 text-white"
                              }`}>
                              <div className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
                              <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 rounded-full bg-black/15 blur-lg pointer-events-none"></div>

                              <div className="relative z-10 flex flex-col justify-between h-full text-left">
                                <div>
                                  <div className="flex justify-between items-center mb-6">
                                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-black tracking-widest uppercase">
                                      ★ {opp.type}
                                    </span>
                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                  </div>

                                  <p className="text-white/80 text-[10px] font-black uppercase tracking-wider">{opp.company}</p>
                                  <h3 className="text-xl font-black tracking-tight leading-tight mt-1 line-clamp-3 group-hover:text-brand-100 transition-colors">{opp.title}</h3>
                                </div>

                                <div className="pt-4">
                                  <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest">Target Stage</p>
                                  <p className="text-xs font-extrabold capitalize mt-0.5">
                                    {opp.category === "fresh" ? "🎒 After Studies" :
                                      opp.category === "break" ? "⏰ After Career Break" :
                                        "🚀 Late 30s Switcher"}
                                  </p>
                                  <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-center">
                                    <span className="text-[9px] text-white/70 font-semibold uppercase tracking-wider">Tap to open flyer</span>
                                    <span className="text-sm">➜</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Hover Overlay Button */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-20">
                            <span className="bg-white text-slate-900 text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                              View Flyer Details
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column (Col 3): Platform Notices Feed */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-250 pb-3">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <span>📢</span> Official Announcements
                    </h3>
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                      {notices.length} Active
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {notices.length === 0 ? (
                      <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl">
                        <p className="text-slate-400 font-bold">No announcements posted.</p>
                      </div>
                    ) : (
                      notices.map(notice => (
                        <article
                          key={notice.id}
                          className="bg-white border border-slate-200 hover:border-slate-350 p-6 rounded-2xl shadow-xs transition hover:shadow-md relative overflow-hidden"
                        >
                          <div className="flex justify-between items-center gap-2 mb-3">
                            <span className="bg-brand-50 text-brand-700 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-orange-100">
                              Official Announcement
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">{notice.date}</span>
                          </div>

                          <h4 className="text-base font-bold text-slate-800">{notice.title}</h4>
                          <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed whitespace-pre-line">
                            {notice.content}
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold">Posted By: <strong className="text-slate-600">{notice.postedBy}</strong></span>
                            <span className="text-slate-300">📢 System Verified</span>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================
              VIEW: JOBS PAGE
              ================================================ */}
          {currentView === "jobs" && (
            <div className="space-y-8 max-w-[95%] mx-auto animate-fade-in-up">
              <div className="max-w-3xl text-left pl-3 border-l-4 border-blue-600">
                <h2 className="text-3xl font-black text-slate-900">Active Job Openings</h2>
                <p className="text-slate-500 mt-2">Vetted full-time and freelance job opportunities for women. Filtered for career restart and transition candidates.</p>
              </div>

              {jobOpportunities.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-400 font-bold">No active jobs available at the moment.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                  {jobOpportunities.map(opp => {
                    const isOnline = opp.location.toLowerCase().includes("online") || opp.location.toLowerCase().includes("remote");
                    const locationText = isOnline ? "🌐 Online" : `📍 ${opp.location}`;
                    const initials = opp.company ? opp.company.split(' ').map(n => n[0]).join('').slice(0, 3) : "SRD";

                    return (
                      <div
                        key={opp.id}
                        onClick={() => {
                          setSelectedOppDetail(opp);
                          setCurrentView("opportunity-detail");
                        }}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between h-[210px] group"
                      >
                        <div className="h-[105px] bg-[#f4f8ff]/50 p-5 flex items-start justify-between border-b border-slate-100/60 relative">
                          <span className="bg-slate-200/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-slate-600 tracking-wide">
                            {locationText}
                          </span>

                          <div className="bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl w-14 h-14 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                            {opp.logoUrl ? (
                              <img
                                src={opp.logoUrl}
                                alt={opp.company}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full items-center justify-center text-center text-[10px] font-black uppercase text-[#2164c5] tracking-tighter"
                              style={{ display: opp.logoUrl ? 'none' : 'flex' }}
                            >
                              {initials}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <h3 className="text-slate-800 font-extrabold text-sm line-clamp-2 leading-snug group-hover:text-[#2164c5] transition-colors duration-200">
                            {opp.title}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[11px] text-slate-400 font-black tracking-wide uppercase">
                              {opp.company}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                              {opp.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================
              VIEW: INTERNSHIPS PAGE
              ================================================ */}
          {currentView === "internships" && (
            <div className="space-y-8 max-w-[95%] mx-auto animate-fade-in-up">
              <div className="max-w-3xl text-left pl-3 border-l-4 border-blue-600">
                <h2 className="text-3xl font-black text-slate-900">Active Internship Openings</h2>
                <p className="text-slate-500 mt-2">Kickstart your professional journey with hands-on, vetted roles at top tech companies and startups. Filtered for female talent.</p>
              </div>

              {internshipOpportunities.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-400 font-bold">No active internships available at the moment.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                  {internshipOpportunities.map(opp => {
                    const isOnline = opp.location.toLowerCase().includes("online") || opp.location.toLowerCase().includes("remote");
                    const locationText = isOnline ? "🌐 Online" : `📍 ${opp.location}`;
                    const initials = opp.company ? opp.company.split(' ').map(n => n[0]).join('').slice(0, 3) : "SRD";

                    return (
                      <div
                        key={opp.id}
                        onClick={() => {
                          setSelectedOppDetail(opp);
                          setCurrentView("opportunity-detail");
                        }}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between h-[210px] group"
                      >
                        <div className="h-[105px] bg-[#f4f8ff]/50 p-5 flex items-start justify-between border-b border-slate-100/60 relative">
                          <span className="bg-slate-200/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-slate-600 tracking-wide">
                            {locationText}
                          </span>

                          <div className="bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl w-14 h-14 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                            {opp.logoUrl ? (
                              <img
                                src={opp.logoUrl}
                                alt={opp.company}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full items-center justify-center text-center text-[10px] font-black uppercase text-[#2164c5] tracking-tighter"
                              style={{ display: opp.logoUrl ? 'none' : 'flex' }}
                            >
                              {initials}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <h3 className="text-slate-800 font-extrabold text-sm line-clamp-2 leading-snug group-hover:text-[#2164c5] transition-colors duration-200">
                            {opp.title}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[11px] text-slate-400 font-black tracking-wide uppercase">
                              {opp.company}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                              {opp.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================
              VIEW: COMPETITIONS PAGE
              ================================================ */}
          {currentView === "competitions" && (
            <div className="space-y-8 max-w-[95%] mx-auto animate-fade-in-up">
              <div className="max-w-3xl text-left pl-3 border-l-4 border-blue-600">
                <h2 className="text-3xl font-black text-slate-900">Active Challenges & Competitions</h2>
                <p className="text-slate-500 mt-2">Solve real-world challenges, hackathons, and skill assessments to prove your capabilities and get noticed by recruiters.</p>
              </div>

              {competitionOpportunities.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-400 font-bold">No active competitions available at the moment.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                  {competitionOpportunities.map(opp => {
                    const isOnline = opp.location.toLowerCase().includes("online") || opp.location.toLowerCase().includes("remote");
                    const locationText = isOnline ? "🌐 Online" : `📍 ${opp.location}`;
                    const initials = opp.company ? opp.company.split(' ').map(n => n[0]).join('').slice(0, 3) : "SRD";

                    return (
                      <div
                        key={opp.id}
                        onClick={() => {
                          setSelectedOppDetail(opp);
                          setCurrentView("opportunity-detail");
                        }}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between h-[210px] group"
                      >
                        <div className="h-[105px] bg-[#f4f8ff]/50 p-5 flex items-start justify-between border-b border-slate-100/60 relative">
                          <span className="bg-slate-200/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-slate-600 tracking-wide">
                            {locationText}
                          </span>

                          <div className="bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl w-14 h-14 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                            {opp.logoUrl ? (
                              <img
                                src={opp.logoUrl}
                                alt={opp.company}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full items-center justify-center text-center text-[10px] font-black uppercase text-[#2164c5] tracking-tighter"
                              style={{ display: opp.logoUrl ? 'none' : 'flex' }}
                            >
                              {initials}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <h3 className="text-slate-800 font-extrabold text-sm line-clamp-2 leading-snug group-hover:text-[#2164c5] transition-colors duration-200">
                            {opp.title}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[11px] text-slate-400 font-black tracking-wide uppercase">
                              {opp.company}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                              {opp.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================
              VIEW: MENTORSHIP PAGE
              ================================================ */}
          {currentView === "mentorship" && (
            <div className="space-y-8 max-w-[95%] mx-auto animate-fade-in-up">
              <div className="max-w-3xl text-left pl-3 border-l-4 border-blue-600">
                <h2 className="text-3xl font-black text-slate-900">1-on-1 Career Mentorship</h2>
                <p className="text-slate-500 mt-2">Connect directly with seasoned female tech executives, engineering managers, and product leaders for custom training, resume alignment, and career coaching.</p>
              </div>

              {mentorshipOpportunities.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-400 font-bold">No mentorship sessions currently open for booking.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                  {mentorshipOpportunities.map(opp => {
                    const initials = opp.company ? opp.company.split(' ').map(n => n[0]).join('').slice(0, 3) : "SRD";

                    return (
                      <div
                        key={opp.id}
                        onClick={() => {
                          setSelectedOppDetail(opp);
                          setCurrentView("opportunity-detail");
                        }}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between h-[210px] group"
                      >
                        <div className="h-[105px] bg-[#f4f8ff]/50 p-5 flex items-start justify-between border-b border-slate-100/60 relative">
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full">
                            👩‍🏫 Professional Mentor
                          </span>

                          <div className="bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl w-14 h-14 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                            {opp.logoUrl ? (
                              <img
                                src={opp.logoUrl}
                                alt={opp.company}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full items-center justify-center text-center text-[10px] font-black uppercase text-[#2164c5] tracking-tighter"
                              style={{ display: opp.logoUrl ? 'none' : 'flex' }}
                            >
                              {initials}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <h3 className="text-slate-800 font-extrabold text-sm line-clamp-2 leading-snug group-hover:text-[#2164c5] transition-colors duration-200">
                            {opp.title}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[11px] text-slate-400 font-black tracking-wide uppercase">
                              {opp.company}
                            </span>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                              {opp.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================================================
              VIEW 2: CLUBS & COMMUNITIES
              ================================================ */}
          {currentView === "community" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-black text-slate-900 border-l-4 border-[#2164c5] pl-3">She-Clubs Communities</h2>
                  <p className="text-slate-500 mt-2">Connect, network, and grow with women sharing similar domains and career visions.</p>
                </div>
                <button
                  onClick={() => setIsCreateClubModalOpen(true)}
                  className="flex items-center gap-2 bg-[#2164c5] hover:bg-blue-700 text-white font-black text-xs px-5 py-3 rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" /> Create New Club
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {clubs.map(club => (
                  <div
                    key={club.id}
                    onClick={() => handleEnterClub(club.id)}
                    className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <span className="h-14 w-14 rounded-full bg-slate-50 inline-flex items-center justify-center text-3xl mb-4 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-200">
                        {club.icon}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#2164c5] transition-colors">{club.name}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1">{club.count.toLocaleString()} active members</p>
                      {club.joined && (
                        <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Member
                        </span>
                      )}
                    </div>
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleClubJoin(club.id);
                        }}
                        className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition w-full ${club.joined
                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          : "bg-[#2164c5] text-white hover:bg-blue-700 shadow-sm"
                          }`}
                      >
                        {club.joined ? "Joined ✓" : "Join Club"}
                      </button>
                      <button
                        onClick={() => handleEnterClub(club.id)}
                        className="text-xs font-bold text-[#2164c5] hover:text-blue-800 transition flex items-center justify-center gap-1 w-full py-1"
                      >
                        Enter Discussion <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 2.5: Dedicated Club Detail View
              ================================================ */}
          {currentView === "club-detail" && (() => {
            const club = clubs.find(c => c.id === selectedClubId);
            if (!club) return null;
            const details = CLUB_DETAILS_LOOKUP[club.id] || {};
            return (
              <div className="space-y-8 max-w-[95%] mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Back Button */}
                <button
                  onClick={() => setCurrentView("community")}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-full px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-sm w-fit"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Clubs
                </button>

                {/* Banner & Header Card */}
                <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                  {/* Cover image */}
                  <div className="h-44 sm:h-56 w-full relative">
                    <img
                      src={details.coverUrl}
                      alt={club.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider text-white bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                      {details.category}
                    </span>
                  </div>

                  {/* Header Detail Overlay Area */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 -mt-10 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full sm:w-auto">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white p-1 rounded-3xl shadow-md border-2 border-white overflow-hidden flex items-center justify-center text-4xl shrink-0 select-none">
                        {club.icon}
                      </div>
                      <div className="space-y-1.5 mt-2 sm:mt-0">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-955 tracking-tight leading-none">{club.name}</h1>
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-xs text-slate-450 font-bold">{club.count.toLocaleString()} active members</p>
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-350 shrink-0"></span>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${club.joined ? "text-emerald-650 bg-emerald-50/70 border border-emerald-100" : "text-slate-500 bg-slate-100"
                            } px-2.5 py-0.5 rounded-full`}>
                            {club.joined ? "Joined ✓" : "Not Joined"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleClubJoin(club.id)}
                      className={`px-6 py-3 rounded-full text-xs font-black transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap ${club.joined
                        ? "bg-slate-100 text-slate-650 hover:bg-slate-200 border border-slate-200"
                        : "bg-[#2164c5] text-white hover:bg-blue-700 hover:shadow-md"
                        }`}
                    >
                      {club.joined ? "Leave Group" : "Join Group"}
                    </button>
                  </div>

                  {/* Description Box */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 border-t border-slate-100 pt-5">
                    <p className="text-slate-650 text-sm leading-relaxed max-w-4xl">{details.description}</p>
                  </div>
                </div>

                {/* 3-Column Split Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Sidebar Layout (Media & Member Settings) */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Panel 1: Shared Files & Links */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col space-y-4">
                      <h3 className="text-xs font-black text-slate-805 uppercase tracking-wider">Shared Media & Resources</h3>

                      {/* Tab Selection */}
                      <div className="flex bg-slate-100/70 p-1 rounded-xl">
                        <button
                          onClick={() => setActiveMediaTab("files")}
                          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${activeMediaTab === "files" ? "bg-white text-slate-850 shadow-sm" : "text-slate-400 hover:text-slate-605"
                            }`}
                        >
                          Files ({details.media.files.length})
                        </button>
                        <button
                          onClick={() => setActiveMediaTab("links")}
                          className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${activeMediaTab === "links" ? "bg-white text-slate-855 shadow-sm" : "text-slate-400 hover:text-slate-605"
                            }`}
                        >
                          Links ({details.media.links.length})
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                        {activeMediaTab === "files" ? (
                          details.media.files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-150/50 bg-slate-50/30 hover:bg-slate-50 transition">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="p-2 bg-rose-50 text-rose-500 rounded-lg shrink-0">
                                  <FileText className="h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                  <p className="text-xs font-extrabold text-slate-700 truncate max-w-[120px]">{file.name}</p>
                                  <p className="text-[10px] text-slate-450 font-bold">{file.size}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => alert(`Downloading ${file.name}...`)}
                                className="text-[10px] font-black text-[#2164c5] hover:underline whitespace-nowrap shrink-0 px-2.5 py-1.5 bg-blue-50/50 rounded-lg cursor-pointer"
                              >
                                Download
                              </button>
                            </div>
                          ))
                        ) : (
                          details.media.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-xl border border-slate-150/50 bg-slate-50/30 hover:bg-slate-50 transition text-left cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg shrink-0">
                                  <ExternalLink className="h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                  <p className="text-xs font-extrabold text-slate-700 truncate max-w-[120px]">{link.name}</p>
                                  <p className="text-[10px] text-slate-450 font-bold truncate max-w-[120px]">{link.url.replace("https://", "")}</p>
                                </div>
                              </div>
                              <span className="text-slate-400 hover:text-slate-650 shrink-0">
                                <ArrowUpRight className="h-4 w-4" />
                              </span>
                            </a>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Panel 2: Member settings */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col space-y-5">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Group Info & Settings</h3>

                      {/* Mute alerts */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/30 border border-slate-150/50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl shrink-0 ${clubSettings[club.id]?.muteNotifications ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-[#2164c5]"}`}>
                            {clubSettings[club.id]?.muteNotifications ? <BellOff className="h-4.5 w-4.5" /> : <Bell className="h-4.5 w-4.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-slate-850">Mute Notifications</p>
                            <p className="text-[9px] text-slate-450 font-bold">Turn off group alerts</p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleClubMute(club.id)}
                          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${clubSettings[club.id]?.muteNotifications ? "bg-slate-300" : "bg-[#2164c5]"
                            }`}
                        >
                          <span
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${clubSettings[club.id]?.muteNotifications ? "translate-x-0" : "translate-x-4"
                              }`}
                          />
                        </button>
                      </div>

                      {/* Members lists */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">Moderators ({details.membersList.moderators.length})</p>
                          <div className="space-y-2">
                            {details.membersList.moderators.map((user, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black ${user.color} shrink-0 select-none`}>
                                  {user.initial}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-extrabold text-slate-805 truncate">{user.name}</p>
                                  <p className="text-[9px] text-slate-400 font-semibold truncate leading-none mt-0.5">{user.title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">Members ({details.membersList.members.length})</p>
                          <div className="space-y-2 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                            {details.membersList.members.map((user, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black ${user.color} shrink-0 select-none`}>
                                  {user.initial}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-extrabold text-slate-850 truncate">{user.name}</p>
                                  <p className="text-[9px] text-slate-400 font-semibold truncate leading-none mt-0.5">{user.title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Leave channel button */}
                      {club.joined && (
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to leave ${club.name}?`)) {
                              toggleClubJoin(club.id);
                            }
                          }}
                          className="w-full mt-2 border border-rose-200 hover:bg-rose-50 text-rose-600 py-2.5 rounded-2xl text-xs font-black transition-colors cursor-pointer"
                        >
                          Leave Discussion Channel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Center Column: Discussion board */}
                  <div className="lg:col-span-2 flex flex-col bg-white border border-slate-200 rounded-[2rem] h-[650px] shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <div>
                          <h2 className="text-sm font-black text-slate-850">{club.name} Channel</h2>
                          <p className="text-[10px] text-slate-400 font-bold">Online discussion and announcements</p>
                        </div>
                      </div>
                      {clubSettings[club.id]?.muteNotifications && (
                        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <BellOff className="h-3 w-3" /> Muted
                        </span>
                      )}
                    </div>

                    {/* Body Logs viewport */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30 no-scrollbar">
                      {!club.joined ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                          <span className="h-16 w-16 bg-blue-50 text-[#2164c5] rounded-full flex items-center justify-center text-3xl select-none">
                            🔒
                          </span>
                          <div className="max-w-xs space-y-1">
                            <h3 className="text-base font-bold text-slate-855">Joined Members Only</h3>
                            <p className="text-xs text-slate-455 font-semibold leading-relaxed">
                              You must join the <strong>{club.name}</strong> community to view files, read resources, and send messages.
                            </p>
                          </div>
                          <button
                            onClick={() => toggleClubJoin(club.id)}
                            className="bg-[#2164c5] hover:bg-blue-700 text-white rounded-full px-6 py-2.5 text-xs font-black shadow-sm transition cursor-pointer"
                          >
                            Join Club Now
                          </button>
                        </div>
                      ) : (clubChats[club.id] || []).length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                          No messages in this channel yet. Start the conversation!
                        </div>
                      ) : (
                        (clubChats[club.id] || []).map((msg) => {
                          const isMe = msg.sender === currentUser.name;
                          return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1 animate-in fade-in duration-250`}>
                              <div className="flex items-center gap-1.5 text-[10px] px-1.5">
                                <span className={isMe ? "text-[#2164c5] font-black" : msg.color || "text-slate-700 font-extrabold"}>
                                  {msg.sender}
                                </span>
                                <span className="text-slate-400 font-bold">{msg.time}</span>
                              </div>
                              <p
                                className={`text-sm font-medium p-4 rounded-[1.5rem] max-w-md shadow-sm leading-relaxed ${isMe
                                  ? "bg-gradient-to-r from-[#2164c5] to-indigo-600 text-white rounded-tr-none"
                                  : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                  }`}
                              >
                                {msg.text}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Input Area */}
                    {club.joined && (
                      <div className="p-4 bg-white border-t border-slate-100 flex gap-2.5 items-center">
                        <button
                          onClick={() => alert("File attachment feature is coming soon!")}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-slate-650 border border-slate-200/60 rounded-xl transition cursor-pointer shrink-0"
                          title="Attach File"
                        >
                          <Paperclip className="h-4.5 w-4.5" />
                        </button>

                        <input
                          type="text"
                          placeholder={`Message #${club.name.toLowerCase().replace(/\s+/g, "-")}...`}
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              postChatMessage();
                            }
                          }}
                          className="flex-grow border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2164c5]/25 focus:border-[#2164c5] text-sm bg-slate-50/50"
                        />

                        <button
                          onClick={postChatMessage}
                          disabled={!newMessageText.trim()}
                          className={`p-3.5 rounded-xl flex items-center justify-center transition shadow-sm shrink-0 cursor-pointer ${newMessageText.trim()
                            ? "bg-[#2164c5] hover:bg-blue-700 text-white"
                            : "bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed"
                            }`}
                        >
                          <Send className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ================================================
              VIEW 3: CURATED UPSKILLING (Aggregator)
              ================================================ */}
          {currentView === "courses" && (
            <div className="space-y-8 max-w-[95%] mx-auto">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-[#2164c5] pl-3">Suggested Learning & Training Paths</h2>
                <p className="text-slate-500 mt-2">Curated skills bootcamps and certifications from partner aggregators to prepare for switches or returns.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {CURATED_COURSES.map((course, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-55 py-0.5 px-2 rounded-md">
                        {course.platform}
                      </span>
                      <h3 className="text-base font-bold text-slate-800 mt-2 leading-snug">{course.title}</h3>
                      <span className="inline-block mt-3 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                        {course.badge}
                      </span>
                    </div>

                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-1 bg-[#2164c5] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition shadow-sm">
                      Open Program <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 4: CANDIDATE APPLICATIONS HUB
              ================================================ */}
          {currentView === "applications" && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-brand-500 pl-3">My Activity Hub</h2>
                <p className="text-slate-500 mt-2">Track applications, interview rounds, mentorship sessions, enrolled courses, certificates, bookmarks and watchlist.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-72 shrink-0">
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-1">
                    {[
                      { id: "applications", name: "My Applications", icon: CheckCircle },
                      { id: "rounds", name: "My Rounds", icon: Route },
                      { id: "courses", name: "My Courses", icon: BookOpen },
                      { id: "sessions", name: "My Sessions", icon: Calendar },
                      { id: "certificates", name: "My Certificates", icon: Award },
                      { id: "history", name: "Recently Viewed", icon: History },
                      { id: "watchlist", name: "Watchlist", icon: Heart },
                      { id: "bookmarks", name: "Bookmarked Questions", icon: Bookmark, display: "Bookmarked Ques..." }
                    ].map(tab => {
                      const IconComponent = tab.icon;
                      const isActive = activeActivityTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveActivityTab(tab.id)}
                          className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-sm font-extrabold rounded-2xl transition-all duration-200 ${isActive
                            ? "bg-brand-500 text-white shadow-md shadow-brand-500/15"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                            }`}
                        >
                          <IconComponent className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                          <span className="truncate">{tab.display || tab.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* Content Panel */}
                <div className="flex-grow bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm min-h-[480px]">
                  {/* TAB 1: APPLICATIONS */}
                  {activeActivityTab === "applications" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">My Applications</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Track the review status and timeline of roles you applied to.</p>
                      </div>

                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                        <table className="min-w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th className="p-4 text-xs font-black text-slate-500 uppercase">Opportunity</th>
                              <th className="p-4 text-xs font-black text-slate-500 uppercase">Company</th>
                              <th className="p-4 text-xs font-black text-slate-500 uppercase">Applied On</th>
                              <th className="p-4 text-xs font-black text-slate-500 uppercase">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applications.filter(a => a.candidateName === currentUser.name || currentUser.name === "Guest User").length === 0 ? (
                              <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-400 font-bold">
                                  No applications found. Try applying to hosted opportunities!
                                </td>
                              </tr>
                            ) : (
                              applications.filter(a => a.candidateName === currentUser.name || currentUser.name === "Guest User").map(app => (
                                <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                  <td className="p-4 font-bold text-slate-800">{app.opportunityTitle}</td>
                                  <td className="p-4 font-semibold text-[#2164c5]">{app.company}</td>
                                  <td className="p-4 text-slate-500 text-sm font-semibold">{app.appliedAt}</td>
                                  <td className="p-4">
                                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${app.status === 'Applied' ? 'bg-blue-50 text-blue-600' :
                                      app.status === 'Shortlisted' ? 'bg-orange-50 text-orange-600' :
                                        app.status === 'Selected' ? 'bg-green-50 text-green-600' :
                                        app.status === 'Hold' ? 'bg-amber-50 text-amber-600' :
                                          'bg-red-50 text-red-600'
                                      }`}>
                                      {app.status}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MY ROUNDS */}
                  {activeActivityTab === "rounds" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">My Interview Rounds</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Review live timelines, scheduled assessments, and feedbacks.</p>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            company: "Google India",
                            role: "Associate Software Engineer",
                            rounds: [
                              { name: "Online Coding Test", date: "May 26, 2026", status: "Completed", detail: "Score: 94% / Passed" },
                              { name: "Technical Interview 1 (DSA)", date: "May 30, 2026", status: "Scheduled", detail: "11:00 AM (Link in invite)" },
                              { name: "Technical Interview 2 (System Design)", date: "TBD", status: "Pending", detail: "Awaiting previous round clearance" }
                            ]
                          },
                          {
                            company: "Salesforce",
                            role: "Senior Product Manager (Returnship)",
                            rounds: [
                              { name: "Resume & Gap Review", date: "May 24, 2026", status: "Completed", detail: "Selected for interview" },
                              { name: "Portfolio Presentation", date: "May 29, 2026", status: "Completed", detail: "Passed HM review" },
                              { name: "HM Executive Round", date: "June 2, 2026", status: "Scheduled", detail: "3:00 PM (Calendar invitation sent)" }
                            ]
                          }
                        ].map((appRound, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-left">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-black text-slate-800 text-base">{appRound.role}</h4>
                                <p className="text-xs text-[#2164c5] font-bold mt-0.5">{appRound.company}</p>
                              </div>
                              <span className="text-[10px] font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full uppercase border border-orange-100">Active Pipeline</span>
                            </div>

                            {/* Stepper timeline */}
                            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                              {appRound.rounds.map((r, rIdx) => (
                                <div key={rIdx} className="flex gap-4 items-start pl-6 relative">
                                  <div className={`absolute left-3 top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-white -translate-x-1/2 flex items-center justify-center ${r.status === "Completed" ? "border-green-500 bg-green-50" :
                                    r.status === "Scheduled" ? "border-brand-500 bg-brand-50 animate-pulse" :
                                      "border-slate-300"
                                    }`}>
                                    {r.status === "Completed" && <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>}
                                    {r.status === "Scheduled" && <span className="h-1.5 w-1.5 bg-brand-500 rounded-full"></span>}
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-bold text-slate-800">{r.name}</p>
                                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${r.status === "Completed" ? "bg-green-50 text-green-700" :
                                        r.status === "Scheduled" ? "bg-orange-50 text-orange-700 border border-orange-100" :
                                          "bg-slate-100 text-slate-400"
                                        }`}>{r.status}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{r.detail} • <span className="text-slate-400">{r.date}</span></p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MY COURSES */}
                  {activeActivityTab === "courses" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">My Learning Tracks</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Review upskilling courses, progress metrics, and syllabus tracks.</p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 text-left">
                        {[
                          {
                            title: "Interview Prep 101: DSA + System Design",
                            platform: "GeeksforGeeks",
                            progress: 80,
                            instructor: "Sandeep Jain",
                            lastAccessed: "2 hours ago",
                            lessons: "24/30 Lessons Completed"
                          },
                          {
                            title: "Data Analytics Training Program",
                            platform: "GeeksforGeeks",
                            progress: 100,
                            instructor: "Priyanshi Gupta",
                            lastAccessed: "3 days ago",
                            lessons: "40/40 Lessons Completed",
                            certId: "CERT-DA-98214"
                          },
                          {
                            title: "System Design Training Program",
                            platform: "GeeksforGeeks",
                            progress: 25,
                            instructor: "Alok Kumar",
                            lastAccessed: "1 week ago",
                            lessons: "5/20 Lessons Completed"
                          }
                        ].map((course, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between hover:border-brand-200 transition">
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-orange-100">{course.platform}</span>
                                <span className="text-[11px] text-slate-400 font-semibold">{course.lastAccessed}</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">{course.title}</h4>
                              <p className="text-xs text-slate-400 font-bold mt-1.5">Instructor: {course.instructor}</p>
                            </div>

                            <div className="mt-5 space-y-2">
                              <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span>{course.lessons}</span>
                                <span className="font-black text-slate-700">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div className="bg-brand-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                              </div>
                              {course.progress === 100 && (
                                <button
                                  onClick={() => alert(`Downloading Certificate ${course.certId}...`)}
                                  className="w-full mt-3 bg-[#2164c5] hover:bg-blue-700 text-white text-xs font-black py-2 rounded-xl transition shadow-sm"
                                >
                                  Download Certificate ★
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MY SESSIONS */}
                  {activeActivityTab === "sessions" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">Booked Mentorship Sessions</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Manage scheduled 1-on-1 advisor video meets and career critique sessions.</p>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            mentorName: "Sarah Jenkins",
                            role: "Staff Engineer at Google",
                            type: "1-on-1 Portfolio & Tech Interview Prep",
                            dateTime: "June 4, 2026 at 11:00 AM",
                            status: "Confirmed",
                            actionText: "Join Zoom Meet",
                            actionUrl: "https://zoom.us/j/9876543210"
                          },
                          {
                            mentorName: "Priyanshi Gupta",
                            role: "Product Manager at Salesforce",
                            type: "Resume Critique & Transition Strategy",
                            dateTime: "May 25, 2026 at 4:00 PM",
                            status: "Completed",
                            actionText: "View Feedback Notes"
                          }
                        ].map((sess, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-left flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                            <div>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${sess.status === "Confirmed" ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-200 text-slate-500"
                                }`}>{sess.status}</span>
                              <h4 className="font-bold text-slate-800 text-base mt-2">{sess.type}</h4>
                              <p className="text-xs font-semibold text-slate-600 mt-1">Mentor: <span className="font-black text-slate-800">{sess.mentorName}</span> ({sess.role})</p>
                              <p className="text-xs text-slate-400 font-semibold mt-1">Scheduled for: {sess.dateTime}</p>
                            </div>

                            <div>
                              {sess.status === "Confirmed" ? (
                                <a
                                  href={sess.actionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block bg-brand-500 hover:bg-brand-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-sm hover:scale-[1.02] transition"
                                >
                                  {sess.actionText} →
                                </a>
                              ) : (
                                <button
                                  onClick={() => alert("Feedback: Candidate has excellent leadership skills. Work on improving React reconciliation concepts.")}
                                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-black px-4 py-2.5 rounded-xl transition"
                                >
                                  {sess.actionText}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: CERTIFICATES */}
                  {activeActivityTab === "certificates" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">My Earned Credentials</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Showcase verified certification seals and share direct links with hiring agents.</p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 text-left">
                        {[
                          {
                            title: "Advanced React & Vite Architecture",
                            issuedBy: "SheReDefine Academy & Salesforce Partner",
                            date: "May 2026",
                            credentialId: "SRD-RXT-8812"
                          },
                          {
                            title: "Data Analytics Transition Program",
                            issuedBy: "GeeksforGeeks Cocurricular Certificate",
                            date: "April 2026",
                            credentialId: "GFG-DA-98214"
                          }
                        ].map((cert, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between border-l-4 border-l-brand-500">
                            <div>
                              <Award className="h-8 w-8 text-brand-500 mb-4" />
                              <h4 className="font-black text-slate-800 text-base leading-snug">{cert.title}</h4>
                              <p className="text-xs text-slate-500 font-medium mt-1">Issued by: <span className="font-bold text-slate-700">{cert.issuedBy}</span></p>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">Date: {cert.date} • ID: {cert.credentialId}</p>
                            </div>

                            <div className="mt-6 flex gap-2">
                              <button
                                onClick={() => alert(`Credential verified: http://sheredefine.org/verify/${cert.credentialId}`)}
                                className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-black py-2 rounded-xl transition hover:bg-slate-50"
                              >
                                Verify Link
                              </button>
                              <button
                                onClick={() => alert("Downloading PDF credential...")}
                                className="flex-1 bg-brand-500 hover:bg-brand-700 text-white text-xs font-black py-2 rounded-xl transition shadow-sm"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: RECENTLY VIEWED */}
                  {activeActivityTab === "history" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">Recently Viewed Opportunities</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">A timeline history of opportunity listings you reviewed recently.</p>
                      </div>

                      <div className="space-y-4">
                        {opportunities.filter(opp => recentlyViewed.includes(opp.id)).map(opp => (
                          <div key={opp.id} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex justify-between items-center text-left">
                            <div>
                              <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">{opp.type}</span>
                              <h4 className="font-bold text-slate-800 text-sm mt-2">{opp.title}</h4>
                              <p className="text-xs text-[#2164c5] font-semibold">{opp.company} • <span className="text-slate-400">{opp.location}</span></p>
                            </div>
                            <button
                              onClick={() => {
                                setCurrentView("opportunities");
                                document.getElementById("opportunities-feed")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="text-xs font-black text-brand-500 hover:text-brand-700 bg-white border border-slate-250 px-3.5 py-1.5 rounded-xl shadow-xs transition"
                            >
                              View Again
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 7: WATCHLIST */}
                  {activeActivityTab === "watchlist" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">My Saved Watchlist</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Listings you bookmarked or saved to track or apply to later.</p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 text-left">
                        {opportunities.filter(opp => watchlist.includes(opp.id)).map(opp => (
                          <div key={opp.id} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between hover:border-brand-200 transition">
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="text-[9px] font-black uppercase text-brand-600 bg-brand-50 border border-orange-100 px-2 py-0.5 rounded">{opp.type}</span>
                                <button
                                  onClick={() => setWatchlist(watchlist.filter(id => id !== opp.id))}
                                  className="text-slate-400 hover:text-red-500 transition text-sm"
                                  title="Remove from watchlist"
                                >
                                  ♥
                                </button>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm mt-3 line-clamp-1">{opp.title}</h4>
                              <p className="text-xs text-[#2164c5] font-semibold">{opp.company}</p>
                              <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-2 leading-relaxed">{opp.description}</p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-slate-150 flex justify-between items-center">
                              <span className="text-xs font-black text-slate-800">{opp.price}</span>
                              <button
                                onClick={() => {
                                  setCurrentView("opportunities");
                                  document.getElementById("opportunities-feed")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="bg-brand-500 hover:bg-brand-700 text-white text-xs font-black px-3.5 py-1.5 rounded-xl transition shadow-xs"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 8: BOOKMARKED QUESTIONS */}
                  {activeActivityTab === "bookmarks" && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 text-left">
                        <h3 className="text-xl font-black text-slate-800">Bookmarked Prep Questions</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Review standard interview topics, system design cases, and coding queries.</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            id: "q-1",
                            title: "How does React Fiber reconcile state updates in background priorities?",
                            category: "React / Frontend",
                            difficulty: "Hard",
                            savedAt: "1 day ago"
                          },
                          {
                            id: "q-2",
                            title: "Explain Event Loop, Microtasks queue, and Macrotasks queue in V8.",
                            category: "JavaScript Core",
                            difficulty: "Medium",
                            savedAt: "3 days ago"
                          },
                          {
                            id: "q-3",
                            title: "Design a high-throughput, low-latency push notifications gateway.",
                            category: "System Design",
                            difficulty: "Hard",
                            savedAt: "1 week ago"
                          }
                        ].map((q, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center text-left">
                            <div>
                              <div className="flex gap-2 items-center">
                                <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">{q.category}</span>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${q.difficulty === "Hard" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"
                                  }`}>{q.difficulty}</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm mt-2">{q.title}</h4>
                            </div>

                            <button
                              onClick={() => alert(`Launching practice environment for: "${q.title}"`)}
                              className="bg-white hover:bg-slate-50 border border-slate-250 text-slate-700 text-xs font-black px-4 py-2 rounded-xl transition shadow-xs whitespace-nowrap"
                            >
                              Practice Now →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === "mock-tests" && (
            <div className="space-y-8 animate-fade-in-up max-w-[95%] mx-auto text-left">
              {/* Coming Soon Notice Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase rounded-full border border-orange-500/30 animate-pulse">
                      Coming soon...
                    </span>
                  </div>
                  <h3 className="text-lg font-black mt-2">Mock Tests & Skills Assessments Module</h3>
                  <p className="text-slate-400 text-xs font-semibold mt-1">This feature is currently under active development. Below is a full skeleton preview of the upcoming student assessment dashboard.</p>
                </div>
                <div className="shrink-0 relative z-10 w-full md:w-auto">
                  <div className="h-10 w-44 bg-slate-850 animate-pulse rounded-xl border border-slate-800"></div>
                </div>
              </div>

              {/* Universal Skeleton Dashboard */}
              <div className="space-y-8">
                {/* Dashboard headers placeholders */}
                <div className="space-y-2.5 animate-pulse">
                  <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                </div>

                {/* Stats & Perks Grid Skeleton */}
                <div className="grid gap-6 sm:grid-cols-3 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                      <div className="space-y-1.5">
                        <div className="h-2.5 bg-slate-100 rounded w-full"></div>
                        <div className="h-2.5 bg-slate-100 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Test Catalog Teaser Skeleton */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-pulse">
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                  </div>

                  <div className="grid gap-6 mt-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="h-4.5 bg-slate-200 rounded w-12"></div>
                            <div className="h-3 bg-slate-100 rounded w-10"></div>
                          </div>
                          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-100 rounded w-1/3"></div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-4 bg-white border border-slate-200 rounded-md w-12"></div>
                            ))}
                          </div>
                        </div>

                        <div className="h-9 bg-slate-200 rounded-xl w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Area Skeletons */}
                <div className="grid gap-6 md:grid-cols-2 animate-pulse">
                  {/* Topic Request Form Skeleton */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-2/3"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-slate-100 border border-slate-200 rounded-xl w-full"></div>
                      <div className="h-10 bg-slate-250 rounded-xl w-full"></div>
                    </div>
                  </div>

                  {/* Beta Signup Form Skeleton */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-2/3"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-slate-100 border border-slate-200 rounded-xl w-full"></div>
                      <div className="h-10 bg-slate-250 rounded-xl w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "mock-interviews" && (
            <div className="space-y-8 animate-fade-in-up max-w-[95%] mx-auto text-left">
              {/* Coming Soon Notice Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase rounded-full border border-indigo-500/30 animate-pulse">
                      Coming soon...
                    </span>
                  </div>
                  <h3 className="text-lg font-black mt-2">AI Video & Coding Mock Interviews</h3>
                  <p className="text-slate-400 text-xs font-semibold mt-1">This feature is currently under active development. Below is a full skeleton preview of the upcoming video webcam review dashboard.</p>
                </div>
                <div className="shrink-0 relative z-10 w-full md:w-auto">
                  <div className="h-10 w-44 bg-slate-850 animate-pulse rounded-xl border border-slate-800"></div>
                </div>
              </div>

              {/* Universal Skeleton Interview Screen */}
              <div className="grid gap-8 md:grid-cols-12 animate-pulse">
                {/* Left Column: Live camera stream and transcripts placeholders */}
                <div className="md:col-span-7 space-y-6">
                  {/* Webcam video box placeholder */}
                  <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 h-64 flex flex-col justify-between items-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 h-3 bg-slate-850 rounded w-24"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-slate-850 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                    </div>
                    {/* User profile silhouette skeleton */}
                    <div className="w-20 h-20 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center mt-12"></div>
                    <div className="h-2 bg-slate-850 rounded w-28 mt-4"></div>
                    {/* Control buttons bar skeleton */}
                    <div className="flex gap-2.5 justify-center mb-1 mt-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-850 border border-slate-800"></div>
                      ))}
                    </div>
                  </div>

                  {/* Speech transcript skeleton */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
                    <div className="h-3.5 bg-slate-250 rounded w-1/4 mb-3"></div>
                    <div className="flex gap-2.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0"></div>
                      <div className="space-y-1.5 flex-grow">
                        <div className="h-2.5 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start justify-end">
                      <div className="space-y-1.5 flex-grow text-right max-w-lg">
                        <div className="h-2.5 bg-slate-200 rounded w-3/4 ml-auto"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/2 ml-auto"></div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0"></div>
                    </div>
                  </div>
                </div>

                {/* Right Column: AI real-time score indicators placeholders */}
                <div className="md:col-span-5 space-y-6">
                  {/* Score breakdown metrics card */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="h-3.5 bg-slate-250 rounded w-1/3 mb-2"></div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <div className="h-2 bg-slate-100 rounded w-1/4"></div>
                          <div className="h-2 bg-slate-200 rounded w-6"></div>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-slate-250 h-full rounded-full" style={{ width: i === 1 ? '60%' : i === 2 ? '75%' : '40%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Speech rate/clarity feedback box */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3.5">
                    <div className="h-3.5 bg-slate-250 rounded w-1/2"></div>
                    <div className="h-2.5 bg-slate-150 rounded w-full"></div>
                    <div className="h-2.5 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-9 bg-slate-50 border border-slate-150 rounded-xl mt-3"></div>
                  </div>

                  {/* Track prep selector skeleton */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="h-3 bg-slate-250 rounded w-1/3"></div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 bg-slate-100 border border-slate-150 rounded-md w-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "100days-code" && (
            <div className="space-y-8 animate-fade-in-up max-w-[95%] mx-auto text-left">
              {/* Coming Soon Notice Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/30 animate-pulse">
                      Coming soon...
                    </span>
                  </div>
                  <h3 className="text-lg font-black mt-2">100 Days to Code Habit Challenge</h3>
                  <p className="text-slate-400 text-xs font-semibold mt-1">This feature is currently under active development. Below is a full skeleton preview of the future coding terminal layout.</p>
                </div>
                <div className="shrink-0 relative z-10 w-full md:w-auto">
                  <div className="h-10 w-44 bg-slate-850 animate-pulse rounded-xl border border-slate-800"></div>
                </div>
              </div>

              {/* Universal Skeleton coding workspace */}
              <div className="grid gap-6 md:grid-cols-12 animate-pulse">
                {/* File tree sidebar skeleton (Col-span 3) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm md:col-span-3 space-y-3">
                  <div className="h-3.5 bg-slate-250 rounded w-1/2 mb-3"></div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-2 items-center pl-1">
                      <div className="w-3.5 h-3.5 bg-slate-100 rounded shrink-0"></div>
                      <div className="h-2.5 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>

                {/* Main IDE console editor skeleton (Col-span 6) */}
                <div className="md:col-span-6 space-y-4">
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 h-64 flex flex-col justify-between">
                    <div className="flex gap-2 pb-2 border-b border-slate-800 mb-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-5 bg-slate-800 rounded w-16"></div>
                      ))}
                    </div>
                    <div className="space-y-2.5 flex-grow font-mono pl-1">
                      <div className="h-2 bg-slate-800 rounded w-1/4"></div>
                      <div className="h-2 bg-slate-800 rounded w-1/3 pl-3"></div>
                      <div className="h-2 bg-slate-850 rounded w-1/2 pl-6"></div>
                      <div className="h-2 bg-slate-800 rounded w-1/3 pl-3"></div>
                      <div className="h-2 bg-slate-800 rounded w-1/6"></div>
                    </div>
                    <div className="border-t border-slate-800 pt-2 h-10 flex gap-2 items-center">
                      <div className="h-2.5 bg-slate-850 rounded w-1/3"></div>
                      <div className="h-2.5 bg-slate-850 rounded w-12 ml-auto"></div>
                    </div>
                  </div>

                  {/* Sandbox code editor area placeholder */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="h-3.5 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-16 bg-slate-50 border border-slate-150 rounded-xl"></div>
                    <div className="h-24 bg-slate-900 rounded-xl"></div>
                  </div>
                </div>

                {/* Contribution graph & leaderboard list skeleton (Col-span 3) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm md:col-span-3 space-y-5">
                  {/* 100 days squares skeleton */}
                  <div className="space-y-3">
                    <div className="h-3.5 bg-slate-250 rounded w-2/3"></div>
                    <div className="grid grid-cols-10 gap-1.5">
                      {Array.from({ length: 50 }).map((_, idx) => (
                        <div key={idx} className="w-3.5 h-3.5 bg-slate-100 rounded-[2px]" />
                      ))}
                    </div>
                  </div>

                  {/* Trophies ranking block skeleton */}
                  <div className="space-y-4 pt-3 border-t border-slate-150">
                    <div className="h-3 bg-slate-250 rounded w-1/2"></div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <div className="w-8 h-8 bg-slate-150 rounded-lg shrink-0"></div>
                        <div className="space-y-1.5 flex-grow">
                          <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-1.5 bg-slate-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 5: RECRUITER / HOST DASHBOARD
              ================================================ */}
          {currentView === "host" && (() => {
            // Determine host's company name
            const companyName = currentUser.profileDetails?.companyName || (() => {
              if (currentUser.phone && currentUser.phone.toLowerCase().includes("salesforce")) return "Salesforce";
              if (currentUser.email && currentUser.email.includes("@")) {
                const domain = currentUser.email.split("@")[1].split(".")[0];
                if (domain && !["gmail", "yahoo", "outlook", "hotmail"].includes(domain.toLowerCase())) {
                  return domain.charAt(0).toUpperCase() + domain.slice(1);
                }
              }
              return "Salesforce";
            })();

            // Filter opportunities for this company
            const hostOpps = opportunities.filter(o => o.company?.toLowerCase() === companyName.toLowerCase());

            // Filter applications for this company
            const hostApps = applications.filter(a => a.company?.toLowerCase() === companyName.toLowerCase());

            // Compute metrics
            const activePostings = hostOpps.filter(o => o.status === "approved").length;
            const pendingPostings = hostOpps.filter(o => o.status === "pending").length;
            const totalApps = hostApps.length;
            const conversionCount = hostApps.filter(a => ["Shortlisted", "Selected"].includes(a.status)).length;
            const conversionRate = totalApps > 0 ? Math.round((conversionCount / totalApps) * 100) : 0;

            // Pipeline counts
            const pipelineCounts = {
              Applied: hostApps.filter(a => a.status === "Applied").length,
              Shortlisted: hostApps.filter(a => a.status === "Shortlisted").length,
              Selected: hostApps.filter(a => a.status === "Selected").length,
              Rejected: hostApps.filter(a => a.status === "Rejected").length,
            };

            // Filtered applications
            const filteredApps = hostApps.filter(app => {
              const matchesSearch = app.candidateName.toLowerCase().includes(hostSearchQuery.toLowerCase()) ||
                app.email.toLowerCase().includes(hostSearchQuery.toLowerCase());
              const matchesStatus = hostStatusFilter === "ALL" || app.status === hostStatusFilter;
              const matchesRole = hostRoleFilter === "ALL" || app.opportunityTitle === hostRoleFilter;
              return matchesSearch && matchesStatus && matchesRole;
            });

            if (selectedOppForApplicants) {
              const opp = selectedOppForApplicants;
              const oppApps = hostApps.filter(a => a.opportunityId === opp.id);
              
              return (
                <div className="space-y-6 text-left animate-fade-in-up">
                  {/* Back Button */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <button
                      onClick={() => setSelectedOppForApplicants(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4 text-slate-500" /> Back to Dashboard
                    </button>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Active Posting
                    </span>
                  </div>

                  {/* Header / Banner */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-md border border-slate-750 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center overflow-hidden">
                        {currentUser.profileDetails?.companyLogo ? (
                          <img src={currentUser.profileDetails.companyLogo} alt={companyName} className="h-full w-full object-cover" />
                        ) : (
                          <Briefcase className="h-8 w-8 text-brand-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight leading-tight">
                          {opp.title}
                        </h2>
                        <p className="text-slate-300 text-xs mt-1 font-semibold">
                          {opp.company} • {opp.mode} ({opp.location}) • {opp.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 relative z-10 text-xs font-bold text-slate-300 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Total Applicants</span>
                        <span className="text-white text-base font-black">{oppApps.length}</span>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Selected</span>
                        <span className="text-emerald-400 text-base font-black">{oppApps.filter(a => a.status === 'Selected').length}</span>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider">On Hold</span>
                        <span className="text-amber-400 text-base font-black">{oppApps.filter(a => a.status === 'Hold').length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Applicants List Grid/Table */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      Candidates Applied ({oppApps.length})
                    </h3>

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                      <table className="min-w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Candidate Name / Email</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Cover Note Preview</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Current Status</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase text-center">Pipeline Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {oppApps.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="p-16 text-center text-slate-400 font-bold">
                                No candidates have applied for this opportunity yet.
                              </td>
                            </tr>
                          ) : (
                            oppApps.map(app => (
                              <tr 
                                key={app.id} 
                                className="border-b border-slate-100 hover:bg-slate-50/50 transition cursor-pointer"
                                onClick={() => {
                                  // Open profile details popup
                                  const registered = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
                                  const userProf = registered.find(u => u.email.toLowerCase() === app.email.toLowerCase() && u.role === "participant");
                                  if (userProf) {
                                    setCandidateProfileToView(userProf);
                                  } else {
                                    setCandidateProfileToView({
                                      firstName: app.candidateName.split(' ')[0],
                                      lastName: app.candidateName.split(' ').slice(1).join(' '),
                                      email: app.email,
                                      role: "participant",
                                      category: "break",
                                      isVerified: true,
                                      profileDetails: {
                                        aboutMe: app.coverNote || "I am highly motivated to restart my career.",
                                        resumeName: app.resume || "resume.pdf",
                                        education: { qualification: "B.Tech", course: "Computer Science", college: "Engineering College" }
                                      }
                                    });
                                  }
                                }}
                                title="Click to view candidate's full profile details"
                              >
                                <td className="p-4">
                                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                    <div className="h-8 w-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                                      {app.candidateName ? app.candidateName.charAt(0) : "C"}
                                    </div>
                                    <div>
                                      <span>{app.candidateName}</span>
                                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{app.email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-xs font-semibold text-slate-500 max-w-xs truncate">
                                  {app.coverNote || "No cover letter provided."}
                                </td>
                                <td className="p-4">
                                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                                    app.status === 'Applied' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    app.status === 'Shortlisted' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                    app.status === 'Selected' ? 'bg-green-50 text-green-600 border-green-100' :
                                    app.status === 'Hold' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    'bg-red-50 text-red-600 border-red-100'
                                  }`}>
                                    {app.status}
                                  </span>
                                </td>
                                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Shortlisted")}
                                      className="text-xs font-black text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200/50 transition cursor-pointer"
                                    >
                                      Shortlist
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Selected")}
                                      className="text-xs font-black text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl border border-green-200/50 transition cursor-pointer"
                                    >
                                      Select
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Hold")}
                                      className="text-xs font-black text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/50 transition cursor-pointer"
                                    >
                                      Hold
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Rejected")}
                                      className="text-xs font-black text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200/50 transition cursor-pointer"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            }

            // Get unique roles for filter dropdown
            const uniqueRoles = [...new Set(hostOpps.map(o => o.title))];

            const renderListingTab = (tabId, categoryText) => {
              // Filter by type
              let filteredOpps = [];
              if (tabId === "jobs") {
                filteredOpps = hostOpps.filter(o => o.type === "JOB");
              } else if (tabId === "internships") {
                filteredOpps = hostOpps.filter(o => o.type === "INTERNSHIP");
              } else if (tabId === "competitions") {
                filteredOpps = hostOpps.filter(o => o.type === "COMPETITION");
              } else if (tabId === "mentorship") {
                filteredOpps = hostOpps.filter(o => o.type === "MENTORSHIP");
              } else if (tabId === "mock_prep") {
                filteredOpps = hostOpps.filter(o => o.type === "MOCK_TEST" || o.type === "MOCK_INTERVIEW" || o.title.toLowerCase().includes("mock"));
              } else if (tabId === "webinars") {
                filteredOpps = hostOpps.filter(o => o.type === "WEBINAR" || o.type === "WORKSHOP" || o.type === "TRAINING");
              }

              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      Manage {categoryText}
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200">
                        {filteredOpps.length} Total
                      </span>
                    </h3>

                    {/* Prominent "+ Add New" button inside all individual listing pages */}
                    <button
                      onClick={() => {
                        let formType = "JOB";
                        if (tabId === "jobs") formType = "JOB";
                        else if (tabId === "internships") formType = "INTERNSHIP";
                        else if (tabId === "competitions") formType = "COMPETITION";
                        else if (tabId === "mentorship") formType = "MENTORSHIP";
                        else if (tabId === "webinars") formType = "WEBINAR";
                        else if (tabId === "mock_prep") formType = "TRAINING";

                        setHostForm(prev => ({ ...prev, type: formType }));
                        setIsHostModalOpen(true);
                      }}
                      className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Add New
                    </button>
                  </div>

                  {filteredOpps.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-xs">
                      <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
                        <Briefcase className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">No hosted {categoryText.toLowerCase()} yet</h3>
                      <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                        Get started by posting your first {categoryText.toLowerCase()} listing for applicants.
                      </p>
                      <button
                        onClick={() => {
                          let formType = "JOB";
                          if (tabId === "jobs") formType = "JOB";
                          else if (tabId === "internships") formType = "INTERNSHIP";
                          else if (tabId === "competitions") formType = "COMPETITION";
                          else if (tabId === "mentorship") formType = "MENTORSHIP";
                          else if (tabId === "webinars") formType = "WEBINAR";
                          else if (tabId === "mock_prep") formType = "TRAINING";

                          setHostForm(prev => ({ ...prev, type: formType }));
                          setIsHostModalOpen(true);
                        }}
                        className="mt-6 bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-sm"
                      >
                        + Post {categoryText}
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredOpps.map(opp => {
                        const daysLeft = opp.deadline ? Math.round((new Date(opp.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
                        const isExpired = daysLeft !== null && daysLeft < 0;

                        const themeClasses = {
                          "tech-blue": "from-blue-600 via-blue-700 to-indigo-900",
                          "sunset-rose": "from-rose-500 via-pink-600 to-orange-500",
                          "emerald-green": "from-emerald-500 via-teal-600 to-teal-800",
                          "luxury-purple": "from-purple-700 via-violet-800 to-indigo-950"
                        };
                        const selectedTheme = themeClasses[opp.posterTemplate || "tech-blue"] || themeClasses["tech-blue"];
                        const posterBg = opp.posterUrl ? "" : `bg-gradient-to-br ${selectedTheme}`;

                        return (
                          <div key={opp.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                            <div 
                              onClick={() => setSelectedOppForApplicants(opp)}
                              className={`h-32 relative overflow-hidden flex items-center justify-center p-4 cursor-pointer ${posterBg}`} 
                              style={opp.posterUrl ? { backgroundImage: `url(${opp.posterUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                              title="Click to view applicants"
                            >
                              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition"></div>
                              <div className="relative z-10 text-center">
                                <span className="bg-white/95 text-slate-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                                  {opp.type}
                                </span>
                                <h4 className="text-white font-black text-sm mt-2 drop-shadow-md line-clamp-2 px-2 leading-tight">
                                  {opp.title}
                                </h4>
                              </div>

                              <div className="absolute top-3 right-3">
                                <span className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full border shadow-xs ${opp.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                  {opp.status === 'approved' ? 'Live ✓' : 'Awaiting Review'}
                                </span>
                              </div>
                            </div>

                            <div 
                              onClick={() => setSelectedOppForApplicants(opp)}
                              className="p-5 flex-grow space-y-4 cursor-pointer hover:bg-slate-50 transition-colors"
                              title="Click to view applicants"
                            >
                              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-500">
                                <div>
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Target Stage</span>
                                  <span className="text-slate-700 capitalize">
                                    {opp.category === 'fresh' ? 'Freshers' : opp.category === 'break' ? 'Returnship' : 'Career Switch'}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Mode</span>
                                  <span className="text-slate-700">{opp.mode} ({opp.location})</span>
                                </div>
                                <div className="mt-1">
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Compensation</span>
                                  <span className="text-brand-600 font-bold truncate block">{opp.price}</span>
                                </div>
                                <div className="mt-1">
                                  <span className="block text-[8px] font-bold text-slate-400 uppercase">Deadline</span>
                                  <span className={`font-bold ${isExpired ? 'text-rose-500' : 'text-slate-700'}`}>
                                    {isExpired ? 'Expired' : `${daysLeft} days left`}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span 
                                  className="text-slate-400 font-bold hover:text-brand-500 hover:underline cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedOppForApplicants(opp);
                                  }}
                                >
                                  {hostApps.filter(a => a.opportunityId === opp.id).length} Applicant(s)
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const nextFeatured = !opp.featured;
                                    setOpportunities(prev => prev.map(o => o.id === opp.id ? { ...o, featured: nextFeatured } : o));
                                    syncOpportunityFeaturedToBackend(opp.id, nextFeatured, opp.posterTemplate || "tech-blue", opp.posterUrl || "");
                                  }}
                                  className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-lg border transition ${opp.featured
                                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                    }`}
                                >
                                  {opp.featured ? "★ Featured" : "☆ Feature"}
                                </button>
                              </div>
                            </div>

                            <div className="px-5 py-4 bg-slate-50 border-t border-slate-150 flex gap-2 rounded-b-3xl">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingOpp(opp);
                                  setEditOppForm({
                                    title: opp.title || "",
                                    company: opp.company || "",
                                    type: opp.type || "JOB",
                                    category: opp.category || "fresh",
                                    mode: opp.mode || "Online",
                                    location: opp.location || "",
                                    deadline: opp.deadline || "",
                                    seats: opp.seats || 10,
                                    isPaid: opp.isPaid ? "Paid" : "Free",
                                    price: opp.price || "",
                                    eligibility: opp.eligibility || "",
                                    description: opp.description || "",
                                    featured: opp.featured || false,
                                    posterTemplate: opp.posterTemplate || "tech-blue",
                                    posterUrl: opp.posterUrl || ""
                                  });
                                  setIsEditOppModalOpen(true);
                                }}
                                className="flex-1 py-2 text-center text-xs font-black uppercase text-slate-700 bg-white hover:bg-slate-100 border border-slate-250 rounded-xl transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Are you sure you want to delete "${opp.title}"?`)) {
                                    setOpportunities(prev => prev.filter(o => o.id !== opp.id));
                                    deleteOpportunityFromBackend(opp.id);
                                  }
                                }}
                                className="px-3 py-2 text-center text-xs font-black text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition cursor-pointer"
                                title="Delete Listing"
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHostRoleFilter(opp.title);
                                  setHostActiveTab("applications");
                                }}
                                className="px-4 py-2 text-center text-xs font-black uppercase text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
                              >
                                Pipeline
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            };

            const renderClubsTab = () => {
              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      Manage Clubs & Communities
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200">
                        {clubs.length} Clubs
                      </span>
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {clubs.map(club => (
                      <div key={club.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl p-2.5 bg-slate-50 rounded-2xl border border-slate-100">{club.icon}</span>
                            <div>
                              <h4 className="font-black text-slate-800 text-base">{club.name}</h4>
                              <p className="text-slate-400 text-[10px] font-semibold uppercase mt-0.5">{club.count} Members</p>
                            </div>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            Official community club for members to network, share opportunities, and participate in discussion threads.
                          </p>
                        </div>
                        <div className="pt-5 border-t border-slate-100 flex gap-2 mt-5">
                          <button
                            onClick={() => {
                              setSelectedClubId(club.id);
                              setCurrentView("community");
                            }}
                            className="flex-1 py-2 text-center text-xs font-black uppercase text-slate-700 bg-white hover:bg-slate-100 border border-slate-250 rounded-xl transition cursor-pointer"
                          >
                            Enter Chat Room
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-xs min-h-[180px]">
                      <span className="text-2xl mb-2">💬</span>
                      <h4 className="font-bold text-slate-700 text-sm">Need a Custom Club?</h4>
                      <p className="text-slate-400 text-[11px] mt-1 max-w-[200px]">Create a dedicated forum channel for your company's hiring circle.</p>
                      <button
                        onClick={() => {
                          const clubName = window.prompt("Enter new Club Name:");
                          if (clubName && clubName.trim()) {
                            const newId = `club-${clubName.toLowerCase().replace(/\s+/g, "-")}`;
                            const newClub = { id: newId, name: clubName.trim(), icon: "🏢", count: 1, joined: true };
                            setClubs(prev => [...prev, newClub]);
                          }
                        }}
                        className="mt-4 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl transition animate-pulse-glow"
                      >
                        + Create Club
                      </button>
                    </div>
                  </div>
                </div>
              );
            };

            return (
              <div className="space-y-8 animate-fade-in-up text-left">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-md border border-slate-750 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Glowing blobs in background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center overflow-hidden">
                      {currentUser.profileDetails?.companyLogo ? (
                        <img src={currentUser.profileDetails.companyLogo} alt={companyName} className="h-full w-full object-cover" />
                      ) : (
                        <Briefcase className="h-8 w-8 text-brand-400" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        {companyName} Workspace
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/30">
                          Recruiter Panel
                        </span>
                      </h2>
                      <p className="text-slate-400 text-xs mt-1 font-semibold">
                        Logged in as <strong className="text-slate-200">{currentUser.firstName} {currentUser.lastName}</strong> ({currentUser.profileDetails?.recruiterTitle || "Recruiter"})
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative z-10 w-full md:w-auto">
                    <button
                      onClick={() => setIsHostModalOpen(true)}
                      className="flex-1 md:flex-none bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Create Opportunity
                    </button>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="border-b border-slate-200 flex gap-1 pb-px overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: "📊" },
                    { id: "jobs", label: "Jobs", icon: "💼" },
                    { id: "internships", label: "Internships", icon: "🎓" },
                    { id: "competitions", label: "Competitions", icon: "🏆" },
                    { id: "mentorship", label: "Mentorship", icon: "👩‍🏫" },
                    { id: "mock_prep", label: "Mock Prep", icon: "📝" },
                    { id: "webinars", label: "Webinars", icon: "🎙️" },
                    { id: "clubs", label: "Clubs", icon: "💬" },
                    { id: "applications", label: "Pipeline", icon: "👥" },
                    { id: "company", label: "Company Profile", icon: "🏢" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setHostActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition whitespace-nowrap ${hostActiveTab === tab.id
                        ? "border-brand-500 text-brand-600"
                        : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* 1. OVERVIEW TAB */}
                {hostActiveTab === "overview" && (
                  <div className="space-y-8 animate-fade-in-up">
                    {/* Metrics Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {/* Metric 1 */}
                      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Active Postings</p>
                          <h4 className="text-2xl font-black text-slate-800 mt-1">{activePostings}</h4>
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                          <Activity className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pending Review</p>
                          <h4 className="text-2xl font-black text-slate-800 mt-1">{pendingPostings}</h4>
                        </div>
                      </div>

                      {/* Metric 3 */}
                      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Received Apps</p>
                          <h4 className="text-2xl font-black text-slate-800 mt-1">{totalApps}</h4>
                        </div>
                      </div>

                      {/* Metric 4 */}
                      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Conversion Rate</p>
                          <h4 className="text-2xl font-black text-slate-800 mt-1">{conversionRate}%</h4>
                        </div>
                      </div>
                    </div>

                    {/* Pipelines & Profile Reminder */}
                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Pipeline Status Breakdown */}
                      {/* Overall Recruiter Analytics & Stats */}
                      <div className="md:col-span-2 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <div>
                            <h3 className="font-black text-slate-800 text-lg">Overall Workspace Insights</h3>
                            <p className="text-xs text-slate-400 mt-1">Calculated stats and analytical feedback based on your opportunities.</p>
                          </div>
                          <span className="bg-brand-50 text-brand-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-orange-100">
                            Realtime Report
                          </span>
                        </div>

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                          {/* Jobs & Postings Stats */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-3">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              💼 Posted Jobs & Roles
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Total Opportunities</span>
                                <span className="text-slate-800 font-bold">{hostOpps.length}</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Jobs Posted</span>
                                <span className="text-slate-800 font-bold">{hostOpps.filter(o => o.type?.toLowerCase() === 'job').length}</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Internships</span>
                                <span className="text-slate-800 font-bold">{hostOpps.filter(o => o.type?.toLowerCase() === 'internship').length}</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Other Roles</span>
                                <span className="text-slate-800 font-bold">{hostOpps.filter(o => !['job', 'internship'].includes(o.type?.toLowerCase())).length}</span>
                              </div>
                            </div>
                          </div>

                          {/* Overall Feedback */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-3">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              ⭐ Overall Feedback
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Candidate Rating</span>
                                <span className="text-brand-500 font-black">4.9 / 5.0</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Response Rate</span>
                                <span className="text-emerald-600 font-bold">96%</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Response Speed</span>
                                <span className="text-slate-700 font-bold">~2 Days</span>
                              </div>
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-500">Recruiter Score</span>
                                <span className="text-brand-500 font-bold">Outstanding</span>
                              </div>
                            </div>
                          </div>

                          {/* Calculated Report */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 space-y-3">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                              📊 Applicant Report
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Applying Categories</div>
                              <div className="space-y-1.5">
                                {[
                                  { label: "Freshers", count: hostApps.filter(a => { const registered = JSON.parse(localStorage.getItem('she_registered_users') || '[]'); const u = registered.find(usr => usr.email.toLowerCase() === a.email.toLowerCase()); return u && u.category === 'fresh'; }).length },
                                  { label: "Returnees", count: hostApps.filter(a => { const registered = JSON.parse(localStorage.getItem('she_registered_users') || '[]'); const u = registered.find(usr => usr.email.toLowerCase() === a.email.toLowerCase()); return !u || u.category === 'break'; }).length },
                                  { label: "Switchers", count: hostApps.filter(a => { const registered = JSON.parse(localStorage.getItem('she_registered_users') || '[]'); const u = registered.find(usr => usr.email.toLowerCase() === a.email.toLowerCase()); return u && u.category === 'switch'; }).length }
                                ].map(cat => {
                                  const pct = hostApps.length > 0 ? Math.round((cat.count / hostApps.length) * 100) : 0;
                                  return (
                                    <div key={cat.label} className="flex justify-between text-[11px] font-semibold text-slate-600">
                                      <span>{cat.label}</span>
                                      <span className="text-slate-800 font-bold">{pct}% ({cat.count})</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Opportunity Performance Report */}
                        <div className="p-4 bg-brand-50/30 border border-brand-100 rounded-2xl space-y-2 text-xs">
                          <h4 className="font-bold text-brand-800 flex items-center gap-1">
                            📢 Top Performing Opportunity Report
                          </h4>
                          {hostOpps.length > 0 ? (() => {
                            const sortedOpps = [...hostOpps].sort((a,b) => hostApps.filter(ap => ap.opportunityId === b.id).length - hostApps.filter(ap => ap.opportunityId === a.id).length);
                            const topOpp = sortedOpps[0];
                            const topApps = hostApps.filter(ap => ap.opportunityId === topOpp.id);
                            return (
                              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-1 font-semibold">
                                <div className="text-slate-700">
                                  Opportunity title: <strong className="text-slate-900">{topOpp.title}</strong>
                                </div>
                                <div className="text-slate-600 text-[11px]">
                                  Received <strong className="text-brand-600">{topApps.length}</strong> applications • <span className="text-emerald-600">{Math.round((topApps.filter(a => ['Shortlisted', 'Selected'].includes(a.status)).length / (topApps.length || 1)) * 100)}% review action rate</span>
                                </div>
                              </div>
                            );
                          })() : (
                            <p className="text-slate-400 font-semibold italic">No opportunities posted yet to calculate report performance.</p>
                          )}
                        </div>
                      </div>

                      {/* Info Card / Quick Actions */}
                      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-5 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="font-black text-slate-800 text-lg">Organization Profile Status</h3>

                          {currentUser.profileDetails?.companyName ? (
                            <div className="space-y-3">
                              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                                <div className="p-2 bg-emerald-500 rounded-xl text-white">
                                  <CheckCircle className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-emerald-800">Profile Complete</h4>
                                  <p className="text-[10px] text-emerald-600 mt-0.5">Details are public on job postings.</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                Having a completed company page improves candidate application rates by up to 40%. Keep it fresh!
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-center gap-3">
                                <div className="p-2 bg-amber-500 rounded-xl text-white">
                                  <ShieldAlert className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-amber-800">Set Up Company Profile</h4>
                                  <p className="text-[10px] text-amber-600 mt-0.5">Candidates see fallback details.</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                Complete your company website, description, and logo to attract qualified candidates.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setHostActiveTab("company")}
                            className="flex-1 bg-slate-150 hover:bg-slate-200 text-slate-800 rounded-2xl py-3 text-xs font-black uppercase tracking-wider transition-all"
                          >
                            Edit Profile
                          </button>
                          <button
                            onClick={() => {
                              setHostForm(prev => ({ ...prev, type: "JOB" }));
                              setIsHostModalOpen(true);
                            }}
                            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl py-3 text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add New
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SEGMENTED RECRUITER TABS */}
                {hostActiveTab === "jobs" && renderListingTab("jobs", "Jobs")}
                {hostActiveTab === "internships" && renderListingTab("internships", "Internships")}
                {hostActiveTab === "competitions" && renderListingTab("competitions", "Competitions")}
                {hostActiveTab === "mentorship" && renderListingTab("mentorship", "Mentorship")}
                {hostActiveTab === "mock_prep" && renderListingTab("mock_prep", "Mock Test & Interview Prep")}
                {hostActiveTab === "webinars" && renderListingTab("webinars", "Webinars")}
                {hostActiveTab === "clubs" && renderClubsTab()}

                {/* 3. HIRING PIPELINE TAB */}
                {hostActiveTab === "applications" && (
                  <div className="space-y-6">
                    {/* Search & Filter Bar */}
                    <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                      {/* Search */}
                      <div className="relative w-full md:w-72">
                        <input
                          type="text"
                          placeholder="Search candidate name or email..."
                          value={hostSearchQuery}
                          onChange={(e) => setHostSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                        <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-400" />
                      </div>

                      {/* Filters */}
                      <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <select
                          value={hostRoleFilter}
                          onChange={(e) => setHostRoleFilter(e.target.value)}
                          className="flex-grow md:flex-grow-0 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-500"
                          title="Filter by Role"
                        >
                          <option value="ALL">All Roles</option>
                          {uniqueRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>

                        <select
                          value={hostStatusFilter}
                          onChange={(e) => setHostStatusFilter(e.target.value)}
                          className="flex-grow md:flex-grow-0 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-500"
                          title="Filter by Status"
                        >
                          <option value="ALL">All Statuses</option>
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Selected">Selected</option>
                          <option value="Hold">Hold</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        <button
                          onClick={() => {
                            setHostForm(prev => ({ ...prev, type: "JOB" }));
                            setIsHostModalOpen(true);
                          }}
                          className="bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <Plus className="h-4 w-4" /> Add New
                        </button>

                        {(hostSearchQuery !== "" || hostStatusFilter !== "ALL" || hostRoleFilter !== "ALL") && (
                          <button
                            onClick={() => {
                              setHostSearchQuery("");
                              setHostStatusFilter("ALL");
                              setHostRoleFilter("ALL");
                            }}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2.5 py-2"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Applications List */}
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                      <table className="min-w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Candidate</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Applied Role</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Stage Status</th>
                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Review actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredApps.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="p-12 text-center text-slate-400 font-bold">
                                No applications match the selected search or filter options.
                              </td>
                            </tr>
                          ) : (
                            filteredApps.map(app => (
                              <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                                <td className="p-4">
                                  <div className="font-bold text-slate-800">{app.candidateName}</div>
                                  <div className="text-xs text-slate-400">{app.email}</div>
                                  <button
                                    onClick={() => {
                                      // Search if the user profile is stored locally in registered users list
                                      const registered = JSON.parse(localStorage.getItem('she_registered_users') || '[]');
                                      const userProf = registered.find(u => u.email.toLowerCase() === app.email.toLowerCase() && u.role === "participant");
                                      if (userProf) {
                                        setCandidateProfileToView(userProf);
                                      } else {
                                        // Fallback profile
                                        setCandidateProfileToView({
                                          firstName: app.candidateName.split(' ')[0],
                                          lastName: app.candidateName.split(' ').slice(1).join(' '),
                                          email: app.email,
                                          role: "participant",
                                          category: "break",
                                          isVerified: true,
                                          profileDetails: {
                                            aboutMe: app.coverNote || "I am highly motivated to restart my career.",
                                            resumeName: app.resume || "resume.pdf",
                                            education: { qualification: "B.Tech", course: "Computer Science", college: "Engineering College" }
                                          }
                                        });
                                      }
                                    }}
                                    className="mt-1.5 text-[10px] text-brand-500 hover:text-brand-700 underline font-black uppercase tracking-wider block"
                                  >
                                    Inspect Full Profile Details
                                  </button>
                                </td>
                                <td className="p-4 font-semibold text-slate-700 text-sm">
                                  {app.opportunityTitle}
                                  <div className="text-[10px] text-slate-400 font-bold mt-0.5">Applied on {app.appliedAt || "2026-05-24"}</div>
                                </td>
                                <td className="p-4">
                                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${app.status === 'Applied' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    app.status === 'Shortlisted' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                      app.status === 'Selected' ? 'bg-green-50 text-green-600 border-green-100' :
                                      app.status === 'Hold' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                        'bg-red-50 text-red-600 border-red-100'
                                    }`}>
                                    {app.status}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Shortlisted")}
                                      className="text-xs font-black text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200/50 transition cursor-pointer"
                                    >
                                      Shortlist
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Selected")}
                                      className="text-xs font-black text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl border border-green-200/50 transition cursor-pointer"
                                    >
                                      Select
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Hold")}
                                      className="text-xs font-black text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/50 transition cursor-pointer"
                                    >
                                      Hold
                                    </button>
                                    <button
                                      onClick={() => updateApplicantStatus(app.id, "Rejected")}
                                      className="text-xs font-black text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200/50 transition cursor-pointer"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. COMPANY PROFILE TAB */}
                {hostActiveTab === "company" && (
                  <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm max-w-3xl">
                    <form onSubmit={handleProfileSave} className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-black text-slate-800">Organization Profile Setup</h3>
                        <button
                          type="button"
                          onClick={() => {
                            setHostForm(prev => ({ ...prev, type: "JOB" }));
                            setIsHostModalOpen(true);
                          }}
                          className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 flex items-center justify-center gap-1"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add New
                        </button>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Company Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            value={currentUser.profileDetails?.companyName || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.companyName = e.target.value;
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="e.g. Salesforce"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Company Website</label>
                          <input
                            type="url"
                            value={currentUser.profileDetails?.companyWebsite || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.companyWebsite = e.target.value;
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="https://salesforce.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Industry / Domain</label>
                          <input
                            type="text"
                            value={currentUser.profileDetails?.companyIndustry || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.companyIndustry = e.target.value;
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="e.g. Cloud Software / SaaS"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Company Logo URL</label>
                          <input
                            type="url"
                            value={currentUser.profileDetails?.companyLogo || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.companyLogo = e.target.value;
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="https://logo.url/logo.png"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Recruiter Name (First & Last) <span className="text-red-500">*</span></label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              required
                              value={currentUser.firstName || ""}
                              onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
                              className="w-1/2 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="First Name"
                            />
                            <input
                              type="text"
                              required
                              value={currentUser.lastName || ""}
                              onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
                              className="w-1/2 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Recruiter Title / Designation <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            value={currentUser.profileDetails?.recruiterTitle || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.recruiterTitle = e.target.value;
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="e.g. Senior Recruiter"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-400 uppercase">Company Description / Recruiter Bio</label>
                        <textarea
                          value={currentUser.profileDetails?.companyDescription || ""}
                          onChange={(e) => {
                            const details = { ...currentUser.profileDetails };
                            details.companyDescription = e.target.value;
                            setCurrentUser({ ...currentUser, profileDetails: details });
                          }}
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 h-28"
                          placeholder="Tell potential candidates about your company's mission and hiring philosophy..."
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">LinkedIn Profile URL</label>
                          <input
                            type="url"
                            value={currentUser.profileDetails?.socialLinks?.linkedin || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.socialLinks = { ...details.socialLinks, linkedin: e.target.value };
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 uppercase">Twitter/X Profile URL</label>
                          <input
                            type="url"
                            value={currentUser.profileDetails?.socialLinks?.twitter || ""}
                            onChange={(e) => {
                              const details = { ...currentUser.profileDetails };
                              details.socialLinks = { ...details.socialLinks, twitter: e.target.value };
                              setCurrentUser({ ...currentUser, profileDetails: details });
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="https://x.com/username"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95"
                      >
                        Save Organization Details
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ================================================
              VIEW 6: SYSTEM ADMIN PANEL
              ================================================ */}
          {currentView === "admin" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-slate-800 pl-3">System Admin Dashboard</h2>
                <p className="text-slate-500 mt-2">Approve new hosts, verify opportunities, and manage registrations.</p>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Pending Opportunity Approvals</h3>
                </div>
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Opportunity</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Host Entity</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Stage</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.filter(o => o.status === "pending").length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-slate-400 font-bold">
                          All submitted listings are verified and active.
                        </td>
                      </tr>
                    ) : (
                      opportunities.filter(o => o.status === "pending").map(opp => {
                        const isExpanded = adminExpandedOppId === opp.id;
                        const details = parseOppDetails(opp);

                        return (
                          <React.Fragment key={opp.id}>
                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="p-4 font-bold text-slate-800">
                                <div className="flex flex-col">
                                  <span>{opp.title}</span>
                                  <span className="text-[10px] bg-slate-100 text-slate-600 self-start px-2 py-0.5 rounded mt-1 uppercase font-bold">{opp.type}</span>
                                </div>
                              </td>
                              <td className="p-4 font-semibold text-[#2164c5]">{opp.company}</td>
                              <td className="p-4 text-slate-500 text-sm font-semibold capitalize">{opp.category}</td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setAdminExpandedOppId(isExpanded ? null : opp.id)}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition border border-slate-200">
                                    {isExpanded ? "Hide Details" : "Review Details"}
                                  </button>
                                  <button
                                    onClick={() => approveListing(opp.id)}
                                    className="bg-[#2164c5] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm">
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => rejectListing(opp.id)}
                                    className="text-red-600 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-lg transition border border-red-200">
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="bg-slate-50/50">
                                <td colSpan="4" className="p-6 border-b border-slate-200">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                                    
                                    {/* Left: Organization & Verification Proof details */}
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-black text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-1 mb-2">Host & Poster Review</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <span className="font-bold text-slate-400 uppercase text-[9px] block">Relationship to Org</span>
                                            <span className="font-semibold text-slate-700 capitalize">{opp.posterRelationship || "HR Representative"}</span>
                                          </div>
                                          <div>
                                            <span className="font-bold text-slate-400 uppercase text-[9px] block">Target Stages</span>
                                            <span className="font-semibold text-slate-700">{opp.lifeStageTags || opp.category}</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Verification Proof Document / Link</span>
                                        <span className="font-semibold text-[#2164c5] break-all">{opp.hostVerificationProof || "N/A"}</span>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2">
                                        <div>
                                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Contact Person</span>
                                          <span className="font-semibold text-slate-700">{opp.contactPerson || "N/A"}</span>
                                        </div>
                                        <div>
                                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Contact Email</span>
                                          <span className="font-semibold text-slate-700">{opp.contactEmail || "N/A"}</span>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Contact Phone</span>
                                          <span className="font-semibold text-slate-700">{opp.contactPhone || "N/A"}</span>
                                        </div>
                                      </div>

                                      <div className="border-t border-slate-100 pt-2">
                                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Short Description</span>
                                        <p className="font-medium text-slate-600 mt-1">{opp.shortDescription || "N/A"}</p>
                                      </div>

                                      <div className="border-t border-slate-100 pt-2">
                                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Full Description</span>
                                        <p className="font-medium text-slate-600 mt-1 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto pr-1">{opp.description || "N/A"}</p>
                                      </div>
                                    </div>

                                    {/* Right: Dynamic Category Specific Specifications */}
                                    <div className="space-y-4 border-l border-slate-100 pl-6">
                                      <h4 className="font-black text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-1 mb-2">Category Specifications ({opp.type})</h4>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        {opp.type === "JOB" && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Employment Type</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.employmentType || "Full-time"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Experience Level</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.experienceLevel || "Fresher"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Salary / Range</span>
                                              <span className="font-semibold text-slate-700">{details.salaryRange || "Not Disclosed"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Career-Break Friendly?</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.careerBreakFriendly || "Yes"}</span>
                                            </div>
                                            <div className="col-span-2">
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Required Skills</span>
                                              <span className="font-semibold text-slate-700">{details.requiredSkills?.join(", ") || "None"}</span>
                                            </div>
                                          </>
                                        )}

                                        {opp.type === "INTERNSHIP" && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Duration</span>
                                              <span className="font-semibold text-slate-700">{details.duration || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Stipend</span>
                                              <span className="font-semibold text-slate-700">{details.stipend || "Unpaid"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Hours mode</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.hoursPerWeek || "Full-time"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Eligibility</span>
                                              <span className="font-semibold text-slate-700">{details.eligibility || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Conversion PPO?</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.conversionOffer || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Certificate?</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.certificate || "Yes"}</span>
                                            </div>
                                          </>
                                        )}

                                        {opp.type === "COMPETITION" && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Format</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.format || "Solo"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Max Team Size</span>
                                              <span className="font-semibold text-slate-700">{details.maxTeamSize || 4}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Theme / Domain</span>
                                              <span className="font-semibold text-slate-700">{details.theme || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Prize Details</span>
                                              <span className="font-semibold text-slate-700">{details.prizeDetails || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Registration Fee</span>
                                              <span className="font-semibold text-slate-700">{details.registrationFee || "Free"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Eligibility</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.eligibility || "Open to all"}</span>
                                            </div>
                                          </>
                                        )}

                                        {opp.type === "MENTORSHIP" && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Expertise</span>
                                              <span className="font-semibold text-slate-700">{details.mentorExpertise || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">LinkedIn URL</span>
                                              <span className="font-semibold text-slate-700 break-all">{details.mentorLinkedIn || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Mentorship Format</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.format || "1:1"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Duration / Freq</span>
                                              <span className="font-semibold text-slate-700">{details.duration || "N/A"}</span>
                                            </div>
                                          </>
                                        )}

                                        {(opp.type === "COURSES" || opp.type === "WEBINAR" || opp.type === "WORKSHOP" || opp.type === "TRAINING") && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Instructor Credentials</span>
                                              <span className="font-semibold text-slate-700">{details.instructorCredentials || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Course Mode</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.courseMode || "Live"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Duration</span>
                                              <span className="font-semibold text-slate-700">{details.duration || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Price</span>
                                              <span className="font-semibold text-slate-700">{details.price || "Free"}</span>
                                            </div>
                                          </>
                                        )}

                                        {opp.type === "CLUB" && (
                                          <>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Community Focus</span>
                                              <span className="font-semibold text-slate-700">{details.clubFocus || "N/A"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Admission Type</span>
                                              <span className="font-semibold text-slate-700 capitalize">{details.membershipType || "Open"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Fee</span>
                                              <span className="font-semibold text-slate-700">{details.clubFee || "Free"}</span>
                                            </div>
                                            <div>
                                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Cadence</span>
                                              <span className="font-semibold text-slate-700">{details.activityCadence || "N/A"}</span>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* ID verify */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Verification Document Review Queue</h3>
                </div>
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Name</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Declared Category</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Verification File</th>
                      <th className="p-4 text-xs font-black text-slate-500 uppercase">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-800">Jessica Dsouza</td>
                      <td className="p-4 text-slate-500 text-sm font-semibold">Late 30s Switcher</td>
                      <td className="p-4"><a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing masked file...") }} className="text-brand-500 underline font-semibold text-sm">relieving_letter.pdf</a></td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.target.closest("tr").remove(); alert("User verified") }} className="bg-brand-500 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1 rounded-lg">Approve</button>
                          <button onClick={(e) => { e.target.closest("tr").remove(); alert("User flagged") }} className="text-red-500 border border-red-200 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-50">Deny</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Notice Board Management */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

                {/* Form to Publish Notice */}
                <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6 space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg border-l-4 border-[#2164c5] pl-2.5">Publish New Announcement</h3>
                  <form onSubmit={createAdminNotice} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Announcement Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. WTM applications open"
                        value={adminNoticeForm.title}
                        onChange={(e) => setAdminNoticeForm({ ...adminNoticeForm, title: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2164c5] bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Notice Content</label>
                      <textarea
                        required
                        placeholder="Provide details of the announcement..."
                        value={adminNoticeForm.content}
                        onChange={(e) => setAdminNoticeForm({ ...adminNoticeForm, content: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-28 focus:outline-none focus:ring-1 focus:ring-[#2164c5] bg-slate-50 focus:bg-white resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#2164c5] hover:bg-blue-700 text-white rounded-xl py-3 text-xs font-black uppercase tracking-wider shadow-sm transition"
                    >
                      Publish Announcement
                    </button>
                  </form>
                </div>

                {/* List of Notices Board */}
                <div className="md:col-span-2 space-y-4 text-left">
                  <h3 className="font-bold text-slate-800 text-lg border-l-4 border-amber-500 pl-2.5">Active Notice Board Items</h3>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {notices.length === 0 ? (
                      <p className="text-slate-400 font-bold text-sm py-8 text-center bg-slate-50 rounded-2xl">No announcements listed.</p>
                    ) : (
                      notices.map(notice => (
                        <div key={notice.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-brand-50 text-brand-700 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-orange-100">
                                {notice.type}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">{notice.date}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm mt-1.5">{notice.title}</h4>
                            <p className="text-xs text-slate-500 font-semibold mt-1 line-clamp-2 leading-relaxed">{notice.content}</p>
                          </div>
                          <button
                            onClick={() => deleteAdminNotice(notice.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg border border-transparent hover:border-red-100 transition"
                            title="Delete Notice"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 7: USER PROFILE DETAILS
              ================================================ */}
          {currentView === "profile" && (
            <div className="space-y-8 max-w-[95%] mx-auto user-profile-details-page">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 border-l-4 border-brand-500 pl-3">User Profile Details</h2>
                  <p className="text-slate-500 mt-2">Manage your verification credentials, career stage, and details.</p>
                </div>
                <button
                  onClick={() => setCurrentView("opportunities")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition shadow-sm"
                >
                  ← Back to Board
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3 text-left">
                {/* Avatar Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center flex flex-col items-center">
                  <div className="relative">
                    <div className="h-28 w-28 bg-gradient-to-tr from-brand-500 to-orange-400 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-md border-4 border-white overflow-hidden">
                      {currentUser.profilePhoto ? (
                        <img src={currentUser.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        currentUser.firstName ? currentUser.firstName.charAt(0) : (currentUser.name ? currentUser.name.charAt(0) : "G")
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-brand-500 hover:bg-brand-700 text-white rounded-full p-2 shadow-md border-2 border-white flex items-center justify-center cursor-pointer transition">
                      <Plus className="h-4 w-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mt-4">{currentUser.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : (currentUser.name || "Guest User")}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">@{currentUser.username || "username"}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-1 capitalize">{currentUser.role} View</p>

                  {(() => {
                    const details = currentUser.profileDetails || {};
                    const hasEducation = details.education && (details.education.qualification || details.education.course || details.education.college);
                    const hasSkills = details.skills && (details.skills.technicalSkills || details.skills.softSkills);
                    const hasSkillsBreak = details.skillsBreak && (details.skillsBreak.existingSkills || details.skillsBreak.refreshedSkills || details.skillsBreak.skillsToImprove);
                    const hasCareerBreak = details.careerBreak && (details.careerBreak.startDate || details.careerBreak.endDate || (details.careerBreak.reasonForBreak && details.careerBreak.reasonForBreak.length > 0));
                    const resumeFile = currentUser.category === "break" ? (details.resumesBreak?.updatedResume || details.resumesBreak?.previousResume) : details.resumeName;
                    const hasSocials = details.socialLinks && (details.socialLinks.linkedin || details.socialLinks.github || details.socialLinks.portfolio || details.socialLinks.instagram || details.socialLinks.facebook);

                    return (
                      <>
                        {/* Status & Stage focus */}
                        <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-100 text-left text-xs">
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400 uppercase">Status</span>
                            <span className={`font-bold px-2 py-0.5 rounded ${currentUser.isVerified && currentUser.name !== "Guest User" ? "text-green-700 bg-green-50" : "text-orange-700 bg-orange-50"}`}>
                              {currentUser.isVerified && currentUser.name !== "Guest User" ? "Verified" : "Guest Mode"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400 uppercase">Stage Focus</span>
                            <span className="font-semibold text-slate-700 capitalize">
                              {currentUser.role === "host" ? "Recruiter" : (currentUser.category === "fresh" ? "Fresher" : currentUser.category === "break" ? "Career Break" : "Late 30s Switch")}
                            </span>
                          </div>
                        </div>

                        {/* Saved Details Section (Participant Role) */}
                        {currentUser.role !== "host" && (() => {
                          const hasPersonalOrAddress = currentUser.phone || currentUser.email || currentUser.dob || currentUser.gender || details.personalDetails?.permanentAddress || details.personalDetails?.currentAddress || details.personalDetails?.hobbies;
                          const hasPriorWork = (details.previousExperience && details.previousExperience.length > 0) || (details.workExperience && (details.workExperience.internship || details.workExperience.freelance || details.workExperience.partTime));
                          const hasPositions = details.positions && details.positions.length > 0;
                          const hasProjects = details.projects && details.projects.length > 0;
                          const hasCertificates = (details.certificates && details.certificates.length > 0) || (details.certificationsBreak && details.certificationsBreak.length > 0);
                          const resumeFile = currentUser.category === "break" ? (details.resumesBreak?.updatedResume || details.resumesBreak?.previousResume || "") : (details.resumeName || "");
                          const hasSocials = details.socialLinks && (details.socialLinks.linkedin || details.socialLinks.github || details.socialLinks.portfolio || details.socialLinks.instagram || details.socialLinks.facebook || (details.socialLinks.customLinks && details.socialLinks.customLinks.length > 0));

                          return (
                            <div className="mt-6 w-full space-y-4 pt-4 border-t border-slate-100 text-left text-xs">
                              {/* Bio */}
                              {(details.aboutMe || details.journey) && (
                                <div className="space-y-1">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">About Me</span>
                                  <p className="text-slate-650 leading-relaxed font-semibold italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                                    "{details.aboutMe || details.journey}"
                                  </p>
                                </div>
                              )}

                              {/* Personal & Address Details */}
                              {hasPersonalOrAddress && (
                                <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Personal & Address Details</span>
                                  <div className="grid gap-2 text-[11px] text-slate-600 font-semibold bg-slate-50/50 p-3 rounded-2xl border border-slate-150/60">
                                    {currentUser.phone && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-slate-400 w-4 text-center">📞</span>
                                        <span>{currentUser.phone}</span>
                                      </div>
                                    )}
                                    {currentUser.email && (
                                      <div className="flex items-center gap-2 truncate" title={currentUser.email}>
                                        <span className="text-slate-400 w-4 text-center">✉️</span>
                                        <span className="truncate">{currentUser.email}</span>
                                      </div>
                                    )}
                                    {currentUser.dob && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-slate-400 w-4 text-center">📅</span>
                                        <span>DOB: {currentUser.dob}</span>
                                      </div>
                                    )}
                                    {currentUser.gender && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-slate-400 w-4 text-center">👤</span>
                                        <span>Gender: {currentUser.gender}</span>
                                      </div>
                                    )}
                                    {details.personalDetails?.currentAddress && (
                                      <div className="flex items-start gap-2 pt-1 border-t border-slate-150 mt-1">
                                        <span className="text-slate-400 w-4 text-center">📍</span>
                                        <div>
                                          <span className="text-[9px] text-slate-400 uppercase block font-black">Current Address</span>
                                          <span className="text-slate-700 leading-normal block">{details.personalDetails.currentAddress}</span>
                                        </div>
                                      </div>
                                    )}
                                    {details.personalDetails?.permanentAddress && (
                                      <div className="flex items-start gap-2 pt-1">
                                        <span className="text-slate-400 w-4 text-center">🏠</span>
                                        <div>
                                          <span className="text-[9px] text-slate-400 uppercase block font-black">Permanent Address</span>
                                          <span className="text-slate-700 leading-normal block">{details.personalDetails.permanentAddress}</span>
                                        </div>
                                      </div>
                                    )}
                                    {details.personalDetails?.hobbies && (
                                      <div className="flex items-start gap-2 pt-1">
                                        <span className="text-slate-400 w-4 text-center">🎨</span>
                                        <div>
                                          <span className="text-[9px] text-slate-400 uppercase block font-black">Hobbies & Interests</span>
                                          <span className="text-slate-700 leading-normal block">{details.personalDetails.hobbies}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* One Resume (Most Recently Uploaded) - Placed after Personal & Address Details */}
                              {resumeFile && (
                                <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Resume (Most Recent)</span>
                                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-700 font-semibold">
                                    <span>📄</span>
                                    <span className="truncate text-[10px] font-bold text-slate-800" title={resumeFile}>{resumeFile}</span>
                                  </div>
                                </div>
                              )}

                              {/* Prior Work Experience / Internships */}
                              {hasPriorWork && (
                                <div className="space-y-2.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Work Experience & Internships</span>

                                  {/* Fresh category workExperience */}
                                  {currentUser.category === "fresh" && details.workExperience && (details.workExperience.internship || details.workExperience.freelance || details.workExperience.partTime) && (
                                    <div className="space-y-2 text-[11px] text-slate-650 font-semibold bg-slate-50 p-3 rounded-2xl border border-slate-150">
                                      {details.workExperience.internship && (
                                        <div>
                                          <span className="text-[9px] uppercase font-bold text-slate-400">Internship Roles</span>
                                          <p className="text-slate-800 font-bold mt-0.5">{details.workExperience.internship}</p>
                                        </div>
                                      )}
                                      {details.workExperience.freelance && (
                                        <div className="mt-1.5">
                                          <span className="text-[9px] uppercase font-bold text-slate-400">Freelance Gigs</span>
                                          <p className="text-slate-800 font-bold mt-0.5">{details.workExperience.freelance}</p>
                                        </div>
                                      )}
                                      {details.workExperience.partTime && (
                                        <div className="mt-1.5">
                                          <span className="text-[9px] uppercase font-bold text-slate-400">Part-Time Jobs</span>
                                          <p className="text-slate-800 font-bold mt-0.5">{details.workExperience.partTime}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Prior Work experience list */}
                                  {details.previousExperience && details.previousExperience.length > 0 && (
                                    <div className="space-y-3">
                                      {details.previousExperience.map((exp, idx) => (
                                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-650 font-semibold space-y-1">
                                          <div className="flex justify-between items-start">
                                            <span className="text-slate-800 font-extrabold text-[11px] block">{exp.designation}</span>
                                            <span className="text-[8px] bg-slate-200 text-slate-700 px-1 py-0.5 rounded font-black uppercase">{exp.employmentType}</span>
                                          </div>
                                          <div>
                                            <span className="text-slate-500 font-bold text-[10px]">{exp.companyName}</span>
                                            <span className="text-[9px] text-slate-400 block font-medium mt-0.5">{exp.startDate} to {exp.endDate} | {exp.industry}</span>
                                          </div>
                                          {exp.responsibilities && (
                                            <p className="text-[10px] text-slate-550 leading-relaxed font-medium pt-1 border-t border-slate-150">
                                              <strong>Responsibilities:</strong> {exp.responsibilities}
                                            </p>
                                          )}
                                          {exp.achievements && (
                                            <p className="text-[10px] text-brand-600 leading-relaxed font-semibold">
                                              <strong>Achievements:</strong> {exp.achievements}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Positions & Responsibilities */}
                              {hasPositions && (
                                <div className="space-y-2.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Positions & Responsibilities</span>
                                  <div className="space-y-2.5">
                                    {details.positions.map((p, idx) => (
                                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-650 font-semibold">
                                        <div className="flex justify-between items-start">
                                          <span className="text-slate-800 font-bold text-[11px]">{p.title}</span>
                                          <span className="text-[8px] bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded border border-brand-100 font-black uppercase">{p.roleType}</span>
                                        </div>
                                        <div className="text-slate-500 text-[10px] mt-0.5">{p.organization} | Duration: {p.duration}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Projects */}
                              {hasProjects && (
                                <div className="space-y-2.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Projects ({details.projects.length})</span>
                                  <div className="space-y-3">
                                    {details.projects.map((proj, idx) => (
                                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 font-semibold space-y-1.5">
                                        <div className="font-extrabold text-slate-800 text-xs">{proj.title}</div>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{proj.description}</p>
                                        <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
                                          <div>
                                            <span className="text-slate-400 uppercase text-[8px] font-black block">Tech Stack</span>
                                            <span className="text-slate-700 text-[10px]">{proj.technologies}</span>
                                          </div>
                                          <div>
                                            <span className="text-slate-400 uppercase text-[8px] font-black block">Duration</span>
                                            <span className="text-slate-700 text-[10px]">{proj.duration}</span>
                                          </div>
                                        </div>
                                        {(proj.projectLink || proj.githubLink) && (
                                          <div className="flex gap-3 text-[10px] font-black text-brand-500 border-t border-slate-150 pt-1.5 mt-1.5">
                                            {proj.projectLink && <a href={proj.projectLink} target="_blank" rel="noreferrer" className="hover:underline">Demo ↗</a>}
                                            {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Certificates */}
                              {hasCertificates && (
                                <div className="space-y-2.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Certifications</span>
                                  <div className="space-y-2">
                                    {details.certificates && details.certificates.map((c, idx) => (
                                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-650 font-semibold">
                                        <div className="text-slate-800 font-bold">{c.name}</div>
                                        <div className="text-slate-400 text-[10px] font-medium mt-0.5">{c.org} | Issued {c.issueDate}</div>
                                        {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase text-brand-500 hover:underline block mt-1">Credential URL ↗</a>}
                                      </div>
                                    ))}
                                    {details.certificationsBreak && details.certificationsBreak.map((c, idx) => (
                                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-655 font-semibold">
                                        <div className="text-slate-800 font-bold">{c.name || c}</div>
                                        {c.org && <div className="text-slate-400 text-[10px] font-medium mt-0.5">{c.org} | {c.issueDate}</div>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}


                              {/* Professional Links & Socials */}
                              {hasSocials && (
                                <div className="space-y-2.5 pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Professional Links & Socials</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {details.socialLinks?.linkedin && (
                                      <a href={details.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-bold hover:bg-blue-100 border border-blue-200 transition">
                                        LinkedIn
                                      </a>
                                    )}
                                    {details.socialLinks?.github && (
                                      <a href={details.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-[9px] font-bold hover:bg-slate-200 border border-slate-300 transition">
                                        GitHub
                                      </a>
                                    )}
                                    {details.socialLinks?.portfolio && (
                                      <a href={details.socialLinks.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-bold hover:bg-emerald-100 border border-emerald-200 transition">
                                        Portfolio
                                      </a>
                                    )}
                                    {details.socialLinks?.instagram && (
                                      <a href={details.socialLinks.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-pink-50 text-pink-700 rounded-lg text-[9px] font-bold hover:bg-pink-100 border border-pink-200 transition">
                                        Instagram
                                      </a>
                                    )}
                                    {details.socialLinks?.facebook && (
                                      <a href={details.socialLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-bold hover:bg-indigo-100 border border-indigo-200 transition">
                                        Facebook
                                      </a>
                                    )}
                                  </div>
                                  {details.socialLinks?.customLinks && details.socialLinks.customLinks.length > 0 && (
                                    <div className="space-y-1 mt-2">
                                      <span className="text-[8px] font-black uppercase text-slate-400 block">Custom Web Links</span>
                                      <div className="space-y-1">
                                        {details.socialLinks.customLinks.map((l, i) => (
                                          <a key={i} href={l.url} target="_blank" rel="noreferrer" className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-1.5 rounded border border-slate-200 text-[10px] text-slate-700 font-bold transition">
                                            <span>🔗 {l.label}</span>
                                            <span className="text-[8px] text-slate-400 truncate max-w-[120px]">{l.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Saved Details Section (Host Role) */}
                        {currentUser.role === "host" && (
                          <div className="mt-6 w-full space-y-4 pt-4 border-t border-slate-100 text-left text-xs">
                            {/* Company Name & Title */}
                            {(details.companyName || details.recruiterTitle) && (
                              <div className="space-y-1.5">
                                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Company Details</span>
                                {details.companyName && (
                                  <div className="flex items-center gap-2 text-slate-700 font-bold">
                                    <span>🏢</span>
                                    <span>{details.companyName}</span>
                                  </div>
                                )}
                                {details.recruiterTitle && (
                                  <div className="flex items-center gap-2 text-slate-600 font-semibold">
                                    <span>💼</span>
                                    <span>{details.recruiterTitle}</span>
                                  </div>
                                )}
                                {details.companyIndustry && (
                                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <span>🏷️</span>
                                    <span>{details.companyIndustry}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Company Website */}
                            {details.companyWebsite && (
                              <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Website</span>
                                <a href={details.companyWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-600 font-bold hover:underline">
                                  <span>🌐</span> {details.companyWebsite.replace(/^https?:\/\/(www\.)?/, '')}
                                </a>
                              </div>
                            )}

                            {/* Bio */}
                            {details.companyDescription && (
                              <div className="space-y-1 pt-2 border-t border-slate-50">
                                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Company Bio</span>
                                <p className="text-slate-600 leading-relaxed font-semibold italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-4">
                                  "{details.companyDescription}"
                                </p>
                              </div>
                            )}

                            {/* Social Links */}
                            {details.socialLinks && (details.socialLinks.linkedin || details.socialLinks.twitter) && (
                              <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Social Links</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {details.socialLinks.linkedin && (
                                    <a href={details.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-bold hover:bg-blue-100 border border-blue-200 transition">
                                      LinkedIn
                                    </a>
                                  )}
                                  {details.socialLinks.twitter && (
                                    <a href={details.socialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded-lg text-[9px] font-bold hover:bg-slate-200 border border-slate-300 transition">
                                      Twitter
                                    </a>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Details Form Card */}
                <div className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                  {(() => {
                    if (currentUser.role === "host") {
                      return (
                        <form onSubmit={handleProfileSave} className="space-y-6">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-black text-slate-800">Organization Profile Setup</h3>
                            <button
                              type="button"
                              onClick={() => {
                                setHostForm(prev => ({ ...prev, type: "JOB" }));
                                setIsHostModalOpen(true);
                              }}
                              className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 flex items-center justify-center gap-1"
                            >
                              <Plus className="h-3.5 w-3.5" /> Add New
                            </button>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Company Name <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={currentUser.profileDetails?.companyName || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.companyName = e.target.value;
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="e.g. Salesforce"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Company Website</label>
                              <input
                                type="url"
                                value={currentUser.profileDetails?.companyWebsite || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.companyWebsite = e.target.value;
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="https://salesforce.com"
                              />
                            </div>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Industry / Domain</label>
                              <input
                                type="text"
                                value={currentUser.profileDetails?.companyIndustry || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.companyIndustry = e.target.value;
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="e.g. Cloud Software / SaaS"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Company Logo URL</label>
                              <input
                                type="url"
                                value={currentUser.profileDetails?.companyLogo || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.companyLogo = e.target.value;
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="https://logo.url/logo.png"
                              />
                            </div>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Recruiter Name (First & Last) <span className="text-red-500">*</span></label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  required
                                  value={currentUser.firstName || ""}
                                  onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
                                  className="w-1/2 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  placeholder="First Name"
                                />
                                <input
                                  type="text"
                                  required
                                  value={currentUser.lastName || ""}
                                  onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
                                  className="w-1/2 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  placeholder="Last Name"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Recruiter Title / Designation <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={currentUser.profileDetails?.recruiterTitle || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.recruiterTitle = e.target.value;
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="e.g. Senior Recruiter"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase">Company Description / Recruiter Bio</label>
                            <textarea
                              value={currentUser.profileDetails?.companyDescription || ""}
                              onChange={(e) => {
                                const details = { ...currentUser.profileDetails };
                                details.companyDescription = e.target.value;
                                setCurrentUser({ ...currentUser, profileDetails: details });
                              }}
                              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 h-28"
                              placeholder="Tell potential candidates about your company's mission and hiring philosophy..."
                            />
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">LinkedIn Profile URL</label>
                              <input
                                type="url"
                                value={currentUser.profileDetails?.socialLinks?.linkedin || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.socialLinks = { ...details.socialLinks, linkedin: e.target.value };
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Twitter/X Profile URL</label>
                              <input
                                type="url"
                                value={currentUser.profileDetails?.socialLinks?.twitter || ""}
                                onChange={(e) => {
                                  const details = { ...currentUser.profileDetails };
                                  details.socialLinks = { ...details.socialLinks, twitter: e.target.value };
                                  setCurrentUser({ ...currentUser, profileDetails: details });
                                }}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                                placeholder="https://x.com/username"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95"
                          >
                            Save Organization Details
                          </button>
                        </form>
                      );
                    }
                    const details = currentUser.profileDetails || createDefaultProfileDetails();
                    return (
                      <form onSubmit={handleProfileSave} className="space-y-8">
                        {/* 1. BASIC INFORMATION */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3">Basic Information</h3>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">First Name <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={currentUser.firstName || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Last Name <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={currentUser.lastName || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                            </div>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Username (System Generated)</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={currentUser.username || ""}
                                  readOnly
                                  className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed outline-none"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Email Address</label>
                              <div className="relative">
                                <input
                                  type="email"
                                  value={currentUser.email || ""}
                                  readOnly
                                  className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed outline-none"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-6 sm:grid-cols-3">
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Mobile Number <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required
                                value={currentUser.phone || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Gender (Auto-declares Female)</label>
                              <select
                                value={currentUser.gender || "Female"}
                                onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                              >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Date of Birth</label>
                              <input
                                type="date"
                                value={currentUser.dob || ""}
                                onChange={(e) => setCurrentUser({ ...currentUser, dob: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase">User Type / Life Stage Focus</label>
                            <select
                              value={currentUser.category || "fresh"}
                              onChange={(e) => setCurrentUser({ ...currentUser, category: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer font-bold text-slate-700"
                            >
                              <option value="fresh">🎓 Category 1: Freshers (Students / Recent Graduates)</option>
                              <option value="break">👩 Category 2: Women Returning After Career Break</option>
                              <option value="switch">👩💼 Category 3: Women Starting/Rejoining Careers in Late 30s+</option>
                            </select>
                          </div>
                        </div>

                        {/* 2. CATEGORY-SPECIFIC FORM CONTENT */}

                        {/* -------------------- CATEGORY 1: FRESHERS -------------------- */}
                        {currentUser.category === "fresh" && (
                          <div className="space-y-8 pt-6 border-t border-slate-100">
                            <h3 className="text-lg font-black text-brand-700 flex items-center gap-2">
                              <span>🎓</span> Fresher Profile Details
                            </h3>

                            {/* About Me */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">About Me / Bio (Short description - max 500 chars)</label>
                              <textarea
                                maxLength={500}
                                value={details.aboutMe || ""}
                                onChange={(e) => updateProfileDetail("aboutMe", null, e.target.value)}
                                placeholder="Describe yourself, your career interests, and motivators..."
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 h-24 resize-none"
                              />
                              <div className="text-right text-[10px] text-slate-400 font-semibold">
                                {(details.aboutMe || "").length} / 500 characters
                              </div>
                            </div>

                            {/* Education Details */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Education Details</h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Qualification</label>
                                  <input
                                    type="text"
                                    value={details.education?.qualification || ""}
                                    onChange={(e) => updateProfileDetail("education", "qualification", e.target.value)}
                                    placeholder="e.g. Bachelor of Technology"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Course</label>
                                  <input
                                    type="text"
                                    value={details.education?.course || ""}
                                    onChange={(e) => updateProfileDetail("education", "course", e.target.value)}
                                    placeholder="e.g. Computer Science & Engineering"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Specialization</label>
                                  <input
                                    type="text"
                                    value={details.education?.specialization || ""}
                                    onChange={(e) => updateProfileDetail("education", "specialization", e.target.value)}
                                    placeholder="e.g. Artificial Intelligence"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1 col-span-2">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">College / University</label>
                                  <input
                                    type="text"
                                    value={details.education?.college || ""}
                                    onChange={(e) => updateProfileDetail("education", "college", e.target.value)}
                                    placeholder="e.g. IIT Delhi"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Start Year</label>
                                  <input
                                    type="number"
                                    value={details.education?.startYear || ""}
                                    onChange={(e) => updateProfileDetail("education", "startYear", e.target.value)}
                                    placeholder="2023"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">End Year (or Expected)</label>
                                  <input
                                    type="number"
                                    value={details.education?.endYear || ""}
                                    onChange={(e) => updateProfileDetail("education", "endYear", e.target.value)}
                                    placeholder="2027"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Course Type</label>
                                  <select
                                    value={details.education?.courseType || "Full-time"}
                                    onChange={(e) => updateProfileDetail("education", "courseType", e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Distance Learning">Distance Learning</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">CGPA / Percentage</label>
                                  <input
                                    type="text"
                                    value={details.education?.cgpa || ""}
                                    onChange={(e) => updateProfileDetail("education", "cgpa", e.target.value)}
                                    placeholder="e.g. 8.7 or 87%"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Roll / Enrollment Number</label>
                                  <input
                                    type="text"
                                    value={details.education?.rollNumber || ""}
                                    onChange={(e) => updateProfileDetail("education", "rollNumber", e.target.value)}
                                    placeholder="e.g. 23CS012"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase">Education Description</label>
                                <textarea
                                  value={details.education?.description || ""}
                                  onChange={(e) => updateProfileDetail("education", "description", e.target.value)}
                                  placeholder="Academic achievements, notable courses, GPA ranks..."
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-16 resize-none"
                                />
                              </div>
                            </div>

                            {/* Skills Section */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Skills & Languages</h4>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Technical Skills (comma-separated)</label>
                                  <input
                                    type="text"
                                    value={details.skills?.technicalSkills || ""}
                                    onChange={(e) => updateProfileDetail("skills", "technicalSkills", e.target.value)}
                                    placeholder="React, Java, SQL, Python, Git..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Soft Skills (comma-separated)</label>
                                  <input
                                    type="text"
                                    value={details.skills?.softSkills || ""}
                                    onChange={(e) => updateProfileDetail("skills", "softSkills", e.target.value)}
                                    placeholder="Problem Solving, Public Speaking, Leadership, Active Listening..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase">Languages Known (comma-separated)</label>
                                    <input
                                      type="text"
                                      value={details.skills?.languages || ""}
                                      onChange={(e) => updateProfileDetail("skills", "languages", e.target.value)}
                                      placeholder="English, Hindi, German..."
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase">Skill Proficiency level</label>
                                    <select
                                      value={details.skills?.proficiency || "Intermediate"}
                                      onChange={(e) => updateProfileDetail("skills", "proficiency", e.target.value)}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                    >
                                      <option value="Beginner">Beginner</option>
                                      <option value="Intermediate">Intermediate</option>
                                      <option value="Advanced">Advanced</option>
                                      <option value="Expert">Expert</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Resume */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3">
                              <h4 className="font-bold text-slate-800 text-sm">Resume (Candidate Bio PDF)</h4>
                              <div className="flex gap-4 items-center">
                                <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl text-indigo-700">
                                  📄
                                </div>
                                <div className="flex-grow">
                                  <input
                                    type="text"
                                    value={details.resumeName || ""}
                                    onChange={(e) => updateProfileDetail("resumeName", null, e.target.value)}
                                    placeholder="Enter resume name e.g. shreya_cv.pdf"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 font-semibold"
                                  />
                                </div>
                                <label className="cursor-pointer bg-white hover:bg-slate-50 border border-slate-250 text-slate-700 text-[10px] font-black uppercase px-4 py-2.5 rounded-lg shadow-xs transition">
                                  Select file
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => updateProfileDetail("resumeName", null, e.target.files[0]?.name || "resume.pdf")}
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Projects (Add Multiple) */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm flex justify-between items-center">
                                <span>Projects ({(details.projects || []).length})</span>
                              </h4>

                              <div className="space-y-3">
                                {(details.projects || []).map((proj, idx) => (
                                  <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs">
                                    <div className="space-y-1">
                                      <p className="font-bold text-slate-800">{proj.title}</p>
                                      <p className="text-slate-500">{proj.description}</p>
                                      <p className="text-[10px] text-slate-400 font-semibold">Tech: {proj.technologies} | Duration: {proj.duration}</p>
                                      <div className="flex gap-3 text-[10px] font-bold text-brand-600 mt-1">
                                        {proj.projectLink && <a href={proj.projectLink} target="_blank" rel="noreferrer" className="hover:underline">Demo ↗</a>}
                                        {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>}
                                      </div>
                                    </div>
                                    <button type="button" onClick={() => removeProject(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Project Details</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Technologies Used"
                                    value={newProject.technologies}
                                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <textarea
                                  placeholder="Project Description"
                                  value={newProject.description}
                                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-12 resize-none"
                                />
                                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                                  <input
                                    type="text"
                                    placeholder="Team Size"
                                    value={newProject.teamSize}
                                    onChange={(e) => setNewProject({ ...newProject, teamSize: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Duration"
                                    value={newProject.duration}
                                    onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Project Link"
                                    value={newProject.projectLink}
                                    onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="GitHub Link"
                                    value={newProject.githubLink}
                                    onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <button type="button" onClick={addProject} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Project to List
                                </button>
                              </div>
                            </div>

                            {/* Certificates (Add Multiple) */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Certificates ({(details.certificates || []).length})</h4>
                              <div className="space-y-3">
                                {(details.certificates || []).map((c, idx) => (
                                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs">
                                    <div>
                                      <p className="font-bold text-slate-800">{c.name}</p>
                                      <p className="text-slate-500 text-[10px]">{c.org} | Issued: {c.issueDate}</p>
                                      {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 hover:underline">Credential URL ↗</a>}
                                    </div>
                                    <button type="button" onClick={() => removeCertificate(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Certificate Details</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Certificate Name"
                                    value={newCert.name}
                                    onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Issuing Organization"
                                    value={newCert.org}
                                    onChange={(e) => setNewCert({ ...newCert, org: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Issue Date (e.g. May 2026)"
                                    value={newCert.issueDate}
                                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Credential URL"
                                    value={newCert.url}
                                    onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <button type="button" onClick={addCertificate} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Certificate
                                </button>
                              </div>
                            </div>

                            {/* Positions & Responsibilities (Add Multiple) */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Positions & Responsibilities ({(details.positions || []).length})</h4>
                              <div className="space-y-3">
                                {(details.positions || []).map((p, idx) => (
                                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs">
                                    <div>
                                      <p className="font-bold text-slate-800">{p.title} ({p.roleType})</p>
                                      <p className="text-slate-500 text-[10px]">{p.organization} | Duration: {p.duration}</p>
                                    </div>
                                    <button type="button" onClick={() => removePosition(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Leadership / Volunteer Role</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Role Title (e.g. Lead Coordinator)"
                                    value={newPosition.title}
                                    onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <select
                                    value={newPosition.roleType}
                                    onChange={(e) => setNewPosition({ ...newPosition, roleType: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  >
                                    <option value="Club Position">Club Position</option>
                                    <option value="Event Coordinator">Event Coordinator</option>
                                    <option value="Volunteer Work">Volunteer Work</option>
                                    <option value="Student Representative">Student Representative</option>
                                  </select>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Organization / Institution"
                                    value={newPosition.organization}
                                    onChange={(e) => setNewPosition({ ...newPosition, organization: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Duration (e.g. 6 Months)"
                                    value={newPosition.duration}
                                    onChange={(e) => setNewPosition({ ...newPosition, duration: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <button type="button" onClick={addPosition} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Leadership Role
                                </button>
                              </div>
                            </div>

                            {/* Work Experience */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Prior Work Experience / Internships (Optional) ({(details.previousExperience || []).length})</h4>

                              <div className="space-y-3">
                                {(details.previousExperience || []).map((exp, idx) => (
                                  <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs text-left">
                                    <div className="space-y-1">
                                      <p className="font-bold text-slate-800">{exp.designation} at {exp.companyName}</p>
                                      <p className="text-slate-500 font-semibold">{exp.industry} | {exp.employmentType}</p>
                                      <p className="text-slate-400 text-[10px] font-medium">{exp.startDate} to {exp.endDate}</p>
                                      <p className="text-slate-650 mt-1"><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                                      {exp.achievements && <p className="text-slate-650"><strong>Key Achievements:</strong> {exp.achievements}</p>}
                                    </div>
                                    <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3 text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Internship / Professional Experience</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Company / Organization Name"
                                    value={newExperience.companyName}
                                    onChange={(e) => setNewExperience({ ...newExperience, companyName: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Designation (e.g. Frontend Intern)"
                                    value={newExperience.designation}
                                    onChange={(e) => setNewExperience({ ...newExperience, designation: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <input
                                    type="text"
                                    placeholder="Industry (e.g. Software / EduTech)"
                                    value={newExperience.industry}
                                    onChange={(e) => setNewExperience({ ...newExperience, industry: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                  />
                                  <select
                                    value={newExperience.employmentType}
                                    onChange={(e) => setNewExperience({ ...newExperience, employmentType: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer"
                                  >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                  </select>
                                  <div className="flex gap-2 text-xs">
                                    <input
                                      type="date"
                                      value={newExperience.startDate}
                                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                      className="border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] w-1/2 focus:outline-none"
                                      title="Exp Start date selector"
                                    />
                                    <input
                                      type="date"
                                      value={newExperience.endDate}
                                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                                      className="border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] w-1/2 focus:outline-none"
                                      title="Exp End date selector"
                                    />
                                  </div>
                                </div>
                                <textarea
                                  placeholder="Role Responsibilities (e.g. Built responsive dashboards using React)"
                                  value={newExperience.responsibilities}
                                  onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-12 resize-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Key Achievements / Key deliverables"
                                  value={newExperience.achievements}
                                  onChange={(e) => setNewExperience({ ...newExperience, achievements: e.target.value })}
                                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                />
                                <button type="button" onClick={addExperience} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Experience
                                </button>
                              </div>
                            </div>

                            {/* Personal Details */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Personal & Address Details</h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Permanent Address</label>
                                  <textarea
                                    value={details.personalDetails?.permanentAddress || ""}
                                    onChange={(e) => updateProfileDetail("personalDetails", "permanentAddress", e.target.value)}
                                    placeholder="Your official permanent residence address..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-16 resize-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Current Correspondence Address</label>
                                  <textarea
                                    value={details.personalDetails?.currentAddress || ""}
                                    onChange={(e) => updateProfileDetail("personalDetails", "currentAddress", e.target.value)}
                                    placeholder="Where you are currently residing..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-16 resize-none"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase">Hobbies & Interests</label>
                                <input
                                  type="text"
                                  value={details.personalDetails?.hobbies || ""}
                                  onChange={(e) => updateProfileDetail("personalDetails", "hobbies", e.target.value)}
                                  placeholder="Chess, writing, cycling, community volunteering..."
                                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                />
                              </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Professional Links & Socials</h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">LinkedIn Profile URL</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.linkedin || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "linkedin", e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">GitHub Profile URL</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.github || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "github", e.target.value)}
                                    placeholder="https://github.com/username"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>
                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Portfolio Website</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.portfolio || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "portfolio", e.target.value)}
                                    placeholder="https://mywebsite.com"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Instagram</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.instagram || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "instagram", e.target.value)}
                                    placeholder="https://instagram.com/user"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Facebook</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.facebook || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "facebook", e.target.value)}
                                    placeholder="https://facebook.com/user"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              {/* Custom Links */}
                              <div className="pt-3 border-t border-slate-200 space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Custom Links ({(details.socialLinks?.customLinks || []).length})</p>
                                <div className="space-y-2">
                                  {(details.socialLinks?.customLinks || []).map((l, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                                      <span className="font-semibold text-slate-700">{l.label}: <a href={l.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">{l.url}</a></span>
                                      <button type="button" onClick={() => removeCustomLink(idx)} className="text-red-500 hover:bg-red-50 px-2 py-0.5 rounded">✕</button>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid gap-2 sm:grid-cols-3">
                                  <input
                                    type="text"
                                    placeholder="e.g. Medium Blog"
                                    value={newCustomLink.label}
                                    onChange={(e) => setNewCustomLink({ ...newCustomLink, label: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 col-span-1"
                                  />
                                  <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newCustomLink.url}
                                    onChange={(e) => setNewCustomLink({ ...newCustomLink, url: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 col-span-2"
                                  />
                                </div>
                                <button type="button" onClick={addCustomLink} className="bg-brand-500 hover:bg-brand-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded">
                                  + Add Custom Link
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* -------------------- CATEGORY 2: WOMEN RETURNING AFTER CAREER BREAK -------------------- */}
                        {currentUser.category === "break" && (
                          <div className="space-y-8 pt-6 border-t border-slate-100">
                            <h3 className="text-lg font-black text-brand-700 flex items-center gap-2">
                              <span>👩</span> Returnship Profile Details
                            </h3>

                            {/* Career Break Details */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Career Break Details</h4>

                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Break Start Date</label>
                                  <input
                                    type="date"
                                    value={details.careerBreak?.startDate || ""}
                                    onChange={(e) => updateProfileDetail("careerBreak", "startDate", e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Break End Date (Leave empty if active)</label>
                                  <input
                                    type="date"
                                    value={details.careerBreak?.endDate || ""}
                                    onChange={(e) => updateProfileDetail("careerBreak", "endDate", e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Currently Active Break?</label>
                                  <select
                                    value={details.careerBreak?.currentlyActive || "No"}
                                    onChange={(e) => updateProfileDetail("careerBreak", "currentlyActive", e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                                  >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>
                              </div>

                              {/* Reason for Break Checkboxes */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase block">Reasons for Career Break (Select all that apply)</label>
                                <div className="grid gap-2 grid-cols-2 md:grid-cols-4 text-xs font-semibold text-slate-700">
                                  {["Child Care", "Family Responsibilities", "Marriage Relocation", "Health Reasons", "Higher Education", "Entrepreneurship", "Personal Reasons", "Other"].map((reason) => {
                                    const isChecked = (details.careerBreak?.reasonForBreak || []).includes(reason);
                                    return (
                                      <label key={reason} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => handleCheckboxChange("careerBreak", "reasonForBreak", reason, e.target.checked)}
                                          className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                        />
                                        <span>{reason}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>

                              {(details.careerBreak?.reasonForBreak || []).includes("Other") && (
                                <div className="space-y-1.5 mt-3 animate-fade-in text-left">
                                  <label className="text-[10px] font-black text-brand-600 uppercase">Please Specify Other Reason <span className="text-red-500">*</span></label>
                                  <input
                                    type="text"
                                    required
                                    value={details.careerBreak?.otherReason || ""}
                                    onChange={(e) => updateProfileDetail("careerBreak", "otherReason", e.target.value)}
                                    placeholder="e.g., Relocated abroad, parental care, health recovery..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              )}

                              {/* What did you do during Break */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase block">Activities Done During Career Break (Up-skilling & support)</label>
                                <div className="grid gap-2 grid-cols-2 md:grid-cols-4 text-xs font-semibold text-slate-700">
                                  {["Freelancing", "Family Business", "Online Courses", "Certifications", "Volunteering", "Community Work", "Homemaker", "Personal Projects"].map((act) => {
                                    const isChecked = (details.careerBreak?.duringBreak || []).includes(act);
                                    return (
                                      <label key={act} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => handleCheckboxChange("careerBreak", "duringBreak", act, e.target.checked)}
                                          className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                        />
                                        <span>{act}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Previous Work Experience (Add Multiple) */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Previous Work Experience (Before Break) ({(details.previousExperience || []).length})</h4>

                              <div className="space-y-3">
                                {(details.previousExperience || []).map((exp, idx) => (
                                  <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs">
                                    <div className="space-y-1">
                                      <p className="font-bold text-slate-800">{exp.designation} at {exp.companyName}</p>
                                      <p className="text-slate-500 font-semibold">{exp.industry} | {exp.employmentType}</p>
                                      <p className="text-slate-400 text-[10px] font-medium">{exp.startDate} to {exp.endDate}</p>
                                      <p className="text-slate-600 mt-1"><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                                      {exp.achievements && <p className="text-slate-600"><strong>Key Achievements:</strong> {exp.achievements}</p>}
                                    </div>
                                    <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Professional Experience</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={newExperience.companyName}
                                    onChange={(e) => setNewExperience({ ...newExperience, companyName: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Designation"
                                    value={newExperience.designation}
                                    onChange={(e) => setNewExperience({ ...newExperience, designation: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <input
                                    type="text"
                                    placeholder="Industry (e.g. IT Services)"
                                    value={newExperience.industry}
                                    onChange={(e) => setNewExperience({ ...newExperience, industry: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                  />
                                  <select
                                    value={newExperience.employmentType}
                                    onChange={(e) => setNewExperience({ ...newExperience, employmentType: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer"
                                  >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                  </select>
                                  <div className="flex gap-2 text-xs">
                                    <input
                                      type="date"
                                      value={newExperience.startDate}
                                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                      className="border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] w-1/2 focus:outline-none"
                                      title="Exp Start date selector"
                                    />
                                    <input
                                      type="date"
                                      value={newExperience.endDate}
                                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                                      className="border border-slate-200 rounded-lg px-1.5 py-1.5 text-[10px] w-1/2 focus:outline-none"
                                      title="Exp End date selector"
                                    />
                                  </div>
                                </div>
                                <textarea
                                  placeholder="Role Responsibilities"
                                  value={newExperience.responsibilities}
                                  onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-12 resize-none"
                                />
                                <input
                                  type="text"
                                  placeholder="Key Achievements / Projects handled"
                                  value={newExperience.achievements}
                                  onChange={(e) => setNewExperience({ ...newExperience, achievements: e.target.value })}
                                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                />
                                <button type="button" onClick={addExperience} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Experience
                                </button>
                              </div>
                            </div>

                            {/* Skills Section */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Skills Audit</h4>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Skills Used Prior to Break</label>
                                  <input
                                    type="text"
                                    value={details.skillsBreak?.existingSkills || ""}
                                    onChange={(e) => updateProfileDetail("skillsBreak", "existingSkills", e.target.value)}
                                    placeholder="e.g. Java, Agile Development, SQL..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Refreshed Skills (Learned recently)</label>
                                  <input
                                    type="text"
                                    value={details.skillsBreak?.refreshedSkills || ""}
                                    onChange={(e) => updateProfileDetail("skillsBreak", "refreshedSkills", e.target.value)}
                                    placeholder="e.g. Next.js, OpenAI API, AWS Basics..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Skills to Improve (Desired learning)</label>
                                  <input
                                    type="text"
                                    value={details.skillsBreak?.skillsToImprove || ""}
                                    onChange={(e) => updateProfileDetail("skillsBreak", "skillsToImprove", e.target.value)}
                                    placeholder="e.g. System Architecture, Docker, DevOps..."
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Certifications During Break */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Certifications During Break ({(details.certificationsBreak || []).length})</h4>
                              <div className="space-y-3">
                                {(details.certificationsBreak || []).map((c, idx) => (
                                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-start gap-4 text-xs">
                                    <div>
                                      <p className="font-bold text-slate-800">{c.courseName}</p>
                                      <p className="text-slate-500 text-[10px]">{c.platform} | Completed: {c.completionDate}</p>
                                      {c.certificateName && <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded mt-1 inline-block">📄 {c.certificateName}</span>}
                                    </div>
                                    <button type="button" onClick={() => removeCertBreak(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Add Break Certification</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Course/Topic Name (e.g. AI Tools Bootcamp)"
                                    value={newCertBreak.courseName}
                                    onChange={(e) => setNewCertBreak({ ...newCertBreak, courseName: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Platform (e.g. Coursera / GeeksforGeeks)"
                                    value={newCertBreak.platform}
                                    onChange={(e) => setNewCertBreak({ ...newCertBreak, platform: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <input
                                    type="text"
                                    placeholder="Completion Date (e.g. April 2026)"
                                    value={newCertBreak.completionDate}
                                    onChange={(e) => setNewCertBreak({ ...newCertBreak, completionDate: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Certificate Filename (e.g. cert.pdf)"
                                    value={newCertBreak.certificateName}
                                    onChange={(e) => setNewCertBreak({ ...newCertBreak, certificateName: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <button type="button" onClick={addCertBreak} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                  + Add Break Cert
                                </button>
                              </div>
                            </div>

                            {/* Preferences */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Return-to-Work Preferences</h4>

                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase block">Preferred Job Types</label>
                                <div className="grid gap-2 grid-cols-2 md:grid-cols-5 text-xs font-semibold text-slate-700">
                                  {["Full-time", "Part-time", "Contract", "Freelance", "Remote"].map((jobType) => {
                                    const isChecked = (details.preferences?.jobTypes || []).includes(jobType);
                                    return (
                                      <label key={jobType} className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => handleCheckboxChange("preferences", "jobTypes", jobType, e.target.checked)}
                                          className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                        />
                                        <span>{jobType}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Preferred Industry</label>
                                  <input
                                    type="text"
                                    value={details.preferences?.industry || ""}
                                    onChange={(e) => updateProfileDetail("preferences", "industry", e.target.value)}
                                    placeholder="e.g. Technology / Finance"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Expected Salary</label>
                                  <input
                                    type="text"
                                    value={details.preferences?.expectedSalary || ""}
                                    onChange={(e) => updateProfileDetail("preferences", "expectedSalary", e.target.value)}
                                    placeholder="e.g. ₹12,00,000 LPA"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Notice Period</label>
                                  <input
                                    type="text"
                                    value={details.preferences?.noticePeriod || ""}
                                    onChange={(e) => updateProfileDetail("preferences", "noticePeriod", e.target.value)}
                                    placeholder="e.g. Immediate / 1 month"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Available working hours per week</label>
                                  <input
                                    type="text"
                                    value={details.preferences?.availableHours || ""}
                                    onChange={(e) => updateProfileDetail("preferences", "availableHours", e.target.value)}
                                    placeholder="e.g. 40 hours/week"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Double Resumes Upload */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Resumes (Career History Comparison)</h4>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase block">Previous Resume (Before Career Break)</label>
                                  <div className="flex gap-3 items-center">
                                    <span className="text-xs text-slate-400">📄</span>
                                    <input
                                      type="text"
                                      value={details.resumesBreak?.previousResume || ""}
                                      onChange={(e) => {
                                        const res = { ...details.resumesBreak, previousResume: e.target.value };
                                        updateProfileDetail("resumesBreak", null, res);
                                      }}
                                      placeholder="e.g. previous_cv.pdf"
                                      className="flex-grow bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase block">Updated Resume (Post Break Upskilled CV)</label>
                                  <div className="flex gap-3 items-center">
                                    <span className="text-xs text-brand-500">📄</span>
                                    <input
                                      type="text"
                                      value={details.resumesBreak?.updatedResume || ""}
                                      onChange={(e) => {
                                        const res = { ...details.resumesBreak, updatedResume: e.target.value };
                                        updateProfileDetail("resumesBreak", null, res);
                                      }}
                                      placeholder="e.g. updated_cv.pdf"
                                      className="flex-grow bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Confidence Builder Section */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3">
                              <h4 className="font-bold text-slate-800 text-sm text-brand-700">💪 Confidence Builder Support Setup</h4>
                              <p className="text-[11px] text-slate-400 font-semibold">What support would help you restart your career? (Select all that apply for recommendation matching)</p>

                              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 text-xs font-semibold text-slate-700">
                                {["Mentorship", "Resume Review", "Interview Preparation", "Skill Training", "Networking Events", "Returnship Programs"].map((support) => {
                                  const isChecked = (details.confidenceBuilder?.supportNeeded || []).includes(support);
                                  return (
                                    <label key={support} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => handleCheckboxChange("confidenceBuilder", "supportNeeded", support, e.target.checked)}
                                        className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                      />
                                      <span>{support}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Social Links (Common) */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Professional Links & Socials</h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">LinkedIn Profile URL</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.linkedin || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "linkedin", e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">GitHub Profile URL</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.github || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "github", e.target.value)}
                                    placeholder="https://github.com/username"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>
                              <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Portfolio Website</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.portfolio || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "portfolio", e.target.value)}
                                    placeholder="https://mywebsite.com"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Instagram</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.instagram || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "instagram", e.target.value)}
                                    placeholder="https://instagram.com/user"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Facebook</label>
                                  <input
                                    type="text"
                                    value={details.socialLinks?.facebook || ""}
                                    onChange={(e) => updateProfileDetail("socialLinks", "facebook", e.target.value)}
                                    placeholder="https://facebook.com/user"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                  />
                                </div>
                              </div>

                              {/* Custom Links */}
                              <div className="pt-3 border-t border-slate-200 space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase">Custom Links ({(details.socialLinks?.customLinks || []).length})</p>
                                <div className="space-y-2">
                                  {(details.socialLinks?.customLinks || []).map((l, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                                      <span className="font-semibold text-slate-700">{l.label}: <a href={l.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">{l.url}</a></span>
                                      <button type="button" onClick={() => removeCustomLink(idx)} className="text-red-500 hover:bg-red-50 px-2 py-0.5 rounded">✕</button>
                                    </div>
                                  ))}
                                </div>
                                <div className="grid gap-2 sm:grid-cols-3">
                                  <input
                                    type="text"
                                    placeholder="e.g. Medium Blog"
                                    value={newCustomLink.label}
                                    onChange={(e) => setNewCustomLink({ ...newCustomLink, label: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 col-span-1"
                                  />
                                  <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newCustomLink.url}
                                    onChange={(e) => setNewCustomLink({ ...newCustomLink, url: e.target.value })}
                                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 col-span-2"
                                  />
                                </div>
                                <button type="button" onClick={addCustomLink} className="bg-brand-500 hover:bg-brand-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded">
                                  + Add Custom Link
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* -------------------- CATEGORY 3: WOMEN STARTING/REJOINING CAREERS IN LATE 30s+ -------------------- */}
                        {currentUser.category === "switch" && (
                          <div className="space-y-8 pt-6 border-t border-slate-100">
                            <h3 className="text-lg font-black text-brand-700 flex items-center gap-2">
                              <span>👩💼</span> Late Start / Career Rejoiner details
                            </h3>

                            {/* Current Situation */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Current Situation Mapping</h4>
                              <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-400 uppercase">Which statement best describes your current work context?</label>
                                <select
                                  value={details.currentSituation || "Homemaker"}
                                  onChange={(e) => updateProfileDetail("currentSituation", null, e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer text-slate-700 font-bold"
                                >
                                  <option value="Homemaker">Homemaker (Seeking formal work career start)</option>
                                  <option value="Freelancer">Freelancer (Wants consistent gig/corporate roles)</option>
                                  <option value="Entrepreneur">Entrepreneur (Seeking corporate shift)</option>
                                  <option value="Teacher/Tutor">Teacher / Private Tutor (Wants tech/corporate role)</option>
                                  <option value="Returning Professional">Returning Professional (Long career break switch)</option>
                                  <option value="Looking for First Formal Job">Looking for First Formal Job (Re-launching lifecycle)</option>
                                  <option value="Family Business Contributor">Family Business Contributor (Wants independent corporate career)</option>
                                </select>
                              </div>
                            </div>

                            {/* Experience Mapping: Corporate and Informal */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Experience Mapping</h4>
                              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Traditional portals ignore life experience. List both corporate roles and informal/community leadership roles (e.g. running family business, event management, NGO work) so we can map them to employable skillsets.</p>

                              <div className="space-y-4">
                                {/* Corporate section */}
                                <div className="space-y-2 border-b border-slate-200 pb-4">
                                  <p className="text-[10px] font-black text-slate-400 uppercase">Corporate / Professional Experience (Summary)</p>
                                  <div className="grid gap-3 sm:grid-cols-3">
                                    <input
                                      type="text"
                                      placeholder="Last Company (or 'None')"
                                      value={details.education?.qualification || ""} // reusing education object fields as basic switcher cache or similar
                                      onChange={(e) => updateProfileDetail("education", "qualification", e.target.value)}
                                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Last Designation"
                                      value={details.education?.course || ""}
                                      onChange={(e) => updateProfileDetail("education", "course", e.target.value)}
                                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Duration (e.g. 2 Years)"
                                      value={details.education?.specialization || ""}
                                      onChange={(e) => updateProfileDetail("education", "specialization", e.target.value)}
                                      className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                    />
                                  </div>
                                </div>

                                {/* Informal Experience List (Add Multiple) */}
                                <div className="space-y-3">
                                  <p className="text-[10px] font-black text-brand-700 uppercase">Informal / Life Experience Items ({(details.informalExperience || []).length})</p>
                                  {(details.informalExperience || []).map((inf, idx) => (
                                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-250 flex justify-between items-start gap-4 text-xs">
                                      <div className="space-y-1">
                                        <p className="font-bold text-slate-800">{inf.activityName}</p>
                                        <p className="text-slate-500 font-semibold">Duration: {inf.duration} | Skills Used: {inf.skillsUsed}</p>
                                        <p className="text-slate-600 mt-1">{inf.responsibilities}</p>
                                      </div>
                                      <button type="button" onClick={() => removeInformal(idx)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Remove</button>
                                    </div>
                                  ))}

                                  <div className="p-4 bg-white border border-slate-200 border-dashed rounded-xl space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Add Life Experience (NGO, Event, Business, Tutoring)</p>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                      <input
                                        type="text"
                                        placeholder="Activity Name (e.g. Managing Family Retail Business)"
                                        value={newInformal.activityName}
                                        onChange={(e) => setNewInformal({ ...newInformal, activityName: e.target.value })}
                                        className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Duration (e.g. 5 Years)"
                                        value={newInformal.duration}
                                        onChange={(e) => setNewInformal({ ...newInformal, duration: e.target.value })}
                                        className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                      />
                                    </div>
                                    <textarea
                                      placeholder="Responsibilities / Tasks handled"
                                      value={newInformal.responsibilities}
                                      onChange={(e) => setNewInformal({ ...newInformal, responsibilities: e.target.value })}
                                      className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 h-12 resize-none"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Skills Developed (e.g. Cash Mgmt, Sales, Leadership)"
                                      value={newInformal.skillsUsed}
                                      onChange={(e) => setNewInformal({ ...newInformal, skillsUsed: e.target.value })}
                                      className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                                    />
                                    <button type="button" onClick={addInformal} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">
                                      + Add Informal Experience
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Skills Assessment */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-6">
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">Skills Assessment</h4>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Rate your proficiency from 1 (Basic) to 5 (Advanced/Expert).</p>
                              </div>

                              {/* General Skills */}
                              <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-500 uppercase border-b pb-1">Functional & Core Competencies</p>
                                <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                                  {["Communication", "Leadership", "Organization", "Finance", "Teaching", "Sales", "Technology"].map((skill) => {
                                    const rating = details.skillsAssessment?.existingSkills?.[skill] || 3;
                                    return (
                                      <div key={skill} className="space-y-1 bg-white border border-slate-200 p-2 rounded-xl text-left">
                                        <span className="text-[10px] font-bold text-slate-700 block truncate">{skill}</span>
                                        <select
                                          value={rating}
                                          onChange={(e) => handleRatingChange("existingSkills", skill, e.target.value)}
                                          className="w-full bg-slate-50 border border-slate-150 rounded px-1.5 py-1 text-[10px] outline-none cursor-pointer"
                                        >
                                          <option value="1">⭐ 1/5 (Basic)</option>
                                          <option value="2">⭐⭐ 2/5</option>
                                          <option value="3">⭐⭐⭐ 3/5</option>
                                          <option value="4">⭐⭐⭐⭐ 4/5</option>
                                          <option value="5">⭐⭐⭐⭐⭐ 5/5</option>
                                        </select>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Digital Skills */}
                              <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-500 uppercase border-b pb-1">Digital Tools Literacy</p>
                                <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                                  {["MS Office", "Excel", "Email", "Google Workspace", "Social Media", "AI Tools", "Programming"].map((tool) => {
                                    const rating = details.skillsAssessment?.digitalSkills?.[tool] || 3;
                                    return (
                                      <div key={tool} className="space-y-1 bg-white border border-slate-200 p-2 rounded-xl text-left">
                                        <span className="text-[10px] font-bold text-slate-700 block truncate">{tool}</span>
                                        <select
                                          value={rating}
                                          onChange={(e) => handleRatingChange("digitalSkills", tool, e.target.value)}
                                          className="w-full bg-slate-50 border border-slate-150 rounded px-1.5 py-1 text-[10px] outline-none cursor-pointer"
                                        >
                                          <option value="1">⭐ 1/5 (Basic)</option>
                                          <option value="2">⭐⭐ 2/5</option>
                                          <option value="3">⭐⭐⭐ 3/5</option>
                                          <option value="4">⭐⭐⭐⭐ 4/5</option>
                                          <option value="5">⭐⭐⭐⭐⭐ 5/5</option>
                                        </select>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Learning Interests */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3">
                              <h4 className="font-bold text-slate-800 text-sm">Learning & Upskilling Interests</h4>
                              <p className="text-[10px] text-slate-400 font-semibold">What domains would you like to explore and learn? (Recommendation matches)</p>

                              <div className="grid gap-2 grid-cols-2 md:grid-cols-4 text-xs font-semibold text-slate-700">
                                {["Technology", "HR", "Teaching", "Marketing", "Finance", "Entrepreneurship", "Content Creation"].map((interest) => {
                                  const isChecked = (details.learningInterests || []).includes(interest);
                                  return (
                                    <label key={interest} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => handleTopCheckboxChange("learningInterests", interest, e.target.checked)}
                                        className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                      />
                                      <span>{interest}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Work Preferences */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-4">
                              <h4 className="font-bold text-slate-800 text-sm">Working Style Preferences</h4>

                              <div className="grid gap-4 sm:grid-cols-3 text-xs font-bold text-slate-700">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Work Mode</label>
                                  <select
                                    value={details.workPreferencesLate?.modes?.[0] || "Remote"}
                                    onChange={(e) => {
                                      const pref = { ...details.workPreferencesLate, modes: [e.target.value] };
                                      updateProfileDetail("workPreferencesLate", null, pref);
                                    }}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                                  >
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="On-site">On-site</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Schedule Preference</label>
                                  <select
                                    value={details.workPreferencesLate?.schedules?.[0] || "Flexible"}
                                    onChange={(e) => {
                                      const pref = { ...details.workPreferencesLate, schedules: [e.target.value] };
                                      updateProfileDetail("workPreferencesLate", null, pref);
                                    }}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                                  >
                                    <option value="Flexible">Flexible Hours</option>
                                    <option value="Fixed Hours">Fixed Hours</option>
                                    <option value="Weekend Only">Weekend Only</option>
                                    <option value="Part-time">Part-time (Under 20hrs)</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase">Job Type Target</label>
                                  <select
                                    value={details.workPreferencesLate?.jobTypes?.[0] || "Freelance"}
                                    onChange={(e) => {
                                      const pref = { ...details.workPreferencesLate, jobTypes: [e.target.value] };
                                      updateProfileDetail("workPreferencesLate", null, pref);
                                    }}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1"
                                  >
                                    <option value="Internship">Internship / Returnship</option>
                                    <option value="Full-time">Full-time Job</option>
                                    <option value="Part-time">Part-time Job</option>
                                    <option value="Freelance">Freelance Contract</option>
                                    <option value="Consultancy">Consultancy</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* About Me / Journey */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-slate-400 uppercase">Tell Us About Your Journey (Max 1000 characters)</label>
                              <textarea
                                maxLength={1000}
                                value={details.journey || ""}
                                onChange={(e) => updateProfileDetail("journey", null, e.target.value)}
                                placeholder="Describe your experiences, achievements, responsibilities, and what motivates you to rejoin/restart your career now..."
                                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 h-32 resize-none"
                              />
                              <div className="text-right text-[10px] text-slate-400 font-semibold">
                                {(details.journey || "").length} / 1000 characters
                              </div>
                            </div>

                            {/* Support Needed */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3">
                              <h4 className="font-bold text-slate-800 text-sm text-brand-700">🛠️ Assistance Requirements</h4>
                              <p className="text-[10px] text-slate-400 font-semibold">What assistance or services do you need to restart/excel in your career path?</p>

                              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 text-xs font-semibold text-slate-700">
                                {["Resume Building", "Interview Preparation", "Career Counseling", "Mentorship", "Skill Development", "Networking Opportunities"].map((support) => {
                                  const isChecked = (details.supportLate || []).includes(support);
                                  return (
                                    <label key={support} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => handleTopCheckboxChange("supportLate", support, e.target.checked)}
                                        className="rounded border-slate-350 text-brand-500 focus:ring-brand-500 h-3.5 w-3.5 cursor-pointer"
                                      />
                                      <span>{support}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SAVE ACTION */}
                        <div className="pt-6 border-t border-slate-100 flex justify-end">
                          <button
                            type="submit"
                            className="bg-brand-500 hover:bg-brand-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                          >
                            Save Profile Changes
                          </button>
                        </div>
                      </form>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              VIEW 8: APPLICATION SETTINGS
              ================================================ */}
          {currentView === "settings" && (
            <div className="space-y-8 max-w-[95%] mx-auto text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 border-l-4 border-brand-500 pl-3">Application Settings</h2>
                  <p className="text-slate-500 mt-2">Adjust your security, notification preferences, sessions, and visibility settings.</p>
                </div>
                <button
                  onClick={() => setCurrentView("opportunities")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full transition shadow-sm"
                >
                  ← Back to Board
                </button>
              </div>

              <div className="space-y-6">

                {/* 1. Notifications Accordion Panel */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleSettingsPanel("notifications")}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Notification Preferences</h3>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">Choose what updates, job alerts, and newsletters you receive.</p>
                      </div>
                    </div>
                    <div>
                      {expandedSettings.notifications ? (
                        <ChevronUp className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedSettings.notifications && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-6 space-y-4">
                      {/* Weekly Newsletter toggle */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className="text-left pr-4">
                          <p className="text-sm font-black text-slate-700">Weekly Newsletter & Insights</p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">Get hand-picked career advice, returnship success stories, and weekly platform updates.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewsletterActive(!newsletterActive)}
                          className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${newsletterActive ? 'bg-brand-500' : 'bg-slate-200'}`}
                          title="Toggle newsletter preference"
                        >
                          <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform ${newsletterActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Email Notification Preferences with toggles and redirect badge */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-sm font-black text-slate-700">Email Notification Preferences</p>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Configure which email notifications are delivered to you.</p>
                          </div>
                          {/* Link/redirect badge */}
                          <div
                            onClick={() => alert("Redirecting to email communication settings...")}
                            className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 text-[10px] font-black rounded-full border border-brand-100 transition cursor-pointer select-none"
                          >
                            <span>Primary Verified</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </div>
                        </div>

                        <div className="border-t border-slate-200/50 pt-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-600">Weekly Digest of discussions</span>
                            <button
                              type="button"
                              onClick={() => setAutomatedReminders(!automatedReminders)}
                              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${automatedReminders ? 'bg-brand-500' : 'bg-slate-200'}`}
                              title="Toggle weekly digest"
                            >
                              <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform ${automatedReminders ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Job Alerts toggle */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className="text-left pr-4">
                          <p className="text-sm font-black text-slate-700">Matching Job Alerts</p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">Notify me immediately when new matching returnship or switch opportunities are hosted.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setJobAlerts(!jobAlerts)}
                          className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${jobAlerts ? 'bg-brand-500' : 'bg-slate-200'}`}
                          title="Toggle job alerts"
                        >
                          <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform ${jobAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                {/* 2. Password Accordion Panel */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleSettingsPanel("password")}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Change Password</h3>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">Update your account password to keep your details secure.</p>
                      </div>
                    </div>
                    <div>
                      {expandedSettings.password ? (
                        <ChevronUp className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedSettings.password && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-6">
                      <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 max-w-xl">
                        <div>
                          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Current Password</label>
                          <input
                            type="password"
                            required
                            placeholder="Enter your current password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">New Password</label>
                            <input
                              type="password"
                              required
                              placeholder="At least 6 characters"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Confirm New Password</label>
                            <input
                              type="password"
                              required
                              placeholder="Re-enter new password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            />
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-full transition shadow-sm"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                {/* 3. Security Accordion Panel */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleSettingsPanel("security")}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-55 bg-opacity-10 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <ShieldAlert className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Security & Multi-Factor Auth</h3>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">Manage two-factor codes and access security parameters.</p>
                      </div>
                    </div>
                    <div>
                      {expandedSettings.security ? (
                        <ChevronUp className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedSettings.security && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-6 space-y-4">
                      <div className="flex items-start justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className="text-left pr-4">
                          <p className="text-sm font-black text-slate-700">Multi-Factor Authentication (MFA)</p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">Require an OTP code sent to your verified mobile number or authenticator app during sign-in.</p>
                          {mfaActive && (
                            <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-100 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-600" />
                              <span>MFA active via SMS to your verified phone number ({currentUser?.phone || "+91 ••••• ••921"}).</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setMfaActive(!mfaActive)}
                          className={`w-12 h-6 rounded-full transition-colors relative shrink-0 mt-1 ${mfaActive ? 'bg-brand-500' : 'bg-slate-200'}`}
                          title="Toggle MFA"
                        >
                          <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform ${mfaActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Manage Account Accordion Panel */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleSettingsPanel("account")}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Manage Account</h3>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">Configure your visibility options or request permanent deletion.</p>
                      </div>
                    </div>
                    <div>
                      {expandedSettings.account ? (
                        <ChevronUp className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedSettings.account && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-6 space-y-6">
                      {/* Profile Visibility Dropdown */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div>
                          <label className="text-sm font-black text-slate-700 block">Profile Visibility Mode</label>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">Choose who can find your profile, details, experiences, and applications.</p>
                        </div>
                        <select
                          value={profileVisibility}
                          onChange={(e) => setProfileVisibility(e.target.value)}
                          className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-500 w-full sm:w-auto"
                        >
                          <option value="Public">Public (Visible to everyone & recruiters)</option>
                          <option value="Private">Private (Only visible to you)</option>
                        </select>
                      </div>

                      {/* Delete account trigger */}
                      <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl text-left">
                        <h4 className="text-sm font-black text-red-800">Danger Zone</h4>
                        <p className="text-xs font-medium text-red-500 mt-0.5">Permanently delete your profile, active returnship applications, certificates, and all associated details.</p>
                        <button
                          type="button"
                          onClick={handleDeleteAccount}
                          className="mt-3 text-xs font-black text-white bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-full shadow-sm active:scale-95"
                        >
                          Delete Account Permanent...
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Manage Devices Accordion Panel */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleSettingsPanel("devices")}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Laptop className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Manage Devices</h3>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">Check and manage other browser sessions active on your account.</p>
                      </div>
                    </div>
                    <div>
                      {expandedSettings.devices ? (
                        <ChevronUp className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedSettings.devices && (
                    <div className="px-6 pb-6 border-t border-slate-100 pt-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Device Sessions</p>
                        {loggedDevices.length > 1 && (
                          <button
                            type="button"
                            onClick={handleLogoutAllDevices}
                            className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 border border-red-100 px-3 py-1.5 rounded-full transition"
                          >
                            Log out from all other devices
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-slate-100">
                        {loggedDevices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 text-left">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-slate-600">
                                {device.os.includes("macOS") ? (
                                  <Laptop className="h-5 w-5" />
                                ) : (
                                  <Smartphone className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-black text-slate-800">{device.os} • {device.browser}</span>
                                  {device.isCurrent && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded-full uppercase tracking-wider">Active Now</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">{device.location} • {device.time}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeviceLogout(device.id)}
                              className="text-xs font-bold text-slate-400 hover:text-red-500 transition px-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200"
                            >
                              {device.isCurrent ? "Sign out" : "Revoke Session"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </main>
      </div >
      {/* --------------------------------------------------
          MACOS DOCK NAVIGATION
          -------------------------------------------------- */}
      {currentUser.role !== "host" && renderUserDock(false)}

      {currentUser.role === "host" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 max-w-[95vw] pointer-events-none">
          {/* User Dock Wrapper */}
          <div className="pointer-events-auto flex items-center">
            {expandedDock === "user" ? (
              renderUserDock(true)
            ) : (
              <button
                onClick={() => {
                  setExpandedDock("user");
                  setCurrentView("opportunities");
                }}
                className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center text-slate-500 hover:text-brand-500 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
                title="Open User Panel"
              >
                <User className="h-7 w-7 text-brand-500" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-sm pointer-events-none">
                  User Panel
                </span>
              </button>
            )}
          </div>

          {/* Host Dock Wrapper */}
          <div className="pointer-events-auto flex items-center">
            {expandedDock === "host" ? (
              <div
                className="flex items-center gap-3.5 bg-white/95 backdrop-blur-xl border border-blue-200/60 shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-[2.25rem] px-6 py-3.5 overflow-visible transition-all duration-300 hover:scale-[1.01] focus:outline-none"
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1.5 rounded-full border border-blue-100">
                    Host Mode
                  </span>
                </div>

                <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>

                {/* Arrow navigation keys pair */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => navigateHostTab("prev")}
                    disabled={hostActiveTab === "overview"}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${hostActiveTab === "overview"
                      ? "bg-slate-50/30 text-slate-300 border-slate-100/50 cursor-not-allowed opacity-40"
                      : "bg-[#f1f5f9] text-[#1e293b] hover:bg-slate-200/80 hover:scale-105 active:scale-95 border-slate-200/60 shadow-xs"
                      }`}
                    title="Previous Tab (ArrowLeft)"
                  >
                    <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={() => navigateHostTab("next")}
                    disabled={hostActiveTab === "company"}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${hostActiveTab === "company"
                      ? "bg-slate-50/30 text-slate-300 border-slate-100/50 cursor-not-allowed opacity-40"
                      : "bg-[#f1f5f9] text-[#1e293b] hover:bg-slate-200/80 hover:scale-105 active:scale-95 border-slate-200/60 shadow-xs"
                      }`}
                    title="Next Tab (ArrowRight)"
                  >
                    <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
                  </button>
                </div>

                <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>

                {/* Host Dock Tabs List */}
                {(() => {
                  const dockTabs = [
                    { id: "overview", label: "Overview", icon: Compass },
                    { id: "jobs", label: "Jobs", icon: Briefcase },
                    { id: "internships", label: "Internships", icon: GraduationCap },
                    { id: "competitions", label: "Competitions", icon: Trophy },
                    { id: "mentorship", label: "Mentorship", icon: UserCheck },
                    { id: "mock_prep", label: "Mock Prep", icon: FileQuestion },
                    { id: "webinars", label: "Webinars", icon: Video },
                    { id: "clubs", label: "Clubs", icon: Users },
                    { id: "applications", label: "Pipeline", icon: Activity },
                    { id: "company", label: "Company", icon: User }
                  ];

                  return dockTabs.map(tab => {
                    const IconComponent = tab.icon;
                    const isActive = currentView === "host" && hostActiveTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setCurrentView("host");
                          setHostActiveTab(tab.id);
                        }}
                        className="relative flex flex-col items-center justify-center w-11 h-14 group shrink-0"
                      >
                        <IconComponent className={`h-5 w-5 transition-all duration-200 ease-out group-hover:scale-[1.2] group-hover:-translate-y-1.5 ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-900"}`} />
                        {isActive && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_6px_#2563eb] transition-all duration-200 group-hover:opacity-0"></span>
                        )}
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7.5px] font-black text-blue-700 tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
                          {tab.label}
                        </span>
                      </button>
                    );
                  });
                })()}

                {/* Profile Dropdown for Host */}
                <div className="relative user-menu-container shrink-0 flex flex-col items-center justify-center w-16 h-14 group" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-200"
                    aria-label="User Options"
                  >
                    <div className="relative transition-all duration-200 ease-out group-hover:scale-[1.3] group-hover:-translate-y-2.5">
                      <User className={`h-6 w-6 ${isProfileDropdownOpen || currentView === "profile" || currentView === "settings" ? "text-blue-600" : "text-slate-500 group-hover:text-slate-900"}`} />
                    </div>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute bottom-full mb-3.5 right-0 w-64 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-2xl p-3.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-left space-y-2">
                      <div
                        onClick={() => {
                          setCurrentView("profile");
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition text-left group/item"
                      >
                        <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-750 font-black text-sm border border-blue-100 group-hover/item:scale-105 transition-transform">
                          {currentUser.name ? currentUser.name.charAt(0) : "H"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate group-hover/item:text-blue-600 transition-colors">{currentUser.name || "Host User"}</p>
                          <p className="text-[10px] font-semibold text-slate-400 truncate">View Profile Details</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs rounded-xl transition duration-150"
                        >
                          Logout / Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-px h-9 bg-slate-200/60 self-center mx-1.5 shrink-0"></div>

                <button
                  onClick={() => {
                    setExpandedDock("none");
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:scale-105 active:scale-95 transition"
                  title="Minimize Host Dock"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setExpandedDock("host");
                  setCurrentView("host");
                  setHostActiveTab("overview");
                }}
                className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-xl border border-blue-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
                title="Open Host Panel"
              >
                <Briefcase className="h-7 w-7 text-blue-600" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-sm pointer-events-none">
                  Host Panel
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==================================================
          MODALS / OVERLAYS
          ================================================== */}
      {/* 1. Auth Login / OTP Modal */}
      {
        isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setIsAuthModalOpen(false)} className="absolute right-5 top-5 text-slate-400 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <span className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mx-auto">🔐</span>
                <h3 className="text-2xl font-black text-slate-900 mt-3">Women-Only Verification</h3>
                <p className="text-slate-500 text-xs mt-1 leading-snug">To keep SheReDefine safe and verified, self-declaration or secure masked ID checks are required.</p>
              </div>

              {authStep === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setAuthStep(2); }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aaradhya Sen"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2164c5] text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aaradhya.sen@example.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2164c5] text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2164c5] text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Self-Declaration</label>
                    <select
                      value={authForm.selfDec}
                      onChange={(e) => setAuthForm({ ...authForm, selfDec: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none text-sm bg-white cursor-pointer"
                      title="User self declaration dropdown">
                      <option value="female">I identify as Female</option>
                      <option value="other" disabled>I identify as Male (Access Restricted)</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-[#111a26] hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-black shadow-sm transition mt-6">
                    Send OTP Code
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <p className="text-slate-500 text-xs text-center">Enter the 4-digit code sent to your phone to finalize verification.</p>
                  <div className="flex gap-2 justify-center">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpInput(e.target.value, idx)}
                        className="h-12 w-12 border border-slate-200 rounded-xl text-center font-bold text-lg focus:outline-none focus:ring-1 focus:ring-[#2164c5]"
                        title={`OTP digit ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button onClick={verifyOTPAndLogin} className="w-full bg-brand-500 hover:bg-brand-700 text-white rounded-xl py-3 text-xs font-black shadow-sm transition">
                    Confirm OTP & Enter
                  </button>
                  <button onClick={() => setAuthStep(1)} className="w-full text-slate-400 hover:underline text-xs font-bold text-center block">
                    Go Back
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* 2. Job Application Modal */}
      {
        isApplyModalOpen && applyOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative my-8">
              <button onClick={() => setIsApplyModalOpen(false)} className="absolute right-5 top-5 text-slate-400 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4">
                <h3 className="text-2xl font-black text-slate-900">Apply for Role</h3>
                <p className="text-brand-700 font-bold text-sm mt-0.5">{applyOpp.title} - {applyOpp.company}</p>
              </div>

              {/* 1-Click Auto fill active badge */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-left text-xs mb-6">
                <span className="font-bold text-green-800 block mb-1">🎉 SheReDefine 1-Click Auto-Fill Active</span>
                <p className="text-green-700 font-medium">
                  We've automatically filled this company form from your profile based on your <strong>{currentUser.category === 'fresh' ? 'Fresher' : currentUser.category === 'break' ? 'Career Break' : 'Late Start'}</strong> focus to save you time.
                </p>
              </div>

              <form onSubmit={submitApplication} className="space-y-5 text-left">
                {/* Basic Details in Modal */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">First Name</label>
                    <input
                      type="text"
                      required
                      value={applyForm.firstName || ""}
                      onChange={(e) => setApplyForm({ ...applyForm, firstName: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Last Name</label>
                    <input
                      type="text"
                      required
                      value={applyForm.lastName || ""}
                      onChange={(e) => setApplyForm({ ...applyForm, lastName: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={applyForm.phone || ""}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Email Address (Read-only)</label>
                    <input
                      type="email"
                      required
                      value={currentUser.email}
                      readOnly
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                {/* dynamic fields preview panel */}
                <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50 space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase border-b pb-1">Hiring Form Fields Requested By Company</p>

                  {currentUser.category === "fresh" && (
                    <div className="text-xs space-y-2 text-slate-600 font-medium">
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Education Details</span>
                        <p className="text-slate-800">
                          {currentUser.profileDetails?.education?.qualification} in {currentUser.profileDetails?.education?.course} ({currentUser.profileDetails?.education?.college}) | CGPA: {currentUser.profileDetails?.education?.cgpa || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Skills</span>
                        <p className="text-slate-800">Tech: {currentUser.profileDetails?.skills?.technicalSkills || "None listed"} | Soft: {currentUser.profileDetails?.skills?.softSkills || "None listed"}</p>
                      </div>
                      {currentUser.profileDetails?.projects?.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-400 block text-[9px] uppercase">Submitted Projects ({currentUser.profileDetails.projects.length})</span>
                          <p className="text-slate-800 truncate">{currentUser.profileDetails.projects.map(p => p.title).join(", ")}</p>
                        </div>
                      )}
                      {currentUser.profileDetails?.previousExperience?.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-400 block text-[9px] uppercase">Prior Work Experience / Internships ({currentUser.profileDetails.previousExperience.length})</span>
                          <p className="text-slate-800 truncate">{currentUser.profileDetails.previousExperience.map(e => `${e.designation} at ${e.companyName}`).join(", ")}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentUser.category === "break" && (
                    <div className="text-xs space-y-2 text-slate-600 font-medium">
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Career Break Duration</span>
                        <p className="text-slate-800">
                          {currentUser.profileDetails?.careerBreak?.startDate} to {currentUser.profileDetails?.careerBreak?.endDate || "Present"} ({currentUser.profileDetails?.careerBreak?.currentlyActive === 'Yes' ? 'Active' : 'Completed'})
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Break Reason & Activities</span>
                        <p className="text-slate-800">
                          Reason: {currentUser.profileDetails?.careerBreak?.reasonForBreak?.map(r => r === "Other" && currentUser.profileDetails?.careerBreak?.otherReason ? `Other (${currentUser.profileDetails.careerBreak.otherReason})` : r).join(", ") || "None"} | Did: {currentUser.profileDetails?.careerBreak?.duringBreak?.join(", ") || "None"}
                        </p>
                      </div>
                      {currentUser.profileDetails?.previousExperience?.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-400 block text-[9px] uppercase">Prior Work Experience</span>
                          <p className="text-slate-800 truncate">
                            {currentUser.profileDetails.previousExperience.map(e => `${e.designation} at ${e.companyName}`).join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentUser.category === "switch" && (
                    <div className="text-xs space-y-2 text-slate-600 font-medium">
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Current Situation</span>
                        <p className="text-slate-800">{currentUser.profileDetails?.currentSituation}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 block text-[9px] uppercase">Professional Experience Summary</span>
                        <p className="text-slate-800">
                          {currentUser.profileDetails?.education?.qualification || "None"} | {currentUser.profileDetails?.education?.course || "No designation"} ({currentUser.profileDetails?.education?.specialization || "0"} Years)
                        </p>
                      </div>
                      {currentUser.profileDetails?.informalExperience?.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-400 block text-[9px] uppercase">Informal / Life Experience</span>
                          <p className="text-slate-800 truncate">
                            {currentUser.profileDetails.informalExperience.map(e => e.activityName).join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prefilled Links */}
                  {currentUser.profileDetails?.socialLinks && (
                    <div className="pt-2 border-t border-slate-200 text-[10px] font-semibold text-slate-500">
                      <span className="font-bold text-slate-400 block text-[9px] uppercase mb-1">Prefilled Links</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentUser.profileDetails.socialLinks.linkedin && <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">LinkedIn</span>}
                        {currentUser.profileDetails.socialLinks.github && <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200">GitHub</span>}
                        {currentUser.profileDetails.socialLinks.portfolio && <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100">Portfolio</span>}
                        {currentUser.profileDetails.socialLinks.instagram && <span className="bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded border border-pink-100">Instagram</span>}
                        {currentUser.profileDetails.socialLinks.facebook && <span className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-100">Facebook</span>}
                        {(currentUser.profileDetails.socialLinks.customLinks || []).map((l, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">{l.label}</span>
                        ))}
                        {!currentUser.profileDetails.socialLinks.linkedin &&
                          !currentUser.profileDetails.socialLinks.github &&
                          !currentUser.profileDetails.socialLinks.portfolio &&
                          !currentUser.profileDetails.socialLinks.instagram &&
                          !currentUser.profileDetails.socialLinks.facebook &&
                          (!currentUser.profileDetails.socialLinks.customLinks || currentUser.profileDetails.socialLinks.customLinks.length === 0) && (
                            <span className="text-slate-450 italic">None provided</span>
                          )}
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-brand-650 font-bold block pt-1 border-t border-slate-200">
                    ℹ️ Need to edit? You can update these details anytime from your User Profile page.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Upload Resume PDF</label>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs">📄</span>
                    <input
                      type="text"
                      required
                      value={applyForm.resumeName || ""}
                      onChange={(e) => setApplyForm({ ...applyForm, resumeName: e.target.value })}
                      placeholder="resume.pdf"
                      className="flex-grow border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none"
                    />
                    <label className="cursor-pointer bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-700 transition">
                      Upload
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => setApplyForm({ ...applyForm, resumeName: e.target.files[0]?.name || "resume.pdf" })}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Cover Note (Why matches this stage?)</label>
                  <textarea
                    required
                    placeholder="Provide a brief cover note summarizing your transition, break details, or late start context..."
                    value={applyForm.coverNote}
                    onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs h-20 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                  />
                </div>

                <button type="submit" className="w-full bg-[#2164c5] hover:bg-blue-700 text-white rounded-xl py-3 text-xs font-black shadow-sm transition mt-6">
                  Submit 1-Click Application
                </button>
              </form>
            </div>
          </div>
        )
      }

      {/* 2.5 Recruiter Candidate Application Review Modal */}
      {
        selectedAppDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative my-8 text-left">
              <button onClick={() => setSelectedAppDetails(null)} className="absolute right-5 top-5 text-slate-400 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 border-b pb-4">
                <span className="bg-brand-550/10 text-brand-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-orange-100/60 tracking-wider shadow-xs mb-2 inline-block">
                  Hiring Form Submission
                </span>
                <h3 className="text-2xl font-black text-slate-900">Application Form Details</h3>
                <p className="text-slate-500 font-bold text-sm mt-0.5">Applied to: <span className="text-brand-600">{selectedAppDetails.opportunityTitle}</span> ({selectedAppDetails.company})</p>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {/* Section A: Candidate Profile Summary */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm border-l-2 border-brand-500 pl-2">Candidate Profile</h4>
                  <div className="grid gap-4 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 block uppercase text-[9px]">Full Name</span>
                      <span className="font-bold text-slate-800 text-sm">{selectedAppDetails.candidateName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block uppercase text-[9px]">Email Address</span>
                      <span className="font-semibold text-slate-800">{selectedAppDetails.email}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block uppercase text-[9px]">Mobile Number</span>
                      <span className="font-semibold text-slate-800">{selectedAppDetails.phone || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 block uppercase text-[9px]">Gender / DOB</span>
                      <span className="font-semibold text-slate-800">
                        {selectedAppDetails.submittedDetails?.basicInfo?.gender || "Female"} {selectedAppDetails.submittedDetails?.basicInfo?.dob ? `(DOB: ${selectedAppDetails.submittedDetails.basicInfo.dob})` : ""}
                      </span>
                    </div>
                  </div>
                  {selectedAppDetails.submittedDetails?.aboutMe && (
                    <div className="pt-2 border-t text-xs">
                      <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">About Me / Bio</span>
                      <p className="text-slate-650 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-200">{selectedAppDetails.submittedDetails.aboutMe}</p>
                    </div>
                  )}
                  {selectedAppDetails.submittedDetails?.socialLinks && (
                    <div className="pt-2.5 border-t text-xs text-left">
                      <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1.5">Social & Professional Links</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedAppDetails.submittedDetails.socialLinks.linkedin && (
                          <a href={selectedAppDetails.submittedDetails.socialLinks.linkedin} target="_blank" rel="noreferrer" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-2.5 py-1 rounded border border-blue-200 text-[10px] transition">
                            LinkedIn
                          </a>
                        )}
                        {selectedAppDetails.submittedDetails.socialLinks.github && (
                          <a href={selectedAppDetails.submittedDetails.socialLinks.github} target="_blank" rel="noreferrer" className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold px-2.5 py-1 rounded border border-slate-300 text-[10px] transition">
                            GitHub
                          </a>
                        )}
                        {selectedAppDetails.submittedDetails.socialLinks.portfolio && (
                          <a href={selectedAppDetails.submittedDetails.socialLinks.portfolio} target="_blank" rel="noreferrer" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold px-2.5 py-1 rounded border border-indigo-200 text-[10px] transition">
                            Portfolio
                          </a>
                        )}
                        {selectedAppDetails.submittedDetails.socialLinks.instagram && (
                          <a href={selectedAppDetails.submittedDetails.socialLinks.instagram} target="_blank" rel="noreferrer" className="bg-pink-50 text-pink-700 hover:bg-pink-100 font-bold px-2.5 py-1 rounded border border-pink-200 text-[10px] transition">
                            Instagram
                          </a>
                        )}
                        {selectedAppDetails.submittedDetails.socialLinks.facebook && (
                          <a href={selectedAppDetails.submittedDetails.socialLinks.facebook} target="_blank" rel="noreferrer" className="bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold px-2.5 py-1 rounded border border-blue-200 text-[10px] transition">
                            Facebook
                          </a>
                        )}
                        {(selectedAppDetails.submittedDetails.socialLinks.customLinks || []).map((l, idx) => (
                          <a key={idx} href={l.url} target="_blank" rel="noreferrer" className="bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold px-2.5 py-1 rounded border border-slate-200 text-[10px] transition">
                            {l.label}
                          </a>
                        ))}
                        {!selectedAppDetails.submittedDetails.socialLinks.linkedin &&
                          !selectedAppDetails.submittedDetails.socialLinks.github &&
                          !selectedAppDetails.submittedDetails.socialLinks.portfolio &&
                          !selectedAppDetails.submittedDetails.socialLinks.instagram &&
                          !selectedAppDetails.submittedDetails.socialLinks.facebook &&
                          (!selectedAppDetails.submittedDetails.socialLinks.customLinks || selectedAppDetails.submittedDetails.socialLinks.customLinks.length === 0) && (
                            <span className="text-slate-400 italic">No links provided</span>
                          )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section B: Category Specific Details */}
                {selectedAppDetails.submittedDetails?.category === "fresh" && (
                  <div className="space-y-4">
                    {/* Education */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-indigo-500 pl-2">🎓 Education Details</h4>
                      <div className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-slate-700">
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">Qualification / Course</span>
                          <span>{selectedAppDetails.submittedDetails.education?.qualification || "N/A"} ({selectedAppDetails.submittedDetails.education?.course || "N/A"})</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">College / University</span>
                          <span>{selectedAppDetails.submittedDetails.education?.college || "N/A"}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">CGPA / Roll Number</span>
                          <span>CGPA: {selectedAppDetails.submittedDetails.education?.cgpa || "N/A"} | Roll: {selectedAppDetails.submittedDetails.education?.rollNumber || "N/A"}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">Course Type / Years</span>
                          <span>{selectedAppDetails.submittedDetails.education?.courseType || "Full-time"} ({selectedAppDetails.submittedDetails.education?.startYear || "N/A"} - {selectedAppDetails.submittedDetails.education?.endYear || "N/A"})</span>
                        </div>
                      </div>
                      {selectedAppDetails.submittedDetails.education?.description && (
                        <div className="text-xs pt-2 border-t">
                          <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">Details</span>
                          <p className="text-slate-600 font-medium">{selectedAppDetails.submittedDetails.education.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-indigo-500 pl-2">🛠️ Skills & Languages</h4>
                      <div className="text-xs font-medium space-y-2 text-slate-700">
                        <p><strong>Technical Skills:</strong> {selectedAppDetails.submittedDetails.skills?.technicalSkills || "None listed"}</p>
                        <p><strong>Soft Skills:</strong> {selectedAppDetails.submittedDetails.skills?.softSkills || "None listed"}</p>
                        <p><strong>Languages Known:</strong> {selectedAppDetails.submittedDetails.skills?.languages || "None listed"} (Proficiency: {selectedAppDetails.submittedDetails.skills?.proficiency || "Intermediate"})</p>
                      </div>
                    </div>

                    {/* Projects */}
                    {selectedAppDetails.submittedDetails.projects?.length > 0 && (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                        <h4 className="font-bold text-slate-800 text-sm border-l-2 border-indigo-500 pl-2">💻 Projects</h4>
                        <div className="space-y-3">
                          {selectedAppDetails.submittedDetails.projects.map((proj, idx) => (
                            <div key={idx} className="p-3 bg-white border rounded-xl text-xs space-y-1">
                              <p className="font-bold text-slate-800">{proj.title}</p>
                              <p className="text-slate-650">{proj.description}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">Tech: {proj.technologies} | Duration: {proj.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Prior Work Experience */}
                    {selectedAppDetails.submittedDetails.previousExperience?.length > 0 && (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                        <h4 className="font-bold text-slate-800 text-sm border-l-2 border-indigo-500 pl-2">💼 Prior Work Experience & Internships</h4>
                        <div className="space-y-3">
                          {selectedAppDetails.submittedDetails.previousExperience.map((exp, idx) => (
                            <div key={idx} className="p-3 bg-white border rounded-xl text-xs space-y-1 text-left">
                              <p className="font-bold text-slate-800">{exp.designation} at {exp.companyName}</p>
                              <p className="text-slate-500 font-semibold">{exp.industry} | {exp.employmentType} ({exp.startDate} - {exp.endDate})</p>
                              <p className="text-slate-650 mt-1"><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                              {exp.achievements && <p className="text-slate-650"><strong>Achievements:</strong> {exp.achievements}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedAppDetails.submittedDetails?.category === "break" && (
                  <div className="space-y-4">
                    {/* Career Break */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-rose-500 pl-2">👩 Career Break Details</h4>
                      <div className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-slate-700">
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">Break Duration</span>
                          <span>{selectedAppDetails.submittedDetails.careerBreak?.startDate} to {selectedAppDetails.submittedDetails.careerBreak?.endDate || "Present"}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px]">Currently Active Break?</span>
                          <span>{selectedAppDetails.submittedDetails.careerBreak?.currentlyActive || "No"}</span>
                        </div>
                      </div>
                      <div className="text-xs pt-2 border-t">
                        <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">Reason for Break</span>
                        <p className="text-slate-800 font-semibold">
                          {selectedAppDetails.submittedDetails.careerBreak?.reasonForBreak?.map(r => r === "Other" && selectedAppDetails.submittedDetails.careerBreak?.otherReason ? `Other (${selectedAppDetails.submittedDetails.careerBreak.otherReason})` : r).join(", ") || "None declared"}
                        </p>
                      </div>
                      <div className="text-xs pt-2 border-t">
                        <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">Activities During Break</span>
                        <p className="text-slate-800 font-semibold">{selectedAppDetails.submittedDetails.careerBreak?.duringBreak?.join(", ") || "None declared"}</p>
                      </div>
                    </div>

                    {/* Previous Work Experience */}
                    {selectedAppDetails.submittedDetails.previousExperience?.length > 0 && (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                        <h4 className="font-bold text-slate-800 text-sm border-l-2 border-rose-500 pl-2">💼 Previous Work Experience</h4>
                        <div className="space-y-3">
                          {selectedAppDetails.submittedDetails.previousExperience.map((exp, idx) => (
                            <div key={idx} className="p-3 bg-white border rounded-xl text-xs space-y-1">
                              <p className="font-bold text-slate-800">{exp.designation} at {exp.companyName}</p>
                              <p className="text-slate-500 font-semibold">{exp.industry} | {exp.employmentType} ({exp.startDate} - {exp.endDate})</p>
                              <p className="text-slate-650 mt-1"><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                              {exp.achievements && <p className="text-slate-650"><strong>Achievements:</strong> {exp.achievements}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Breakdown */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-rose-500 pl-2">🛠️ Up-skilled & Refreshed Skills</h4>
                      <div className="text-xs font-semibold space-y-2 text-slate-700">
                        <p><strong>Skills Prior to Break:</strong> {selectedAppDetails.submittedDetails.skillsBreak?.existingSkills || "None"}</p>
                        <p><strong>Refreshed Skills (Recently Learned):</strong> {selectedAppDetails.submittedDetails.skillsBreak?.refreshedSkills || "None"}</p>
                        <p><strong>Skills to Improve:</strong> {selectedAppDetails.submittedDetails.skillsBreak?.skillsToImprove || "None"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAppDetails.submittedDetails?.category === "switch" && (
                  <div className="space-y-4">
                    {/* Current Situation */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-amber-500 pl-2">👩💼 Lifecycle Context</h4>
                      <div className="text-xs">
                        <span className="font-bold text-slate-400 block uppercase text-[9px]">Current Situation Description</span>
                        <span className="font-bold text-slate-800 text-sm">{selectedAppDetails.submittedDetails.currentSituation}</span>
                      </div>
                      {selectedAppDetails.submittedDetails.journey && (
                        <div className="pt-2 border-t text-xs">
                          <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">Career Journey Description</span>
                          <p className="text-slate-650 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-200">{selectedAppDetails.submittedDetails.journey}</p>
                        </div>
                      )}
                    </div>

                    {/* Informal/Life Experience */}
                    {selectedAppDetails.submittedDetails.informalExperience?.length > 0 && (
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                        <h4 className="font-bold text-slate-800 text-sm border-l-2 border-amber-500 pl-2">🏡 Life Experience / Informal Leadership</h4>
                        <div className="space-y-3">
                          {selectedAppDetails.submittedDetails.informalExperience.map((inf, idx) => (
                            <div key={idx} className="p-3 bg-white border rounded-xl text-xs space-y-1">
                              <p className="font-bold text-slate-800">{inf.activityName}</p>
                              <p className="text-slate-500 font-semibold">Duration: {inf.duration} | Skills Used: {inf.skillsUsed}</p>
                              <p className="text-slate-650 mt-1">{inf.responsibilities}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Assessment */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm border-l-2 border-amber-500 pl-2">⭐ Skills Self-Assessment</h4>
                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1.5">Functional Competencies</span>
                          <div className="space-y-1 font-semibold text-slate-700">
                            {Object.entries(selectedAppDetails.submittedDetails.skillsAssessment?.existingSkills || {}).map(([s, val]) => (
                              <div key={s} className="flex justify-between border-b pb-0.5">
                                <span>{s}</span>
                                <span className="text-amber-550">{"⭐".repeat(val)} ({val}/5)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1.5">Digital Literacy</span>
                          <div className="space-y-1 font-semibold text-slate-700">
                            {Object.entries(selectedAppDetails.submittedDetails.skillsAssessment?.digitalSkills || {}).map(([s, val]) => (
                              <div key={s} className="flex justify-between border-b pb-0.5">
                                <span>{s}</span>
                                <span className="text-amber-550">{"⭐".repeat(val)} ({val}/5)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section C: Cover Note & Resume */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm border-l-2 border-slate-600 pl-2">📝 Cover Note & Resume</h4>
                  <div className="text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-400 block uppercase text-[9px] mb-1">Cover Note</span>
                      <p className="text-slate-650 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-200">{selectedAppDetails.coverNote || "No cover note provided."}</p>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-slate-200 p-3 rounded-xl">
                      <span className="font-semibold text-slate-700">📄 Submitted Resume: <strong>{selectedAppDetails.resume || "resume.pdf"}</strong></span>
                      <button onClick={() => alert("Downloading/viewing candidate resume PDF...")} className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setSelectedAppDetails(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-xs font-black shadow-sm transition mt-6">
                Close Application Details
              </button>
            </div>
          </div>
        )
      }

      {/* 3. Create Opportunity Modal */}
      {
        isHostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative my-8">
              <button onClick={() => { setIsHostModalOpen(false); setHostFormStep(1); }} className="absolute right-5 top-5 text-slate-400 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 text-center">
                <h3 className="text-2xl font-black text-slate-900">Host New Opportunity</h3>
                <p className="text-slate-400 text-xs">Verify your organization and post curated listings.</p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 px-4">
                {[
                  { step: 1, label: "Organization" },
                  { step: 2, label: "General Details" },
                  { step: 3, label: "Custom Fields" }
                ].map((item, idx) => (
                  <React.Fragment key={item.step}>
                    {idx > 0 && <div className={`flex-1 h-0.5 mx-2 ${hostFormStep >= item.step ? 'bg-brand-500' : 'bg-slate-200'}`} />}
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        hostFormStep === item.step 
                          ? 'bg-brand-500 text-white ring-4 ring-brand-100' 
                          : hostFormStep > item.step 
                            ? 'bg-brand-500 text-white' 
                            : 'bg-slate-100 text-slate-400'
                      }`}>
                        {item.step}
                      </div>
                      <span className={`text-[10px] font-bold mt-1 uppercase ${hostFormStep === item.step ? 'text-brand-500' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={submitNewOpportunity} className="space-y-6">
                
                {/* Step 1: Org Details */}
                {hostFormStep === 1 && (
                  <div className="space-y-4 animate-fade-in-up text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Host Organization Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Salesforce"
                          value={hostForm.company}
                          onChange={(e) => setHostForm({ ...hostForm, company: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Your Relationship to Org</label>
                        <select
                          value={hostForm.posterRelationship}
                          onChange={(e) => setHostForm({ ...hostForm, posterRelationship: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                          <option value="HR">HR Professional</option>
                          <option value="Founder">Founder / CEO</option>
                          <option value="Recruiter">Recruiter</option>
                          <option value="Volunteer">Volunteer / Organizer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Host Verification Proof</label>
                      <input
                        type="text"
                        required
                        placeholder="LinkedIn company URL, corporate email domain, or doc link"
                        value={hostForm.hostVerificationProof}
                        onChange={(e) => setHostForm({ ...hostForm, hostVerificationProof: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-400">Verifying authority ensures only safe, valid opportunities go live.</p>
                    </div>

                    <div className="border-t border-slate-100 my-4 pt-3">
                      <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Primary Contact Person</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Anjali Nair"
                            value={hostForm.contactPerson}
                            onChange={(e) => setHostForm({ ...hostForm, contactPerson: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. anjali@salesforce.com"
                              value={hostForm.contactEmail}
                              onChange={(e) => setHostForm({ ...hostForm, contactEmail: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Phone Number</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +91 98765 43210"
                              value={hostForm.contactPhone}
                              onChange={(e) => setHostForm({ ...hostForm, contactPhone: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: General Details */}
                {hostFormStep === 2 && (
                  <div className="space-y-4 animate-fade-in-up text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Opportunity Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Senior Java Developer"
                          value={hostForm.title}
                          onChange={(e) => setHostForm({ ...hostForm, title: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Opportunity Type</label>
                        <select
                          value={hostForm.type}
                          onChange={(e) => setHostForm({ ...hostForm, type: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                          <option value="JOB">Job</option>
                          <option value="INTERNSHIP">Internship</option>
                          <option value="COMPETITION">Competition / Hackathon</option>
                          <option value="MENTORSHIP">Mentorship Session</option>
                          <option value="COURSES">Course / Workshop / Webinar</option>
                          <option value="CLUB">Club & Community</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Delivery Mode</label>
                        <select
                          value={hostForm.mode}
                          onChange={(e) => setHostForm({ ...hostForm, mode: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                          <option value="Online">Online / Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Offline">Offline / In-person</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Location City/Info</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Remote, or Bangalore"
                          value={hostForm.location}
                          onChange={(e) => setHostForm({ ...hostForm, location: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Application Deadline</label>
                        <input
                          type="date"
                          required
                          value={hostForm.deadline}
                          onChange={(e) => setHostForm({ ...hostForm, deadline: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Application Process</label>
                        <select
                          value={hostForm.applicationLink === "in-platform" ? "in-platform" : "external"}
                          onChange={(e) => setHostForm({ ...hostForm, applicationLink: e.target.value === "in-platform" ? "in-platform" : "" })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                          <option value="in-platform">In-platform Apply (Default)</option>
                          <option value="external">External Application URL</option>
                        </select>
                      </div>
                    </div>

                    {hostForm.applicationLink !== "in-platform" && (
                      <div className="space-y-1 animate-fade-in-up">
                        <label className="text-xs font-bold text-slate-500 uppercase">External Application Link</label>
                        <input
                          type="url"
                          required
                          placeholder="e.g. https://careers.salesforce.com/job/123"
                          value={hostForm.applicationLink}
                          onChange={(e) => setHostForm({ ...hostForm, applicationLink: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase block">Target Career / Life Stages (Curated Filter)</label>
                      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        {[
                          { id: "student", label: "Students (College girls)" },
                          { id: "early-career", label: "Early-career (0-2 yrs exp)" },
                          { id: "career-break", label: "Career-break returner" },
                          { id: "senior", label: "Senior professional" }
                        ].map(stage => (
                          <div key={stage.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`stage-${stage.id}`}
                              checked={hostForm.lifeStageTags.includes(stage.id)}
                              onChange={() => toggleLifeStageTag(stage.id)}
                              className="h-4 w-4 rounded text-brand-500 border-slate-300 focus:ring-brand-500 cursor-pointer"
                            />
                            <label htmlFor={`stage-${stage.id}`} className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                              {stage.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Short Description (1-2 lines)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hiring female developers returning to tech after maternity leave."
                        value={hostForm.shortDescription}
                        onChange={(e) => setHostForm({ ...hostForm, shortDescription: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Description / Details</label>
                      <textarea
                        required
                        placeholder="Provide deep details about expectations, role responsibilities, training curriculum..."
                        value={hostForm.description}
                        onChange={(e) => setHostForm({ ...hostForm, description: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-24 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Dynamic Category Fields */}
                {hostFormStep === 3 && (
                  <div className="space-y-4 animate-fade-in-up text-left max-h-[350px] overflow-y-auto pr-2">
                    <h4 className="text-xs font-black text-slate-700 border-b border-slate-100 pb-2 mb-2 uppercase tracking-wide">
                      {hostForm.type} Custom Attributes
                    </h4>

                    {/* JOB TYPE FIELDS */}
                    {hostForm.type === "JOB" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Employment Type</label>
                            <select
                              value={hostForm.jobEmploymentType}
                              onChange={(e) => setHostForm({ ...hostForm, jobEmploymentType: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="full-time">Full-time</option>
                              <option value="part-time">Part-time</option>
                              <option value="contract">Contract</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Experience Level Required</label>
                            <select
                              value={hostForm.jobExperienceLevel}
                              onChange={(e) => setHostForm({ ...hostForm, jobExperienceLevel: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="fresher">Fresher (0-1 yr)</option>
                              <option value="1-3 yrs">Junior (1-3 yrs)</option>
                              <option value="3-5 yrs">Mid-level (3-5 yrs)</option>
                              <option value="senior">Senior (5+ yrs)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Salary Range</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. ₹8-12 LPA, or Not Disclosed"
                              value={hostForm.jobSalaryRange}
                              onChange={(e) => setHostForm({ ...hostForm, jobSalaryRange: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Career-Break Friendly?</label>
                            <select
                              value={hostForm.jobCareerBreakFriendly}
                              onChange={(e) => setHostForm({ ...hostForm, jobCareerBreakFriendly: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="yes">Yes (Returners highly welcome)</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Number of Openings</label>
                            <input
                              type="number"
                              required
                              value={hostForm.seats}
                              onChange={(e) => setHostForm({ ...hostForm, seats: Number(e.target.value) })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Eligibility Criteria</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. B.E / B.Tech or equivalent"
                              value={hostForm.eligibility}
                              onChange={(e) => setHostForm({ ...hostForm, eligibility: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Required Skills (Comma separated tags)</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. React, JavaScript, REST APIs"
                            value={hostForm.jobRequiredSkills}
                            onChange={(e) => setHostForm({ ...hostForm, jobRequiredSkills: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* INTERNSHIP TYPE FIELDS */}
                    {hostForm.type === "INTERNSHIP" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Duration (weeks/months)</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 6 Months"
                              value={hostForm.internshipDuration}
                              onChange={(e) => setHostForm({ ...hostForm, internshipDuration: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Monthly Stipend</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. ₹25,000/mo, or Unpaid"
                              value={hostForm.internshipStipend}
                              onChange={(e) => setHostForm({ ...hostForm, internshipStipend: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Hours per Week</label>
                            <select
                              value={hostForm.internshipHoursPerWeek}
                              onChange={(e) => setHostForm({ ...hostForm, internshipHoursPerWeek: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="full-time">Full-time (40 hrs/wk)</option>
                              <option value="part-time">Part-time (20 hrs/wk)</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Certificate Provided?</label>
                            <select
                              value={hostForm.internshipCertificate}
                              onChange={(e) => setHostForm({ ...hostForm, internshipCertificate: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Conversion to Full-time offer?</label>
                            <select
                              value={hostForm.internshipConversionOffer}
                              onChange={(e) => setHostForm({ ...hostForm, internshipConversionOffer: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="yes">Yes (PPO likely)</option>
                              <option value="no">No</option>
                              <option value="maybe">Maybe / Performance-based</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Openings Count</label>
                            <input
                              type="number"
                              required
                              value={hostForm.seats}
                              onChange={(e) => setHostForm({ ...hostForm, seats: Number(e.target.value) })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Eligibility Details</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 3rd year female B.Tech/BCA students, basics of Java"
                            value={hostForm.internshipEligibility}
                            onChange={(e) => setHostForm({ ...hostForm, internshipEligibility: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* COMPETITION TYPE FIELDS */}
                    {hostForm.type === "COMPETITION" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Participation Format</label>
                            <select
                              value={hostForm.competitionFormat}
                              onChange={(e) => setHostForm({ ...hostForm, competitionFormat: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="solo">Solo Participation</option>
                              <option value="team">Team Participation</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Max Team Size</label>
                            <input
                              type="number"
                              required
                              disabled={hostForm.competitionFormat === "solo"}
                              value={hostForm.competitionFormat === "solo" ? 1 : hostForm.competitionMaxTeamSize}
                              onChange={(e) => setHostForm({ ...hostForm, competitionMaxTeamSize: Number(e.target.value) })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Theme / Domain</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. AI for Health, FinTech"
                              value={hostForm.competitionTheme}
                              onChange={(e) => setHostForm({ ...hostForm, competitionTheme: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Registration Fee</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Free, or ₹200"
                              value={hostForm.competitionRegistrationFee}
                              onChange={(e) => setHostForm({ ...hostForm, competitionRegistrationFee: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Prize Details</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Cash prize of ₹2 Lakhs + Mentorship"
                              value={hostForm.competitionPrizeDetails}
                              onChange={(e) => setHostForm({ ...hostForm, competitionPrizeDetails: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Competition Timeline</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Coding: Oct 1-3, Finals: Oct 10"
                              value={hostForm.competitionTimeline}
                              onChange={(e) => setHostForm({ ...hostForm, competitionTimeline: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Eligibility Profile</label>
                            <select
                              value={hostForm.competitionEligibility}
                              onChange={(e) => setHostForm({ ...hostForm, competitionEligibility: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="student">Student only</option>
                              <option value="professional">Professional only</option>
                              <option value="open to all">Open to all genders/profiles</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Judging Rubric URL (Optional)</label>
                            <input
                              type="url"
                              placeholder="e.g. https://domain.com/rubric.pdf"
                              value={hostForm.competitionRubricLink}
                              onChange={(e) => setHostForm({ ...hostForm, competitionRubricLink: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MENTORSHIP TYPE FIELDS */}
                    {hostForm.type === "MENTORSHIP" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Mentor Expertise Domain</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Career Transition, System Design"
                              value={hostForm.mentorshipExpertise}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipExpertise: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Mentor's LinkedIn Profile</label>
                            <input
                              type="url"
                              required
                              placeholder="https://linkedin.com/in/username"
                              value={hostForm.mentorshipLinkedIn}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipLinkedIn: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Session Format</label>
                            <select
                              value={hostForm.mentorshipFormat}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipFormat: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="1:1">1:Private Mentoring</option>
                              <option value="group">Group Coaching / Cohort</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Duration & Frequency</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 4 sessions over 2 months"
                              value={hostForm.mentorshipDuration}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipDuration: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Pricing / Fee</label>
                            <select
                              value={hostForm.mentorshipPaidOrFree}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipPaidOrFree: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="Free">Free</option>
                              <option value="Paid">Paid / Charged</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Selection Process</label>
                            <select
                              value={hostForm.mentorshipSelectionProcess}
                              onChange={(e) => setHostForm({ ...hostForm, mentorshipSelectionProcess: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="open">Open (First come basis)</option>
                              <option value="mentor-select">Application Review (Mentor selects)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Who is this mentorship session for?</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Women in early QA roles looking to switch to Dev"
                            value={hostForm.mentorshipWhoFor}
                            onChange={(e) => setHostForm({ ...hostForm, mentorshipWhoFor: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Mentor's Brief Bio / Credentials</label>
                          <textarea
                            required
                            placeholder="Briefly state your current role, accomplishments, or teaching background..."
                            value={hostForm.mentorshipBio}
                            onChange={(e) => setHostForm({ ...hostForm, mentorshipBio: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-20 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* COURSES / WORKSHOPS / WEBINARS TYPE FIELDS */}
                    {(hostForm.type === "COURSES" || hostForm.type === "WEBINAR" || hostForm.type === "WORKSHOP" || hostForm.type === "TRAINING") && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Instructor Credentials</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Google Lead Engineer, 12 yrs exp"
                              value={hostForm.courseInstructorCredentials}
                              onChange={(e) => setHostForm({ ...hostForm, courseInstructorCredentials: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Delivery Mode</label>
                            <select
                              value={hostForm.courseMode}
                              onChange={(e) => setHostForm({ ...hostForm, courseMode: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="live">Live Interactive Sessions</option>
                              <option value="recorded">Pre-recorded Cohort</option>
                              <option value="self-paced">Self-paced course</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Duration (total hours/weeks)</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 15 hours total"
                              value={hostForm.courseDuration}
                              onChange={(e) => setHostForm({ ...hostForm, courseDuration: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Price</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Free, or ₹1,499"
                              value={hostForm.coursePrice}
                              onChange={(e) => setHostForm({ ...hostForm, coursePrice: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Certificate on Completion?</label>
                            <select
                              value={hostForm.courseCertificate}
                              onChange={(e) => setHostForm({ ...hostForm, courseCertificate: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="yes">Yes (Accredited)</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Schedule Dates/Times</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Every Saturday 10:00 AM IST"
                              value={hostForm.courseSchedule}
                              onChange={(e) => setHostForm({ ...hostForm, courseSchedule: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Platform Link (Zoom, LMS, etc)</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Zoom Meet Link, or Teachable URL"
                              value={hostForm.coursePlatform}
                              onChange={(e) => setHostForm({ ...hostForm, coursePlatform: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Prerequisites</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Basics of Programming or None"
                              value={hostForm.coursePrerequisites}
                              onChange={(e) => setHostForm({ ...hostForm, coursePrerequisites: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CLUB & COMMUNITY TYPE FIELDS */}
                    {hostForm.type === "CLUB" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Community Focus / Theme</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Women Entrepreneurs Support"
                              value={hostForm.clubFocus}
                              onChange={(e) => setHostForm({ ...hostForm, clubFocus: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Membership Type</label>
                            <select
                              value={hostForm.clubMembershipType}
                              onChange={(e) => setHostForm({ ...hostForm, clubMembershipType: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="open">Open Community</option>
                              <option value="invite-only">Invite-Only Access</option>
                              <option value="application-based">Application / Approval Based</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Membership Fee</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Free, or ₹100/mo"
                              value={hostForm.clubFee}
                              onChange={(e) => setHostForm({ ...hostForm, clubFee: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Platform Platform Link</label>
                            <select
                              value={hostForm.clubPlatform}
                              onChange={(e) => setHostForm({ ...hostForm, clubPlatform: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer">
                              <option value="Discord">Discord Server</option>
                              <option value="Slack">Slack Workspace</option>
                              <option value="WhatsApp">WhatsApp Community</option>
                              <option value="in-app forum">In-app SheReDefine Group</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Activity Cadence</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Weekly meetups, monthly events"
                              value={hostForm.clubActivityCadence}
                              onChange={(e) => setHostForm({ ...hostForm, clubActivityCadence: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Max Member Cap</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 500 members, or No Limit"
                              value={hostForm.clubSizeCap}
                              onChange={(e) => setHostForm({ ...hostForm, clubSizeCap: e.target.value })}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Guidelines / Code of Conduct Link</label>
                          <input
                            type="url"
                            placeholder="e.g. https://domain.com/guidelines (optional)"
                            value={hostForm.clubGuidelinesLink}
                            onChange={(e) => setHostForm({ ...hostForm, clubGuidelinesLink: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* FEATURE GRADIENT SECTION */}
                    <div className="border-t border-slate-100 my-4 pt-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="host-featured"
                        checked={hostForm.featured}
                        onChange={(e) => setHostForm({ ...hostForm, featured: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                      />
                      <label htmlFor="host-featured" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                        Feature this listing (Show on Home & Featured section)
                      </label>
                    </div>

                    {hostForm.featured && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-fade-in-up">
                        <div className="space-y-2 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase block">Select Poster Gradient Theme</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: "tech-blue", label: "Modern Tech", class: "from-blue-600 via-blue-700 to-indigo-900" },
                              { id: "sunset-rose", label: "Sunset Rose", class: "from-rose-500 via-pink-600 to-orange-500" },
                              { id: "emerald-green", label: "Eco Emerald", class: "from-emerald-500 via-teal-600 to-teal-800" },
                              { id: "luxury-purple", label: "Royal Purple", class: "from-purple-700 via-violet-800 to-indigo-950" }
                            ].map(theme => (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() => setHostForm({ ...hostForm, posterTemplate: theme.id })}
                                className={`p-3 rounded-xl border text-center relative overflow-hidden transition h-14 ${hostForm.posterTemplate === theme.id ? "border-[#2164c5] ring-2 ring-blue-500/20" : "border-slate-250 hover:border-slate-350"
                                  }`}
                              >
                                <div className={`absolute inset-0 bg-gradient-to-br ${theme.class} opacity-85`}></div>
                                <span className="relative z-10 text-[10px] font-black text-white drop-shadow-sm">{theme.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase block">Or Custom Poster Image URL</label>
                          <input
                            type="url"
                            placeholder="e.g. https://images.unsplash.com/... (optional)"
                            value={hostForm.posterUrl || ""}
                            onChange={(e) => setHostForm({ ...hostForm, posterUrl: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step Navigation controls */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  {hostFormStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setHostFormStep(prev => prev - 1)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition text-sm">
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  
                  {hostFormStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (hostFormStep === 1) {
                          if (!hostForm.company || !hostForm.contactPerson || !hostForm.contactEmail || !hostForm.hostVerificationProof) {
                            alert("Please fill in Company Name, Relationship, Verification Proof, Contact Name, and Contact Email.");
                            return;
                          }
                        } else if (hostFormStep === 2) {
                          if (!hostForm.title || !hostForm.location || !hostForm.deadline || !hostForm.description || !hostForm.shortDescription) {
                            alert("Please fill in Title, Location, Deadline, Short Description, and Full Description.");
                            return;
                          }
                          if (hostForm.lifeStageTags.length === 0) {
                            alert("Please select at least one Target Career / Life Stage tag.");
                            return;
                          }
                        }
                        setHostFormStep(prev => prev + 1);
                      }}
                      className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition text-sm shadow-sm">
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition text-sm shadow-sm">
                      Submit Opportunity
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* 3.1 Edit Opportunity Modal */}
      {
        isEditOppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative my-8">
              <button onClick={() => { setIsEditOppModalOpen(false); setEditingOpp(null); }} className="absolute right-5 top-5 text-slate-400 hover:text-slate-850 p-1.5 rounded-full hover:bg-slate-100 transition">
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900">Edit Opportunity</h3>
                <p className="text-slate-400 text-xs">Update details for this role.</p>
              </div>

              <form onSubmit={submitEditedOpportunity} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Opportunity Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Frontend Engineer"
                      value={editOppForm.title}
                      onChange={(e) => setEditOppForm({ ...editOppForm, title: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Host Company</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salesforce"
                      value={editOppForm.company}
                      onChange={(e) => setEditOppForm({ ...editOppForm, company: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Opportunity Type</label>
                    <select
                      value={editOppForm.type}
                      onChange={(e) => setEditOppForm({ ...editOppForm, type: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer"
                      title="Opportunity type selection">
                      <option value="JOB">Job</option>
                      <option value="INTERNSHIP">Internship</option>
                      <option value="COMPETITION">Competition</option>
                      <option value="MENTORSHIP">Mentorship Session</option>
                      <option value="WEBINAR">Webinar</option>
                      <option value="WORKSHOP">Workshop</option>
                      <option value="TRAINING">Training / Class</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Target Life Stage</label>
                    <select
                      value={editOppForm.category}
                      onChange={(e) => setEditOppForm({ ...editOppForm, category: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer"
                      title="Opportunity category selection">
                      <option value="fresh">After Studies (Freshers)</option>
                      <option value="break">After Break (Returnships)</option>
                      <option value="switch">Late 30s switch / Swinger</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Delivery Mode</label>
                    <select
                      value={editOppForm.mode}
                      onChange={(e) => setEditOppForm({ ...editOppForm, mode: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white cursor-pointer"
                      title="Delivery mode selection">
                      <option value="Online">Online / Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Offline">Offline / In-person</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Remote, or Bangalore"
                      value={editOppForm.location}
                      onChange={(e) => setEditOppForm({ ...editOppForm, location: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Compensation / Price</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹60,000/mo, or Free"
                      value={editOppForm.price}
                      onChange={(e) => setEditOppForm({ ...editOppForm, price: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Application Deadline</label>
                    <input
                      type="date"
                      required
                      value={editOppForm.deadline}
                      onChange={(e) => setEditOppForm({ ...editOppForm, deadline: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Eligibility Criteria</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Women returning to work after min 2 yrs break"
                    value={editOppForm.eligibility}
                    onChange={(e) => setEditOppForm({ ...editOppForm, eligibility: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    required
                    placeholder="Provide details about the role, expectations, or training syllabus..."
                    value={editOppForm.description}
                    onChange={(e) => setEditOppForm({ ...editOppForm, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm h-28 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editOppForm.featured}
                    onChange={(e) => setEditOppForm({ ...editOppForm, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                  />
                  <label htmlFor="edit-featured" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                    Feature this listing
                  </label>
                </div>

                <button type="submit" className="w-full bg-brand-500 hover:bg-brand-700 text-white rounded-xl py-3 text-xs font-black shadow-sm transition mt-6">
                  Update Opportunity Details
                </button>
              </form>
            </div>
          </div>
        )
      }

      {/* 3.2 Candidate Profile Details Viewer Modal */}
      {
        candidateProfileToView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-fade-in-up text-left max-h-[90vh] overflow-y-auto">
              <button onClick={() => setCandidateProfileToView(null)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition">
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-6">
                <div className="h-16 w-16 bg-gradient-to-tr from-brand-500 to-orange-400 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-sm">
                  {candidateProfileToView.firstName ? candidateProfileToView.firstName.charAt(0) : "C"}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight font-sans">
                    {candidateProfileToView.firstName} {candidateProfileToView.lastName}
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold mt-0.5 font-sans">
                    @{candidateProfileToView.username} • {candidateProfileToView.email}
                  </p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-[9px] font-black uppercase rounded-full border border-orange-100">
                      {candidateProfileToView.category === "fresh" ? "Fresher" : candidateProfileToView.category === "break" ? "Career Break Returnee" : "Late 30s Switcher"}
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase rounded-full border border-emerald-100">
                      Verified Candidate
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 1. Basic Information */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    👤 Basic Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Full Name</span>
                      <span className="text-slate-800 font-black text-sm">{candidateProfileToView.firstName} {candidateProfileToView.lastName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Email Address</span>
                      <span className="text-slate-800 font-bold">{candidateProfileToView.email}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Username</span>
                      <span className="text-slate-600 font-semibold">@{candidateProfileToView.username}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Phone Number</span>
                      <span className="text-slate-800 font-bold">{candidateProfileToView.phone || "Not provided"}</span>
                    </div>
                  </div>
                  {candidateProfileToView.profileDetails?.aboutMe && (
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <span className="font-bold text-slate-400 uppercase text-[9px] block mb-1">Candidate Bio / Summary</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold bg-white p-3 rounded-xl border border-slate-150/40">
                        {candidateProfileToView.profileDetails.aboutMe}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Education Details */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    🎓 Education Details
                  </h4>
                  {candidateProfileToView.profileDetails?.education?.college ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-2 text-xs">
                      <div className="font-black text-slate-800 text-sm">
                        {candidateProfileToView.profileDetails.education.qualification} in {candidateProfileToView.profileDetails.education.course}
                        {candidateProfileToView.profileDetails.education.specialization && ` (${candidateProfileToView.profileDetails.education.specialization})`}
                      </div>
                      <div className="text-slate-500 font-semibold">
                        {candidateProfileToView.profileDetails.education.college}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-bold pt-1">
                        <span>Class: {candidateProfileToView.profileDetails.education.startYear || "N/A"} - {candidateProfileToView.profileDetails.education.endYear || "N/A"}</span>
                        <span>Type: {candidateProfileToView.profileDetails.education.courseType || "Full-time"}</span>
                        {candidateProfileToView.profileDetails.education.cgpa && (
                          <span>CGPA: {candidateProfileToView.profileDetails.education.cgpa}</span>
                        )}
                        {candidateProfileToView.profileDetails.education.rollNumber && (
                          <span>Roll No: {candidateProfileToView.profileDetails.education.rollNumber}</span>
                        )}
                      </div>
                      {candidateProfileToView.profileDetails.education.description && (
                        <p className="text-slate-500 italic mt-1.5 pt-1.5 border-t border-slate-50 leading-relaxed font-semibold">
                          {candidateProfileToView.profileDetails.education.description}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No education details provided.</div>
                  )}
                </div>

                {/* 3. Skills & Languages */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    🛠️ Skills & Languages
                  </h4>
                  {candidateProfileToView.profileDetails?.skills ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-3.5 text-xs">
                      {candidateProfileToView.profileDetails.skills.technicalSkills && (
                        <div>
                          <span className="font-bold text-slate-400 uppercase text-[9px] block mb-1.5">Technical Skills</span>
                          <div className="flex flex-wrap gap-1.5">
                            {candidateProfileToView.profileDetails.skills.technicalSkills.split(',').map(s => (
                              <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold">{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {candidateProfileToView.profileDetails.skills.softSkills && (
                        <div>
                          <span className="font-bold text-slate-400 uppercase text-[9px] block mb-1.5">Soft Skills & Core Strengths</span>
                          <div className="flex flex-wrap gap-1.5">
                            {candidateProfileToView.profileDetails.skills.softSkills.split(',').map(s => (
                              <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold">{s.trim()}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100">
                        <div>
                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Languages</span>
                          <span className="text-slate-800 font-bold mt-0.5 block">{candidateProfileToView.profileDetails.skills.languages || "None listed"}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Overall Tech Proficiency</span>
                          <span className="text-slate-800 font-bold mt-0.5 block">{candidateProfileToView.profileDetails.skills.proficiency || "None listed"}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No skills or language details provided.</div>
                  )}
                </div>

                {/* 4. Projects */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    📂 Projects
                  </h4>
                  {candidateProfileToView.profileDetails?.projects?.length > 0 ? (
                    <div className="space-y-3">
                      {candidateProfileToView.profileDetails.projects.map((proj, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-2 text-xs">
                          <h5 className="font-black text-slate-800 text-sm">{proj.title}</h5>
                          <p className="text-slate-500 leading-normal font-semibold">{proj.description}</p>
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                            {proj.technologies && <div>Technologies: <span className="text-brand-600">{proj.technologies}</span></div>}
                            {proj.duration && <div>Duration: <span className="text-slate-700">{proj.duration}</span></div>}
                            {proj.teamSize && <div>Team Size: <span className="text-slate-700">{proj.teamSize}</span></div>}
                          </div>
                          {(proj.projectLink || proj.githubLink) && (
                            <div className="flex gap-3 pt-1.5">
                              {proj.projectLink && <a href={proj.projectLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-brand-500 font-bold hover:underline">Live Link ↗</a>}
                              {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-700 font-bold hover:underline">GitHub Code ↗</a>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No academic or personal projects added yet.</div>
                  )}
                </div>

                {/* 5. Certificates */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    📜 Certificates
                  </h4>
                  {candidateProfileToView.profileDetails?.certificates?.length > 0 ? (
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {candidateProfileToView.profileDetails.certificates.map((cert, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-1 text-xs">
                          <div className="font-black text-slate-800">{cert.name}</div>
                          <div className="text-[10px] text-slate-500 font-bold">{cert.org}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">Issued: {cert.issueDate || "N/A"}</div>
                          {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-[9px] text-brand-500 hover:underline font-bold block mt-1">Verify Certificate ↗</a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No professional certificates added yet.</div>
                  )}
                </div>

                {/* 6. Positions & Responsibilities */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    🏆 Positions & Responsibilities
                  </h4>
                  {candidateProfileToView.profileDetails?.positions?.length > 0 ? (
                    <div className="space-y-2">
                      {candidateProfileToView.profileDetails.positions.map((pos, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-150/50 text-xs space-y-0.5">
                          <div className="font-black text-slate-800">{pos.title}</div>
                          <div className="text-[10px] text-[#2164c5] font-bold">{pos.organization} • {pos.roleType || "Position"}</div>
                          <div className="text-[9px] text-slate-400">Duration: {pos.duration}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No leadership positions or extra-curricular roles listed.</div>
                  )}
                </div>

                {/* 7. Prior Work Experience / Internships */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    💼 Prior Work Experience / Internships
                  </h4>
                  {((candidateProfileToView.profileDetails?.workExperience) || 
                    (candidateProfileToView.profileDetails?.previousExperience?.length > 0) || 
                    (candidateProfileToView.profileDetails?.careerBreak?.startDate)) ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-3.5 text-xs">
                      {/* Career Break details */}
                      {candidateProfileToView.profileDetails.careerBreak?.startDate && (
                        <div className="pb-3 border-b border-slate-100 space-y-1.5">
                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Career Break Information</span>
                          <div className="text-slate-800 font-bold">
                            Timeline: {candidateProfileToView.profileDetails.careerBreak.startDate} to {candidateProfileToView.profileDetails.careerBreak.currentlyActive === "Yes" ? "Present" : candidateProfileToView.profileDetails.careerBreak.endDate || "N/A"}
                          </div>
                          {candidateProfileToView.profileDetails.careerBreak.reasonForBreak?.length > 0 && (
                            <div>
                              <span className="text-[9px] text-slate-400 uppercase block font-bold mb-1">Reason for Break</span>
                              <div className="flex flex-wrap gap-1">
                                {candidateProfileToView.profileDetails.careerBreak.reasonForBreak.map(r => (
                                  <span key={r} className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-md text-[10px] font-bold">{r}</span>
                                ))}
                                {candidateProfileToView.profileDetails.careerBreak.otherReason && (
                                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-md text-[10px] font-bold">{candidateProfileToView.profileDetails.careerBreak.otherReason}</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Previous Experience */}
                      {candidateProfileToView.profileDetails.previousExperience?.length > 0 && (
                        <div className="space-y-3 pb-3 border-b border-slate-100">
                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Full-time Positions</span>
                          {candidateProfileToView.profileDetails.previousExperience.map((exp, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3 space-y-1">
                              <div className="font-black text-slate-800 text-xs">{exp.designation}</div>
                              <div className="text-[10px] text-brand-600 font-bold">{exp.companyName} • {exp.employmentType || "Full-time"}</div>
                              <div className="text-[10px] text-slate-400">Duration: {exp.startDate} - {exp.endDate || "Present"}</div>
                              {exp.responsibilities && <p className="text-[11px] text-slate-600 font-medium mt-1">{exp.responsibilities}</p>}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Informal Roles / Internships Summary */}
                      {(candidateProfileToView.profileDetails.workExperience?.internship || 
                        candidateProfileToView.profileDetails.workExperience?.freelance || 
                        candidateProfileToView.profileDetails.workExperience?.partTime) && (
                        <div className="space-y-2">
                          {candidateProfileToView.profileDetails.workExperience.internship && (
                            <div>
                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Internships</span>
                              <span className="text-slate-700 font-semibold">{candidateProfileToView.profileDetails.workExperience.internship}</span>
                            </div>
                          )}
                          {candidateProfileToView.profileDetails.workExperience.freelance && (
                            <div>
                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Freelance Projects</span>
                              <span className="text-slate-700 font-semibold">{candidateProfileToView.profileDetails.workExperience.freelance}</span>
                            </div>
                          )}
                          {candidateProfileToView.profileDetails.workExperience.partTime && (
                            <div>
                              <span className="font-bold text-slate-400 uppercase text-[9px] block">Part-time Roles</span>
                              <span className="text-slate-700 font-semibold">{candidateProfileToView.profileDetails.workExperience.partTime}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No work experience or internship details provided.</div>
                  )}
                </div>

                {/* 8. Personal & Address Details */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    🏠 Personal & Address Details
                  </h4>
                  <div className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Gender</span>
                        <span className="text-slate-800 font-semibold">{candidateProfileToView.gender || candidateProfileToView.profileDetails?.personalDetails?.gender || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Date of Birth</span>
                        <span className="text-slate-800 font-semibold">{candidateProfileToView.dob || candidateProfileToView.profileDetails?.personalDetails?.dob || "Not specified"}</span>
                      </div>
                    </div>
                    {candidateProfileToView.profileDetails?.personalDetails?.hobbies && (
                      <div className="pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Hobbies & Interests</span>
                        <span className="text-slate-800 font-semibold">{candidateProfileToView.profileDetails.personalDetails.hobbies}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Current Address</span>
                      <span className="text-slate-800 font-medium block leading-relaxed">{candidateProfileToView.profileDetails?.personalDetails?.currentAddress || "Not provided"}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-50">
                      <span className="font-bold text-slate-400 uppercase text-[9px] block">Permanent Address</span>
                      <span className="text-slate-800 font-medium block leading-relaxed">{candidateProfileToView.profileDetails?.personalDetails?.permanentAddress || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                {/* 9. Professional Links & Socials */}
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                    🔗 Professional Links & Socials
                  </h4>
                  {candidateProfileToView.profileDetails?.socialLinks ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-150/50 space-y-2.5 text-xs font-bold">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {candidateProfileToView.profileDetails.socialLinks.linkedin ? (
                          <a href={candidateProfileToView.profileDetails.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline flex items-center gap-1">
                            🔗 LinkedIn Profile ↗
                          </a>
                        ) : (
                          <span className="text-slate-400 font-semibold">LinkedIn: Not provided</span>
                        )}
                        {candidateProfileToView.profileDetails.socialLinks.github ? (
                          <a href={candidateProfileToView.profileDetails.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline flex items-center gap-1">
                            💻 GitHub Profile ↗
                          </a>
                        ) : (
                          <span className="text-slate-400 font-semibold">GitHub: Not provided</span>
                        )}
                        {candidateProfileToView.profileDetails.socialLinks.portfolio ? (
                          <a href={candidateProfileToView.profileDetails.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1">
                            🌐 Personal Portfolio ↗
                          </a>
                        ) : (
                          <span className="text-slate-400 font-semibold">Portfolio: Not provided</span>
                        )}
                        {candidateProfileToView.profileDetails.socialLinks.instagram && (
                          <a href={candidateProfileToView.profileDetails.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-650 hover:underline flex items-center gap-1">
                            📸 Instagram Profile ↗
                          </a>
                        )}
                        {candidateProfileToView.profileDetails.socialLinks.facebook && (
                          <a href={candidateProfileToView.profileDetails.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                            👥 Facebook Profile ↗
                          </a>
                        )}
                      </div>
                      {candidateProfileToView.profileDetails.socialLinks.customLinks?.length > 0 && (
                        <div className="border-t border-slate-100 pt-2.5 mt-2 space-y-1.5">
                          <span className="font-bold text-slate-400 uppercase text-[9px] block">Other Portfolios / Work Links</span>
                          <div className="flex flex-wrap gap-3">
                            {candidateProfileToView.profileDetails.socialLinks.customLinks.map((link, idx) => (
                              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline hover:text-brand-500 font-semibold">{link.label || "Link"} ↗</a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic font-semibold">No professional links added.</div>
                  )}
                </div>

                {/* Document Downloads */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 font-sans">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Downloading Candidate Resume PDF...") }}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 text-xs font-black uppercase tracking-wider text-center shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FileText className="h-4 w-4" /> Download Resume PDF
                  </a>
                  <button
                    onClick={() => setCandidateProfileToView(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl py-3 text-xs font-black uppercase tracking-wider transition"
                  >
                    Close Profile Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }



      {/* 4. Create Club & Community Modal */}
      {
        isCreateClubModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 max-w-xl w-full shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsCreateClubModalOpen(false)}
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 leading-none">Create a She-Club</h3>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Build a safe space for women to connect, chat, and share resources.</p>
              </div>

              <form onSubmit={submitNewClub} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Club Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Women in CyberSecurity"
                    value={createClubForm.name}
                    onChange={(e) => setCreateClubForm({ ...createClubForm, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2164c5]/25 focus:border-[#2164c5] bg-slate-50/30"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Category</label>
                  <select
                    value={createClubForm.category}
                    onChange={(e) => setCreateClubForm({ ...createClubForm, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2164c5]/25 focus:border-[#2164c5]"
                    title="Club Category"
                  >
                    <option value="Technology & Engineering">Technology & Engineering</option>
                    <option value="Business & Startups">Business & Startups</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Creative Arts & Design">Creative Arts & Design</option>
                    <option value="Healthcare & Medical">Healthcare & Medical</option>
                    <option value="Social Justice & Policy">Social Justice & Policy</option>
                    <option value="General & Networking">General & Networking</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what this club is about, who should join, and what activities/discussions will happen here..."
                    value={createClubForm.description}
                    onChange={(e) => setCreateClubForm({ ...createClubForm, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2164c5]/25 focus:border-[#2164c5] bg-slate-50/30 resize-none"
                  />
                </div>

                {/* Emoji Icon Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Select Emoji Icon</label>
                  <div className="flex flex-wrap gap-2.5">
                    {["💻", "🚀", "📊", "🎨", "✍️", "⚖️", "🩺", "🌱"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setCreateClubForm({ ...createClubForm, icon: emoji })}
                        className={`h-11 w-11 text-xl flex items-center justify-center rounded-2xl border transition-all cursor-pointer select-none ${createClubForm.icon === emoji
                          ? "bg-[#2164c5]/10 border-[#2164c5] scale-105 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-400"
                          }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Theme Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Select Cover Theme</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { key: "tech", label: "Tech Blue", dot: "bg-blue-500" },
                      { key: "startup", label: "Startup Warm", dot: "bg-amber-500" },
                      { key: "data", label: "AI Purple", dot: "bg-violet-500" },
                      { key: "creative", label: "Art Pink", dot: "bg-pink-500" },
                      { key: "health", label: "Health Green", dot: "bg-emerald-500" }
                    ].map((theme) => (
                      <button
                        key={theme.key}
                        type="button"
                        onClick={() => setCreateClubForm({ ...createClubForm, coverPreset: theme.key })}
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer bg-white ${createClubForm.coverPreset === theme.key
                          ? "border-[#2164c5] bg-blue-50/20 scale-[1.02] shadow-sm"
                          : "border-slate-200 hover:border-slate-400"
                          }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`}></span>
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit / Cancel Action buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateClubModalOpen(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl py-3 text-xs font-black transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#2164c5] hover:bg-blue-700 text-white rounded-2xl py-3 text-xs font-black shadow-sm transition cursor-pointer"
                  >
                    Create Club
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div >
  );
}

function ScrollableRowSection({ title, subtitle, items, onViewAll, onItemClick }) {
  const containerRef = React.useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const renderCompanyLogo = (company) => {
    if (!company) return null;
    const lower = company.toLowerCase();

    if (lower.includes("devverse")) {
      return (
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] font-black tracking-tighter text-slate-905 uppercase">DEV</span>
          <span className="text-[9px] font-black tracking-tighter text-indigo-600 uppercase">VERSE</span>
        </div>
      );
    }

    if (lower.includes("interactup")) {
      return (
        <div className="flex flex-col items-center justify-center scale-90">
          <svg className="w-7 h-7 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      );
    }

    if (lower.includes("safal money")) {
      return (
        <div className="flex flex-col items-center justify-center scale-95">
          <div className="w-7 h-7 rounded-full border-4 border-amber-400 border-dashed flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (lower.includes("google")) {
      return (
        <div className="flex items-center justify-center scale-95">
          <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>
      );
    }

    if (lower.includes("salesforce")) {
      return (
        <div className="flex items-center justify-center scale-95">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00A1E0">
            <path d="M17.7 11.3c-.3-.8-.9-1.4-1.7-1.8-.4-.2-.8-.4-1.3-.4-.5 0-.9.1-1.3.3C13 8.7 12 8 10.9 8c-1.3 0-2.4.9-2.8 2.2-.4-.2-.9-.3-1.4-.3-1.7 0-3.1 1.4-3.1 3.1 0 1.7 1.4 3.1 3.1 3.1.2 0 .4 0 .6-.1.6.8 1.6 1.3 2.7 1.3.8 0 1.6-.3 2.2-.9.5.4 1.1.6 1.7.6 1.1 0 2-.7 2.4-1.7.3.1.6.1.9.1 1.7 0 3.1-1.4 3.1-3.1.2-1.7-1.2-3.1-2.9-3.1z" />
          </svg>
        </div>
      );
    }

    const initials = company.split(' ').map(n => n[0]).join('').slice(0, 3);
    return (
      <div className="w-full h-full flex items-center justify-center text-center text-[10px] font-black uppercase text-[#2164c5] tracking-tighter">
        {initials}
      </div>
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-6 pt-4 relative group">
      {/* Header Container */}
      <div className="flex justify-between items-end pl-3 border-l-4 border-[#2164c5]">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">{subtitle}</p>
        </div>

        {/* View All Button */}
        <button
          onClick={onViewAll}
          className="bg-blue-50 text-[#2164c5] hover:bg-blue-100/80 rounded-full px-4 py-1.5 text-xs font-black flex items-center gap-2 transition duration-200 shadow-sm active:scale-95 whitespace-nowrap"
        >
          View All
          <span className="flex items-center justify-center w-5 h-5 bg-[#2164c5] rounded-full text-white">
            <ChevronRight className="h-3 w-3" />
          </span>
        </button>
      </div>

      {/* Row Wrapper with Left/Right Buttons */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 transition opacity-0 group-hover:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:scale-105 active:scale-95 transition opacity-0 group-hover:opacity-100"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {items.map((item, index) => {
            const displayTitle = item.title;
            const displayCompany = item.company || item.platform;
            const displayLocation = item.location || "Online";

            // Format location string: Online or Offline
            const isOnline = displayLocation.toLowerCase().includes("online") || displayLocation.toLowerCase().includes("zoom") || displayLocation.toLowerCase().includes("remote");
            const locationText = isOnline ? "🌐 Online" : `📍 ${displayLocation}`;

            return (
              <div
                key={item.id || index}
                onClick={() => onItemClick(item)}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition duration-300 w-[300px] shrink-0 cursor-pointer flex flex-col justify-between h-[200px] snap-start border-slate-100 group/card"
              >
                {/* Upper Half: light blue/purple BG with location tag and logo container */}
                <div className="h-[95px] bg-[#f4f8ff]/50 p-5 flex items-start justify-between border-b border-slate-100/60 relative">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                    {locationText}
                  </span>

                  {/* Square Logo container */}
                  <div className="bg-white border border-slate-150 shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-2xl w-14 h-14 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                    {item.isClub ? (
                      <span className="text-2xl select-none" role="img" aria-label={displayTitle}>
                        {item.icon}
                      </span>
                    ) : (
                      renderCompanyLogo(displayCompany || displayTitle)
                    )}
                  </div>
                </div>

                {/* Lower Half: white BG with title and company/host */}
                <div className="p-5 flex flex-col justify-between flex-grow text-left">
                  <h3 className="text-slate-800 font-bold text-sm line-clamp-2 leading-snug group-hover/card:text-[#2164c5] transition-colors duration-200">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    {displayCompany}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

