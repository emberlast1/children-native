import { VocabularyScreen } from "@/components/VocabularyScreen";
import { fruitsData } from "@/data/fruitsData";

export default function FruitsRoute() {
  return <VocabularyScreen items={fruitsData} theme="fruits" />;
}
