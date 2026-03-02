import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, BorderRadius, Shadows } from "../../src/constants/spacing";
import { Typography } from "../../src/constants/fonts";
import PremiumCard from "../../src/components/PremiumCard";
import PremiumButton from "../../src/components/PremiumButton";
import { useCart } from "../../src/store/CartContext";
import { useAppPause } from "../../src/store/AppPauseContext";
import { useTheme } from "../../src/store/ThemeContext";

export default function CartScreen() {
  const router = useRouter();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const { isAppPaused, pauseReason } = useAppPause();
  const { colors } = useTheme();

  const handleCheckout = () => {
    router.push("/payment");
  };

  const renderCartItem = ({ item, index }: { item: any; index: number }) => (
    <PremiumCard key={item.id} style={styles.cartItem} delay={index * 50}>
      <View style={styles.itemContent}>
        <View style={styles.itemInfo}>
          <Text style={[Typography.body, { color: colors.textPrimary }]}>
            {item.name}
          </Text>
          <Text style={[Typography.caption, { color: colors.textSecondary }]}>
            ₹{item.price} each
          </Text>
        </View>

        <View style={styles.itemControls}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={[styles.controlButton, { backgroundColor: colors.backgroundSecondary }]}
          >
            <Ionicons name="remove" size={16} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[Typography.button, { color: colors.textPrimary, minWidth: 30, textAlign: "center" }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={[styles.controlButton, { backgroundColor: colors.backgroundSecondary }]}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[Typography.button, { color: colors.primary, marginLeft: Spacing.md }]}>
            ₹{item.price * item.quantity}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={16} color={colors.error} />
      </TouchableOpacity>
    </PremiumCard>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundSecondary, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <Text style={[Typography.h2, { color: colors.textPrimary }]}>
          Your Cart
        </Text>
        {items.length > 0 && (
          <Text style={[Typography.caption, { color: colors.textSecondary }]}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </Text>
        )}
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {isAppPaused && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <View style={[styles.pauseBanner, { backgroundColor: colors.backgroundSecondary }]}>
              <Text style={styles.pauseIcon}>⏸️</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.pauseTitle, { color: colors.textPrimary }]}>Cafe Temporarily Paused</Text>
                <Text style={[styles.pauseSubtitle, { color: colors.textSecondary }]}>{pauseReason || 'Stock update in progress'}</Text>
              </View>
            </View>
          </Animated.View>
        )}

        {items.length > 0 ? (
          <>
            {isAppPaused && (
              <View style={[styles.pauseOverlay, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={styles.pauseOverlayIcon}>⏸️</Text>
                <Text style={[styles.pauseOverlayText, { color: colors.textPrimary }]}>Ordering is temporarily disabled</Text>
                <Text style={[styles.pauseOverlaySubtext, { color: colors.textSecondary }]}>{pauseReason || 'Please wait while we update our menu'}</Text>
              </View>
            )}
            <View style={styles.itemsContainer}>
              <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                nestedScrollEnabled={false}
              />
            </View>

            <PremiumCard style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={[Typography.body, { color: colors.textSecondary }]}>
                  Subtotal
                </Text>
                <Text style={[Typography.body, { color: colors.textPrimary }]}>
                  ₹{total}
                </Text>
              </View>

              <View style={[styles.summaryRow, { marginTop: Spacing.md }]}>
                <Text style={[Typography.body, { color: colors.textSecondary }]}>
                  Delivery Fee
                </Text>
                <Text style={[Typography.body, { color: colors.textPrimary }]}>
                  Free
                </Text>
              </View>

              <View
                style={[
                  styles.summaryRow,
                  { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
                ]}
              >
                <Text style={[Typography.h4, { color: colors.textPrimary }]}>
                  Total
                </Text>
                <Text style={[Typography.h3, { color: colors.primary }]}>
                  ₹{total}
                </Text>
              </View>
            </PremiumCard>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 64 }}>🛒</Text>
            <Text style={[Typography.h3, { color: colors.textPrimary, marginTop: Spacing.lg }]}>
              Your cart is empty
            </Text>
            <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.md, textAlign: "center" }]}>
              Add delicious items from our menu
            </Text>
          </View>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <PremiumButton
            title="Clear Cart"
            onPress={clearCart}
            variant="secondary"
            size="sm"
          />
          <PremiumButton
            title={`Checkout • ₹${total}`}
            onPress={handleCheckout}
            size="sm"
            disabled={isAppPaused}
            style={{ marginLeft: Spacing.md, opacity: isAppPaused ? 0.5 : 1 }}
          />
        </View>
      )}
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
  scrollView: {
    flex: 1,
  },
  itemsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  cartItem: {
    marginBottom: Spacing.md,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  controlButton: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
  },
  summaryCard: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.xl * 2,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pauseBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: "#FFA500",
    gap: Spacing.md,
  },
  pauseIcon: {
    fontSize: 24,
  },
  pauseTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  pauseSubtitle: {
    fontSize: 12,
    fontWeight: "400",
  },
  pauseOverlay: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFA500",
  },
  pauseOverlayIcon: {
    fontSize: 32,
    marginBottom: Spacing.md,
  },
  pauseOverlayText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  pauseOverlaySubtext: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
});
