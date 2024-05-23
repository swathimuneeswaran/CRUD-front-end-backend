import express from "express";
import {getUser,sendUser,deleteUser,updateUser} from "../controllers/userController.js"
const router=express.Router()

router.post("/userpost",getUser)
router.get("/getuser",sendUser)
router.put("/updateuser/:id",updateUser)
router.delete("/deleteuser/:id",deleteUser)

export default router;