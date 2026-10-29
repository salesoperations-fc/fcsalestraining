/* Lecture: lead reassignment ("Request this lead"). Loaded before tour.js, which runs these steps instead of the navigation tour.
   Demo leads (all in app.js): 190552 Harbor View Lodging (Risk Review, can't be requested), 228764 Lakeshore Hardware (self-generated),
   297315 Maple Leaf Printing (referral, referrer Mia Santos, Drip). */
(function(){
  var $ = function(id){ return document.getElementById(id); };
  function setSel(id, v){ var e = $(id); if (!e) return; e.value = v; e.dispatchEvent(new Event("change")); }
  function pick(inp, list, name){
    var i = $(inp); if (!i) return;
    i.dispatchEvent(new Event("focus"));
    setTimeout(function(){
      var d = [].slice.call(document.querySelectorAll("#" + list + " [data-i]")).filter(function(x){ return x.innerText.indexOf(name) === 0; })[0];
      if (d) d.click();
    }, 80);
  }
  var modalOpen = function(){ var o = $("ov"); return !!o && getComputedStyle(o).display === "flex"; };
  var val = function(id){ var e = $(id); return e ? e.value : ""; };
  if (window.ACQUI_ONE_REFERRER) ACQUI_ONE_REFERRER();   /* one referrer enrolled, no leads yet */
  var H0 = "#/lead/190552", H1 = "#/lead/228764", H2 = "#/lead/297315";

  window.ACQUI_TOUR_META = { taskId: "d5-reassign-lecture", nextHref: "acqui-reassign-exam.html", nextLabel: "Practice check" };
  window.ACQUI_STEPS = [
    { r:"home", dim:"light", say:"Hi, I'm {T}! In this lesson you'll learn how to request a lead so it gets assigned to you. We call this lead reassignment. Sometimes a lead is already in Acqui Service but it isn't yours yet. For example, a lead from the CLO team, or a prospect you found yourself. Click Next." },
    { r:"home", dim:"none", say:"The steps are simple. First, search for the lead. Second, check if the lead can be requested. Third, send the request. Let's start with the first one." },

    /* part 1: a lead that can NOT be requested */
    { r:"home", target:"#sbox", dim:"none", allow:"#sres", circle:false, hint:"Type \"Harbor\" in the search bar and click the lead that shows up.",
      say:"Always search first. Type the business name or the lead ID in the search bar. Let's look for a prospect called Harbor View Lodging.",
      until:function(){ return location.hash === H0; }, auto:function(){ location.hash = H0; } },
    { r:"lead", hash:H0, good:true, target:".lmeta", dim:"strong", say:"Good job! So the lead exists. Next, check its status. This one is in Risk Review." },
    { r:"lead", hash:H0, target:".lmeta", dim:"strong", say:"You can only request a lead if its status is NOT Risk Review, Onboarded, Unserviceable or Utilized. Those leads are already being worked on, or can't be served. So we cannot request Harbor View Lodging." },
    { r:"lead", hash:H0, target:".banner", dim:"strong", say:"You may still see the Request this lead button. Don't use it. The status says no. If you really need one of these leads, talk to your team lead." },

    /* part 2: self-generated lead */
    { r:"lead", hash:H0, target:"#sbox", dim:"none", allow:"#sres", hint:"Type \"Lakeshore\" in the search bar and click the lead.",
      say:"Now let's try a lead that is okay. Search for Lakeshore Hardware.",
      until:function(){ return location.hash === H1; }, auto:function(){ location.hash = H1; } },
    { r:"lead", hash:H1, good:true, target:".lmeta", dim:"strong", say:"Good job! This lead is in Prospecting. That's fine. It's not Risk Review, Onboarded, Unserviceable or Utilized." },
    { r:"lead", hash:H1, target:".banner", dim:"strong", say:"It also says the lead is unassigned. Nobody is working on it. So it's okay to request. Let's say you found Lakeshore Hardware yourself." },
    { r:"lead", hash:H1, target:"#reqbtn", click:false, circle:true, dim:"none", hint:"Click Request this lead.", say:"Now click Request this lead.",
      until:modalOpen, auto:function(){ var b = $("reqbtn"); if (b) b.click(); } },
    { r:"lead", hash:H1, modal:"keep", target:"#md", dim:"strong", say:"This is the request form. We'll go through it one by one. Click Next." },
    { r:"lead", hash:H1, modal:"keep", target:"#r_app", circle:false, dim:"none", hint:"Pick an approver from the list.",
      say:"Approver: this is the person who will approve your request. Pick your team lead, or Alan Smyth.",
      until:function(){ return !!val("r_app"); }, auto:function(){ setSel("r_app", "Tina Teamlead (Team Lead)"); } },
    { r:"lead", hash:H1, modal:"keep", target:"#r_ch", dim:"none", hint:"Choose KAM - Self Generated Leads.",
      say:"Channel (Last Touch): how did you get this lead? You found Lakeshore Hardware yourself, so choose KAM - Self Generated Leads.",
      until:function(){ return val("r_ch") === "KAM - Self Generated Leads"; },
      wrongIf:function(){ var v = val("r_ch"); return v && v !== "KAM - Self Generated Leads" ? "Not this one. You found the lead yourself: KAM - Self Generated Leads." : ""; },
      auto:function(){ setSel("r_ch", "KAM - Self Generated Leads"); } },
    { r:"lead", hash:H1, modal:"keep", target:"#r_n", dim:"none", hint:"Type a short note for your approver.",
      say:"Notes: the form doesn't force you, but always write a short note for your approver. It helps them say yes faster. Say how you know the lead, and if there's no activity or progress on it. For example: \"I found Lakeshore Hardware myself. I know the owner personally. No activity or progress on this lead so far.\" Type your own note.",
      until:function(){ return val("r_n").trim().length >= 10; }, auto:function(){ setSel("r_n", "I found Lakeshore Hardware myself. I know the owner personally. No activity or progress on this lead so far."); } },
    { r:"lead", hash:H1, modal:"keep", target:"#r_go", circle:true, dim:"none", hint:"Click Send Request.",
      say:"Now click Send Request.",
      until:function(){ return !!pending["228764"]; }, auto:function(){ var b = $("r_go"); if (b) b.click(); } },
    { r:"lead", hash:H1, target:".banner", dim:"strong", good:true, say:"Good job! Your request is now pending approval. You can see it right on the lead: Request pending. When your approver approves it, the lead gets assigned to you." },
    { r:"lead", hash:H1, target:'#side .nv[data-r="home"]', click:true, dim:"none", hint:"Click the Home icon in the menu.", say:"You can also see your pending request in your Tasks. Let's go to Home." },
    { r:"home", target:'[data-reqrow="228764"]', dim:"strong", say:"Here it is: a Reassignment Request task. It stays here until your approver approves it." },
    { r:"home", target:'[data-reqrow="228764"]', dim:"none", hint:"Click the Reassignment Request task.", say:"Click the task to see the details.",
      until:modalOpen, auto:function(){ openReassignTask("228764"); } },
    { r:"home", modal:"keep", target:"#md", dim:"strong", say:"These are the details of your request: the channel you picked and your notes for the approver. It says your request is awaiting approval. Only your approver can approve it." },
    { r:"home", modal:"keep", target:"#mx", click:true, circle:true, dim:"none", hint:"Click the X.", say:"Let's close it." },

    /* part 3: referral lead */
    { r:"home", dim:"none", say:"Now let's do a referral. This is when a referrer gave you the lead. Click Next." },
    { r:"home", target:'#side .nv[data-r="referrers"]', click:true, dim:"none", hint:"Click the person icon (Referrers) in the menu.", say:"Before you request a referral lead, check the Referrers tab. Your referrer must be listed there." },
    { r:"referrers", target:"#rtbl", dim:"strong", say:"Here is Mia Santos, a Drip referrer. She is the only referrer so far, and she hasn't given you any leads yet. If your referrer is not in this list, you need to enroll the referrer first. That is a separate lesson. For now, we assume your referrer is already added." },
    { r:"referrers", target:"#sbox", dim:"none", allow:"#sres", hint:"Type \"Maple\" in the search bar and click the lead.",
      say:"Mia referred a lead to you: Maple Leaf Printing. Search for it.",
      until:function(){ return location.hash === H2; }, auto:function(){ location.hash = H2; } },
    { r:"lead", hash:H2, good:true, target:".lmeta", dim:"strong", say:"Good job! The status is Discovery, so it can be requested. And the lead is unassigned." },
    { r:"lead", hash:H2, target:"#reqbtn", circle:true, dim:"none", hint:"Click Request this lead.", say:"Click Request this lead.",
      until:modalOpen, auto:function(){ var b = $("reqbtn"); if (b) b.click(); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_app", dim:"none", hint:"Pick an approver from the list.",
      say:"Approver again: pick your team lead, or Alan Smyth.",
      until:function(){ return !!val("r_app"); }, auto:function(){ setSel("r_app", "Alan Smyth"); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_ch", dim:"none", hint:"Choose Referrals.",
      say:"Channel (Last Touch): you got this lead from a referrer, so choose Referrals.",
      until:function(){ return val("r_ch") === "Referrals"; },
      wrongIf:function(){ var v = val("r_ch"); return v && v !== "Referrals" ? "Not this one. This lead came from a referrer: Referrals." : ""; },
      auto:function(){ setSel("r_ch", "Referrals"); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_rc", dim:"none", hint:"Choose Drip.",
      say:"Referral Channel: by default, choose Drip. RPP is only for official referral partners who signed a contract with us, and they qualify after referring 3 SQLs. Mia is new and this is her first lead, so it's Drip.",
      until:function(){ return val("r_rc") === "Drip"; },
      wrongIf:function(){ var v = val("r_rc"); return v && v !== "Drip" ? "Not this one. Mia is a new referrer, so choose Drip." : ""; },
      auto:function(){ setSel("r_rc", "Drip"); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_rr", allow:"#r_rl", dim:"none", hint:"Search for Mia and click her name.",
      say:"Referrer: search for your referrer and pick her. You will only see the referrers that are under you.",
      until:function(){ return val("r_rs") === "Mia Santos"; }, auto:function(){ pick("r_rs", "r_rl", "Mia Santos"); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_rr", allow:"#r_fl", dim:"none", hint:"Search for your name and click it.",
      say:"FC Referrer: this is the First Circle employee who received the referral. That's you. Search for your name and pick it.",
      until:function(){ return /^1368/.test(val("r_fs")); }, auto:function(){ pick("r_fs", "r_fl", "1368"); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_n", dim:"none", hint:"Type a short note for your approver.",
      say:"Notes again. For a referral, say who referred the lead and that the owner agreed. For example: \"Referred by Mia Santos, a close friend of the owner. They already talked and the owner agreed to be referred. No activity or progress on this lead so far.\" Type your own note.",
      until:function(){ return val("r_n").trim().length >= 10; }, auto:function(){ setSel("r_n", "Referred by Mia Santos, a close friend of the owner. They already talked and the owner agreed to be referred. No activity or progress on this lead so far."); } },
    { r:"lead", hash:H2, modal:"keep", target:"#r_go", circle:true, dim:"none", hint:"Click Send Request.",
      say:"Now click Send Request.",
      until:function(){ return !!pending["297315"]; }, auto:function(){ var b = $("r_go"); if (b) b.click(); } },
    { r:"lead", hash:H2, target:".banner", dim:"strong", good:true, say:"Good job! Another request pending approval." },
    { r:"lead", hash:H2, end:true, dim:"light", say:"Let's recap. One: search for the lead first. Two: check the status. It must NOT be Risk Review, Onboarded, Unserviceable or Utilized. Three: pick your approver, your team lead or Alan Smyth. Four: choose the Channel (Last Touch). Self-generated or referral. Five: for a referral, use Drip by default, then pick your referrer and your name. Six: always add a note for your approver. See you in the practice check! - {T}" }
  ];
})();
