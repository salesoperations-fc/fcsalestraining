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

const GRADES_SHEET = "Grades";      // one row per scored attempt
const PROGRESS_SHEET = "Progress";  // one row per completed task/lesson
const GRADES_HEADER = ["Timestamp", "Email", "Name", "Exam ID", "Attempt", "Score", "Max", "Percent", "Passed", "Details"];
const PROGRESS_HEADER = ["Timestamp", "Email", "Name", "Item ID"];

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const user = verifyToken_(req.token);          // throws if bad or not a company account
    const p = req.payload || {};

    if (req.action === "verify") return json_({ ok: true, email: user.email });

    if (req.action === "saveResult") {
      const pct = p.max ? Math.round((p.score / p.max) * 1000) / 10 : "";
      sheet_(GRADES_SHEET, GRADES_HEADER).appendRow([new Date(), user.email, user.name, p.id, p.attempt, p.score, p.max, pct, p.passed ? "Yes" : "No", p.details || ""]);
      return json_({ ok: true });
    }
    if (req.action === "complete") {
      sheet_(PROGRESS_SHEET, PROGRESS_HEADER).appendRow([new Date(), user.email, user.name, p.id]);
      return json_({ ok: true });
    }
    return json_({ ok: false, error: "unknown-action" });
  } catch (err) {
    return json_({ ok: false, error: String(err.message || err) });
  }
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

function sheet_(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
