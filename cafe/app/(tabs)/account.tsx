import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Spacing, BorderRadius, Shadows } from "../../src/constants/spacing";
import { Typography } from "../../src/constants/fonts";
import PremiumCard from "../../src/components/PremiumCard";
import PremiumButton from "../../src/components/PremiumButton";
import { useUser } from "../../src/store/UserContext";
import { useTheme } from "../../src/store/ThemeContext";

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { theme, colors, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: "person", label: "Edit Profile", onPress: () => router.push("/edit-profile") },
    { icon: "card", label: "Payment Methods", onPress: () => alert("Payment Methods") },
    { icon: "cash", label: "My Refund", onPress: () => alert("My Refund") },
    { icon: "gift", label: "Offers & Promos", onPress: () => alert("Offers & Promos") },
    { icon: "help-circle", label: "Help & Support", onPress: () => alert("Help & Support") },
    { icon: "information-circle", label: "About", onPress: () => alert("About - Ambis Cafe v1.0") },
  ];

  const renderMenuItem = ({ icon, label, onPress }: any) => (
    <TouchableOpacity
      key={label}
      style={[styles.menuItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIcon, { backgroundColor: colors.primary + "15" }]}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <Text style={[Typography.body, { color: colors.textPrimary }]}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
          <Text style={[Typography.h2, { color: colors.textPrimary }]}>
            Account
          </Text>
        </Animated.View>

        {/* Profile Card */}
        <PremiumCard style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]} delay={100}>
          <View style={styles.profileContent}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {user?.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[Typography.h3, { color: colors.textPrimary }]}>
                {user?.name}
              </Text>
              <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
                {user?.email}
              </Text>
              <Text style={[Typography.caption, { color: colors.primary, marginTop: Spacing.xs }]}>
                {user?.phone}
              </Text>
            </View>
          </View>
        </PremiumCard>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <PremiumCard style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]} delay={150}>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>
              📦 Total Orders
            </Text>
            <Text style={[Typography.h2, { color: colors.primary, marginTop: Spacing.sm }]}>12</Text>
          </PremiumCard>
          <PremiumCard style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]} delay={150}>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>
              ⭐ Loyalty Points
            </Text>
            <Text style={[Typography.h2, { color: colors.primary, marginTop: Spacing.sm }]}>450</Text>
          </PremiumCard>
        </View>

        {/* Preferences */}
        <PremiumCard style={[styles.preferencesCard, { backgroundColor: colors.card, borderColor: colors.border }]} delay={250}>
          <Text style={[Typography.h4, { color: colors.textPrimary, marginBottom: Spacing.md }]}>
            Preferences
          </Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <Text style={[Typography.body, { color: colors.textPrimary }]}>
                Notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary + "40" }}
              thumbColor={notifications ? colors.primary : colors.textSecondary}
            />
          </View>

          <View style={[styles.preferenceItem, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: Spacing.md, marginTop: Spacing.md }]}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="moon" size={20} color={colors.primary} />
              <View style={styles.darkModeInfo}>
                <Text style={[Typography.body, { color: colors.textPrimary }]}>
                  Dark Mode
                </Text>
                <Text style={[Typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
                  {theme === "dark" ? "Enabled" : "Disabled"}
                </Text>
              </View>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary + "40" }}
              thumbColor={theme === "dark" ? colors.primary : colors.textSecondary}
            />
          </View>
        </PremiumCard>

        {/* Menu Items */}
        <PremiumCard style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]} delay={300}>
          {menuItems.map((item) => renderMenuItem(item))}
        </PremiumCard>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <PremiumButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            fullWidth
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  profileCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
  },
  preferencesCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  darkModeInfo: {
    marginLeft: Spacing.sm,
  },
  menuCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
