import test from "node:test";
import assert from "node:assert/strict";
import { castHexagram } from "../src/lib/castHexagram.ts";

test("old yin changes to yang", () => {
  const result = castHexagram([
    "\u5b57\u5b57\u5b57",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1"
  ]);
  assert.equal(result.originalLines[0], 0);
  assert.equal(result.changedLines[0], 1);
});

test("old yang changes to yin", () => {
  const result = castHexagram([
    "\u82b1\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1"
  ]);
  assert.equal(result.originalLines[0], 1);
  assert.equal(result.changedLines[0], 0);
});

test("young yin and young yang do not change", () => {
  const result = castHexagram([
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1"
  ]);
  assert.deepEqual(result.originalLines, result.changedLines);
});
