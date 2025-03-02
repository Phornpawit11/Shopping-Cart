import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterLoadingStyle from './FooterLoading.style'
const styles = FooterLoadingStyle
const FooterLoading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"small"} />
            <Text> Loading..</Text>
        </View>
    )
}

export default FooterLoading
