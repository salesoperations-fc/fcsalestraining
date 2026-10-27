window.ACQUI=window.ACQUI||{hooks:{},on:function(n,f){(this.hooks[n]=this.hooks[n]||[]).push(f)},emit:function(n,d){(this.hooks[n]||[]).forEach(function(f){try{f(d)}catch(e){console.error(e)}})}};
/* ===== Fake data (no real clients) ===== */
var ME = "Hanna Test";
var TEAM_LEADS = ["Tina Teamlead (Team Lead)", "Sam Saleshead"];
var CHANNELS = ["Partnerships","Related Party","Referrals","Trading Relationships","Inputs Engine - Government Awards Web Scraping","Outbound - Sole Prop","Support Generated Leads","KAM - Self Generated Leads","Product - New Onboarding Channel","Solar"];
var REFCH = ["RPP","Customer","Drip"];
var LEAD_STATUS = ["For Engagement","Prospecting","Discovery","Presented","Completing Requirements","Risk Review","Onboarded","Utilized"];
var RISK_STATUS = ["Account Ready for Review","Information Missing","Information Resubmitted","For Clarification","Raised to Risk Management","Preliminary CLO Assessment","CLO Ready for Review","CLO Approved","CLO Rejected","Fully Verified with Provisional Limit","Fully Verified with Future Revenue","Off-boarded/Rejected","Blacklisted"];
/* owner: "me" | "none" | other AM name */
var LEADS = [
 {id:"350115",name:"Metro Courier Services",status:"Onboarded",risk:"Fully Verified with Future Revenue",ba:"Approved",rev:1665278,bclAmt:100000,channel:"Referrals",refBy:"Bea Salonga",fcRef:"Mary Test",clo:0,eng:"2026-10-27",owner:"me",contact:"Christina Lopez",
  bclH:[{s:"Fully Verified with Future Revenue",at:"Oct 27, 2026, 2:46 PM",by:"BVP"},{s:"Information Resubmitted",at:"Oct 26, 2026, 3:10 PM",by:"Hanna Test"},{s:"Information Missing",at:"Oct 26, 2026, 11:38 AM",by:"BVP"},{s:"Information Resubmitted",at:"Oct 26, 2026, 11:20 AM",by:"Hanna Test"},{s:"Information Missing",at:"Oct 26, 2026, 10:47 AM",by:"BVP"},{s:"Account Ready for Review",at:"Oct 26, 2026, 10:30 AM",by:"Hanna Test"}],
  leadH:[{s:"Onboarded",d:"Oct 27, 2026"},{s:"Risk Review",d:"Oct 26, 2026"},{s:"Completing Requirements",d:"Oct 21, 2026"},{s:"Discovery",d:"Jul 20, 2026"},{s:"For Engagement",d:"Jul 20, 2026"}]},
 {id:"212766",hub:true,task:{pr:"Low",due:"Due tomorrow"},name:"Mike's Banana Chips (Test)",status:"For Engagement",risk:"-",channel:"KAM - Self Generated Leads",clo:0,eng:"2026-10-26",owner:"me",contact:"Mike Ilagan"},
 {id:"170240",task:{pr:"Medium",due:"Overdue"},name:"Sunrise Agri Corp",status:"Utilized",risk:"-",channel:"Inputs Engine - Government Awards Web Scraping",clo:500000,eng:"2026-08-12",owner:"me",contact:"Rita Cruz"},
 {id:"174297",task:{pr:"High",due:"Overdue"},name:"Blue Harbor Masters Inc.",status:"Utilized",risk:"-",channel:"Inputs Engine - Government Awards Web Scraping",clo:6000000,eng:"2026-09-02",owner:"me",contact:"Leo Tan"},
 {id:"271202",task:{pr:"High",due:"Due today"},name:"Benry Sand and Gravel",status:"Onboarded",risk:"-",channel:"Referrals",refBy:"Bea Salonga",clo:0,eng:"2026-10-23",owner:"me",contact:"Ben Ry"},
 {id:"371014",task:{pr:"Medium",due:"Due today"},name:"Golden Rice and Feeds",status:"Onboarded",risk:"-",channel:"Referrals",refBy:"Aaron Conda",clo:0,eng:"2026-10-20",owner:"me",contact:"Gina Lim"},
 {id:"370878",task:{pr:"Low",due:"Due tomorrow"},name:"Delta Trucking Services",status:"Onboarded",risk:"-",channel:"Referrals",refBy:"Carlo Mendez",clo:0,eng:"2026-10-23",owner:"me",contact:"Dan Dela"},
 {id:"316266",task:{pr:"Medium",due:"Overdue"},name:"Hotel Palmera Group",status:"Onboarded",risk:"CLO Approved",channel:"Inputs Engine - Government Awards Web Scraping",clo:2000000,eng:"2026-07-07",owner:"me",contact:"Pam Reyes"},
 {id:"156661",ba:"Approved",name:"Angel's Catering Services",status:"Presented",risk:"Raised to Risk Management",channel:"Product - New Onboarding Channel",clo:0,eng:"2026-09-29",owner:"none",contact:"Angelique Vergara"},
 {id:"133901",name:"Metro Print and Pack",status:"Discovery",risk:"-",channel:"Outbound - Sole Prop",clo:0,eng:"2026-09-18",owner:"none",contact:"Joel Santos"},
 {id:"248810",name:"Cebu Coastal Foods",status:"Prospecting",risk:"-",channel:"Partnerships",clo:0,eng:"2026-10-02",owner:"Aaron Test (AM)",contact:"Cora Uy"},
 {id:"305522",name:"Davao Highland Coffee",status:"Presented",risk:"For Clarification",channel:"Referrals",refBy:"Dina Robles",clo:1500000,eng:"2026-10-11",owner:"Aaron Test (AM)",contact:"Nilo Tan"},
 {id:"119034",name:"Northgate Logistics",status:"For Engagement",risk:"-",channel:"Support Generated Leads",clo:0,eng:"2026-10-05",owner:"none",contact:"Ana Ramos"},
 {id:"287450",name:"Pioneer Steel Works",status:"Onboarded",risk:"Fully Verified with Provisional Limit",channel:"Trading Relationships",clo:3000000,eng:"2026-10-14",owner:"Aaron Test (AM)",contact:"Vic Lee"}
];
/* referrers attributed to the AM (an AM only sees these when requesting a lead) */
var REFERRERS = [
 {name:"Aaron Conda",type:"Drip",email:"aaron.conda@example.com",phone:"09170000001"},
 {name:"Bea Salonga",type:"RPP",email:"bea.salonga@example.com",phone:"09170000002"},
 {name:"Carlo Mendez",type:"Customer",email:"carlo.mendez@example.com",phone:"09170000003"},
 {name:"Dina Robles",type:"Drip",email:"dina.robles@example.com",phone:"09170000004"},
 {name:"Eli Ocampo",type:"RPP",email:"eli.ocampo@example.com",phone:"09170000005"},
 {name:"Faye Navarro",type:"Customer",email:"faye.navarro@example.com",phone:"09170000006"}
];
var FC_STAFF = ["1368 - Hanna Test","1407 - Mary Test","1113 - Nery Test","576 - Bert Test"];
/* originations (drawdown triggered) and open BCLs (also without drawdown). ym = "YYYY-MM" */
var ORIG = [
 {co:"Sunrise Agri Corp",id:"170240",team:"Region Team 2",am:ME,rcl:500000,amt:350000,med:"No",chq:"Direct Debit",status:"Disbursed",signed:"2026-10-12",time:"11:26 AM",ym:"2026-10",rclid:"c62b502f-9a2c-4351-9741-ce9006dafc59",lp:"109669",rate:"2.74%",lpc:1,boost:"-"},
 {co:"Hotel Palmera Group",id:"316266",team:"Region Team 2",am:ME,rcl:2000000,amt:1200000,med:"Yes",chq:"-",status:"Contract Signed",signed:"2026-10-20",time:"2:14 PM",ym:"2026-10",rclid:"4a1d92c0-1b7e-4c0a-8f31-6d2e5b9c7a10",lp:"109702",rate:"2.50%",lpc:1,boost:"-"},
 {co:"Blue Harbor Masters Inc.",id:"174297",team:"Region Team 2",am:ME,rcl:6000000,amt:900000,med:"Yes",chq:"Direct Debit",status:"Settled",signed:"2026-09-15",time:"9:05 AM",ym:"2026-09",rclid:"9be0c7a2-55d3-47f1-b0c4-1e8a3d7f6b22",lp:"108844",rate:"2.60%",lpc:2,boost:"5%"},
 {co:"Delta Trucking Services",id:"370878",team:"Region Team 2",am:ME,rcl:300000,amt:120000,med:"No",chq:"-",status:"Pending",signed:"2026-08-04",time:"3:40 PM",ym:"2026-08",rclid:"d3f4a8e1-72c9-4b6d-9a15-0c2b7e4f8d33",lp:"107310",rate:"2.74%",lpc:1,boost:"-"}
];
var BCLS = [
 {co:"Sunrise Agri Corp",id:"170240",team:"Region Team 2",am:ME,bcl:500000,orig30:350000,login:"2026-10-12",ym:"2026-10",date:"Oct 12, 2026"},
 {co:"Hotel Palmera Group",id:"316266",team:"Region Team 2",am:ME,bcl:2000000,orig30:1200000,login:"2026-10-20",ym:"2026-10",date:"Oct 20, 2026"},
 {co:"Golden Rice and Feeds",id:"371014",team:"Region Team 2",am:ME,bcl:250000,orig30:0,login:"-",ym:"2026-10",date:"Oct 21, 2026"},
 {co:"Blue Harbor Masters Inc.",id:"174297",team:"Region Team 2",am:ME,bcl:6000000,orig30:900000,login:"2026-09-15",ym:"2026-09",date:"Sep 15, 2026"},
 {co:"Benry Sand and Gravel",id:"271202",team:"Region Team 2",am:ME,bcl:400000,orig30:0,login:"-",ym:"2026-08",date:"Aug 28, 2026"}
];
var EYE='<svg viewBox="0 0 24 24" width="18" height="18" style="stroke:#556;fill:none;stroke-width:1.7"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ===== helpers ===== */
var $=function(s,r){return (r||document).querySelector(s)};
var fmt=function(n){return n?"₱"+n.toLocaleString("en-US",{minimumFractionDigits:2}):"-"};
var fdate=function(d){var x=new Date(d+"T00:00:00");return MONTHS[x.getMonth()].slice(0,3)+" "+x.getDate()+", "+x.getFullYear()};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var ICONS={
 home:'<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 16.9 6.6 19.8l1-6.1L3.2 9.4l6.1-.8z"/></svg>',
 card:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
 user:'<svg viewBox="0 0 24 24"><circle cx="10" cy="8" r="4"/><path d="M3 20c0-4 3-6 7-6m3 4 2 2 4-4"/></svg>',
 layers:'<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>'
};
var NAV=[["home","Home","#/home"],["star","Leads","#/leads"],["card","Originations","#/originations"],["user","Referrers","#/referrers"],["layers","Open BCLs","#/open-bcls"]];
function toast(m){var t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(function(){t.style.display="none"},2600)}

