import { ProductState } from "../../hooks/products/ProductManage";
import { ProductList } from "../../model/Products";
interface CartCalculateProps {
    propProduct: ProductList,
    cart: ProductState
}
export const CartCalculate = {
    inCrease: ({ cart, propProduct }: CartCalculateProps) => {
        const existingProduct = cart.product.find(el => el.name === propProduct.name);
        let dataUpdate: ProductList[];
        if (existingProduct) {
            dataUpdate = cart.product.map(el =>
                el.name === propProduct.name ? { ...el, selectedAmount: el.selectedAmount + 1 } : el
            );
        } else {
            dataUpdate = [...cart.product, { ...propProduct, selectedAmount: 1 }];
        }
        return dataUpdate
    },
    deCrease: ({ cart, propProduct }: CartCalculateProps) => {
        let dataUpdate = cart.product
            .map(el =>
                el.name === propProduct.name
                    ? { ...el, selectedAmount: el.selectedAmount - 1 }
                    : el
            )
            .filter(el => el.selectedAmount > 0);
        return dataUpdate
    },
    remove: ({ cart, propProduct }: CartCalculateProps) => {
        let dataUpdate = cart.product
            .filter(el => el.name !== propProduct.name);
        return dataUpdate
    },
}
