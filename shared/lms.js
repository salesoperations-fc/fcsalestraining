/* =========================================================
   First Circle AM Academy — lms.js
   Loaded by every page. Handles who's signed in and saving progress.

   RIGHT NOW: demo mode. Progress is saved in this browser only,
   so you can test everything offline or on GitHub Pages.

   LATER: fill in googleClientId + backendUrl (Apps Script) and set
   demo:false. Pages don't need to change — they keep calling
   LMS.complete() / LMS.saveResult() exactly the same way.
   ========================================================= */

window.LMS_CONFIG = {
  appName: "AM Academy",
  company: "First Circle",
  programDays: 10,

  demo: true,                         // set to false once sign-in is set up
  demoUser: { name: "Juan dela Cruz", email: "juan.delacruz@firstcircle.ph", startDate: "2026-09-30" },

  googleClientId: "",                 // from Google Cloud (step 4 of the build)
  allowedDomain: "firstcircle.ph",    // only these Google accounts can sign in
  backendUrl: "",                     // Apps Script web app URL (step 4)
  adminEmails: [],                    // who can open admin.html, e.g. ["tm.name@firstcircle.ph"]

  calendar: {
    // Paste your TL's shared Google Calendar here (Settings → Integrate calendar → "Embed code" src link).
    embedSrc: "",
    // A link that opens the training calendar in Google Calendar.
    link: ""
  }
};

(function(){
  const C = window.LMS_CONFIG;
  const KEY = "amacademy";

  function read(k, fallback){ try { const v = localStorage.getItem(`${KEY}.${k}`); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } }
  function write(k, v){ try { localStorage.setItem(`${KEY}.${k}`, JSON.stringify(v)); } catch(e){} }

  function currentUser(){
    if (C.demo) return read("user", null) || { ...C.demoUser };
    return read("user", null);          // set by index.html after Google sign-in
  }
  function progressKey(){ const u = currentUser(); return `progress.${u ? u.email : "anon"}`; }

  const LMS = {
    config: C,

    /** Who's signed in. Returns null if nobody (non-demo). */
    user: currentUser,

    /** Send people to the sign-in page if they're not signed in. */
    requireSignIn(){
      if (!currentUser()){ location.href = (location.pathname.includes("/lessons/")||location.pathname.includes("/sims/")) ? "../index.html" : "index.html"; return false; }
      return true;
    },

    isAdmin(){ const u = currentUser(); return !!u && (C.demo || C.adminEmails.map(e=>e.toLowerCase()).includes(u.email.toLowerCase())); },

    /** All progress for the signed-in person: { moduleId: {status, score, max, attempts, updated} } */
    progress(){ return read(progressKey(), {}); },

    /** Mark a module as opened (only if not already further along). */
    start(id){
      const p = LMS.progress();
      if (!p[id]) { p[id] = { status:"started", attempts:0, updated:Date.now() }; write(progressKey(), p); }
    },

    /** Mark a lesson as done (no score). */
    complete(id){
      const p = LMS.progress(), prev = p[id] || {};
      p[id] = { ...prev, status:"done", updated:Date.now() };
      write(progressKey(), p);
      return Promise.resolve(p[id]);    // later: also sent to the backend
    },

    /** Save a scored attempt (quiz, sim, exam). Keeps every attempt and the best score. */
    saveResult(id, result){
      const p = LMS.progress(), prev = p[id] || { attempts:0, history:[] };
      const attempt = { score:result.score, max:result.max, passed:!!result.passed, at:Date.now() };
      const history = [...(prev.history||[]), attempt];
      const best = history.reduce((a,b)=> (b.score/b.max) > (a.score/a.max) ? b : a);
      p[id] = { status:"done", score:best.score, max:best.max, passed:best.passed, attempts:history.length, history, updated:Date.now() };
      write(progressKey(), p);
      return Promise.resolve(p[id]);    // later: also sent to the backend with result.details
    },

    signOut(){
      try { localStorage.removeItem(`${KEY}.user`); } catch(e){}
      if (C.demo) { alert("Demo mode: there's no real sign-in yet, so you'll stay signed in as the demo user."); return; }
      location.href = "index.html";
    },

    /** Reset demo progress (handy while testing). */
    resetDemo(){ try { localStorage.removeItem(`${KEY}.${progressKey()}`); } catch(e){} location.reload(); },

    initials(name){ return String(name||"").trim().split(/\s+/).map(w=>w[0]||"").join("").slice(0,2).toUpperCase(); },
    firstName(name){ return String(name||"").trim().split(/\s+/)[0] || ""; }
  };

  window.LMS = LMS;
})();
