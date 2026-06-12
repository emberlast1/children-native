import { VocabularyScreen } from "@/components/VocabularyScreen";
import { familyData } from "@/data/familyData";

export default function FamilyRoute() {
  return <VocabularyScreen items={familyData} theme="family" />;
}
