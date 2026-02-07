import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// A small wrapper to handle the smooth movement
export default function AnimateIcon({ focused, children }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: focused ? -3 : 0, // Moves up when focused, back down when not
      useNativeDriver: true,     // Keeps it smooth on your Tecno Pova
      friction: 100,               // Controls the "bounciness"
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};