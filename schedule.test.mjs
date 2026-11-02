import test from "node:test";
import assert from "node:assert/strict";
import { weeks, routine, eventsForDay, localDate, initialWeekIndex, validateSchedule } from "./schedule.mjs";

test("schedule data is valid and full weeks run Monday-Sunday", () => {
  assert.doesNotThrow(validateSchedule);
  assert.equal(weeks[0].days.length, 7);
  assert.deepEqual(weeks[0].days.map(day => localDate(day.date).getDay()), [1, 2, 3, 4, 5, 6, 0]);
});

test("recurring work and exact training commitments are preserved", () => {
  for (const weekday of [1, 2, 3, 4, 5]) {
    assert.equal(routine[weekday][0].time, "9 am-5 pm");
  }
  for (const weekday of [1, 3]) {
    assert.deepEqual(routine[weekday].slice(1, 3).map(event => event.time), ["5:30-7 pm", "7-8:15 pm"]);
  }
  for (const weekday of [2, 4]) {
    assert.equal(routine[weekday][1].title, "Lift with Hamoudi");
    assert.equal(routine[weekday][1].kind, "flexible");
    assert.equal(routine[weekday][1].time, "After work / ~1 hour");
  }
  assert.deepEqual(routine[1].at(-1), {
    title: "Read", time: "15 min", kind: "flexible", category: "life", theme: "life", note: "Time TBD"
  });
  assert.equal(routine[4].at(-1).title, "Read");
  assert.equal(routine[6].at(-1).title, "Read");
  assert.equal(routine[5][1].time, "8:15-9:30 pm");
});

test("training themes distinguish boxing and grappling without changing commitments", () => {
  for (const weekday of [1, 3]) {
    assert.equal(routine[weekday][1].theme, "grappling");
    assert.equal(routine[weekday][2].theme, "boxing");
  }
  assert.equal(routine[5][1].theme, "boxing");
  assert.equal(routine[1][1].theme, "grappling");
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
  assert.equal(eventsForDay({ date: "2026-11-02", events: [event] }).length, 5);
  assert.deepEqual(eventsForDay({ date: "2026-11-02", override: [], events: [event] }), [event]);
  assert.deepEqual(eventsForDay(weeks[0].days[5]).map(event => event.title), ["Jiu-jitsu", "Read"]);
  assert.deepEqual(eventsForDay(weeks[0].days[6]).map(event => event.title), ["Arabic Reading"]);
});

test("schedule covers November through the final pre-travel day", () => {
  const dates = weeks.flatMap(week => week.days.map(day => day.date));
  assert.equal(weeks.length, 8);
  assert.equal(dates.length, 53);
  const expectedDates = Array.from({ length: 53 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 10, 2 + index));
    return date.toISOString().slice(0, 10);
  });
  assert.deepEqual(dates, expectedDates);
  assert.equal(dates.includes("2026-10-31"), false);
  assert.equal(dates.includes("2026-11-01"), false);
  assert.equal(dates.includes("2026-12-25"), false);
  assert.deepEqual(weeks.map(week => week.days.length), [7, 7, 7, 7, 7, 7, 7, 4]);
  const travelDay = weeks.at(-1).days.at(-1);
  assert.equal(travelDay.date, "2026-12-24");
  assert.deepEqual(eventsForDay(travelDay).map(event => event.title), ["Go to Lebanon!!"]);
  assert.equal(eventsForDay(travelDay)[0].time, "Time TBD");
  assert.equal(Object.values(routine).flat().some(event => event.title === "Gym"), false);
  assert.equal(Object.values(routine).flat().some(event => event.title === "Arabic reading practice"), false);

  assert.equal(routine[6][0].title, "Jiu-jitsu");
  assert.equal(routine[6][0].time, "11 am-1:30 pm");
  for (const weekday of [0, 2]) {
    const practice = routine[weekday].find(event => event.title === "Arabic Reading");
    assert.equal(practice.time, "Time TBD");
  }
  for (const weekday of [1, 4, 6]) {
    const reading = routine[weekday].at(-1);
    assert.equal(reading.title, "Read");
    assert.equal(reading.time, "15 min");
    assert.equal(reading.note, "Time TBD");
  }

  const ali = eventsForDay(weeks[0].days[1]).find(event => event.title === "Hang out with Ali");
  assert.equal(ali.time, "7 pm");
  for (const date of ["2026-11-04", "2026-11-11", "2026-11-18"]) {
    const day = weeks.flatMap(week => week.days).find(entry => entry.date === date);
    const physio = eventsForDay(day).find(event => event.title === "Physio with Chris");
    assert.equal(physio.time, "7 am");
    assert.equal(eventsForDay(day)[0], physio);
  }
  for (const day of weeks.flatMap(week => week.days)) {
    const weekday = localDate(day.date).getDay();
    const titles = eventsForDay(day).map(event => event.title);
    if (weekday === 1 || (weekday === 4 && day.date !== "2026-12-24") || weekday === 6) {
      assert.equal(titles.at(-1), "Read");
    }
    if (weekday === 2) {
      assert.ok(titles.includes("Lift with Hamoudi"));
      assert.ok(titles.includes("Arabic Reading"));
    }
    if (weekday === 6) {
      assert.ok(titles.includes("Jiu-jitsu"));
      assert.equal(eventsForDay(day).find(event => event.title === "Jiu-jitsu").time, "11 am-1:30 pm");
    }
    if (weekday === 0) {
      assert.ok(titles.includes("Arabic Reading"));
    }
  }
});

test("week selection uses local dates and handles dates outside saved weeks", () => {
  assert.equal(initialWeekIndex(new Date(2026, 9, 31, 23, 59)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 1, 23, 59)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 2)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 9, 20)), 0);
  assert.equal(initialWeekIndex(new Date(2026, 10, 30)), 4);
  assert.equal(initialWeekIndex(new Date(2026, 11, 23)), 7);
  assert.equal(initialWeekIndex(new Date(2026, 11, 24)), 7);
  assert.equal(initialWeekIndex(new Date(2026, 11, 25)), 7);
  assert.throws(() => localDate("2026-02-30"), /Invalid schedule date/);
  assert.throws(() => localDate("tomorrow"), /Invalid schedule date/);
});
