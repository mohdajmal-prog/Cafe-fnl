import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Animated, { FadeInDown, SlideInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Spacing, BorderRadius } from "../../src/constants/spacing";
import { Typography } from "../../src/constants/fonts";
import SearchBar from "../../src/components/SearchBar";
import PremiumCard from "../../src/components/PremiumCard";
import { useSearch } from "../../src/hooks/useMenu";
import { useTheme } from "../../src/store/ThemeContext";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { results, loading } = useSearch(searchQuery);
  const { colors } = useTheme();

  const renderResult = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={SlideInRight.duration(400).delay(index * 50)}>
      <PremiumCard key={item.id} style={styles.resultCard} delay={index * 50}>
        <TouchableOpacity 
          style={styles.resultContent}
          onPress={() => router.push(`/product-detail?id=${item.id}`)}
          activeOpacity={0.7}
        >
          <View style={[styles.resultImage, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={styles.imagePlaceholder}>☕</Text>
          </View>
          <View style={styles.resultInfo}>
            <Text style={[Typography.body, { color: colors.textPrimary }]}>
              {item.name}
            </Text>
            <Text
              style={[
                Typography.caption,
                { color: colors.textSecondary, marginTop: Spacing.xs },
              ]}
              numberOfLines={1}
            >
              {item.category}
            </Text>
            <View style={styles.resultFooter}>
              <Text style={[Typography.button, { color: colors.primary }]}>
                ₹{item.price}
              </Text>
              <View style={[styles.ratingBadge, { backgroundColor: colors.backgroundSecondary }]}>
                <Ionicons
                  name="star"
                  size={12}
                  color={colors.textPrimary}
                  style={{ marginRight: 2 }}
                />
                <Text style={[Typography.caption, { color: colors.textPrimary }]}>
                  {item.rating}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </PremiumCard>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
          <Text style={[Typography.h2, { color: colors.textPrimary }]}>
            Search
          </Text>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search items..."
            style={{ marginTop: Spacing.lg }}
          />
        </Animated.View>

        {searchQuery.length === 0 ? (
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.emptySearch}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={[Typography.h4, { color: colors.textPrimary, marginTop: Spacing.lg }]}>
              Start searching
            </Text>
            <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.md, textAlign: "center" }]}>
              Find your favorite items by name or category
            </Text>
          </Animated.View>
        ) : loading ? (
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.emptySearch}>
            <Text style={{ fontSize: 48 }}>⏳</Text>
            <Text style={[Typography.h4, { color: colors.textPrimary, marginTop: Spacing.lg }]}>
              Searching...
            </Text>
          </Animated.View>
        ) : results.length > 0 ? (
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.resultsContainer}>
            <Text
              style={[
                Typography.h4,
                { color: colors.textPrimary, marginBottom: Spacing.md },
              ]}
            >
              Results ({results.length})
            </Text>
            <FlatList
              data={results}
              renderItem={renderResult}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              nestedScrollEnabled={false}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.emptySearch}>
            <Text style={{ fontSize: 48 }}>😕</Text>
            <Text style={[Typography.h4, { color: colors.textPrimary, marginTop: Spacing.lg }]}>
              No results found
            </Text>
            <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.md, textAlign: "center" }]}>
              Try searching for different keywords
            </Text>
          </Animated.View>
        )}
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
  emptySearch: {
    alignItems: "center",
    paddingVertical: Spacing.xl * 2,
  },
  resultsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  resultCard: {
    marginBottom: Spacing.md,
  },
  resultContent: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    fontSize: 32,
  },
  resultInfo: {
    flex: 1,
  },
  resultFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
});
