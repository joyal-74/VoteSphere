import { HttpStatusCode } from "../../domain/enums/StatusCodes"; 

export interface IHttpResult {
    statusCode: number;
    body: {
        success: boolean;
        data?: any;
        error?: string;
        details?: any;
    };
}

export class HttpResponse {
    static ok(data: any): IHttpResult {
        return {
            statusCode: HttpStatusCode.OK,
            body: {
                success: true,
                data
            }
        };
    }

    static created(data: any): IHttpResult {
        return {
            statusCode: HttpStatusCode.CREATED,
            body: {
                success: true,
                data
            }
        };
    }

    static noContent(): IHttpResult {
        return {
            statusCode: HttpStatusCode.NO_CONTENT,
            body: {
                success: true
            }
        };
    }


    static json(statusCode: number, data: any): IHttpResult {
        return {
            statusCode,
            body: {
                success: statusCode < 400,
                data
            }
        };
    }
}