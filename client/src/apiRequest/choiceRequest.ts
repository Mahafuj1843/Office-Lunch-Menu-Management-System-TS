import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/formHelper.js";
import store from "../store/store";
import { getToken } from "../helpers/sessionHelper.js";
import { hideLoader, showLoader } from "../store/slice/settingSlice";
import { setChoiceTotal, setChoices } from "../store/slice/choiceSlice";

const BaseURL: string = "http://localhost:8082/api"
const AxiosHeader: any = { headers: { "token": getToken() } }

export const createChoiceRequest = async (extras: string[], menuId: number): Promise<boolean> => {
    try {
        store.dispatch(showLoader())

        let url: string = BaseURL + "/choice/create";
        const result: any = await axios.post(url, {extras, menuId}, AxiosHeader);
        store.dispatch(hideLoader())

        if (result.status === 201) {
            SuccessToast("Lunch choice placed.")
            return true;
        }

        ErrorToast("Something went wrong.")
        return false

    } catch (error: any) {
        store.dispatch(hideLoader())
        if (error.response.data.status === 401) {
            ErrorToast(error.response.data.message)
            return false
        }
        ErrorToast("Something went wrong.")
        return false
    }
}

export const allChoiceListRequest = async (pageNo: number, perPage: number): Promise<void> => {
    try {
        store.dispatch(showLoader())
        let url: string = BaseURL + `/choice?page=${pageNo}&limit=${perPage}`;
        const result: any = await axios.get(url, AxiosHeader);

        store.dispatch(hideLoader())
        if (result.status === 200) {
            store.dispatch(hideLoader())
            if (result.data.data.length > 0) {
                store.dispatch(setChoices(result.data.data))
                store.dispatch(setChoiceTotal(result.data.totalChoices))
            } else {
                store.dispatch(setChoices([]))
                store.dispatch(setChoiceTotal(0))
                ErrorToast("No data found.")
            }
        } else {
            ErrorToast("Something went wrong.")
        }
    } catch (error: any) {
        store.dispatch(hideLoader())
        if (error.response.data.status === 401) {
            ErrorToast(error.response.data.message)
        }else{
            ErrorToast("Something went wrong.")
        }
    }
}

export const myChoiceListRequest = async (pageNo: number, perPage: number): Promise<void> => {
    try {
        store.dispatch(showLoader())
        let url: string = BaseURL + `/choice/my?page=${pageNo}&limit=${perPage}`;
        const result: any = await axios.get(url, AxiosHeader);

        store.dispatch(hideLoader())
        if (result.status === 200) {
            store.dispatch(hideLoader())
            if (result.data.data.length > 0) {
                store.dispatch(setChoices(result.data.data))
                store.dispatch(setChoiceTotal(result.data.totalChoices))
            } else {
                store.dispatch(setChoices([]))
                store.dispatch(setChoiceTotal(0))
                ErrorToast("No data found.")
            }
        } else {
            ErrorToast("Something went wrong.")
        }
    } catch (error: any) {
        store.dispatch(hideLoader())
        if (error.response.data.status === 401) {
            ErrorToast(error.response.data.message)
        }else{
            ErrorToast("Something went wrong.")
        }
    }
}