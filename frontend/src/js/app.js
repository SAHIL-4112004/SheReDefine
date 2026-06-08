// SheReDefine App Logic
// Managing local-state, simulation data, views, and modals.

// ----------------------------------------------------
// Mock Data Initialization
// ----------------------------------------------------

const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Software Engineering Intern",
    company: "Google India",
    type: "Internship",
    category: "fresh", // After Studies
    mode: "Hybrid",
    location: "Bangalore, India",
    eligibility: "B.Tech/M.Tech female students graduating in 2026/2027",
    deadline: "2026-06-30",
    seats: 45,
    isPaid: true,
    price: "Stipend: ₹80,000/mo",
    description: "Join the Google Engineering team for a 12-week intensive summer internship program focusing on scalable systems.",
    status: "approved"
  },
  {
    id: "opp-2",
    title: "Returnship: Senior Project Manager",
    company: "Salesforce",
    type: "Job",
    category: "break", // After Career Break
    mode: "Remote",
    location: "Remote, India",
    eligibility: "Women with 2+ years of career gap and 5+ years prior PM experience",
    deadline: "2026-06-15",
    seats: 12,
    isPaid: true,
    price: "Competitive Salary",
    description: "A 6-month returnship program with dedicated mentorship, transition training, and high potential for full-time conversion.",
    status: "approved"
  },
  {
    id: "opp-3",
    title: "Freelance Technical Content Writer",
    company: "GeeksforGeeks",
    type: "Job",
    category: "switch", // Late 30s Switcher
    mode: "Remote",
    location: "Remote",
    eligibility: "Open to women looking to switch careers or enter tech writing. Strong domain knowledge.",
    deadline: "2026-07-10",
    seats: 30,
    isPaid: true,
    price: "₹3,000 per article",
    description: "Write technical articles on algorithms, system design, or modern tech stacks. Work at your own pace, anytime.",
    status: "approved"
  },
  {
    id: "opp-4",
    title: "Webinar: Re-entering the Tech Workspace after a Break",
    company: "Women in Tech India",
    type: "Webinar",
    category: "break",
    mode: "Online",
    location: "Zoom",
    eligibility: "Any woman currently on a career break planning a return",
    deadline: "2026-06-05",
    seats: 500,
    isPaid: false,
    price: "Free",
    description: "An interactive webinar with HR leaders and successful returnees sharing tips on resumes, interviews, and upskilling.",
    status: "approved"
  },
  {
    id: "opp-5",
    title: "Data Science Skill Bootcamp",
    company: "UpGrad Academy",
    type: "Training",
    category: "fresh",
    mode: "Online",
    location: "UpGrad Portal",
    eligibility: "Graduates wanting to launch a career in Data Analytics / AI",
    deadline: "2026-06-25",
    seats: 100,
    isPaid: false,
    price: "Free (Scholarship-based)",
    description: "A 6-week fast-paced hands-on training module covering SQL, Python, and basic machine learning modeling.",
    status: "approved"
  },
  {
    id: "opp-6",
    title: "Leadership & Strategy Mentor",
    company: "Sheroes Council",
    type: "Job",
    category: "switch",
    mode: "Hybrid",
    location: "Delhi NCR",
    eligibility: "Women with 15+ years experience in corporate or education sector",
    deadline: "2026-06-20",
    seats: 5,
    isPaid: true,
    price: "₹1,500/hour",
    description: "Provide strategic guidance and mentoring to young women entrepreneurs and small businesses starting up.",
    status: "approved"
  }
];

