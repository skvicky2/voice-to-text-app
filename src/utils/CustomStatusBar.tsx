import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomStatusBarProps {
  backgroundColor: string;
  barStyle?: "default" | "light-content" | "dark-content";
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle = "default",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent
        animated={true}
      />
    </View>
  );
};
