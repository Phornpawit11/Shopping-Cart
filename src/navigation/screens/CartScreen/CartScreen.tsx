import { ActivityIndicator, FlatList, InteractionManager, ListRenderItemInfo, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CartScreenStyles from './CartScreen.style';
import { ProductList } from '../../../model/Products';
import useCartContext from '../../../hooks/products/useCartContext';
import { ProductComponent } from '../../../components/Flatlist/ProductComponents';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CalcuLateDiscount from '../../../Untils/CalculateDiscoount/CalcuLateDiscount';
import { ThemedText } from '../../../styles/ThemedText';
import { EmptyCartList } from '../../../components/Flatlist/EmptyListComponents';
import ShoppingServices, { CheckoutRequest } from '../../../services/shoppingServices';
import useNavigaions from '../../../hooks/navigations/useNavigation';
import Toast from 'react-native-toast-message';

const styles = CartScreenStyles
const CartScreen = () => {
  const { cart, ActionCart } = useCartContext()
  const [cartList, setCartList] = useState<ProductList[]>(cart.product)
  
  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setCartList(cart.product)

      });
      return () => task.cancel();
    }, [cart])
  );
  const handleRemove = (item: ProductList) => {
    const dataUpdate = cartList.filter(el => el.name !== item.name)
    setCartList(dataUpdate)
    ActionCart.cartRemove(item)
  }
  const renderCardItems = useCallback(
    ({ item }: ListRenderItemInfo<ProductList>) =>
      <ProductComponent item={item} swipeable={true} handleRemove={handleRemove} />,
    [cartList, cart.product]
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        keyExtractor={(item) => `card_id_${item.name}`}
        renderItem={renderCardItems}
        contentContainerStyle={styles.cartContainer}
        ListEmptyComponent={EmptyCartList}
      />
      <PriceCalculate cartList={cartList} />
    </View>
  )
}

const PriceCalculate = ({ cartList }: { cartList: ProductList[] }) => {
  const DiscountCal = CalcuLateDiscount({ discount: 5, products: cartList })
  const Total = DiscountCal.getTotalPrice()
  const TotalAfter = DiscountCal.getTotalPriceAfterDiscount()
  const DiscountDis = DiscountCal.getTotalDiscount()
  const [isLoading, setIsLoading] = useState(false)
  const { onNavigation } = useNavigaions()
  const handleCheckout = () => {
    const body: CheckoutRequest = {
      products: [0]
    }
    setIsLoading(true)
    ShoppingServices.onPostCheckout(body).then((result) => {
      onNavigation("CartSuccess")
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Somthing went wrong',
        position: "bottom"
      });
    }).finally(() => {

      setIsLoading(false)
    })
  }
  return (
    <View style={styles.CartCalContainer}>
      <View style={styles.lineWrapped}>
        <ThemedText style={styles.text}>
          Subtotal
        </ThemedText>
        <ThemedText style={styles.text}>
          {Total}
        </ThemedText>
      </View>
      <View style={styles.lineWrapped}>
        <ThemedText style={styles.text}>
          Promotion discount
        </ThemedText>
        <ThemedText style={styles.textDiscount}>
          -{DiscountDis}
        </ThemedText>
      </View>
      <View style={[styles.lineWrapped, { marginTop: 20 }]}>
        <ThemedText type='title' style={styles.text}>
          {TotalAfter}
        </ThemedText>
        <Pressable style={styles.buttonCheckout} onPress={handleCheckout} disabled={isLoading || cartList.length == 0}>
          {isLoading ?
            <ActivityIndicator />
            :
            <ThemedText style={styles.textCheckout} type='regular'>
              Checkout
            </ThemedText>
          }

        </Pressable>
      </View>
    </View>
  )
}

export default CartScreen
