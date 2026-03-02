import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, LinearGradient } from "react-native";
import { Spacing, BorderRadius, Shadows } from "../constants/spacing";
import { Typography } from "../constants/fonts";
import { MenuItem } from "../services/types";
import { useCart } from "../store/CartContext";
import { useTheme } from "../store/ThemeContext";

interface FeaturedCardProps {
  item: MenuItem;
  delay?: number;
}

const gradientColors = [
  ["#D2B48C", "#8B4513"],
  ["#F5E6D3", "#D4A574"],
  ["#DEB887", "#A0522D"],
  ["#F0E68C", "#8B7500"],
];

export default function FeaturedCard({ item, delay = 0 }: FeaturedCardProps) {
  const [quantity, setQuantity] = useState(0);
  const { addItem, updateQuantity, removeItem } = useCart();
  const { colors } = useTheme();

  const handleAdd = () => {
    if (quantity === 0) {
      addItem(item, 1);
      setQuantity(1);
    } else {
      updateQuantity(item.id, quantity + 1);
      setQuantity(quantity + 1);
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      removeItem(item.id);
      setQuantity(0);
    }
  };

  const gradientIndex = (item.id?.charCodeAt(0) || 0) % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientPlaceholder}>
            <Text style={styles.emoji}>☕</Text>
          </LinearGradient>
        )}
        {(item.discount ?? 0) > 0 && (
          <View style={[styles.discountTag, { backgroundColor: colors.primary }]}>
            <Text style={styles.discountText}>{item.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={[Typography.h4, { color: colors.textPrimary }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[Typography.caption, { color: colors.textSecondary, marginVertical: Spacing.xs }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[Typography.button, { color: colors.primary }]}>₹{item.price}</Text>
          {quantity === 0 ? (
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={handleAdd}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.quantityBox, { backgroundColor: colors.backgroundSecondary }]}>
              <TouchableOpacity onPress={handleRemove}>
                <Text style={[styles.qtyText, { color: colors.primary }]}>−</Text>
              </TouchableOpacity>
              <Text style={[Typography.button, { color: colors.textPrimary }]}>{quantity}</Text>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={[styles.qtyText, { color: colors.primary }]}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    height: 280,
    ...Shadows.md,
  },
  imageContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  gradientPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
  },
  discountTag: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  discountText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  content: {
    padding: Spacing.md,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
