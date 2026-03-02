import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, BorderRadius, Shadows } from "../constants/spacing";
import { Typography } from "../constants/fonts";
import { useUser } from "../store/UserContext";
import { useTheme } from "../store/ThemeContext";

export default function LuxuryHeader() {
  const { user } = useUser();
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.greetingSection}>
          <Text style={[Typography.bodySmall, { color: colors.textSecondary }]}>
            Good Morning 👋
          </Text>
          <Text style={[Typography.h2, { color: colors.textPrimary }]}>
            {user?.name.split(" ")[0]} welcome back!
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.locationBar, { backgroundColor: colors.backgroundSecondary }]}>
        <View style={[styles.locationIcon, { backgroundColor: colors.primary + "15" }]}>
          <Ionicons name="location" size={16} color={colors.primary} />
        </View>
        <View style={styles.locationText}>
          <Text style={[Typography.caption, { color: colors.textSecondary }]}>
            Delivery to
          </Text>
          <Text style={[Typography.body, { color: colors.textPrimary, fontWeight: "600" }]}>
            srm campus 📍
          </Text>
        </View>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl * 1.5,
    paddingBottom: Spacing.md,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  greetingSection: {
    flex: 1,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    flex: 1,
  },
});
