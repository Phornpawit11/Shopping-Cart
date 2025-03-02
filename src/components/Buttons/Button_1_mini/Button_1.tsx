import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button_1_Style from './Button_1.style'
import { ThemedText } from '../../../styles/ThemedText'

interface Button1 {
    title: string,
    onClick: () => void
}
const styles = Button_1_Style
const Button_1 = ({ title, onClick }: Button1) => {
    return (
        <Pressable style={styles.container} onPress={onClick}>
            <ThemedText type='defaultSemiBold' style={styles.text}>{title}</ThemedText>
        </Pressable>
    )
}

export default Button_1
