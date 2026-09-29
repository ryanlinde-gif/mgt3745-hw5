// evals/worker.test.js
// The code eval. Run with:   API=https://mgt3745-hw4.<you>.workers.dev npm test
// Each test names the EARS row it checks. Add at least one for your new feature.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const API = process.env.API;
if (!API) throw new Error("Set API to your deployed Worker URL: API=https://... npm test");

// Rows created by these tests, removed when the run finishes. Without this the
// parent summary in EVALS E19 counts eval rows as real coaches, which is how
// "eval-coach-1790717496737" ended up in a screenshot.
const created = [];
after(async () => {
  for (const id of created) {
    await fetch(`${API}/entries/${id}`, { method: "DELETE" });
  }
});

async function createEntry(fields) {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (res.status === 201) {
    const list = await (await fetch(API + "/entries")).json();
    const row = list.find(e => e.coachName === fields.coachName);
    if (row) created.push(row.id);
  }
  return res;
}

test("EARS: THE SYSTEM SHALL return all entries in creation order (GET /entries is 200 + array)", async () => {
  const res = await fetch(API + "/entries");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  for (let i = 1; i < body.length; i++) assert.ok(body[i].id > body[i - 1].id, "ids ascending");
});

test("EARS: IF the entry text is missing, THEN THE SYSTEM SHALL reject it (POST {} is 400)", async () => {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(res.status, 400);
  assert.ok((await res.text()).length > 0, "400 carries a reason");
});

// Adapted from the starter, which posted {text} against the template's
// single-column schema. This project's entry is four fields (ADR-002), so the
// starter version returned 400 rather than 201. The test was wrong, not the Worker.
test("EARS E10: WHEN a valid entry is submitted, THE SYSTEM SHALL store it (POST then GET shows it)", async () => {
  const marker = "eval-coach-" + Date.now();
  const post = await createEntry({
    coachName: marker,
    school: "Eval College",
    contactDate: "2026-09-29",
    status: "awaiting reply",
  });
  assert.equal(post.status, 201);
  const list = await (await fetch(API + "/entries")).json();
  const saved = list.find(e => e.coachName === marker);
  assert.ok(saved, "posted entry appears in GET");
  assert.equal(saved.school, "Eval College", "fields land in their own columns");
});

// TODO (HW5 Part 5): one test for your delegated feature's endpoint or its
// effect on GET /entries. Name the EARS row in the title.

// ---------------------------------------------------------------------------
// HW5: the delegated feature. The parent summary is client-side logic over
// GET /entries, so these exercise the data the summary is computed from.
// ---------------------------------------------------------------------------

test("EARS E19: GET /entries carries the status field the parent summary counts", async () => {
  const marker = "eval-e19-" + Date.now();
  const post = await createEntry({
    coachName: marker,
    school: "Eval College",
    contactDate: "2026-09-29",
    status: "awaiting reply",
  });
  assert.equal(post.status, 201);

  const list = await (await fetch(API + "/entries")).json();
  const row = list.find(e => e.coachName === marker);
  assert.ok(row, "the entry is retrievable");
  assert.equal(row.status, "awaiting reply", "status round-trips unchanged");
  // E19 counts total and replied, so every row must carry a readable status.
  for (const e of list) {
    assert.equal(typeof e.status, "string", "every row has a status to count");
    assert.ok(e.status.length > 0, "status is not empty");
  }
});

test("EARS E20: an entry saved as replied comes back with the three fields the summary lists", async () => {
  const marker = "eval-e20-" + Date.now();
  const post = await createEntry({
    coachName: marker,
    school: "Reply University",
    contactDate: "2026-09-18",
    status: "replied",
  });
  assert.equal(post.status, 201);

  const list = await (await fetch(API + "/entries")).json();
  const row = list.find(e => e.coachName === marker);
  assert.ok(row, "the replied entry is retrievable");
  assert.equal(row.status, "replied");
  // E20 lists name, school, and contact date for each replied coach.
  assert.equal(row.coachName, marker);
  assert.equal(row.school, "Reply University");
  assert.equal(row.contactDate, "2026-09-18");
});
