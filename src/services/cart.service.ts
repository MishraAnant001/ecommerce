import e from "express";
import { Cart, CartProduct } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class CartService {
    async getCart(id: string) {
        const data = await Cart.findOne({ userid: id });
        const products = await CartProduct.find({ cartid: data!._id })
        return new ApiResponse(SuccessCodes.ok, products, "Cart fetched successfully!")
    }

    async addCartProduct(id: string, productid: string, quantity: number) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        let product: any = null;
        if (!verifyProduct) {
            product = await CartProduct.create({
                productid: productid,
                productquantity: quantity,
                cartid: data!._id
            })
        } else {
            product = await CartProduct.findByIdAndUpdate(verifyProduct._id, {
                productid: productid,
                productquantity: quantity+verifyProduct.productquantity,
                cartid: data!._id
            })
        }
        return new ApiResponse(SuccessCodes.ok, product, "Product updated successfully!")
    }
    async updateCartProduct(id: string, productid: string, quantity: number) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        let product: any = null;
        if (!verifyProduct) {
            throw new ApiError(ErrorCodes.notFound, "No Product found")
        } else {
            product = await CartProduct.findByIdAndUpdate(verifyProduct._id, {
                productid: productid,
                productquantity: quantity,
                cartid: data!._id
            })
        }
        return new ApiResponse(SuccessCodes.ok, product, "Product updated successfully!")
    }

    async deleteProduct(id: string, productid: string) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        if (!verifyProduct) {
            throw new ApiError(ErrorCodes.notFound, "No Product found")
        }
        const product = await CartProduct.findByIdAndDelete(verifyProduct._id)
        return new ApiResponse(SuccessCodes.ok, product, "Product deleted successfully!")
    }
}