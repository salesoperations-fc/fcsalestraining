/* Day 4. Edit only this file to change this day (see modules.js for the fields). */
LMS_DAY_DEFS[4] = {
  title: "Connect Exam Simulation",
  brief: "Virtual simulation exam for FC Connect.",
  tasks: [],
  materials: [],
  // kind "sim": opens the simulation, which records the result itself (no manual "I've submitted it" button). Pass mark matches PASS_MARK in sims/connect-exam.html.
  exams: [
    { id: "d4-exam-connect-sim", label: "Connect Simulation Exam", href: "sims/connect-exam.html", kind: "sim", passing: 80 },
    // Questions and answer keys: exams/product-knowledge-2-questions.js
    { id: "exam-product-knowledge-2", label: "Product Knowledge Examination 2", href: "exams/product-knowledge-2.html", kind: "lms", passing: 80 }
  ]
};
