/**
 * AM Onboarding Hub — backend (Google Apps Script)
 *
 * Verifies the Google sign-in token, then records progress and grades in the
 * Google Sheet this script is attached to.
 *
 * Setup: see apps-script/README.md
 */

const CLIENT_ID = "PASTE_YOUR_GOOGLE_CLIENT_ID_HERE";
const ALLOWED_DOMAIN = "firstcircle.com";

// "email" = TEMPORARY: trust a typed email if it is in BATCHES or ADMIN_EMAILS (no Google sign-in needed).
//            Not secure: anyone who knows a listed email could submit as that person.
// "google" = verify the Google sign-in token (use once the OAuth client ID exists).
const AUTH_MODE = "email";
const BATCHES = {                 // batch number (start date, MMDDYY) -> onboardee emails. Keep in sync with shared/roster.js
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
};

// Who may open the Grades page (admins are allowed in automatically), and the shared passcode they type there.
// Change the passcode before using it. While it is "CHANGE-ME", the Grades page is refused.
const ADMIN_EMAILS = [
  "salesoperations@firstcircle.com", "nice.junsay@firstcircle.com", "hanna.jo@firstcircle.com",
  "reyster.barron@firstcircle.com", "charles.allen@firstcircle.com", "alan.smyth@firstcircle.com"
];
const ADMIN_PASSCODE = "CHANGE-ME";

const GRADES_SHEET = "Grades";      // one row per scored attempt
const PROGRESS_SHEET = "Progress";  // one row per completed task/lesson
const GRADES_HEADER = ["Timestamp", "Email", "Name", "Batch", "Exam ID", "Attempt", "Score", "Max", "Percent", "Passed", "Details"];
const PROGRESS_HEADER = ["Timestamp", "Email", "Name", "Batch", "Item ID"];

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const user = AUTH_MODE === "email" ? checkEmail_(req) : verifyToken_(req.token);   // throws if not allowed
    const p = req.payload || {};

    if (req.action === "verify") return json_({ ok: true, email: user.email });

    if (req.action === "saveResult") {
      const pct = p.max ? Math.round((p.score / p.max) * 1000) / 10 : "";
      appendByHeader_(sheet_(GRADES_SHEET, GRADES_HEADER), { "Timestamp": new Date(), "Email": user.email, "Name": user.name, "Batch": user.batch || "", "Exam ID": p.id, "Attempt": p.attempt, "Score": p.score, "Max": p.max, "Percent": pct, "Passed": p.passed ? "Yes" : "No", "Details": p.details || "" });
      return json_({ ok: true });
    }
    if (req.action === "complete") {
      appendByHeader_(sheet_(PROGRESS_SHEET, PROGRESS_HEADER), { "Timestamp": new Date(), "Email": user.email, "Name": user.name, "Batch": user.batch || "", "Item ID": p.id });
      return json_({ ok: true });
    }
    if (req.action === "adminData") {
      if (ADMIN_PASSCODE === "CHANGE-ME") throw new Error("passcode-not-set");
      if (ADMIN_EMAILS.indexOf(user.email) === -1 || p.passcode !== ADMIN_PASSCODE) throw new Error("not-admin");
      return json_({ ok: true, grades: readRows_(GRADES_SHEET), progress: readRows_(PROGRESS_SHEET) });
    }
    return json_({ ok: false, error: "unknown-action" });
  } catch (err) {
    return json_({ ok: false, error: String(err.message || err) });
  }
}

/** Temporary mode: accept an email that is on the allow list. */
function checkEmail_(req) {
  const email = String(req.email || "").trim().toLowerCase();
  const batch = Object.keys(BATCHES).filter(function (k) { return BATCHES[k].indexOf(email) !== -1; })[0] || "";
  if (!email.endsWith("@" + ALLOWED_DOMAIN) || (!batch && ADMIN_EMAILS.indexOf(email) === -1)) throw new Error("not-on-list");
  return { email: email, name: req.name || email, batch: batch };
}

/** Ask Google to validate the ID token, then enforce audience and domain. */
function verifyToken_(token) {
  if (!token) throw new Error("no-token");
  const res = UrlFetchApp.fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(token), { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error("bad-token");
  const t = JSON.parse(res.getContentText());
  if (t.aud !== CLIENT_ID) throw new Error("wrong-app");
  if (String(t.email_verified) !== "true") throw new Error("email-not-verified");
  if (!String(t.email).toLowerCase().endsWith("@" + ALLOWED_DOMAIN)) throw new Error("not-company");
  return { email: String(t.email).toLowerCase(), name: t.name || t.email };
}

/** Write a row by matching column NAMES in row 1, so you can reorder columns or add your own. */
function appendByHeader_(sh, obj) {
  const headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
  sh.appendRow(headers.map(function (h) { return obj.hasOwnProperty(h) ? obj[h] : ""; }));
}

/** Read every row as an object keyed by the column names in row 1. */
function readRows_(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getDataRange().getValues(), headers = values[0];
  return values.slice(1).filter(function (r) { return r.join("") !== ""; }).map(function (r) {
    const o = {};
    headers.forEach(function (h, i) { o[h] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  });
}

function sheet_(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