/* shared state */
var S={};            // filter state per page
var pending={};      // lead id -> true after request sent
function mine(){return LEADS.filter(function(l){return l.owner==="me"})}

/* ===== dropdown / filter widgets ===== */
function multi(key,label,opts,wide){
  return '<div class="fl"><label>'+label+'</label><div class="dd" data-ms="'+key+'" style="'+(wide?"min-width:130px":"")+'"><button type="button"><span class="lbl"></span></button>'+
   '<div class="panel"><div class="ph"><span>Select options</span><a data-clear="'+key+'">Clear All</a></div>'+
   opts.map(function(o){return '<label class="opt"><input type="checkbox" data-k="'+key+'" value="'+esc(o)+'"> '+esc(o)+'</label>'}).join("")+'</div></div></div>';
}
function single(key,label,opts,def){
  return '<div class="fl"><label>'+label+'</label><select class="sel" data-sel="'+key+'">'+opts.map(function(o){return '<option'+(o===def?" selected":"")+'>'+o+'</option>'}).join("")+'</select></div>';
}
function setLabels(root,all){
  root.querySelectorAll(".dd[data-ms]").forEach(function(d){
    var k=d.dataset.ms,v=(S[k]||[]);
    d.querySelector(".lbl").textContent=v.length?(v.length>1?v.length+" selected":v[0]):(all[k]||"All");
  });
}
function bindFilters(root,onChange,all){
  root.querySelectorAll(".dd>button").forEach(function(b){b.onclick=function(e){e.stopPropagation();var d=b.parentNode,was=d.classList.contains("open");document.querySelectorAll(".dd.open").forEach(function(x){x.classList.remove("open")});if(!was)d.classList.add("open")}});
  root.querySelectorAll("input[type=checkbox][data-k]").forEach(function(c){c.onchange=function(){
    var k=c.dataset.k;S[k]=[].slice.call(root.querySelectorAll('input[data-k="'+k+'"]:checked')).map(function(x){return x.value});setLabels(root,all);ACQUI.emit("filter",{key:k,vals:S[k]});onChange()}});
  root.querySelectorAll("[data-clear]").forEach(function(a){a.onclick=function(){var k=a.dataset.clear;S[k]=[];root.querySelectorAll('input[data-k="'+k+'"]').forEach(function(c){c.checked=false});setLabels(root,all);onChange()}});
  root.querySelectorAll("[data-sel]").forEach(function(s){s.onchange=function(){S[s.dataset.sel]=s.value;onChange()}});
  root.querySelectorAll("input.txt[data-txt]").forEach(function(i){i.oninput=function(){S[i.dataset.txt]=i.value;onChange()}});
  setLabels(root,all);
}
document.addEventListener("click",function(e){if(!e.target.closest(".dd"))document.querySelectorAll(".dd.open").forEach(function(x){x.classList.remove("open")})});

/* paging */
function paged(key,rows,render,cols){
  var per=+(S[key+"_per"]||10),pg=Math.min(+(S[key+"_pg"]||1),Math.max(1,Math.ceil(rows.length/per))),
      tot=Math.max(1,Math.ceil(rows.length/per)),from=rows.length?(pg-1)*per:0,to=Math.min(rows.length,from+per);
  var html=rows.length?rows.slice(from,to).map(render).join(""):'<tr><td colspan="'+cols+'"></td></tr>';
  return {html:html,bar:'<div class="pager"><span>Showing '+(rows.length?from+1:0)+' to '+to+' of '+rows.length+' entries</span><span>ROWS PER PAGE: <select class="sel" style="min-width:50px;height:22px" data-per="'+key+'">'+[10,20,50,100].map(function(n){return '<option'+(n===per?" selected":"")+'>'+n+'</option>'}).join("")+'</select> &nbsp; <button data-pg="'+key+':1"'+(pg<=1?" disabled":"")+'>«</button><button data-pg="'+key+':'+(pg-1)+'"'+(pg<=1?" disabled":"")+'>‹</button> Page <b>'+pg+'</b> of <b>'+tot+'</b> <button data-pg="'+key+':'+(pg+1)+'"'+(pg>=tot?" disabled":"")+'>›</button><button data-pg="'+key+':'+tot+'"'+(pg>=tot?" disabled":"")+'>»</button></span></div>'};
}
function bindPager(root,key,again){
  root.querySelectorAll("[data-pg]").forEach(function(b){b.onclick=function(){var p=b.dataset.pg.split(":");S[p[0]+"_pg"]=+p[1];again()}});
  root.querySelectorAll("[data-per]").forEach(function(s){s.onchange=function(){S[key+"_per"]=+s.value;S[key+"_pg"]=1;again()}});
}

