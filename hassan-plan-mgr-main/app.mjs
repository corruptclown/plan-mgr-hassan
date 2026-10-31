import { weeks, localDate, eventsForDay, initialWeekIndex, validateSchedule } from "./schedule.mjs";

const dayName = new Intl.DateTimeFormat("en", { weekday: "short" });
const dateLabel = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
let selectedWeek = initialWeekIndex();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
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
  document.querySelector("#week-title").textContent = `${week.title} ${week.range}`;
  document.querySelector("#week-focus").textContent = week.focus;
  document.querySelector("#week-position").textContent = `${selectedWeek + 1} / ${weeks.length}`;
  document.querySelector("#previous-week").disabled = selectedWeek === 0;
  document.querySelector("#next-week").disabled = selectedWeek === weeks.length - 1;
  const calendar = document.querySelector("#calendar");
  calendar.classList.toggle("opening-weekend", week.days.length === 2);
  calendar.replaceChildren(...week.days.map(dayCard));
  document.querySelector("#weekly-list").replaceChildren(...week.suggestions.map(suggestion => {
    const item = element("li", "suggestion");
    const copy = element("div", "");
    copy.append(element("h3", "", suggestion.title), element("p", "muted", suggestion.note));
    item.append(element("span", "category-tag", suggestion.category), copy);
    return item;
  }));
}

try {
  validateSchedule();
  render();
  document.querySelector("#previous-week").addEventListener("click", () => {
    if (selectedWeek > 0) { selectedWeek -= 1; render(); }
  });
  document.querySelector("#next-week").addEventListener("click", () => {
    if (selectedWeek < weeks.length - 1) { selectedWeek += 1; render(); }
  });
} catch (error) {
  console.error("Unable to load Hassan's schedule.", error);
  const alert = document.querySelector("#load-error");
  alert.hidden = false;
  alert.textContent = "The schedule couldn't load. Please check the schedule data and reload.";
}
