import test from "node:test";
import assert from "node:assert/strict";
import { COIN_RULES } from "../src/data/coinRules.ts";

test("字字字 -> 6 老阴 阴爻动", () => {
  assert.equal(COIN_RULES["字字字"].value, 6);
  assert.equal(COIN_RULES["字字字"].name, "老阴");
  assert.equal(COIN_RULES["字字字"].yinYang, "阴");
  assert.equal(COIN_RULES["字字字"].isMoving, true);
  assert.equal(COIN_RULES["字字字"].changedLine, 1);
});

test("字字花 -> 7 少阳 阳爻静", () => {
  assert.equal(COIN_RULES["字字花"].value, 7);
  assert.equal(COIN_RULES["字字花"].name, "少阳");
  assert.equal(COIN_RULES["字字花"].yinYang, "阳");
  assert.equal(COIN_RULES["字字花"].isMoving, false);
  assert.equal(COIN_RULES["字字花"].changedLine, 1);
});

test("字花花 -> 8 少阴 阴爻静", () => {
  assert.equal(COIN_RULES["字花花"].value, 8);
  assert.equal(COIN_RULES["字花花"].name, "少阴");
  assert.equal(COIN_RULES["字花花"].yinYang, "阴");
  assert.equal(COIN_RULES["字花花"].isMoving, false);
  assert.equal(COIN_RULES["字花花"].changedLine, 0);
});

test("花花花 -> 9 老阳 阳爻动", () => {
  assert.equal(COIN_RULES["花花花"].value, 9);
  assert.equal(COIN_RULES["花花花"].name, "老阳");
  assert.equal(COIN_RULES["花花花"].yinYang, "阳");
  assert.equal(COIN_RULES["花花花"].isMoving, true);
  assert.equal(COIN_RULES["花花花"].changedLine, 0);
});

