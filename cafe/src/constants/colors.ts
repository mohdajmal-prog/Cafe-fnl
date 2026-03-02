// Red Theme Color System
export const Colors = {
  // Backgrounds - White
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  backgroundTertiary: "#EEEEEE",
  
  // Cards & Surfaces - White
  card: "#FFFFFF",
  cardElevated: "#FAFAFA",
  cardHover: "#F9F9F9",
  
  // Brand Colors - Red
  primary: "#DC143C",
  primaryDark: "#B22222",
  primaryLight: "#FF6B6B",
  primaryGradientStart: "#DC143C",
  primaryGradientEnd: "#FF4757",
  
  // Secondary & Accent - Red Accents
  secondary: "#8B0000",
  accent: "#FF6B6B",
  accentLight: "#FFE5E5",
  
  // Status Colors
  success: "#27AE60",
  successLight: "#D5F4E6",
  error: "#DC143C",
  errorLight: "#FFE5E5",
  warning: "#FF8C00",
  warningLight: "#FFE4B5",
  info: "#3498DB",
  infoLight: "#E3F2FD",
  
  // Text Colors
  textPrimary: "#333333",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textDisabled: "#CCCCCC",
  textInverse: "#FFFFFF",
  
  // Borders
  border: "#E0E0E0",
  borderLight: "#F0F0F0",
  borderDark: "#CCCCCC",
  
  // Overlays
  overlay: "rgba(220, 20, 60, 0.6)",
  overlayLight: "rgba(220, 20, 60, 0.3)",
  
  // Skeleton
  skeleton: "#E0E0E0",
  skeletonHighlight: "#F0F0F0",
  
  // Premium Gradients
  gradientWarm: ["#DC143C", "#FF6B6B"],
  gradientCoffee: ["#B22222", "#FF4757"],
  gradientGold: ["#FF6B6B", "#FFE5E5"],
};

// Extended palette for theming
export const Palettes = {
  light: {
    bg: Colors.background,
    card: Colors.card,
    text: Colors.textPrimary,
  },
  dark: {
    bg: "#330000",
    card: "#8B0000",
    text: "#FFE5E5",
  },
};
