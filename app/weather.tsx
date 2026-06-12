import { VocabularyScreen } from "@/components/VocabularyScreen";
import { weatherData } from "@/data/weatherData";

export default function WeatherRoute() {
  return <VocabularyScreen items={weatherData} theme="weather" />;
}
