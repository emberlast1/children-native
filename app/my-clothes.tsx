import { VocabularyScreen } from "@/components/VocabularyScreen";
import { myClothesData } from "@/data/myClothesData";

export default function MyClothesRoute() {
  return <VocabularyScreen items={myClothesData} theme="clothes" imageScale={0.9} />;
}
