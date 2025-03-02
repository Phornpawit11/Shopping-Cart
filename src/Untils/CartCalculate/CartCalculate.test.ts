import { ProductState } from "../../hooks/products/ProductManage";
import { ProductList } from "../../model/Products";
import { CartCalculate } from "./CartCalculate";

describe("CartCalculate", () => {
    const mockProduct: ProductList = { id: 1, name: "Product A", price: 100, selectedAmount: 1 };
    const mockCart: ProductState = { product: [{ ...mockProduct }] };

    it("should increase product quantity in cart", () => {
        const updatedCart = CartCalculate.inCrease({ cart: mockCart, propProduct: mockProduct });
        expect(updatedCart.find(p => p.name === "Product A")?.selectedAmount).toBe(2);
    });

    it("should decrease product quantity in cart", () => {
        const increasedCart: ProductState = { product: [{ ...mockProduct, selectedAmount: 2 }] };
        const updatedCart = CartCalculate.deCrease({ cart: increasedCart, propProduct: mockProduct });
        expect(updatedCart.find(p => p.name === "Product A")?.selectedAmount).toBe(1);
    });

    it("should remove product from cart when quantity reaches zero", () => {
        const updatedCart = CartCalculate.deCrease({ cart: mockCart, propProduct: mockProduct });
        expect(updatedCart.find(p => p.name === "Product A")).toBeUndefined();
    });

    it("should remove product from cart when calling remove function", () => {
        const updatedCart = CartCalculate.remove({ cart: mockCart, propProduct: mockProduct });
        expect(updatedCart.find(p => p.name === "Product A")).toBeUndefined();
    });
});
