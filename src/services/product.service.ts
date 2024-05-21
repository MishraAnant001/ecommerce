import mongoose from "mongoose";
import { IProduct } from "../interfaces";
import { Product, Store } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class ProductService{
    async getAllProducts() {
        const data =  await Product.find({status:true}).select("name price category stock description");
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, "Products fetched successfully");
    }


    async createProduct( productdata: IProduct) {
        const data = await Product.create(productdata)
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data, "Product added successfully")
    }

    async getProduct(sellerid: string) {
        const stores = await Store.find({
            sellerid:sellerid
        })
        if (stores.length==0) {
            throw new ApiError(ErrorCodes.notFound, "No Store found")
        }

        const storesids = stores.map((item)=>{
            return item._id
        })
        // console.log(storesids)
        const data = await Product.find({ storeid: { $in: storesids } })
        // const data = await Product.find({}).select("name price category stock");
        if (data.length==0) {
            throw new ApiError(ErrorCodes.notFound, "No Product found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Products fetched successfully");
    }

    async updateProduct(id: string, productdata: IProduct) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid product id ")
        }
        const data = Product.findByIdAndUpdate(id,productdata);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No Product found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Product updated successfully");

    }
    async deleteProduct(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid product id ")
        }
        const data = Product.findByIdAndDelete(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No Product found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Product deleted successfully");
    }
    
}

