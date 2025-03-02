import React, { ReactNode } from 'react';
import { Text, StyleSheet, Image, Pressable } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { ThemedText } from '../../../styles/ThemedText';
import { ThemeColor } from '../../../styles/ThemeColor';
const WIDTH = 180


const SwipeableWrapped: React.FC<{ children: ReactNode, handleRemove: any }> = ({ children, handleRemove }) => {
    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: drag.value + WIDTH }],
            };
        });
        return (
            <Reanimated.View style={[styleAnimation]}>
                <Pressable style={styles.rightContainer} onPress={handleRemove}>
                    <Image source={require("../../../assets/trash.png")} style={styles.icon} tintColor={'white'} />
                </Pressable>
            </Reanimated.View>
        );
    }

    return (
        <ReanimatedSwipeable
            containerStyle={styles.swipeable}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={RightAction}>
            {children}
        </ReanimatedSwipeable>
    );
}
export default SwipeableWrapped
const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderTopWidth: 1,
    },
    swipeable: {
    },
    rightContainer: {
        backgroundColor: ThemeColor.deepRed,
        width: WIDTH,
        height: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30
    }
});