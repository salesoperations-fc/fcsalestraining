/* =========================================================
   Multiple-choice exams that use the generic engine (exams/product-exam.html?e=2|3).
   Product Exam 1 is the real "Product Knowledge Examination 1" on Day 3 (exams/product-knowledge-1.html).

   Product Exams 2 and 3 are not on a day yet and have NO QUESTIONS yet: the exam page says "No questions yet".
   Fill in `questions` when they're ready.

   Each exam:  { id, title, passing, questions:[ { q, options:[...], answer:<index of the right option>, why } ] }
   - id        the exam id saved to the Sheet (don't rename once people have results)
   - passing   pass mark in percent
   - why       optional one-line explanation shown after the exam
   ========================================================= */
window.LMS_EXAMS = {
  "2": { id: "exam-product-2", title: "Product Exam 2", passing: 80, questions: [] },
  "3": { id: "exam-product-3", title: "Product Exam 3", passing: 80, questions: [] }
};
