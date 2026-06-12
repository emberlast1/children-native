import { MenuSectionScreen } from "@/components/MenuSectionScreen";
import { getMenuSection } from "@/data/mainScreenData";
import { Redirect } from "expo-router";

export default function GamesRoute() {
  const section = getMenuSection("games");

  if (!section) {
    return <Redirect href="/" />;
  }

  return <MenuSectionScreen section={section} />;
}