const INITIAL_CLUBS = [
  { id: "club-tech", name: "Women in Tech", icon: "💻", count: 1240, joined: true },
  { id: "club-ent", name: "Women Entrepreneurs", icon: "🚀", count: 850, joined: false },
  { id: "club-data", name: "Women in Data & AI", icon: "📊", count: 620, joined: false }
];

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    opportunityId: "opp-2",
    opportunityTitle: "Returnship: Senior Project Manager",
    company: "Salesforce",
    candidateName: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    resume: "ananya_resume.pdf",
    coverNote: "I have 6 years of experience in Agile Project Management, followed by a 3-year break to care for my newborn. Ready to rejoin!",
    status: "Applied",
    appliedAt: "2026-05-24"
  },
  {
    id: "app-2",
    opportunityId: "opp-1",
    opportunityTitle: "Software Engineering Intern",
    company: "Google India",
    candidateName: "Priya Patel",
    email: "priya.patel@example.com",
    resume: "priya_patel_cv.pdf",
    coverNote: "Final year B.Tech student with strong DSA skills and projects in React and Node.js. Excited for Google!",
    status: "Shortlisted",
    appliedAt: "2026-05-25"
  }
];

// ----------------------------------------------------
// State Management
// ----------------------------------------------------

let state = {
  currentUser: {
    name: "Aaradhya Sen",
    email: "aaradhya.sen@example.com",
    phone: "+91 9876543210",
    role: "participant", // participant, host, admin
    isVerified: true,
    category: "break", // default life-stage
    docUploaded: "aadhaar_masked.pdf"
  },
  opportunities: JSON.parse(localStorage.getItem('she_opportunities')) || INITIAL_OPPORTUNITIES,
  clubs: JSON.parse(localStorage.getItem('she_clubs')) || INITIAL_CLUBS,
  applications: JSON.parse(localStorage.getItem('she_applications')) || INITIAL_APPLICATIONS,
  webinarRegistrations: JSON.parse(localStorage.getItem('she_webinars')) || ["opp-4"], // Default registered
  currentTab: "all", // "all", "fresh", "break", "switch"
  searchQuery: "",
  filterType: "all",
  filterMode: "all",
  activeNav: "nav-opps"
};

// Sync state helper
function saveState() {
  localStorage.setItem('she_opportunities', JSON.stringify(state.opportunities));
  localStorage.setItem('she_clubs', JSON.stringify(state.clubs));
  localStorage.setItem('she_applications', JSON.stringify(state.applications));
  localStorage.setItem('she_webinars', JSON.stringify(state.webinarRegistrations));
}

// ----------------------------------------------------
// Event Handlers & View Rendering
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Bind Nav Links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = link.getAttribute("data-view");
      switchView(targetView);
      
      navLinks.forEach(n => n.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Bind Role Selector
  const roleSelect = document.getElementById("roleSelect");
  roleSelect.addEventListener("change", (e) => {
    const selectedRole = e.target.value;
    state.currentUser.role = selectedRole;
    
    // Update navbar and view access depending on role
    updateRoleSpecificUI();
    
    // Auto switch to appropriate view
    if (selectedRole === "host") {
      switchView("host-dashboard");
    } else if (selectedRole === "admin") {
      switchView("admin-dashboard");
    } else {
      switchView("opportunities");
    }
  });

  // Bind Tab Controls (Life stage filtering)
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentTab = btn.getAttribute("data-category");
      renderOpportunities();
    });
  });

  // Bind Filtering Input Controls
  document.getElementById("searchBar").addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderOpportunities();
  });

  document.getElementById("filterType").addEventListener("change", (e) => {
    state.filterType = e.target.value;
    renderOpportunities();
  });

  document.getElementById("filterMode").addEventListener("change", (e) => {
    state.filterMode = e.target.value;
    renderOpportunities();
  });

  // Bind Dialog Triggers & Light Dismiss Dialog Fallbacks
  setupDialogs();

  // Initial renders
  updateRoleSpecificUI();
  renderOpportunities();
  renderClubs();
  renderApplicationsList();
  renderHostDashboard();
  renderAdminDashboard();
  renderCuratedCourses();
});

// View Swapper
function switchView(viewId) {
  const sections = document.querySelectorAll(".view-section");
  sections.forEach(sec => sec.classList.remove("active"));
  
  const targetSec = document.getElementById(viewId);
  if (targetSec) {
    targetSec.classList.add("active");
  }
}

