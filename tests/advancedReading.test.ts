import test from "node:test";
import assert from "node:assert/strict";
import { getShiYing } from "../src/lib/getShiYing.ts";
import { getNajia } from "../src/lib/getNajia.ts";
import { getSixRelatives } from "../src/lib/getSixRelatives.ts";
import { buildTemporalProfile } from "../src/lib/temporalProfile.ts";
import { buildTimeContext } from "../src/lib/timeContext.ts";
import { buildYongShenProfile, resolveYongShenMatches } from "../src/lib/yongShen.ts";

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

test("paper submission yong shen resolves to parent lines", () => {
  const shiYing = getShiYing("dazhuang", [1, 1, 1, 1, 0, 0]);
  const relatives = getSixRelatives([1, 1, 1, 1, 0, 0], "dazhuang");
  const timeContext = buildTimeContext(new Date("2026-05-24T12:00:00+08:00"));
  const temporalProfile = buildTemporalProfile(timeContext, getNajia([1, 1, 1, 1, 0, 0]).assignments);

  const matches = resolveYongShenMatches({
    categoryKey: "\u8bba\u6587\u6295\u7a3f",
    primaryYongShen: "\u7236\u6bcd",
    movingLinePositions: [4],
    shiYing,
    relatives: relatives.relatives,
    details: [],
    dayStem: "\u7532",
    timeContext,
    temporalProfile
  });

  assert.deepEqual(
    matches.map((item) => ({ line: item.line, isMoving: item.isMoving })),
    [{ line: 4, isMoving: true }]
  );
});

test("temporal profile exposes month day and void placeholders", () => {
  const najia = getNajia([1, 1, 1, 1, 0, 0]);
  const profile = buildTemporalProfile(buildTimeContext(new Date("2026-05-24T12:00:00+08:00")), najia.assignments);

  assert.equal(profile.overview.length, 4);
  assert.deepEqual(
    profile.overview.map((item) => item.key),
    ["timestamp", "month", "day", "void"]
  );
  assert.equal(profile.lineStatuses.length, 6);
  assert.match(profile.lineStatuses[0]?.dayState ?? "", /\u65e5/);
});

test("time context derives month build from solar terms", () => {
  const beforeMangzhong = buildTimeContext(new Date("2026-05-24T12:00:00+08:00"));
  const afterMangzhong = buildTimeContext(new Date("2026-06-08T12:00:00+08:00"));

  assert.equal(beforeMangzhong.solarTermLabel, "\u5c0f\u6ee1");
  assert.equal(beforeMangzhong.monthBuild, "\u5df3");
  assert.equal(afterMangzhong.solarTermLabel, "\u8292\u79cd");
  assert.equal(afterMangzhong.monthBuild, "\u5348");
});

test("yong shen profile exposes roles and pressure", () => {
  const lines = [1, 1, 1, 1, 0, 0] as const;
  const shiYing = getShiYing("dazhuang", [...lines]);
  const relatives = getSixRelatives([...lines], "dazhuang");
  const timeContext = buildTimeContext(new Date("2026-05-24T12:00:00+08:00"));
  const temporalProfile = buildTemporalProfile(timeContext, getNajia([...lines]).assignments);
  const profile = buildYongShenProfile({
    categoryKey: "\u8bba\u6587\u6295\u7a3f",
    primaryYongShen: "\u7236\u6bcd",
    movingLinePositions: [4],
    shiYing,
    relatives: relatives.relatives,
    details: [],
    dayStem: timeContext.dayStem,
    timeContext,
    temporalProfile
  });

  assert.deepEqual(
    profile.yongShenMatches.map((item) => item.line),
    [4]
  );
  assert.ok(profile.roleMatches.some((item) => item.role === "\u5143\u795e"));
  assert.ok(profile.favorableFactors.some((item) => item.includes("\u65e5\u6708")));
  assert.ok(profile.statusSummary.some((item) => item.includes("\u7528\u795e")));
});
