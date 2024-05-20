import mongoose from "mongoose"
import { ICatgeory } from "../interfaces"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

export const Category = mongoose.model<ICatgeory & mongoose.Document>("Category", categorySchema)