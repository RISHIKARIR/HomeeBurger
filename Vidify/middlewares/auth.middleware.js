import jwt from "jsonwebtoken"
import pool from "../db.js";





export const verifytoken = async(req,res,next)=>{
    const accesstoken = req.cookies.accesstoken;




    try{

    if(!accesstoken){
        return res.status(401).json({
            message : "unAuthorizedd",
            success : false
        })
    }

    const checkverified = jwt.verify(accesstoken,process.env.JWT_ACCESS_SECRET)


    

    
    const user = await pool.query("SELECT id,username,email FROM users WHERE id = $1",[checkverified.userId])

    if(user.rows.length===0){
        return res.status(401).json({
            message : "Unauthorized Access",
            success : false
        })
    }

    req.user = user.rows[0]


    next();

    }catch(err){


        console.log(err,"errrorrraaa");

        return res.status(500).json({
            message : "Something went wrong",
            success : false
        })

    }




}

