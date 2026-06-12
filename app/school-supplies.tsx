import { VocabularyScreen } from "@/components/VocabularyScreen";
import { schoolSuppliesData } from "@/data/schoolSuppliesData";

export default function SchoolSuppliesRoute() {
  return (
    <VocabularyScreen items={schoolSuppliesData} theme="schoolSupplies" imageScale={0.9} />
  );
}
