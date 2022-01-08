import joi from 'joi';
import bcrypt from 'bcrypt'

import { REFRESH_JWT } from '../../config'
import { UserModel} from "../../models"
import JwtService from '../../services/JwtService'


const loginController = {
      async login(req,res,next){
        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
        const { error } = loginSchema.validate(req.body)
        if(error){
            return next(error)
        }
        const {email,password} =req.body
        try{
            const user = await UserModel.findOne({ email })
            if(!user){
                return next(CustomErrorHandler.wrongCredencial())
            }

            const match = bcrypt.compare(password,user.password)
            if(!match){
                return next(CustomErrorHandler.wrongCredencial('Wrong Password'))
            }
            const AccessToken = JwtService.sign({_id: user._id, role: user.role})
            res.status(200).json({ access_token: AccessToken});
        }catch(err){
            return next(err)
        }
    }
    
}
export default loginController