import { IUser, IUserTemp } from "../interfaces";
import { User } from "../models";
import bcrypt from "bcrypt"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";
import mongoose from "mongoose";

export class UserService {
    async getAllUsers() {
        const data = await User.find({}).select("username email phone role");
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, "Users fetched successfully");
    }

    async createUser(userdata: IUser) {
        let { username, password, email, phone, role } = userdata
        password = await bcrypt.hash(password, 10);
        // console.log(userdata)
        const data = await User.create({
            username: username,
            password: password,
            email: email,
            phone: phone,
            role: role
        })
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data,"User registered successfully")
    }

    async getUserById(id: string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        const data = await User.findById(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User fetched successfully");
     }
    async updateUser(id:string,userdata:IUserTemp) {
        let { username, password, email, phone, role } = userdata
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        if(password){
            password = await bcrypt.hash(password,10);
        }
        
        const data = await User.findByIdAndUpdate(id,{
            username: username,
            password: password,
            email: email,
            phone: phone,
            role: role
        })
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User updated successfully");

     }

    async deleteUser(id:string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User deleted successfully");
     }
}