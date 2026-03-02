import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../store/ThemeContext";
import { Spacing, BorderRadius, Shadows } from "../constants/spacing";

interface PremiumCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  delay?: number;
  hoverable?: boolean;
}

export default function PremiumCard({
  children,
  style,
  onPress,
  delay = 0,
  hoverable = false,
}: PremiumCardProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    ...Shadows.md,
  },
});
