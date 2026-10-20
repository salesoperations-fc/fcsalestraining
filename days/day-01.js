/* Day 1. Edit only this file to change this day (see modules.js for the fields). */
LMS_DAY_DEFS[1] = {
  title: "Tools Set Up & Orientation",
  tasks: [
    { id: "d1-bookmarks",  label: "Add the First Circle bookmarks to Chrome", href: "lessons/d01-bookmarks.html" },
    { id: "d1-slack-icon", label: "Set your Slack icon (profile photo)",      href: "lessons/d01-slack-icon.html" }
  ],
  // dl:true = shows the download icon and opens in a new tab. download:"name" = saves the file without leaving the page.
  materials: [
    { label: "Macbook Basics.pdf",  href: "downloads/Macbook Basics.pdf", dl: true },
    { label: "Bookmarks.html",      href: "downloads/Bookmarks.html",     dl: true, download: "Bookmarks.html" },
    { label: "Apps Overview.pdf",   href: "downloads/Apps Overview.pdf",  dl: true }
  ],
  exam: { id: "d1-exam-responsible-selling", label: "Foundations of Responsible Selling / Code of Conduct", href: "lessons/d01-exam-responsible-selling.html", kind: "lms", passing: 100 }
};
