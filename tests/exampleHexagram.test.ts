import test from "node:test";
import assert from "node:assert/strict";
import { buildHexagramResult } from "../src/lib/getHexagramName.ts";

test("示例卦应得到雷天大壮，三爻动，变卦雷泽归妹", () => {
  const result = buildHexagramResult(["字字花", "字字花", "花花花", "字字花", "字花花", "字花花"]);

  assert.equal(result.originalHexagram?.name, "雷天大壮");
  assert.deepEqual(result.movingLinePositions, [3]);
  assert.equal(result.changedHexagram?.name, "雷泽归妹");
});
