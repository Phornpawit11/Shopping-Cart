import { FlatList, View, ListRenderItemInfo, ActivityIndicator, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShoppingScreenStyle from './ShoppingScreen.style';
import ShoppingServices from '../../../services/shoppingServices';
import { EmptyList } from '../../../components/Flatlist/EmptyListComponents';
import { Product, ProductList } from '../../../model/Products';
import { ProductComponent } from '../../../components/Flatlist/ProductComponents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { ThemedText } from '../../../styles/ThemedText';
import SchoppingScreenAnimated from './animation';
import { FooterLoading } from '../../../components/Flatlist/Loading';

const styles = ShoppingScreenStyle
let loadMore = false
const HEADER_HEIGHT = 380
const ShoppingScreen = () => {
    const insets = useSafeAreaInsets()
    const animation = SchoppingScreenAnimated(HEADER_HEIGHT)

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Animated.View
                style={[
                    {
                        height: HEADER_HEIGHT,
                        overflow: 'hidden',
                    },
                    animation.headerAnimatedStyle,
                ]}>
                <RecommendProduct />
            </Animated.View>
            <NormalProduct scrollHandler={animation.scrollHandler} />
        </View>
    )
}

const RecommendProduct = () => {
    const [recommendProducts, setRecommendProducts] = useState<ProductList[]>([])
    const [isLoading, setisLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    useEffect(() => {
        onCallRecommendedProduct()
        return () => {
            setRecommendProducts([])
        }
    }, [])

    async function onCallRecommendedProduct() {
        setisLoading(true)
        ShoppingServices.getRecommenddedProduct().then((result) => {
            if (result) {
                const dataUpdate = result.map((el: any) => ({ ...el, selectedAmount: 0 }))
                setRecommendProducts(dataUpdate)
            }

        }).catch((err) => {
            console.log({ err });
            setIsError(true)
        }).finally(() => {
            setisLoading(false)
        })
    }
    const renderRecommendItem = useCallback(
        ({ item }: ListRenderItemInfo<ProductList>) => <ProductComponent item={item} swipeable={false} handleRemove={() => { }} />,
        []
    );

    return (
        <View style={{}}>
            <ThemedText type='defaultSemiBold' style={styles.titleText}>Recommend Product</ThemedText>
            <FlatList
                data={recommendProducts}
                keyExtractor={(item) => `recproduct_id_${item.id}`}
                renderItem={renderRecommendItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => {
                    return (
                        <EmptyList isError={isError} isLoading={isLoading} onRefresh={onCallRecommendedProduct} />
                    )
                }}
            />
        </View>
    )
}

const NormalProduct = ({ scrollHandler }: any) => {
    const [normalProducts, setNormalProducts] = useState<ProductList[]>([]);
    const [isFooterLoading, setIsFooterLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(10);
    const [isError, setIsError] = useState<boolean>(false)
    useEffect(() => {
        onCallProduct()
        return () => {
            setNormalProducts([]);
        };
    }, []);
    const onCallProduct = async () => {
        setIsLoading(true);
        try {
            const result = await ShoppingServices.getProduct(limit);
            if (result?.items) {
                const dataUpdate = result?.items.map((el: any) => ({ ...el, selectedAmount: 0 }))
                setNormalProducts(dataUpdate);
                loadMore = true
            }
        } catch (err) {
            setIsError(true)
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    const onCallProductEndReach = async () => {
        setIsFooterLoading(true);
        try {
            const result = await ShoppingServices.getProduct(limit);
            if (result?.items) {
                const dataUpdate = result?.items.map((el: any) => ({ ...el, selectedAmount: 0 }))
                setNormalProducts(dataUpdate);
                setLimit((prev) => prev + 10);
                loadMore = true;
            }
        } catch (err) {
            setIsError(true)
            console.error("Fetch error:", err);
        } finally {
            setIsFooterLoading(false);
        }
    };
    const onEndReached = useCallback(async () => {
        if (loadMore) {
            loadMore = false;
            await onCallProductEndReach();
        }
    }, [limit]);
    const renderNormalItem = useCallback(
        ({ item }: { item: ProductList }) => <ProductComponent item={item} swipeable={false} handleRemove={() => { }} />,
        []
    );
    return (
        <View>
            <ThemedText type='defaultSemiBold' style={styles.titleText}>Latest Product</ThemedText>
            <Animated.FlatList
                data={normalProducts}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                keyExtractor={(item) => `product_id_${item.id}`}
                renderItem={renderNormalItem}
                ListEmptyComponent={<EmptyList isLoading={isLoading} isError={isError} onRefresh={onCallProduct} />}
                ListFooterComponent={isFooterLoading ? <FooterLoading /> : null}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.7}
            />
        </View>
    );
}
export default ShoppingScreen
