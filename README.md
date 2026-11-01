# Hassan // The week ahead

A read-only, dark weekly schedule with teal accents. No database, login, dependencies, or on-page editor.

## Preview

With Node.js installed, run `npm start` and open http://127.0.0.1:4173.
Run `npm test` to check dates, recurring commitments, exceptions, and opening plans.

## Weekly updates with Copilot

Open this folder in VS Code and give Copilot your upcoming week's changes. For example:

> Add the week of November 9, 2026, Monday through Sunday. Keep my usual work and training. Add dinner with my brother on Tuesday, time TBD. Friday boxing is cancelled. Add a grocery run to the undated suggestions. Preserve previous weeks.

Copilot should edit [schedule.mjs](./schedule.mjs):

- `routine`: recurring work/training indexed by weekday (Monday = 1, Sunday = 0).
- `weeks`: saved weeks, in chronological order. Each full week has seven dated days, Monday-Sunday.
- `events`: additional commitments for a date.
- `override`: optional replacement for that date's recurring commitments. Use `override: []` for a day off; include the remaining routine events when cancelling only one class.
- `focus` and `room`: short, factual labels. Update them when adding or cancelling events.
- `suggestions`: undated ideas for food, errands, chores, and recovery. Not confirmed tasks.

Use `YYYY-MM-DD` dates. Events have `title`, `time`, `kind` (`fixed`, `flexible`, or `tentative`), `category` (`work`, `training`, or `life`), and an optional `note`. Optional `theme` values (`work`, `training`, `boxing`, `grappling`, or `life`) choose the icon and accent color; without a theme the category is used. All themes use near-black fills with high-contrast colored outlines, icons, and titles. Don't invent times or imply an unscheduled day is fully available.

The initial view selects the current saved week using local dates, otherwise the next saved week, otherwise the latest saved week. Arrows browse saved weeks. Oct 31-Nov 1 is an opening weekend, not a change to the Monday-Sunday layout.

Late-November weekend work has no confirmed dates yet; it is a baseline reminder only. Add dated exceptions once confirmed. The Saturday class and Sunday lift in the opening weekend are one-off plans, not assumed weekly commitments.

## Publish on GitHub Pages

This repository deploys the static site from its root automatically when you push to `main`. No build step or Node.js runtime is needed to serve the site.

To enable deployment, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**. The first deployment runs on the next push to `main`; you can also start it from the **Actions** tab with **Run workflow**.

The site URL is shown in the successful **Deploy to GitHub Pages** workflow run. For this repository, it will normally be `https://corruptclown.github.io/plan-mgr-hassan/`.

The deployment includes [index.html](./index.html), [styles.css](./styles.css), [app.mjs](./app.mjs), and [schedule.mjs](./schedule.mjs). The local server, tests, and package file are development helpers. Review the saved schedule before publishing; the deployed content is public.

The visual identity uses original copy and system fonts: training-journal typography against neutral charcoal. Each scheduled task has a near-black fill with a distinct bright outline, icon, and title: blue briefcase for work, gold glove for boxing, purple uniform for jiu-jitsu, mint weights for lifting, and pink people for personal plans. Times and notes stay off-white; colored fills are avoided for readability. Times, notes, and commitment labels use at least 12px text. Tentative tasks have dashed outlines and a text label; labels remain readable without relying on color or icons. On mobile, compact single-column day cards align times alongside activities, remove fixed card heights, and use 44px week-navigation buttons. No artist lyrics, portraits, third-party embeds, or external font requests.
