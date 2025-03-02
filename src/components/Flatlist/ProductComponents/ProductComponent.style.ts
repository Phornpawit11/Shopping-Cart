import { StyleSheet } from "react-native";
import { ThemeColor } from "../../../styles/ThemeColor";

const ProductComponentStyle = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        justifyContent: "center",
    },
    textWrapped: {
        padding: 10,
        justifyContent: "center",
        flex: 1,
    },
    imageContainer: {
        width: 70,
        height: 70
    },
    flexRow: {
        flexDirection: 'row',

    },
    contentWrapped: {
        alignItems: "center"
    },
    priceText: {
        color: ThemeColor.primary
    }

})
export default ProductComponentStyle