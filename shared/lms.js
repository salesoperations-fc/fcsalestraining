/* =========================================================
   First Circle AM Onboarding Hub — lms.js
   Loaded by every page. Handles who's signed in and saving progress.

   RIGHT NOW: demo mode. Progress is saved in this browser only,
   so you can test everything offline or on GitHub Pages.

   LATER: fill in googleClientId + backendUrl (Apps Script) and set
   demo:false. Pages don't need to change — they keep calling
   LMS.complete() / LMS.saveResult() exactly the same way.
   ========================================================= */

/* TEMPORARY email login: load the access list that sits next to this file.
   To remove the stopgap, delete this line and shared/roster.js. */
try { document.write('<script src="' + document.currentScript.src.replace(/lms\.js(\?.*)?$/, "roster.js") + '"><\/script>'); } catch(e){}

window.LMS_CONFIG = {
  appName: "AM Onboarding Hub",
  company: "First Circle",
  programDays: 10,

  demo: false,                        // true = fake demo user, progress in this browser only
  emailLogin: true,                   // TEMPORARY: sign in by typing an email on the list in shared/roster.js. Set false once Google sign-in is live.
  demoUser: { name: "Juan dela Cruz", email: "juan.delacruz@firstcircle.com", startDate: "2026-10-19" },

  googleClientId: "",                 // from Google Cloud (step 4 of the build)
  allowedDomain: "firstcircle.com",    // only these Google accounts can sign in
  backendUrl: "",                     // Apps Script web app URL (step 4)
  adminEmails: [],                    // who can open admin.html, e.g. ["tm.name@firstcircle.com"]

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
  function storedUser(){ return read("user", null); }
  const roster = () => window.LMS_ROSTER || { admins:[], learners:[] };   // read lazily: roster.js loads just after this file
  const lc = a => (a||[]).map(e => String(e).trim().toLowerCase());
  function isCompanyEmail(email){
    const d = String(C.allowedDomain||"").toLowerCase();
    return !!email && String(email).toLowerCase().endsWith("@"+d);
  }
  /* Temporary email login: must be on the roster. Google mode: any company email. */
  function isAllowed(email){
    if (!isCompanyEmail(email)) return false;
    if (!C.emailLogin) return true;
    const e = String(email).trim().toLowerCase();
    return lc(roster().admins).includes(e) || lc(roster().learners).includes(e);
  }
  /* Decode the payload of a Google ID token (for display only; the backend does the real check). */
  function decodeJwt(t){
    try { const b = t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");
      return JSON.parse(decodeURIComponent(atob(b).split("").map(c=>"%"+c.charCodeAt(0).toString(16).padStart(2,"0")).join(""))); }
    catch(e){ return null; }
  }
  /* Send an event to the Apps Script backend (which writes to the Google Sheet). No-op in demo mode. */
  function send(action, payload){
    if (C.demo || !C.backendUrl) return Promise.resolve(null);
    let token = ""; try { token = sessionStorage.getItem(`${KEY}.idtoken`) || ""; } catch(e){}
    return fetch(C.backendUrl, {
      method:"POST",
      headers:{ "Content-Type":"text/plain;charset=utf-8" },   // avoids a CORS preflight, which Apps Script can't answer
      body: JSON.stringify({ action, token, payload, email: (currentUser()||{}).email, name: (currentUser()||{}).name })   // email/name are used only in the temporary email-list mode
    }).then(r=>r.json()).catch(()=>null);
  }
  function progressKey(){ const u = currentUser(); return `progress.${u ? u.email : "anon"}`; }

  const LMS = {
    config: C,

    /** Who's signed in. Returns null if nobody (non-demo). */
    user: currentUser,

    /** The saved user, or null. Unlike user(), never falls back to the demo user. */
    storedUser,

    /** True if this email belongs to the allowed company domain. */
    isCompanyEmail,

    /** True if this email may sign in (company domain, and on the roster while emailLogin is on). */
    isAllowed,

    /**
     * Sign in with a Google ID token (the "credential" Google hands back).
     * Rejects if the account isn't on the company domain. The backend repeats the
     * check on its side, because anything in the browser can be bypassed.
     */
    async signInWithGoogle(credential){
      const claims = decodeJwt(credential);
      if (!claims || !isCompanyEmail(claims.email)) throw new Error("not-company");
      if (C.backendUrl) {
        try { sessionStorage.setItem(`${KEY}.idtoken`, credential); } catch(e){}
        const res = await send("verify", {});
        if (!res || !res.ok) { try { sessionStorage.removeItem(`${KEY}.idtoken`); } catch(e){} throw new Error(res && res.error || "backend"); }
      }
      write("user", { name: claims.name || claims.email, email: claims.email.toLowerCase(), picture: claims.picture || "", startDate: C.demoUser.startDate });
    },

    /** Temporary sign-in by typed email (stopgap until Google sign-in is live). */
    signInDemo(email){
      email = String(email).trim();
      if (!isAllowed(email)) throw new Error(isCompanyEmail(email) ? "not-on-list" : "not-company");
      const local = String(email).split("@")[0];
      const name = local.split(/[._-]/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
      write("user", { name, email:String(email).toLowerCase(), startDate: C.demoUser.startDate });
    },

    /** Send people to the sign-in page if they're not signed in. */
    requireSignIn(){
      if (!currentUser() || (!C.demo && !isAllowed(currentUser().email))){ location.href = (location.pathname.includes("/lessons/")||location.pathname.includes("/sims/")) ? "../index.html" : "index.html"; return false; }
      return true;
    },

    isAdmin(){ const u = currentUser(); return !!u && (C.demo || [...lc(C.adminEmails), ...lc(roster().admins)].includes(u.email.toLowerCase())); },

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
      send("complete", { id });
      return Promise.resolve(p[id]);
    },

    /** Undo a tick (task unchecked, exam submission undone). */
    undo(id){
      const p = LMS.progress();
      if (p[id] && !p[id].max) { delete p[id]; write(progressKey(), p); }
      return Promise.resolve(null);
    },

    /** Save a scored attempt (quiz, sim, exam). Keeps every attempt and the best score. */
    saveResult(id, result){
      const p = LMS.progress(), prev = p[id] || { attempts:0, history:[] };
      const attempt = { score:result.score, max:result.max, passed:!!result.passed, at:Date.now() };
      const history = [...(prev.history||[]), attempt];
      const best = history.reduce((a,b)=> (b.score/b.max) > (a.score/a.max) ? b : a);
      p[id] = { status:"done", score:best.score, max:best.max, passed:best.passed, attempts:history.length, history, updated:Date.now() };
      write(progressKey(), p);
      send("saveResult", { id, score:result.score, max:result.max, passed:!!result.passed, attempt:history.length, details:result.details || "" });
      return Promise.resolve(p[id]);
    },

    signOut(){
      try { localStorage.removeItem(`${KEY}.user`); sessionStorage.removeItem(`${KEY}.idtoken`); } catch(e){}
      location.href = "index.html";
    },

    /** Reset demo progress (handy while testing). */
    resetDemo(){ try { localStorage.removeItem(`${KEY}.${progressKey()}`); } catch(e){} location.reload(); },

    initials(name){ return String(name||"").trim().split(/\s+/).map(w=>w[0]||"").join("").slice(0,2).toUpperCase(); },
    firstName(name){ return String(name||"").trim().split(/\s+/)[0] || ""; }
  };

  window.LMS = LMS;
})();
