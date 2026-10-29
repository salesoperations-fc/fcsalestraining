/* Practice check: lead reassignment and enrollment of new leads. Loaded before exam.js, which runs these tasks instead of the navigation check.
   1 existing lead that CAN'T be requested (random status: Risk Review / Onboarded / Unserviceable)   -> they must not request it
   2 existing lead, self-generated   3 existing lead, referral (Drip)   4 new lead, self-generated   5 new lead, referral (Drip)
   Lead / referrer data lives in app.js. Right answers: Channel (Last Touch) = KAM - Self Generated Leads or Referrals; referral = Drip by default (new referrer). */
(function(){
  if (window.ACQUI_ONE_REFERRER) ACQUI_ONE_REFERRER();   /* one referrer (Mia Santos) enrolled, no leads yet */
  function L(id){ return LEADS.filter(function(l){ return l.id === id; })[0]; }
  function norm(s){ return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function unrequest(d){ if (d && d.id && typeof pending !== "undefined") { delete pending[d.id]; } render(); }
  function removeLead(d){ if (d && d.id) { for (var i = 0; i < LEADS.length; i++) { if (LEADS[i].id === d.id) { LEADS.splice(i, 1); break; } } } render(); }
  /* trying to Create Lead for a lead that already exists (same registration number) is blocked in the app: big deduction */
  function dupMsg(ev){ return ev === "lead-create-blocked" ? { msg: "That lead already exists: the registration number is already used. You can't create it again. Request the lead instead.", cost: 0.5 } : null; }
  function details(text){ return '<div style="font-size:13px;font-weight:400;color:#456;margin-top:6px;line-height:1.5">' + text + '</div>'; }

  /* shared checks for "request this lead" */
  function checkRequest(id, name, channel, extra){
    return function(ev, d){
      if (dupMsg(ev)) return dupMsg(ev);
      if (ev !== "request-sent") return false;
      var q = d.req;
      if (d.id !== id) return "That request is for a different lead. The lead you need is " + name + ".";
      if (q.channel !== channel) return channel === "Referrals" ? "Check the Channel (Last Touch). Where did this lead come from?" : "Check the Channel (Last Touch). How did you get this lead?";
      return extra ? extra(q) : true;
    };
  }

  window.ACQUI_EXAM = {
    title: "Lead enrollment and reassignment",
    taskId: "d5-reassign-practice",
    nextHref: "acqui-reassign-lecture.html", nextLabel: "Review the lecture",
    intro: "You will get 5 situations. Do what you would really do in Acqui Service: look up the lead, check if you can request it, then send the request. For new leads, enroll them. Use the simulation behind this box.",
    tasks: [
      { type: "act", html: true,
        text: 'A good friend of yours owns <b>Riverside Lumber Trading</b>. Over lunch, he says he needs a business loan and asks if you can handle it. You check Acqui Service and the business is already there (Lead ID 184422). Look it up and do the right thing.' + details("If you decide not to request the lead, click the button below."),
        hint: "Search the lead and check its status. Leads in Risk Review, Onboarded, Unserviceable or Utilized cannot be requested.",
        setup: function(){ var l = L("184422"); l.status = ["Risk Review", "Onboarded", "Unserviceable"][Math.floor(Math.random() * 3)]; if (typeof pending !== "undefined") delete pending["184422"]; },
        alt: { label: "I won't request this lead", check: function(c){ return (c.flags.visited || {})["184422"] ? true : "Look up the lead first before you decide."; } },
        check: function(ev, d){ if (dupMsg(ev)) return dupMsg(ev); return ev === "request-sent" && d.id === "184422" ? { fatal: "That lead is in " + L("184422").status + ". Leads in Risk Review, Onboarded, Unserviceable or Utilized cannot be requested. Always check the status first." } : false; },
        undo: function(){ unrequest(this._ev); } },

      { type: "act", html: true,
        text: 'You have known the owner of <b>Greenfield Foods Corp.</b> for years, through your family. He tells you he wants to work with you. You check Acqui Service: the business is already there (Lead ID 263118) and nobody is working on it. Make it yours.' + details("Approver: Tina Teamlead or Alan Smyth."),
        hint: "Search the lead, check the status, then use Request this lead. How did you get it? That's the Channel (Last Touch).",
        setup: function(){ if (typeof pending !== "undefined") delete pending["263118"]; },
        check: checkRequest("263118", "Greenfield Foods Corp.", "KAM - Self Generated Leads"),
        undo: function(){ unrequest(this._ev); } },

      { type: "act", html: true,
        text: 'Your referrer, <b>Mia Santos</b>, calls you: her cousin owns <b>Delta Packaging Inc.</b> and is interested in a loan. She already gave them your name. Delta Packaging is already in Acqui Service (Lead ID 341907) and nobody is working on it. Request the lead.' + details("Mia is already enrolled under you in Referrers. Approver: Tina Teamlead or Alan Smyth."),
        hint: "Channel (Last Touch) is Referrals. Mia is new, so the Referral Channel is Drip, not RPP.",
        setup: function(){ if (typeof pending !== "undefined") delete pending["341907"]; },
        check: checkRequest("341907", "Delta Packaging Inc.", "Referrals", function(q){
          if (q.rc !== "Drip") return q.rc === "RPP" ? "RPP is only for official referral partners who signed a contract with us. Mia is a new referrer, so choose Drip." : "Pick the Referral Channel. For a new referrer, it's Drip.";
          if (!q.ref || q.ref.k !== "Mia Santos") return "Pick the referrer who gave you this lead: Mia Santos.";
          return true;
        }),
        undo: function(){ unrequest(this._ev); } },

      { type: "act", html: true,
        text: 'At a barangay fiesta, you met the owner of <b>Kapitan Sari-Sari Wholesale</b>. He is interested in working with you, and he only told you the business name. No certificate. You search Acqui Service and he is not there yet. Enroll him as a new lead.' + details("Contact: Rico Dela Cruz · rico.delacruz@example.com · 09171234567"),
        hint: "Sole proprietorships are registered with the DTI. Open the DTI - BNRS bookmark (Document Uploading folder), search the exact business name, and use the Business Name No. Then Create Lead.",
        check: function(ev, d){
          if (ev !== "lead-created") return false;
          if (d.ch !== "KAM Self Generated") return "Check the Channel. You found this prospect yourself.";
          if (d.type !== "Sole Proprietorship") return "Check the Company Type. A business registered with the DTI is a Sole Proprietorship.";
          if (norm(d.name) !== norm("Kapitan Sari-Sari Wholesale")) return "The company name doesn't match. Use Kapitan Sari-Sari Wholesale.";
          if (norm(d.reg) !== norm("7001234")) return "That DTI Business Name No. doesn't match the DTI record of Kapitan Sari-Sari Wholesale. Search it again.";
          return true;
        },
        undo: function(){ removeLead(this._ev); } },

      { type: "act", html: true,
        text: 'Your referrer, <b>Mia Santos</b>, messages you again: a friend of hers owns <b>Golden Harbor Trading Corp.</b> and wants to talk to you. Mia forwarded you their SEC certificate. You search Acqui Service and the business is not there yet. Enroll it as a new lead.' + details('<button class="btn" onclick="showCert(\'sec\',\'CS202605227\',\'GOLDEN HARBOR TRADING CORP.\')" style="font-size:12px;padding:4px 10px">View the certificate Pia sent</button><br>Mia is already enrolled under you. Contact: Marco Villanueva · marco.villanueva@example.com · 09181234567'),
        hint: "Read the SEC Registration No. on the certificate. The Channel is Referral. Mia has no qualified leads yet, so the Referral Channel is still Drip.",
        check: function(ev, d){
          if (ev !== "lead-created") return false;
          if (d.ch !== "Referral") return "Check the Channel. This lead came from a referrer.";
          if (d.rc !== "Drip") return d.rc === "RPP" ? "RPP is only for official referral partners who signed a contract with us. Mia is still new, so choose Drip." : "Pick the Referral Channel. For a new referrer, it's Drip.";
          if (d.ref !== "Mia Santos") return "Pick the referrer who gave you this lead: Mia Santos.";
          if (norm(d.name) !== norm("Golden Harbor Trading Corp.")) return "The company name doesn't match. Use Golden Harbor Trading Corp.";
          if (d.type === "Sole Proprietorship") return "Check the Company Type. This one has an SEC certificate, so it's a corporation.";
          if (norm(d.reg) !== norm("CS202605227")) return "That SEC Registration No. doesn't match the certificate. Read it again.";
          return true;
        },
        undo: function(){ removeLead(this._ev); } }
    ]
  };
})();
