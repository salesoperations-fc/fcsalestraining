/* =========================================================
   TEMPORARY access list (used while Google sign-in is being set up).

   Only these emails can get in. Admins also see the Admin/Grades pages.
   To REMOVE this stopgap later: set emailLogin:false in shared/lms.js
   and delete this file plus its <script> tag in index.html.

   NOTE: this repo is public, so anything in this file is publicly readable.
   ========================================================= */
window.LMS_ROSTER = {
  admins: [
    "salesoperations@firstcircle.com",
    "nice.junsay@firstcircle.com",
    "hanna.jo@firstcircle.com",
    "reyster.barron@firstcircle.com",
    "charles.allen@firstcircle.com",
    "alan.smyth@firstcircle.com"
  ],
  // Onboardees grouped by batch. Batch number = start date as MMDDYY (101926 = Oct 19, 2026).
  batches: {
    "101926": [
      "ayrton.arteficio@firstcircle.com",
      "charles.gito@firstcircle.com",
      "jhoana.akut@firstcircle.com",
      "giovanni.capawa@firstcircle.com",
      "joana.jayme@firstcircle.com",
      "cristina.articona@firstcircle.com",
      "leslie.reyes@firstcircle.com",
      "elaine.fantolgo@firstcircle.com"
    ]
  }
};
