export interface Product {
    id: number;
    name: string;
    price: number;
}
export interface ProductList extends Product {
    selectedAmount: number
}