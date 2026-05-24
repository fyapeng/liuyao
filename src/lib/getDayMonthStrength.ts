import { buildTemporalProfile } from "./temporalProfile.ts";
import type { NajiaAssignment, TimeContext } from "../types/index.ts";

export function getDayMonthStrength(timeContext: TimeContext, najiaAssignments: NajiaAssignment[]) {
  return {
    status: "implemented",
    profile: buildTemporalProfile(timeContext, najiaAssignments),
    message: `${timeContext.dayGanzhi}\u65e5\u3001${timeContext.monthBuild}\u6708\u5efa\u7684\u65fa\u8870\u3001\u7a7a\u4ea1\u4e0e\u57fa\u7840\u51b2\u5408\u5173\u7cfb\u5df2\u63a5\u5165\u3002`
  };
}
