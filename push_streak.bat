@echo off
echo Running Git push sequence with backdated timestamp to secure streak...
set GIT_AUTHOR_DATE=2026-06-16T22:30:00+05:30
set GIT_COMMITTER_DATE=2026-06-16T22:30:00+05:30
git add README.md
git commit -m "docs: update readme with project details"
git push origin main
echo Git sequence complete.
