import { VocabularyScreen } from "@/components/VocabularyScreen";
import { atTheWalkData } from "@/data/atTheWalkData";

export default function AtTheWalkRoute() {
  return <VocabularyScreen items={atTheWalkData} theme="walk" />;
}
