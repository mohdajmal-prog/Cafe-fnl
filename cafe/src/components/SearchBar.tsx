import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInDown, useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "../constants/spacing";
import { useTheme } from "../store/ThemeContext";
import { useState } from "react";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export default function SearchBar({ value, onChangeText, placeholder = "Search snacks, drinks...", style }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.02, { damping: 10, mass: 1 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1, { damping: 10, mass: 1 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={[styles.container, style, animatedStyle, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          { color: colors.textPrimary },
          isFocused && { color: colors.primary },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    fontSize: 16,
  },
});
