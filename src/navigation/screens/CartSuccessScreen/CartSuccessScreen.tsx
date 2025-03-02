import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartSuccessScreenStyle from './CartSuccessScreen.style'
import { ThemedText } from '../../../styles/ThemedText'
import { Button_1 } from '../../../components/Buttons/Button_1_mini'
import useNavigaions from '../../../hooks/navigations/useNavigation'
const styles = CartSuccessScreenStyle
const CartSuccessScreen = () => {
    const { goBack } = useNavigaions()
    return (
        <View style={styles.container}>
            <ThemedText type='title'>Success!</ThemedText>
            <ThemedText type='regular' style={{ marginVertical: 5 }}>Thank you for shopping with us!</ThemedText>
            <Button_1 onClick={goBack} title='Shop again' />
        </View>
    )
}

export default CartSuccessScreen
