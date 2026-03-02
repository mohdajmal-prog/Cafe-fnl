import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';
import { Spacing, BorderRadius, Shadows } from "../../src/constants/spacing";
import { Typography } from "../../src/constants/fonts";
import PremiumCard from "../../src/components/PremiumCard";
import PremiumButton from "../../src/components/PremiumButton";
import { useOrders } from "../../src/hooks/useOrders";
import { useAppPause } from "../../src/store/AppPauseContext";
import { useTheme } from "../../src/store/ThemeContext";

export default function OrdersScreen() {
  const { orders, loading } = useOrders();
  const { isAppPaused, pauseReason } = useAppPause();
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<"active" | "past">("active");
  const [selectedOrderForQR, setSelectedOrderForQR] = useState<string | null>(null);

  const activeOrders = orders.filter((o) => ["pending", "preparing", "ready"].includes(o.status));
  const pastOrders = orders.filter((o) => o.status === "completed");
  const displayOrders = selectedTab === "active" ? activeOrders : pastOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#10B981";
      case "preparing": return "#3B82F6";
      case "ready": return "#10B981";
      case "completed": return "#6B7280";
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return "checkmark-circle";
      case "preparing": return "flame";
      case "ready": return "checkmark-circle";
      case "completed": return "checkmark-done";
      default: return "help-circle";
    }
  };

  const renderOrder = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => item.status !== "completed" && setSelectedOrderForQR(item.id)}
      activeOpacity={item.status !== "completed" ? 0.8 : 1}
    >
      <PremiumCard style={styles.orderCard} delay={index * 100}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={[Typography.h4, { color: colors.textPrimary }]}>
              Order #{item.orderNumber || item.id.slice(-4).toUpperCase()}
            </Text>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { 
                backgroundColor: getStatusColor(item.status) + "20",
                borderColor: getStatusColor(item.status)
              },
            ]}
          >
            <Ionicons name={getStatusIcon(item.status) as any} size={16} color={getStatusColor(item.status)} />
            <Text style={[Typography.caption, { color: getStatusColor(item.status), fontWeight: "600" }]}>
              {item.status === "completed" ? "SERVED" : item.status === "ready" ? "READY" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={[styles.orderItems, { backgroundColor: colors.backgroundSecondary }]}>
          {(item.items || []).map((menuItem: any, idx: number) => (
            <View key={menuItem.id || idx} style={styles.itemRow}>
              <Text style={[Typography.bodySmall, { color: colors.textPrimary }]}>
                {menuItem.quantity}x {menuItem.name || 'Item'}
              </Text>
              <Text style={[Typography.bodySmall, { color: colors.primary, fontWeight: "600" }]}>
                ₹{menuItem.price * menuItem.quantity}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.orderFooter, { borderTopColor: colors.border }]}>
          <View>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>Total</Text>
            <Text style={[Typography.h4, { color: colors.primary }]}>₹{item.total}</Text>
          </View>
          {item.estimatedTime && (
            <View style={styles.timeEstimate}>
              <Ionicons name="time" size={16} color={colors.primary} />
              <Text style={[Typography.caption, { color: colors.primary, fontWeight: "600" }]}>
                {item.estimatedTime} min
              </Text>
            </View>
          )}
        </View>

        {item.status !== "completed" && (
          <Text style={[Typography.caption, { color: colors.textSecondary, marginTop: Spacing.md, textAlign: "center" }]}>
            Tap to view QR code
          </Text>
        )}

        {item.status !== "completed" && (
          <PremiumButton
            title="Track Order"
            onPress={() => {}}
            variant="secondary"
            size="sm"
            fullWidth
            style={{ marginTop: Spacing.md }}
          />
        )}
      </PremiumCard>
    </TouchableOpacity>
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
          <Text style={[Typography.h2, { color: colors.textPrimary }]}>My Orders</Text>
        </Animated.View>

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

        <View style={[styles.tabContainer, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => setSelectedTab("active")}
            style={[styles.tab, selectedTab === "active" && { borderBottomColor: colors.primary }]}
          >
            <Text
              style={[
                Typography.button,
                { color: selectedTab === "active" ? colors.primary : colors.textSecondary },
              ]}
            >
              Active ({activeOrders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab("past")}
            style={[styles.tab, selectedTab === "past" && { borderBottomColor: colors.primary }]}
          >
            <Text
              style={[
                Typography.button,
                { color: selectedTab === "past" ? colors.primary : colors.textSecondary },
              ]}
            >
              Past ({pastOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ordersContainer}>
          {displayOrders.length > 0 ? (
            <FlatList
              data={displayOrders}
              renderItem={renderOrder}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              nestedScrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: 48 }}>📭</Text>
              <Text style={[Typography.h4, { color: colors.textPrimary, marginTop: Spacing.md }]}>
                No {selectedTab} orders
              </Text>
              <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.sm }]}>
                {selectedTab === "active"
                  ? "Order something delicious today!"
                  : "Your past orders will appear here"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={selectedOrderForQR !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedOrderForQR(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.qrContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={() => setSelectedOrderForQR(null)}
            >
              <Ionicons name="close" size={28} color={colors.textPrimary} />
            </TouchableOpacity>

            <Text style={[Typography.h3, { color: colors.textPrimary, marginBottom: Spacing.md, textAlign: "center" }]}>
              Order QR Code
            </Text>

            <View style={[styles.qrBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {selectedOrderForQR && (
                <QRCode
                  value={orders.find(o => o.id === selectedOrderForQR)?.orderNumber?.toString() || selectedOrderForQR}
                  size={200}
                />
              )}
            </View>

            {selectedOrderForQR && (
              <View style={styles.qrDetails}>
                <Text style={[Typography.h4, { color: colors.textPrimary, textAlign: "center" }]}>
                  Order #{orders.find(o => o.id === selectedOrderForQR)?.orderNumber || selectedOrderForQR.slice(-4).toUpperCase()}
                </Text>
                <Text style={[Typography.bodySmall, { color: colors.textSecondary, textAlign: "center", marginTop: Spacing.sm }]}>
                  Share this QR code with the counter staff to collect your order
                </Text>
              </View>
            )}

            <PremiumButton
              title="Done"
              onPress={() => setSelectedOrderForQR(null)}
              variant="primary"
              size="lg"
              fullWidth
              style={{ marginTop: Spacing.lg }}
            />
          </View>
        </View>
      </Modal>
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
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  ordersContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  orderCard: {
    marginBottom: Spacing.lg,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  orderItems: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  timeEstimate: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xl * 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  qrContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 400,
    ...Shadows.lg,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  qrBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    minHeight: 250,
  },
  qrDetails: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
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
});
