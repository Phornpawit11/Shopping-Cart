import { DiscountProps } from "../../model/Discount"

const CalcuLateDiscount = (props: DiscountProps) => {
    const discountPercen = props.discount / 100
    const products = props.products
    function getDiscount(price: number, discount: number) {
        const disCountAmount = price * discount
        return price - disCountAmount
    }
    const getProductPriceAfterDiscount = () => {
        const productUpdate = products.map((el) => ({
            ...el, priceAfterDiscount: getDiscount(el.price, discountPercen)
        }))
        return productUpdate
    }
    const getTotalPriceAfterDiscount = () => {
        let summaryPrice: number = 0
        getProductPriceAfterDiscount().map(el => {
            let returnVal: number = el.selectedAmount * el.priceAfterDiscount
            summaryPrice = summaryPrice + returnVal
        })
        return summaryPrice.toFixed(2)
    }
    const getTotalPrice = () => {
        let summaryPrice: number = 0
        props.products.map(el => {
            let returnVal: number = el.selectedAmount * el.price
            summaryPrice = summaryPrice + returnVal
        })
        return summaryPrice.toFixed(2)
    }
    const getTotalDiscount = () => {
        const returnVal = Number(getTotalPrice()) - Number(getTotalPriceAfterDiscount())
        return returnVal.toFixed(2)
    }
    return { getTotalPrice, getTotalPriceAfterDiscount, getTotalDiscount }
}

export default CalcuLateDiscount
