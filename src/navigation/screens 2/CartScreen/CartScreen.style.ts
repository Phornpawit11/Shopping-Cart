import { StyleSheet } from "react-native";
import { padding } from "../../../styles/mixxins";
import { ThemeColor } from "../../../styles/ThemeColor";

const CartScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeColor.background,
        justifyContent: "space-between",

    },
    cartContainer: {
        ...padding(10, 10, 10, 10),
        flex: 1,
    },
    CartCalContainer: {
        ...padding(10, 10, 10, 10),
        backgroundColor: ThemeColor.third,
    },
    lineWrapped: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    titleText: {
        fontSize: 30
    },
    text: {
        color: ThemeColor.primary
    },
    textDiscount: {
        color: ThemeColor.deepRed
    },
    buttonCheckout: {
        borderRadius: 99,
        minWidth: 150,
        backgroundColor: ThemeColor.primary,
        ...padding(7, 7, 7, 7),
        alignItems: 'center'
    },
    textCheckout: {
        color: 'white'
    }
})
export default CartScreenStyles
