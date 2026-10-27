/* Day 5. Edit only this file to change this day (see modules.js for the fields). */
LMS_DAY_DEFS[5] = {
  title: "Acqui Service",
  brief: "Learn to find your way around Acqui Service, our CRM: Home, My Lead List, Originations, Referrers and Open BCLs.",
  materialsTitle: "Further Reading",
  materialsBelow: true,        // Further Reading goes under the task groups, not beside them (see dashboard.html)
  // Both open a simulation of the Acqui Service screens (fake data, nothing real is touched). Practice only: nothing is graded.
  // The sims tick the task themselves when finished (if signed in). Source: sims/acqui-tour.html, sims/acqui-tour-exam.html, shared code in sims/acqui/.
  tasks: [
    { id: "d5-acqui-tour",     group: "Introduction to Acqui Service", label: "Take the Acqui Service tour",                              href: "sims/acqui-tour.html" },
    { id: "d5-acqui-practice", group: "Introduction to Acqui Service", label: "Practice check: find your way around Acqui Service",       href: "sims/acqui-tour-exam.html" }
  ],
  // Not ready yet: shown with a "Soon" bubble under the task groups. Summary only, not tasks.
  comingSoon: {
    title: "Getting Leads in Acqui Service",
    items: [
      "Lead Reassignment",
      { label: "New Lead Creation (referral)", sub: ["Registration of referrer"] },
      "New Lead Creation (self-generated)"
    ]
  },
  // No href = shows "Link coming soon". TODO: add the Slack PDF (put it in lessons/d05-assets/) and the Notion link.
  materials: [
    { label: "Doc upload request (Slack), PDF" },
    { label: "How to review onboarding docs (Notion)" }
  ]
};
