export const routine = {
  1: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Jiu-jitsu", time: "5:30-7 pm", kind: "fixed", category: "training", theme: "grappling", note: "Straight from work" },
    { title: "Boxing", time: "7-8:15 pm", kind: "fixed", category: "training", theme: "boxing" }
  ],
  2: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Gym", time: "After work / ~1 hour", kind: "flexible", category: "training" }
  ],
  3: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Jiu-jitsu", time: "5:30-7 pm", kind: "fixed", category: "training", theme: "grappling", note: "Straight from work" },
    { title: "Boxing", time: "7-8:15 pm", kind: "fixed", category: "training", theme: "boxing" }
  ],
  4: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Gym", time: "After work / ~1 hour", kind: "flexible", category: "training" }
  ],
  5: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Advanced boxing", time: "8:15-9:30 pm", kind: "fixed", category: "training", theme: "boxing" }
  ]
};

// Add dated plans here. A non-null override replaces that day's entire routine.
export const weeks = [
  {
    title: "The opening weekend.",
    range: "Oct 31 - Nov 1, 2026",
    focus: "Training + family. Start with what's already on your plate.",
    days: [
      {
        date: "2026-10-31",
        focus: "Training + cousins",
        room: "Morning before class. Later plans still taking shape.",
        events: [
          { title: "Jiu-jitsu", time: "11:30 am-1 pm", kind: "fixed", category: "training", theme: "grappling" },
          { title: "Movie with cousins", time: "Be there by 2 pm", kind: "fixed", category: "life", note: "End time not set" },
          { title: "Trick-or-treating with cousins", time: "Time TBD", kind: "tentative", category: "life" }
        ]
      },
      {
        date: "2026-11-01",
        focus: "Lift + brother",
        room: "No other plans added. Pick a lift time together.",
        events: [
          { title: "Lift with brother", time: "Time TBD", kind: "flexible", category: "training" }
        ]
      }
    ],
    suggestions: [
      { category: "Food", title: "Check groceries for the workweek", note: "Optional / not scheduled" },
      { category: "Reset", title: "Laundry + training gear", note: "Optional / not scheduled" }
    ]
  },
  {
    title: "The week ahead.",
    range: "Nov 2 - 8, 2026",
    focus: "Keep the training rhythm. Let the rest of the week breathe.",
    days: [
      { date: "2026-11-02", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-03", focus: "Work + lift", room: "Gym time flexible. Some evening room.", events: [] },
      { date: "2026-11-04", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-05", focus: "Work + lift", room: "Gym time flexible. Some evening room.", events: [] },
      { date: "2026-11-06", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-11-07", focus: "Not planned yet", room: "No commitments added yet.", events: [] },
      { date: "2026-11-08", focus: "Not planned yet", room: "No commitments added yet.", events: [] }
    ],
    suggestions: [
      { category: "Food", title: "Easy dinners for Mon + Wed", note: "Plan ahead for late training nights" },
      { category: "Errands", title: "Pick one errand to fit in", note: "Add your actual errand when ready" },
      { category: "Chores", title: "Laundry + a small home reset", note: "Choose a lighter day" },
      { category: "Recovery", title: "Leave some time unclaimed", note: "Rest belongs in the plan, too" }
    ]
  }
];

export function localDate(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error(`Invalid schedule date: ${dateString}`);
  }
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error(`Invalid schedule date: ${dateString}`);
  }
  return date;
}

export function eventsForDay(day) {
  const baseline = day.override ?? routine[localDate(day.date).getDay()] ?? [];
  return [...baseline, ...day.events];
}

export function initialWeekIndex(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const current = weeks.findIndex(week => today >= localDate(week.days[0].date)
    && today <= localDate(week.days.at(-1).date));
  if (current >= 0) return current;
  const upcoming = weeks.findIndex(week => localDate(week.days[0].date) > today);
  return upcoming >= 0 ? upcoming : weeks.length - 1;
}

export function validateSchedule() {
  const dates = new Set();
  for (const week of weeks) {
    if (!week.days.length) throw new Error("A schedule week must contain days.");
    for (const day of week.days) {
      localDate(day.date);
      if (dates.has(day.date)) throw new Error(`Duplicate schedule date: ${day.date}`);
      dates.add(day.date);
      for (const event of eventsForDay(day)) {
        if (!event.title || !event.time || !["fixed", "flexible", "tentative"].includes(event.kind)
          || !["work", "training", "life"].includes(event.category)
          || (event.theme !== undefined && !["work", "training", "boxing", "grappling", "life"].includes(event.theme))) {
          throw new Error(`Invalid event on ${day.date}`);
        }
      }
    }
  }
}
