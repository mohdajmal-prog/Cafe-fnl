import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { 
  FadeIn, 
  FadeOut, 
  ZoomIn, 
  SlideInRight,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "../constants/colors";
import { Spacing, BorderRadius } from "../constants/spacing";
import { Typography } from "../constants/fonts";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image?: ImageSourcePropType | { uri: string };
  gradientColors: string[];
  textColor: string;
}

const ADVERTISEMENTS: Advertisement[] = [
  {
    id: "1",
    title: "Special Offer",
    description: "Get 20% off on all beverages this week!",
    image: require("../../assets/images/ad-banner.jpg"),
    gradientColors: ["#8B4513", "#D4A574"],
    textColor: "#FFFFFF",
  },
  {
    id: "2",
    title: "New Arrival",
    description: "Try our delicious new dessert collection",
    image: { uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/iced-coffee-latte-ads-design-template-7e0e2a396956196c53f82ee277d61a1e_screen.jpg?ts=1661763339" },
    gradientColors: ["#D4A574", "#F5E6D3"],
    textColor: "#2C1810",
  },
  {
    id: "3",
    title: "Loyalty Rewards",
    description: "Earn points on every order and redeem them",
    gradientColors: ["#A0522D", "#DEB887"],
    textColor: "#FFFFFF",
  },
  {
    id: "4",
    title: "Happy Hour",
    description: "50% discount on selected items 3-5 PM daily",
    gradientColors: ["#8B7500", "#F0E68C"],
    textColor: "#2C1810",
  },
];

export default function AdvertisementBanner() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ADVERTISEMENTS.length);
      scale.value = withSpring(1.05, { damping: 8, mass: 1 });
      setTimeout(() => {
        scale.value = withSpring(1, { damping: 8, mass: 1 });
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentAd = ADVERTISEMENTS[currentAdIndex];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(800).delay(200)} style={styles.container}>
      <Animated.View
        key={currentAd.id}
        entering={ZoomIn.duration(600).springify()}
        exiting={FadeOut.duration(400)}
        style={[styles.banner, animatedStyle]}
      >
        {currentAd.image ? (
          <Image source={currentAd.image} style={styles.fullImage} resizeMode="cover" />
        ) : (
          <LinearGradient
            colors={currentAd.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullImage}
          />
        )}

        <View style={styles.overlay}>
          <Animated.View entering={SlideInRight.duration(600).delay(200)} style={styles.content}>
            <Text style={[styles.title, { color: currentAd.textColor }]}>
              {currentAd.title}
            </Text>
            <Text style={[styles.description, { color: currentAd.textColor }]}>
              {currentAd.description}
            </Text>
          </Animated.View>
        </View>

        <Animated.View entering={SlideInRight.duration(600).delay(100)} style={styles.indicator}>
          {ADVERTISEMENTS.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentAdIndex
                      ? currentAd.textColor
                      : currentAd.textColor + "40",
                  width: index === currentAdIndex ? 24 : 6,
                },
              ]}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  banner: {
    borderRadius: BorderRadius.lg,
    minHeight: 180,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  fullImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: Spacing.lg,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  indicator: {
    position: "absolute",
    bottom: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: Spacing.xs,
    justifyContent: "center",
    zIndex: 2,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});
