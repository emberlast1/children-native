import { VocabularyScreen } from "@/components/VocabularyScreen";
import { vegeData } from "@/data/vegeData";

export default function VegetablesRoute() {
  return <VocabularyScreen items={vegeData} theme="vegetables" />;
}
