import toast from 'react-hot-toast';

let EmailRegx: any =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let PassRegx: any = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
class FormHelper {

    IsEmpty(value: string): boolean {
        return value.length === 0;
    }
    IsEmail(value: string): boolean {
        return !EmailRegx.test(value);
    }
    IsPassword(value: string): boolean {
        return !PassRegx.test(value);
    }
    ErrorToast(msg: string): void {
        toast.error(msg);
    }
    SuccessToast(msg: string): void {
        toast.success(msg);
    }
}

export const {
    IsEmpty,
    IsEmail,
    IsPassword,
    ErrorToast,
    SuccessToast
} = new FormHelper();