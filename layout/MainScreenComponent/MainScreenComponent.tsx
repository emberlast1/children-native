import React from "react";
import { Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  imageUrl: any;
  nameEng: string;
};

const screenWidth = Dimensions.get("window").width;

const getSize = () => {
  if (screenWidth <= 429) {
    return screenWidth * 0.4;
  }
  return 180;
};

export const MainScreenComponent: React.FC<Props> = ({
  imageUrl,
  nameEng,
}) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate(nameEng.toLowerCase());
  };

  const size = getSize();

  return (
    <Pressable style={[styles.container, { width: size }]} onPress={handlePress}>
      <Image
        source={imageUrl}
        style={[
          styles.image,
          { width: size, height: size }
        ]}
        resizeMode="cover"
      />

      <Text style={[styles.nameEng]}>{nameEng}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 8,
  },

  image: {
    borderRadius: 40,
  },

  nameEng: {
    fontSize: 18, // приблизно 1.1rem
    fontWeight: "bold",
    color: "white",
  },
});