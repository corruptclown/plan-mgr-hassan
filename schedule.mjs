export const routine = {
  1: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Jiu-jitsu", time: "5:30-7 pm", kind: "fixed", category: "training", theme: "grappling", note: "Straight from work" },
    { title: "Boxing", time: "7-8:15 pm", kind: "fixed", category: "training", theme: "boxing" },
    { title: "Read", time: "15 min", kind: "flexible", category: "life", theme: "life", note: "Time TBD" }
  ],
  2: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Lift with Hamoudi", time: "After work / ~1 hour", kind: "flexible", category: "training" },
    { title: "Arabic Reading", time: "Time TBD", kind: "flexible", category: "life", theme: "life" }
  ],
  3: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Jiu-jitsu", time: "5:30-7 pm", kind: "fixed", category: "training", theme: "grappling", note: "Straight from work" },
    { title: "Boxing", time: "7-8:15 pm", kind: "fixed", category: "training", theme: "boxing" }
  ],
  4: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Lift with Hamoudi", time: "After work / ~1 hour", kind: "flexible", category: "training" },
    { title: "Read", time: "15 min", kind: "flexible", category: "life", theme: "life", note: "Time TBD" }
  ],
  5: [
    { title: "Work", time: "9 am-5 pm", kind: "fixed", category: "work" },
    { title: "Advanced boxing", time: "8:15-9:30 pm", kind: "fixed", category: "training", theme: "boxing" }
  ],
  6: [
    { title: "Jiu-jitsu", time: "11 am-1:30 pm", kind: "fixed", category: "training", theme: "grappling" },
    { title: "Read", time: "15 min", kind: "flexible", category: "life", theme: "life", note: "Time TBD" }
  ],
  0: [
    { title: "Lift with Hamoudi", time: "Time TBD", kind: "flexible", category: "training" },
    { title: "Arabic Reading", time: "Time TBD", kind: "flexible", category: "life", theme: "life" }
  ]
};

// Add dated plans here. A non-null override replaces that day's entire routine.
export const weeks = [
  {
    title: "The week ahead.",
    range: "Nov 2 - 8, 2026",
    focus: "Keep the training rhythm. Let the rest of the week breathe.",
    days: [
      { date: "2026-11-02", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      {
        date: "2026-11-03",
        focus: "Work + lift + Arabic Reading + Ali",
        room: "Lifting time flexible. Hang out with Ali at 7 pm.",
        events: [
          { title: "Hang out with Ali", time: "7 pm", kind: "fixed", category: "life", theme: "life" }
        ]
      },
      {
        date: "2026-11-04",
        focus: "Physio + work + double session",
        room: "Physio at 7 am. Evening mostly committed.",
        override: [
          { title: "Physio with Chris", time: "7 am", kind: "fixed", category: "life", theme: "life" },
          ...routine[3]
        ],
        events: []
      },
      { date: "2026-11-05", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-11-06", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-11-07", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-11-08", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: [
      { category: "Food", title: "Easy dinners for Mon + Wed", note: "Plan ahead for late training nights" },
      { category: "Errands", title: "Pick one errand to fit in", note: "Add your actual errand when ready" },
      { category: "Chores", title: "Laundry + a small home reset", note: "Choose a lighter day" },
      { category: "Recovery", title: "Leave some time unclaimed", note: "Rest belongs in the plan, too" }
    ]
  },
  {
    title: "The week ahead.",
    range: "Nov 9 - 15, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-11-09", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-10", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      {
        date: "2026-11-11",
        focus: "Physio + work + double session",
        room: "Physio at 7 am. Evening mostly committed.",
        override: [
          { title: "Physio with Chris", time: "7 am", kind: "fixed", category: "life", theme: "life" },
          ...routine[3]
        ],
        events: []
      },
      { date: "2026-11-12", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-11-13", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-11-14", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-11-15", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Nov 16 - 22, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-11-16", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-17", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      {
        date: "2026-11-18",
        focus: "Physio + work + double session",
        room: "Physio at 7 am. Evening mostly committed.",
        override: [
          { title: "Physio with Chris", time: "7 am", kind: "fixed", category: "life", theme: "life" },
          ...routine[3]
        ],
        events: []
      },
      { date: "2026-11-19", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-11-20", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-11-21", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-11-22", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Nov 23 - 29, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-11-23", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-24", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-11-25", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-11-26", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-11-27", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-11-28", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-11-29", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Nov 30 - Dec 6, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-11-30", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-01", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-02", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-03", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-04", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-12-05", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-12-06", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Dec 7 - 13, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-12-07", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-08", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-09", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-10", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-11", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-12-12", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-12-13", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Dec 14 - 20, 2026",
    focus: "Keep the routine. Make room for what's next.",
    days: [
      { date: "2026-12-14", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-15", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-16", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-17", focus: "Work + lift with Hamoudi", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-18", focus: "Work + boxing", room: "Room before boxing, allowing for dinner + travel.", events: [] },
      { date: "2026-12-19", focus: "Jiu-jitsu", room: "No other plans added yet.", events: [] },
      { date: "2026-12-20", focus: "Lift with Hamoudi + Arabic Reading", room: "Lift time TBD.", events: [] }
    ],
    suggestions: []
  },
  {
    title: "The week ahead.",
    range: "Dec 21 - 24, 2026",
    focus: "The final days before travel.",
    days: [
      { date: "2026-12-21", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      { date: "2026-12-22", focus: "Work + lift with Hamoudi + Arabic Reading", room: "Lift time flexible. Some evening room.", events: [] },
      { date: "2026-12-23", focus: "Work + double session", room: "Evening mostly committed.", events: [] },
      {
        date: "2026-12-24",
        focus: "Go to Lebanon!!",
        room: "Travel day.",
        override: [],
        events: [
          { title: "Go to Lebanon!!", time: "Time TBD", kind: "fixed", category: "life", theme: "life" }
        ]
      }
    ],
    suggestions: []
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