/* ===== pages ===== */
function pageHome(){
  var h=new Date().getHours(),g=h<12?"morning":h<18?"afternoon":"evening";
  return '<div class="hello"><div><h1>Good '+g+', '+ME+'!</h1><div class="sub">Here\'s your overview for today.</div>'+
   '<div class="sub" style="font-size:9px">EMAIL MONITORING &nbsp; <button class="btn" disabled>Connect Gmail</button> &nbsp; Not available in the simulation</div></div>'+
   '<button class="btn teal" disabled title="Coming soon">Calculate Incentive</button></div>'+
   '<div class="card" id="tasks"><div class="ctitle">▣ Tasks</div><div class="tabs" id="ttabs"></div><div id="tlist"></div></div>'+
   '<div class="card"><div class="ctitle">Intraday Productivity</div><div class="grid3"><div><div class="ctitle" style="color:var(--mut)">Call flow</div><div class="bar" style="height:20px"></div><div class="sub" style="margin:6px 0 0">No calls yet today</div><div style="margin-top:6px"><b>0</b> Attempted → — <b>0</b> Connected → — <b>0</b> Unique leads</div></div>'+
   '<div><div class="ctitle" style="color:var(--mut)">Pace</div><div class="sub">Connected calls · vs 0/day avg</div><div class="bar"></div><div class="sub" style="margin-top:14px">Connected calls · last 7 days</div><div style="margin-top:22px;display:flex;justify-content:space-between"><span class="sub">F2F Meetings</span><b style="font-size:18px">0</b></div></div>'+
   '<div><div class="ctitle" style="color:var(--mut)">Task completion</div><div class="sub">— cleared today</div><div class="bar"></div><div class="sub" style="margin-top:6px">No tasks due today</div></div></div></div>'+
   '<div class="card" id="mtd"><div class="ctitle">MTD Productivity View</div><table class="kt"><thead><tr><th>Metric</th><th class="hl blue">This Month<br><small>Avg/Day</small></th><th>Ave. Last Month<br><small>Avg/Day</small></th><th>Ave. Last 3 Months<br><small>Avg/Day</small></th><th>vs Top Performer<br><small>Avg/Day</small></th></tr></thead><tbody>'+
   [["Connected Calls","0","26.4",'<span class="neg">(-26.4)</span>'],["First F2F Meetings","0","1.8",'<span class="neg">(-1.8)</span>'],["First Completing Requirements","—","2",""],["First BVP Submitted","—","1.3",""],["Documents Verified","—","8.4",""]].map(function(r){return '<tr><td>'+r[0]+'</td><td class="hl blue">'+r[1]+'</td><td>—</td><td>—</td><td>'+r[2]+' '+r[3]+'</td></tr>'}).join("")+
   '</tbody></table><div class="sub" style="margin:8px 0 0;font-size:9px">ⓘ Click a This Month value to view the last 30-day daily breakdown.</div></div>'+
   '<div class="card"><div class="ctitle">MTD KPI Summary</div><table class="kt"><thead><tr><th>KPI</th><th>This Month</th><th>vs Last Month<br><small>full / partial</small></th><th>3-Month Avg</th><th>vs Top Performer</th></tr></thead><tbody>'+
   [["First F2F Meetings","0","33"],["Open BCL w/ Connect Login","0","16"],["SBA Utilized","0","14"],["Origination (Count)","0","15"],["Origination (Amount)","₱0.00","₱37.80M"]].map(function(r){return '<tr><td>'+r[0]+'</td><td class="blue kpi" style="cursor:pointer">'+r[1]+'</td><td><small class="sub">— 0<br>part. — 0</small></td><td>0</td><td><span class="neg">-100% ▼</span> <small class="sub">'+r[2]+'</small></td></tr>'}).join("")+
   '</tbody></table><div class="sub" style="margin:8px 0 0;font-size:9px">ⓘ Partial: same days elapsed in last month as the current month-to-date.<br>ⓘ Click any number to view detailed breakdown and trends.</div></div>';
}

var TTAB="Today's Tasks";
function taskList(){return mine().filter(function(l){return l.task&&!l.task.done})}
function tabItems(t){
  return taskList().filter(function(l){var k=l.task;
    return t==="All pending"||(t==="Today's Tasks"&&(k.due==="Overdue"||k.due==="Due today"))||(t==="Urgent/High"&&k.pr==="High")||(t==="Medium"&&k.pr==="Medium")||(t==="Low"&&k.pr==="Low")});
}
/* Lead summary panel (Tasks > Summary). In the real app this is AI-generated from call and meeting notes, so it is "not available" here. */
function openSummary(id){
  var l=LEADS.filter(function(x){return x.id===id})[0];if(!l)return;
  var na='<div style="color:var(--mut);font-size:12px;margin:4px 0 14px">Not available</div>';
  $("#sp").innerHTML='<button class="x" onclick="closeSP()">×</button><div class="t">LEAD SUMMARY</div><div class="n">'+esc(l.name.toUpperCase())+'</div><hr style="border:0;border-top:1px solid #eef2f2;margin:0 0 14px">'+
   '<div class="t" style="margin-bottom:6px">PRIMARY CONTACT</div><div style="font-size:13px;font-weight:600;margin-bottom:6px">'+esc(l.contact)+'</div>'+
   '<div class="row2"><span style="color:var(--mut)">Phone</span><b>+63 900 000 0001</b></div><div class="row2"><span style="color:var(--mut)">Phone</span><b>+63 900 000 0002</b></div>'+
   '<div class="t" style="margin:16px 0 8px">CUSTOMER SUMMARY</div>'+
   '<div style="background:#f3f6f6;border-radius:8px;padding:8px 10px;font-size:10.5px;color:#456;margin-bottom:12px">In the real Acqui Service, this summary is written by AI from your call and meeting notes on the lead. It is not available in the simulation.</div>'+
   '<div style="font-weight:700;color:#445;font-size:12px">What was discussed</div>'+na+
   '<div style="font-weight:700;color:#445;font-size:12px">Key takeaways</div>'+na+
   '<div style="font-weight:700;color:#445;font-size:12px">Commitments / Next steps</div>'+na;
  $("#sp").classList.add("open");
}
function drawTasks(root){
  var tabs=["Today's Tasks","All pending","Urgent/High","Medium","Low"];
  $("#ttabs",root).innerHTML=tabs.map(function(t){var n=tabItems(t).length;return '<span data-t="'+t+'" class="'+(t===TTAB?"on":"")+'">'+t+' <span class="chip '+(t===TTAB?"blue":"")+'">'+n+'</span></span>'}).join("");
  var it=tabItems(TTAB);
  $("#tlist",root).innerHTML=it.length?'<table><tbody>'+it.map(function(l){var k=l.task;
    return '<tr class="row"><td style="width:24px"><input type="checkbox" data-done="'+l.id+'"></td><td><span class="pill">'+k.pr.toUpperCase()+'</span> <b style="font-weight:600">'+esc(l.name)+' — Call</b></td><td><span class="pill b">CALL</span></td><td><span class="chip">'+l.status+'</span></td><td class="'+(k.due==="Overdue"?"neg":"")+'" style="font-weight:600">'+k.due+'</td><td><button class="btn" data-sum="'+l.id+'">Summary</button></td></tr>'}).join("")+'</tbody></table>'
    :'<div class="empty">No pending tasks'+(TTAB==="Today's Tasks"?" for today":"")+'.</div>';
  root.querySelectorAll("[data-t]").forEach(function(x){x.onclick=function(){TTAB=x.dataset.t;drawTasks(root)}});
  root.querySelectorAll("[data-done]").forEach(function(c){c.onchange=function(){var l=LEADS.filter(function(x){return x.id===c.dataset.done})[0];l.task.done=true;toast("Task completed");drawTasks(root)}});
  root.querySelectorAll("[data-sum]").forEach(function(c){c.onclick=function(){openSummary(c.dataset.sum);ACQUI.emit("summary-open",c.dataset.sum)}});
}
function afterHome(root){
  drawTasks(root);
  root.querySelectorAll(".kpi").forEach(function(k){k.onclick=function(){toast("Lead details coming soon")}});
}

function pageLeads(){
  var all={status:"All statuses",risk:"All risk statuses"};
  return '<div style="display:flex;justify-content:space-between;align-items:flex-start"><div><h1>My Lead List</h1><div class="sub">View and manage leads currently assigned.</div></div><button class="btn teal" id="newlead">Create Lead</button></div>'+
   '<div class="fl" style="margin-bottom:12px"><input class="txt sel" data-txt="lq" placeholder="Search by business name or lead ID..." style="width:230px" value="'+esc(S.lq||"")+'"></div>'+
   '<div class="filters" id="lf">'+multi("status","Status",LEAD_STATUS)+multi("risk","Risk status",RISK_STATUS)+
   single("eng","Last engagement",["Any time","Last 7 days","Last 30 days","Last 90 days"],S.eng||"Any time")+
   '<div class="fl"><label>CLO amount <span title="CLO amount data is still being backfilled — filtering may not match all leads yet." style="color:var(--teal);cursor:help">●</span></label><div class="dd rng"><button type="button"><span class="lbl" id="clol">Any amount</span></button><div class="panel"><div class="ph"><span>Set a range</span><a id="clox">Clear</a></div><input data-r="min" placeholder="Min" value="'+esc(S.cmin||"")+'"><input data-r="max" placeholder="Max" value="'+esc(S.cmax||"")+'"></div></div></div></div>'+
   '<div class="note">The owner and unassigned-leads filters are not available when viewing your own leads.</div>'+
   '<div id="ltbl"></div>';
}
function leadRows(){
  var now=new Date("2026-10-26T00:00:00"),q=(S.lq||"").toLowerCase();
  return mine().filter(function(l){
    if(q&&l.name.toLowerCase().indexOf(q)<0&&l.id.indexOf(q)<0)return false;
    if((S.status||[]).length&&S.status.indexOf(l.status)<0)return false;
    if((S.risk||[]).length&&S.risk.indexOf(l.risk)<0)return false;
    var days={"Last 7 days":7,"Last 30 days":30,"Last 90 days":90}[S.eng];
    if(days&&(now-new Date(l.eng+"T00:00:00"))/864e5>days)return false;
    var mn=parseFloat((S.cmin||"").replace(/,/g,"")),mx=parseFloat((S.cmax||"").replace(/,/g,""));
    if(!isNaN(mn)&&l.clo<mn)return false;if(!isNaN(mx)&&l.clo>mx)return false;return true;
  }).sort(function(a,b){var d=S.lsort==="name"?a.name.localeCompare(b.name):S.lsort==="eng"?(a.eng<b.eng?-1:1):0;return S.ldir==="desc"?-d:d});
}
function drawLeads(root){
  var r=paged("ls",leadRows(),function(l){return '<tr class="row"><td>'+esc(l.name)+'<span class="idtag">'+l.id+'</span></td><td>'+l.status+'</td><td>'+l.risk+'</td><td>'+esc(l.channel.length>14?l.channel.slice(0,12)+"…":l.channel)+'</td><td>'+fmt(l.clo)+'</td><td>'+fdate(l.eng)+'</td><td><span class="link" data-open="'+l.id+'">Open</span></td></tr>'},7);
  $("#ltbl",root).innerHTML='<div class="card" style="padding:4px 10px"><table><thead><tr><th>Business name <span class="sort" data-sort="name" style="cursor:pointer">⇅</span></th><th>Status</th><th>Risk status</th><th>Channel</th><th>CLO amount</th><th>Last engagement <span class="sort" data-sort="eng" style="cursor:pointer">⇅</span></th><th></th></tr></thead><tbody>'+r.html+'</tbody></table></div>'+r.bar;
  bindPager($("#ltbl",root),"ls",function(){drawLeads(root)});
  root.querySelectorAll("[data-sort]").forEach(function(s){s.onclick=function(){S.ldir=(S.lsort===s.dataset.sort&&S.ldir==="asc")?"desc":"asc";S.lsort=s.dataset.sort;drawLeads(root)}});
  root.querySelectorAll("[data-open]").forEach(function(a){a.onclick=function(){location.hash="#/lead/"+a.dataset.open}});
}
function afterLeads(root){
  var all={status:"All statuses",risk:"All risk statuses"};
  var redraw=function(){S.ls_pg=1;drawLeads(root)};
  bindFilters(root,redraw,all);
  root.querySelectorAll(".rng input").forEach(function(i){i.oninput=function(){S[i.dataset.r==="min"?"cmin":"cmax"]=i.value;
    var a=S.cmin,b=S.cmax;$("#clol",root).textContent=(a||b)?(a?"₱"+a:"₱0")+" – "+(b?"₱"+b:"any"):"Any amount";redraw()}});
  $("#clox",root).onclick=function(){S.cmin=S.cmax="";root.querySelectorAll(".rng input").forEach(function(i){i.value=""});$("#clol",root).textContent="Any amount";redraw()};
  $("#newlead",root).onclick=openCreate;
  drawLeads(root);
}

