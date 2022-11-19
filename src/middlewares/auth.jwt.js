import jwt from 'jsonwebtoken';
import config from "./../config";
import { getConnection,myScape } from "./../database/database";

export const verifyToken=async(req,res,next)=>{
    const token=req.headers["x-access-token"];
    console.log(token);
    if (!token) return res.status(403).json({message: "No token provided"})
    try {


    const decoded = jwt.verify(token,config.secret);
    console.log(decoded);

   
        const connection = await getConnection();
        const result = await connection.query("SELECT username, fullname, password, email, id FROM engMng.users where id=?",decoded.id);
       req.userId=result[0].id;
        if (result.length>0){   
            console.log("valid user");
        }else{
            return res.status(403).json({message: "Invalid user"})
        }
        next();
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

    
}