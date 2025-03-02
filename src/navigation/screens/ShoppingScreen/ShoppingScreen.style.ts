import { StyleSheet } from "react-native";
import { padding } from "../../../styles/mixxins";
import { ThemeColor } from "../../../styles/ThemeColor";

const ShoppingScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeColor.background,
        ...padding(10, 10, 10, 10)

    },
    titleText: {
        ...padding(5, 5, 5, 5)

    }
})
export default ShoppingScreenStyle