/* date coverage control shared by Originations and Open BCLs */
function coverage(){
  return '<div style="text-align:right"><div class="fl" style="display:inline-flex;gap:8px;align-items:center"><label style="margin:0">Filter by:</label>'+
   '<select class="sel" data-sel="by" style="min-width:90px"><option>All</option><option>Monthly</option><option>Quarterly</option></select></div>'+
   '<div id="cov" style="margin-top:6px"></div></div>';
}
function drawCov(root){
  var by=S.by||"Monthly",c=$("#cov",root);
  if(by==="All"){c.innerHTML="";return}
  var yrs='<select class="sel" data-sel="yr" style="min-width:70px">'+[2025,2026].map(function(y){return '<option'+(y==(S.yr||2026)?" selected":"")+'>'+y+'</option>'}).join("")+'</select>';
  var per=by==="Monthly"?'<select class="sel" data-sel="mo">'+MONTHS.map(function(m,i){return '<option value="'+i+'"'+(i==(S.mo==null?9:S.mo)?" selected":"")+'>'+m+'</option>'}).join("")+'</select>':
   '<select class="sel" data-sel="qt">'+[1,2,3,4].map(function(q){return '<option value="'+q+'"'+(q==(S.qt||4)?" selected":"")+'>Q'+q+'</option>'}).join("")+'</select>';
  c.innerHTML='<div class="sub" style="margin:0 0 3px">Current coverage</div>'+per+" "+yrs;
}
function inCov(ym){
  var by=S.by||"Monthly";if(by==="All")return true;
  var y=+ym.slice(0,4),m=+ym.slice(5)-1;
  if(y!==+(S.yr||2026))return false;
  if(by==="Monthly")return m===+(S.mo==null?9:S.mo);
  return Math.floor(m/3)+1===+(S.qt||4);
}
function bindCov(root,redraw){
  root.querySelectorAll("[data-sel]").forEach(function(s){s.onchange=function(){S[s.dataset.sel]=s.value;setTimeout(function(){ACQUI.emit("filter",{key:"cov",by:S.by||"Monthly",mo:S.mo==null?9:+S.mo,qt:+(S.qt||4),yr:+(S.yr||2026)})},0);if(s.dataset.sel==="by")drawCov(root);bindCov(root,redraw);redraw()}});
}

function pageOrig(){
  return '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px"><div><h1>Originations</h1><div class="sub">View and manage all originations.</div>'+
   '<div class="fl"><input class="txt sel" data-txt="oq" placeholder="Search using name or lead ID" style="width:250px" value="'+esc(S.oq||"")+'"></div>'+
   '<div class="filters" style="margin-top:8px">'+multi("ost","Status:",["Disbursed","Settled","Contract Signed","Pending"])+single("chq","Cheques:",["All","Yes","No"],S.chq||"All")+'</div></div>'+coverage()+'</div><div id="otbl"></div>';
}
function drawOrig(root){
  var q=(S.oq||"").toLowerCase();
  var rows=ORIG.filter(function(o){
    if(q&&o.co.toLowerCase().indexOf(q)<0&&o.id.indexOf(q)<0)return false;
    if((S.ost||[]).length&&S.ost.indexOf(o.status)<0)return false;
    if(S.chq&&S.chq!=="All"&&((S.chq==="Yes")!==(o.chq!=="-")))return false;
    return inCov(o.ym)});
  var tr=rows.reduce(function(a,o){return a+o.rcl},0),ta=rows.reduce(function(a,o){return a+o.amt},0);
  var r=paged("or",rows,function(o){return '<tr class="row"><td>'+esc(o.co)+'<span class="idtag">'+o.id+'</span></td><td style="color:var(--teal);font-weight:600">'+o.team+'</td><td>'+o.am+'</td><td>'+fmt(o.rcl)+'</td><td>'+fmt(o.amt)+'</td><td>'+(o.med==="Yes"?"Yes":"No")+'</td><td>'+(o.chq==="-"?"":o.chq)+'</td><td>'+o.status+'</td><td>'+fdate(o.signed)+'<div class="sub" style="margin:0;font-size:9px">'+o.time+'</div></td><td><span class="eye" data-eye="'+o.id+'" style="cursor:pointer">'+EYE+'</span></td></tr>'},10);
  $("#otbl",root).innerHTML='<div class="card" style="padding:4px 10px;margin-top:12px"><table><thead><tr><th>Company name</th><th>Team</th><th>AM</th><th>RCL amount</th><th>Amount ⇅</th><th>Medium +</th><th>Cheques collected</th><th>Status</th><th>Contract signed</th><th></th></tr></thead><tbody>'+
   (rows.length?'<tr style="background:#f3f6f6"><td colspan="3"><b style="font-size:13px">Total</b></td><td><b>'+fmt(tr)+'</b></td><td><b>'+fmt(ta)+'</b></td><td colspan="6"></td></tr>':"")+r.html+'</tbody></table></div>'+r.bar;
  bindPager($("#otbl",root),"or",function(){drawOrig(root)});
  root.querySelectorAll("[data-eye]").forEach(function(e){e.onclick=function(){openOrigDetail(e.dataset.eye);ACQUI.emit("orig-detail",e.dataset.eye)}});
}
function detailModal(title,items){
  $("#md").innerHTML='<h3>'+title+' <button id="mx">×</button></h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 18px">'+items.map(function(i){return '<div><div style="font-size:9px;color:var(--mut);text-transform:uppercase;letter-spacing:.3px">'+i[0]+'</div><div style="font-weight:600;font-size:11.5px;word-break:break-all">'+esc(i[1])+'</div></div>'}).join("")+'</div><div class="foot"><button class="btn" id="mclose">Close</button></div>';
  $("#md").classList.add("wide");$("#ov").style.display="flex";$("#mx").onclick=closeModal;$("#mclose").onclick=closeModal;
}
function openOrigDetail(id){
  var o=ORIG.filter(function(x){return x.id===id})[0];
  detailModal("Origination Details",[["Company name",o.co],["RCL ID",o.rclid],["Loan plan ID",o.lp],["Lead ID",o.id],["Status",o.status],["Date",o.signed],["RCL amount",fmt(o.rcl)],["Amount",fmt(o.amt)],["Amount SME eq.",fmt(o.amt)],["Interest rate",o.rate],["Medium +",o.med],["Loan plan count",String(o.lpc)],["First loan plan date",o.signed],["Credit boost %",o.boost],["Cheques collected",o.chq==="-"?"-":o.chq],["Incentive withheld","-"]]);
}
function afterOrig(root){
  var redraw=function(){S.or_pg=1;drawOrig(root)};
  bindFilters(root,redraw,{ost:"All statuses"});
  var by=root.querySelector('[data-sel="by"]');by.value=S.by||"Monthly";
  drawCov(root);bindCov(root,redraw);drawOrig(root);
}