// Dialog initialization
function setupDialogs() {
  const dialogs = document.querySelectorAll("dialog");
  
  dialogs.forEach(dialog => {
    // Backdrop click close behavior fallback (for Safari / Chrome support)
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isDialogContent) {
        dialog.close();
      }
    });

    // Close button within dialog
    const closeBtn = dialog.querySelector(".dialog-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        dialog.close();
      });
    }
  });
}

// ----------------------------------------------------
// UI Logic & Render Functions
// ----------------------------------------------------

function updateRoleSpecificUI() {
  const role = state.currentUser.role;
  const navHost = document.querySelector('[data-view="host-dashboard"]');
  const navAdmin = document.querySelector('[data-view="admin-dashboard"]');
  const navMyApps = document.querySelector('[data-view="my-applications"]');
  
  // Hide/Show navigation links based on current role
  if (role === "host") {
    navHost.parentElement.style.display = "block";
    navAdmin.parentElement.style.display = "none";
    navMyApps.parentElement.style.display = "none";
  } else if (role === "admin") {
    navHost.parentElement.style.display = "none";
    navAdmin.parentElement.style.display = "block";
    navMyApps.parentElement.style.display = "none";
  } else {
    navHost.parentElement.style.display = "none";
    navAdmin.parentElement.style.display = "none";
    navMyApps.parentElement.style.display = "block";
  }

  // Update profile indicator on header
  document.getElementById("profileIndicator").textContent = `👤 ${state.currentUser.name} (${role.toUpperCase()})`;
}

