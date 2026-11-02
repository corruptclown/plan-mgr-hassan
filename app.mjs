import { weeks, localDate, eventsForDay, initialWeekIndex, validateSchedule } from "./schedule.mjs";

const dayName = new Intl.DateTimeFormat("en", { weekday: "short" });
const dateLabel = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
const dayNumber = new Intl.DateTimeFormat("en", { day: "numeric" });
const monthName = new Intl.DateTimeFormat("en", { month: "long" });
let selectedWeek = initialWeekIndex();
let selectedView = "schedule";

const monthlyExpenses = [
  { name: "Gym", amount: 50 },
  { name: "Car insurance", amount: 165 },
  { name: "MMA Gym", amount: 180 },
  { name: "Gas", amount: 350 },
  { name: "Spending money", amount: 500 },
  { name: "Travel fund", amount: 500 },
  { name: "Rent", amount: 850 },
  { name: "TFSA / FHSA", amount: 1600 }
];
const monthlyExpenseTotal = monthlyExpenses.reduce((total, expense) => total + expense.amount, 0);

const monthGroups = new Map();
weeks.forEach((week, index) => {
  const date = localDate(week.days[0].date);
  const key = `${date.getFullYear()}-${date.getMonth()}`;
  if (!monthGroups.has(key)) {
    monthGroups.set(key, {
      label: monthName.format(date),
      year: date.getFullYear(),
      weekIndices: []
    });
  }
  monthGroups.get(key).weekIndices.push(index);
});

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function weekTabLabel(week) {
  const start = localDate(week.days[0].date);
  const end = localDate(week.days.at(-1).date);
  const endLabel = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    ? dayNumber.format(end)
    : dateLabel.format(end);
  return `${dateLabel.format(start)}–${endLabel}`;
}

function renderNavigation() {
  const monthNav = document.querySelector("#month-nav");
  monthNav.replaceChildren(...[...monthGroups].map(([key, group]) => {
    const button = element("button", "month-tab", group.label);
    button.type = "button";
    button.setAttribute("aria-label", `${group.label} ${group.year}`);
    button.setAttribute("aria-pressed", String(group.weekIndices.includes(selectedWeek)));
    button.addEventListener("click", () => {
      if (!group.weekIndices.includes(selectedWeek)) selectedWeek = group.weekIndices[0];
      render();
    });
    return button;
  }));

  const weekNav = document.querySelector("#week-nav");
  const currentMonth = localDate(weeks[selectedWeek].days[0].date);
  const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const indices = monthGroups.get(key).weekIndices;
  weekNav.hidden = selectedView !== "schedule";
  weekNav.replaceChildren(...indices.map(index => {
    const week = weeks[index];
    const button = element("button", "week-tab", weekTabLabel(week));
    button.type = "button";
    button.setAttribute("aria-label", week.range);
    button.setAttribute("aria-pressed", String(index === selectedWeek));
    button.addEventListener("click", () => {
      selectedWeek = index;
      render();
    });
    return button;
  }));
}

function taskIcon(theme) {
  const paths = {
    work: "M8 7V5h8v2M3 7h18v13H3zM3 12h18M10 12v3h4v-3",
    training: "M7 12h10M3 8h4v8H3zM17 8h4v8h-4zM1 10v4M23 10v4",
    boxing: "M8 15H6a3 3 0 0 1-3-3v-2a2 2 0 0 1 4 0V6a3 3 0 0 1 3-3h5a5 5 0 0 1 5 5v5a5 5 0 0 1-4 5M8 15v6h8v-6M8 18h8",
    grappling: "M8 3l4 6 4-6M5 4L2 9l4 3v9h12v-9l4-3-3-5M8 3l-3 1 7 11 7-11-3-1M6 15h12M10 15l-2 6M14 15l2 6",
    life: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-4M16 3a4 4 0 0 1 0 8"
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "task-icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", paths[theme]);
  svg.append(path);
  return svg;
}

function dayCard(day) {
  const date = localDate(day.date);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const card = element("article", `day-card${isToday ? " today" : ""}`);
  const heading = element("div", "day-heading");
  const time = element("time", "day-date", dateLabel.format(date));
  time.dateTime = day.date;
  heading.append(time);
  if (isToday) heading.append(element("span", "today-label", "Today"));
  card.append(heading, element("h3", "day-name", dayName.format(date)), element("p", "day-focus", day.focus));

  const list = element("ul", "events");
  for (const event of eventsForDay(day)) {
    const theme = event.theme ?? event.category;
    const item = element("li", `event ${event.kind} ${event.category} theme-${theme}`);
    const title = element("h4", "event-title");
    title.append(taskIcon(theme), element("span", "", event.title));
    item.append(element("span", "event-time", event.time), title);
    if (event.kind !== "fixed") item.append(element("span", "event-kind", event.kind));
    if (event.note) item.append(element("p", "event-note", event.note));
    list.append(item);
  }
  if (!list.children.length) {
    list.append(element("li", "empty-day", "Nothing scheduled yet."));
  }
  const room = element("div", "room");
  room.append(element("span", "room-label", "ROOM TO PLAN"), element("p", "", day.room));
  card.append(list, room);
  return card;
}

function render() {
  const week = weeks[selectedWeek];
  const isSchedule = selectedView === "schedule";
  document.querySelector("#view-title").textContent = isSchedule
    ? `${week.title} ${week.range}`
    : "Monthly expenses";
  const description = document.querySelector("#view-description");
  description.textContent = isSchedule ? week.focus : "";
  description.hidden = !isSchedule || !week.focus;
  document.querySelector("#schedule-view").setAttribute("aria-pressed", String(isSchedule));
  document.querySelector("#expenses-view").setAttribute("aria-pressed", String(!isSchedule));
  document.querySelector("#schedule-content").hidden = !isSchedule;
  document.querySelector("#expenses-panel").hidden = isSchedule;
  document.querySelector(".support").hidden = !isSchedule;
  renderNavigation();
  const calendar = document.querySelector("#calendar");
  calendar.replaceChildren(...week.days.map(dayCard));
  document.querySelector("#weekly-list").replaceChildren(...week.suggestions.map(suggestion => {
    const item = element("li", "suggestion");
    const copy = element("div", "");
    copy.append(element("h3", "", suggestion.title), element("p", "muted", suggestion.note));
    item.append(element("span", "category-tag", suggestion.category), copy);
    return item;
  }));
  const expenseItems = monthlyExpenses.map(expense => {
    const item = element("li", "monthly-expense");
    item.append(
      element("span", "expense-name", expense.name),
      element("span", "expense-amount", `$${expense.amount.toLocaleString("en-CA")}`)
    );
    return item;
  });
  const total = element("li", "monthly-expense expense-total");
  total.append(
    element("span", "expense-name", "Total"),
    element("span", "expense-amount", `$${monthlyExpenseTotal.toLocaleString("en-CA")}`)
  );
  document.querySelector("#expense-list").replaceChildren(...expenseItems, total);
}

try {
  validateSchedule();
  render();
  document.querySelector("#schedule-view").addEventListener("click", () => {
    selectedView = "schedule";
    render();
  });
  document.querySelector("#expenses-view").addEventListener("click", () => {
    selectedView = "expenses";
    render();
  });
} catch (error) {
  console.error("Unable to load Hassan's schedule.", error);
  const alert = document.querySelector("#load-error");
  alert.hidden = false;
  alert.textContent = "The schedule couldn't load. Please check the schedule data and reload.";
}
