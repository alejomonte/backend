import jwt from 'jsonwebtoken';
var bcrypt = require('bcryptjs');
import config from "./../config";
const {validationResult}=require('express-validator');

import { getConnection,myScape } from "./../database/database";


const encryptPassword = ( password)=>{
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
const checkPassword = (password,hash)=>{
    return bcrypt.compareSync(password, hash);;
}
const signup = async (req, res) => {
    try {

        var { username, fullname, email, password } = req.body;
        const pass=password;
        
            console.log("busca usuario");
            const connection = await getConnection();
            const result = await connection.query("select * from engMng.users where username='"+username+"' or email='"+email+"'");
           
            if (result.length===0){
                console.log("usuario NO encontrado");
                password=encryptPassword(password);
                const user = { username, fullname, email, password};
                const savedUser =await connection.query("INSERT INTO engMng.users SET ?", user);
                const token=jwt.sign({id:savedUser.id}, config.secret,{
                    expiresIn:86400
                });

                console.log(user);
                res.status(200).json(token);
            }else{
                res.status(201).json({message:"User "+result.fullname+" already created"});
            }
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const signin = async (req, res) => {
    try {
        var { email, password } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT username, fullname, password, email, id FROM engMng.users where email=?",email);
        if (result.length>0){   
            console.log(result[0].password,password);     
            var salida=checkPassword(password,result[0].password);
            if (salida){
                const token=jwt.sign({id:result[0].id}, config.secret,{
                    expiresIn:86400
                });
                res.status(200).json({token,message:"Welcome",username: result[0].username,fullname:result[0].fullname});
            }else{
                res.status(400).json({token: null,message:"Invalid password"});
            }
        }else{
            res.status(400).json({message:"User not found"});
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const me = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, programmers FROM language WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



export const methods = {
    signup,
    signin,
    me
};