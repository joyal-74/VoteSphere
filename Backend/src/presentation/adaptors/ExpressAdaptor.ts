import { Request, Response } from "express";
import { IHttpRequest } from "../http/interfaces/IHttp";
import { AppError } from "../../domain/errors/AppError";
import { HttpStatusCode } from "../../domain/enums/StatusCodes";
import { buildResponse } from "../../infra/utils/ResponseBuilder";

export const adaptRoute = (controllerMethod: (req: IHttpRequest) => Promise<any>) => {
    return async (req: Request, res: Response) => {
        const httpRequest: IHttpRequest = {
            body: req.body,
            params: req.params,
            query: req.query,
            cookies: req.cookies,
            userId: (req as any).userId,
        };

        try {
            const httpResponse = await controllerMethod(httpRequest);
            
            const responseData = httpResponse.body?.data;

            if (responseData && responseData.accessToken && responseData.refreshToken) {
                const { accessToken, refreshToken } = responseData;


                const isProd = process.env.NODE_ENV === 'production';
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProd,
                    sameSite: 'lax' as const,
                    path: '/',
                };

                res.cookie('accessToken', accessToken, { 
                    ...cookieOptions, 
                    maxAge: 15 * 60 * 1000 
                });

                res.cookie('refreshToken', refreshToken, { 
                    ...cookieOptions, 
                    maxAge: 7 * 24 * 60 * 60 * 1000 
                });

                delete responseData.accessToken;
                delete responseData.refreshToken;
            }

            res.status(httpResponse.statusCode).json(httpResponse.body);

        } catch (err: any) {

            console.log(err)

            if (err instanceof AppError) {
                return res.status(err.statusCode).json(
                    buildResponse(false, err.message, err.details)
                );
            }

            const status = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
            const message = err.message || "Something went wrong";

            return res.status(status).json(
                buildResponse(false, message, undefined, "Internal Server Error")
            );
        }
    };
};