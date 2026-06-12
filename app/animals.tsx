import { VocabularyScreen } from "@/components/VocabularyScreen";
import { animalsData } from "@/data/animalsData";

export default function AnimalsRoute() {
  return <VocabularyScreen items={animalsData} theme="animals" imageScale={0.9} />;
}
