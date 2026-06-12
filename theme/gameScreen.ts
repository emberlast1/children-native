import { StyleSheet } from "react-native";

export const gameScreenStyles = StyleSheet.create({
  layout: {
    paddingBottom: 16,
  },
  game: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    position: "relative",
  },
  title: {
    fontSize: 26,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  progress: {
    marginTop: 12,
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
  },
  playfield: {
    width: "100%",
    maxWidth: "100%",
    position: "relative",
    alignSelf: "center",
  },
});
