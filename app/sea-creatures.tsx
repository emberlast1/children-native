import { VocabularyScreen } from "@/components/VocabularyScreen";
import { seaCreaturesData } from "@/data/seaCreaturesData";

export default function SeaCreaturesRoute() {
  return (
    <VocabularyScreen items={seaCreaturesData} theme="seaCreatures" imageScale={0.9} />
  );
}
