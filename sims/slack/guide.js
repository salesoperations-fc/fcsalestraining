/* Guided demo: registering a referrer in Slack with /regularnew. Narrator: Reyster.
   Steps: say, target (selector lit up), allow (extra selectors the learner may click), until() (waits for the learner), auto() ("Skip this step"),
   dim "strong" grays out the rest, pos (bl|br|tl|tr|c), hint, good (green "Good job!"), onEnter, end. Same idea as the Acqui tour. */
(function(){
  var $ = function(s){ return document.querySelector(s); };
  var ME = SLK.me, D = { name: "Maria Santos Dela Cruz", phone: "09175550101", email: "maria.delacruz@example.com", addr: "12 Rizal Ave., Quezon City", bank: "Sample National Bank", accno: "009876543210" };
  var val = function(id){ var e = document.getElementById(id); return e ? e.value : ""; };
  var set = function(id, v, ev){ var e = document.getElementById(id); if (!e) return; e.value = v; e.dispatchEvent(new Event(ev || "input", { bubbles: true })); };
  var same = function(id, v){ return SLK.norm(val(id)) === SLK.norm(v); };
  var META = { taskId: "d5-referrer-demo", nextHref: "slack-referrer-practice.html", nextLabel: "Try it yourself" };
  var DETAILS = '<div class="dm"><b>Maria:</b> Hi ' + ME.split(" ")[0] + '! I\'d like to be your referrer. My details:<br><br><b>Name:</b> ' + D.name + '<br><b>Mobile:</b> 0917 555 0101<br><b>Email:</b> ' + D.email + '<br><b>Address:</b> ' + D.addr + '<br><b>Bank:</b> ' + D.bank + '<br><b>Account name:</b> ' + D.name + '<br><b>Account number:</b> 0098 7654 3210</div>';
  var phoneN = function(x){ return String(x || "").replace(/\D/g, "").replace(/^(0|63)/, ""); };
  var checks = [["Full name", "f_name", function(v){ return SLK.norm(v) === SLK.norm(D.name); }], ["Contact number", "f_phone", function(v){ return phoneN(v) === phoneN(D.phone); }], ["Email", "f_email", function(v){ return SLK.norm(v) === SLK.norm(D.email); }],
    ["Mailing address", "f_addr", function(v){ return SLK.norm(v) === SLK.norm(D.addr); }], ["Bank name", "f_bank", function(v){ return SLK.norm(v) === SLK.norm(D.bank); }], ["Account name", "f_accname", function(v){ return SLK.norm(v) === SLK.norm(D.name); }],
    ["Account number", "f_accno", function(v){ return v.replace(/\D/g, "") === D.accno; }], ["Name of FC Employee", "f_fc", function(v){ return v.trim().length >= 2; }], ["Team", "f_team", function(v){ return !!v; }]];
  function formReady(){ return checks.every(function(c){ return c[2](val(c[1])); }) && !!($("#f_ack") && $("#f_ack").checked); }
  function formMsg(){ var bad = checks.filter(function(c){ var v = val(c[1]); return v && !c[2](v); }).map(function(c){ return c[0]; }); return bad.length ? "Not matching Maria's details yet: " + bad.join(", ") + "." : ""; }
  function fillAll(){ set("f_name", D.name); set("f_phone", D.phone); set("f_email", D.email); set("f_addr", D.addr); set("f_bank", D.bank); set("f_accname", D.name); set("f_accno", D.accno); set("f_fc", ME); set("f_team", "INBOUND", "change"); $("#f_ack").checked = true; }
  var sent = false, replied = false;
  SLK.setUpload(false);
  SLK.on("form-submit", function(){ sent = true; });
  SLK.on("thread-reply", function(){ replied = true; });

  var STEPS = [
    { pos: "c", say: "Hi, I'm {T}! In this lesson you'll learn how to register a new referrer. We do it right inside Slack, with a command called /regularnew. Click Next." },
    { pos: "c", say: "Why register? A referrer must be in Acqui Service before you can enroll their leads. You'll do this for every new regular referrer you get. It takes four things: the command, the form, the referrer's ID and their proof of bank account. Click Next." },
    { pos: "br", target: '#chs [data-ch="acquisition_partnerships"]', click: true, hint: "Click the channel acquisition_partnerships.", say: "First, go to the channel acquisition_partnerships.",
      until: function(){ return SLK.channel() === "acquisition_partnerships"; }, auto: function(){ document.querySelector('#chs [data-ch="acquisition_partnerships"]').click(); } },
    { pos: "tr", good: true, target: "#msgs", dim: "strong", say: "Good job! These are the requests of other AMs. Each one is a message from the Regular Referrer Enrollment Form app. Yours will look the same." },
    { pos: "tr", target: "#cin", hint: "Click the message box at the bottom.", say: "Now click the message box.", until: function(){ return document.activeElement === $("#cin"); }, auto: function(){ $("#cin").focus(); } },
    { pos: "tr", target: "#cin", hint: "Type /regularnew", say: "Type /regularnew, all in one word. Every new referrer starts with this command.", until: function(){ return SLK.norm(val("cin")).indexOf("regularnew") === 0; }, auto: function(){ set("cin", "/regularnew"); } },
    { pos: "tr", target: '#acmenu .it[data-cmd="/regularnew"]', allow: "#acmenu", click: true, hint: "Click /regularnew, or press Enter.", say: "Slack shows the commands that match. Pick /regularnew, Regular Referrer Enrollment Form. Be careful: the RPP and Referrer Enrollment V2 ones are for other kinds of referrers. You can click it or press Enter.",
      until: function(){ return SLK.formOpen(); }, auto: function(){ var it = $('#acmenu .it[data-cmd="/regularnew"]'); if (it) it.click(); } },
    { pos: "bl", target: "#fm .box", dim: "strong", good: true, say: "Good job! A message that only you can see says \"Opening Regular form...\", and then this form opens. Next, you fill it in yourself. Click Next." },
    { pos: "bl", target: "#fm .box", allow: "#fm .box", html: DETAILS, hint: "Fill in the whole form with Maria's details, then tick the Acknowledgement box.",
      say: "Maria sent you her details (see below). Now fill in the form yourself, in any order. Tips: the name is exactly as written on her ID. The number fields are digits only. TIN is optional. The account name is the name on her bank account. Name of FC Employee is you. Team is your own team. At the end, tick the Acknowledgement box.",
      until: formReady, msg: formMsg, auto: fillAll },
    { pos: "bl", target: "#fsubmit", hint: "Click Submit.", say: "Everything is filled in. Click Submit.", until: function(){ return sent; }, auto: function(){ $("#fsubmit").click(); } },
    { pos: "tr", good: true, target: "#mine", dim: "strong", say: "Good job! The app posted your request in the channel. It repeats the referrer's details and ends with: \"Please attach ID and proof of bank account in this thread.\" We're not done yet. The request is only complete when the documents are in the thread." },
    { pos: "tr", target: '#mine .rl', click: true, hint: "Click Reply in thread.", say: "Open the thread of your message. Click Reply in thread.", until: function(){ return $("#thr").classList.contains("open"); }, auto: function(){ $('#mine .rl').click(); } },
    { pos: "bl", target: "#thr", dim: "strong", good: true, say: "This is the thread. Send the ID and the proof of account here, not in the channel. First, let's see what a good ID and a good proof of account look like. Click Next." },
    { pos: "bl", dim: "none", onEnter: function(){ SLK.openDocs("id"); }, target: "#docs .box", say: "The ID. It must show the referrer's full name and photo, and the picture must be clear: all four corners, easy to read. Blurry, cut off, expired or someone else's ID is not accepted. You can download a fake ID here to practice with. Click Next." },
    { pos: "bl", target: "#docs .dx", click: true, hint: "Click the X.", say: "Close this. Next is the proof of bank account.", until: function(){ return !SLK.docsOpen(); }, auto: function(){ $("#docs .dx").click(); } },
    { pos: "bl", dim: "none", onEnter: function(){ SLK.openDocs("proof"); }, target: "#docs .box", say: "The proof of bank account. It must show the account holder's full name, the bank name and the account number. A statement, the first page of the passbook, or a bank app screenshot works. No name, no account number or no bank name is not accepted. You can download a fake one here too. Click Next." },
    { pos: "bl", target: "#docs .dx", click: true, hint: "Click the X.", say: "Close this and attach the files.", until: function(){ return !SLK.docsOpen(); }, auto: function(){ $("#docs .dx").click(); } },
    { pos: "bl", target: "#thr .plus", onEnter: function(){ SLK.setUpload(true); }, hint: "Click the + in the thread.", say: "Click the + in the thread's message box.", until: function(){ return SLK.plusOpen(); }, auto: function(){ $("#thr .plus").click(); } },
    { pos: "bl", target: '#plusmenu [data-pm="up"]', allow: "#plusmenu", click: true, hint: "Click Upload from your computer.", say: "Click Upload from your computer.", until: function(){ return SLK.pickerOpen(); }, auto: function(){ $('#plusmenu [data-pm="up"]').click(); } },
    { pos: "tr", target: '#pk [data-f="sample-id"]', allow: "#pk .list", hint: "Click Maria_ID.png.", say: "Your files are here. First click the ID: Maria_ID.png. You can see a preview below the list.", until: function(){ return SLK.picked().indexOf("sample-id") >= 0; }, auto: function(){ $('#pk [data-f="sample-id"]').click(); } },
    { pos: "tr", target: '#pk [data-f="sample-proof"]', allow: "#pk .list", hint: "Click Maria_bank_statement.png.", say: "Now click the proof of account: Maria_bank_statement.png. Both files are selected.", until: function(){ return SLK.picked().indexOf("sample-proof") >= 0; }, auto: function(){ var r = $('#pk [data-f="sample-proof"]'); if (SLK.picked().indexOf("sample-proof") < 0) r.click(); } },
    { pos: "tr", target: "#pkopen", hint: "Click Open.", say: "Click Open.", until: function(){ return SLK.state().attached.length >= 2; }, auto: function(){ $("#pkopen").click(); } },
    { pos: "bl", target: "#thr .comp", dim: "strong", say: "Both files are ready in the thread's message box. Before you send, read them once more: is the name visible? the bank name? the account number? Click Next." },
    { pos: "bl", target: "#tsend", hint: "Click the green send button.", say: "Click the green send button.", until: function(){ return replied; }, auto: function(){ $("#tsend").click(); } },
    { pos: "bl", good: true, target: "#thb", dim: "strong", say: "Good job! Your reply with the ID and the proof of account is in the thread. That's all you have to do." },
    { pos: "c", end: true, say: "Let's recap. One: go to acquisition_partnerships and type /regularnew. Pick the Regular Referrer Enrollment Form. Two: fill in the form. The name must be as stated in the ID, and the number fields are digits only. Three: reply in the thread with the ID and the proof of bank account. The ID needs full name, photo and a clear picture. The proof needs full name, bank name and account number. After a few minutes, SalesOps adds your referrer in Acqui Service. Now try it yourself! - {T}" }
  ];

  /* ---------- engine ---------- */
  document.body.classList.add("has-g");
  var g = document.createElement("div"); g.id = "g"; document.body.appendChild(g);
  var i = 0, poll = null, lit = [], lastTarget = null;
  function trainer(){ return "Reyster"; }
  function clearHl(){ lit.forEach(function(e){ e.classList.remove("hl", "lift"); }); lit = []; document.body.classList.remove("dim-strong"); }
  var fromBack = false;
  function show(n, isBack){
    fromBack = !!isBack; i = n; var s = STEPS[i]; clearInterval(poll); clearHl(); s._ran = false;
    if (s.onEnter && !s._ran) { s._ran = true; try { s.onEnter(); } catch (e) {} }
    var tries = 0;
    (function apply(){
      var t = s.target ? $(s.target) : null;
      if (s.target && !t && tries++ < 15) return setTimeout(apply, 80);
      if (t) { t.classList.add("hl"); lit.push(t); if (s.dim === "strong") document.body.classList.add("dim-strong"); lastTarget = t; if (t.scrollIntoView) t.scrollIntoView({ block: "nearest" }); }
      if (s.allow) document.querySelectorAll(s.allow).forEach(function(e){ e.classList.add("lift"); lit.push(e); });
      draw(s);
    })();
  }
  function draw(s){
    var my = i, inter = !!s.until && !(fromBack && safeUntil(s)), last = !!s.end, say = s.say.replace(/\{T\}/g, trainer());
    var nav;
    if (inter) nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span>' + (i ? '<button class="btn" id="gb">Back</button>' : "") + '<button class="btn" id="gs">Skip this step</button></span>';
    else if (last) nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span><button class="btn" id="gb">Back</button><button class="btn" id="gr">Restart</button>' + (window.SLK_STANDALONE ? "" : '<a class="btn" href="../dashboard.html">Back to Day 5</a><a class="btn dark" href="' + META.nextHref + '">' + META.nextLabel + '</a>') + '</span>';
    else nav = '<small>' + (i + 1) + ' / ' + STEPS.length + '</small><span>' + (i ? '<button class="btn" id="gb">Back</button>' : "") + '<button class="btn dark" id="gn">Next</button></span>';
    g.className = s.pos || "br"; g.style.display = "flex";
    g.innerHTML = (s.good ? '<div class="good">✓ Good job!</div>' : "") + '<div class="who"><i>' + trainer().charAt(0) + '</i><div><b>' + trainer() + '</b><small>Your trainer</small></div></div><div class="txt">' + say.replace(/</g, "&lt;") + '</div>' + (s.html || "") +
      (inter ? '<div class="try">Your turn: ' + s.hint + '</div><div id="gm" style="color:#b3243a;font-weight:600;font-size:14px;margin:-4px 0 10px"></div>' : "") + '<div class="nav">' + nav + '</div>';
    var q = function(id){ return document.getElementById(id); };
    if (q("gn")) q("gn").onclick = function(){ if (my === i) show(i + 1); };
    if (q("gb")) q("gb").onclick = function(){ back(); };
    if (q("gr")) q("gr").onclick = function(){ location.reload(); };
    if (q("gs")) q("gs").onclick = function(){ if (my !== i) return; if (s.auto) s.auto(); setTimeout(function(){ if (my === i) advance(); }, 120); };
    if (inter) poll = setInterval(function(){ try { if (my !== i) return; if (s.msg) { var m = q("gm"); if (m) m.textContent = s.msg(); } if (s.until()) advance(); } catch (e) {} }, 250);
    if (last) { try { if (window.LMS && LMS.user && LMS.user() && !(LMS.preview && LMS.preview())) LMS.complete(META.taskId); } catch (e) {} }
  }
  function safeUntil(s){ try { return !!s.until(); } catch (e) { return false; } }
  function advance(){ clearInterval(poll); if (i < STEPS.length - 1) show(i + 1); }
  function back(){
    /* going back only re-reads a step; it doesn't undo what was already filled in */
    show(Math.max(0, i - 1), true);
  }
  /* lock: only the lit part, the allowed parts and the narrator can be clicked */
  document.addEventListener("click", function(e){
    var s = STEPS[i]; if (!s || s.free) return;
    if (e.target.closest("#g") || e.target.closest("#exitbub") || e.target.closest(".xdlg")) return;
    if (s.target) { var t = $(s.target); if (t && t.contains(e.target)) return; }
    if (s.allow && e.target.closest(s.allow)) return;
    if (!s.until && !s.target) { /* narration only */ }
    e.stopPropagation(); e.preventDefault(); g.classList.remove("shake"); void g.offsetWidth; g.classList.add("shake");
  }, true);
  show(0);
})();
