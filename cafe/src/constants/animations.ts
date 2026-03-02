import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideInDown,
  ZoomIn,
  ZoomOut,
  BounceIn,
  BounceInDown,
  FlipInEasyX,
  RotateInDownLeft,
  PinwheelIn,
  RollInLeft,
  StretchInX,
  StretchInY,
} from "react-native-reanimated";

export const AnimationPresets = {
  // Entrance animations
  fadeIn: FadeIn.duration(600),
  slideInUp: SlideInUp.duration(600),
  slideInDown: SlideInDown.duration(600),
  slideInLeft: SlideInLeft.duration(600),
  slideInRight: SlideInRight.duration(600),
  zoomIn: ZoomIn.duration(500),
  bounceIn: BounceIn.duration(700),
  bounceInDown: BounceInDown.duration(700),
  flipIn: FlipInEasyX.duration(600),
  rotateIn: RotateInDownLeft.duration(600),
  pinwheel: PinwheelIn.duration(800),
  rollIn: RollInLeft.duration(600),
  stretchX: StretchInX.duration(600),
  stretchY: StretchInY.duration(600),

  // Exit animations
  fadeOut: FadeOut.duration(400),

  // Staggered animations
  staggeredFadeIn: (index: number) => FadeIn.duration(600).delay(index * 100),
  staggeredSlideUp: (index: number) => SlideInUp.duration(600).delay(index * 80),
  staggeredZoom: (index: number) => ZoomIn.duration(500).delay(index * 120),
};

export const TransitionPresets = {
  smooth: {
    duration: 600,
    damping: 10,
    mass: 1,
  },
  bouncy: {
    duration: 800,
    damping: 6,
    mass: 0.8,
  },
  snappy: {
    duration: 400,
    damping: 12,
    mass: 1.2,
  },
};
