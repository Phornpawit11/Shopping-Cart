import { Image, InteractionManager, View } from 'react-native';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { ProductList } from '../../../model/Products';
import ProductComponentStyle from './ProductComponent.style';
import { ThemedText } from '../../../styles/ThemedText';
import { Button_1 } from '../../Buttons/Button_1_mini';
import ProductAmountControlComponent from './ProductAmountControlComponent';
import { useProductContext } from '../../../hooks/products';
import SwipeableWrappeds from '../../Buttons/Button_1_mini/SwipeableWrapped';
import { useFocusEffect } from '@react-navigation/native';
const styles = ProductComponentStyle;
const ProductComponent = ({ item, swipeable, handleRemove }: { item: ProductList, swipeable: boolean, handleRemove: any }) => {
    const [selectedAmount, setSelectedAmount] = useState<number>(item.selectedAmount)
    useFocusEffect(
        React.useCallback(() => {
            if (swipeable===false) return
            console.log("red");
            
            const task = InteractionManager.runAfterInteractions(() => {
                setSelectedAmount(item.selectedAmount)
            });
            return () => task.cancel();
        }, [item.selectedAmount])
    );
    const { ActionCart, cart } = useProductContext()
    const updateCart = (data: ProductList, isIncrease: boolean) => {
        if (isIncrease) {
            ActionCart.cartInCrease(data)
        } else {
            ActionCart.cartDeCrease(data)
        }
    }
    const handleIncrease = () => {
        setSelectedAmount((prev) => prev + 1)
        updateCart(item, true)
    }
    const handleDecrease = () => {
        if (swipeable && selectedAmount == 1) {
            handleRemove(item)
        } else {
            setSelectedAmount((prev) => prev - 1)
            updateCart(item, false)
        }
    }

    const SwipeableWrapped: React.FC<{ children: ReactNode }> = useCallback(({ children }) => {
        return swipeable ? (
            <SwipeableWrappeds handleRemove={() => handleRemove(item)}>
                {children}
            </SwipeableWrappeds>
        ) : children
    }, [item, cart])
    const ButtonRenderer = () => {
        return (
            selectedAmount > 0 ?
                <ProductAmountControlComponent total={selectedAmount} deCrease={handleDecrease} inCrease={handleIncrease} />
                :
                <Button_1 title='Add to cart' onClick={handleIncrease} />
        )
    }
    return (
        <SwipeableWrapped >
            <View style={styles.container}>
                <View style={[styles.flexRow, styles.contentWrapped]}>
                    <Image style={styles.imageContainer} source={require("../../../assets/product.png")} />
                    <View style={styles.textWrapped}>
                        <ThemedText >{item.name}</ThemedText>
                        <View style={styles.flexRow}>
                            <ThemedText style={styles.priceText}>{item.price.toFixed(2)}</ThemedText>
                            <ThemedText type='regular'> / unit</ThemedText>
                        </View>
                    </View>
                    {ButtonRenderer()}
                </View>
            </View>
        </SwipeableWrapped>
    );
};

export default React.memo(ProductComponent);