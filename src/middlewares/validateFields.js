const {response}= require ('express');

const validateFields =(reg,res,next)=>{
    const errores=validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({ ok:false,
            errors:errores.mapped(),
            message: "Bad Request. Please fill all field."
         });
    }
    next();
}
module.exports ={
    validateFields
}