import test from "node:test";
import assert from "node:assert/strict";
import { buildHexagramResult } from "../src/lib/getHexagramName.ts";

test("example casting yields dazhuang to guimei", () => {
  const result = buildHexagramResult([
    "\u5b57\u5b57\u82b1",
    "\u5b57\u5b57\u82b1",
    "\u82b1\u82b1\u82b1",
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u5b57\u82b1\u82b1"
  ]);

  assert.equal(result.originalHexagram?.name, "\u96f7\u5929\u5927\u58ee");
  assert.deepEqual(result.movingLinePositions, [3]);
  assert.equal(result.changedHexagram?.name, "\u96f7\u6cfd\u5f52\u59b9");
});
