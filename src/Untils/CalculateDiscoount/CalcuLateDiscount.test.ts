import { DiscountProps } from "../../model/Discount"
import CalculateDiscount from "./CalcuLateDiscount"

describe("CalculateDiscount", () => {
    const mockProducts = [
        { id: 1, name: "Product A", price: 100, selectedAmount: 2 }, // 200
        { id: 2, name: "Product B", price: 200, selectedAmount: 1 }, // 200
        { id: 3, name: "Product C", price: 50, selectedAmount: 3 }   // 150
    ] // รวม 200 + 200 + 150 = 500

    test("คำนวณราคาก่อนลด", () => {
        const discountData: DiscountProps = {
            discount: 10, // 10%
            products: mockProducts
        }
        const discountCalculator = CalculateDiscount(discountData)
        expect(discountCalculator.getTotalPrice()).toBe("550.00")
    })

    test("คำนวณราคาหลังหักส่วนลด 10%", () => {
        const discountData: DiscountProps = {
            discount: 10, // 10%
            products: mockProducts
        }
        const discountCalculator = CalculateDiscount(discountData)
        expect(discountCalculator.getTotalPriceAfterDiscount()).toBe("495.00")
    })

    test("คำนวณราคาหลังหักส่วนลด 20%", () => {
        const discountData: DiscountProps = {
            discount: 20, // 20%
            products: mockProducts
        }
        const discountCalculator = CalculateDiscount(discountData)
        expect(discountCalculator.getTotalPriceAfterDiscount()).toBe("440.00") 
    })

    test("คำนวณส่วนลดรวม 10%", () => {
        const discountData: DiscountProps = {
            discount: 10, // 10%
            products: mockProducts
        }
        const discountCalculator = CalculateDiscount(discountData)
        expect(discountCalculator.getTotalDiscount()).toBe("55.00") 
    })

    test("คำนวณส่วนลดรวม 20%", () => {
        const discountData: DiscountProps = {
            discount: 20, // 20%
            products: mockProducts
        }
        const discountCalculator = CalculateDiscount(discountData)
        expect(discountCalculator.getTotalDiscount()).toBe("110.00") 
    })
})