import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import ProductAmountControlComponentStyle from './ProductAmountControlComponent.style'
import { ThemedText } from '../../../styles/ThemedText'
import { ThemeColor } from '../../../styles/ThemeColor'
const styles = ProductAmountControlComponentStyle
interface ProductAmountControl {
    total: number,
    inCrease: () => void,
    deCrease: () => void,
}
const DisplayImage = ({ source }: any) => {
    return <Image source={source} style={styles.icon} tintColor={ThemeColor.primary} />
}
const ProductAmountControlComponent = ({ total, deCrease, inCrease }: ProductAmountControl) => {
    return (
        <View style={[styles.container, styles.flexRow]}>
            <Pressable onPress={deCrease}>
                <DisplayImage source={require("../../../assets/minus.png")} />
            </Pressable>
            <ThemedText >{total}</ThemedText>
            <Pressable onPress={inCrease}>
                <DisplayImage source={require("../../../assets/add.png")} />
            </Pressable>
        </View>
    )
}

export default memo(ProductAmountControlComponent)
