/* Practice check: lead reassignment and enrollment of new leads. Loaded before exam.js, which runs these tasks instead of the navigation check.
   The story of each question is a chat on the right (the owner, or Mia Santos, the referrer who refers a lot). Nothing says what to click.
   1 self-generated, lead exists but is Onboarded -> must NOT be requested   2 self-generated, lead exists -> request it
   3 self-generated, new lead, SEC certificate in the camera roll            4 referral, new lead, only the business name (DTI sole prop): search it yourself
   5 referral, lead already exists (nobody says so): search first, then request. Creating it anyway = error and half the points.
   Each question is graded per field (channel, referrer, registration number...). Weights add up to 1. Notes on a request give a small bonus. */
(function(){
  if (window.ACQUI_ONE_REFERRER) ACQUI_ONE_REFERRER();   /* one referrer (Mia Santos) enrolled, no leads yet */
  function L(id){ return LEADS.filter(function(l){ return l.id === id; })[0]; }
  function norm(s){ return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function unrequest(d){ if (d && d.req && d.id && typeof pending !== "undefined") { delete pending[d.id]; } render(); }
  function removeLead(d){ if (d && d.ch && d.id) { for (var i = 0; i < LEADS.length; i++) { if (LEADS[i].id === d.id) { LEADS.splice(i, 1); break; } } } render(); }
  function removeByName(name){ for (var i = LEADS.length - 1; i >= 0; i--) { if (LEADS[i].owner === "me" && norm(LEADS[i].name) === norm(name)) LEADS.splice(i, 1); } }
  function clearPending(id){ if (typeof pending !== "undefined") delete pending[id]; }
  /* trying to Create Lead for a lead that already exists is blocked in the app: a deduction (question 5 halves the points instead) */
  function dupMsg(ev){ return ev === "lead-create-blocked" ? { msg: "That lead already exists. You can't create it again. Request the lead instead.", cost: 0.5 } : null; }
  /* Riverside Lumber Trading is a finished account: Onboarded, fully verified BCL, BA approved, with revenue estimate and limits */
  function onboarded(){ var l = L("184422"); l.status = "Onboarded"; l.risk = "Fully Verified with Future Revenue"; l.ba = "Approved"; l.rev = 1200000; l.bclAmt = 500000; l.clo = 500000; clearPending("184422"); }
  var notesOk = function(q){ return String(q.notes || "").trim().length > 0; };
  var phoneN = function(x){ return String(x || "").replace(/\D/g, "").replace(/^(0|63)/, ""); };   /* 0917... = 917... = +63917... */
  var isFake = function(reg){ return !REGISTRY.some(function(r){ return norm(r.no) === norm(reg); }); };

  /* request this lead: weights for the fields, notes = bonus */
  function request(id, name, referral){
    return function(ev, d, c){
      if (ev === "lead-create-blocked") { if (referral) return false; return dupMsg(ev); }
      if (ev === "lead-created" && referral) { c.flags.dup = true; return false; }   /* it goes through, but the lead already existed: half points at the end */
      if (ev !== "request-sent") return false;
      var q = d.req;
      if (d.id !== id) return "That request is for a different lead. The lead you need is " + name + ".";
      var items = referral ? [
        { label: "Approver chosen", w: 0.1, ok: !!q.approver, exp: "any approver" },
        { label: "Channel (Last Touch)", w: 0.3, ok: q.channel === "Referrals", exp: "Referrals" },
        { label: "Referral Channel", w: 0.2, ok: q.rc === "Drip", exp: "Drip" },
        { label: "Referrer", w: 0.2, ok: !!q.ref && q.ref.k === "Mia Santos", exp: "Mia Santos" },
        { label: "FC Referrer", w: 0.2, ok: !!q.fc && /^1368/.test(q.fc.k), exp: "you" }
      ] : [
        { label: "Approver chosen", w: 0.2, ok: !!q.approver, exp: "any approver" },
        { label: "Channel (Last Touch)", w: 0.8, ok: q.channel === "KAM - Self Generated Leads", exp: "KAM - Self Generated Leads" }
      ];
      var r = { items: items, bonus: [{ label: "Added a note for the approver", w: 0.1, ok: notesOk(q) }] };
      if (c.flags.dup) { r.factor = 0.5; r.factorLabel = "You created a lead that already exists. You should have requested it"; }
      return r;
    };
  }

  /* a few companies, picked at random: SEC (corporation) or DTI (sole proprietorship). Question 3 gets the certificate in the camera roll, question 4 (always Hanna's Squishy Store) only the name. */
  var POOL = [
    { kind: "sec", name: "Golden Harbor Trading Corp.", no: "CS202605227", owner: "Marco Villanueva", email: "marco.villanueva@example.com", phone: "09181234567" },
    { kind: "sec", name: "Bluewave Cold Storage Inc.", no: "CS202604118", owner: "Lia Fernandez", email: "lia.fernandez@example.com", phone: "09175551212" },
    { kind: "dti", name: "Kapitan Sari-Sari Wholesale", no: "7001234", owner: "Rico Dela Cruz", email: "rico.delacruz@example.com", phone: "09171234567" },
    { kind: "dti", name: "Mang Tonyo Hardware", no: "7003345", owner: "Antonio Reyes", email: "tonyo.reyes@example.com", phone: "09178889999" },
    { kind: "dti", name: "Hanna's Squishy Store", no: "7004321", owner: "Hanna Jo", email: "hannasquishy@gmail.com", phone: "09676667777" }
  ];
  (function(){   /* make sure the mock SEC / DTI sites know these companies, plus look-alike names to choose from */
    var has = function(n){ return REGISTRY.some(function(r){ return r.name === n; }); };
    var sec = function(n, no){ if (!has(n)) REGISTRY.push({ kind: "SEC", name: n, no: no }); };
    var dti = function(n, no, o){ if (!has(n)) REGISTRY.push({ kind: "DTI", name: n, no: no, owner: o, territory: "REGIONAL - REGION IV-A (CALABARZON)", date: "Feb 10 2024", status: "REGISTERED", scope: "REGIONAL" }); };
    POOL.forEach(function(c){ c.kind === "sec" ? sec(c.name.toUpperCase(), c.no) : dti(c.name.toUpperCase(), c.no, c.owner.toUpperCase()); });
    sec("BLUEWAVE COLD STORAGE AND LOGISTICS INC.", "CS202309912"); sec("BLUE WAVE COLD STORAGE CORP.", "CS202111204");
    dti("MANG TONYO HARDWARE SUPPLY", "7003399", "TONY REYES"); dti("HANNA'S SQUISHY SHOP", "7004400", "HANNA JO");
  })();
  var B = POOL[POOL.length - 1];   /* Hanna's Squishy Store is always the referral lead (question 4) */
  var A = POOL.slice(0, -1).sort(function(){ return Math.random() - 0.5; })[0];
  var certOf = function(c){ return c.kind === "sec" ? ["sec", c.no, c.name.toUpperCase()] : ["dti", c.no, c.name.toUpperCase(), c.owner.toUpperCase()]; };

  /* create lead: weights for the fields. A wrong or fake registration number still goes through; it just loses points (fake: -0.25 more) */
  function create(c, ch, ref, w){
    var sec = c.kind === "sec";
    return function(ev, d){
      if (ev === "lead-create-blocked") return dupMsg(ev);
      if (ev !== "lead-created") return false;
      var items = [{ label: "Channel", w: w.ch, ok: d.ch === ch, exp: ch }];
      if (ref) items.push(
        { label: "Referral Channel", w: w.rc, ok: d.rc === "Drip", exp: "Drip" },
        { label: "Referrer", w: w.ref, ok: d.ref === "Mia Santos", exp: "Mia Santos" },
        { label: "FC Referrer", w: w.fc, ok: /^1368/.test(d.fc || ""), exp: "you" });
      items.push(
        { label: "Company name", w: w.name, ok: norm(d.name) === norm(c.name), exp: c.name },
        { label: "Company type", w: w.type, ok: d.type === (sec ? "Corporation" : "Sole Proprietorship"), exp: sec ? "Corporation" : "Sole Proprietorship" },
        { label: sec ? "SEC Registration No." : "DTI Business Name No.", w: w.reg, ok: norm(d.reg) === norm(c.no), exp: c.no },
        { label: "Contact name", w: w.cn, ok: norm(d.fn + d.ln) === norm(c.owner), exp: c.owner },
        { label: "Contact email", w: w.em, ok: norm(d.em) === norm(c.email), exp: c.email },
        { label: "Contact phone", w: w.ph, ok: phoneN(d.ph) === phoneN(c.phone) && phoneN(d.ph) !== "", exp: c.phone });
      var r = { items: items };
      if (norm(d.reg) !== norm(c.no) && isFake(d.reg)) r.extra = [{ label: "You typed a registration number that doesn't exist (fake number)", loss: 0.25 }];
      return r;
    };
  }

  window.ACQUI_EXAM = {
    askName: true, scale: 10,
    title: "Lead reassignment and creation in Acqui Service",
    taskId: "d5-reassign-practice",
    nextHref: "acqui-reassign-lecture.html", nextLabel: "Review the lecture",
    intro: "You will get 5 situations. Read the messages on the right, then do what you would really do in Acqui Service. Use the three tabs at the top: Acqui Service, the SEC website and the DTI website.",
    scoring: "Every question is worth 10 points, 50 in total. You get points for each part you do right: the channel, the referrer, the registration number, the contact details... Adding a note for the approver earns +1 bonus (the total is capped at 50). A fake registration number is a deduction. A hint costs 5 points. You can use Finish test any time. Questions you did not answer get 0.",
    tasks: [
      { type: "act", html: true, choice: true, proceed: false, leadId: "184422",
        text: "Decide what to do about <b>Riverside Lumber Trading</b>",
        chat: { thread: "s1", who: { name: "Your situation", sub: "Self-generated lead", av: "!" }, msgs: [
          { from: "sys", text: "You know a business owner personally: Ben Aquino, owner of Riverside Lumber Trading. They need a business loan and asked if you can handle it." } ] },
        hint: "Search the lead and check its status. Leads in Risk Review, Onboarded, Unserviceable or Utilized cannot be requested.",
        setup: function(){ onboarded(); }, reset: function(){ onboarded(); },
        grade: function(ev, d){ if (dupMsg(ev)) return dupMsg(ev); return ev === "request-sent" && d.id === "184422" ? { fatal: "Riverside Lumber Trading is already Onboarded. Leads in Risk Review, Onboarded, Unserviceable or Utilized cannot be requested. Always check the status first." } : false; },
        undo: function(){ unrequest(this._ev); } },

      { type: "act", html: true, choice: true, proceed: true, leadId: "263118",
        text: "Decide what to do about <b>Greenfield Foods Corp.</b>",
        chat: { thread: "s2", who: { name: "Your situation", sub: "Self-generated lead", av: "!" }, msgs: [
          { from: "sys", text: "You know a business owner personally: Gina Flores, owner of Greenfield Foods Corp. Your families have been friends for years. They want to work with you on a loan." } ] },
        hint: "Search the lead, check the status, then use Request this lead. How did you get it? That's the Channel (Last Touch).",
        setup: function(){ clearPending("263118"); }, reset: function(){ clearPending("263118"); },
        grade: request("263118", "Greenfield Foods Corp.", false),
        undo: function(){ unrequest(this._ev); } },

      { type: "act", html: true, choice: true, proceed: true, leadId: "",
        text: "Decide what to do about <b>" + A.name + "</b>",
        chat: { thread: "s3", who: { name: "Your situation", sub: "Self-generated lead", av: "!" }, msgs: [
          { from: "sys", text: "You met a business owner at a forum and you know them personally: " + A.owner + ", owner of " + A.name + ". Email: " + A.email + ". Phone: " + A.phone + ". You took a photo of their " + (A.kind === "sec" ? "SEC" : "DTI") + " certificate. It's in your camera roll." },
          { from: "me", text: "", att: { name: "IMG_0412.jpg", sub: "Camera roll · tap to open", cert: certOf(A) } } ] },
        hint: "Read the registration number in the photo (tap it in the chat). Pick the Company Type that matches the certificate.",
        reset: function(){ removeByName(A.name); },
        grade: create(A, "KAM Self Generated", false, { ch: 0.1, name: 0.1, type: 0.15, reg: 0.35, cn: 0.1, em: 0.1, ph: 0.1 }),
        undo: function(){ removeLead(this._ev); } },

      { type: "act", html: true, noHint: true, choice: true, proceed: true, leadId: "",
        text: "Take care of Mia's referral.",
        chat: { thread: "mia", who: { name: "Mia Santos", sub: "Your referrer · she refers a lot" }, msgs: [
          { from: "them", text: "Hi {ME}! Busy week, I've got a few friends who need financing 🙌" },
          { from: "them", text: "First one: " + B.owner + ". Owner of " + B.name + ", looking for a business loan." },
          { from: "them", text: B.email + " · " + B.phone + ". Close friend of mine. We already talked and they're okay with me referring them to you." },
          { from: "them", text: "I don't have any certificate with me, sorry! I only know the business name." } ] },
        reset: function(){ removeByName(B.name); },
        grade: create(B, "Referral", true, { ch: 0.1, rc: 0.1, ref: 0.1, fc: 0.05, name: 0.1, type: 0.1, reg: 0.25, cn: 0.08, em: 0.06, ph: 0.06 }),
        undo: function(){ removeLead(this._ev); } },

      { type: "act", html: true, noHint: true, choice: true, proceed: true, leadId: "341907",
        text: "Take care of Mia's next referral.",
        chat: { thread: "mia", who: { name: "Mia Santos", sub: "Your referrer · she refers a lot" }, msgs: [
          { from: "me", text: "Got it Mia, I'll take care of " + B.owner.split(" ")[0] + "!" },
          { from: "them", text: "Thank you!! Next one 😄 Paolo Ramos of Delta Packaging Inc. Also a close friend. We talked about it and they're interested in a loan." },
          { from: "them", text: "paolo.ramos@example.com · 09175550000" } ] },
        setup: function(){ clearPending("341907"); }, reset: function(){ clearPending("341907"); removeByName("Delta Packaging Inc."); },
        grade: request("341907", "Delta Packaging Inc.", true),
        undo: function(){ unrequest(this._ev); removeLead(this._ev); } }
    ]
  };
})();
