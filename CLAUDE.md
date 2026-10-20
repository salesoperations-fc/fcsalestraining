# AM Onboarding Hub: project notes for Claude

A learning site for new First Circle Account Managers (AMs): sign in, work through a 10-day path, take exams, get graded.
Static site on GitHub Pages (`salesoperations-fc/fcsalestraining`), no build step. Plain HTML/CSS/JS plus a Google Apps Script backend that writes to a Google Sheet.

## Working with the owner
- Owner: Sales Operations (salesoperations@firstcircle.com). Mixes English and Filipino; keep replies short and plain.
- Commit only when asked. End commit messages with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Nothing is pushed or live until they click **Push origin** / merge in GitHub Desktop. Never push without being told.
- Preview locally: `python3 -m http.server 8000` in this folder, open http://localhost:8000/index.html. Test sign-in with an email from `shared/roster.js`.
- Their IT is away until Thursday (2026-10-22): no Google Cloud project, so no real Google sign-in or OAuth client ID yet.

## Branches and state
- Work is on branch `google-signin-sheets` (not yet pushed). `main` has only the rename commit on top of the original upload.
- To go live: Publish branch in GitHub Desktop, open a PR, merge to `main`. GitHub Pages serves `main`.

## How it works
- `index.html`: sign-in. Shows a Google-styled button that opens an email box (stopgap). Not-on-list message: "Email unauthorized. Please contact Salesops." Success shows a 1s "Signing you in" screen.
- `shared/lms.js`: config, sign-in checks, progress saving (browser localStorage, key `amacademy`), sends results to the backend.
  - `emailLogin: true` = TEMPORARY email-list login. To remove it: set false, delete `shared/roster.js` and the `document.write` line near the top of lms.js, switch `AUTH_MODE` to "google" in the Apps Script.
- `shared/roster.js`: allowed emails. `admins` see the Grades page, `learners` do not. The same list is duplicated in `apps-script/Code.gs` (keep in sync). Repo is public, so these emails are public.
- `shared/shell.js`: sidebar and helpers shared by pages. `shared/theme.css`: look and feel.
- `dashboard.html`: 10 day cells (5 x 2). Clicking a cell opens a dropdown under that row. Static icons: padlock (locked), check (complete), half circle (in progress). Right column: Upcoming sessions, Graded exams.
- `grades.html`: admin-only. Loads grades from the Sheet via the backend (needs an admin passcode).
- `days/day-01.js` ... `day-10.js`: ONE FILE PER DAY (title, brief, tasks, materials, exam). To work on a day, edit only its file (plus its own lesson pages, e.g. `lessons/d02-*.html`), so several chats can work on different days at once without conflicts. Day 1 has a SAMPLE task and exam to replace. Days 2 to 10 have titles and a short `brief`.
- `modules.js`: loads the day files, then `days/build.js` assembles `window.LMS_DAYS`. Also holds week labels and live sessions. Don't put day content here.
- `sims/connect-exam.html`: Connect simulation exam. Kept in the repo but not linked from any day. Reports its score as `exam-connect-sim`.
- `apps-script/Code.gs`: backend. Deployed as a web app (Execute as owner, access Anyone). `backendUrl` in lms.js points to it. Writes to the `Grades` and `Progress` tabs BY COLUMN NAME (columns can be reordered or added). `ADMIN_PASSCODE` must be set (not "CHANGE-ME") before grades.html works; after editing Code.gs, redeploy as a New version.

## Rules built into the dashboard
- A day completes when all its tasks are ticked and its exam (if any) is done. Day N+1 unlocks when day N is complete.
- A day with no content yet can't be completed, so it keeps later days locked.
- Start date for everyone is 2026-10-19 (`demoUser.startDate` in lms.js).

## Known gaps and next steps
- The new Code.gs (header-based writes + `adminData`) has been committed but may not be deployed yet. The earlier version is live.
- Set the real `ADMIN_PASSCODE`, redeploy, then test grades.html with real data.
- Real Google sign-in once IT creates the Cloud project (see `apps-script/README.md`).
- Google Form and trainer-scored exams do not auto-report scores; trainers add them to the Grades tab by hand (the Grades page will show them).
- Content is being rewritten day by day, one chat per day. A day-chat edits only its `days/day-NN.js` (and its own lesson files). New exams go in one at a time. Exam ids must be unique and never renamed once people have results.
- Email-only login is spoofable (anyone who knows a listed email). Fine as a stopgap only.
