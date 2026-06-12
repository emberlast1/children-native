import { VocabularyScreen } from "@/components/VocabularyScreen";
import { bodyData } from "@/data/bodyData";

export default function BodyRoute() {
  return <VocabularyScreen items={bodyData} theme="body" />;
}
