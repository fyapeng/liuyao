import test from "node:test";
import assert from "node:assert/strict";
import { coinLinesToSelections } from "../src/lib/castHexagram.ts";
import { getSixGods } from "../src/lib/getSixGods.ts";

test("三枚硬币逐枚输入可转换为六次起卦结果", () => {
  const selections = coinLinesToSelections([
    ["字", "字", "字"],
    ["字", "字", "花"],
    ["字", "花", "花"],
    ["花", "花", "花"],
    ["字", "字", "花"],
    ["字", "花", "花"]
  ]);

  assert.deepEqual(selections, ["字字字", "字字花", "字花花", "花花花", "字字花", "字花花"]);
});

test("甲日起六神应从青龙开始顺排", () => {
  const result = getSixGods([1, 1, 1, 1, 1, 1], "甲");
  assert.deepEqual(
    result.gods.map((item) => item.label),
    ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"]
  );
});

test("庚日起六神应从白虎开始顺排", () => {
  const result = getSixGods([1, 1, 1, 1, 1, 1], "庚");
  assert.deepEqual(
    result.gods.map((item) => item.label),
    ["白虎", "玄武", "青龙", "朱雀", "勾陈", "螣蛇"]
  );
});
