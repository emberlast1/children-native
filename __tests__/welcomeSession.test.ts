import {
  markWelcomeComplete,
  resetWelcomeSession,
  shouldShowWelcome,
} from "@/features/welcomeSession";

describe("welcomeSession", () => {
  beforeEach(() => {
    resetWelcomeSession();
  });

  it("shows welcome only once per app session", () => {
    expect(shouldShowWelcome()).toBe(true);

    markWelcomeComplete();

    expect(shouldShowWelcome()).toBe(false);
  });
});
