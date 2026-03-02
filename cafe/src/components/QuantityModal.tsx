import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  LinearGradient,
} from "react-native";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { Colors } from "../constants/colors";
import { Spacing, BorderRadius, Shadows } from "../constants/spacing";
import { Typography } from "../constants/fonts";
import { MenuItem } from "../services/types";
import { useCart } from "../store/CartContext";

interface QuantityModalProps {
  visible: boolean;
  item: MenuItem | null;
  onClose: () => void;
}

const gradientColors = [
  ["#D2B48C", "#8B4513"],
  ["#F5E6D3", "#D4A574"],
  ["#DEB887", "#A0522D"],
  ["#F0E68C", "#8B7500"],
];

export default function QuantityModal({ visible, item, onClose }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (item) {
      addItem(item, quantity);
      setQuantity(1);
      onClose();
    }
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  if (!item) return null;

  const gradientIndex = (item.id?.charCodeAt(0) || 0) % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          entering={SlideInUp.duration(400).springify()}
          style={styles.modalContent}
        >
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientPlaceholder}
              >
                <Text style={styles.emoji}>☕</Text>
              </LinearGradient>
            )}
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={[Typography.h3, { color: Colors.textPrimary }]}>
              {item.name}
            </Text>
            <Text
              style={[
                Typography.body,
                { color: Colors.textSecondary, marginVertical: Spacing.md },
              ]}
            >
              {item.description}
            </Text>

            <Text style={[Typography.h2, { color: Colors.primary, marginVertical: Spacing.md }]}>
              ₹{item.price}
            </Text>

            {/* Quantity Controls */}
            <View style={styles.quantityContainer}>
              <Text style={[Typography.body, { color: Colors.textPrimary, marginBottom: Spacing.md }]}>
                Quantity
              </Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <View style={styles.quantityDisplay}>
                  <Text style={[Typography.h4, { color: Colors.textPrimary }]}>
                    {quantity}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Price */}
            <View style={styles.totalContainer}>
              <Text style={[Typography.body, { color: Colors.textSecondary }]}>
                Total
              </Text>
              <Text style={[Typography.h3, { color: Colors.primary }]}>
                ₹{(item.price * quantity).toFixed(2)}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={[Typography.button, { color: Colors.textPrimary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCart}
              >
                <Text style={[Typography.button, { color: Colors.textInverse }]}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingBottom: Spacing.xl,
    maxHeight: "85%",
  },
  imageContainer: {
    height: 200,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    overflow: "hidden",
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
    fontSize: 64,
  },
  detailsContainer: {
    padding: Spacing.lg,
  },
  quantityContainer: {
    marginVertical: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.sm,
  },
  quantityButtonText: {
    fontSize: 24,
    color: Colors.textInverse,
    fontWeight: "600",
  },
  quantityDisplay: {
    width: 80,
    height: 50,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.md,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.md,
  },
});
