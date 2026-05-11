import jwt from 'jsonwebtoken';
import { Request} from 'express';
import { JwtService } from '../../middlewares/JwtService';

export class CatchUserLogged {
    static userLogged(req: Request){
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return "Not user logged";
        } else {
            // const decode = jwt.verify(token, )
            const payload = JwtService.verifyAccessToken(token);
            const userId = payload.Iduser;
            return userId;
        }
    }
}