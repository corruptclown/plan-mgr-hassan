import test from "node:test";
import assert from "node:assert/strict";
import { weeks, routine, eventsForDay, localDate, initialWeekIndex, validateSchedule } from "./schedule.mjs";

test("schedule data is valid and opening weekend is separate from Monday-Sunday", () => {
  assert.doesNotThrow(validateSchedule);
  assert.deepEqual(weeks[0].days.map(day => day.date), ["2026-10-31", "2026-11-01"]);
  assert.equal(weeks[1].days.length, 7);
  assert.deepEqual(weeks[1].days.map(day => localDate(day.date).getDay()), [1, 2, 3, 4, 5, 6, 0]);
});

test("recurring work and exact training commitments are preserved", () => {
  for (const weekday of [1, 2, 3, 4, 5]) {
    assert.equal(routine[weekday][0].time, "9 am-5 pm");
  }
  for (const weekday of [1, 3]) {
    assert.deepEqual(routine[weekday].slice(1).map(event => event.time), ["5:30-7 pm", "7-8:15 pm"]);
  }
  for (const weekday of [2, 4]) {
    assert.equal(routine[weekday][1].kind, "flexible");
    assert.equal(routine[weekday][1].time, "After work / ~1 hour");
  }
  assert.equal(routine[5][1].time, "8:15-9:30 pm");
});

test("opening plans don't imply end times or certainty that wasn't provided", () => {
  const saturday = eventsForDay(weeks[0].days[0]);
  assert.equal(saturday.length, 3);
  assert.equal(saturday[0].time, "11:30 am-1 pm");
  assert.equal(saturday[1].time, "Be there by 2 pm");
  assert.equal(saturday[2].kind, "tentative");
  const sunday = eventsForDay(weeks[0].days[1]);
  assert.equal(sunday[0].title, "Lift with brother");
  assert.equal(sunday[0].kind, "flexible");
});

test("training themes distinguish boxing and grappling without changing commitments", () => {
  for (const weekday of [1, 3]) {
    assert.equal(routine[weekday][1].theme, "grappling");
    assert.equal(routine[weekday][2].theme, "boxing");
  }
  assert.equal(routine[5][1].theme, "boxing");
  assert.equal(weeks[0].days[0].events[0].theme, "grappling");
  const event = routine[2][1];
  event.theme = "invalid";
  try {
    assert.throws(validateSchedule, /Invalid event/);
  } finally {
    delete event.theme;
  }
  assert.doesNotThrow(validateSchedule);
});

test("new dated plans append, explicit overrides can remove recurring commitments", () => {
  const event = { title: "Dinner", time: "Time TBD", kind: "flexible", category: "life" };
  assert.equal(eventsForDay({ date: "2026-11-02", events: [event] }).length, 4);
  assert.deepEqual(eventsForDay({ date: "2026-11-02", override: [], events: [event] }), [event]);
  assert.equal(eventsForDay(weeks[1].days[5]).length, 0);
  assert.equal(eventsForDay(weeks[1].days[6]).length, 0);
});

test("week selection uses local dates and handles dates outside saved weeks", () => {
  assert.equal(initialWeekIndex(new Date(2026, 9, 31, 23, 59)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 1, 23, 59)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 2)), 1);
  assert.equal(initialWeekIndex(new Date(2026, 9, 20)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 30)), 1);
  assert.throws(() => localDate("2026-02-30"), /Invalid schedule date/);
  assert.throws(() => localDate("tomorrow"), /Invalid schedule date/);
});
