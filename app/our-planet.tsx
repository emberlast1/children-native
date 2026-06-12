import { VocabularyScreen } from "@/components/VocabularyScreen";
import { ourPlanetData } from "@/data/ourPlanetData";

export default function OurPlanetRoute() {
  return <VocabularyScreen items={ourPlanetData} theme="planet" />;
}
