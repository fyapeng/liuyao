import test from "node:test";
import assert from "node:assert/strict";
import { COIN_RULES } from "../src/data/coinRules.ts";

test("coin rule: old yin", () => {
  const key = "\u5b57\u5b57\u5b57" as const;
  assert.equal(COIN_RULES[key].value, 6);
  assert.equal(COIN_RULES[key].name, "\u8001\u9634");
  assert.equal(COIN_RULES[key].yinYang, "\u9634");
  assert.equal(COIN_RULES[key].isMoving, true);
  assert.equal(COIN_RULES[key].changedLine, 1);
});

test("coin rule: young yang", () => {
  const key = "\u5b57\u5b57\u82b1" as const;
  assert.equal(COIN_RULES[key].value, 7);
  assert.equal(COIN_RULES[key].name, "\u5c11\u9633");
  assert.equal(COIN_RULES[key].yinYang, "\u9633");
  assert.equal(COIN_RULES[key].isMoving, false);
  assert.equal(COIN_RULES[key].changedLine, 1);
});

test("coin rule: young yin", () => {
  const key = "\u5b57\u82b1\u82b1" as const;
  assert.equal(COIN_RULES[key].value, 8);
  assert.equal(COIN_RULES[key].name, "\u5c11\u9634");
  assert.equal(COIN_RULES[key].yinYang, "\u9634");
  assert.equal(COIN_RULES[key].isMoving, false);
  assert.equal(COIN_RULES[key].changedLine, 0);
});

test("coin rule: old yang", () => {
  const key = "\u82b1\u82b1\u82b1" as const;
  assert.equal(COIN_RULES[key].value, 9);
  assert.equal(COIN_RULES[key].name, "\u8001\u9633");
  assert.equal(COIN_RULES[key].yinYang, "\u9633");
  assert.equal(COIN_RULES[key].isMoving, true);
  assert.equal(COIN_RULES[key].changedLine, 0);
});
