/* List of every exam, used by the admin Exams tab (exams.html) and to label exams on the Grades page.
   id must match the exam id that gets saved to the Sheet. href is relative to the site root.
   group: "product" | "simulation" | "other" (the Exams tab shows them in these sections).
   empty: true = no questions yet (Preview is disabled). */
window.LMS_EXAM_LIST = [
  { group: "product", id: "d3-exam-product-knowledge-1", title: "Product Knowledge Examination 1", where: "Day 3", type: "Multiple choice, true/false, typed and tick-all questions, shuffled", href: "exams/product-knowledge-1.html" },
  { group: "product", id: "exam-product-2", title: "Product Exam 2", where: "Not on a day yet", type: "Multiple choice. No questions yet", href: "exams/product-exam.html?e=2", empty: true },
  { group: "product", id: "exam-product-3", title: "Product Exam 3", where: "Not on a day yet", type: "Multiple choice. No questions yet", href: "exams/product-exam.html?e=3", empty: true },
  { group: "simulation", id: "d4-exam-connect-sim", title: "Connect Simulation Exam", where: "Day 4", type: "Simulation with scored steps and notes", href: "sims/connect-exam.html" },
  { group: "simulation", id: "d5-acqui-practice", title: "Acqui Service Navigation Check (practice)", where: "Day 5", type: "Practice, 15 situational tasks (click, type, pick). Not graded", href: "sims/acqui-tour-exam.html" },
  { group: "other", id: "d1-exam-responsible-selling", title: "Foundations of Responsible Selling", where: "Day 1", type: "Agree to 16 statements", href: "lessons/d01-exam-responsible-selling.html" }
];