function pageBcl(){
  return '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px"><div><h1>Open BCLs</h1><div class="sub">View details for all open BCLs.</div>'+
   '<div class="fl"><input class="txt sel" data-txt="bq" placeholder="Search using name or lead ID" style="width:230px" value="'+esc(S.bq||"")+'"></div></div>'+coverage()+'</div><div id="btbl"></div>';
}
function drawBcl(root){
  var q=(S.bq||"").toLowerCase();
  var rows=BCLS.filter(function(b){return (!q||b.co.toLowerCase().indexOf(q)>=0||b.id.indexOf(q)>=0)&&inCov(b.ym)});
  var r=paged("bc",rows,function(b){return '<tr class="row"><td>'+esc(b.co)+'<span class="idtag">'+b.id+'</span></td><td style="color:var(--teal);font-weight:600">'+b.team+'</td><td>'+b.am+'</td><td>'+fmt(b.bcl)+'</td><td>'+fmt(b.orig30)+'</td><td>'+b.login+'</td><td>'+b.date+'</td><td><span class="eye" data-beye="'+b.id+'" style="cursor:pointer">'+EYE+'</span></td></tr>'},8);
  $("#btbl",root).innerHTML='<div class="card" style="padding:4px 10px;margin-top:12px"><table><thead><tr><th>Company name</th><th>Team</th><th>Account manager</th><th>BCL amount ⇅</th><th>Total originations (30D)</th><th>Connect login</th><th>Date</th><th></th></tr></thead><tbody>'+r.html+'</tbody></table></div>'+r.bar;
  bindPager($("#btbl",root),"bc",function(){drawBcl(root)});
  root.querySelectorAll("[data-beye]").forEach(function(e){e.onclick=function(){openBclDetail(e.dataset.beye);ACQUI.emit("bcl-detail",e.dataset.beye)}});
}
function openBclDetail(id){
  var b=BCLS.filter(function(x){return x.id===id})[0];
  detailModal("Open BCL Details",[["Company name",b.co],["Lead ID",b.id],["Team",b.team],["Account manager",b.am],["BCL amount",fmt(b.bcl)],["Total originations (30D)",fmt(b.orig30)],["Connect login",b.login],["Date",b.date]]);
}
function afterBcl(root){
  var redraw=function(){S.bc_pg=1;drawBcl(root)};
  bindFilters(root,redraw,{});
  var by=root.querySelector('[data-sel="by"]');by.value=S.by||"Monthly";
  drawCov(root);bindCov(root,redraw);drawBcl(root);
}

function pageRef(){
  return '<h1>Referrers</h1><div class="sub">Referrers attributed to you. (Admins can see all referrers.)</div>'+
   '<div class="fl" style="margin-bottom:10px"><input class="txt sel" data-txt="rq" placeholder="Search by name, email or phone" style="width:250px" value="'+esc(S.rq||"")+'"></div>'+
   '<div class="filters">'+multi("rty","Type",REFCH)+'</div><div id="rtbl"></div>';
}
function drawRef(root){
  var q=(S.rq||"").toLowerCase();
  var rows=REFERRERS.filter(function(r){return (!q||(r.name+r.email+r.phone).toLowerCase().indexOf(q)>=0)&&(!(S.rty||[]).length||S.rty.indexOf(r.type)>=0)});
  var r=paged("rf",rows,function(x){return '<tr class="row"><td><span class="link" data-ref="'+esc(x.name)+'">'+esc(x.name)+'</span></td><td><span class="chip">'+x.type+'</span></td><td>'+x.email+'</td><td>'+x.phone+'</td><td>'+LEADS.filter(function(l){return l.refBy===x.name}).length+'</td></tr>'},5);
  $("#rtbl",root).innerHTML='<div class="card" style="padding:4px 10px"><table><thead><tr><th>Name</th><th>Type</th><th>Email</th><th>Phone</th><th>Leads referred</th></tr></thead><tbody>'+r.html+'</tbody></table></div>'+r.bar;
  bindPager($("#rtbl",root),"rf",function(){drawRef(root)});
  root.querySelectorAll("[data-ref]").forEach(function(a){a.onclick=function(){ACQUI.emit("referrer-open",a.dataset.ref);location.hash="#/referrer/"+encodeURIComponent(a.dataset.ref)}});
}
function afterRef(root){var redraw=function(){S.rf_pg=1;drawRef(root)};bindFilters(root,redraw,{rty:"All types"});drawRef(root)}
function pageReferrer(name){
  var r=REFERRERS.filter(function(x){return x.name===name})[0];
  if(!r)return '<h1>Referrer not found</h1>';
  var ls=LEADS.filter(function(l){return l.refBy===name});
  return '<div class="crumb"><span class="link" id="rback">Referrers</span> /</div><h1>'+esc(r.name)+'</h1><div class="sub">'+r.type+' · '+r.email+' · '+r.phone+'</div>'+
   '<div class="card" id="rdetail" style="padding:4px 10px"><div class="ctitle" style="padding:10px 4px 0">Leads referred ('+ls.length+')</div><table><thead><tr><th>Business name</th><th>Status</th><th>Owner</th><th>Date</th><th></th></tr></thead><tbody>'+
   (ls.length?ls.map(function(l){return '<tr class="row"><td>'+esc(l.name)+'<span class="idtag">'+l.id+'</span></td><td>'+l.status+'</td><td>'+(l.owner==="me"?ME:l.owner==="none"?"—":esc(l.owner))+'</td><td>'+fdate(l.eng)+'</td><td><span class="link" data-open="'+l.id+'">Open</span></td></tr>'}).join(""):'<tr><td colspan="5" class="sub">No leads referred yet.</td></tr>')+'</tbody></table></div>';
}
function afterReferrer(root){
  $("#rback",root).onclick=function(){location.hash="#/referrers"};
  root.querySelectorAll("[data-open]").forEach(function(a){a.onclick=function(){location.hash="#/lead/"+a.dataset.open}});
}

/* lead detail */
var CLOCK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
var PEN='<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/></svg>';
var BA_OPTS=["Information Resubmitted"];
var FVS=["Fully Verified with Future Revenue","Fully Verified with Provisional Limit"];
/* BCL flow: ARFR (once) -> Information Missing <-> Information Resubmitted -> Fully Verified; Fully Verified -> Information Resubmitted -> Fully Verified.
   The AM sets ARFR and Information Resubmitted; BVP sets Information Missing and Fully Verified. */
