# AM Academy (First Circle)

Training site for new Account Managers. Hosted on GitHub Pages.

## What's here
- `dashboard.html`: AM home: 10-day track, today's modules, up next, live sessions
- `modules.js`: the course outline. Edit this to add, remove, or reorder lessons and sessions.
- `shared/lms.js`: settings (calendar link, admins, sign-in) and progress saving
- `shared/theme.css` + `shared/fonts/`: the look shared by every page
- `sims/`: simulations and exams (e.g. `connect-exam.html`)
- `lessons/`: lesson pages (one HTML file per lesson)

## Status
Demo mode: progress is saved in each person's browser only.
Coming next: lesson template, grades, Google sign-in, admin view.

## Adding a lesson (once the template exists)
1. Copy `lessons/_template.html`, rename it, and fill in the content.
2. Add one entry for it in `modules.js` with `ready:true`.
3. Upload both files to this repo.
