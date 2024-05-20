import { Router } from "express";
import { userRouter } from "./user.route";
import { loginRouter } from "./login.route";
export const mainRouter = Router()

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/login",loginRouter)