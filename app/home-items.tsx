import { VocabularyScreen } from "@/components/VocabularyScreen";
import { homeItemsData } from "@/data/homeItemsData";

export default function HomeItemsRoute() {
  return <VocabularyScreen items={homeItemsData} theme="homeItems" imageScale={0.9} />;
}