// Render opportunity listing on main board
function renderOpportunities() {
  const container = document.getElementById("opportunitiesGrid");
  container.innerHTML = "";

  const filtered = state.opportunities.filter(opp => {
    // 1. Check admin approval (Only Admin can see unapproved in admin dashboard)
    if (opp.status !== "approved") return false;

    // 2. Life stage tab filter
    if (state.currentTab !== "all" && opp.category !== state.currentTab) return false;

    // 3. Search text matching
    if (state.searchQuery) {
      const matchText = (opp.title + opp.company + opp.description + opp.location).toLowerCase();
      if (!matchText.includes(state.searchQuery)) return false;
    }

    // 4. Type filter
    if (state.filterType !== "all" && opp.type.toLowerCase() !== state.filterType) return false;

    // 5. Mode filter
    if (state.filterMode !== "all" && opp.mode.toLowerCase() !== state.filterMode) return false;

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 3; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">No opportunities matching your criteria were found.</p>
        <button class="btn btn-outline" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(opp => {
    const isApplied = state.applications.some(app => app.opportunityId === opp.id && app.candidateName === state.currentUser.name);
    const isRegistered = state.webinarRegistrations.includes(opp.id);
    
    let btnText = "Apply Now";
    let btnClass = "btn-primary";
    let clickHandler = `openApplyModal('${opp.id}')`;

    if (opp.type === "Webinar" || opp.type === "Workshop") {
      if (isRegistered) {
        btnText = "Registered ✓";
        btnClass = "btn-outline";
        clickHandler = ``;
      } else {
        btnText = "Register Now";
        btnClass = "btn-secondary";
        clickHandler = `registerForEvent('${opp.id}')`;
      }
    } else {
      if (isApplied) {
        btnText = "Applied ✓";
        btnClass = "btn-outline";
        clickHandler = ``;
      }
    }

    const card = document.createElement("div");
    card.className = `card cat-${opp.category}`;
    card.innerHTML = `
      <div>
        <div class="card-header">
          <div class="card-tags">
            <span class="tag tag-type">${opp.type}</span>
            <span class="tag tag-cat">${getCategoryLabel(opp.category)}</span>
          </div>
          <div class="deadline-badge">
            🕒 Closes: ${opp.deadline}
          </div>
        </div>
        
        <h3>${opp.title}</h3>
        <div class="card-company">${opp.company}</div>
        
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          ${opp.description}
        </p>
        
        <div class="card-details">
          <div class="detail-item">
            <span>Eligibility</span>
            <span class="detail-value" title="${opp.eligibility}">${opp.eligibility.substring(0, 35)}${opp.eligibility.length > 35 ? '...' : ''}</span>
          </div>
          <div class="detail-item">
            <span>Location / Mode</span>
            <span class="detail-value">${opp.location} (${opp.mode})</span>
          </div>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="price-tag ${opp.isPaid ? '' : 'free'}">${opp.price}</div>
        <button class="btn btn-sm ${btnClass}" onclick="${clickHandler}" ${btnText.includes('✓') ? 'disabled' : ''}>
          ${btnText}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function getCategoryLabel(cat) {
  if (cat === "fresh") return "After Studies";
  if (cat === "break") return "After Break";
  if (cat === "switch") return "Late 30s Switch";
  return "All Life Stages";
}

function resetFilters() {
  document.getElementById("searchBar").value = "";
  document.getElementById("filterType").value = "all";
  document.getElementById("filterMode").value = "all";
  state.searchQuery = "";
  state.filterType = "all";
  state.filterMode = "all";
  renderOpportunities();
}

// ----------------------------------------------------
// Interaction Actions (Modals & Submissions)
// ----------------------------------------------------

window.openApplyModal = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const dialog = document.getElementById("applyModal");
  document.getElementById("applyOppId").value = oppId;
  document.getElementById("applyModalTitle").textContent = `Apply for ${opp.title}`;
  document.getElementById("applyModalCompany").textContent = opp.company;
  
  // Set default details in profile form
  document.getElementById("applicantName").value = state.currentUser.name;
  document.getElementById("applicantEmail").value = state.currentUser.email;

  dialog.showModal();
};

window.submitApplication = function(event) {
  event.preventDefault();
  const oppId = document.getElementById("applyOppId").value;
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const newApp = {
    id: "app-" + Date.now(),
    opportunityId: opp.id,
    opportunityTitle: opp.title,
    company: opp.company,
    candidateName: document.getElementById("applicantName").value,
    email: document.getElementById("applicantEmail").value,
    resume: document.getElementById("applicantResume").files[0]?.name || "resume_uploaded.pdf",
    coverNote: document.getElementById("applicantCover").value,
    status: "Applied",
    appliedAt: new Date().toISOString().split('T')[0]
  };

  state.applications.push(newApp);
  saveState();
  
  document.getElementById("applyModal").close();
  
  // Refresh UI
  renderOpportunities();
  renderApplicationsList();
  renderHostDashboard();
  
  alert("Successfully applied! You can track status under 'My Applications' page.");
};

window.registerForEvent = function(oppId) {
  if (state.webinarRegistrations.includes(oppId)) return;
  
  state.webinarRegistrations.push(oppId);
  saveState();
  renderOpportunities();
  alert("Registration Successful! A Zoom invite link and calendar reminder have been sent to your email.");
};

// ----------------------------------------------------
// Participant Dashboard (My Applications)
// ----------------------------------------------------

function renderApplicationsList() {
  const container = document.getElementById("applicationsList");
  container.innerHTML = "";

  const myApps = state.applications.filter(app => app.candidateName === state.currentUser.name);

  if (myApps.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;">
          You haven't applied to any job or internship opportunities yet.
        </td>
      </tr>
    `;
    return;
  }

  myApps.forEach(app => {
    const opp = state.opportunities.find(o => o.id === app.opportunityId);
    const row = document.createElement("tr");
    
    let statusClass = "status-applied";
    if (app.status === "Shortlisted") statusClass = "status-shortlisted";
    if (app.status === "Selected") statusClass = "status-selected";
    if (app.status === "Rejected") statusClass = "status-rejected";

    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${app.opportunityTitle}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${app.company}</div>
      </td>
      <td>${app.appliedAt}</td>
      <td>
        <span class="tag tag-type" style="font-size: 0.7rem; background: rgba(255, 255, 255, 0.05);">${opp ? opp.type : 'Job'}</span>
      </td>
      <td>
        <span class="status-badge ${statusClass}">${app.status}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="viewApplicationDetails('${app.id}')">View Cover Note</button>
      </td>
    `;
    container.appendChild(row);
  });
}

window.viewApplicationDetails = function(appId) {
  const app = state.applications.find(a => a.id === appId);
  if (!app) return;
  
  alert(`Cover Note by ${app.candidateName}:\n\n"${app.coverNote}"\n\nResume Submitted: ${app.resume}`);
};

// ----------------------------------------------------
// Recruiter / Host Dashboard
// ----------------------------------------------------

window.openHostModal = function() {
  document.getElementById("hostOpportunityModal").showModal();
};

window.submitNewOpportunity = function(event) {
  event.preventDefault();
  
  const newOpp = {
    id: "opp-" + Date.now(),
    title: document.getElementById("oppTitle").value,
    company: document.getElementById("oppCompany").value,
    type: document.getElementById("oppType").value,
    category: document.getElementById("oppCategory").value,
    mode: document.getElementById("oppMode").value,
    location: document.getElementById("oppLocation").value,
    eligibility: document.getElementById("oppEligibility").value,
    deadline: document.getElementById("oppDeadline").value,
    seats: parseInt(document.getElementById("oppSeats").value) || 10,
    isPaid: document.getElementById("oppPaid").value === "Paid",
    price: document.getElementById("oppPrice").value,
    description: document.getElementById("oppDescription").value,
    status: "pending" // Needs Admin approval
  };

  state.opportunities.push(newOpp);
  saveState();
  
  document.getElementById("hostOpportunityModal").close();
  document.getElementById("hostOppForm").reset();
  
  renderHostDashboard();
  renderAdminDashboard();
  alert("Opportunity submitted! It is currently pending Admin approval to be listed publicly.");
};

function renderHostDashboard() {
  // 1. Render Host's Listings Table
  const listingsContainer = document.getElementById("hostListingsList");
  listingsContainer.innerHTML = "";

  const myCompany = "Salesforce"; // Simulated company recruiter
  const myOpps = state.opportunities; // Show all for testing ease

  myOpps.forEach(opp => {
    const row = document.createElement("tr");
    let statusClass = opp.status === "approved" ? "status-approved" : "status-pending";
    
    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${opp.title}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${opp.company}</div>
      </td>
      <td>
        <span class="tag tag-cat">${getCategoryLabel(opp.category)}</span>
      </td>
      <td>${opp.type}</td>
      <td>
        <span class="status-badge ${statusClass}">${opp.status}</span>
      </td>
      <td>${opp.deadline}</td>
    `;
    listingsContainer.appendChild(row);
  });

  // 2. Render Applicant Management table
  const applicantsContainer = document.getElementById("hostApplicantsList");
  applicantsContainer.innerHTML = "";

  if (state.applications.length === 0) {
    applicantsContainer.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 3rem;">
          No candidates have applied to your hosted opportunities yet.
        </td>
      </tr>
    `;
    return;
  }

  state.applications.forEach(app => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${app.candidateName}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${app.email}</div>
      </td>
      <td>
        <div>${app.opportunityTitle}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${app.company}</div>
      </td>
      <td><a href="#" onclick="alert('Downloading ${app.resume} (mock)...')" style="color: var(--teal); font-weight: 600;">${app.resume}</a></td>
      <td>
        <span class="status-badge ${getAppStatusClass(app.status)}">${app.status}</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-sm btn-outline" style="color: var(--success);" onclick="updateApplicantStatus('${app.id}', 'Shortlisted')">Shortlist</button>
          <button class="btn btn-sm btn-outline" style="color: var(--teal);" onclick="updateApplicantStatus('${app.id}', 'Selected')">Select</button>
          <button class="btn btn-sm btn-outline" style="color: var(--danger);" onclick="updateApplicantStatus('${app.id}', 'Rejected')">Reject</button>
        </div>
      </td>
    `;
    applicantsContainer.appendChild(row);
  });
}

function getAppStatusClass(status) {
  if (status === "Applied") return "status-applied";
  if (status === "Shortlisted") return "status-shortlisted";
  if (status === "Selected") return "status-selected";
  return "status-rejected";
}

window.updateApplicantStatus = function(appId, newStatus) {
  const app = state.applications.find(a => a.id === appId);
  if (!app) return;
  
  app.status = newStatus;
  saveState();
  
  renderHostDashboard();
  renderApplicationsList();
};

// ----------------------------------------------------
// Admin Dashboard
// ----------------------------------------------------

function renderAdminDashboard() {
  // 1. Pending Listings Table
  const pendingContainer = document.getElementById("adminPendingListings");
  pendingContainer.innerHTML = "";

  const pendingOpps = state.opportunities.filter(o => o.status === "pending");

  if (pendingOpps.length === 0) {
    pendingContainer.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;">
          No listings are currently pending approval.
        </td>
      </tr>
    `;
  } else {
    pendingOpps.forEach(opp => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div style="font-weight: 700;">${opp.title}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${opp.company}</div>
        </td>
        <td>${opp.type}</td>
        <td>${getCategoryLabel(opp.category)}</td>
        <td>${opp.deadline}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-sm btn-primary" onclick="approveOpportunity('${opp.id}')">Approve</button>
            <button class="btn btn-sm btn-outline" style="color: var(--danger); border-color: var(--danger);" onclick="rejectOpportunity('${opp.id}')">Reject</button>
          </div>
        </td>
      `;
      pendingContainer.appendChild(row);
    });
  }

  // 2. Masked Document Verification list
  const verificationsContainer = document.getElementById("adminVerificationsList");
  verificationsContainer.innerHTML = "";

  // Mock list of verification requests
  const verifications = [
    { name: "Priya Sen", email: "priya.sen@example.com", category: "After Break", file: "marriage_certificate_masked.pdf" },
    { name: "Jessica Dsouza", email: "jess@example.com", category: "Late 30s Switcher", file: "experience_relieving_letter.pdf" }
  ];

  verifications.forEach(req => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${req.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${req.email}</div>
      </td>
      <td>${req.category}</td>
      <td><a href="#" onclick="alert('Viewing masked document: ${req.file}')" style="color: var(--secondary); font-weight: 600;">${req.file}</a></td>
      <td>
        <span class="status-badge status-pending">Pending Review</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-sm btn-primary" onclick="verifyUser(this, '${req.name}')">Verify Profile</button>
          <button class="btn btn-sm btn-outline" style="color: var(--danger);" onclick="rejectUser(this)">Flag / Deny</button>
        </div>
      </td>
    `;
    verificationsContainer.appendChild(row);
  });
}

window.approveOpportunity = function(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  opp.status = "approved";
  saveState();
  
  renderOpportunities();
  renderHostDashboard();
  renderAdminDashboard();
  alert(`Approved listing: "${opp.title}"`);
};

window.rejectOpportunity = function(oppId) {
  state.opportunities = state.opportunities.filter(o => o.id !== oppId);
  saveState();
  
  renderOpportunities();
  renderHostDashboard();
  renderAdminDashboard();
  alert("Opportunity rejected and removed from system.");
};

window.verifyUser = function(btnElement, name) {
  btnElement.closest("tr").remove();
  alert(`User "${name}" has been successfully verified! Access token issued.`);
};

window.rejectUser = function(btnElement) {
  btnElement.closest("tr").remove();
  alert("Verification rejected. Account flagged for review.");
};

// ----------------------------------------------------
// Community Clubs & Forums
// ----------------------------------------------------

function renderClubs() {
  const container = document.getElementById("clubsGrid");
  container.innerHTML = "";

  state.clubs.forEach(club => {
    const card = document.createElement("div");
    card.className = `club-card ${club.id === 'club-ent' ? 'entrepreneur' : (club.id === 'club-data' ? 'data' : '')}`;
    card.innerHTML = `
      <div class="club-icon">${club.icon}</div>
      <div class="club-name">${club.name}</div>
      <div class="club-members-count">${club.count.toLocaleString()} members</div>
      <button class="btn btn-sm ${club.joined ? 'btn-outline' : 'btn-primary'}" onclick="toggleClubJoin('${club.id}')">
        ${club.joined ? 'Joined ✓' : 'Join Club'}
      </button>
    `;
    container.appendChild(card);
  });
}

window.toggleClubJoin = function(clubId) {
  const club = state.clubs.find(c => c.id === clubId);
  if (!club) return;

  club.joined = !club.joined;
  club.count += club.joined ? 1 : -1;
  
  saveState();
  renderClubs();
};

// ----------------------------------------------------
// Aggregator Platform Recommendations (Lightweight model)
// ----------------------------------------------------

const CURATED_COURSES = [
  { platform: "Coursera", title: "Python for Everybody Specialization", badge: "Beginner Friendly", url: "https://www.coursera.org" },
  { platform: "UpGrad", title: "Executive Post Graduate Programme in Data Science", badge: "Career Restart", url: "https://www.upgrad.com" },
  { platform: "GeeksforGeeks", title: "Complete Java Backend Development Course", badge: "Skill Refresher", url: "https://www.geeksforgeeks.org" },
  { platform: "Scaler", title: "Software Engineering & Career Switch Fellowship", badge: "Career Switch", url: "https://www.scaler.com" }
];

function renderCuratedCourses() {
  const container = document.getElementById("coursesGrid");
  container.innerHTML = "";

  CURATED_COURSES.forEach(c => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <div>
        <div class="course-platform">${c.platform}</div>
        <div class="course-title">${c.title}</div>
        <span class="course-badge">${c.badge}</span>
      </div>
      <a href="${c.url}" target="_blank" class="btn btn-sm btn-outline" style="text-align: center; margin-top: 1rem; width: 100%;">
        View Program ↗
      </a>
    `;
    container.appendChild(card);
  });
}

