import { Product, ProductList } from "./Products";

export interface DiscountProps {
    discount: number,
    products: ProductList[]
}