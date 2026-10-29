#!/usr/bin/env python3
"""Builds self-contained HTML files (everything inlined, no server, no other files needed) for sharing, in sims/acqui-standalone/.
   Run again after changing anything in sims/acqui/ or the page shells."""
import os, re
root = os.path.dirname(os.path.abspath(__file__)); sims = os.path.dirname(root)
read = lambda p: open(os.path.join(root, p)).read()
css, app = read("app.css"), read("app.js")
out_dir = os.path.join(sims, "acqui-standalone"); os.makedirs(out_dir, exist_ok=True)
PAGES = [  # (page shell in sims/, output name, title)
    ("acqui-tour.html",             "acqui-tour.html",                "Acqui Service Tour"),
    ("acqui-tour-exam.html",        "acqui-practice-check.html",      "Acqui Service Practice Check"),
    ("acqui-reassign-lecture.html", "acqui-reassign-lecture.html",    "Acqui Service Lecture: Lead Reassignment"),
    ("acqui-create-lecture.html",   "acqui-create-lecture.html",      "Acqui Service Lecture: Creating a New Lead"),
    ("acqui-reassign-exam.html",    "acqui-reassign-practice.html",   "Acqui Service Practice Check: Lead Enrollment and Reassignment"),
]
for shell, outname, title in PAGES:
    h = open(os.path.join(sims, shell)).read()
    h = re.sub(r"<title>.*?</title>", "<title>%s</title>" % title, h, count=1)
    h = h.replace('<link rel="stylesheet" href="acqui/app.css">', "<style>\n%s</style>" % css)
    h = h.replace('<script src="../shared/lms.js"></script>\n', "")
    h = h.replace('<script src="acqui/app.js"></script>', "<script>window.ACQUI_STANDALONE=true;</script>\n<script>\n%s</script>" % app)
    h = re.sub(r'<script src="acqui/([\w-]+)\.js"></script>', lambda m: "<script>\n%s</script>" % read(m.group(1) + ".js"), h)
    assert not re.search(r"<script[^>]*\ssrc=|<link[^>]*stylesheet", h), "leftover external file reference in " + shell
    open(os.path.join(out_dir, outname), "w").write(h)
    print("wrote", outname, round(len(h) / 1024), "KB")
