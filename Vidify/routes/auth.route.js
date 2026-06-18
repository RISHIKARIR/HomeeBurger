import express from "express";
import {  signUp, login,ForgotPassword,verifyOtp,setNewPassword,profileRoute,generateAccessFromRefresh,getUser,Logout} from "../controllers/auth.controller.js";
import { verifytoken } from "../middlewares/auth.middleware.js";




const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.post("/forgot-password",ForgotPassword);
router.post("/verify-otp",verifyOtp);
router.put("/change-password",setNewPassword)
router.post("/logout",Logout);
router.post("/generate-access",generateAccessFromRefresh)




router.get("/me",verifytoken,getUser)
router.get("/profile",verifytoken,profileRoute)




export default router;

