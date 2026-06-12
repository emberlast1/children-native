import {
  createStackNavigator,
  type StackNavigationEventMap,
  type StackNavigationOptions,
} from "@react-navigation/stack";
import {
  type ParamListBase,
  type StackNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createStackNavigator();

export const WebStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);
