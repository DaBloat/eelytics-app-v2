import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function AnimateIcon({ focused, children }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: focused ? -3 : 0,
      useNativeDriver: true,
      friction: 100,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};