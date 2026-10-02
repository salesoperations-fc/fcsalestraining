/* =========================================================
   AM Academy — 2-Week Learning Path (course outline)
   This is the only file to edit when changing the program.

   Each day:
     day        1–10 (days unlock in order)
     week       1 or 2
     title      what AMs see
     tasks      checklist items. Each needs a short unique id (don't rename once people start).
     materials  training materials: { label, href }. Leave href:"" until the link is ready.
     exam       optional. Must be submitted before the next day unlocks.
                { id, label, href, kind, passing }
                kind: "form"    = Google Form or other link (trainer records the score)
                      "sim"     = one of our simulations
                      "trainer" = scored live by the trainer (role-play, sign-off)
   ========================================================= */

window.LMS_WEEKS = {
  1: "Week 1: Knowledge and simulation",
  2: "Week 2: Applied practice and certification"
};

window.LMS_DAYS = [
  { day:1, week:1, title:"Tools Set Up & Orientation",
    tasks:[
      { id:"d1-devices",   label:"Work devices set up" },
      { id:"d1-bookmarks", label:"Bookmark tools" },
      { id:"d1-orient",    label:"Product orientation" },
      { id:"d1-frs",       label:"Read & sign the Foundations of Responsible Selling form" }
    ],
    materials:[ { label:"Foundations of Responsible Selling", href:"" } ] },

  { day:2, week:1, title:"Product Knowledge & Positioning",
    tasks:[
      { id:"d2-industry", label:"Review the industry background and First Circle's products" },
      { id:"d2-reqs",     label:"Review requirements per industry type and the AM Success Playbook guide" }
    ],
    materials:[
      { label:"Financing Industry Knowledge", href:"" },
      { label:"Business Credit Line (BCL)", href:"" },
      { label:"Banking Account (BA)", href:"" },
      { label:"Future Salary Advance (FSA)", href:"" },
      { label:"First Circle Requirements List", href:"" },
      { label:"AM Success Playbook", href:"" }
    ] },

  { day:3, week:1, title:"FC Connect Platform (Account Staging) + Product Exam 1",
    tasks:[
      { id:"d3-staging", label:"Learn to navigate FC Connect using your Account Staging" }
    ],
    materials:[
      { label:"Add a new team member", href:"" },
      { label:"How to utilise the credit line (draw funds)", href:"" },
      { label:"How to top up the wallet", href:"" },
      { label:"How to transfer funds", href:"" },
      { label:"How to add bank accounts (Contacts)", href:"" }
    ],
    exam:{ id:"exam-product-1", label:"Product Exam 1", href:"", kind:"form", passing:80 } },

  { day:4, week:1, title:"Connect Exam Simulation + Product Exam 2",
    tasks:[
      { id:"d4-sim", label:"Complete the virtual simulation exam", href:"sims/connect-exam.html" }
    ],
    materials:[],
    exam:{ id:"exam-product-2", label:"Product Exam 2", href:"", kind:"form", passing:80 } },

  { day:5, week:1, title:"BVP & Sales Process + Product Exam 3",
    tasks:[
      { id:"d5-referrals", label:"Review how to upload referrals and self-generated leads" },
      { id:"d5-docs",      label:"Review how to request document uploads for review" },
      { id:"d5-reassign",  label:"Review how to request lead re-assignment for self-gen/referral leads" }
    ],
    materials:[
      { label:"How to Upload Referrals and Self-Generated Leads", href:"" },
      { label:"How to Submit Onboarding Documents for Review", href:"" },
      { label:"Lead Assignment Request SOP", href:"" }
    ],
    exam:{ id:"exam-product-3", label:"Product Exam 3", href:"https://forms.gle/fxTBiKNvnyXHWT1d8", kind:"form", passing:80 } },

  { day:6, week:2, title:"Live Call Shadowing",
    tasks:[
      { id:"d6-shadow",  label:"Shadow 2–3 AM calls with a mentor" },
      { id:"d6-notes",   label:"Take notes on objection handling and discovery questions" },
      { id:"d6-reflect", label:"Submit shadowing reflection log" }
    ],
    materials:[ { label:"Call Shadowing Reflection Log Template", href:"" } ] },

  { day:7, week:2, title:"Supervised Sandbox Practice",
    tasks:[
      { id:"d7-mock",    label:"Handle 3–5 mock client scenarios in FC Connect staging (varied industry types)" },
      { id:"d7-signoff", label:"Get coach sign-off per scenario" }
    ],
    materials:[ { label:"Mock Scenario Bank", href:"" } ] },

  { day:8, week:2, title:"Real Account Exposure (Supervised)",
    tasks:[
      { id:"d8-real",  label:"Process 1–2 real accounts under direct supervision" },
      { id:"d8-check", label:"Complete supervisor checklist with no critical errors" }
    ],
    materials:[ { label:"Supervised Account Checklist", href:"" } ] },

  { day:9, week:2, title:"Role-Play Assessment",
    tasks:[
      { id:"d9-roleplay", label:"Complete client-facing role-play: discovery, objection, close" }
    ],
    materials:[ { label:"Role-Play Scorecard Rubric", href:"" } ],
    exam:{ id:"exam-roleplay", label:"Role-Play Assessment", href:"", kind:"trainer", passing:80 } },

  { day:10, week:2, title:"Final Certification",
    tasks:[
      { id:"d10-review", label:"Manager review & final sign-off" }
    ],
    materials:[],
    exam:{ id:"exam-certification", label:"Certification Exam", href:"", kind:"form", passing:80 } }
];

/* Live sessions shown on the dashboard if no Google Calendar is embedded.
   when: "YYYY-MM-DDTHH:MM" in Philippine time. link: Google Meet or calendar event link. */
window.LMS_SESSIONS = [
  { title:"Kickoff with your trainer",   when:"2026-09-30T10:00", minutes:60, link:"" },
  { title:"Products Q&A",                when:"2026-10-01T15:00", minutes:45, link:"" },
  { title:"Connect walkthrough (live)",  when:"2026-10-05T14:00", minutes:60, link:"" },
  { title:"Call shadowing debrief",      when:"2026-10-08T10:00", minutes:60, link:"" },
  { title:"Role-play prep and Q&A",      when:"2026-10-09T15:00", minutes:60, link:"" }
];
