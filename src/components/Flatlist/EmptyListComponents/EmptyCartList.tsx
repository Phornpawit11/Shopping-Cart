import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptyListStyle from './EmptyList.style'
import { ThemedText } from '../../../styles/ThemedText'
import { Button_1 } from '../../Buttons/Button_1_mini'
import useNavigaions from '../../../hooks/navigations/useNavigation'
const styles = EmptyListStyle

const EmptyCartList = () => {
    const { onNavigation } = useNavigaions()
    return (
        <View style={styles.container}>
            <ThemedText style={{ marginVertical: 10 }}>Empty Cart</ThemedText>
            <Button_1 onClick={() => {
                onNavigation("Shopping")
            }} title='Shop agains' />
        </View>
    )
}

export default EmptyCartList
