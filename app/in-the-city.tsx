import { VocabularyScreen } from "@/components/VocabularyScreen";
import { inTheCityData } from "@/data/inTheCityData";

export default function InTheCityRoute() {
  return <VocabularyScreen items={inTheCityData} theme="city" />;
}
