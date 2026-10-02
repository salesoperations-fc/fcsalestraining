/* =========================================================
   AM Academy — course outline
   This is the only file to edit when adding or reordering content.

   Each module:
     id          unique, no spaces (used to track progress — don't rename once people start)
     day         which onboarding day it belongs to (1–10)
     title       what AMs see
     type        "lesson" | "sim" | "exam" | "session"
     minutes     rough time needed
     url         the page to open (lessons/..., sims/..., or an external link like Google Slides)
     assessment  "none" | "quiz" | "sim" | "written" | "checklist" | "attendance"
     ready       false = shows "Coming soon" and can't be opened yet

   SAMPLE CONTENT: replace with your TM's real plan.
   ========================================================= */

window.LMS_DAYS = [
  { day:1,  title:"Welcome to First Circle" },
  { day:2,  title:"Our products" },
  { day:3,  title:"Getting around Connect" },
  { day:4,  title:"Onboarding a new client" },
  { day:5,  title:"Payments and deposits" },
  { day:6,  title:"Credit and drawdowns" },
  { day:7,  title:"Client conversations" },
  { day:8,  title:"Review and Q&A" },
  { day:9,  title:"Connect simulation exam" },
  { day:10, title:"Final assessment" }
];

window.LMS_MODULES = [
  { id:"d1-welcome",      day:1, title:"Welcome and how the program works", type:"lesson",  minutes:20, url:"lessons/day1-intro.html",    assessment:"none",       ready:false },
  { id:"d1-am-role",      day:1, title:"The Account Manager role",          type:"lesson",  minutes:30, url:"lessons/day1-am-role.html",  assessment:"quiz",       ready:false },
  { id:"d2-products",     day:2, title:"Business Credit Line and Express Business Loan", type:"lesson", minutes:45, url:"lessons/day2-products.html", assessment:"quiz", ready:false },
  { id:"d2-banking",      day:2, title:"Business Accounts: Payments and Savings", type:"lesson", minutes:30, url:"lessons/day2-banking.html", assessment:"quiz", ready:false },
  { id:"d3-connect-tour", day:3, title:"A tour of Connect",                 type:"lesson",  minutes:30, url:"lessons/day3-connect.html",  assessment:"none",       ready:false },
  { id:"d3-home-sim",     day:3, title:"Practice: find your way around the homepage", type:"sim", minutes:15, url:"sims/connect-home-practice.html", assessment:"sim", ready:false },
  { id:"d4-onboarding",   day:4, title:"Documents, team access, and roles", type:"lesson",  minutes:40, url:"lessons/day4-onboarding.html", assessment:"written",  ready:false },
  { id:"d5-payments",     day:5, title:"Transfers, contacts, and deposits", type:"lesson",  minutes:40, url:"lessons/day5-payments.html", assessment:"quiz",       ready:false },
  { id:"d6-credit",       day:6, title:"Drawdowns, contracts, and post-dated checks", type:"lesson", minutes:45, url:"lessons/day6-credit.html", assessment:"quiz", ready:false },
  { id:"d7-roleplay",     day:7, title:"Roleplay: a first call with a new client", type:"session", minutes:60, url:"lessons/day7-roleplay.html", assessment:"checklist", ready:false },
  { id:"d8-qa",           day:8, title:"Live Q&A with your trainer",        type:"session", minutes:60, url:"lessons/day8-qa.html",       assessment:"attendance", ready:false },
  { id:"d9-connect-exam", day:9, title:"Connect simulation exam",           type:"exam",    minutes:30, url:"sims/connect-exam.html",     assessment:"sim",        ready:true  },
  { id:"d10-final",       day:10, title:"Final assessment",                  type:"exam",    minutes:45, url:"lessons/day10-final.html",   assessment:"written",    ready:false }
];

/* Live sessions shown on the dashboard if no Google Calendar is embedded.
   when: "YYYY-MM-DDTHH:MM" in Philippine time. link: Google Meet or calendar event link. */
window.LMS_SESSIONS = [
  { title:"Kickoff with your trainer",   when:"2026-09-30T10:00", minutes:60, link:"" },
  { title:"Products Q&A",                when:"2026-10-01T15:00", minutes:45, link:"" },
  { title:"Connect walkthrough (live)",  when:"2026-10-05T14:00", minutes:60, link:"" },
  { title:"Client roleplay",             when:"2026-10-08T10:00", minutes:90, link:"" },
  { title:"Review and Q&A",              when:"2026-10-09T15:00", minutes:60, link:"" }
];
