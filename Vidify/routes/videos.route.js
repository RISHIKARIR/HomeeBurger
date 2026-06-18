import express from "express"
import { UploadVideo } from "../controllers/video.controller.js";
import { uploadvideo } from "../middlewares/multer.js";
import { verifytoken } from "../middlewares/auth.middleware.js";
import { getVideos } from "../controllers/video.controller.js";

export const router = express.Router();





router.post("/videos/upload-video",verifytoken,uploadvideo,UploadVideo)
router.get("/videos/get-videos",verifytoken,getVideos)