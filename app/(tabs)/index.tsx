import { View, ScrollView, StyleSheet, RefreshControl, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, SlideInUp } from "react-native-reanimated";
import { Spacing, BorderRadius, Shadows } from "../../src/constants/spacing";
import { Typography } from "../../src/constants/fonts";
import LuxuryHeader from "../../src/components/LuxuryHeader";
import SearchBar from "../../src/components/SearchBar";
import AdvertisementBanner from "../../src/components/AdvertisementBanner";
import FeaturedSection from "../../src/components/FeaturedSection";
import SkeletonLoader from "../../src/components/SkeletonLoader";
import { useMenuItems } from "../../src/hooks/useMenu";
import { useTheme } from "../../src/store/ThemeContext";
import { useState } from "react";

export default function HomeScreen() {
  const { items, loading, refetch } = useMenuItems();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSearch;
  });

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <Animated.View entering={FadeInDown.duration(600)}>
          <LuxuryHeader />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(700).delay(100)} style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(800).delay(200)}>
          <AdvertisementBanner />
        </Animated.View>

        {loading ? (
          <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.loadingSection}>
            <SkeletonLoader width="100%" height={200} borderRadius={BorderRadius.lg} />
            <View style={{ height: Spacing.md }} />
            <SkeletonLoader width="100%" height={200} borderRadius={BorderRadius.lg} />
          </Animated.View>
        ) : filteredItems.length > 0 ? (
          <Animated.View entering={SlideInUp.duration(600).delay(500)}>
            <FeaturedSection items={filteredItems} />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.emptyState}>
            <Text style={styles.emptyStateText}>🔍</Text>
            <Text style={[Typography.h3, { color: colors.textSecondary, marginTop: Spacing.md }]}>No items found</Text>
            <Text style={[Typography.bodySmall, { color: colors.textTertiary, marginTop: Spacing.sm, textAlign: "center" }]}>Try a different search term</Text>
          </Animated.View>
        )}
        
        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  loadingSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyStateText: {
    fontSize: 48,
  },
});
