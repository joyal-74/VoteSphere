export interface IHttpRequest {
    body: any;
    params: any;
    query: any;
    cookies: any,
    userId?: string;
}

export interface IHttpResponse {
    statusCode: number;
    body: any;
}