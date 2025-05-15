import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        next();
    }
    else {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log(decoded, "decoded");

            if (!decoded) {
                res.status(401).json({ message: 'Unauthorized' });
                return
            }
            else {
                console.log(decoded, "decoded");
                if (!req.body) req.body = {};
                (req as any).isAdmin = (decoded as JwtPayload).isAdmin;
                (req as any).id = (decoded as JwtPayload).id;
                next();
            }
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

    }
}





