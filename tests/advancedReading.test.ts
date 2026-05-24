import test from "node:test";
import assert from "node:assert/strict";
import { getShiYing } from "../src/lib/getShiYing.ts";
import { getNajia } from "../src/lib/getNajia.ts";
import { getSixRelatives } from "../src/lib/getSixRelatives.ts";

test("雷天大壮应落在坤宫，世四应一", () => {
  const info = getShiYing("dazhuang", [1, 1, 1, 1, 0, 0]);
  assert.equal(info.palace, "坤");
  assert.equal(info.shi, 4);
  assert.equal(info.ying, 1);
});

test("雷天大壮基础纳甲应生成六爻地支", () => {
  const najia = getNajia([1, 1, 1, 1, 0, 0]);
  assert.deepEqual(
    najia.assignments.map((item) => item.branch),
    ["子", "寅", "辰", "午", "申", "戌"]
  );
});

test("雷天大壮基础六亲应可按坤宫土生成", () => {
  const relatives = getSixRelatives([1, 1, 1, 1, 0, 0], "dazhuang");
  assert.deepEqual(
    relatives.relatives.map((item) => item.relative),
    ["妻财", "官鬼", "兄弟", "父母", "子孙", "兄弟"]
  );
});
