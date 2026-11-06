/* =========================================================
   Multiple-choice exams that use the generic engine (exams/product-exam.html?e=2|3).
   Product Exam 1 is the real "Product Knowledge Examination 1" on Day 3 (exams/product-knowledge-1.html).

   Exams 2 and 3 became the Product Knowledge Examinations on Day 4 and Day 5 (their own pages). Nothing uses this engine right now.

   Each exam:  { id, title, passing, questions:[ { q, options:[...], answer:<index of the right option>, why } ] }
   - id        the exam id saved to the Sheet (don't rename once people have results)
   - passing   pass mark in percent
   - why       optional one-line explanation shown after the exam
   ========================================================= */
window.LMS_EXAMS = {
  /* Product Exam 3 became "Product Knowledge Examination 3" (exams/product-knowledge-3.html, Day 5). Add new engine exams here as "4", "5"... */
};
