import { VocabularyScreen } from "@/components/VocabularyScreen";
import { shapesData } from "@/data/shapesData";

export default function ShapesRoute() {
  return <VocabularyScreen items={shapesData} theme="shapes" />;
}
