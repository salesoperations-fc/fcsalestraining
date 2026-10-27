/* Acqui Service navigation tour. The trainer narrates; sections are explained one at a time.
   - Overview steps leave the screen lit. Detail steps gray out everything except the part being explained.
   - "Your turn" steps wait for the learner to click the highlighted spot.
   - "Look around" steps unlock the screen so the learner can explore before moving on.
   Narrator: Reyster (fixed). */
(function(){
  /* The narrator is always Reyster (not editable). */
  var TRAINER = "Reyster";

  var st = document.createElement("style");
  st.textContent =
    ".tour-hl{position:relative;z-index:60 !important;outline:4px solid #f5a623;outline-offset:4px;border-radius:8px}" +
    "body.dim-strong .tour-hl{box-shadow:0 0 0 9999px rgba(10,25,28,.55) !important}" +
    "body.dim-light .tour-hl{box-shadow:0 0 0 9999px rgba(10,25,28,.25) !important}" +
    ".tour-lift{z-index:60 !important}" +
    ".tour-hl.circle{border-radius:999px !important;outline-offset:6px}" +
    "#tdim{position:fixed;inset:0;background:rgba(10,25,28,.3);z-index:55;display:none}" +
    "#tour{position:fixed;width:430px;max-width:92vw;background:#fff;border-radius:16px;box-shadow:0 14px 50px rgba(0,0,0,.4);padding:18px 20px 16px;z-index:1000;display:none;border-top:5px solid #f5a623}" +
    "#tour.s-br{bottom:24px;right:24px}#tour.s-bl{bottom:24px;left:calc(var(--sw) + 24px)}" +
    "#tour.s-tr{top:80px;right:24px}#tour.s-tl{top:80px;left:calc(var(--sw) + 24px)}" +
    "#tour.s-c{top:50%;left:50%;transform:translate(-50%,-50%)}" +
    "#tour .good{display:inline-block;background:#e7f6ea;color:#1c7a40;font-weight:700;font-size:13px;border-radius:20px;padding:3px 12px;margin-bottom:8px}" +
    "#tour .who{display:flex;align-items:center;gap:12px;margin-bottom:10px}" +
    "#tour .av{width:48px;height:48px;border-radius:50%;background:var(--teal);color:#fff;display:grid;place-items:center;font-weight:700;font-size:21px}" +
    "#tour .who b{font-size:17px;display:block}#tour .who small{color:var(--mut);font-size:12px}" +
    "#tour .txt{font-size:16px;line-height:1.55;margin:8px 0 12px}" +
    "#tour .try{background:#fff7e6;border:1px solid #f5a623;border-radius:10px;padding:9px 12px;font-size:14px;font-weight:600;color:#7a4a00;margin-bottom:12px}" +
    "#tour .nav{display:flex;justify-content:space-between;align-items:center;gap:8px}#tour .nav small{color:var(--mut);font-size:12px}" +
    "#tour .btn{font-size:14px;padding:8px 16px}" +
    "#tour .xx{position:absolute;right:14px;top:10px;border:0;background:none;font-size:22px;color:#889;cursor:pointer}" +
    "#tour.shake{animation:tshake .3s}@keyframes tshake{25%{margin-left:-8px}75%{margin-left:8px}}";
  document.head.appendChild(st);

  var dim = document.createElement("div"); dim.id = "tdim"; document.body.appendChild(dim);
  var card = document.createElement("div"); card.id = "tour"; document.body.appendChild(card);

  /* r: page. hash: exact page address (defaults to #/r). target: what lights up. click: learner must click the target.
     dim: none | light | strong. menu: open | closed (default closed). modal: orig | bcl. free: screen unlocked. good: "Good job!" badge. prefer: card positions to try. */
  var LEAD = "#/lead/350115", REF = "#/referrer/Bea%20Salonga";
  var STEPS = [
    { r:"home", dim:"light", say:"Hi, I'm {T}! This is Acqui Service, our CRM. It's where you see your leads, your referrers and your originations. I'll show you around in a few minutes. Click Next to start." },
    { r:"home", menu:"closed", target:"#sbt", click:true, circle:true, force:true, dim:"none", prefer:["tl","bl"], say:"On your left is the menu bar. It's a small one, so the names are hidden.", hint:"Click the arrow at the top of the menu to make it wider." },
    { r:"home", menu:"open", good:true, target:"#side", dim:"none", force:true, say:"Good job! Now you can see the names: Home, Leads, Originations, Referrers and Open BCLs. You can open or close this menu any time." },
    { r:"home", menu:"open", target:"#sbt", click:true, circle:true, force:true, dim:"none", prefer:["tl","bl"], say:"Let's make it small again so we have more room.", hint:"Click the arrow again." },
    { r:"home", good:true, dim:"none", say:"Good job! Now let's go through each tab, one by one. The screen you're on right now is Home. It's the first screen you see when you open Acqui Service. Click Next." },
    { r:"home", target:"#tasks", dim:"strong", say:"This is the Tasks section. The calls and follow-ups you need to do on your leads are here. You can view them for today, all pending, or by priority." },
    { r:"home", target:"[data-sum]", click:true, circle:true, dim:"none", say:"Each task has a Summary button.", hint:"Click Summary on the first task." },
    { r:"home", panel:"summary", target:"#sp", dim:"strong", say:"This is the lead summary: the main contact and what was discussed with the lead. In the real Acqui Service, the summary is written by AI from your call and meeting notes. It's empty here because we're only practicing." },
    { r:"home", panel:"summary", target:"#sp .x", click:true, circle:true, dim:"none", say:"Let's close it.", hint:"Click the X." },
    { r:"home", target:"#mtd", dim:"strong", say:"Below the tasks is your productivity: your numbers this month, compared with last month and with the top performer." },
    { r:"home", free:true, dim:"none", say:"Take a moment to look around Home. Scroll and click around. The other tabs are locked for now, we'll visit them next. Click Next when you're ready." },
    { r:"home", target:'#side .nv[data-r="leads"]', click:true, dim:"none", say:"Next tab: your leads.", hint:"Click the star icon (Leads) in the menu." },
    { r:"leads", target:"#ltbl", dim:"strong", say:"This is My Lead List. This is where you see the leads assigned to you." },
    { r:"leads", target:"#lf", dim:"strong", say:"You can use these filters to find leads faster: by status, risk status, last engagement or CLO amount." },
    { r:"leads", free:true, dim:"none", say:"Look around the Lead List. Try a filter if you like. Click Next when you're ready." },
    { r:"leads", target:'[data-open="350115"]', click:true, circle:true, dim:"none", say:"Let's open one of your leads.", hint:"Click Open on Metro Courier Services." },
    { r:"lead", hash:LEAD, target:"#stats", dim:"strong", say:"This is a lead page. These two boxes are the BCL status and BA status of the lead. The clock icon shows the history: who changed it and when." },
    { r:"lead", hash:LEAD, target:".lmeta", dim:"strong", say:"Here you see the lead ID and who owns the lead. If you click the status, like Onboarded, you can see the status history of the lead." },
    { r:"lead", hash:LEAD, target:"#stats + .card", dim:"strong", say:"The tasks for this lead are here." },
    { r:"lead", hash:LEAD, target:".ltabs", dim:"strong", say:"All the other information is in these tabs. Under Company info you will also find the referrer and the channel information of the lead." },
    { r:"lead", hash:LEAD, free:true, dim:"none", say:"Look around this lead page. Click the tabs, the clock icons, the status. Click Next when you're ready." },
    { r:"lead", hash:LEAD, target:'#side .nv[data-r="open-bcls"]', click:true, dim:"none", say:"Next tab: Open BCLs.", hint:"Click the layers icon (Open BCLs) in the menu." },
    { r:"open-bcls", target:"#btbl", dim:"strong", say:"This is Open BCLs. It shows your approved BCLs, including the leads that have not drawn down yet." },
    { r:"open-bcls", target:"[data-beye]", click:true, circle:true, dim:"none", say:"You can see the details of each BCL.", hint:"Click the eye icon on the first row." },
    { r:"open-bcls", modal:"bcl", target:"#md", dim:"strong", say:"These are the details of that BCL: the amount, the originations in the last 30 days and the Connect login." },
    { r:"open-bcls", modal:"bcl", target:"#mx", click:true, circle:true, dim:"none", say:"Let's close it.", hint:"Click the X." },
    { r:"open-bcls", target:'#side .nv[data-r="originations"]', click:true, dim:"none", say:"Next tab: Originations.", hint:"Click the card icon (Originations) in the menu." },
    { r:"originations", target:"#otbl", dim:"strong", say:"This is Originations. This is where you see your drawdowns. The total is at the top of the list." },
    { r:"originations", target:"[data-eye]", click:true, circle:true, dim:"none", say:"You can open each origination too.", hint:"Click the eye icon on the first row." },
    { r:"originations", modal:"orig", target:"#md", dim:"strong", say:"These are the details of that origination: the amount, the interest rate, the date and more." },
    { r:"originations", modal:"orig", target:"#mx", click:true, circle:true, dim:"none", say:"Let's close it.", hint:"Click the X." },
    { r:"originations", target:'#side .nv[data-r="referrers"]', click:true, dim:"none", say:"Last tab: Referrers.", hint:"Click the person icon (Referrers) in the menu." },
    { r:"referrers", target:"#rtbl", dim:"strong", say:"This is Referrers. Here you see the referrers attributed to you, their type (RPP, Customer or Drip) and how many leads each one gave you." },
    { r:"referrers", target:'[data-ref="Bea Salonga"]', click:true, circle:true, dim:"none", say:"Want to know which leads a referrer gave you?", hint:"Click the name Bea Salonga." },
    { r:"referrer", hash:REF, target:"#rdetail", dim:"strong", say:"Here are all the leads this referrer gave you, with their status. That's useful when your referrer asks about their leads." },
    { r:"referrer", hash:REF, end:true, dim:"light", say:"That's it! Now you know the sections of Acqui Service and where to find things. Go ahead and click around, you can't break anything here. See you in the next lesson! - {T}" }
  ];
  var i = 0, applyTimer = null, placeTimer = null, pendingModal = null, started = false;

  /* tick the Day 5 task when the tour is finished (only if signed in; skipped in admin preview) */
  function markDone(id){ try { if (window.LMS && LMS.user && LMS.user() && !(LMS.preview && LMS.preview())) LMS.complete(id); } catch (e) {} }

  function routeOf(){ return (location.hash || "#/home").split("/")[1] || "home"; }
  function wantHash(s){ return s.hash || "#/" + s.r; }
  function clear(){
    document.querySelectorAll(".tour-hl").forEach(function(e){ e.classList.remove("tour-hl"); e.classList.remove("circle"); });
    document.querySelectorAll(".tour-lift").forEach(function(e){ e.classList.remove("tour-lift"); });
    document.body.classList.remove("dim-strong", "dim-light");
    dim.style.display = "none";
  }
  function overlap(a, b){ return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom); }

  function apply(tries){
    var s = STEPS[i], last = i === STEPS.length - 1;
    if (last) markDone("d5-acqui-tour");
    clear();
    if (pendingModal) {
      if (pendingModal === "bcl") { openBclDetail("170240"); }
      else if (pendingModal === "orig") { openOrigDetail("170240"); }
      pendingModal = null;
    }
    if (s.panel === "summary" && !document.getElementById("sp").classList.contains("open")) { var first = tabItems("Today's Tasks")[0]; if (first) openSummary(first.id); }
    var t = s.target ? document.querySelector(s.target) : null;
    if (s.target && !t && (tries || 0) < 15) { applyTimer = setTimeout(function(){ apply((tries || 0) + 1); }, 80); return; }
    var say = s.say.replace(/\{T\}/g, TRAINER);
    var prev = '<button class="btn" id="tb">Back</button>';
    var nav;
    if (s.click) nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span style="display:flex;gap:8px">' + prev + '<button class="btn" id="tskip">Skip this step</button></span>';
    else if (last) nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span style="display:flex;gap:8px">' + prev + '<button class="btn" id="trs">Restart</button><a class="btn" href="../dashboard.html" style="text-decoration:none">Back to Day 5</a><a class="btn dark" href="acqui-tour-exam.html" style="text-decoration:none">Practice check</a></span>';
    else nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span style="display:flex;gap:8px">' + (i ? prev : '') + '<button class="btn dark" id="tn">Next</button></span>';
    card.innerHTML = '<button class="xx" id="tx" title="Close the tour">×</button>' + (s.good ? '<div class="good">✓ Good job!</div>' : '') +
      '<div class="who"><div class="av">' + TRAINER.charAt(0).toUpperCase() + '</div><div><b>' + TRAINER.replace(/</g, "&lt;") + '</b><small>Your trainer</small></div></div>' +
      '<div class="txt">' + say.replace(/^Good job! /, "").replace(/</g, "&lt;") + '</div>' + (s.click ? '<div class="try">Your turn: ' + s.hint + '</div>' : '') + '<div class="nav">' + nav + '</div>';
    card.style.display = "block";
    if (t) {
      t.classList.add("tour-hl"); if (s.circle) t.classList.add("circle");
      var lift = t.closest("#side,#top,#ov,#sp"); if (lift && lift !== t) lift.classList.add("tour-lift");
      if (s.dim === "strong") document.body.classList.add("dim-strong"); else if (s.dim === "light") document.body.classList.add("dim-light");
      try { t.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
    } else if (s.dim === "light") { dim.style.display = "block"; }
    /* put the card where it does not cover what we are explaining: try the corners away from the target first */
    var slots = ["c"];
    if (s.target) slots = s.force && s.prefer ? s.prefer.concat(["br", "bl", "tr", "tl"]) : null;
    else if (!(s.end || i === 0)) slots = s.prefer || ["br"];
    card.className = "";
    clearTimeout(placeTimer);
    placeTimer = setTimeout(function(){
      var tr = t ? t.getBoundingClientRect() : null, sl = slots;
      if (!sl) {
        var cx = (tr.left + tr.right) / 2, cy = (tr.top + tr.bottom) / 2, right = cx > window.innerWidth / 2, low = cy > window.innerHeight / 2;
        var V = low ? ["t", "b"] : ["b", "t"], H = right ? ["l", "r"] : ["r", "l"];
        sl = [V[0] + H[0], V[0] + H[1], V[1] + H[0], V[1] + H[1]];
      }
      for (var k = 0; k < sl.length; k++) {
        card.className = "s-" + sl[k];
        if (!tr || !overlap(tr, card.getBoundingClientRect())) break;
      }
    }, t ? 380 : 0);
    var $ = function(x){ return document.getElementById(x); };
    $("tx").onclick = end;
    if ($("tb")) $("tb").onclick = function(){ back(); };
    if ($("tn")) $("tn").onclick = function(){ go(i + 1); };
    if ($("tskip")) $("tskip").onclick = function(){ skip(); };
    if ($("trs")) $("trs").onclick = function(){ go(0); };
  }

  function enter(s){
    /* set the screen up the way this step expects (only when we jump to it, not on every redraw) */
    var wantOpen = s.menu === "open";
    if (document.body.classList.contains("sb-open") !== wantOpen) { document.body.classList.toggle("sb-open"); drawSide(); }
    if (!s.modal) { closeModal(); }
    if (s.panel !== "summary") closeSP();
    pendingModal = s.modal || null;
  }
  function go(n){
    started = true;
    i = Math.max(0, Math.min(STEPS.length - 1, n));
    var s = STEPS[i];
    clearTimeout(applyTimer);
    enter(s);
    if (location.hash !== wantHash(s)) { location.hash = wantHash(s); }   /* the render hook then lights up the step */
    else { render(); }
  }
  /* Back skips over "your turn" steps, they cannot be re-done by going back */
  function back(){ var n = i - 1; while (n > 0 && STEPS[n].click) n--; go(n); }
  /* Skip a "your turn" step: do the click for them */
  function skip(){
    var s = STEPS[i], t = document.querySelector(s.target);
    var from = i;
    if (t) { t.click(); } else { go(i + 1); }
  }
  function end(){ started = false; clearTimeout(applyTimer); clear(); card.style.display = "none"; dim.style.display = "none"; }

  /* the sim re-draws the page on every navigation or toggle: light up the current step again afterwards */
  ACQUI.on("render", function(){ if (started) { clearTimeout(applyTimer); applyTimer = setTimeout(function(){ apply(0); }, 60); } });

  /* lock the screen to the lit-up target (and the card), except on "look around" steps */
  document.addEventListener("click", function(e){
    if (card.style.display !== "block") return;
    if (e.target.closest("#tour, #exitbub, #exitdlg")) return;
    var s = STEPS[i];
    if (s.free) {
      if (!e.target.closest("#side .nv, #sres, [data-open], [data-ref], #rback")) return;
      e.preventDefault(); e.stopPropagation();
      card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
      return;
    }
    if (s.click && s.target && e.target.closest(s.target)) {
      var from = i;
      setTimeout(function(){ if (i === from) go(i + 1); }, 250);   /* let the sim do its own thing first */
      return;
    }
    e.preventDefault(); e.stopPropagation();
    card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
  }, true);

  go(0);
})();
