import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorlistComponentStyle from './ErrorlistComponent.style'
import { ThemeColor } from '../../../styles/ThemeColor'
import { ThemedText } from '../../../styles/ThemedText'
import { Button_1 } from '../../Buttons/Button_1_mini'
const styles = ErrorlistComponentStyle
const ErrorListComponent = ({ onRefresh }: { onRefresh: any }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/circle-xmark.png')} tintColor={ThemeColor.deepRed} style={styles.icon} />
            <ThemedText type="default" style={styles.text}>Something went wrong</ThemedText>
            <Button_1 onClick={onRefresh} title='Refresh' />
        </View>
    )
}

export default ErrorListComponent