// ----------------------------------------------------
// OTP Authentication & Document Verification Dialogs
// ----------------------------------------------------

window.openAuthModal = function() {
  document.getElementById("authModal").showModal();
};

window.sendOTP = function(event) {
  event.preventDefault();
  const phone = document.getElementById("authPhone").value;
  if (!phone) {
    alert("Please enter a valid phone number.");
    return;
  }
  
  // Show OTP step
  document.getElementById("authStep1").style.display = "none";
  document.getElementById("authStep2").style.display = "block";
  
  // Set focus on first OTP box
  setTimeout(() => {
    document.getElementById("otp1").focus();
  }, 100);
};

window.verifyOTP = function(event) {
  event.preventDefault();
  
  // Collect OTP digits
  let otp = "";
  for (let i = 1; i <= 4; i++) {
    otp += document.getElementById(`otp${i}`).value;
  }

  if (otp.length < 4) {
    alert("Please enter a 4-digit code.");
    return;
  }

  // Set verified user state
  state.currentUser.name = document.getElementById("authName").value || "Aaradhya Sen";
  state.currentUser.email = document.getElementById("authEmail").value || "aaradhya.sen@example.com";
  state.currentUser.phone = document.getElementById("authPhone").value;
  state.currentUser.role = "participant"; // reset to candidate on register
  
  // Update state UI
  updateRoleSpecificUI();
  
  document.getElementById("authModal").close();
  
  // Reset fields
  document.getElementById("authStep1").style.display = "block";
  document.getElementById("authStep2").style.display = "none";
  document.getElementById("authForm").reset();

  alert("Authentication Successful! Safe access granted to SheReDefine.");
};

// Auto tab between OTP inputs
window.handleOtpInput = function(element, nextId) {
  if (element.value.length === 1 && nextId) {
    document.getElementById(nextId).focus();
  }
};
