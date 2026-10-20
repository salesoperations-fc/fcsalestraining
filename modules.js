/* =========================================================
   AM Onboarding Hub — 2-Week Learning Path (course outline)
   This is the only file to edit when changing the program.

   Content is being rewritten, so every day is empty for now
   (the dashboard shows "Content coming soon" for these).

   To fill in a day, give it a title and any of:
     tasks      checklist items. Each needs a short unique id (don't rename once people start).
                { id:"d1-welcome", label:"Read the welcome note", href:"lessons/d1-welcome.html" }
     materials  reading/links: { label, href }
     exam       optional graded item. It must be done before the next day unlocks.
                { id, label, href, kind, passing }
                kind: "form"    = Google Form or other link (trainer records the score)
                      "sim"     = one of our simulations
                      "trainer" = scored live by the trainer

   The Connect simulation exam is still in the repo at sims/connect-exam.html.
   To bring it back, add this to a day (it reports its score to the Sheet by itself):
     exam:{ id:"exam-connect-sim", label:"Connect Simulation", href:"sims/connect-exam.html", kind:"sim", passing:80 }
   ========================================================= */

window.LMS_WEEKS = { 1: "Week 1", 2: "Week 2" };

window.LMS_DAYS = [
  { day:1,  week:1, title:"", tasks:[], materials:[] },
  { day:2,  week:1, title:"", tasks:[], materials:[] },
  { day:3,  week:1, title:"", tasks:[], materials:[] },
  { day:4,  week:1, title:"", tasks:[], materials:[] },
  { day:5,  week:1, title:"", tasks:[], materials:[] },
  { day:6,  week:2, title:"", tasks:[], materials:[] },
  { day:7,  week:2, title:"", tasks:[], materials:[] },
  { day:8,  week:2, title:"", tasks:[], materials:[] },
  { day:9,  week:2, title:"", tasks:[], materials:[] },
  { day:10, week:2, title:"", tasks:[], materials:[] }
];

/* Live sessions shown on the dashboard if no Google Calendar is embedded.
   when: "YYYY-MM-DDTHH:MM" in Philippine time. link: Google Meet or calendar event link.
   Example: { title:"Kickoff with your trainer", when:"2026-10-19T10:00", minutes:60, link:"" } */
window.LMS_SESSIONS = [];
