import { VocabularyScreen } from "@/components/VocabularyScreen";
import { seasonsData } from "@/data/seasonsData";

export default function SeasonsRoute() {
  return <VocabularyScreen items={seasonsData} theme="seasons" />;
}
