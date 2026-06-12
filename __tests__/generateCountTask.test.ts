import { generateCountTask } from "@/utils/generateCountTask";

describe("generateCountTask", () => {
  it("includes the correct count in options", () => {
    const task = generateCountTask();
    expect(task.options).toContain(task.count);
    expect(task.options).toHaveLength(3);
    expect(task.count).toBeGreaterThanOrEqual(3);
    expect(task.count).toBeLessThanOrEqual(10);
  });
});
