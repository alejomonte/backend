import { Router } from "express";
import { validateFields } from "../middlewares/validateFields";
import { methods as authController } from "./../controllers/auth.controller";
const {check}=require('express-validator');

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin",[
                        check('email','El email no esta bien escrito').isEmail(),
                        check('username','El username es obligatorio').not().isEmpty(),
                        check('fullname','El fullname es obligatorio').not().isEmpty(),
                        check('password','El password es obligatorio').not().isEmpty(),
                        validateFields
                        ], authController.signin);
router.get("/me", authController.me);

/*
    "username":"caroltest",
    "fullname":"Carolina Saravia",
    "email":"Carolina@gmail.com",
    "password":"Carolina!23"
*/

export default router;