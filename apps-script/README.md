# Backend setup (Google Sheet + Apps Script)

1. Create a new Google Sheet (e.g. "AM Onboarding Hub — Grades").
2. In the Sheet: **Extensions → Apps Script**. Paste the contents of `Code.gs`.
3. Leave `AUTH_MODE = "email"` for now (no Google Cloud needed). Later, set `CLIENT_ID` and change it to `"google"`.
4. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**.
   (The script checks every request's Google token, so "Anyone" can't write without a valid @firstcircle.com sign-in.)
5. Copy the web app URL into `backendUrl` in `shared/lms.js`.
6. Admins view grades by opening the Sheet itself (share it only with admins). Google Sheets controls who can see it.

## Google OAuth client ID
1. console.cloud.google.com → create/select a project.
2. APIs & Services → OAuth consent screen → **Internal** (limits sign-in to your Workspace).
3. Credentials → Create credentials → OAuth client ID → **Web application**.
4. Authorized JavaScript origins: `http://localhost:8000` (testing) and your GitHub Pages URL (live).

Grades land in the **Grades** tab (one row per attempt); completed tasks in **Progress**.
