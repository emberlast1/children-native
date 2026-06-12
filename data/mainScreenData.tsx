import type { MenuHubItem, MenuItem, MenuSection, MenuSectionId } from "@/types/menuItem";

const learnWordsItems: MenuItem[] = [
  {
    imageUrl: require("../assets/images/days.png"),
    nameEng: "Days",
    route: "/days",
  },
  {
    imageUrl: require("../assets/images/animals.png"),
    nameEng: "Animals",
    route: "/animals",
  },
  {
    imageUrl: require("../assets/images/colors.png"),
    nameEng: "Colors",
    route: "/colors",
  },
  {
    imageUrl: require("../assets/images/fruits.png"),
    nameEng: "Fruits",
    route: "/fruits",
  },
  {
    imageUrl: require("../assets/images/vege.png"),
    nameEng: "Vegetables",
    route: "/vegetables",
  },
  {
    imageUrl: require("../assets/images/shapes.png"),
    nameEng: "Shapes",
    route: "/shapes",
  },
  {
    imageUrl: require("../assets/images/alphabet.png"),
    nameEng: "English alphabet",
    route: "/alphabet",
  },
  {
    imageUrl: require("../assets/images/numbers.png"),
    nameEng: "Numbers",
    route: "/numbers",
  },
  {
    imageUrl: require("../assets/images/body.png"),
    nameEng: "Body",
    route: "/body",
  },
  {
    imageUrl: require("../assets/images/family.png"),
    nameEng: "Family",
    route: "/family",
  },
  {
    imageUrl: require("../assets/images/at-the-walk.png"),
    nameEng: "At the walk",
    route: "/at-the-walk",
  },
  {
    imageUrl: require("../assets/images/weather.png"),
    nameEng: "Weather",
    route: "/weather",
  },
  {
    imageUrl: require("../assets/images/seasons.png"),
    nameEng: "Seasons",
    route: "/seasons",
  },
  {
    imageUrl: require("../assets/images/our-planet.png"),
    nameEng: "Our planet",
    route: "/our-planet",
  },
  {
    imageUrl: require("../assets/images/in-the-city.png"),
    nameEng: "In the city",
    route: "/in-the-city",
  },
  {
    imageUrl: require("../assets/images/home-items.png"),
    nameEng: "Home items",
    route: "/home-items",
  },
  {
    imageUrl: require("../assets/images/my-clothes.png"),
    nameEng: "My clothes",
    route: "/my-clothes",
  },
  {
    imageUrl: require("../assets/images/school-supplies.png"),
    nameEng: "School supplies",
    route: "/school-supplies",
  },
  {
    imageUrl: require("../assets/images/sea-creatures.png"),
    nameEng: "Sea creatures",
    route: "/sea-creatures",
  },
];

const gamesItems: MenuItem[] = [
  {
    imageUrl: require("../assets/images/write-letters.png"),
    nameEng: "Write letters",
    route: "/letter-tracing",
  },
  {
    imageUrl: require("../assets/images/counter.png"),
    nameEng: "Math game",
    route: "/math-game",
  },
  {
    imageUrl: require("../assets/images/countAnimals.png"),
    nameEng: "Count animals",
    route: "/count-animals",
  },
  {
    imageUrl: require("../assets/images/memory.png"),
    nameEng: "Memory",
    route: "/memory-game",
  },
  {
    imageUrl: require("../assets/images/listen-and-tap.png"),
    nameEng: "Listen and tap",
    route: "/listen-and-tap",
  },
  {
    imageUrl: require("../assets/images/where-is.png"),
    nameEng: "Where is",
    route: "/where-is",
  },
  {
    imageUrl: require("../assets/images/sort-it.png"),
    nameEng: "Sort it",
    route: "/sort-it",
  },
];

export const mainMenuSections: MenuSection[] = [
  {
    id: "words",
    title: "Learn words",
    items: learnWordsItems,
  },
  {
    id: "games",
    title: "Games",
    items: gamesItems,
  },
];

export const menuHubItems: MenuHubItem[] = [
  {
    title: "Learn words",
    route: "/learn-words",
    imageUrl: require("../assets/images/learn-words.png"),
  },
  {
    title: "Games",
    route: "/games",
    imageUrl: require("../assets/images/games.png"),
  },
];

export const getMenuSection = (id: MenuSectionId): MenuSection | undefined =>
  mainMenuSections.find((section) => section.id === id);

export const mainScreenComponentsData: MenuItem[] = mainMenuSections.flatMap(
  (section) => section.items
);
