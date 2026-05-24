import test from "node:test";
import assert from "node:assert/strict";
import { getShiYing } from "../src/lib/getShiYing.ts";
import { getNajia } from "../src/lib/getNajia.ts";
import { getSixRelatives } from "../src/lib/getSixRelatives.ts";

test("dazhuang belongs to kun palace with shi 4 ying 1", () => {
  const info = getShiYing("dazhuang", [1, 1, 1, 1, 0, 0]);
  assert.equal(info.palace, "\u5764");
  assert.equal(info.shi, 4);
  assert.equal(info.ying, 1);
});

test("dazhuang najia assignments", () => {
  const najia = getNajia([1, 1, 1, 1, 0, 0]);
  assert.deepEqual(
    najia.assignments.map((item) => item.branch),
    ["\u5b50", "\u5bc5", "\u8fb0", "\u5348", "\u7533", "\u620c"]
  );
});

test("dazhuang six relatives", () => {
  const relatives = getSixRelatives([1, 1, 1, 1, 0, 0], "dazhuang");
  assert.deepEqual(
    relatives.relatives.map((item) => item.relative),
    ["\u59bb\u8d22", "\u5b98\u9b3c", "\u5144\u5f1f", "\u7236\u6bcd", "\u5b50\u5b59", "\u5144\u5f1f"]
  );
});
