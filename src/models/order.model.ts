import mongoose from "mongoose";
import { IOrder } from "../interfaces";

const orderSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

export const Order = mongoose.model<IOrder & mongoose.Document>("Order",orderSchema);