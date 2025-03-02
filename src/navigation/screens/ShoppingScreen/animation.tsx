import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';

const SchoppingScreenAnimated = (HEADER_HEIGHT: number) => {
    const scrollOffset = useSharedValue(0);
    const scrollHandler = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollOffset.value = offsetY
    }
    const headerAnimatedStyle = useAnimatedStyle(() => {
        const headerHeight = interpolate(
            scrollOffset.value,
            [0, HEADER_HEIGHT],
            [HEADER_HEIGHT, HEADER_HEIGHT * 0.5],
            Extrapolate.CLAMP
        );
        return {
            height: headerHeight,

        };
    });
    return { headerAnimatedStyle, scrollHandler, scrollOffset }
}

export default SchoppingScreenAnimated
