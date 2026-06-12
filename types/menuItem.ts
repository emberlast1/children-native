import type { ImageSourcePropType } from "react-native";

export type MenuItem = {
  imageUrl: ImageSourcePropType;
  nameEng: string;
  route: string;
};

export type MenuSectionId = "words" | "games";

export type MenuSection = {
  id: MenuSectionId;
  title: string;
  items: MenuItem[];
};

export type MenuHubItem = {
  title: string;
  route: `/learn-words` | `/games`;
  imageUrl: ImageSourcePropType;
};
