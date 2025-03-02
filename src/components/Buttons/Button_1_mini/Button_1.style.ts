import { StyleSheet } from "react-native";
import { ThemeColor } from "../../../styles/ThemeColor";
import { MAIN_BORDER_RADIUS_1, MAIN_BORDER_RADIUS_2, MAIN_BORDER_RADIUS_4 } from "../../../styles/BorderRadius";
import { padding } from "../../../styles/mixxins";
const colors = ThemeColor
const Button_1_Style = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: MAIN_BORDER_RADIUS_4,
        ...padding(7, 15, 7, 15),
        minWidth: 100,
        alignItems: "center",

    },
    text: {
        fontSize: 14,
        color: "white"
    }
})
export default Button_1_Style