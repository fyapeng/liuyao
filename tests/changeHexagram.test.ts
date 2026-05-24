import test from "node:test";
import assert from "node:assert/strict";
import { castHexagram } from "../src/lib/castHexagram.ts";

test("老阴变阳", () => {
  const result = castHexagram(["字字字", "字花花", "字花花", "字花花", "字花花", "字花花"]);
  assert.equal(result.originalLines[0], 0);
  assert.equal(result.changedLines[0], 1);
});

test("老阳变阴", () => {
  const result = castHexagram(["花花花", "字花花", "字花花", "字花花", "字花花", "字花花"]);
  assert.equal(result.originalLines[0], 1);
  assert.equal(result.changedLines[0], 0);
});

test("少阴少阳不变", () => {
  const result = castHexagram(["字字花", "字花花", "字字花", "字花花", "字字花", "字花花"]);
  assert.deepEqual(result.originalLines, result.changedLines);
});

