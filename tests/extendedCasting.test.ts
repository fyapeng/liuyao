import test from "node:test";
import assert from "node:assert/strict";
import { coinLinesToSelections } from "../src/lib/castHexagram.ts";
import { getSixGods } from "../src/lib/getSixGods.ts";

test("coin faces convert to selections", () => {
  const selections = coinLinesToSelections([
    ["\u5b57", "\u5b57", "\u5b57"],
    ["\u5b57", "\u5b57", "\u82b1"],
    ["\u5b57", "\u82b1", "\u82b1"],
    ["\u82b1", "\u82b1", "\u82b1"],
    ["\u5b57", "\u5b57", "\u82b1"],
    ["\u5b57", "\u82b1", "\u82b1"]
  ]);

  assert.deepEqual(selections, [
    "\u5b57\u5b57\u5b57",
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1",
    "\u82b1\u82b1\u82b1",
    "\u5b57\u5b57\u82b1",
    "\u5b57\u82b1\u82b1"
  ]);
});

test("six gods from jia day stem", () => {
  const result = getSixGods([1, 1, 1, 1, 1, 1], "\u7532");
  assert.deepEqual(
    result.gods.map((item) => item.label),
    ["\u9752\u9f99", "\u6731\u96c0", "\u52fe\u9648", "\u817e\u86c7", "\u767d\u864e", "\u7384\u6b66"]
  );
});

test("six gods from geng day stem", () => {
  const result = getSixGods([1, 1, 1, 1, 1, 1], "\u5e9a");
  assert.deepEqual(
    result.gods.map((item) => item.label),
    ["\u767d\u864e", "\u7384\u6b66", "\u9752\u9f99", "\u6731\u96c0", "\u52fe\u9648", "\u817e\u86c7"]
  );
});
