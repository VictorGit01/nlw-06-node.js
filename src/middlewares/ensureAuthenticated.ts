import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Receber o token
    const authToken = request.headers.authorization;

    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(
            token,
            "0181f463b3129434fd5ef187aa53eb62"
        ) as IPayload;
        
        request.user_id = sub;

        return next();
    } catch(err) {
        return response.status(401).end();
    }



    // Validar se token é válido

    // Recuperar informações do usuário
}