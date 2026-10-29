/* Lecture: creating a new lead (self-generated and referral), looking up the registration number on the DTI / SEC mock-ups,
   and what happens when the lead already exists. Loaded before tour.js, which runs these steps instead of the navigation tour.
   Demo: Kapitan Sari-Sari Wholesale (sole proprietorship, DTI Business Name No. 7001234), Golden Harbor Trading Corp. (corporation, SEC CS202605227, referrer Mia Santos, Drip). */
(function(){
  if (window.ACQUI_ONE_REFERRER) ACQUI_ONE_REFERRER();   /* one referrer enrolled, no leads yet */
  var $ = function(id){ return document.getElementById(id); };
  var val = function(id){ var e = $(id); return e ? e.value : ""; };
  var norm = function(s){ return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); };
  function set(id, v, ev){ var e = $(id); if (!e) return; e.value = v; e.dispatchEvent(new Event(ev || "change")); }
  function type(id, v){ set(id, v, "input"); }
  function pick(inp, list, name){
    var i = $(inp); if (!i) return;
    i.dispatchEvent(new Event("focus"));
    setTimeout(function(){
      var d = [].slice.call(document.querySelectorAll("#" + list + " [data-i]")).filter(function(x){ return x.innerText.indexOf(name) === 0; })[0];
      if (d) d.click();
    }, 80);
  }
  var modalOpen = function(){ var o = $("ov"); return !!o && getComputedStyle(o).display === "flex" && !!$("c_ch"); };
  var tabIs = function(n){ var t = document.querySelector("#bm .tb.on"); return !!t && t.getAttribute("data-bm") === n; };
  var certOpen = function(){ var c = $("cv"); return !!c && getComputedStyle(c).display !== "none"; };
  var created = function(name){ return function(){ return LEADS.some(function(l){ return norm(l.name) === norm(name) && l.owner === "me"; }); }; };
  var DELTA = (LEADS.filter(function(l){ return l.name === "Delta Packaging Inc."; })[0] || {}).reg || "";

  window.ACQUI_TOUR_META = { taskId: "d5-create-lecture", nextHref: "acqui-reassign-exam.html", nextLabel: "Practice check" };
  window.ACQUI_STEPS = [
    { r:"home", dim:"light", say:"Hi, I'm {T}! In this lesson you'll learn how to create a new lead in Acqui Service. You do this when the business is not in Acqui yet. For example, a business owner you know personally, or a new lead from your referrer. Click Next." },

    /* ---- part 1: self-generated, sole proprietorship (DTI) ---- */
    { r:"home", dim:"none", say:"Here's the first situation. You met the owner of Kapitan Sari-Sari Wholesale at a family gathering. He's interested in working with you. He only told you the business name. He didn't send you any certificate. Click Next." },
    { r:"home", target:"#sbox", dim:"none", allow:"#sres", hint:"Type \"Kapitan\" in the search bar.",
      say:"First, always search. Maybe the business is already in Acqui Service. Type Kapitan in the search bar.",
      until:function(){ return norm(val("q")).indexOf("kapitan") === 0; }, auto:function(){ set("q", "Kapitan", "input"); } },
    { r:"home", target:"#sbox", dim:"strong", search:true, say:"No leads found. So Kapitan Sari-Sari Wholesale is not in Acqui Service yet, and we can create it. (If the search finds the business, you don't create it. You request it. That's the reassignment lesson.)" },
    { r:"home", target:'#side .nv[data-r="leads"]', click:true, dim:"none", hint:"Click the star icon (Leads) in the menu.", say:"We create leads from the Lead List.",
      onEnter:function(){ set("q", "", "input"); } },
    { r:"leads", target:"#newlead", circle:true, dim:"none", hint:"Click Create Lead.", say:"Click Create Lead.",
      until:modalOpen, auto:function(){ openCreate(); } },
    { r:"leads", modal:"keep", target:"#md", dim:"strong", say:"This is the Create Lead form. Let's fill it in, one by one." },
    { r:"leads", modal:"keep", target:"#c_ch", dim:"none", hint:"Choose KAM Self Generated.",
      say:"Channel: how did you get this lead? You met the owner yourself, so choose KAM Self Generated. (Referral is only for leads from your referrers.)",
      until:function(){ return val("c_ch") === "KAM Self Generated"; },
      wrongIf:function(){ var v = val("c_ch"); return v && v !== "KAM Self Generated" ? "Not this one. You met the owner yourself: KAM Self Generated." : ""; },
      auto:function(){ set("c_ch", "KAM Self Generated"); } },
    { r:"leads", modal:"keep", target:"#c_co", dim:"none", hint:"Type: Kapitan Sari-Sari Wholesale",
      say:"Company Name: type the business name, the way the owner told you.",
      until:function(){ return norm(val("c_co")) === norm("Kapitan Sari-Sari Wholesale"); }, auto:function(){ type("c_co", "Kapitan Sari-Sari Wholesale"); } },
    { r:"leads", modal:"keep", target:"#c_ty", dim:"none", hint:"Choose Sole Proprietorship.",
      say:"Company Type: this decides which registration number we need. A sole proprietorship is registered with the DTI. Corporations, partnerships and OPCs are registered with the SEC. This is a one-owner business, so it's a Sole Proprietorship.",
      until:function(){ return val("c_ty") === "Sole Proprietorship"; },
      wrongIf:function(){ var v = val("c_ty"); return v && v !== "Sole Proprietorship" ? "Not this one. A business owned by one person is a Sole Proprietorship." : ""; },
      auto:function(){ set("c_ty", "Sole Proprietorship"); } },
    { r:"leads", modal:"keep", target:"#c_rn", dim:"strong", say:"Now it asks for the DTI Business Name No. The owner didn't send the certificate, so we will look it up on the DTI website. We open it in a new tab. The form stays open, we'll come back to it." },
    { r:"leads", modal:"keep", target:'#bm [data-bm="DTI - BNRS"]', click:true, dim:"none", hint:"Click the DTI Website tab at the top.",
      say:"Click the DTI Website tab at the top.",
      until:function(){ return tabIs("DTI - BNRS") && !!$("dq"); }, auto:function(){ setBrowserTab("DTI - BNRS"); } },
    { r:"leads", modal:"keep", target:"#dq", allow:"#dsug", dim:"strong", hint:"Type: KAPITAN SARI-SARI WHOLESALE",
      say:"This is the DTI business name search. Type the exact business name. Random searches don't work, it must be the exact name.",
      until:function(){ return norm(val("dq")) === norm("Kapitan Sari-Sari Wholesale"); }, auto:function(){ set("dq", "KAPITAN SARI-SARI WHOLESALE", "input"); } },
    { r:"leads", modal:"keep", target:".dcap", allow:".dcap", dim:"strong", hint:"Type the letters you see, then click the green arrow.",
      say:"Type the letters you see in the picture and click the green arrow. This is a captcha. It checks that you're not a robot.",
      until:function(){ return !!document.querySelector(".vok"); }, auto:function(){ set("dci", $("dcode").textContent, "input"); var b = $("dcv"); if (b) b.click(); } },
    { r:"leads", modal:"keep", target:"#dsearch", circle:true, dim:"none", hint:"Click Search.", say:"Now click Search.",
      until:function(){ return !!$("dres") && /search results found/.test($("dres").innerText); }, auto:function(){ var b = $("dsearch"); if (b) b.click(); } },
    { r:"leads", modal:"keep", target:"#dres", dim:"strong", say:"Here it is. One search result. Check the business name and the owner's name. It's Rico Dela Cruz, the owner you met. The number we need is the Certificate No. / BNN: 7001234. That's the DTI Business Name No." },
    { r:"leads", modal:"keep", target:'#bm [data-bm="Acqui Service"]', click:true, dim:"none", hint:"Click the Acqui Service tab at the top.", say:"Remember the number: 7001234. Now go back to the Acqui Service tab. Your form is still there.",
      until:function(){ return tabIs("Acqui Service"); }, auto:function(){ setBrowserTab("Acqui Service"); } },
    { r:"leads", modal:"keep", target:"#c_rn", dim:"none", hint:"Type: 7001234",
      say:"Type the number in the DTI Business Name No.",
      until:function(){ return norm(val("c_rn")) === "7001234"; }, auto:function(){ type("c_rn", "7001234"); } },
    { r:"leads", modal:"keep", target:"#c_fn", allow:"#c_mn, #c_ln, #c_em, #c_ph", dim:"none", hint:"First name Rico, last name Dela Cruz, then the email and phone.",
      say:"Contact person: the owner. Rico Dela Cruz, rico.delacruz@example.com, 09171234567. Fill in the first name, last name, email and phone.",
      until:function(){ return !!(val("c_fn") && val("c_ln") && val("c_em") && val("c_ph")); },
      auto:function(){ type("c_fn", "Rico"); type("c_ln", "Dela Cruz"); type("c_em", "rico.delacruz@example.com"); type("c_ph", "09171234567"); } },
    { r:"leads", modal:"keep", target:"#c_go", circle:true, dim:"none", hint:"Click Create Lead.", say:"Everything is filled in. Click Create Lead.",
      until:created("Kapitan Sari-Sari Wholesale"), auto:function(){ var b = $("c_go"); if (b) b.click(); } },
    { r:"leads", good:true, target:"#ltbl", dim:"strong", say:"Good job! Your new lead is on your Lead List, assigned to you." },

    /* ---- part 2: referral, corporation (SEC certificate sent by the referrer) ---- */
    { r:"leads", dim:"none", say:"Here's the second situation. Mia Santos, your referrer, tells you her neighbor owns Golden Harbor Trading Corp. and is interested. Mia also forwarded you their SEC certificate. Click Next." },
    { r:"leads", target:"#sbox", dim:"none", allow:"#sres", hint:"Type \"Golden\" in the search bar.",
      say:"Search first again. Type Golden in the search bar.",
      until:function(){ return norm(val("q")).indexOf("golden") === 0; }, auto:function(){ set("q", "Golden", "input"); } },
    { r:"leads", target:"#sbox", dim:"strong", search:true, say:"Nothing for Golden Harbor Trading Corp. It's not in Acqui Service yet. Let's create it." },
    { r:"leads", target:"#newlead", circle:true, dim:"none", hint:"Click Create Lead.", say:"Click Create Lead.",
      onEnter:function(){ set("q", "", "input"); }, until:modalOpen, auto:function(){ openCreate(); } },
    { r:"leads", modal:"keep", target:"#c_ch", dim:"none", hint:"Choose Referral.",
      say:"Channel: this lead came from your referrer, so choose Referral.",
      until:function(){ return val("c_ch") === "Referral"; },
      wrongIf:function(){ var v = val("c_ch"); return v && v !== "Referral" ? "Not this one. This lead came from Mia, your referrer: Referral." : ""; },
      auto:function(){ set("c_ch", "Referral"); } },
    { r:"leads", modal:"keep", target:"#r_rc", dim:"none", hint:"Choose Drip.",
      say:"Referral Channel: by default, Drip. RPP is only for official referral partners who signed a contract with us. Mia is new, so Drip.",
      until:function(){ return val("r_rc") === "Drip"; },
      wrongIf:function(){ var v = val("r_rc"); return v && v !== "Drip" ? "Not this one. Mia is a new referrer, so choose Drip." : ""; },
      auto:function(){ set("r_rc", "Drip"); } },
    { r:"leads", modal:"keep", target:"#r_rr", allow:"#r_rl", dim:"none", hint:"Search for Mia and click her name.",
      say:"Referrer: pick Mia Santos. She is the referrer that is enrolled under you.",
      until:function(){ return val("r_rs") === "Mia Santos"; }, auto:function(){ pick("r_rs", "r_rl", "Mia Santos"); } },
    { r:"leads", modal:"keep", target:"#r_rr", allow:"#r_fl", dim:"none", hint:"Search for your name and click it.",
      say:"FC Referrer: the First Circle employee who received the referral. That's you.",
      until:function(){ return /^1368/.test(val("r_fs")); }, auto:function(){ pick("r_fs", "r_fl", "1368"); } },
    { r:"leads", modal:"keep", target:"#c_co", dim:"none", hint:"Type: Golden Harbor Trading Corp.",
      say:"Company Name: Golden Harbor Trading Corp.",
      until:function(){ return norm(val("c_co")) === norm("Golden Harbor Trading Corp."); }, auto:function(){ type("c_co", "Golden Harbor Trading Corp."); } },
    { r:"leads", modal:"keep", target:"#cv .cvbox", dim:"strong", onEnter:function(){ showCert("sec", "CS202605227", "GOLDEN HARBOR TRADING CORP."); },
      say:"This is the SEC certificate Mia sent (it opens as a picture, like an attachment). It's a Certificate of Incorporation, so this business is a corporation. The number we need is at the top right: the Company Reg. No., CS202605227. Because the owner sent the certificate, we don't need to search the SEC website." },
    { r:"leads", modal:"keep", target:"#cvx", click:true, circle:true, dim:"none", hint:"Click the X on the picture.", say:"Remember the number: CS202605227. Close the certificate.",
      until:function(){ return !certOpen(); }, auto:function(){ var b = $("cvx"); if (b) b.click(); } },
    { r:"leads", modal:"keep", target:"#c_ty", dim:"none", hint:"Choose Corporation.",
      say:"Company Type: a Certificate of Incorporation means it's a Corporation.",
      until:function(){ return val("c_ty") === "Corporation"; }, auto:function(){ set("c_ty", "Corporation"); } },
    { r:"leads", modal:"keep", target:"#c_rn", dim:"none", hint:"Type: CS202605227",
      say:"Now the label says SEC Registration No. Type CS202605227.",
      until:function(){ return norm(val("c_rn")) === "cs202605227"; }, auto:function(){ type("c_rn", "CS202605227"); } },
    { r:"leads", modal:"keep", target:"#c_fn", allow:"#c_mn, #c_ln, #c_em, #c_ph", dim:"none", hint:"First name Marco, last name Villanueva, then the email and phone.",
      say:"Contact person: the owner. Marco Villanueva, marco.villanueva@example.com, 09181234567.",
      until:function(){ return !!(val("c_fn") && val("c_ln") && val("c_em") && val("c_ph")); },
      auto:function(){ type("c_fn", "Marco"); type("c_ln", "Villanueva"); type("c_em", "marco.villanueva@example.com"); type("c_ph", "09181234567"); } },
    { r:"leads", modal:"keep", target:"#c_go", circle:true, dim:"none", hint:"Click Create Lead.", say:"Click Create Lead.",
      until:created("Golden Harbor Trading Corp."), auto:function(){ var b = $("c_go"); if (b) b.click(); } },
    { r:"leads", good:true, target:"#ltbl", dim:"strong", say:"Good job! Golden Harbor Trading Corp. is on your list too." },

    /* ---- part 3: the lead already exists ---- */
    { r:"leads", dim:"none", say:"One more thing. What if the business is already in Acqui Service, and you try to create it anyway? Let's see. We'll try to create Delta Packaging Inc., a lead that already exists. Click Next." },
    { r:"leads", target:"#newlead", circle:true, dim:"none", hint:"Click Create Lead.", say:"Click Create Lead.", until:modalOpen, auto:function(){ openCreate(); } },
    { r:"leads", modal:"keep", target:"#md", dim:"strong", say:"We filled in the form for you with Delta Packaging Inc. and its SEC number. Click Next.",
      onEnter:function(){ set("c_ch", "KAM Self Generated"); type("c_co", "Delta Packaging Inc."); set("c_ty", "Corporation"); type("c_rn", DELTA); type("c_fn", "Paolo"); type("c_ln", "Ramos"); type("c_em", "paolo.ramos@example.com"); type("c_ph", "09175550000"); } },
    { r:"leads", modal:"keep", target:"#c_go", circle:true, dim:"none", hint:"Click Create Lead.", say:"Click Create Lead.",
      until:function(){ return !!$("c_rne") && $("c_rne").innerText.trim().length > 0; }, auto:function(){ var b = $("c_go"); if (b) b.click(); } },
    { r:"leads", modal:"keep", target:"#c_rne", dim:"strong", say:"Acqui Service says a lead with this registration number already exists, so you can't create it again. When that happens, search the lead and request it instead. That's the reassignment lesson." },
    { r:"leads", modal:"keep", target:"#mx", allow:"#c_foot", circle:true, dim:"none", hint:"Click the X, then Discard.", say:"Close the form. You don't need to save it.",
      until:function(){ var o = $("ov"); return !o || getComputedStyle(o).display === "none"; }, auto:function(){ closeModal(); } },
    { r:"leads", end:true, dim:"light", say:"Let's recap. One: always search first. If the business is already in Acqui, request it, don't create it. Two: the channel is how you got the lead. Self-generated, or Referral with Drip by default. Three: the Company Type decides the number. Sole proprietorship: DTI Business Name No. Corporation, partnership or OPC: SEC Registration No. Four: if the owner sent a certificate, read the number there. If not, look it up in the DTI Website or SEC Website tab. See you in the practice check! - {T}" }
  ];
})();