function bclOpts(l){
  var st=bclOf(l),hadARFR=bclHist(l).some(function(h){return h.s==="Account Ready for Review"});
  if(!st)return hadARFR?[]:["Account Ready for Review"];
  if(st==="Information Missing"||/^Fully Verified/.test(st))return ["Information Resubmitted"];
  return [];
}
function bvpOpts(l){var st=bclOf(l);return(st==="Account Ready for Review"||st==="Information Resubmitted")?["Information Missing"].concat(FVS):[]}
function pillCls(st){return /Fully Verified|Approved|Utilized/.test(st)?"g":/Clarification/.test(st)?"a":/Missing|Rejected|Blacklisted|Off-boarded/.test(st)?"r":"b"}
function bclOf(l){return l.risk&&l.risk!=="-"?l.risk:null}
function bclHist(l){return l.bclH||(bclOf(l)?[{s:bclOf(l),at:"Oct 20, 2026, 10:12 AM",by:"BVP"}]:[])}
function baHist(l){return l.baH||(l.ba?[{s:l.ba,at:"Oct 20, 2026, 10:15 AM",by:"BVP"}]:[])}
function iso(d){var p=function(n){return n<10?"0"+n:n};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())}
function leadHist(l){
  if(l.leadH)return l.leadH;
  var i=Math.max(0,LEAD_STATUS.indexOf(l.status)),out=[],d=new Date(l.eng+"T00:00:00");
  for(var k=i;k>=0;k--){out.push({s:LEAD_STATUS[k],d:fdate(iso(d))});d=new Date(d.getTime()-(k>2?3:20)*864e5)}
  return out;
}
function nowStamp(){return "Oct 28, 2026, "+new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}
function scard(kind,st,canEdit,l){
  var bv=(kind==="BCL"&&canEdit)?bvpOpts(l):[];
  return '<div class="scard"><div class="sch"><span>'+kind+' STATUS</span><span class="ics"><span class="ic clk" data-hist="'+kind+'" title="Status history">'+CLOCK+'</span>'+(canEdit?'<span class="ic" data-edit="'+kind+'" title="Change status">'+PEN+'</span>':"")+'</span></div>'+
   '<span class="sp2 '+(st?pillCls(st):"")+'">● '+(st?esc(st):"—")+'</span>'+
   (bv.length?'<div class="bvp">Sandbox: act as BVP<br>'+bv.map(function(o){return '<a data-bvp="'+o+'">'+o.replace("Fully Verified with ","Fully Verified: ")+'</a>'}).join(" · ")+'</div>':"")+'<div class="pop" id="pop-'+kind+'"></div></div>';
}
function pageLead(id){
  var l=LEADS.filter(function(x){return x.id===id})[0];
  if(!l)return '<h1>Lead not found</h1>';
  var isMine=l.owner==="me",un=l.owner==="none",tab=S.ltab||"Company info";
  var owner=isMine?ME:un?"—":l.owner,bcl=bclOf(l),fv=/Fully Verified/.test(bcl||"");
  var head='<div class="crumb">Leads /</div><div class="lh"><div><h1>'+esc(l.name)+'<span class="rf">⟳</span></h1><div class="lmeta"><span class="p">Lead ID '+l.id+'</span><span class="dot">⧉ ·</span>'+
   (un?"":'Assigned to <b style="font-size:12px">'+esc(owner)+'</b> <span class="idot" id="amdot" title="Account manager">i</span>'+(l.hub?'<span class="dot">·</span><span class="syn">Synced from HubSpot</span>':""))+
   '<span class="dot">·</span><span class="p lst" data-lh title="Lead status history">'+CLOCK.replace("<svg",'<svg width="12" height="12" style="stroke:#2a8a82;fill:none;stroke-width:1.8"')+l.status+'</span><div class="pop am" id="ampop" style="position:absolute"></div></div></div>'+
   '<div style="display:flex;gap:6px"><button class="btn" data-soon>Open in LMS ↗</button>'+(isMine?'<button class="btn" data-soon>⟳ Reassign</button>':'<button class="btn" data-soon>⟳ Assign</button>')+(isMine?'<button class="btn" data-soon>✉ Send email</button>':"")+'<button class="btn" data-soon>Contacts »</button></div></div>';
  var rf=REFERRERS.filter(function(r){return r.name===l.refBy})[0];
  var rev=l.rev||(fv?850000:0),bamt=l.bclAmt||(fv?100000:0);
  var stat='<div class="card" id="stats" style="margin-top:8px"><div class="stats2">'+scard("BCL",bcl,isMine,l)+scard("BA",l.ba||null,isMine,l)+'<span class="ic" style="margin-top:14px"><svg viewBox="0 0 24 24" style="width:16px;height:16px"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></svg></span></div>'+
   '<div class="mini2"><span>Last contact<b>'+fdate(l.eng)+'</b></span><span>Revenue est.<b>'+(rev?fmt(rev).replace(".00",""):"—")+'</b></span>'+(fv?"":'<span>CLO<b>'+(l.clo?fmt(l.clo).replace(".00",""):"₱0")+'</b></span>')+'<span>BCL<b>'+(bamt?fmt(bamt).replace(".00",""):"₱0")+'</b></span><span>Blocker / action required<b>—</b></span></div></div>';
  var mid;
  if(isMine){
    mid='<div class="card" style="background:#f3f6f6"><div class="ctitle" style="font-size:12px;text-transform:none;letter-spacing:0">Tasks</div>'+(l.task&&!l.task.done?'<div class="task"><div class="t"><span class="pill">'+l.task.pr.toUpperCase()+'</span><span class="pill b">Call</span>Call Lead ID '+l.id+'<small>No connected contact yet<br>'+(l.task.due)+'</small></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn" data-soon>+ Add Reminder</button><button class="btn" data-soon>+ Log activity ⌄</button></div></div>':'<div style="display:flex;justify-content:space-between;align-items:center"><span class="sub" style="margin:0;font-size:12px">No tasks yet.</span><span style="display:flex;gap:6px"><button class="btn" data-soon>+ Add Reminder</button><button class="btn" data-soon>+ Log activity ⌄</button></span></div>')+'</div>';
  } else if(pending[l.id]){
    mid='<div class="banner"><div><b>Request pending approval</b><p>Your request for this lead was sent. You will be assigned once it is approved.</p></div><button class="btn" id="simappr">Sandbox: approve as Team Lead</button></div>';
  } else {
    mid='<div class="banner"><div><b>'+(un?"This lead is unassigned":"This lead is assigned to "+esc(l.owner))+'</b><p>Request this lead to have it '+(un?"assigned":"reassigned")+' to you once approved.</p></div><button class="btn dark" id="reqbtn">Request this lead</button></div>';
  }
  var tabs=["Company info","Engagement","Risk","Product usage","Operations","Referral opportunities"];
  var tb='<div class="ltabs">'+tabs.map(function(t){return '<span data-tab="'+t+'" class="'+(t===tab?"on":"")+'">'+t+'</span>'}).join("")+'</div>';
  var body;
  if(tab==="Company info"){
    var disb=l.disb||(l.status==="Utilized"?(l.entry||l.channel):"—");
    body='<div class="two"><div>'+
     '<div class="card"><div class="ctitle">Company information</div><div class="kv"><span>Lead ID</span><span>'+l.id+'</span><span>Owner</span><span>'+esc(owner)+'</span><span>Business Name</span><span>'+esc(l.name)+'</span><span>Risk Address</span><span>—</span><span>Current Address</span><span>—</span></div>'+
     '<div style="display:flex;justify-content:space-between;margin:14px 0 6px;font-size:11px;color:var(--mut)"><span>Business Contacts</span><span class="link" data-soon>+ Add contact</span></div>'+
     '<div style="background:#f7fafa;border-radius:8px;padding:9px 12px;display:flex;justify-content:space-between;align-items:flex-start"><div><b style="font-size:12px">'+esc(l.contact)+'</b><div class="sub" style="margin:2px 0 0">Applicant</div></div><span style="display:flex;gap:14px;font-size:10px"><span class="link" data-soon>View contact info</span><span data-soon style="cursor:pointer">Edit</span><span data-soon style="cursor:pointer;color:#b3243a;font-weight:600">Remove</span></span></div>'+
     '<div class="kv" style="margin-top:12px"><span>B2B / B2C</span><span>B2B</span><span>Sales Qualified?</span><span>Yes</span><span>Industry</span><span>—</span><span>No. of Employees</span><span>—</span><span>Connect Link</span><span style="color:#2742c9">Connect homepage ↗</span><span>Selling Signals</span><span>—</span><span>Buying Signals</span><span>—</span></div></div>'+
     '<div class="card"><div class="ctitle">Company briefing</div><div class="sub" style="font-size:11px">Generate an AI summary of what this company does, recent news about it, and any contact details findable online.</div><button class="btn" data-soon>Generate briefing</button></div>'+
     '<div class="card"><div class="ctitle">Channel information</div><div class="kv"><span>Channel at Entry</span><span>'+esc(l.entry||l.channel)+'</span><span>Channel Last Touch</span><span>'+esc(l.touch||"—")+'</span><span>Channel at Disbursement</span><span>'+esc(disb)+'</span></div></div>'+
     '</div><div>'+
     '<div class="card"><div class="ctitle">CLO information</div><div class="kv"><span>CLO Status</span><span>'+(l.clo?"Clo approved · Oct 22, 2026":"—")+'</span><span>CLO Amount</span><span>'+(l.clo?fmt(l.clo).replace(".00",""):"₱0")+'</span><span>Conversion Probability</span><span>—</span><span>AFS / ITR Revenue</span><span>—</span><span>BS Revenue</span><span>—</span></div></div>'+
     '<div class="card"><div class="ctitle">Related parties</div><div class="sub" style="font-size:10.5px">Related Parties</div><div style="background:#f7fafa;border-radius:6px;padding:8px 10px;font-size:10.5px;color:var(--mut)">ⓘ No confirmed related parties for this lead.</div><div class="sub" style="font-size:10.5px;margin-top:8px">Qualified Trading Partners</div><div style="background:#f7fafa;border-radius:6px;padding:8px 10px;font-size:10.5px;color:var(--mut)">ⓘ This lead has no Qualified Trading Partners.</div></div>'+
     '<div class="card"><div class="ctitle">Referrer information</div><div class="kv"><span>Name of Referrer</span><span>'+(rf?esc(rf.name):"—")+'</span><span>Lead ID of Referrer</span><span>—</span><span>Email of Referrer</span><span>'+(rf?rf.email:"—")+'</span><span>Contact Number</span><span>'+(rf?rf.phone:"—")+'</span><span>FC Employee Referral</span><span>'+(l.fcRef?esc(l.fcRef):"—")+'</span><span>Referral Channel</span><span>'+(rf?rf.type:"—")+'</span></div></div>'+
     '</div></div>';
  } else body='<div class="card"><div class="empty">'+tab+' (not part of this simulation yet).</div></div>';
  return head+stat+mid+tb+body;
}
function afterLead(root,id){
  var l=LEADS.filter(function(x){return x.id===id})[0];if(!l)return;
  root.querySelectorAll("[data-tab]").forEach(function(t){t.onclick=function(){S.ltab=t.dataset.tab;render()}});
  root.querySelectorAll("[data-soon]").forEach(function(b){b.onclick=function(){toast("Not part of this simulation")}});
  var rb=$("#reqbtn",root);if(rb)rb.onclick=function(){openRequest(id)};
  var sa=$("#simappr",root);if(sa)sa.onclick=function(){var rq=pending[id];l.owner="me";l.touch=rq.channel;if(rq.channel==="Referrals"&&rq.ref){l.refBy=rq.ref.k;l.fcRef=rq.fc&&rq.fc.k}delete pending[id];toast("Approved. The lead is now assigned to you.");ACQUI.emit("request-approved",id);render()};
  var closePops=function(){root.querySelectorAll(".pop").forEach(function(p){p.classList.remove("open")})};
  root.addEventListener("click",function(e){if(!e.target.closest(".pop")&&!e.target.closest("[data-edit]")&&!e.target.closest("#amdot"))closePops()});
  root.querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(e){
    e.stopPropagation();var k=b.dataset.edit,pop=$("#pop-"+k,root),was=pop.classList.contains("open");closePops();if(was)return;
    var opts=k==="BCL"?bclOpts(l):BA_OPTS;
    pop.innerHTML='<h6>SET '+k+' STATUS</h6>'+(opts.length?opts.map(function(o){return '<div class="po" data-set="'+o+'"><i></i>'+o+'</div>'}).join(""):'<div class="sub" style="margin:0;padding:6px 12px;max-width:230px">No change available now. Waiting for BVP review.</div>');
    pop.classList.add("open");
    pop.querySelectorAll("[data-set]").forEach(function(o){o.onclick=function(){
      var v=o.dataset.set,h={s:v,at:nowStamp(),by:ME};
      if(k==="BCL"){l.bclH=[h].concat(bclHist(l));l.risk=v}else{l.baH=[h].concat(baHist(l));l.ba=v}
      toast(k+" status set to "+v);ACQUI.emit("status-set",{kind:k,value:v,id:id});render()}});
  }});
  root.querySelectorAll("[data-bvp]").forEach(function(a){a.onclick=function(){
    var v=a.dataset.bvp;l.bclH=[{s:v,at:nowStamp(),by:"BVP"}].concat(bclHist(l));l.risk=v;toast("BVP set BCL status to "+v);ACQUI.emit("status-set",{kind:"BCL",value:v,id:id,by:"BVP"});render()}});
  root.querySelectorAll("[data-hist]").forEach(function(b){b.onclick=function(){
    ACQUI.emit("status-history",{kind:b.dataset.hist,id:id});
    var k=b.dataset.hist,rows=k==="BCL"?bclHist(l):baHist(l);
    $("#md").innerHTML='<h3>'+k+' Status history <button id="mx">×</button></h3><table class="ht"><thead><tr><th>Status</th><th>Changed</th><th>Changed by</th></tr></thead><tbody>'+
     (rows.length?rows.map(function(r){return '<tr><td>'+esc(r.s)+'</td><td>'+r.at+'</td><td>'+(r.by==="BVP"?"BVP":esc(r.by)+' <span class="idot">i</span>')+'</td></tr>'}).join(""):'<tr><td colspan="3" class="sub">No history yet.</td></tr>')+
     '</tbody></table><div class="foot"><button class="btn" id="mclose">Close</button></div>';
    $("#md").classList.add("wide");$("#ov").style.display="flex";$("#mx").onclick=closeModal;$("#mclose").onclick=closeModal}});
  var lh=$("[data-lh]",root);if(lh)lh.onclick=function(){ACQUI.emit("lead-status-history",id);
    var h=leadHist(l);
    $("#sp").innerHTML='<button class="x" onclick="closeSP()">×</button><div class="t">LEAD STATUS HISTORY</div><div class="n">'+esc(l.name)+'</div><div class="sub" style="margin:0 0 6px">'+h.length+' entries · most recent first</div>'+h.map(function(r){return '<div class="row2"><span class="c">'+r.s+'</span><em>'+r.d+'</em></div>'}).join("");
    $("#sp").classList.add("open")};
  var am=$("#amdot",root);if(am)am.onclick=function(e){e.stopPropagation();var pop=$("#ampop",root),was=pop.classList.contains("open");closePops();if(was)return;
    pop.innerHTML='<h6>ACCOUNT MANAGER</h6><div class="kv" style="padding:0 12px"><span>Name</span><span>'+esc(l.owner==="me"?ME:l.owner)+'</span><span>User ID</span><span>1368</span><span>Team</span><span>Region Team 2</span><span>Email</span><span>hanna.test@example.com</span><span>Start date</span><span>Oct 5, 2026</span></div>';
    pop.classList.add("open")};
}
function closeSP(){$("#sp").classList.remove("open")}

