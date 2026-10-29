/* Day 5. Edit only this file to change this day (see modules.js for the fields). */
LMS_DAY_DEFS[5] = {
  title: "Lead Enrollment and Reassignment",
  brief: "Find your way around Acqui Service, our CRM, then learn to request a lead (reassignment) and to enroll a new lead.",
  materialsTitle: "Further Reading",
  materialsBelow: true,        // Further Reading goes under the task groups, not beside them (see dashboard.html)
  // All of these open a simulation of the Acqui Service screens (fake data, nothing real is touched). Practice only: nothing is graded.
  // The sims tick the task themselves when finished (if signed in). Source: sims/acqui-*.html, shared code in sims/acqui/ (see build-standalone.py for the shareable single-file versions).
  tasks: [
    { id: "d5-acqui-tour",         group: "Introduction to Acqui Service", label: "Take the Acqui Service tour",                                        href: "sims/acqui-tour.html" },
    { id: "d5-acqui-practice",     group: "Introduction to Acqui Service", label: "Practice check: find your way around Acqui Service",                 href: "sims/acqui-tour-exam.html" },
    { id: "d5-reassign-lecture",   group: "Getting Leads in Acqui Service", label: "Lecture: request a lead (lead reassignment)",                       href: "sims/acqui-reassign-lecture.html" },
    { id: "d5-create-lecture",     group: "Getting Leads in Acqui Service", label: "Lecture: create a new lead (self-generated and referral)",          href: "sims/acqui-create-lecture.html" },
    { id: "d5-reassign-practice",  group: "Getting Leads in Acqui Service", label: "Practice check: lead reassignment and creating a new lead",         href: "sims/acqui-reassign-exam.html" }
  ],
  // Product Exam 3 has no questions yet (soon: true = shown but does not block the day). Remove soon when exams/questions.js is filled in.
  exams: [
    { id: "exam-product-3", label: "Product Exam 3", href: "exams/product-exam.html?e=3", kind: "lms", passing: 80, soon: true }
  ],
  // Not ready yet: shown with a "Soon" bubble beside the task groups. Summary only, not tasks.
  comingSoon: {
    title: "Referrers in Acqui Service",
    items: [
      "Registration of referrer"
    ]
  },
  // No href = shows "Link coming soon". TODO: add the Slack PDF (put it in lessons/d05-assets/). The Notion link is the "Document Guidelines" bookmark from downloads/Bookmarks.html.
  materials: [
    { label: "Doc upload request (Slack), PDF" },
    { label: "How to review onboarding docs (Notion)", href: "https://app.notion.com/p/firstcircle/How-to-Review-Onboarding-Documents-404df9ae1e7e4943b5bca9e0efcc8f0b", link: true }
  ]
};
