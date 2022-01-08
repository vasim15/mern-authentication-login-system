import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config'
class JwtService {
    static sign(paylode,expiry = '1h',secret = JWT_SECRET){
        return jwt.sign(paylode,secret,{expiresIn:expiry});

    }
    static verify(token, secret = JWT_SECRET){
        return jwt.verify(token,secret);
    }
}

export default JwtService;