/* shared: Referral Channel + Referrer + FC Referrer block */
function sugList(inp,out,items,onPick){
  var draw=function(){var q=inp.value.toLowerCase();var m=items().filter(function(x){return (x.k+" "+x.s).toLowerCase().indexOf(q)>=0});
    out.innerHTML=m.length?'<div class="sug">'+m.map(function(x,i){return '<div data-i="'+i+'">'+esc(x.k)+(x.s?'<small>'+esc(x.s)+'</small>':"")+'</div>'}).join("")+'</div>':'<div class="sug"><div>No match</div></div>';
    out.querySelectorAll("[data-i]").forEach(function(d){d.onclick=function(){var x=m[+d.dataset.i];inp.value=x.k;out.innerHTML="";onPick(x)}})};
  inp.onfocus=draw;inp.oninput=function(){onPick(null);draw()};
}
function refBlock(box,st,note){
  st.ref=st.fc=st.rc=null;
  box.innerHTML=(note==="Create"?'<div class="sub" style="margin:6px 0 0;font-size:9px">Required because Channel is Referral</div>':"")+'<label>Referral Channel <i>*</i></label><select id="r_rc"><option value="">Select a referral channel</option>'+REFCH.map(function(c){return '<option>'+c+'</option>'}).join("")+'</select><div id="r_rr"></div>';
  $("#r_rc").onchange=function(){
    st.ref=st.fc=null;st.rc=this.value||null;
    if(!this.value){$("#r_rr").innerHTML="";return}
    var type=this.value;
    $("#r_rr").innerHTML='<label>Referrer <i>*</i></label><input type="text" id="r_rs" placeholder="Search by name, email or phone" autocomplete="off"><div id="r_rl"></div><div class="sub" style="margin:3px 0 0;font-size:9px">You can only see referrers attributed to you.</div>'+
      '<label>FC Referrer <i>*</i></label><input type="text" id="r_fs" placeholder="Search by email, first name, or last name..." autocomplete="off"><div id="r_fl"></div>';
    sugList($("#r_rs"),$("#r_rl"),function(){return REFERRERS.filter(function(r){return r.type===type}).map(function(r){return {k:r.name,s:r.email+" · "+r.phone}})},function(x){st.ref=x});
    sugList($("#r_fs"),$("#r_fl"),function(){return FC_STAFF.map(function(s){return {k:s,s:""}})},function(x){st.fc=x});
  };
}

