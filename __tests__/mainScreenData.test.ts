import {
  getMenuSection,
  mainMenuSections,
  menuHubItems,
  mainScreenComponentsData,
} from "@/data/mainScreenData";

const EXPECTED_WORD_ROUTES = [
  "/days",
  "/animals",
  "/colors",
  "/fruits",
  "/vegetables",
  "/shapes",
  "/alphabet",
  "/numbers",
  "/body",
  "/family",
  "/at-the-walk",
  "/weather",
  "/seasons",
  "/our-planet",
  "/in-the-city",
  "/home-items",
  "/my-clothes",
  "/school-supplies",
  "/sea-creatures",
] as const;

const EXPECTED_GAME_ROUTES = [
  "/letter-tracing",
  "/math-game",
  "/count-animals",
  "/memory-game",
  "/listen-and-tap",
  "/where-is",
  "/sort-it",
] as const;

describe("mainMenuSections", () => {
  it("groups menu items into learn words and games", () => {
    expect(mainMenuSections).toHaveLength(2);
    expect(mainMenuSections[0].title).toBe("Learn words");
    expect(mainMenuSections[1].title).toBe("Games");

    expect(mainMenuSections[0].items.map((item) => item.route)).toEqual([
      ...EXPECTED_WORD_ROUTES,
    ]);
    expect(mainMenuSections[1].items.map((item) => item.route)).toEqual([
      ...EXPECTED_GAME_ROUTES,
    ]);
  });

  it("keeps a flat list of all menu routes", () => {
    expect(mainScreenComponentsData).toHaveLength(
      EXPECTED_WORD_ROUTES.length + EXPECTED_GAME_ROUTES.length
    );
    mainScreenComponentsData.forEach((item) => {
      expect(item.nameEng.length).toBeGreaterThan(0);
    });
  });
});

describe("menuHubItems", () => {
  it("links hub tiles to section screens", () => {
    expect(menuHubItems).toHaveLength(2);
    expect(menuHubItems[0]).toMatchObject({
      title: "Learn words",
      route: "/learn-words",
    });
    expect(menuHubItems[1]).toMatchObject({
      title: "Games",
      route: "/games",
    });

    expect(getMenuSection("words")?.items).toHaveLength(EXPECTED_WORD_ROUTES.length);
    expect(getMenuSection("games")?.items).toHaveLength(EXPECTED_GAME_ROUTES.length);
  });
});
