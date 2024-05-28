export const createError = (status: number, message: string): any =>{
    const err: any = new Error();
    err.status = status;
    err.message = message;
    return err;
};