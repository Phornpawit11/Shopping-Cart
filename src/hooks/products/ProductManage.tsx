import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useReducer } from 'react';
import { Product, ProductList } from '../../model/Products';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartCalculate } from '../../Untils/CartCalculate/CartCalculate';
let Isloaded = false
export interface ProductState {
    product: ProductList[];
}
interface ProductAction {
    type: string;
    payload?: ProductList[];
}

export const CartContext = createContext<{
    cart: ProductState;
    ActionCart: {
        cartInCrease: (propProduct: ProductList) => void;
        cartDeCrease: (propProduct: ProductList) => void;
        cartRemove: (propProduct: ProductList) => void
        cartClear: () => void;
    };
} | undefined>(undefined);

const productReducer = (prevState: ProductState, action: ProductAction): ProductState => {
    switch (action.type) {
        case "SET_PRODUCT":
            return { ...prevState, product: action.payload || [] };
        case "RESTORE_PRODUCT":
            return { product: action.payload || [] };
        case "RESET":
            return { product: [] };
        default:
            return prevState;
    }
};

const ProductManage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(productReducer, { product: [] });

    const ActionCart = {
        cartInCrease: (propProduct: ProductList) => {
            const dataUpdate = CartCalculate.inCrease({ cart, propProduct })
            dispatch({ type: "SET_PRODUCT", payload: dataUpdate });
        },
        cartDeCrease: (propProduct: ProductList) => {
            const dataUpdate = CartCalculate.deCrease({ cart, propProduct })
            dispatch({ type: "SET_PRODUCT", payload: dataUpdate });
        },
        cartRemove: (propProduct: ProductList) => {
            const dataUpdate = CartCalculate.remove({ cart, propProduct })

            dispatch({ type: "SET_PRODUCT", payload: dataUpdate });
        },
        cartRestore: (propProduct: ProductList[]) => {
            dispatch({ type: "RESTORE_PRODUCT", payload: propProduct });
        },
        cartClear: () => {
            dispatch({ type: "RESET" });
        },
    };
    const KEY = "AppCart";

    useEffect(() => {
        const saveAsync = async () => {
            if (!Isloaded) return
            try {
                await AsyncStorage.setItem(KEY, JSON.stringify(cart));
            } catch (error) {
                console.error("Failed to save cart data", error);
            }
        };

        saveAsync();
    }, [cart]);
    useEffect(() => {
        const loadAsynce = async () => {
            try {
                const result = await AsyncStorage.getItem(KEY);
                if (result) {
                    const parsedData = JSON.parse(result);
                    ActionCart.cartRestore(parsedData.product)
                    Isloaded = true
                } else {
                    console.log("No data found in AsyncStorage");
                }
            } catch (error) {
                console.error("Failed to load cart data", error);
            }
        }
        loadAsynce()
    }, [])


    return (
        <CartContext.Provider value={{ cart, ActionCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default ProductManage;