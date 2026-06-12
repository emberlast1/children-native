import { MenuSectionScreen } from "@/components/MenuSectionScreen";
import { getMenuSection } from "@/data/mainScreenData";
import { Redirect } from "expo-router";

export default function LearnWordsRoute() {
  const section = getMenuSection("words");

  if (!section) {
    return <Redirect href="/" />;
  }

  return <MenuSectionScreen section={section} />;
}
