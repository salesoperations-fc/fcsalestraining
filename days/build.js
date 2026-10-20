/* Assembles window.LMS_DAYS from the per-day files. Loaded last by modules.js. Don't edit. */
window.LMS_DAYS = Array.from({ length: 10 }, (_, i) => {
  const day = i + 1;
  return { day, week: day <= 5 ? 1 : 2, title: "", brief: "", tasks: [], materials: [], ...(window.LMS_DAY_DEFS[day] || {}) };
});
