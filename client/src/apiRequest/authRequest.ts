import axios from "axios";
import store from "../store/store";
import { hideLoader, showLoader } from "../store/slice/settingSlice";
import { ErrorToast, SuccessToast } from "../helpers/formHelper";
import { removeSessions, setToken, setUserDetails } from "../helpers/sessionHelper";

const BaseURL: string = "http://localhost:8082/api"

export const RegistrationRequest = (user: RegistrationReq): Promise<boolean> => {
    store.dispatch(showLoader())
    let URL: string = BaseURL + "/auth/register";
    return axios.post(URL, user).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 201) {
            SuccessToast("Registration Successfull.")
            return true;
        }
        ErrorToast("Something Went Wrong")
        return false;
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        }
        ErrorToast("Something Went Wrong")
        return false;
    })
}

export const LoginRequest = (user: LoginReq): Promise<boolean> => {
    store.dispatch(showLoader())
    let URL: string = BaseURL + "/auth/login";

    return axios.post(URL, user).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            setToken(res.data.token)
            setUserDetails(res.data.data)
            SuccessToast("Login Successfull.")
            return true;
        }
        ErrorToast("Something Went Wrong")
        return false;
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 401 || err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        }
        ErrorToast("Something Went Wrong")
        return false;
    })
}

export const LogoutRequest = async (): Promise<boolean> => {
    store.dispatch(showLoader())
    let URL: string = BaseURL + "/auth/logout";

    return await axios.get(URL).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            removeSessions()
            SuccessToast("Logout Successfull.")
            return true;
        }
        ErrorToast("Something Went Wrong")
        return false;
    }).catch((err) => {
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    })
}