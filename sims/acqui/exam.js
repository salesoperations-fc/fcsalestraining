/* Acqui Service navigation check: a mini hands-on exam with situational questions.
   Question types: nav (find your way there in the sim), input (type the answer you find), mcq (pick the answer you find).
   Scoring: every question starts at 1 point. A hint costs 0.5. Each wrong answer costs 0.25 (typed / multiple choice). Skip = 0. Never below 0.
   Pass mark 80%. Nothing is saved yet: when this is attached to a day, send the result with LMS.saveResult (see finish()). */
(function(){
  var PASS = 80, HINT_COST = 0.5, WRONG_COST = 0.25;
  var st = document.createElement("style");
  st.textContent =
    "#ex{position:fixed;left:50%;transform:translateX(-50%);bottom:22px;width:780px;max-width:94vw;background:#fff;border-radius:16px;box-shadow:0 14px 50px rgba(0,0,0,.4);padding:16px 22px;z-index:1000;border-top:5px solid var(--teal)}" +
    "#ex.full{top:50%;bottom:auto;transform:translate(-50%,-50%);width:600px;padding:24px 28px;max-height:90vh;overflow:auto}" +
    "#ex h2{margin:0 0 6px;font-size:20px}#ex .k{font-size:12px;color:var(--mut);letter-spacing:.5px;text-transform:uppercase;font-weight:700}" +
    "#ex .task{font-size:18px;font-weight:600;line-height:1.45;margin:6px 0 12px}" +
    "#ex .hint{background:#fff7e6;border:1px solid #f5a623;border-radius:10px;padding:8px 12px;font-size:14px;color:#7a4a00;margin-bottom:10px}" +
    "#ex .row{display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    "#ex .btn{font-size:14px;padding:8px 16px}" +
    "#ex .bar{height:6px;background:#e7efee;border-radius:4px;margin-bottom:10px;overflow:hidden}#ex .bar i{display:block;height:100%;background:var(--teal)}" +
    "#ex input[type=text]{width:100%;height:40px;border:1px solid var(--line);border-radius:8px;padding:0 12px;font-size:16px;outline:none}#ex input[type=text]:focus{border-color:var(--teal)}" +
    "#ex .opt2{display:flex;gap:10px;align-items:center;border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin-bottom:8px;font-size:15px;cursor:pointer}#ex .opt2:hover{background:#f1f8f6}#ex .opt2.sel{border-color:var(--teal);background:#e9f6f3}" +
    "#ex .msg{font-size:14px;font-weight:600;margin:8px 0}.bad{color:#b3243a}" +
    "#ex .done{background:#e7f6ea;border:1px solid #9bd3a8;border-radius:12px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:12px}" +
    "#ex .done b{font-size:18px;color:#1c7a40}#ex .done small{display:block;color:#456;font-size:12px;margin-top:2px}" +
    "#exdim{position:fixed;inset:0;background:rgba(10,25,28,.55);z-index:900;display:none}" +
    "#ex table{width:100%;border-collapse:collapse;margin:12px 0}#ex td{padding:8px 4px;font-size:14px;border-top:1px solid #eef2f2;vertical-align:top}" +
    "#ex .big{font-size:40px;font-weight:800;margin:6px 0}.ok{color:#1c7a40}.no{color:#b3243a}";
  document.head.appendChild(st);
  var dim = document.createElement("div"); dim.id = "exdim"; document.body.appendChild(dim);
  var box = document.createElement("div"); box.id = "ex"; document.body.appendChild(box);

  function lead(id){ return LEADS.filter(function(l){ return l.id === id; })[0]; }
  function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* nav: check(ev, data, ctx) -> true when done.  input: answer() -> accepted string(s).  mcq: choices + answer(). */
  var TASKS = [
    { type: "nav", text: "You want to see your list of leads. Where do you go?",
      hint: "Look at the menu on the left. The Lead List icon is a star.",
      check: function(ev){ return ev === "render" && location.hash.indexOf("#/leads") === 0; } },
    { type: "nav", text: "You want to see more information about Angel's Catering Services. How do you check?",
      hint: "That lead is not on your list. Use the search bar at the top.",
      check: function(ev){ return ev === "render" && location.hash === "#/lead/156661"; } },
    { type: "input", text: "What is the Lead ID of Angel's Catering Services?",
      hint: "The Lead ID is shown on the lead page, next to the lead name.",
      answer: function(){ return ["156661"]; }, placeholder: "Type the Lead ID" },
    { type: "nav", text: "You want to check your summary of originations. Where do you go?",
      hint: "Originations is the card icon in the menu.",
      check: function(ev){ return ev === "render" && location.hash.indexOf("#/originations") === 0; } },
    { type: "nav", text: "You want to see your Open BCLs. Where do you go?",
      hint: "It is the last icon in the menu.",
      check: function(ev){ return ev === "render" && location.hash.indexOf("#/open-bcls") === 0; } },
    { type: "nav", text: "You want to see the history of the BCL status of Metro Courier Services. How do you check?",
      hint: "Open the lead, then look for the clock icon inside the BCL STATUS box.",
      check: function(ev, d){ return ev === "status-history" && d.kind === "BCL" && d.id === "350115"; } },
    { type: "mcq", text: "What is the status of lead 316266?",
      hint: "You can search by Lead ID, not just by name.",
      choices: ["For Engagement", "Prospecting", "Discovery", "Onboarded", "Utilized"],
      answer: function(){ return [lead("316266").status]; } },
    { type: "nav", text: "You want to see only your leads that are Onboarded. How do you do that?",
      hint: "Go to the Lead List and use the Status filter.",
      check: function(ev, d){ return ev === "filter" && d.key === "status" && d.vals.indexOf("Onboarded") >= 0 && location.hash.indexOf("#/leads") === 0; } },
    { type: "input", text: "How many of your leads are Onboarded?",
      hint: "Look at the number of entries at the bottom of the Lead List after you filter.",
      answer: function(){ return [String(LEADS.filter(function(l){ return l.owner === "me" && l.status === "Onboarded"; }).length)]; }, placeholder: "Type a number" },
    { type: "nav", text: "You are talking to your referrer, Bea Salonga. She asks which leads she has referred to you. Where do you go?",
      hint: "Referrers is the person icon in the menu. Click her name.",
      check: function(ev, d){ return ev === "referrer-open" && d === "Bea Salonga"; } },
    { type: "input", text: "How many leads has Bea Salonga referred to you?",
      hint: "It is shown when you open her name in Referrers.",
      answer: function(){ return [String(LEADS.filter(function(l){ return l.refBy === "Bea Salonga"; }).length)]; }, placeholder: "Type a number" },
    { type: "nav", text: "You want to see only the referrers of type RPP. How do you do that?",
      hint: "Go to Referrers and use the Type filter.",
      check: function(ev, d){ return ev === "filter" && d.key === "rty" && d.vals.indexOf("RPP") >= 0; } },
    { type: "nav", text: "You want to see the details of one of your originations. How do you check?",
      hint: "Go to Originations. Each row has an eye icon on the right.",
      check: function(ev){ return ev === "orig-detail"; } },
    { type: "nav", text: "You want to see only your originations from September 2026. How do you do that?",
      hint: "On Originations, change the date filter on the right side to September 2026.",
      check: function(ev, d){ return ev === "filter" && d.key === "cov" && d.by === "Monthly" && d.mo === 8 && d.yr === 2026; } },
    { type: "input", text: "What is the total Amount of your originations in September 2026?",
      hint: "The Total row is at the top of the Originations list. Filter to September 2026 first.",
      answer: function(){ var t = ORIG.filter(function(o){ return o.ym === "2026-09"; }).reduce(function(a, o){ return a + o.amt; }, 0); return [String(t)]; }, placeholder: "Type the amount" }
  ];

  var n = 0, res = [], flags = {}, hintUsed = false, wrongs = 0, started = 0, state = "idle", picked = null;

  function esc(s){ return String(s).replace(/</g, "&lt;"); }
  function fmtPts(x){ return (Math.round(x * 100) / 100).toString(); }
  function pointsNow(){ return Math.max(0, 1 - (hintUsed ? HINT_COST : 0) - wrongs * WRONG_COST); }

  function intro(){
    state = "idle"; dim.style.display = "block"; box.className = "full";
    box.innerHTML = '<div class="k">Practice check · not graded</div><h2>Find your way around Acqui Service</h2>' +
      '<p style="font-size:15px;line-height:1.55;margin:8px 0 10px">You will get ' + TASKS.length + ' short situations, one at a time. Use the simulation behind this box to find the answer or the right place. Some questions ask you to type or pick what you find.</p>' +
      '<p style="font-size:14px;line-height:1.55;margin:0 0 14px;color:#456">Every question starts with 1 point. A hint costs ' + HINT_COST + ' point, and each wrong answer costs ' + WRONG_COST + '. This is practice, so your score is not recorded as a grade. Aim for ' + PASS + '% or more.</p>' +
      '<div class="row"><span><a href="../dashboard.html" style="font-size:13px;color:var(--teal)">Back to Day 5</a> · <a href="acqui-tour.html" style="font-size:13px;color:var(--teal)">Review the tour first</a></span><button class="btn dark" id="exgo">Start</button></div>';
    document.getElementById("exgo").onclick = begin;
  }
  function begin(){ n = 0; res = []; started = Date.now(); location.hash = "#/home"; dim.style.display = "none"; show(); }

  function show(){
    flags = {}; hintUsed = false; wrongs = 0; picked = null; state = "asking"; box.className = "";
    var t = TASKS[n];
    var answerUi = "";
    if (t.type === "input") answerUi = '<input type="text" id="exin" placeholder="' + esc(t.placeholder || "Type your answer") + '" autocomplete="off"><div id="exmsg"></div>';
    if (t.type === "mcq") answerUi = '<div id="exch">' + shuffle(t.choices).map(function(c){ return '<div class="opt2" data-c="' + esc(c) + '"><span>○</span> ' + esc(c) + '</div>'; }).join("") + '</div><div id="exmsg"></div>';
    box.innerHTML = '<div class="bar"><i style="width:' + (n / TASKS.length * 100) + '%"></i></div><div class="k">Question ' + (n + 1) + ' of ' + TASKS.length + '</div>' +
      '<div class="task">' + esc(t.text) + '</div>' + answerUi + '<div id="exh"></div>' +
      '<div class="row"><span style="display:flex;gap:8px"><button class="btn" id="exhint">Show hint (-' + HINT_COST + ')</button>' + (t.type !== "nav" ? '<button class="btn dark" id="exsub">Submit</button>' : '') + '</span><button class="btn" id="exskip">Skip (0 points)</button></div>';
    document.getElementById("exhint").onclick = function(){
      if (!hintUsed) hintUsed = true;
      document.getElementById("exh").innerHTML = '<div class="hint">Hint: ' + esc(t.hint) + '</div>';
      this.textContent = "Hint used (-" + HINT_COST + ")";
    };
    document.getElementById("exskip").onclick = function(){ finishQ(0, "skipped"); };
    if (t.type === "input") {
      var inp = document.getElementById("exin");
      document.getElementById("exsub").onclick = submit;
      inp.onkeydown = function(e){ if (e.key === "Enter") submit(); };
    }
    if (t.type === "mcq") {
      document.querySelectorAll("#exch .opt2").forEach(function(o){ o.onclick = function(){
        picked = o.dataset.c;
        document.querySelectorAll("#exch .opt2").forEach(function(x){ x.classList.remove("sel"); x.firstChild.textContent = "○"; });
        o.classList.add("sel"); o.firstChild.textContent = "●";
      }; });
      document.getElementById("exsub").onclick = submit;
    }
  }
  function norm(x){ return String(x).toLowerCase().replace(/[\s,\u20b1]/g, "").replace(/\.0+$/, ""); }
  function submit(){
    var t = TASKS[n], val = t.type === "input" ? document.getElementById("exin").value : picked;
    var msg = document.getElementById("exmsg");
    if (!val) { msg.innerHTML = '<div class="msg bad">Please give an answer first.</div>'; return; }
    var ok = t.answer().some(function(a){ return norm(a) === norm(val); });
    if (ok) { finishQ(pointsNow(), hintUsed ? "hint" : "ok"); }
    else { wrongs++; msg.innerHTML = '<div class="msg bad">Not quite. Check the simulation and try again. (-' + WRONG_COST + ')</div>'; }
  }

  /* a question is finished: show the green "Done!" strip and wait for the learner to continue */
  function finishQ(pts, how){
    if (state !== "asking") return;
    state = "done";
    res.push({ text: TASKS[n].text, pts: pts, how: how, hint: hintUsed, wrongs: wrongs });
    var last = n === TASKS.length - 1;
    var note = how === "skipped" ? "Skipped" : fmtPts(pts) + (pts === 1 ? " point" : " points") + (hintUsed || wrongs ? " (" + [hintUsed ? "hint -" + HINT_COST : "", wrongs ? wrongs + " wrong -" + fmtPts(wrongs * WRONG_COST) : ""].filter(Boolean).join(", ") + ")" : "");
    box.innerHTML = '<div class="bar"><i style="width:' + ((n + 1) / TASKS.length * 100) + '%"></i></div><div class="k">Question ' + (n + 1) + ' of ' + TASKS.length + '</div>' +
      '<div class="task" style="font-size:15px;color:#456">' + esc(TASKS[n].text) + '</div>' +
      '<div class="done"><div><b>' + (how === "skipped" ? "Skipped" : "✓ Done!") + '</b><small>' + note + '</small></div><button class="btn dark" id="exnext">' + (last ? "See my result" : "Next question →") + '</button></div>';
    document.getElementById("exnext").onclick = function(){ n++; if (n >= TASKS.length) finish(); else show(); };
  }

  function finish(){
    state = "idle";
    var total = res.reduce(function(a, r){ return a + r.pts; }, 0), pct = Math.round(total / TASKS.length * 100), pass = pct >= PASS;
    var secs = Math.round((Date.now() - started) / 1000);
    box.className = "full"; dim.style.display = "block";
    box.innerHTML = '<div class="k">Practice check · result</div><div class="big ' + (pass ? "ok" : "no") + '">' + pct + '%</div><div style="font-size:16px;font-weight:600">' + (pass ? "Passed" : "Not yet. Review the tour and try again.") + ' (' + fmtPts(total) + ' / ' + TASKS.length + ' points, ' + Math.floor(secs / 60) + 'm ' + (secs % 60) + 's)</div>' +
      '<table>' + res.map(function(r){
        var why = r.how === "skipped" ? "skipped" : [r.hint ? "hint" : "", r.wrongs ? r.wrongs + " wrong" : ""].filter(Boolean).join(", ");
        return '<tr><td style="width:24px" class="' + (r.how === "skipped" ? "no" : "ok") + '">' + (r.how === "skipped" ? "✗" : "✓") + '</td><td>' + esc(r.text) + '</td><td style="white-space:nowrap;color:var(--mut)">' + why + '</td><td style="text-align:right"><b>' + fmtPts(r.pts) + '</b></td></tr>'; }).join("") + '</table>' +
      '<div class="row"><span><a href="../dashboard.html" style="font-size:13px;color:var(--teal)">Back to Day 5</a> · <a href="acqui-tour.html" style="font-size:13px;color:var(--teal)">Review the tour</a></span><button class="btn dark" id="exagain">Try again</button></div>';
    document.getElementById("exagain").onclick = intro;
    try { if (window.LMS && LMS.user && LMS.user() && !(LMS.preview && LMS.preview())) LMS.complete("d5-acqui-practice"); } catch (err) {}   /* practice: ticks the Day 5 task, no grade saved */
    /* If this ever becomes graded: LMS.saveResult({ id:"d5-nav-check", label:"Acqui navigation check", score:total, max:TASKS.length, pct:pct, kind:"lms", passing:PASS }) */
    window.ACQUI_EXAM_RESULT = { score: total, max: TASKS.length, pct: pct, passed: pass, seconds: secs, tasks: res };
  }

  ["render", "search-pick", "status-history", "lead-status-history", "orig-detail", "bcl-detail", "filter", "status-set", "referrer-open"].forEach(function(ev){
    ACQUI.on(ev, function(d){
      if (state !== "asking") return;
      var t = TASKS[n]; if (!t || t.type !== "nav") return;
      var c = { flags: flags };
      /* check on the next tick so the page has finished drawing */
      setTimeout(function(){ if (state === "asking" && TASKS[n] === t && t.check(ev, d, c)) finishQ(pointsNow(), hintUsed ? "hint" : "ok"); }, 30);
    });
  });
  intro();
})();