/* Create Lead modal */
function openCreate(){
  var st={},md=$("#md"),dirty=false;
  md.innerHTML='<h3>Create Lead <button id="mx">×</button></h3>'+
   '<div class="ctitle" style="color:var(--mut)">Lead source</div><label>Channel <i>*</i></label><select id="c_ch"><option value="">Select a channel</option><option>Referral</option><option>KAM Self Generated</option><option>Support Generated Leads</option></select><div id="r_ref"></div>'+
   '<div class="ctitle" style="color:var(--mut);margin-top:12px">Business details</div><label>Company Name <i>*</i></label><input type="text" id="c_co">'+
   '<label>Company Type <i>*</i></label><select id="c_ty"><option value="">Select a company type</option><option>Corporation</option><option>Sole Proprietorship</option><option>Partnership</option></select>'+
   '<label>Registration Number <i>*</i></label><input type="text" id="c_rn">'+
   '<div class="ctitle" style="color:var(--mut);margin-top:12px">Contact person</div><label>First Name <i>*</i></label><input type="text" id="c_fn"><label>Middle Name (Optional)</label><input type="text" id="c_mn"><label>Last Name <i>*</i></label><input type="text" id="c_ln">'+
   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><label>Email <i>*</i></label><input type="text" id="c_em"></div><div><label>Phone <i>*</i></label><input type="text" id="c_ph"></div></div>'+
   '<div class="foot" id="c_foot"><button class="btn" id="c_cancel">Cancel</button><button class="btn dark" id="c_go">Create Lead</button></div>';
  $("#ov").style.display="flex";
  md.addEventListener("input",function(){dirty=true});
  var close=function(){
    if(!dirty){closeModal();return}
    $("#c_foot").innerHTML='<div style="width:100%;text-align:right"><div class="sub" style="margin:0 0 6px">You have unsaved changes. Discard them and close?</div><button class="btn" id="c_keep">Keep editing</button> <button class="btn" id="c_dis" style="background:#8a0f2f;color:#fff;border-color:#8a0f2f">Discard</button></div>';
    $("#c_dis").onclick=closeModal;
    $("#c_keep").onclick=function(){$("#c_foot").innerHTML='<button class="btn" id="c_cancel">Cancel</button><button class="btn dark" id="c_go">Create Lead</button>';wire()};
  };
  $("#mx").onclick=close;
  $("#c_ch").onchange=function(){dirty=true;var b=$("#r_ref");if(this.value==="Referral")refBlock(b,st,"Create");else{b.innerHTML="";st.rc=st.ref=st.fc=null}};
  function wire(){
    $("#c_cancel").onclick=close;
    $("#c_go").onclick=function(){
      var v=function(i){return $(i).value.trim()},need=[];
      if(!v("#c_ch"))need.push("Channel");
      if(v("#c_ch")==="Referral"){if(!st.rc)need.push("Referral Channel");if(!st.ref)need.push("Referrer");if(!st.fc)need.push("FC Referrer")}
      [["#c_co","Company Name"],["#c_ty","Company Type"],["#c_rn","Registration Number"],["#c_fn","First Name"],["#c_ln","Last Name"],["#c_em","Email"],["#c_ph","Phone"]].forEach(function(f){if(!v(f[0]))need.push(f[1])});
      if(need.length){toast("Please fill in: "+need.join(", "));return}
      var ch=v("#c_ch");
      var chn=ch==="Referral"?"Referrals":ch==="KAM Self Generated"?"KAM - Self Generated Leads":ch;
      LEADS.unshift({id:String(371930+LEADS.length),name:v("#c_co"),status:"For Engagement",risk:"-",channel:chn,entry:chn,refBy:ch==="Referral"?st.ref.k:undefined,fcRef:ch==="Referral"?st.fc.k:undefined,clo:0,eng:"2026-10-26",owner:"me",contact:v("#c_fn")+" "+v("#c_ln")});
      closeModal();toast("Lead created");render();
    };
  }
  wire();
}

/* Request this lead modal */
function openRequest(id){
  var st={ref:null,fc:null};
  var md=$("#md");
  md.innerHTML='<h3>Request this lead <button id="mx">×</button></h3><div class="idot">This sends a reassignment request for approval. If approved, the lead will be assigned to you.</div>'+
   '<label>Approver <i>*</i></label><select id="r_app"><option value="">Select an approver</option>'+TEAM_LEADS.map(function(a){return '<option>'+a+'</option>'}).join("")+'</select>'+
   '<label>Channel (Last Touch) <i>*</i></label><select id="r_ch"><option value="">Select a channel</option>'+CHANNELS.map(function(c){return '<option>'+c+'</option>'}).join("")+'</select>'+
   '<div id="r_ref"></div><label>Notes</label><textarea id="r_n" placeholder="Add any notes (optional)..."></textarea>'+
   '<div class="foot"><button class="btn dark" id="r_go">Send Request</button></div>';
  $("#ov").style.display="flex";
  $("#mx").onclick=closeModal;
  $("#r_ch").onchange=function(){
    var box=$("#r_ref");
    if(this.value!=="Referrals"){box.innerHTML="";st.ref=st.fc=null;return}
    refBlock(box,st,"Referral Channel");
  };
  $("#r_go").onclick=function(){
    var need=[];
    if(!$("#r_app").value)need.push("Approver");if(!$("#r_ch").value)need.push("Channel");
    if($("#r_ch").value==="Referrals"){if(!st.rc)need.push("Referral Channel");if(!st.ref)need.push("Referrer");if(!st.fc)need.push("FC Referrer")}
    if(need.length){toast("Please fill in: "+need.join(", "));return}
    pending[id]={channel:$("#r_ch").value,ref:st.ref,fc:st.fc,rc:st.rc,approver:$("#r_app").value};closeModal();toast("Request sent for approval");ACQUI.emit("request-sent",id);render();
  };
}
function closeModal(){$("#ov").style.display="none";$("#md").classList.remove("wide")}
$("#ov").onclick=function(e){if(e.target.id==="ov")closeModal()};


/* ===== router ===== */
function render(){
  var h=location.hash||"#/home",m=$("#main"),r=h.split("/");
  var route=r[1]||"home";
  document.querySelectorAll("#side .nv").forEach(function(b){b.classList.toggle("on",b.dataset.r===(route==="lead"?"leads":route==="referrer"?"referrers":route))});
  window.scrollTo(0,0);
  if(route==="leads"){m.innerHTML=pageLeads();afterLeads(m)}
  else if(route==="originations"){m.innerHTML=pageOrig();afterOrig(m)}
  else if(route==="referrers"){m.innerHTML=pageRef();afterRef(m)}
  else if(route==="open-bcls"){m.innerHTML=pageBcl();afterBcl(m)}
  else if(route==="lead"){m.innerHTML=pageLead(r[2]);afterLead(m,r[2])}
  else if(route==="referrer"){var rn=decodeURIComponent(r[2]||"");m.innerHTML=pageReferrer(rn);afterReferrer(m)}
  else{m.innerHTML=pageHome();afterHome(m)}
  closeSP();
  ACQUI.emit("render",{hash:h,route:route,id:r[2]});
}
var keepTab=null;
window.addEventListener("hashchange",function(){if((location.hash||"").indexOf("#/lead/")===0)S.ltab="Company info";render()});

/* side nav (toggle: icons only / icons + labels) */
function drawSide(){
  var open=document.body.classList.contains("sb-open");
  $("#side").innerHTML='<div class="hd">'+(open?'<b>MENU</b>':'')+'<button id="sbt" title="Toggle menu">'+(open?"‹":"›")+'</button></div>'+
   NAV.map(function(n){return '<button class="nv" data-r="'+n[2].slice(2)+'" data-tip="'+n[1]+'">'+ICONS[n[0]]+'<span class="l">'+n[1]+'</span></button>'}).join("");
  $("#sbt").onclick=function(){document.body.classList.toggle("sb-open");drawSide();render();ACQUI.emit("menu-toggle",document.body.classList.contains("sb-open"))};
  $("#side").querySelectorAll(".nv").forEach(function(b){b.onclick=function(){location.hash="#/"+b.dataset.r}});
}
drawSide();

/* global search */
var q=$("#q"),res=$("#sres"),qx=$("#qx");
function doSearch(){
  var v=q.value.trim().toLowerCase();qx.style.display=v?"block":"none";
  if(!v){res.style.display="none";return}
  var m=LEADS.filter(function(l){return l.name.toLowerCase().indexOf(v)>=0||l.id.indexOf(v)>=0}).slice(0,5);
  res.innerHTML=m.length?m.map(function(l){return '<div class="sr" data-id="'+l.id+'"><div><b>'+esc(l.name)+'</b><small>Lead '+l.id+'</small></div><span class="badge '+(l.owner==="me"?"id":"")+'">'+(l.owner==="none"?"Unassigned":l.owner==="me"?"Yours":"Assigned")+' · Open</span></div>'}).join(""):'<div class="sr"><small>No leads found</small></div>';
  res.style.display="block";
  res.querySelectorAll("[data-id]").forEach(function(d){d.onclick=function(){q.value="";doSearch();ACQUI.emit("search-pick",d.dataset.id);location.hash="#/lead/"+d.dataset.id}});
}
q.oninput=doSearch;qx.onclick=function(){q.value="";doSearch()};
document.addEventListener("click",function(e){if(!e.target.closest("#sbox"))res.style.display="none"});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeSP();closeModal()}});
/* always start on Home (add ?keep=1 to the URL to stay on the page in the address bar) */
if(!/[?&]keep=1/.test(location.search))history.replaceState(null,"",location.pathname+location.search+"#/home");
render();

/* Exit bubble for the tour and the practice check: leaving resets everything (progress here is not saved) */
(function(){
  var mode=document.body.getAttribute("data-mode");
  if(mode!=="tour"&&mode!=="exam")return;
  var b=document.createElement("div");b.id="exitbub";
  b.innerHTML='<span class="live"></span><span>You are currently in training</span><button id="exitbtn">Exit</button>';
  document.body.appendChild(b);
  var dlg=document.createElement("div");dlg.id="exitdlg";
  dlg.innerHTML='<div class="box"><h3>Exit training?</h3><p>If you exit now, your progress in this '+(mode==="tour"?"tour":"practice check")+' will be reset and you will have to start again.</p><div class="r"><button class="btn" id="exstay">Keep going</button><button class="btn dark" id="exleave">Exit</button></div></div>';
  document.body.appendChild(dlg);
  $("#exitbtn").onclick=function(){dlg.style.display="flex"};
  $("#exstay").onclick=function(){dlg.style.display="none"};
  $("#exleave").onclick=function(){location.href="../dashboard.html"};
})();
